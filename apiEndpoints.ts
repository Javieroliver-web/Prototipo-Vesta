/**
 * DOCUMENTACIÓN API ENDPOINTS - PROYECTO CSI2 VESTA
 * 
 * Este archivo documenta todos los endpoints REST que debe implementar
 * el backend Java/Spring Boot para cumplir con los requisitos del proyecto.
 * 
 * Stack Backend Planeado:
 * - Java 21
 * - Spring Boot 3.2.3
 * - Maven 3.9.6
 * - PostgreSQL 17
 * - JJWT para autenticación
 * - Spring Data JPA
 * - Lombok
 * - Docker (eclipse-temurin:21-jre-alpine)
 */

// ============================================================================
// REQUISITO: Autenticación y Gestión de Usuarios
// ============================================================================

/**
 * POST /api/auth/register
 * Registro de nuevos usuarios
 * 
 * REQUISITOS CSI2:
 * - Confirmación de correo con token (enviar email con token)
 * - Contraseña encriptada en BD (usar BCrypt)
 * - Validación de formato de email y teléfono español
 * 
 * Request Body:
 * {
 *   "nombreCompleto": "string (max 50 caracteres)",
 *   "movil": "string (formato teléfono español: +34XXXXXXXXX o 6/7XXXXXXXX)",
 *   "correoElectronico": "string (formato email válido)",
 *   "contrasena": "string (mínimo 8 caracteres)",
 *   "tipoUsuario": "USUARIO" (por defecto, solo admin puede crear otros admin)
 * }
 * 
 * Response:
 * {
 *   "id": "uuid",
 *   "mensaje": "Usuario registrado. Por favor, confirma tu correo electrónico.",
 *   "emailEnviado": true
 * }
 */

/**
 * GET /api/auth/confirm-email?token={token}
 * Confirmación de correo electrónico
 * 
 * REQUISITO CSI2: Confirmación de correo en el alta con token
 * 
 * Response:
 * {
 *   "mensaje": "Email confirmado correctamente",
 *   "emailConfirmado": true
 * }
 */

/**
 * POST /api/auth/login
 * Inicio de sesión
 * 
 * REQUISITOS CSI2:
 * - Control de sesión mediante JWT
 * - Validar que el email esté confirmado
 * - Contraseña encriptada (comparar con BCrypt)
 * 
 * Request Body:
 * {
 *   "correoElectronico": "string",
 *   "contrasena": "string"
 * }
 * 
 * Response:
 * {
 *   "id": "uuid",
 *   "nombreCompleto": "string",
 *   "correoElectronico": "string",
 *   "tipoUsuario": "USUARIO | ADMINISTRADOR",
 *   "token": "jwt-token",
 *   "tokenExpiracion": "timestamp"
 * }
 */

/**
 * POST /api/auth/forgot-password
 * Solicitud de recuperación de contraseña
 * 
 * REQUISITO CSI2: Procedimiento de recordar contraseña con token
 * 
 * Request Body:
 * {
 *   "correoElectronico": "string"
 * }
 * 
 * Response:
 * {
 *   "mensaje": "Se ha enviado un correo con instrucciones para restablecer tu contraseña",
 *   "emailEnviado": true
 * }
 */

/**
 * POST /api/auth/reset-password
 * Restablecer contraseña con token
 * 
 * Request Body:
 * {
 *   "token": "string",
 *   "nuevaContrasena": "string"
 * }
 * 
 * Response:
 * {
 *   "mensaje": "Contraseña actualizada correctamente"
 * }
 */

/**
 * POST /api/auth/logout
 * Cierre de sesión
 * 
 * Headers: Authorization: Bearer {token}
 * 
 * REQUISITO CSI2: Al cerrar sesión, invalidar token y redirigir a login
 */

// ============================================================================
// REQUISITO: Gestión de Usuarios (Solo ADMINISTRADOR)
// ============================================================================

/**
 * GET /api/usuarios
 * Listar todos los usuarios (solo ADMINISTRADOR)
 * 
 * Headers: Authorization: Bearer {token}
 * Query Params:
 * - busqueda: string (búsqueda por nombre, email o móvil)
 * - tipoUsuario: USUARIO | ADMINISTRADOR
 * - pagina: number
 * - tamanoPagina: number
 * 
 * REQUISITO CSI2: Búsqueda con varios conceptos
 * 
 * Response:
 * {
 *   "usuarios": [
 *     {
 *       "id": "uuid",
 *       "nombreCompleto": "string",
 *       "movil": "string",
 *       "correoElectronico": "string",
 *       "tipoUsuario": "USUARIO | ADMINISTRADOR",
 *       "emailConfirmado": boolean,
 *       "fechaCreacion": "timestamp"
 *     }
 *   ],
 *   "totalElementos": number,
 *   "totalPaginas": number
 * }
 */

/**
 * PUT /api/usuarios/{id}
 * Actualizar usuario (admin puede actualizar cualquiera, usuario solo a sí mismo)
 * 
 * Headers: Authorization: Bearer {token}
 * 
 * REQUISITO CSI2: Validación de campos
 */

/**
 * DELETE /api/usuarios/{id}
 * Eliminar usuario (solo ADMINISTRADOR)
 * 
 * Headers: Authorization: Bearer {token}
 * 
 * REQUISITOS CSI2:
 * - No se puede eliminar al último administrador
 * - Verificar relaciones con otras tablas (pólizas activas)
 * - Si tiene pólizas activas, no permitir eliminación o cancelarlas primero
 * 
 * Response (si tiene relaciones):
 * {
 *   "error": "No se puede eliminar el usuario porque tiene pólizas activas",
 *   "polizasActivas": number
 * }
 */

// ============================================================================
// REQUISITO: Catálogo de Seguros (4 TABLAS MÍNIMO)
// ============================================================================

/**
 * ESTRUCTURA DE BASE DE DATOS (4 tablas mínimo):
 * 
 * 1. tb_usuarios (id_usuario, nombre_completo, movil, correo_electronico, tipo_usuario, contrasena_hash, email_confirmado, token_confirmacion, token_reset_password, fecha_creacion)
 * 2. tb_seguros (id_seguro, nombre_seguro, categoria_id, desc_corta, desc_completa, precio_base, duracion_tipo, imagen_url, activo, fecha_creacion)
 * 3. tb_categorias (id_categoria, nombre_categoria, desc_categoria, icono)
 * 4. tb_coberturas (id_cobertura, seguro_id, desc_cobertura, monto_maximo, orden)
 * 5. tb_polizas (id_poliza, usuario_id, seguro_id, num_poliza, estado, fecha_inicio, fecha_fin, precio_pagado, duracion, fecha_compra)
 * 6. tb_ordenes (id_orden, usuario_id, total_subtotal, total_impuestos, total_final, estado_pago, metodo_pago, fecha_orden)
 * 7. tb_orden_items (id_item, orden_id, seguro_id, cantidad, precio_unitario, duracion, subtotal)
 * 
 * REQUISITO CSI2: Nomenclatura común (desc_ para descripciones, id_ para IDs, etc.)
 */

/**
 * GET /api/seguros
 * Listar seguros disponibles
 * 
 * Query Params:
 * - busqueda: string (búsqueda por nombre o descripción)
 * - categoria: string
 * - precioMin: number
 * - precioMax: number
 * - activo: boolean
 * 
 * Response:
 * {
 *   "seguros": [
 *     {
 *       "id": "uuid",
 *       "nombre": "string",
 *       "categoria": "string", // NO enviar id_categoria al frontend
 *       "descripcionCorta": "string",
 *       "descripcionCompleta": "string",
 *       "precioBase": number,
 *       "duracionTipo": "DIA | MES | EVENTO | VIAJE",
 *       "coberturas": ["string", ...],
 *       "imagenUrl": "string"
 *     }
 *   ]
 * }
 * 
 * REQUISITO CSI2: No mostrar IDs en la respuesta, solo conceptos
 */

/**
 * GET /api/seguros/{id}
 * Detalle de un seguro
 */

/**
 * POST /api/seguros (solo ADMINISTRADOR)
 * Crear nuevo seguro
 * 
 * REQUISITO CSI2: Validación completa de campos
 */

/**
 * PUT /api/seguros/{id} (solo ADMINISTRADOR)
 * Actualizar seguro
 */

/**
 * DELETE /api/seguros/{id} (solo ADMINISTRADOR)
 * Eliminar seguro
 * 
 * REQUISITO CSI2: Verificar si tiene pólizas activas asociadas
 */

// ============================================================================
// REQUISITO: Gestión de Pólizas
// ============================================================================

/**
 * GET /api/polizas/usuario/{usuarioId}
 * Obtener pólizas del usuario autenticado
 * 
 * Headers: Authorization: Bearer {token}
 * Query Params:
 * - estado: ACTIVA | VENCIDA | CANCELADA
 * 
 * Response: Array de pólizas con información del seguro (sin IDs)
 */

/**
 * PUT /api/polizas/{id}/cancelar
 * Cancelar póliza
 * 
 * Headers: Authorization: Bearer {token}
 * 
 * REQUISITO CSI2: Pedir confirmación específica desde el frontend
 */

/**
 * GET /api/polizas/{id}/descargar-pdf
 * Descargar póliza en PDF
 * 
 * Headers: Authorization: Bearer {token}
 * 
 * REQUISITO CSI2: Informe de datos en PDF
 * 
 * Response: Archivo PDF con:
 * - Datos del usuario
 * - Datos de la póliza
 * - Coberturas incluidas
 * - Número de póliza
 * - Fecha de inicio y fin
 * - Precio pagado
 */

// ============================================================================
// REQUISITO: Proceso de Compra (Órdenes)
// ============================================================================

/**
 * POST /api/ordenes/checkout
 * Procesar compra
 * 
 * Headers: Authorization: Bearer {token}
 * 
 * Request Body:
 * {
 *   "items": [
 *     {
 *       "seguroId": "uuid",
 *       "cantidad": number,
 *       "duracion": number
 *     }
 *   ],
 *   "metodoPago": {
 *     "numeroTarjeta": "string (encriptar antes de enviar)",
 *     "nombreTarjeta": "string",
 *     "fechaVencimiento": "string",
 *     "cvv": "string (nunca almacenar)"
 *   }
 * }
 * 
 * Response:
 * {
 *   "ordenId": "uuid",
 *   "numeroOrden": "string",
 *   "polizasCreadas": [
 *     {
 *       "polizaId": "uuid",
 *       "numeroPoliza": "string",
 *       "seguroNombre": "string"
 *     }
 *   ],
 *   "total": number,
 *   "estadoPago": "COMPLETADO"
 * }
 */

/**
 * GET /api/ordenes/usuario/{usuarioId}
 * Historial de órdenes
 * 
 * Headers: Authorization: Bearer {token}
 */

/**
 * GET /api/ordenes/{id}/descargar-factura-pdf
 * Descargar factura en PDF
 * 
 * REQUISITO CSI2: Informe de datos (factura) en PDF
 */

// ============================================================================
// REQUISITO: Reportes y Estadísticas (Solo ADMINISTRADOR)
// ============================================================================

/**
 * GET /api/reportes/ventas
 * Reporte de ventas
 * 
 * Headers: Authorization: Bearer {token}
 * Rol: ADMINISTRADOR
 * 
 * Query Params:
 * - fechaInicio: date
 * - fechaFin: date
 * 
 * REQUISITO CSI2: Descarga en PDF
 */

/**
 * GET /api/reportes/usuarios
 * Reporte de usuarios registrados
 * 
 * REQUISITO CSI2: Descarga en PDF
 */

/**
 * GET /api/reportes/seguros-mas-vendidos
 * Estadísticas de seguros más vendidos
 */

// ============================================================================
// REQUISITOS TÉCNICOS
// ============================================================================

/**
 * REQUISITO CSI2: Control de Acceso
 * 
 * - Todas las rutas protegidas deben verificar el token JWT
 * - Si el token es inválido o ha expirado, responder con 401 Unauthorized
 * - El frontend debe redirigir al login automáticamente
 * - No se puede acceder directamente a ninguna URL sin autenticación
 */

/**
 * REQUISITO CSI2: Control de Roles
 * 
 * - Verificar el rol del usuario en cada endpoint protegido
 * - Si no tiene permisos, responder con 403 Forbidden
 * - Ejemplo: Solo ADMINISTRADOR puede acceder a /api/usuarios
 */

/**
 * REQUISITO CSI2: Manejo de Errores
 * 
 * - NUNCA enviar stacktrace al frontend
 * - Usar try-catch en todos los controllers
 * - Respuestas de error consistentes:
 * {
 *   "error": "Mensaje amigable para el usuario",
 *   "codigo": "ERROR_ESPECIFICO",
 *   "timestamp": "timestamp"
 * }
 */

/**
 * REQUISITO CSI2: Logging
 * 
 * - Usar SLF4J + Logback
 * - Logs en archivo: /logs/vesta-app.log
 * - Niveles: INFO para operaciones normales, ERROR para excepciones
 * - Incluir en log: timestamp, nivel, usuario (si está autenticado), acción
 */

/**
 * REQUISITO CSI2: Validaciones
 * 
 * - Usar @Valid y @Validated en DTOs
 * - Validaciones personalizadas para:
 *   * Formato teléfono español: ^(\\+34|0034|34)?[6789]\\d{8}$
 *   * Email: usar @Email de javax.validation
 *   * Longitud nombre: @Size(max = 50)
 * - Mensajes de error claros en español
 */

export {};
