import { useState, useEffect } from 'react';
import { Cookie, X, Settings } from 'lucide-react';
import type { View } from '../App';

interface CookieBannerProps {
  onNavigate: (view: View) => void;
}

export function CookieBanner({ onNavigate }: CookieBannerProps) {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);
  const [marketingEnabled, setMarketingEnabled] = useState(false);

  useEffect(() => {
    // Verificar si el usuario ya ha dado su consentimiento
    const consent = localStorage.getItem('vesta_cookie_consent');
    if (!consent) {
      // Mostrar banner después de 1 segundo
      setTimeout(() => setShowBanner(true), 1000);
    } else {
      // Cargar preferencias guardadas
      const preferences = JSON.parse(consent);
      setAnalyticsEnabled(preferences.analytics || false);
      setMarketingEnabled(preferences.marketing || false);
    }
  }, []);

  const savePreferences = (acceptAll = false) => {
    const preferences = {
      necessary: true, // Siempre true
      analytics: acceptAll ? true : analyticsEnabled,
      marketing: acceptAll ? true : marketingEnabled,
      timestamp: new Date().toISOString(),
    };

    localStorage.setItem('vesta_cookie_consent', JSON.stringify(preferences));
    
    // TODO: BACKEND - Registrar consentimiento
    // POST /api/usuarios/cookie-consent
    // Body: { userId, preferences, timestamp }
    // Guardar en tb_usuarios o crear tb_cookie_consents

    setShowBanner(false);
    setShowSettings(false);

    // Aplicar preferencias
    if (preferences.analytics) {
      // Inicializar Google Analytics
      console.log('Google Analytics habilitado');
    }
    if (preferences.marketing) {
      // Inicializar cookies de marketing
      console.log('Cookies de marketing habilitadas');
    }
  };

  const handleRejectAll = () => {
    const preferences = {
      necessary: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('vesta_cookie_consent', JSON.stringify(preferences));
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 pb-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden">
          {!showSettings ? (
            // Banner Principal
            <div className="p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <Cookie className="w-12 h-12 text-[#f1a61c]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl text-gray-900 mb-2">🍪 Utilizamos Cookies</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Utilizamos cookies propias y de terceros para mejorar tu experiencia de navegación, 
                    analizar el uso de la plataforma y mostrarte contenido relevante. Las cookies técnicas 
                    son necesarias para el funcionamiento de la web. Para el resto, necesitamos tu consentimiento.
                  </p>
                  <p className="text-xs text-gray-500 mb-4">
                    Al hacer clic en "Aceptar todas", aceptas el uso de todas las cookies. 
                    Puedes gestionar tus preferencias en "Configurar".{' '}
                    <button
                      onClick={() => onNavigate('cookies')}
                      className="text-[#f1a61c] hover:text-[#f4b94c] underline"
                    >
                      Más información
                    </button>
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => savePreferences(true)}
                      className="bg-[#f1a61c] text-white px-6 py-2 rounded-lg hover:bg-[#f4b94c] transition-colors text-sm"
                    >
                      Aceptar todas
                    </button>
                    <button
                      onClick={handleRejectAll}
                      className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                    >
                      Rechazar todas
                    </button>
                    <button
                      onClick={() => setShowSettings(true)}
                      className="bg-white border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm flex items-center gap-2"
                    >
                      <Settings className="w-4 h-4" />
                      Configurar
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => setShowBanner(false)}
                  className="flex-shrink-0 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          ) : (
            // Panel de Configuración
            <div className="p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl text-gray-900">Configuración de Cookies</h3>
                <button
                  onClick={() => setShowSettings(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                {/* Cookies Necesarias */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="text-sm text-gray-900">Cookies Necesarias</h4>
                      <p className="text-xs text-gray-600 mt-1">
                        Esenciales para el funcionamiento de la plataforma (sesión, autenticación, carrito)
                      </p>
                    </div>
                    <div className="flex items-center">
                      <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">
                        Siempre activas
                      </div>
                    </div>
                  </div>
                </div>

                {/* Cookies Analíticas */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex-1">
                      <h4 className="text-sm text-gray-900">Cookies Analíticas</h4>
                      <p className="text-xs text-gray-600 mt-1">
                        Nos ayudan a entender cómo usas la plataforma para mejorar la experiencia
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer ml-4">
                      <input
                        type="checkbox"
                        checked={analyticsEnabled}
                        onChange={(e) => setAnalyticsEnabled(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#ffcc7c] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#f1a61c]"></div>
                    </label>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    📊 Google Analytics (anonimizado)
                  </p>
                </div>

                {/* Cookies de Marketing */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex-1">
                      <h4 className="text-sm text-gray-900">Cookies de Marketing</h4>
                      <p className="text-xs text-gray-600 mt-1">
                        Para mostrarte publicidad relevante basada en tus intereses
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer ml-4">
                      <input
                        type="checkbox"
                        checked={marketingEnabled}
                        onChange={(e) => setMarketingEnabled(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#ffcc7c] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#f1a61c]"></div>
                    </label>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    🎯 Actualmente no utilizamos estas cookies
                  </p>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => savePreferences(false)}
                  className="flex-1 bg-[#f1a61c] text-white px-6 py-3 rounded-lg hover:bg-[#f4b94c] transition-colors"
                >
                  Guardar Preferencias
                </button>
                <button
                  onClick={() => setShowSettings(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
              </div>

              <p className="text-xs text-gray-500 text-center mt-4">
                Consulta nuestra{' '}
                <button
                  onClick={() => onNavigate('cookies')}
                  className="text-[#f1a61c] hover:text-[#f4b94c] underline"
                >
                  Política de Cookies completa
                </button>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
