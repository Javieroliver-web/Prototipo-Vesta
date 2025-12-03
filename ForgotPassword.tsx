import { useState } from 'react';
import { Mail, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';
import type { View } from '../App';
import logoImage from 'figma:asset/9bcc0a2330f206ec42d87aa936d286721440caa6.png';

interface ForgotPasswordProps {
  onNavigate: (view: View) => void;
}

export function ForgotPassword({ onNavigate }: ForgotPasswordProps) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // TODO: REQUISITO CSI2 - Procedimiento de recordar contraseña con token
    // POST /api/auth/forgot-password
    // Body: { correoElectronico: email }
    // El backend debe:
    // 1. Generar un token único con expiración (1 hora recomendado)
    // 2. Guardarlo en tb_usuarios.token_reset_password
    // 3. Enviar email con enlace: https://vesta.com/reset-password?token={token}
    // 4. El enlace debe llevar a una página donde el usuario ingrese la nueva contraseña

    try {
      // Simulated API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSuccess(true);
    } catch (err) {
      setError('Error al enviar el correo. Por favor intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-[#282c3f] flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl text-gray-900 mb-2">Correo Enviado</h2>
            <p className="text-gray-600 mb-6">
              Hemos enviado instrucciones para restablecer tu contraseña a <strong>{email}</strong>
            </p>
            <p className="text-sm text-gray-500 mb-6">
              Por favor revisa tu bandeja de entrada y sigue las instrucciones. El enlace expirará en 1 hora.
            </p>
            <button
              onClick={() => onNavigate('login')}
              className="text-[#f1a61c] hover:text-[#f4b94c] flex items-center gap-2 mx-auto"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver al inicio de sesión
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#282c3f] flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <img src={logoImage} alt="Vesta" className="h-16 mx-auto mb-4" />
          <h1 className="text-2xl text-white mb-2">Recuperar Contraseña</h1>
          <p className="text-gray-300">
            Ingresa tu correo electrónico y te enviaremos instrucciones
          </p>
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

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#f1a61c] text-white py-3 rounded-lg hover:bg-[#f4b94c] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? 'Enviando...' : 'Enviar Instrucciones'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => onNavigate('login')}
              className="text-gray-500 hover:text-gray-700 text-sm flex items-center gap-2 mx-auto"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver al inicio de sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
