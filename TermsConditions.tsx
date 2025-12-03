import { FileText, Shield, AlertCircle, ArrowLeft } from 'lucide-react';
import { Header } from './Header';
import type { User, View } from '../App';

interface TermsConditionsProps {
  user: User | null;
  onNavigate: (view: View) => void;
  onLogout: () => void;
  cartItemCount: number;
}

export function TermsConditions({ user, onNavigate, onLogout, cartItemCount }: TermsConditionsProps) {
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
            <FileText className="w-10 h-10 text-[#f1a61c]" />
            <h1 className="text-3xl text-gray-900">Términos y Condiciones de Uso</h1>
          </div>

          <div className="text-sm text-gray-500 mb-8">
            <p>Última actualización: 3 de diciembre de 2025</p>
            <p>Vesta Seguros, S.L. - NIF: B-12345678</p>
          </div>

          <div className="space-y-8">
            {/* 1. ACEPTACIÓN */}
            <section>
              <h2 className="text-2xl text-gray-900 mb-4">1. Aceptación de los Términos</h2>
              <div className="text-gray-700 space-y-3">
                <p>
                  Al registrarte y utilizar la plataforma Vesta, aceptas expresamente estos Términos y Condiciones, 
                  así como nuestra Política de Privacidad. Si no estás de acuerdo con alguno de estos términos, 
                  no debes utilizar nuestros servicios.
                </p>
                <div className="bg-[#ffcc7c] rounded-lg p-4">
                  <p className="text-sm text-[#282c3f]">
                    <strong>Importante:</strong> Estos términos constituyen un contrato legal vinculante entre tú (el Usuario) 
                    y Vesta Seguros, S.L. (el Prestador del Servicio).
                  </p>
                </div>
              </div>
            </section>

            {/* 2. DEFINICIONES */}
            <section>
              <h2 className="text-2xl text-gray-900 mb-4">2. Definiciones</h2>
              <div className="bg-gray-50 rounded-lg p-6 space-y-2 text-gray-700">
                <p><strong>"Plataforma" o "Vesta":</strong> El marketplace de micro-seguros on-demand accesible en www.vesta.com</p>
                <p><strong>"Usuario":</strong> Persona física mayor de 18 años registrada en la plataforma</p>
                <p><strong>"Micro-seguro":</strong> Póliza de seguro de corta duración disponible en la plataforma</p>
                <p><strong>"Póliza":</strong> Contrato de seguro emitido tras una compra exitosa</p>
                <p><strong>"Cuenta":</strong> Perfil de usuario con credenciales de acceso únicas</p>
              </div>
            </section>

            {/* 3. OBJETO Y ÁMBITO */}
            <section>
              <h2 className="text-2xl text-gray-900 mb-4">3. Objeto del Servicio</h2>
              <div className="text-gray-700 space-y-3">
                <p>
                  Vesta es un marketplace digital que permite a los usuarios consultar, cotizar y contratar micro-seguros 
                  de forma instantánea y on-demand para diversas necesidades temporales (viajes, eventos, dispositivos, etc.).
                </p>
                <h3 className="text-lg text-gray-900 mt-4">3.1. Servicios Ofrecidos:</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Catálogo de micro-seguros por categorías</li>
                  <li>Sistema de cotización personalizada</li>
                  <li>Contratación instantánea de pólizas</li>
                  <li>Gestión digital de pólizas activas</li>
                  <li>Descarga de documentación en PDF</li>
                  <li>Atención al cliente vía email y teléfono</li>
                </ul>
              </div>
            </section>

            {/* 4. REGISTRO Y CUENTA */}
            <section>
              <h2 className="text-2xl text-gray-900 mb-4">4. Registro y Cuenta de Usuario</h2>
              <div className="text-gray-700 space-y-3">
                <h3 className="text-lg text-gray-900">4.1. Requisitos de Registro:</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Ser mayor de 18 años</li>
                  <li>Proporcionar información veraz, exacta y actualizada</li>
                  <li>Disponer de una dirección de correo electrónico válida</li>
                  <li>Confirmar el correo electrónico mediante el enlace enviado</li>
                  <li>Aceptar estos Términos y la Política de Privacidad</li>
                </ul>

                <h3 className="text-lg text-gray-900 mt-4">4.2. Responsabilidades del Usuario:</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Mantener la confidencialidad de sus credenciales de acceso</li>
                  <li>Notificar inmediatamente cualquier uso no autorizado de su cuenta</li>
                  <li>Actualizar sus datos personales cuando cambien</li>
                  <li>No compartir su cuenta con terceros</li>
                  <li>Ser responsable de todas las actividades realizadas desde su cuenta</li>
                </ul>

                <div className="bg-red-50 border-l-4 border-red-400 p-4 mt-4">
                  <p className="text-sm text-red-700">
                    ⚠️ <strong>Advertencia:</strong> Proporcionar información falsa o fraudulenta puede resultar en la 
                    suspensión o cancelación inmediata de tu cuenta, sin perjuicio de las acciones legales que puedan corresponder.
                  </p>
                </div>
              </div>
            </section>

            {/* 5. CONTRATACIÓN DE SEGUROS */}
            <section>
              <h2 className="text-2xl text-gray-900 mb-4">5. Contratación de Micro-Seguros</h2>
              <div className="text-gray-700 space-y-3">
                <h3 className="text-lg text-gray-900">5.1. Proceso de Compra:</h3>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>Selección del seguro y personalización de cobertura y duración</li>
                  <li>Adición al carrito de compras</li>
                  <li>Verificación de datos y selección de método de pago</li>
                  <li>Confirmación del pago</li>
                  <li>Emisión instantánea de la póliza</li>
                  <li>Envío de documentación por email</li>
                </ol>

                <h3 className="text-lg text-gray-900 mt-4">5.2. Vigencia de las Pólizas:</h3>
                <p>
                  Las pólizas entran en vigor en el momento especificado durante la contratación y tienen la duración 
                  seleccionada por el usuario. El fin de vigencia es automático y no requiere cancelación.
                </p>

                <h3 className="text-lg text-gray-900 mt-4">5.3. Cancelación de Pólizas:</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Puedes cancelar pólizas activas desde tu panel de usuario</li>
                  <li>La cancelación requiere confirmación específica (medida de seguridad)</li>
                  <li>No se realizan reembolsos por cancelaciones anticipadas</li>
                  <li>Las pólizas canceladas no pueden reactivarse</li>
                </ul>
              </div>
            </section>

            {/* 6. PRECIOS Y PAGOS */}
            <section>
              <h2 className="text-2xl text-gray-900 mb-4">6. Precios y Forma de Pago</h2>
              <div className="text-gray-700 space-y-3">
                <h3 className="text-lg text-gray-900">6.1. Precios:</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Los precios se muestran en euros (€) e incluyen IVA (16%)</li>
                  <li>El precio final se calcula según: seguro base × duración + impuestos</li>
                  <li>Los precios pueden variar sin previo aviso</li>
                  <li>El precio aplicable es el vigente en el momento de la compra</li>
                </ul>

                <h3 className="text-lg text-gray-900 mt-4">6.2. Métodos de Pago:</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Tarjetas de crédito/débito (Visa, Mastercard, American Express)</li>
                  <li>Procesamiento seguro mediante pasarelas certificadas PCI-DSS</li>
                  <li>No almacenamos datos completos de tarjetas en nuestros sistemas</li>
                </ul>

                <h3 className="text-lg text-gray-900 mt-4">6.3. Facturación:</h3>
                <p>
                  Tras cada compra exitosa, recibirás una factura en formato PDF por correo electrónico. 
                  También puedes descargar tus facturas desde el panel de usuario.
                </p>
              </div>
            </section>

            {/* 7. DERECHO DE DESISTIMIENTO */}
            <section>
              <h2 className="text-2xl text-gray-900 mb-4">7. Derecho de Desistimiento</h2>
              <div className="bg-blue-50 border-l-4 border-[#f1a61c] p-6 text-gray-700">
                <p className="mb-3">
                  Conforme al artículo 103.l) del Real Decreto Legislativo 1/2007, de 16 de noviembre, 
                  por el que se aprueba el texto refundido de la Ley General para la Defensa de los Consumidores y Usuarios:
                </p>
                <p className="italic">
                  <strong>No existe derecho de desistimiento</strong> en contratos de seguros cuya prestación haya sido 
                  completamente ejecutada y la vigencia de la póliza haya iniciado con el consentimiento expreso del consumidor.
                </p>
                <p className="mt-3 text-sm">
                  Al contratar un seguro en Vesta, aceptas expresamente que la póliza entre en vigor de forma inmediata, 
                  renunciando así a tu derecho de desistimiento de 14 días.
                </p>
              </div>
            </section>

            {/* 8. LIMITACIÓN DE RESPONSABILIDAD */}
            <section>
              <h2 className="text-2xl text-gray-900 mb-4">8. Limitación de Responsabilidad</h2>
              <div className="text-gray-700 space-y-3">
                <h3 className="text-lg text-gray-900">8.1. Disponibilidad del Servicio:</h3>
                <p>
                  Vesta se esfuerza por mantener la plataforma disponible 24/7, pero no garantiza que el acceso sea 
                  ininterrumpido o libre de errores. Podemos suspender temporalmente el servicio por mantenimiento, 
                  actualizaciones o por causas de fuerza mayor.
                </p>

                <h3 className="text-lg text-gray-900 mt-4">8.2. Exactitud de la Información:</h3>
                <p>
                  Nos esforzamos por mantener la información actualizada y precisa, pero no garantizamos que esté 
                  libre de errores. El usuario debe revisar cuidadosamente las condiciones de cada póliza antes de contratarla.
                </p>

                <h3 className="text-lg text-gray-900 mt-4">8.3. Limitaciones:</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Vesta actúa como intermediario entre el usuario y las compañías aseguradoras</li>
                  <li>Las condiciones de cobertura son establecidas por cada aseguradora</li>
                  <li>No nos hacemos responsables de reclamaciones fuera del ámbito de cobertura de cada póliza</li>
                  <li>No somos responsables de daños indirectos, lucro cesante o pérdida de datos</li>
                </ul>
              </div>
            </section>

            {/* 9. PROPIEDAD INTELECTUAL */}
            <section>
              <h2 className="text-2xl text-gray-900 mb-4">9. Propiedad Intelectual e Industrial</h2>
              <div className="text-gray-700 space-y-3">
                <p>
                  Todos los contenidos de la plataforma Vesta (diseño, logotipos, textos, gráficos, código fuente, etc.) 
                  son propiedad de Vesta Seguros, S.L. o de sus licenciantes, y están protegidos por las leyes de 
                  propiedad intelectual e industrial españolas e internacionales.
                </p>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-sm text-gray-900 mb-2">Queda prohibido:</h3>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Copiar, reproducir o distribuir contenidos sin autorización expresa</li>
                    <li>Modificar, descompilar o realizar ingeniería inversa de la plataforma</li>
                    <li>Usar el nombre, logo o marcas de Vesta sin permiso escrito</li>
                    <li>Extraer datos mediante scraping, bots o métodos automatizados</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 10. USO ACEPTABLE */}
            <section>
              <h2 className="text-2xl text-gray-900 mb-4">10. Política de Uso Aceptable</h2>
              <div className="text-gray-700">
                <p className="mb-3">El usuario se compromete a NO:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Utilizar la plataforma para actividades ilegales o fraudulentas</li>
                  <li>Proporcionar información falsa o engañosa</li>
                  <li>Intentar acceder a áreas restringidas o cuentas de terceros</li>
                  <li>Transmitir virus, malware o código malicioso</li>
                  <li>Realizar ataques de denegación de servicio (DoS/DDoS)</li>
                  <li>Acosar, amenazar o difamar a otros usuarios o al personal de Vesta</li>
                  <li>Utilizar la plataforma de forma que pueda dañar, deshabilitar o sobrecargar nuestros servidores</li>
                </ul>
                <div className="bg-red-50 border-l-4 border-red-400 p-4 mt-4">
                  <p className="text-sm text-red-700">
                    ⚠️ El incumplimiento de estas normas puede resultar en la suspensión o cancelación inmediata de 
                    tu cuenta, sin derecho a reembolso, y la posible adopción de medidas legales.
                  </p>
                </div>
              </div>
            </section>

            {/* 11. MODIFICACIONES */}
            <section>
              <h2 className="text-2xl text-gray-900 mb-4">11. Modificación de los Términos</h2>
              <div className="text-gray-700">
                <p>
                  Vesta se reserva el derecho a modificar estos Términos y Condiciones en cualquier momento. 
                  Los cambios serán efectivos desde su publicación en la plataforma. Si los cambios son significativos, 
                  te notificaremos por correo electrónico con al menos 15 días de antelación.
                </p>
                <p className="mt-3">
                  El uso continuado de la plataforma tras la publicación de las modificaciones constituye la aceptación 
                  de los nuevos términos.
                </p>
              </div>
            </section>

            {/* 12. RESOLUCIÓN DE CONFLICTOS */}
            <section>
              <h2 className="text-2xl text-gray-900 mb-4">12. Ley Aplicable y Jurisdicción</h2>
              <div className="text-gray-700 space-y-3">
                <p>
                  Estos Términos y Condiciones se rigen por la legislación española. Para cualquier controversia derivada 
                  de su interpretación o cumplimiento, las partes se someten expresamente a los Juzgados y Tribunales de 
                  Madrid, renunciando a cualquier otro fuero que pudiera corresponderles.
                </p>
                <h3 className="text-lg text-gray-900 mt-4">12.1. Resolución Alternativa de Conflictos:</h3>
                <p>
                  Conforme al Reglamento (UE) 524/2013, los consumidores pueden acceder a la plataforma europea de 
                  resolución de litigios en línea:{' '}
                  <a 
                    href="https://ec.europa.eu/consumers/odr" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#f1a61c] hover:text-[#f4b94c] underline"
                  >
                    https://ec.europa.eu/consumers/odr
                  </a>
                </p>
              </div>
            </section>

            {/* 13. CONTACTO */}
            <section>
              <h2 className="text-2xl text-gray-900 mb-4">13. Contacto y Atención al Cliente</h2>
              <div className="bg-[#282c3f] text-white rounded-lg p-6">
                <p className="mb-3">Para consultas sobre estos Términos y Condiciones o sobre el servicio:</p>
                <p className="mb-1"><strong>Vesta Seguros, S.L.</strong></p>
                <p className="mb-1">NIF: B-12345678</p>
                <p className="mb-1">Dirección: Calle Ejemplo, 123, 28001 Madrid, España</p>
                <p className="mb-1">Email: info@vesta.com</p>
                <p className="mb-1">Teléfono de Atención al Cliente: +34 900 123 456</p>
                <p>Horario: Lunes a Viernes, 9:00 - 18:00h</p>
              </div>
            </section>

            {/* HOJA DE RECLAMACIONES */}
            <section>
              <h2 className="text-2xl text-gray-900 mb-4">14. Hoja de Reclamaciones</h2>
              <div className="bg-[#ffcc7c] rounded-lg p-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-6 h-6 text-[#282c3f] flex-shrink-0 mt-1" />
                  <div className="text-[#282c3f]">
                    <p className="mb-2">
                      Como entidad aseguradora regulada, Vesta pone a disposición de los usuarios las hojas oficiales 
                      de reclamaciones conforme a la normativa vigente.
                    </p>
                    <p className="text-sm">
                      Puedes solicitar una hoja de reclamaciones en <strong>reclamaciones@vesta.com</strong> o 
                      contactando con nuestro Servicio de Atención al Cliente. También puedes presentar reclamaciones 
                      ante la Dirección General de Seguros y Fondos de Pensiones.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div className="mt-8 pt-6 border-t text-center text-sm text-gray-500">
            <p>Vesta Seguros, S.L. - Todos los derechos reservados © 2025</p>
            <p className="mt-1">Registro Mercantil de Madrid, Tomo XXXXX, Folio XX, Hoja M-XXXXXX</p>
          </div>
        </div>
      </div>
    </div>
  );
}
