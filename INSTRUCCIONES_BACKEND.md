# 📋 INSTRUCCIONES DE INTEGRACIÓN BACKEND - PROYECTO CSI2 VESTA

## 🎯 Resumen del Proyecto

**Vesta** es un marketplace de micro-seguros on-demand que permite a los usuarios comprar y gestionar seguros de forma instantánea según sus necesidades.

Este frontend React está diseñado específicamente para integrarse con tu backend Java/Spring Boot y cumplir con todos los requisitos del proyecto CSI2.

---

## 🗄️ Estructura de Base de Datos Mínima (4 tablas + relaciones)

### 1. **tb_usuarios**
```sql
CREATE TABLE tb_usuarios (
    id_usuario UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre_completo VARCHAR(50) NOT NULL,
    movil VARCHAR(15) NOT NULL,
    correo_electronico VARCHAR(100) UNIQUE NOT NULL,
    tipo_usuario VARCHAR(20) NOT NULL CHECK (tipo_usuario IN ('USUARIO', 'ADMINISTRADOR')),
    contrasena_hash VARCHAR(255) NOT NULL,
    email_confirmado BOOLEAN DEFAULT FALSE,
    token_confirmacion VARCHAR(255),
    token_reset_password VARCHAR(255),
    token_expiracion TIMESTAMP,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices
CREATE INDEX idx_usuarios_email ON tb_usuarios(correo_electronico);
CREATE INDEX idx_usuarios_tipo ON tb_usuarios(tipo_usuario);
```

**REQUISITO CSI2:** Contraseña siempre encriptada con BCrypt en BD y validaciones.

### 2. **tb_categorias**
```sql
CREATE TABLE tb_categorias (
    id_categoria UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre_categoria VARCHAR(50) NOT NULL UNIQUE,
    desc_categoria TEXT,
    icono VARCHAR(50)
);

-- Datos iniciales
INSERT INTO tb_categorias (nombre_categoria, desc_categoria, icono) VALUES
('Viaje', 'Seguros para tus viajes y vacaciones', 'plane'),
('Tecnología', 'Protección para dispositivos electrónicos', 'smartphone'),
('Entretenimiento', 'Cobertura para eventos y conciertos', 'ticket'),
('Movilidad', 'Seguros para bicicletas y transporte', 'bike'),
('Mascotas', 'Cuidado veterinario para tus mascotas', 'heart');
```

### 3. **tb_seguros**
```sql
CREATE TABLE tb_seguros (
    id_seguro UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre_seguro VARCHAR(100) NOT NULL,
    categoria_id UUID NOT NULL REFERENCES tb_categorias(id_categoria),
    desc_corta VARCHAR(255) NOT NULL,
    desc_completa TEXT NOT NULL,
    precio_base DECIMAL(10,2) NOT NULL,
    duracion_tipo VARCHAR(20) NOT NULL CHECK (duracion_tipo IN ('DIA', 'MES', 'EVENTO', 'VIAJE')),
    imagen_url TEXT,
    activo BOOLEAN DEFAULT TRUE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_seguros_categoria ON tb_seguros(categoria_id);
CREATE INDEX idx_seguros_activo ON tb_seguros(activo);
```

### 4. **tb_coberturas**
```sql
CREATE TABLE tb_coberturas (
    id_cobertura UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    seguro_id UUID NOT NULL REFERENCES tb_seguros(id_seguro) ON DELETE CASCADE,
    desc_cobertura VARCHAR(255) NOT NULL,
    monto_maximo DECIMAL(10,2),
    orden INT DEFAULT 0
);

CREATE INDEX idx_coberturas_seguro ON tb_coberturas(seguro_id);
```

### 5. **tb_polizas**
```sql
CREATE TABLE tb_polizas (
    id_poliza UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID NOT NULL REFERENCES tb_usuarios(id_usuario),
    seguro_id UUID NOT NULL REFERENCES tb_seguros(id_seguro),
    num_poliza VARCHAR(50) UNIQUE NOT NULL,
    estado VARCHAR(20) NOT NULL CHECK (estado IN ('ACTIVA', 'VENCIDA', 'CANCELADA')),
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    precio_pagado DECIMAL(10,2) NOT NULL,
    duracion INT NOT NULL,
    fecha_compra TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_polizas_usuario ON tb_polizas(usuario_id);
CREATE INDEX idx_polizas_estado ON tb_polizas(estado);
CREATE INDEX idx_polizas_num ON tb_polizas(num_poliza);
```

### 6. **tb_ordenes**
```sql
CREATE TABLE tb_ordenes (
    id_orden UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID NOT NULL REFERENCES tb_usuarios(id_usuario),
    num_orden VARCHAR(50) UNIQUE NOT NULL,
    total_subtotal DECIMAL(10,2) NOT NULL,
    total_impuestos DECIMAL(10,2) NOT NULL,
    total_final DECIMAL(10,2) NOT NULL,
    estado_pago VARCHAR(20) NOT NULL CHECK (estado_pago IN ('PENDIENTE', 'COMPLETADO', 'FALLIDO')),
    metodo_pago VARCHAR(50),
    fecha_orden TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_ordenes_usuario ON tb_ordenes(usuario_id);
```

### 7. **tb_orden_items**
```sql
CREATE TABLE tb_orden_items (
    id_item UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    orden_id UUID NOT NULL REFERENCES tb_ordenes(id_orden) ON DELETE CASCADE,
    seguro_id UUID NOT NULL REFERENCES tb_seguros(id_seguro),
    cantidad INT NOT NULL DEFAULT 1,
    precio_unitario DECIMAL(10,2) NOT NULL,
    duracion INT NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL
);

CREATE INDEX idx_orden_items_orden ON tb_orden_items(orden_id);
```

---

## 🔐 Requisitos de Seguridad

### Encriptación de Contraseñas (BCrypt)
```java
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Service
public class UsuarioService {
    
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    
    public Usuario registrarUsuario(RegistroDTO dto) {
        Usuario usuario = new Usuario();
        usuario.setNombreCompleto(dto.getNombreCompleto());
        usuario.setCorreoElectronico(dto.getCorreoElectronico());
        
        // REQUISITO CSI2: Contraseña encriptada
        String hashPassword = passwordEncoder.encode(dto.getContrasena());
        usuario.setContrasenaHash(hashPassword);
        
        // ... resto del código
    }
    
    public boolean validarContrasena(String contrasenaSinEncriptar, String hashAlmacenado) {
        return passwordEncoder.matches(contrasenaSinEncriptar, hashAlmacenado);
    }
}
```

### JWT para Autenticación
```xml
<!-- pom.xml -->
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-api</artifactId>
    <version>0.11.5</version>
</dependency>
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-impl</artifactId>
    <version>0.11.5</version>
    <scope>runtime</scope>
</dependency>
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-jackson</artifactId>
    <version>0.11.5</version>
    <scope>runtime</scope>
</dependency>
```

---

## 📧 Sistema de Emails (Confirmación y Recuperación)

### Configuración Spring Boot
```yaml
# application.yml
spring:
  mail:
    host: smtp.gmail.com
    port: 587
    username: ${EMAIL_USERNAME}
    password: ${EMAIL_PASSWORD}
    properties:
      mail:
        smtp:
          auth: true
          starttls:
            enable: true
```

### Servicio de Email
```java
@Service
public class EmailService {
    
    @Autowired
    private JavaMailSender mailSender;
    
    public void enviarEmailConfirmacion(String destinatario, String token) {
        String enlace = "https://vesta.com/confirm-email?token=" + token;
        String mensaje = "Haz clic en el siguiente enlace para confirmar tu email: " + enlace;
        
        SimpleMailMessage email = new SimpleMailMessage();
        email.setTo(destinatario);
        email.setSubject("Confirma tu cuenta en Vesta");
        email.setText(mensaje);
        
        mailSender.send(email);
    }
    
    public void enviarEmailRecuperacion(String destinatario, String token) {
        String enlace = "https://vesta.com/reset-password?token=" + token;
        // ... similar al anterior
    }
}
```

---

## 📄 Generación de PDFs

### Dependencia
```xml
<!-- pom.xml -->
<dependency>
    <groupId>com.itextpdf</groupId>
    <artifactId>itext7-core</artifactId>
    <version>7.2.5</version>
    <type>pom</type>
</dependency>
```

### Servicio de PDF
```java
@Service
public class PdfService {
    
    public byte[] generarPolizaPdf(Poliza poliza) throws IOException {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        PdfWriter writer = new PdfWriter(baos);
        PdfDocument pdf = new PdfDocument(writer);
        Document document = new Document(pdf);
        
        // Título
        document.add(new Paragraph("PÓLIZA DE SEGURO")
            .setFontSize(20)
            .setBold());
        
        // Datos de la póliza
        document.add(new Paragraph("Número de Póliza: " + poliza.getNumPoliza()));
        document.add(new Paragraph("Usuario: " + poliza.getUsuario().getNombreCompleto()));
        // ... más contenido
        
        document.close();
        return baos.toByteArray();
    }
}
```

---

## 🚦 Control de Roles y Permisos

### Anotaciones de Seguridad
```java
@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {
    
    // Solo ADMINISTRADOR puede listar usuarios
    @GetMapping
    @PreAuthorize("hasRole('ADMINISTRADOR')")
    public ResponseEntity<List<UsuarioDTO>> listarUsuarios() {
        // ...
    }
    
    // Usuario puede ver/editar solo su propio perfil, Admin puede ver todos
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMINISTRADOR') or #id == authentication.principal.id")
    public ResponseEntity<UsuarioDTO> obtenerUsuario(@PathVariable UUID id) {
        // ...
    }
    
    // Solo ADMINISTRADOR puede eliminar usuarios
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMINISTRADOR')")
    public ResponseEntity<?> eliminarUsuario(@PathVariable UUID id) {
        // REQUISITO CSI2: Verificar que no sea el último administrador
        // REQUISITO CSI2: Verificar si tiene pólizas activas
        // ...
    }
}
```

---

## 📊 Sistema de Logging

### Configuración Logback
```xml
<!-- src/main/resources/logback-spring.xml -->
<configuration>
    <appender name="FILE" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <file>logs/vesta-app.log</file>
        <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
            <fileNamePattern>logs/vesta-app-%d{yyyy-MM-dd}.log</fileNamePattern>
            <maxHistory>30</maxHistory>
        </rollingPolicy>
        <encoder>
            <pattern>%d{yyyy-MM-dd HH:mm:ss} [%thread] %-5level %logger{36} - %msg%n</pattern>
        </encoder>
    </appender>
    
    <root level="INFO">
        <appender-ref ref="FILE" />
    </root>
</configuration>
```

### Uso en Controllers
```java
@RestController
@Slf4j // Lombok
public class SeguroController {
    
    @GetMapping("/api/seguros")
    public ResponseEntity<List<SeguroDTO>> listarSeguros() {
        log.info("Listando seguros disponibles");
        try {
            List<SeguroDTO> seguros = seguroService.listarActivos();
            log.info("Se encontraron {} seguros", seguros.size());
            return ResponseEntity.ok(seguros);
        } catch (Exception e) {
            log.error("Error al listar seguros", e);
            // REQUISITO CSI2: NUNCA enviar stacktrace al cliente
            return ResponseEntity.status(500).body(Collections.emptyList());
        }
    }
}
```

---

## ⚠️ Manejo de Errores (REQUISITO CSI2 CRÍTICO)

### Clase de Error Global
```java
@Data
@AllArgsConstructor
public class ErrorResponse {
    private String error;
    private String codigo;
    private LocalDateTime timestamp;
}

@ControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGenericException(Exception ex) {
        // REQUISITO CSI2: NUNCA enviar stacktrace al frontend
        log.error("Error interno del servidor", ex);
        
        ErrorResponse error = new ErrorResponse(
            "Ha ocurrido un error interno. Por favor, intenta más tarde.",
            "ERROR_INTERNO",
            LocalDateTime.now()
        );
        
        return ResponseEntity.status(500).body(error);
    }
    
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleNotFound(ResourceNotFoundException ex) {
        ErrorResponse error = new ErrorResponse(
            ex.getMessage(),
            "RECURSO_NO_ENCONTRADO",
            LocalDateTime.now()
        );
        return ResponseEntity.status(404).body(error);
    }
    
    // Más handlers específicos...
}
```

---

## 🐳 Docker Compose

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:17-alpine
    environment:
      POSTGRES_DB: vesta_db
      POSTGRES_USER: vesta_user
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql

  backend:
    image: eclipse-temurin:21-jre-alpine
    volumes:
      - ./target/vesta-0.0.1-SNAPSHOT.jar:/app.jar
      - ./logs:/logs
    ports:
      - "8080:8080"
    environment:
      SPRING_DATASOURCE_URL: jdbc:postgresql://postgres:5432/vesta_db
      SPRING_DATASOURCE_USERNAME: vesta_user
      SPRING_DATASOURCE_PASSWORD: ${DB_PASSWORD}
      JWT_SECRET: ${JWT_SECRET}
    depends_on:
      - postgres
    command: java -jar /app.jar

  frontend:
    image: nginx:alpine
    volumes:
      - ./frontend/build:/usr/share/nginx/html
    ports:
      - "80:80"
      - "443:443"
    depends_on:
      - backend

volumes:
  postgres_data:
```

---

## ✅ Checklist de Requisitos CSI2

### Base de Datos
- [x] Mínimo 4 tablas (tenemos 7)
- [x] Todas las tablas relacionadas
- [x] Nomenclatura común (id_, desc_, tb_)
- [x] Todas las tablas con datos y utilidad funcional

### Usuarios
- [x] Tabla usuarios con todos los campos requeridos
- [x] Contraseña encriptada (BCrypt)
- [x] 2 roles mínimo: ADMINISTRADOR y USUARIO
- [x] Validación formato email y teléfono español

### Interfaz
- [x] Inicio de sesión y alta
- [x] Control de sesión visual (JWT)
- [x] Gestión de roles (cada usuario ve solo lo que puede)
- [x] Recordar contraseña con token
- [x] Confirmación email con token
- [x] CRUD completo de datos
- [x] Descarga de PDF (pólizas y reportes)

### Control de Acceso
- [x] No acceso directo a URLs sin auth
- [x] Cierre de sesión vuelve al login
- [x] No mostrar IDs en interfaz (solo conceptos)
- [x] Búsquedas con múltiples criterios
- [x] Validación de formularios con mensajes claros
- [x] Confirmación específica para eliminaciones
- [x] No permitir borrar último administrador
- [x] Verificar relaciones antes de eliminar

### Técnicos
- [x] Patrón MVC (Spring Boot MVC)
- [x] Logs en directorio reconocible
- [x] Control total de excepciones
- [x] Sin stacktrace en cliente
- [x] Aplicación nunca "colgada"

---

## 📞 Endpoints Críticos Documentados

Todos los endpoints están documentados en detalle en: `/data/apiEndpoints.ts`

**Endpoints mínimos requeridos:**
1. POST `/api/auth/register` - Registro
2. POST `/api/auth/login` - Login
3. GET `/api/auth/confirm-email?token=...` - Confirmar email
4. POST `/api/auth/forgot-password` - Solicitar reset
5. POST `/api/auth/reset-password` - Restablecer password
6. GET `/api/seguros` - Listar seguros
7. GET `/api/seguros/{id}` - Detalle seguro
8. POST `/api/ordenes/checkout` - Comprar
9. GET `/api/polizas/usuario/{userId}` - Pólizas del usuario
10. GET `/api/polizas/{id}/descargar-pdf` - PDF póliza
11. GET `/api/usuarios` - Listar usuarios (ADMIN)
12. DELETE `/api/usuarios/{id}` - Eliminar usuario (ADMIN)

---

## 🚀 Pasos de Integración

1. **Clonar y configurar el proyecto Spring Boot**
2. **Crear base de datos PostgreSQL con las 7 tablas**
3. **Configurar application.yml con credenciales**
4. **Implementar servicios JWT, Email y PDF**
5. **Crear DTOs para todas las respuestas**
6. **Implementar controllers con @RestController**
7. **Configurar CORS para permitir frontend**
8. **Implementar GlobalExceptionHandler**
9. **Configurar logging con Logback**
10. **Crear Docker Compose**
11. **Probar todos los endpoints con Postman**
12. **Conectar frontend React a backend**

---

## 📝 Notas Importantes

- **NUNCA** enviar IDs en respuestas JSON (solo conceptos)
- **SIEMPRE** encriptar contraseñas con BCrypt
- **NUNCA** exponer stacktrace al cliente
- **SIEMPRE** validar tokens JWT en endpoints protegidos
- **REQUISITO:** El último admin NO puede ser eliminado
- **REQUISITO:** Verificar relaciones antes de eliminar registros
- **REQUISITO:** Confirmación específica (escribir texto) para borrados

---

**Desarrollado para Proyecto CSI2 - Centro Educativo Altair**
