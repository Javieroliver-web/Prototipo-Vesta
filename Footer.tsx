import { Shield, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Cookie } from 'lucide-react';
import type { View } from '../App';
import logoImage from 'figma:asset/9bcc0a2330f206ec42d87aa936d286721440caa6.png';

interface FooterProps {
  onNavigate: (view: View) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const openCookieSettings = () => {
    // Eliminar consentimiento guardado para forzar mostrar el banner de nuevo
    localStorage.removeItem('vesta_cookie_consent');
    window.location.reload();
  };

  return (
    <footer className="bg-[#282c3f] text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Columna 1: Sobre Vesta */}
          <div>
            <img src={logoImage} alt="Vesta" className="h-10 mb-4" />
            <p className="text-sm text-gray-300 mb-4">
              Marketplace de micro-seguros on-demand. Protección instantánea cuando la necesitas.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-8 h-8 bg-[#3c425e] rounded-full flex items-center justify-center hover:bg-[#f1a61c] transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-[#3c425e] rounded-full flex items-center justify-center hover:bg-[#f1a61c] transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-[#3c425e] rounded-full flex items-center justify-center hover:bg-[#f1a61c] transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-[#3c425e] rounded-full flex items-center justify-center hover:bg-[#f1a61c] transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Columna 2: Enlaces Rápidos */}
          <div>
            <h3 className="text-sm mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-[#f1a61c] transition-colors"
                >
                  Inicio
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-[#f1a61c] transition-colors"
                >
                  Seguros Disponibles
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('dashboard')}
                  className="hover:text-[#f1a61c] transition-colors"
                >
                  Mis Pólizas
                </button>
              </li>
              <li>
                <a href="#" className="hover:text-[#f1a61c] transition-colors">
                  Preguntas Frecuentes
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#f1a61c] transition-colors">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 3: Legal */}
          <div>
            <h3 className="text-sm mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <button
                  onClick={() => onNavigate('privacy')}
                  className="hover:text-[#f1a61c] transition-colors"
                >
                  Política de Privacidad
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('terms')}
                  className="hover:text-[#f1a61c] transition-colors"
                >
                  Términos y Condiciones
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('cookies')}
                  className="hover:text-[#f1a61c] transition-colors"
                >
                  Política de Cookies
                </button>
              </li>
              <li>
                <button
                  onClick={openCookieSettings}
                  className="hover:text-[#f1a61c] transition-colors flex items-center gap-2"
                >
                  <Cookie className="w-4 h-4" />
                  Configurar Cookies
                </button>
              </li>
              <li>
                <a href="#" className="hover:text-[#f1a61c] transition-colors">
                  Aviso Legal
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#f1a61c] transition-colors">
                  Hoja de Reclamaciones
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 4: Contacto */}
          <div>
            <h3 className="text-sm mb-4">Contacto</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0 text-[#f1a61c]" />
                <span>Calle Ejemplo, 123<br />28001 Madrid, España</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0 text-[#f1a61c]" />
                <a href="tel:+34900123456" className="hover:text-[#f1a61c] transition-colors">
                  +34 900 123 456
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 flex-shrink-0 text-[#f1a61c]" />
                <a href="mailto:info@vesta.com" className="hover:text-[#f1a61c] transition-colors">
                  info@vesta.com
                </a>
              </li>
              <li className="flex items-start gap-2 mt-3">
                <Shield className="w-4 h-4 mt-1 flex-shrink-0 text-[#f1a61c]" />
                <div className="text-xs">
                  <p>Atención al Cliente:</p>
                  <p className="text-gray-400">Lunes a Viernes</p>
                  <p className="text-gray-400">9:00 - 18:00h</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Barra inferior */}
        <div className="border-t border-[#3c425e] mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <div className="text-center md:text-left">
              <p>© 2025 Vesta Seguros, S.L. - Todos los derechos reservados</p>
              <p className="text-xs mt-1">NIF: B-12345678 | Registro Mercantil de Madrid, Tomo XXXXX, Folio XX</p>
            </div>
            <div className="flex flex-wrap justify-center gap-4 text-xs">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#f1a61c]" />
                <span>Conforme RGPD y LOPDGDD</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#f1a61c]" />
                <span>Certificado SSL</span>
              </div>
            </div>
          </div>

          {/* Delegado de Protección de Datos */}
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-400">
              Delegado de Protección de Datos (DPO):{' '}
              <a href="mailto:dpo@vesta.com" className="text-[#f1a61c] hover:text-[#f4b94c]">
                dpo@vesta.com
              </a>
              {' '}|{' '}
              Protección de Datos:{' '}
              <a href="mailto:privacidad@vesta.com" className="text-[#f1a61c] hover:text-[#f4b94c]">
                privacidad@vesta.com
              </a>
            </p>
          </div>

          {/* Disclaimer RGPD */}
          <div className="mt-4 bg-[#3c425e] rounded-lg p-4 text-xs text-gray-300 text-center">
            <p>
              <strong>Información sobre protección de datos:</strong> Vesta Seguros, S.L. es el responsable del tratamiento de tus datos personales.
              Los tratamos conforme al RGPD (UE) 2016/679 y la LOPDGDD 3/2018. Puedes ejercer tus derechos ARCO-POL en{' '}
              <a href="mailto:privacidad@vesta.com" className="text-[#f1a61c] hover:text-[#f4b94c] underline">
                privacidad@vesta.com
              </a>
              . Más información en nuestra{' '}
              <button
                onClick={() => onNavigate('privacy')}
                className="text-[#f1a61c] hover:text-[#f4b94c] underline"
              >
                Política de Privacidad
              </button>.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
