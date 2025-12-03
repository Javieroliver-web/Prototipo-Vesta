import { Cookie, Eye, Settings, BarChart, ArrowLeft } from 'lucide-react';
import { Header } from './Header';
import type { User, View } from '../App';

interface CookiePolicyProps {
  user: User | null;
  onNavigate: (view: View) => void;
  onLogout: () => void;
  cartItemCount: number;
}

export function CookiePolicy({ user, onNavigate, onLogout, cartItemCount }: CookiePolicyProps) {
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
            <Cookie className="w-10 h-10 text-[#f1a61c]" />
            <h1 className="text-3xl text-gray-900">Política de Cookies</h1>
          </div>

          <div className="text-sm text-gray-500 mb-8">
            <p>Última actualización: 3 de diciembre de 2025</p>
            <p>Conforme a la LSSI-CE (Ley 34/2002) y el RGPD (UE) 2016/679</p>
          </div>

          <div className="space-y-8">
            {/* QUÉ SON LAS COOKIES */}
            <section>
              <h2 className="text-2xl text-gray-900 mb-4">¿Qué son las cookies?</h2>
              <div className="text-gray-700 space-y-3">
                <p>
                  Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo (ordenador, tablet o móvil) 
                  cuando visitas un sitio web. Permiten que la web recuerde tus acciones y preferencias durante un período 
                  de tiempo, para mejorar tu experiencia de navegación.
                </p>
                <div className="bg-blue-50 border-l-4 border-[#f1a61c] p-4">
                  <p className="text-sm">
                    <strong>💡 Importante:</strong> Las cookies NO son virus ni programas maliciosos. Son archivos de texto 
                    que no pueden ejecutar código ni dañar tu dispositivo.
                  </p>
                </div>
              </div>
            </section>

            {/* TIPOS DE COOKIES QUE USAMOS */}
            <section>
              <h2 className="text-2xl text-gray-900 mb-4">Tipos de Cookies que Utilizamos</h2>
              
              {/* Cookies Técnicas */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Settings className="w-5 h-5 text-[#f1a61c]" />
                  <h3 className="text-xl text-gray-900">1. Cookies Técnicas y Funcionales (Necesarias)</h3>
                </div>
                <div className="bg-gray-50 rounded-lg p-6">
                  <p className="text-sm text-gray-700 mb-3">
                    <strong>Finalidad:</strong> Esenciales para el funcionamiento básico de la plataforma. 
                    Permiten la navegación y el uso de funcionalidades básicas.
                  </p>
                  <p className="text-sm text-gray-700 mb-3">
                    <strong>No requieren consentimiento</strong> según el artículo 22.2 de la LSSI-CE.
                  </p>
                  <table className="w-full text-sm">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="p-2 text-left">Cookie</th>
                        <th className="p-2 text-left">Finalidad</th>
                        <th className="p-2 text-left">Duración</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="p-2"><code className="bg-gray-200 px-2 py-1 rounded">vesta_session</code></td>
                        <td className="p-2">Mantener la sesión del usuario</td>
                        <td className="p-2">Sesión</td>
                      </tr>
                      <tr>
                        <td className="p-2"><code className="bg-gray-200 px-2 py-1 rounded">vesta_auth_token</code></td>
                        <td className="p-2">Autenticación JWT</td>
                        <td className="p-2">7 días</td>
                      </tr>
                      <tr>
                        <td className="p-2"><code className="bg-gray-200 px-2 py-1 rounded">vesta_cart</code></td>
                        <td className="p-2">Mantener carrito de compras</td>
                        <td className="p-2">30 días</td>
                      </tr>
                      <tr>
                        <td className="p-2"><code className="bg-gray-200 px-2 py-1 rounded">cookie_consent</code></td>
                        <td className="p-2">Recordar preferencias de cookies</td>
                        <td className="p-2">1 año</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Cookies Analíticas */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <BarChart className="w-5 h-5 text-[#f1a61c]" />
                  <h3 className="text-xl text-gray-900">2. Cookies Analíticas (Opcionales)</h3>
                </div>
                <div className="bg-gray-50 rounded-lg p-6">
                  <p className="text-sm text-gray-700 mb-3">
                    <strong>Finalidad:</strong> Analizar cómo los usuarios interactúan con la plataforma para mejorar 
                    la experiencia y detectar problemas técnicos.
                  </p>
                  <p className="text-sm text-[#f1a61c] mb-3">
                    <strong>✓ Requieren tu consentimiento explícito</strong>
                  </p>
                  <table className="w-full text-sm">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="p-2 text-left">Cookie</th>
                        <th className="p-2 text-left">Proveedor</th>
                        <th className="p-2 text-left">Finalidad</th>
                        <th className="p-2 text-left">Duración</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="p-2"><code className="bg-gray-200 px-2 py-1 rounded">_ga</code></td>
                        <td className="p-2">Google Analytics</td>
                        <td className="p-2">Distinguir usuarios únicos</td>
                        <td className="p-2">2 años</td>
                      </tr>
                      <tr>
                        <td className="p-2"><code className="bg-gray-200 px-2 py-1 rounded">_gid</code></td>
                        <td className="p-2">Google Analytics</td>
                        <td className="p-2">Distinguir usuarios</td>
                        <td className="p-2">24 horas</td>
                      </tr>
                      <tr>
                        <td className="p-2"><code className="bg-gray-200 px-2 py-1 rounded">_gat</code></td>
                        <td className="p-2">Google Analytics</td>
                        <td className="p-2">Limitar frecuencia de solicitudes</td>
                        <td className="p-2">1 minuto</td>
                      </tr>
                    </tbody>
                  </table>
                  <p className="text-xs text-gray-600 mt-3">
                    📌 <strong>Nota:</strong> Los datos recopilados por Google Analytics están anonimizados y se utilizan 
                    únicamente con fines estadísticos.
                  </p>
                </div>
              </div>

              {/* Cookies de Marketing */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Eye className="w-5 h-5 text-[#f1a61c]" />
                  <h3 className="text-xl text-gray-900">3. Cookies de Marketing y Publicidad (Opcionales)</h3>
                </div>
                <div className="bg-gray-50 rounded-lg p-6">
                  <p className="text-sm text-gray-700 mb-3">
                    <strong>Finalidad:</strong> Mostrar publicidad relevante basada en tus intereses y medir 
                    la efectividad de campañas publicitarias.
                  </p>
                  <p className="text-sm text-[#f1a61c] mb-3">
                    <strong>✓ Requieren tu consentimiento explícito</strong>
                  </p>
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                    <p className="text-sm text-yellow-800">
                      ⚠️ <strong>Actualmente NO utilizamos cookies de marketing.</strong> Si en el futuro decidimos 
                      implementarlas, solicitaremos tu consentimiento previo explícito.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* GESTIÓN DE COOKIES */}
            <section>
              <h2 className="text-2xl text-gray-900 mb-4">Cómo Gestionar las Cookies</h2>
              <div className="text-gray-700 space-y-4">
                <h3 className="text-lg text-gray-900">1. Panel de Configuración de Vesta</h3>
                <p>
                  Puedes gestionar tus preferencias de cookies en cualquier momento haciendo clic en el botón 
                  "Configurar Cookies" en el banner de cookies o en el pie de página de nuestra web.
                </p>

                <h3 className="text-lg text-gray-900 mt-6">2. Configuración del Navegador</h3>
                <p>
                  También puedes controlar y eliminar cookies mediante la configuración de tu navegador:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="text-sm text-gray-900 mb-2">Google Chrome</h4>
                    <p className="text-xs text-gray-600">
                      Configuración → Privacidad y seguridad → Cookies y otros datos de sitios
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="text-sm text-gray-900 mb-2">Mozilla Firefox</h4>
                    <p className="text-xs text-gray-600">
                      Opciones → Privacidad y seguridad → Cookies y datos del sitio
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="text-sm text-gray-900 mb-2">Safari</h4>
                    <p className="text-xs text-gray-600">
                      Preferencias → Privacidad → Gestionar datos de sitios web
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="text-sm text-gray-900 mb-2">Microsoft Edge</h4>
                    <p className="text-xs text-gray-600">
                      Configuración → Privacidad y servicios → Cookies y permisos del sitio
                    </p>
                  </div>
                </div>

                <div className="bg-red-50 border-l-4 border-red-400 p-4 mt-4">
                  <p className="text-sm text-red-700">
                    ⚠️ <strong>Advertencia:</strong> Si bloqueas o eliminas las cookies necesarias, algunas funcionalidades 
                    de Vesta pueden no funcionar correctamente (ej: mantener la sesión iniciada, recordar el carrito de compras).
                  </p>
                </div>
              </div>
            </section>

            {/* COOKIES DE TERCEROS */}
            <section>
              <h2 className="text-2xl text-gray-900 mb-4">Cookies de Terceros</h2>
              <div className="text-gray-700 space-y-3">
                <p>
                  Algunos servicios externos que utilizamos pueden instalar sus propias cookies:
                </p>
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-sm text-gray-900 mb-3">Google Analytics</h3>
                  <p className="text-sm mb-2">
                    Utilizamos Google Analytics para analizar el uso de nuestra plataforma. Google puede utilizar 
                    estos datos para contextualizar y personalizar anuncios en su propia red publicitaria.
                  </p>
                  <p className="text-xs text-gray-600">
                    Más información:{' '}
                    <a 
                      href="https://policies.google.com/privacy" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[#f1a61c] hover:text-[#f4b94c] underline"
                    >
                      Política de Privacidad de Google
                    </a>
                  </p>
                  <p className="text-xs text-gray-600 mt-2">
                    Puedes desactivar Google Analytics:{' '}
                    <a 
                      href="https://tools.google.com/dlpage/gaoptout" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[#f1a61c] hover:text-[#f4b94c] underline"
                    >
                      Complemento de inhabilitación
                    </a>
                  </p>
                </div>
              </div>
            </section>

            {/* CONSENTIMIENTO */}
            <section>
              <h2 className="text-2xl text-gray-900 mb-4">Tu Consentimiento</h2>
              <div className="bg-[#ffcc7c] rounded-lg p-6 text-[#282c3f]">
                <p className="mb-3">
                  Al utilizar nuestra plataforma, aceptas el uso de cookies necesarias para el funcionamiento básico.
                </p>
                <p className="mb-3">
                  Para las cookies analíticas y de marketing, solicitamos tu <strong>consentimiento explícito</strong> 
                  mediante nuestro banner de cookies.
                </p>
                <p>
                  Puedes retirar tu consentimiento en cualquier momento modificando tus preferencias en la configuración 
                  de cookies.
                </p>
              </div>
            </section>

            {/* ACTUALIZACIONES */}
            <section>
              <h2 className="text-2xl text-gray-900 mb-4">Actualizaciones de esta Política</h2>
              <div className="text-gray-700">
                <p>
                  Podemos actualizar esta Política de Cookies ocasionalmente. Te notificaremos sobre cambios significativos 
                  mediante un aviso en nuestra plataforma o por correo electrónico.
                </p>
                <p className="mt-3 text-sm text-gray-600">
                  Fecha de última actualización: <strong>3 de diciembre de 2025</strong>
                </p>
              </div>
            </section>

            {/* MÁS INFORMACIÓN */}
            <section>
              <h2 className="text-2xl text-gray-900 mb-4">Más Información</h2>
              <div className="bg-[#282c3f] text-white rounded-lg p-6">
                <p className="mb-3">
                  Para cualquier duda sobre nuestra Política de Cookies:
                </p>
                <p className="mb-1"><strong>Email:</strong> cookies@vesta.com</p>
                <p className="mb-1"><strong>DPO:</strong> dpo@vesta.com</p>
                <p><strong>Teléfono:</strong> +34 900 123 456</p>
              </div>
            </section>

            {/* RECURSOS */}
            <section className="border-t pt-6">
              <h3 className="text-lg text-gray-900 mb-3">Recursos útiles sobre cookies:</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>
                  📄{' '}
                  <a 
                    href="https://www.aepd.es/es/areas-de-actuacion/reglamento-europeo-de-proteccion-de-datos/guias" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#f1a61c] hover:text-[#f4b94c] underline"
                  >
                    Guía sobre uso de cookies - AEPD
                  </a>
                </li>
                <li>
                  📄{' '}
                  <a 
                    href="https://www.allaboutcookies.org" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#f1a61c] hover:text-[#f4b94c] underline"
                  >
                    All About Cookies (información general)
                  </a>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
