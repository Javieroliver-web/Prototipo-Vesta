# 🔒 REQUISITOS RGPD PARA EL BACKEND - PROYECTO VESTA

## 📋 Resumen Ejecutivo

Este documento detalla todas las obligaciones de protección de datos que debe cumplir el backend de Vesta según:
- **RGPD** (Reglamento General de Protección de Datos - UE 2016/679)
- **LOPDGDD** (Ley Orgánica 3/2018 de Protección de Datos)
- **LSSI-CE** (Ley 34/2002 de Servicios de la Sociedad de la Información)

---

## 🗄️ 1. Base de Datos - Campos Adicionales Requeridos

### tb_usuarios - Campos RGPD
```sql
ALTER TABLE tb_usuarios ADD COLUMN IF NOT EXISTS:
    -- Consentimientos
    acepta_terminos BOOLEAN DEFAULT FALSE NOT NULL,
    acepta_privacidad BOOLEAN DEFAULT FALSE NOT NULL,
    acepta_marketing BOOLEAN DEFAULT FALSE,
    fecha_acepta_terminos TIMESTAMP,
    fecha_acepta_privacidad TIMESTAMP,
    fecha_acepta_marketing TIMESTAMP,
    
    -- Confirmación email
    email_confirmado BOOLEAN DEFAULT FALSE,
    token_confirmacion VARCHAR(255),
    fecha_confirmacion_email TIMESTAMP,
    
    -- Reset password
    token_reset_password VARCHAR(255),
    token_reset_expiracion TIMESTAMP,
    
    -- Auditoría RGPD
    ip_registro VARCHAR(45),
    user_agent_registro TEXT,
    fecha_ultima_modificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modificado_por UUID REFERENCES tb_usuarios(id_usuario),
    
    -- Ejercicio de derechos
    fecha_solicitud_supresion TIMESTAMP,
    motivo_supresion TEXT,
    datos_anonimizados BOOLEAN DEFAULT FALSE,
    fecha_anonimizacion TIMESTAMP
;
```

### Nueva Tabla: tb_cookie_consents
```sql
CREATE TABLE tb_cookie_consents (
    id_consent UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID REFERENCES tb_usuarios(id_usuario) ON DELETE CASCADE,
    cookies_necesarias BOOLEAN DEFAULT TRUE,
    cookies_analiticas BOOLEAN DEFAULT FALSE,
    cookies_marketing BOOLEAN DEFAULT FALSE,
    fecha_consentimiento TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip_address VARCHAR(45),
    user_agent TEXT,
    version_politica VARCHAR(20) -- ej: "v1.0"
);

CREATE INDEX idx_cookie_consents_usuario ON tb_cookie_consents(usuario_id);
```

### Nueva Tabla: tb_data_access_log (Auditoría RGPD)
```sql
CREATE TABLE tb_data_access_log (
    id_log UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID REFERENCES tb_usuarios(id_usuario),
    tipo_accion VARCHAR(50) NOT NULL, -- LOGIN, REGISTRO, ACTUALIZACION, ACCESO, SUPRESION, EXPORTACION
    detalle_accion TEXT,
    ip_address VARCHAR(45),
    user_agent TEXT,
    resultado VARCHAR(20), -- EXITO, FALLO, DENEGADO
    fecha_accion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_data_access_log_usuario ON tb_data_access_log(usuario_id);
CREATE INDEX idx_data_access_log_fecha ON tb_data_access_log(fecha_accion);
CREATE INDEX idx_data_access_log_tipo ON tb_data_access_log(tipo_accion);
```

### Nueva Tabla: tb_derechos_arco (Solicitudes de Derechos)
```sql
CREATE TABLE tb_derechos_arco (
    id_solicitud UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID REFERENCES tb_usuarios(id_usuario),
    tipo_derecho VARCHAR(50) NOT NULL, -- ACCESO, RECTIFICACION, SUPRESION, OPOSICION, LIMITACION, PORTABILIDAD
    estado_solicitud VARCHAR(30) DEFAULT 'PENDIENTE', -- PENDIENTE, EN_PROCESO, COMPLETADA, RECHAZADA
    descripcion_solicitud TEXT,
    documento_identidad_verificado BOOLEAN DEFAULT FALSE,
    fecha_solicitud TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_respuesta TIMESTAMP,
    respuesta TEXT,
    procesado_por UUID REFERENCES tb_usuarios(id_usuario),
    archivo_exportacion TEXT -- ruta al archivo ZIP con datos del usuario
);

CREATE INDEX idx_derechos_arco_usuario ON tb_derechos_arco(usuario_id);
CREATE INDEX idx_derechos_arco_estado ON tb_derechos_arco(estado_solicitud);
```

---

## 🔐 2. Seguridad y Encriptación

### 2.1. Contraseñas
```java
// OBLIGATORIO: BCrypt con factor de coste mínimo 12
@Service
public class PasswordService {
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);
    
    public String hashPassword(String plainPassword) {
        return encoder.encode(plainPassword);
    }
    
    public boolean verifyPassword(String plainPassword, String hashedPassword) {
        return encoder.matches(plainPassword, hashedPassword);
    }
}
```

### 2.2. Datos Sensibles en BD
```java
// OBLIGATORIO: Encriptar datos sensibles antes de almacenar
@Service
public class EncryptionService {
    
    @Value("${encryption.secret.key}")
    private String secretKey;
    
    public String encrypt(String data) {
        // Usar AES-256-GCM para encriptación simétrica
        // Almacenar: IV + TAG + datos encriptados
        // NUNCA almacenar la clave en el código
    }
    
    public String decrypt(String encryptedData) {
        // Desencriptar usando la misma clave
    }
}

// Aplicar a campos como:
// - Números de tarjeta (si se almacenan, mejor no hacerlo)
// - Datos bancarios
// - Números de documento (DNI, pasaporte)
```

### 2.3. Comunicaciones
```yaml
# application.yml - OBLIGATORIO: Solo HTTPS en producción
server:
  ssl:
    enabled: true
    key-store: classpath:keystore.p12
    key-store-password: ${SSL_KEYSTORE_PASSWORD}
    key-store-type: PKCS12
    key-alias: vesta
  port: 8443

# Forzar HTTPS
security:
  require-ssl: true
```

---

## 📧 3. Sistema de Confirmación de Email

### 3.1. Generación de Token
```java
@Service
public class EmailConfirmationService {
    
    public String generateConfirmationToken() {
        // Token único de un solo uso
        return UUID.randomUUID().toString() + "-" + System.currentTimeMillis();
    }
    
    public void sendConfirmationEmail(Usuario usuario) {
        String token = generateConfirmationToken();
        
        // Almacenar token en BD con expiración (24 horas recomendado)
        usuario.setTokenConfirmacion(token);
        usuario.setTokenConfirmacionExpiracion(LocalDateTime.now().plusHours(24));
        usuarioRepository.save(usuario);
        
        // Enviar email
        String enlace = "https://vesta.com/api/auth/confirm-email?token=" + token;
        emailService.sendEmail(
            usuario.getCorreoElectronico(),
            "Confirma tu cuenta en Vesta",
            "Haz clic en el siguiente enlace para confirmar tu cuenta: " + enlace
        );
        
        // LOG RGPD: Registrar envío de email
        logService.logAction(usuario.getId(), "ENVIO_CONFIRMACION_EMAIL", "Token generado");
    }
    
    @Transactional
    public boolean confirmEmail(String token) {
        Usuario usuario = usuarioRepository.findByTokenConfirmacion(token)
            .orElseThrow(() -> new TokenInvalidoException("Token no válido"));
        
        // Verificar expiración
        if (usuario.getTokenConfirmacionExpiracion().isBefore(LocalDateTime.now())) {
            throw new TokenExpiradoException("El token ha expirado");
        }
        
        // Confirmar email
        usuario.setEmailConfirmado(true);
        usuario.setFechaConfirmacionEmail(LocalDateTime.now());
        usuario.setTokenConfirmacion(null); // Invalidar token
        usuarioRepository.save(usuario);
        
        // LOG RGPD
        logService.logAction(usuario.getId(), "EMAIL_CONFIRMADO", "Email confirmado exitosamente");
        
        return true;
    }
}
```

---

## 🔑 4. Sistema de Reset de Contraseña con Token

### 4.1. Implementación
```java
@Service
public class PasswordResetService {
    
    public void sendResetEmail(String email) {
        Usuario usuario = usuarioRepository.findByCorreoElectronico(email)
            .orElseThrow(() -> new UsuarioNoEncontradoException());
        
        // Generar token
        String token = UUID.randomUUID().toString();
        usuario.setTokenResetPassword(token);
        usuario.setTokenResetExpiracion(LocalDateTime.now().plusHours(1)); // 1 hora
        usuarioRepository.save(usuario);
        
        // Enviar email
        String enlace = "https://vesta.com/reset-password?token=" + token;
        emailService.sendEmail(
            email,
            "Restablece tu contraseña en Vesta",
            "Haz clic en el siguiente enlace para restablecer tu contraseña: " + enlace +
            "\n\nEste enlace expirará en 1 hora."
        );
        
        // LOG RGPD
        logService.logAction(usuario.getId(), "SOLICITUD_RESET_PASSWORD", 
            "Token enviado a " + email);
    }
    
    @Transactional
    public boolean resetPassword(String token, String nuevaContrasena) {
        Usuario usuario = usuarioRepository.findByTokenResetPassword(token)
            .orElseThrow(() -> new TokenInvalidoException());
        
        // Verificar expiración
        if (usuario.getTokenResetExpiracion().isBefore(LocalDateTime.now())) {
            throw new TokenExpiradoException();
        }
        
        // Actualizar contraseña
        usuario.setContrasenaHash(passwordService.hashPassword(nuevaContrasena));
        usuario.setTokenResetPassword(null); // Invalidar token
        usuario.setTokenResetExpiracion(null);
        usuarioRepository.save(usuario);
        
        // LOG RGPD
        logService.logAction(usuario.getId(), "PASSWORD_RESETEADO", 
            "Contraseña actualizada vía token");
        
        return true;
    }
}
```

---

## 📊 5. Sistema de Auditoría (OBLIGATORIO)

### 5.1. Logging de Acciones
```java
@Service
@Slf4j
public class AuditLogService {
    
    @Autowired
    private DataAccessLogRepository logRepository;
    
    @Async
    public void logAction(UUID usuarioId, String tipoAccion, String detalle) {
        DataAccessLog log = new DataAccessLog();
        log.setUsuarioId(usuarioId);
        log.setTipoAccion(tipoAccion);
        log.setDetalleAccion(detalle);
        log.setIpAddress(getCurrentIp());
        log.setUserAgent(getCurrentUserAgent());
        log.setResultado("EXITO");
        log.setFechaAccion(LocalDateTime.now());
        
        logRepository.save(log);
        
        // Logging en archivo
        log.info("AUDIT: User={}, Action={}, Detail={}", usuarioId, tipoAccion, detalle);
    }
    
    public void logFailedAction(UUID usuarioId, String tipoAccion, String motivo) {
        // Similar pero con resultado="FALLO"
    }
}
```

### 5.2. Aspectos a Registrar (Artículo 30 RGPD)
```java
// Registrar estas acciones:
- REGISTRO: Nuevo usuario registrado
- LOGIN: Inicio de sesión (exitoso y fallido)
- LOGIN_FALLIDO: Intento fallido de login
- LOGOUT: Cierre de sesión
- ACTUALIZACION_DATOS: Modificación de datos personales
- COMPRA_POLIZA: Nueva póliza contratada
- CANCELACION_POLIZA: Póliza cancelada
- ACCESO_DATOS: Descarga de póliza o factura
- EXPORTACION_DATOS: Ejercicio de derecho de portabilidad
- SUPRESION_DATOS: Ejercicio de derecho al olvido
- RECTIFICACION_DATOS: Corrección de datos
- CAMBIO_PASSWORD: Cambio de contraseña
- ENVIO_EMAIL: Cualquier email enviado
- CONSENTIMIENTO_COOKIES: Aceptación/rechazo de cookies
- CONSENTIMIENTO_MARKETING: Aceptación/rechazo de marketing
```

---

## 🎯 6. Ejercicio de Derechos ARCO-POL

### 6.1. Derecho de Acceso
```java
@RestController
@RequestMapping("/api/derechos")
public class DerechosArcoController {
    
    /**
     * Derecho de Acceso - Artículo 15 RGPD
     * El usuario puede solicitar una copia de todos sus datos
     */
    @PostMapping("/solicitar-acceso")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> solicitarAcceso(@AuthenticationPrincipal UserDetails userDetails) {
        UUID usuarioId = getCurrentUserId(userDetails);
        
        // Crear solicitud
        DerechoArco solicitud = new DerechoArco();
        solicitud.setUsuarioId(usuarioId);
        solicitud.setTipoDerecho("ACCESO");
        solicitud.setEstadoSolicitud("PENDIENTE");
        solicitud.setFechaSolicitud(LocalDateTime.now());
        
        derechoArcoRepository.save(solicitud);
        
        // Notificar al DPO
        emailService.sendToDPO("Nueva solicitud de acceso - Usuario: " + usuarioId);
        
        // PLAZO: Responder en máximo 1 MES (Artículo 12.3 RGPD)
        return ResponseEntity.ok(Map.of(
            "mensaje", "Tu solicitud ha sido recibida. Responderemos en un plazo máximo de 1 mes.",
            "solicitudId", solicitud.getId()
        ));
    }
    
    /**
     * Procesar solicitud de acceso (ADMINISTRADOR/DPO)
     */
    @PostMapping("/procesar-acceso/{solicitudId}")
    @PreAuthorize("hasRole('ADMINISTRADOR')")
    public ResponseEntity<?> procesarAcceso(@PathVariable UUID solicitudId) {
        DerechoArco solicitud = derechoArcoRepository.findById(solicitudId)
            .orElseThrow();
        
        Usuario usuario = usuarioRepository.findById(solicitud.getUsuarioId())
            .orElseThrow();
        
        // Recopilar TODOS los datos del usuario
        Map<String, Object> datosCompletos = new HashMap<>();
        
        // 1. Datos personales
        datosCompletos.put("datosPersonales", Map.of(
            "nombreCompleto", usuario.getNombreCompleto(),
            "correoElectronico", usuario.getCorreoElectronico(),
            "movil", usuario.getMovil(),
            "fechaRegistro", usuario.getFechaCreacion(),
            "emailConfirmado", usuario.getEmailConfirmado()
        ));
        
        // 2. Pólizas
        List<Poliza> polizas = polizaRepository.findByUsuarioId(usuario.getId());
        datosCompletos.put("polizas", polizas);
        
        // 3. Historial de compras
        List<Orden> ordenes = ordenRepository.findByUsuarioId(usuario.getId());
        datosCompletos.put("ordenes", ordenes);
        
        // 4. Consentimientos
        CookieConsent consentimientoCookies = cookieConsentRepository
            .findTopByUsuarioIdOrderByFechaConsentimientoDesc(usuario.getId());
        datosCompletos.put("consentimientos", Map.of(
            "terminosYCondiciones", usuario.getAceptaTerminos(),
            "politicaPrivacidad", usuario.getAceptaPrivacidad(),
            "marketing", usuario.getAceptaMarketing(),
            "cookies", consentimientoCookies
        ));
        
        // 5. Logs de acceso (últimos 90 días)
        List<DataAccessLog> logs = logRepository
            .findByUsuarioIdAndFechaAccionAfter(
                usuario.getId(), 
                LocalDateTime.now().minusDays(90)
            );
        datosCompletos.put("actividadReciente", logs);
        
        // Generar archivo ZIP con todos los datos
        String archivoZip = dataExportService.generarExportacionCompleta(datosCompletos);
        
        // Actualizar solicitud
        solicitud.setEstadoSolicitud("COMPLETADA");
        solicitud.setFechaRespuesta(LocalDateTime.now());
        solicitud.setArchivoExportacion(archivoZip);
        solicitud.setRespuesta("Exportación completa de datos generada");
        derechoArcoRepository.save(solicitud);
        
        // Enviar email al usuario con el archivo
        emailService.sendWithAttachment(
            usuario.getCorreoElectronico(),
            "Exportación de tus datos personales - Vesta",
            "Adjuntamos una copia completa de todos tus datos personales.",
            archivoZip
        );
        
        return ResponseEntity.ok("Solicitud procesada y enviada al usuario");
    }
}
```

### 6.2. Derecho de Rectificación
```java
/**
 * Derecho de Rectificación - Artículo 16 RGPD
 * Permitir al usuario corregir datos inexactos
 */
@PutMapping("/usuarios/mi-perfil")
@PreAuthorize("isAuthenticated()")
public ResponseEntity<?> actualizarPerfil(
    @Valid @RequestBody ActualizarPerfilDTO dto,
    @AuthenticationPrincipal UserDetails userDetails
) {
    UUID usuarioId = getCurrentUserId(userDetails);
    Usuario usuario = usuarioRepository.findById(usuarioId).orElseThrow();
    
    // Guardar valores anteriores para auditoría
    String nombreAnterior = usuario.getNombreCompleto();
    String emailAnterior = usuario.getCorreoElectronico();
    
    // Actualizar
    usuario.setNombreCompleto(dto.getNombreCompleto());
    usuario.setMovil(dto.getMovil());
    
    // Si cambia el email, requerir nueva confirmación
    if (!emailAnterior.equals(dto.getCorreoElectronico())) {
        usuario.setCorreoElectronico(dto.getCorreoElectronico());
        usuario.setEmailConfirmado(false);
        emailConfirmationService.sendConfirmationEmail(usuario);
    }
    
    usuario.setFechaUltimaModificacion(LocalDateTime.now());
    usuario.setModificadoPor(usuarioId); // Auto-modificación
    usuarioRepository.save(usuario);
    
    // LOG RGPD
    auditLogService.logAction(usuarioId, "RECTIFICACION_DATOS", 
        String.format("Nombre: %s -> %s, Email: %s -> %s", 
            nombreAnterior, dto.getNombreCompleto(),
            emailAnterior, dto.getCorreoElectronico()));
    
    return ResponseEntity.ok("Datos actualizados correctamente");
}
```

### 6.3. Derecho de Supresión (Derecho al Olvido)
```java
/**
 * Derecho de Supresión - Artículo 17 RGPD
 * "Derecho al Olvido"
 */
@PostMapping("/derechos/solicitar-supresion")
@PreAuthorize("isAuthenticated()")
public ResponseEntity<?> solicitarSupresion(
    @RequestBody SupresionDTO dto,
    @AuthenticationPrincipal UserDetails userDetails
) {
    UUID usuarioId = getCurrentUserId(userDetails);
    Usuario usuario = usuarioRepository.findById(usuarioId).orElseThrow();
    
    // IMPORTANTE: Verificar si hay obligaciones legales que impidan la supresión
    List<Poliza> polizasActivas = polizaRepository
        .findByUsuarioIdAndEstado(usuarioId, "ACTIVA");
    
    if (!polizasActivas.isEmpty()) {
        return ResponseEntity.badRequest().body(Map.of(
            "error", "No puedes eliminar tu cuenta mientras tengas pólizas activas",
            "polizasActivas", polizasActivas.size(),
            "mensaje", "Por favor cancela todas tus pólizas antes de solicitar la eliminación"
        ));
    }
    
    // Verificar si hay obligaciones de conservación (facturas, datos fiscales)
    LocalDateTime fechaUltimaCompra = ordenRepository
        .findFechaUltimaCompraporUsuario(usuarioId);
    
    if (fechaUltimaCompra != null && 
        fechaUltimaCompra.plusYears(6).isAfter(LocalDateTime.now())) {
        // Ley General Tributaria: conservar datos 6 años
        return ResponseEntity.badRequest().body(Map.of(
            "error", "Obligación legal de conservación de datos",
            "mensaje", "Debemos conservar tus datos durante 6 años desde tu última compra " +
                      "para cumplir con obligaciones fiscales. Fecha límite: " + 
                      fechaUltimaCompra.plusYears(6).toLocalDate()
        ));
    }
    
    // Crear solicitud de supresión
    DerechoArco solicitud = new DerechoArco();
    solicitud.setUsuarioId(usuarioId);
    solicitud.setTipoDerecho("SUPRESION");
    solicitud.setDescripcionSolicitud(dto.getMotivo());
    solicitud.setEstadoSolicitud("PENDIENTE");
    derechoArcoRepository.save(solicitud);
    
    // Marcar usuario para eliminación
    usuario.setFechaSolicitudSupresion(LocalDateTime.now());
    usuario.setMotivoSupresion(dto.getMotivo());
    usuarioRepository.save(usuario);
    
    // Notificar al DPO
    emailService.sendToDPO("Solicitud de supresión - Usuario: " + usuarioId);
    
    // LOG RGPD
    auditLogService.logAction(usuarioId, "SOLICITUD_SUPRESION", 
        "Motivo: " + dto.getMotivo());
    
    return ResponseEntity.ok(Map.of(
        "mensaje", "Tu solicitud de eliminación ha sido recibida. " +
                  "Procesaremos tu solicitud en un plazo máximo de 1 mes.",
        "solicitudId", solicitud.getId()
    ));
}

/**
 * Procesar supresión (ADMINISTRADOR/DPO)
 */
@PostMapping("/admin/procesar-supresion/{usuarioId}")
@PreAuthorize("hasRole('ADMINISTRADOR')")
@Transactional
public ResponseEntity<?> procesarSupresion(@PathVariable UUID usuarioId) {
    Usuario usuario = usuarioRepository.findById(usuarioId).orElseThrow();
    
    // OPCIÓN 1: ELIMINACIÓN COMPLETA (si no hay obligaciones legales)
    // usuarioRepository.delete(usuario);
    
    // OPCIÓN 2: ANONIMIZACIÓN (recomendado)
    // Mantiene la integridad referencial pero elimina datos personales
    usuario.setNombreCompleto("Usuario Eliminado");
    usuario.setCorreoElectronico("anonimizado-" + UUID.randomUUID() + "@deleted.vesta.local");
    usuario.setMovil("000000000");
    usuario.setContrasenaHash("CUENTA_ELIMINADA");
    usuario.setEmailConfirmado(false);
    usuario.setDatosAnonimizados(true);
    usuario.setFechaAnonimizacion(LocalDateTime.now());
    usuarioRepository.save(usuario);
    
    // LOG RGPD
    auditLogService.logAction(usuarioId, "DATOS_ANONIMIZADOS", 
        "Cuenta anonimizada permanentemente");
    
    return ResponseEntity.ok("Usuario anonimizado correctamente");
}
```

### 6.4. Derecho de Portabilidad
```java
/**
 * Derecho de Portabilidad - Artículo 20 RGPD
 * Exportar datos en formato legible por máquina
 */
@GetMapping("/derechos/exportar-datos")
@PreAuthorize("isAuthenticated()")
public ResponseEntity<byte[]> exportarDatos(@AuthenticationPrincipal UserDetails userDetails) {
    UUID usuarioId = getCurrentUserId(userDetails);
    
    // Generar archivo JSON con todos los datos
    Map<String, Object> datosExportacion = dataExportService
        .generarExportacionPortable(usuarioId);
    
    // Convertir a JSON
    ObjectMapper mapper = new ObjectMapper();
    byte[] jsonBytes = mapper.writeValueAsBytes(datosExportacion);
    
    // LOG RGPD
    auditLogService.logAction(usuarioId, "EXPORTACION_DATOS", 
        "Datos exportados en formato JSON");
    
    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_JSON);
    headers.setContentDispositionFormData("attachment", 
        "vesta-datos-" + usuarioId + ".json");
    
    return new ResponseEntity<>(jsonBytes, headers, HttpStatus.OK);
}
```

---

## 🍪 7. Gestión de Consentimientos de Cookies

### 7.1. Endpoint para Guardar Consentimiento
```java
@PostMapping("/api/cookies/consentimiento")
public ResponseEntity<?> guardarConsentimientoCookies(@RequestBody CookieConsentDTO dto) {
    CookieConsent consent = new CookieConsent();
    consent.setUsuarioId(dto.getUsuarioId());
    consent.setCookiesNecesarias(true); // Siempre true
    consent.setCookiesAnaliticas(dto.getCookiesAnaliticas());
    consent.setCookiesMarketing(dto.getCookiesMarketing());
    consent.setIpAddress(getCurrentIp());
    consent.setUserAgent(getCurrentUserAgent());
    consent.setVersionPolitica("v1.0");
    consent.setFechaConsentimiento(LocalDateTime.now());
    
    cookieConsentRepository.save(consent);
    
    // LOG RGPD
    auditLogService.logAction(dto.getUsuarioId(), "CONSENTIMIENTO_COOKIES", 
        String.format("Analíticas: %s, Marketing: %s", 
            dto.getCookiesAnaliticas(), dto.getCookiesMarketing()));
    
    return ResponseEntity.ok("Preferencias guardadas");
}
```

---

## ⏰ 8. Conservación y Eliminación Automática

### 8.1. Job Programado
```java
@Component
@Slf4j
public class DataRetentionJob {
    
    /**
     * Ejecutar diariamente a las 2:00 AM
     * Eliminar o anonimizar datos según plazos legales
     */
    @Scheduled(cron = "0 0 2 * * *")
    @Transactional
    public void limpiezaAutomaticaDatos() {
        log.info("Iniciando limpieza automática de datos...");
        
        // 1. Tokens de confirmación expirados (>30 días)
        int tokensEliminados = usuarioRepository.eliminarTokensExpirados(
            LocalDateTime.now().minusDays(30)
        );
        log.info("Tokens de confirmación eliminados: {}", tokensEliminados);
        
        // 2. Usuarios no confirmados (>90 días)
        List<Usuario> usuariosSinConfirmar = usuarioRepository
            .findByEmailConfirmadoFalseAndFechaCreacionBefore(
                LocalDateTime.now().minusDays(90)
            );
        usuarioRepository.deleteAll(usuariosSinConfirmar);
        log.info("Usuarios no confirmados eliminados: {}", usuariosSinConfirmar.size());
        
        // 3. Logs de acceso antiguos (>2 años)
        int logsEliminados = logRepository.deleteByFechaAccionBefore(
            LocalDateTime.now().minusYears(2)
        );
        log.info("Logs de acceso eliminados: {}", logsEliminados);
        
        // 4. Solicitudes de supresión pendientes (avisar si >25 días)
        List<DerechoArco> solicitudesPendientes = derechoArcoRepository
            .findByTipoDerechoAndEstadoSolicitudAndFechaSolicitudBefore(
                "SUPRESION", 
                "PENDIENTE",
                LocalDateTime.now().minusDays(25)
            );
        
        if (!solicitudesPendientes.isEmpty()) {
            // Avisar al DPO: se acerca el plazo legal de 1 mes
            emailService.sendToDPO(
                "URGENTE: " + solicitudesPendientes.size() + 
                " solicitudes de supresión próximas a vencer"
            );
        }
        
        log.info("Limpieza automática completada");
    }
}
```

---

## 📝 9. Documentación Requerida

### 9.1. Registro de Actividades de Tratamiento (Artículo 30 RGPD)
```
Crear documento con:
1. Nombre y datos del responsable (Vesta Seguros, S.L.)
2. Fines del tratamiento
3. Descripción de categorías de interesados (usuarios, compradores)
4. Categorías de datos personales (identidad, contacto, económicos)
5. Categorías de destinatarios (pasarelas de pago, email providers)
6. Transferencias internacionales (si aplica)
7. Plazos de supresión
8. Medidas de seguridad técnicas y organizativas
```

### 9.2. Evaluación de Impacto (si procede)
Si el tratamiento implica alto riesgo, realizar EIPD (Evaluación de Impacto en Protección de Datos)

### 9.3. Contratos de Encargado de Tratamiento
Firmar contratos con:
- Proveedor de hosting
- Servicio de email
- Pasarela de pago
- Cualquier tercero que procese datos por cuenta de Vesta

---

## 🚨 10. Notificación de Brechas de Seguridad

### 10.1. Procedimiento Obligatorio
```java
@Service
public class DataBreachService {
    
    /**
     * ARTÍCULO 33 RGPD: Notificar a la AEPD en máximo 72 horas
     */
    public void notificarBrechaSeguridad(DataBreach breach) {
        // 1. Documentar la brecha
        BreachReport report = new BreachReport();
        report.setFechaDeteccion(breach.getFechaDeteccion());
        report.setTipoBrecha(breach.getTipo()); // Acceso no autorizado, pérdida, etc.
        report.setDatosAfectados(breach.getDatosAfectados());
        report.setUsuariosAfectados(breach.getNumeroUsuariosAfectados());
        report.setMedidasAdoptadas(breach.getMedidasCorrectivas());
        
        // 2. Evaluar riesgo
        if (esRiesgoAlto(breach)) {
            // ARTÍCULO 34 RGPD: Notificar a los interesados sin dilación indebida
            notificarUsuariosAfectados(breach);
        }
        
        // 3. Notificar a la AEPD (dentro de 72 horas)
        notificarAEPD(report);
        
        // 4. Documentar (obligación de mantener registro)
        breachRepository.save(report);
        
        // 5. Notificar al DPO
        emailService.sendToDPO("URGENTE: Brecha de seguridad detectada", report);
    }
    
    private void notificarAEPD(BreachReport report) {
        // Usar la Sede Electrónica de la AEPD
        // https://sedeagpd.gob.es
    }
}
```

---

## ✅ Checklist de Cumplimiento RGPD

### Registro y Autenticación
- [x] Contraseñas encriptadas con BCrypt (factor ≥12)
- [x] Confirmación de email obligatoria con token
- [x] Sistema de recuperación de contraseña con token
- [x] Solo HTTPS en producción
- [x] Registro de consentimientos (términos, privacidad, marketing)
- [x] Fecha y hora de cada consentimiento

### Base de Datos
- [x] Nomenclatura consistente
- [x] Campos de auditoría en tb_usuarios
- [x] Tabla tb_cookie_consents
- [x] Tabla tb_data_access_log
- [x] Tabla tb_derechos_arco

### Derechos ARCO-POL
- [x] Derecho de Acceso implementado
- [x] Derecho de Rectificación implementado
- [x] Derecho de Supresión implementado
- [x] Derecho de Oposición implementado
- [x] Derecho de Limitación implementado
- [x] Derecho de Portabilidad implementado
- [x] Plazo de respuesta: máximo 1 mes

### Seguridad
- [x] Copias de seguridad encriptadas
- [x] Control de acceso por roles
- [x] Logs de todas las operaciones críticas
- [x] Protección contra inyección SQL (usar JPA/Hibernate)
- [x] Validación de entrada de datos
- [x] Protección CSRF
- [x] Rate limiting para prevenir ataques

### Transparencia
- [x] Política de Privacidad completa y accesible
- [x] Términos y Condiciones claros
- [x] Política de Cookies detallada
- [x] Información del DPO publicada
- [x] Procedimiento para ejercer derechos documentado

### Conservación de Datos
- [x] Plazos de conservación definidos
- [x] Job automático de limpieza de datos
- [x] Anonimización en lugar de eliminación (cuando proceda)

### Notificaciones
- [x] Email de bienvenida
- [x] Email de confirmación
- [x] Email de reset de contraseña
- [x] Email de cambios en cuenta
- [x] Email de respuesta a ejercicio de derechos
- [x] Sistema de notificación de brechas

---

## 📞 Contactos Importantes

- **AEPD (Agencia Española de Protección de Datos)**
  - Web: https://www.aepd.es
  - Tel: 901 100 099
  - Sede Electrónica: https://sedeagpd.gob.es

- **Delegado de Protección de Datos (DPO) de Vesta**
  - Email: dpo@vesta.com
  - Tel: +34 900 123 456

---

**Fecha de elaboración:** 3 de diciembre de 2025  
**Versión:** 1.0  
**Responsable:** Delegado de Protección de Datos - Vesta Seguros, S.L.
