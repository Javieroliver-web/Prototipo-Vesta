import { Shield, Lock, Eye, Database, Mail, UserCheck, FileText, ArrowLeft } from 'lucide-react';
import { Header } from './Header';
import type { User, View } from '../App';

interface PrivacyPolicyProps {
  user: User | null;
  onNavigate: (view: View) => void;
  onLogout: () => void;
  cartItemCount: number;
}

export function PrivacyPolicy({ user, onNavigate, onLogout, cartItemCount }: PrivacyPolicyProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {user && (
        <Header
          user={user}
          onNavigate={onNavigate}
          onLogout={onLogout}
          cartItemCount={cartItemCount}
        />
      )}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!user && (
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 text-gray-600 hover:text-[#f1a61c] mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
          </button>
        )}

        <div className="bg-white rounded-xl shadow-sm p-8 md:p-12">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-10 h-10 text-[#f1a61c]" />
            <h1 className="text-3xl text-gray-900">Política de Privacidad y Protección de Datos</h1>
          </div>

          <div className="text-sm text-gray-500 mb-8">
            <p>Última actualización: 3 de diciembre de 2025</p>
            <p>Conforme al RGPD (UE) 2016/679 y LOPDGDD 3/2018</p>
          </div>

          <div className="space-y-8">
            {/* 1. RESPONSABLE DEL TRATAMIENTO */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <UserCheck className="w-6 h-6 text-[#f1a61c]" />
                <h2 className="text-2xl text-gray-900">1. Responsable del Tratamiento de Datos</h2>
              </div>
              <div className="bg-gray-50 rounded-lg p-6 space-y-2">
                <p><strong>Identidad:</strong> Vesta Seguros, S.L.</p>
                <p><strong>NIF:</strong> B-12345678</p>
                <p><strong>Dirección:</strong> Calle Ejemplo, 123, 28001 Madrid, España</p>
                <p><strong>Correo electrónico:</strong> privacidad@vesta.com</p>
                <p><strong>Teléfono:</strong> +34 900 123 456</p>
                <p><strong>Delegado de Protección de Datos (DPO):</strong> dpo@vesta.com</p>
              </div>
            </section>

            {/* 2. DATOS QUE RECOGEMOS */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Database className="w-6 h-6 text-[#f1a61c]" />
                <h2 className="text-2xl text-gray-900">2. Datos Personales que Recogemos</h2>
              </div>
              <div className="prose max-w-none">
                <h3 className="text-lg text-gray-900 mt-4 mb-2">2.1. Datos de Registro</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li><strong>Nombre completo:</strong> Para identificación y comunicaciones</li>
                  <li><strong>Correo electrónico:</strong> Para autenticación, notificaciones y comunicaciones</li>
                  <li><strong>Número de móvil:</strong> Para contacto y verificación de identidad</li>
                  <li><strong>Contraseña encriptada:</strong> Para acceso seguro a la plataforma</li>
                </ul>

                <h3 className="text-lg text-gray-900 mt-6 mb-2">2.2. Datos de Pólizas y Transacciones</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Información de seguros contratados</li>
                  <li>Historial de compras y transacciones</li>
                  <li>Datos de facturación y pago (procesados de forma segura por terceros certificados PCI-DSS)</li>
                  <li>Número de pólizas activas, vencidas o canceladas</li>
                </ul>

                <h3 className="text-lg text-gray-900 mt-6 mb-2">2.3. Datos Técnicos y de Navegación</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Dirección IP</li>
                  <li>Tipo de navegador y dispositivo</li>
                  <li>Páginas visitadas y tiempo de navegación</li>
                  <li>Cookies y tecnologías similares (ver nuestra Política de Cookies)</li>
                </ul>
              </div>
            </section>

            {/* 3. FINALIDAD DEL TRATAMIENTO */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Eye className="w-6 h-6 text-[#f1a61c]" />
                <h2 className="text-2xl text-gray-900">3. Finalidad del Tratamiento</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <div className="bg-blue-50 border-l-4 border-[#f1a61c] p-4">
                  <p className="text-sm">
                    <strong>Base legal:</strong> Ejecución de contrato (art. 6.1.b RGPD), 
                    consentimiento del interesado (art. 6.1.a RGPD) y cumplimiento de obligaciones legales (art. 6.1.c RGPD)
                  </p>
                </div>
                
                <h3 className="text-lg text-gray-900 mt-4">Tratamos tus datos para:</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Gestión de cuenta de usuario:</strong> Crear y gestionar tu perfil en Vesta</li>
                  <li><strong>Prestación del servicio:</strong> Emitir, gestionar y administrar pólizas de seguros</li>
                  <li><strong>Procesamiento de pagos:</strong> Gestionar transacciones de forma segura</li>
                  <li><strong>Comunicaciones:</strong> Enviar confirmaciones de compra, actualizaciones de pólizas y notificaciones importantes</li>
                  <li><strong>Atención al cliente:</strong> Responder consultas y proporcionar soporte</li>
                  <li><strong>Cumplimiento legal:</strong> Cumplir obligaciones fiscales, contables y regulatorias del sector asegurador</li>
                  <li><strong>Mejora del servicio:</strong> Analizar el uso de la plataforma para mejorar la experiencia (previo consentimiento)</li>
                  <li><strong>Marketing (opcional):</strong> Enviar ofertas y promociones solo si has dado tu consentimiento expreso</li>
                </ul>
              </div>
            </section>

            {/* 4. LEGITIMACIÓN */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-6 h-6 text-[#f1a61c]" />
                <h2 className="text-2xl text-gray-900">4. Legitimación del Tratamiento</h2>
              </div>
              <div className="bg-gray-50 rounded-lg p-6 space-y-3 text-gray-700">
                <p>El tratamiento de tus datos personales se basa en:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Ejecución del contrato:</strong> Para la prestación de servicios de seguros que has solicitado</li>
                  <li><strong>Consentimiento expreso:</strong> Para comunicaciones comerciales y análisis de datos (que puedes retirar en cualquier momento)</li>
                  <li><strong>Interés legítimo:</strong> Para la prevención del fraude y seguridad de la plataforma</li>
                  <li><strong>Obligación legal:</strong> Cumplimiento de normativa fiscal, contable y del sector asegurador (Ley 20/2015 de Ordenación, Supervisión y Solvencia de Entidades Aseguradoras)</li>
                </ul>
              </div>
            </section>

            {/* 5. CONSERVACIÓN DE DATOS */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Database className="w-6 h-6 text-[#f1a61c]" />
                <h2 className="text-2xl text-gray-900">5. Conservación de los Datos</h2>
              </div>
              <div className="text-gray-700 space-y-3">
                <p>Los datos personales se conservarán durante:</p>
                <div className="bg-gray-50 rounded-lg p-6 space-y-3">
                  <p><strong>Datos de cuenta activa:</strong> Mientras mantengas tu cuenta activa</p>
                  <p><strong>Datos de pólizas:</strong> Durante la vigencia de la póliza + 10 años (conforme a normativa del sector asegurador)</p>
                  <p><strong>Datos fiscales y contables:</strong> 6 años desde la última transacción (Ley General Tributaria)</p>
                  <p><strong>Datos de marketing:</strong> Hasta que retires tu consentimiento o solicites la baja</p>
                </div>
                <p className="text-sm italic">
                  Transcurridos los plazos legales, los datos serán eliminados o anonimizados de forma segura.
                </p>
              </div>
            </section>

            {/* 6. DESTINATARIOS */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Mail className="w-6 h-6 text-[#f1a61c]" />
                <h2 className="text-2xl text-gray-900">6. Destinatarios de los Datos</h2>
              </div>
              <div className="text-gray-700 space-y-3">
                <p>Tus datos pueden ser compartidos con:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Proveedores de servicios tecnológicos:</strong> Hosting, almacenamiento en la nube (con garantías RGPD)</li>
                  <li><strong>Pasarelas de pago:</strong> Para procesar transacciones de forma segura (certificados PCI-DSS)</li>
                  <li><strong>Proveedores de email:</strong> Para envío de comunicaciones transaccionales</li>
                  <li><strong>Aseguradoras colaboradoras:</strong> Para la emisión y gestión de pólizas</li>
                  <li><strong>Autoridades competentes:</strong> Cuando sea legalmente requerido (AEPD, Hacienda, juzgados)</li>
                </ul>
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4">
                  <p className="text-sm">
                    ⚠️ <strong>Importante:</strong> Vesta NO vende, alquila ni cede tus datos a terceros con fines comerciales. 
                    Todos nuestros proveedores están sujetos a contratos de tratamiento de datos conforme al RGPD.
                  </p>
                </div>
              </div>
            </section>

            {/* 7. TRANSFERENCIAS INTERNACIONALES */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Database className="w-6 h-6 text-[#f1a61c]" />
                <h2 className="text-2xl text-gray-900">7. Transferencias Internacionales</h2>
              </div>
              <div className="text-gray-700">
                <p className="mb-3">
                  En caso de utilizarse servicios de terceros ubicados fuera del Espacio Económico Europeo (EEE), 
                  garantizamos que se cumplan las garantías adecuadas:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Cláusulas Contractuales Tipo aprobadas por la Comisión Europea</li>
                  <li>Certificaciones Privacy Shield (si aplica)</li>
                  <li>Decisiones de adecuación de la Comisión Europea</li>
                </ul>
              </div>
            </section>

            {/* 8. DERECHOS ARCO */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <UserCheck className="w-6 h-6 text-[#f1a61c]" />
                <h2 className="text-2xl text-gray-900">8. Tus Derechos (Derechos ARCO-POL)</h2>
              </div>
              <div className="text-gray-700 space-y-4">
                <p>Como titular de tus datos, tienes derecho a:</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-sm text-[#f1a61c] mb-2">✓ Acceso</h3>
                    <p className="text-sm">Obtener confirmación sobre el tratamiento de tus datos y una copia de los mismos</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-sm text-[#f1a61c] mb-2">✓ Rectificación</h3>
                    <p className="text-sm">Corregir datos inexactos o incompletos</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-sm text-[#f1a61c] mb-2">✓ Supresión</h3>
                    <p className="text-sm">Solicitar la eliminación de tus datos (derecho al olvido)</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-sm text-[#f1a61c] mb-2">✓ Oposición</h3>
                    <p className="text-sm">Oponerte al tratamiento de tus datos personales</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-sm text-[#f1a61c] mb-2">✓ Limitación</h3>
                    <p className="text-sm">Solicitar la limitación del tratamiento</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-sm text-[#f1a61c] mb-2">✓ Portabilidad</h3>
                    <p className="text-sm">Recibir tus datos en formato estructurado y legible</p>
                  </div>
                </div>

                <div className="bg-[#ffcc7c] rounded-lg p-6 mt-6">
                  <h3 className="text-lg text-[#282c3f] mb-3">¿Cómo ejercer tus derechos?</h3>
                  <p className="text-sm text-[#282c3f] mb-2">
                    Puedes ejercer tus derechos enviando un correo a <strong>privacidad@vesta.com</strong> o una 
                    comunicación postal a nuestra dirección, adjuntando:
                  </p>
                  <ul className="list-disc pl-6 text-sm text-[#282c3f] space-y-1">
                    <li>Copia de tu DNI o documento identificativo</li>
                    <li>Descripción clara del derecho que deseas ejercer</li>
                  </ul>
                  <p className="text-sm text-[#282c3f] mt-3">
                    Responderemos a tu solicitud en un plazo máximo de <strong>1 mes</strong> desde la recepción.
                  </p>
                </div>

                <div className="bg-red-50 border-l-4 border-red-400 p-4 mt-4">
                  <h3 className="text-sm text-red-800 mb-2">⚖️ Derecho a reclamar ante la autoridad de control</h3>
                  <p className="text-sm text-red-700">
                    Si consideras que el tratamiento de tus datos vulnera la normativa, puedes presentar una reclamación ante la 
                    <strong> Agencia Española de Protección de Datos (AEPD)</strong>:
                  </p>
                  <p className="text-sm text-red-700 mt-2">
                    Web: <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer" className="underline">www.aepd.es</a> | 
                    Tel: 901 100 099 | C/ Jorge Juan, 6, 28001 Madrid
                  </p>
                </div>
              </div>
            </section>

            {/* 9. MEDIDAS DE SEGURIDAD */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Lock className="w-6 h-6 text-[#f1a61c]" />
                <h2 className="text-2xl text-gray-900">9. Medidas de Seguridad</h2>
              </div>
              <div className="text-gray-700 space-y-3">
                <p>Vesta implementa medidas técnicas y organizativas para proteger tus datos:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-sm text-gray-900 mb-2">🔒 Encriptación</h3>
                    <p className="text-sm">Contraseñas encriptadas con BCrypt, conexiones HTTPS/TLS</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-sm text-gray-900 mb-2">🛡️ Firewall y antivirus</h3>
                    <p className="text-sm">Protección perimetral y análisis continuo de amenazas</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-sm text-gray-900 mb-2">👁️ Control de acceso</h3>
                    <p className="text-sm">Autenticación JWT, roles y permisos diferenciados</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-sm text-gray-900 mb-2">💾 Copias de seguridad</h3>
                    <p className="text-sm">Backups diarios encriptados en servidores seguros</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-sm text-gray-900 mb-2">📊 Logs y auditoría</h3>
                    <p className="text-sm">Registro de todas las operaciones críticas</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-sm text-gray-900 mb-2">👥 Personal formado</h3>
                    <p className="text-sm">Equipo capacitado en protección de datos y ciberseguridad</p>
                  </div>
                </div>
              </div>
            </section>

            {/* 10. MENORES DE EDAD */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-6 h-6 text-[#f1a61c]" />
                <h2 className="text-2xl text-gray-900">10. Menores de Edad</h2>
              </div>
              <div className="bg-red-50 border-l-4 border-red-400 p-6 text-red-700">
                <p>
                  Vesta NO está dirigido a menores de 18 años. No recopilamos conscientemente datos personales de menores. 
                  Si eres padre/madre/tutor y descubres que un menor ha proporcionado datos personales, 
                  contacta inmediatamente con nosotros en <strong>privacidad@vesta.com</strong> para proceder a su eliminación.
                </p>
              </div>
            </section>

            {/* 11. COOKIES */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Eye className="w-6 h-6 text-[#f1a61c]" />
                <h2 className="text-2xl text-gray-900">11. Cookies y Tecnologías Similares</h2>
              </div>
              <div className="text-gray-700">
                <p className="mb-3">
                  Utilizamos cookies y tecnologías similares para mejorar tu experiencia. 
                  Para más información, consulta nuestra{' '}
                  <button
                    onClick={() => onNavigate('cookies')}
                    className="text-[#f1a61c] hover:text-[#f4b94c] underline"
                  >
                    Política de Cookies
                  </button>.
                </p>
              </div>
            </section>

            {/* 12. ACTUALIZACIONES */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-6 h-6 text-[#f1a61c]" />
                <h2 className="text-2xl text-gray-900">12. Actualizaciones de esta Política</h2>
              </div>
              <div className="text-gray-700">
                <p>
                  Nos reservamos el derecho a modificar esta Política de Privacidad. Cualquier cambio será publicado en esta página 
                  y, si son cambios significativos, te notificaremos por correo electrónico. Te recomendamos revisar periódicamente 
                  esta política.
                </p>
              </div>
            </section>

            {/* CONTACTO */}
            <section className="border-t pt-8 mt-8">
              <h2 className="text-2xl text-gray-900 mb-4">Contacto</h2>
              <div className="bg-[#282c3f] text-white rounded-lg p-6">
                <p className="mb-2">Para cualquier duda sobre el tratamiento de tus datos personales:</p>
                <p className="mb-1"><strong>Email:</strong> privacidad@vesta.com</p>
                <p className="mb-1"><strong>Delegado de Protección de Datos:</strong> dpo@vesta.com</p>
                <p className="mb-1"><strong>Teléfono:</strong> +34 900 123 456 (L-V 9:00-18:00h)</p>
                <p><strong>Dirección:</strong> Calle Ejemplo, 123, 28001 Madrid, España</p>
              </div>
            </section>
          </div>

          <div className="mt-8 pt-6 border-t text-center text-sm text-gray-500">
            <p>
              Esta Política de Privacidad cumple con el RGPD (UE) 2016/679 y la LOPDGDD 3/2018
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
