import { useState } from 'react';
import { Mail, Lock, AlertCircle } from 'lucide-react';
import type { User, View } from '../App';
import logoImage from 'figma:asset/9bcc0a2330f206ec42d87aa936d286721440caa6.png';

interface LoginProps {
  onLogin: (user: User) => void;
  onNavigate: (view: View) => void;
}

export function Login({ onLogin, onNavigate }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // TODO: Replace with actual API call to your Java/Spring Boot backend
    // POST /api/auth/login
    // Body: { email, password }
    // Response: { id, email, name, token }
    
    try {
      // Simulated API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock validation
      if (email === 'demo@vesta.com' && password === 'demo123') {
        const userData: User = {
          id: 'user-001',
          email: email,
          name: 'Usuario Demo',
          token: 'mock-jwt-token-' + Date.now(), // This will be a real JWT from your backend
        };
        onLogin(userData);
      } else {
        setError('Credenciales inválidas. Usa demo@vesta.com / demo123');
      }
    } catch (err) {
      setError('Error al iniciar sesión. Por favor intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#282c3f] flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <img src={logoImage} alt="Vesta" className="h-16 mx-auto mb-4" />
          <p className="text-gray-300">Inicia sesión en tu cuenta</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm text-gray-700 mb-2">
                Correo Electrónico
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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

            <div className="bg-[#ffcc7c] border border-[#f4b94c] rounded-lg p-3">
              <p className="text-sm text-[#282c3f]">
                <strong>Demo:</strong> demo@vesta.com / demo123
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#f1a61c] text-white py-3 rounded-lg hover:bg-[#f4b94c] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              ¿No tienes cuenta?{' '}
              <button
                onClick={() => onNavigate('register')}
                className="text-[#f1a61c] hover:text-[#f4b94c]"
              >
                Regístrate aquí
              </button>
            </p>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={() => onNavigate('forgotPassword')}
              className="text-[#f1a61c] hover:text-[#f4b94c] text-sm mb-4 block mx-auto"
            >
              ¿Olvidaste tu contraseña?
            </button>
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
