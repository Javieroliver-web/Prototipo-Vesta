import { useState } from 'react';
import { Mail, Lock, User as UserIcon, AlertCircle, CheckCircle } from 'lucide-react';
import type { User, View } from '../App';
import logoImage from 'figma:asset/9bcc0a2330f206ec42d87aa936d286721440caa6.png';

interface RegisterProps {
  onRegister: (user: User) => void;
  onNavigate: (view: View) => void;
}

export function Register({ onRegister, onNavigate }: RegisterProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
    acceptPrivacy: false,
    acceptMarketing: false,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    // REQUISITO RGPD: Verificar aceptación de términos y privacidad
    if (!formData.acceptTerms || !formData.acceptPrivacy) {
      setError('Debes aceptar los Términos y Condiciones y la Política de Privacidad para registrarte');
      return;
    }

    setLoading(true);

    // TODO: Replace with actual API call to your Java/Spring Boot backend
    // POST /api/auth/register
    // Body: { name, email, password }
    // Response: { id, email, name, token }

    try {
      // Simulated API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const userData: User = {
        id: 'user-' + Date.now(),
        email: formData.email,
        name: formData.name,
        token: 'mock-jwt-token-' + Date.now(), // This will be a real JWT from your backend
      };
      
      onRegister(userData);
    } catch (err) {
      setError('Error al crear la cuenta. Por favor intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#282c3f] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <img src={logoImage} alt="Vesta" className="h-16 mx-auto mb-4" />
          <p className="text-gray-300">Crea tu cuenta y comienza a protegerte</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm text-gray-700 mb-2">
                Nombre Completo
              </label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f1a61c]"
                  placeholder="Juan Pérez"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm text-gray-700 mb-2">
                Correo Electrónico
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f1a61c]"
                  placeholder="tu@email.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm text-gray-700 mb-2">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f1a61c]"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm text-gray-700 mb-2">
                Confirmar Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f1a61c]"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* REQUISITO RGPD: Aceptación explícita de términos y privacidad */}
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <input
                  id="acceptTerms"
                  name="acceptTerms"
                  type="checkbox"
                  checked={formData.acceptTerms}
                  onChange={handleChange}
                  required
                  className="mt-1 w-4 h-4 text-[#f1a61c] border-gray-300 rounded focus:ring-[#f1a61c]"
                />
                <label htmlFor="acceptTerms" className="text-sm text-gray-700">
                  He leído y acepto los{' '}
                  <button
                    type="button"
                    onClick={() => onNavigate('terms')}
                    className="text-[#f1a61c] hover:text-[#f4b94c] underline"
                  >
                    Términos y Condiciones de Uso
                  </button>{' '}
                  <span className="text-red-600">*</span>
                </label>
              </div>

              <div className="flex items-start gap-3">
                <input
                  id="acceptPrivacy"
                  name="acceptPrivacy"
                  type="checkbox"
                  checked={formData.acceptPrivacy}
                  onChange={handleChange}
                  required
                  className="mt-1 w-4 h-4 text-[#f1a61c] border-gray-300 rounded focus:ring-[#f1a61c]"
                />
                <label htmlFor="acceptPrivacy" className="text-sm text-gray-700">
                  He leído y acepto la{' '}
                  <button
                    type="button"
                    onClick={() => onNavigate('privacy')}
                    className="text-[#f1a61c] hover:text-[#f4b94c] underline"
                  >
                    Política de Privacidad y Protección de Datos
                  </button>{' '}
                  <span className="text-red-600">*</span>
                </label>
              </div>

              <div className="flex items-start gap-3">
                <input
                  id="acceptMarketing"
                  name="acceptMarketing"
                  type="checkbox"
                  checked={formData.acceptMarketing}
                  onChange={handleChange}
                  className="mt-1 w-4 h-4 text-[#f1a61c] border-gray-300 rounded focus:ring-[#f1a61c]"
                />
                <label htmlFor="acceptMarketing" className="text-sm text-gray-700">
                  Acepto recibir comunicaciones comerciales y promociones de Vesta (Opcional)
                </label>
              </div>

              <p className="text-xs text-gray-500 mt-2">
                <span className="text-red-600">*</span> Campos obligatorios. 
                Puedes ejercer tus derechos ARCO-POL en cualquier momento contactando con{' '}
                <a href="mailto:privacidad@vesta.com" className="text-[#f1a61c] hover:text-[#f4b94c]">
                  privacidad@vesta.com
                </a>
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#f1a61c] text-white py-3 rounded-lg hover:bg-[#f4b94c] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              ¿Ya tienes cuenta?{' '}
              <button
                onClick={() => onNavigate('login')}
                className="text-[#f1a61c] hover:text-[#f4b94c]"
              >
                Inicia sesión aquí
              </button>
            </p>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={() => onNavigate('home')}
              className="text-gray-500 hover:text-gray-700 text-sm"
            >
              ← Volver al inicio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
