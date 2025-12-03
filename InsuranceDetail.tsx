import { useEffect, useState } from 'react';
import { Shield, Check, ArrowLeft, ShoppingCart, Calendar, DollarSign } from 'lucide-react';
import { Header } from './Header';
import type { User, View, Insurance, CartItem } from '../App';
import { fetchInsuranceById } from '../data/mockInsurances';

interface InsuranceDetailProps {
  insuranceId: string;
  user: User | null;
  onNavigate: (view: View) => void;
  onLogout: () => void;
  onAddToCart: (item: CartItem) => void;
  cartItemCount: number;
}

export function InsuranceDetail({
  insuranceId,
  user,
  onNavigate,
  onLogout,
  onAddToCart,
  cartItemCount,
}: InsuranceDetailProps) {
  const [insurance, setInsurance] = useState<Insurance | null>(null);
  const [loading, setLoading] = useState(true);
  const [duration, setDuration] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    loadInsurance();
  }, [insuranceId]);

  const loadInsurance = async () => {
    setLoading(true);
    // TODO: Replace with actual API call to your Java/Spring Boot backend
    // GET /api/insurances/{id}
    const data = await fetchInsuranceById(insuranceId);
    setInsurance(data || null);
    setLoading(false);
  };

  const calculatePrice = () => {
    if (!insurance) return 0;
    return insurance.basePrice * duration;
  };

  const handleAddToCart = () => {
    if (!insurance) return;

    const cartItem: CartItem = {
      insurance,
      quantity: 1,
      customOptions: {
        duration,
        totalPrice: calculatePrice(),
      },
    };

    onAddToCart(cartItem);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header
          user={user}
          onNavigate={onNavigate}
          onLogout={onLogout}
          cartItemCount={cartItemCount}
        />
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#f1a61c]"></div>
        </div>
      </div>
    );
  }

  if (!insurance) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header
          user={user}
          onNavigate={onNavigate}
          onLogout={onLogout}
          cartItemCount={cartItemCount}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <p className="text-gray-600">Seguro no encontrado</p>
            <button
              onClick={() => onNavigate('home')}
              className="mt-4 text-[#f1a61c] hover:text-[#f4b94c]"
            >
              Volver al inicio
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        user={user}
        onNavigate={onNavigate}
        onLogout={onLogout}
        cartItemCount={cartItemCount}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al marketplace
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Image and Description */}
          <div>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
              <img
                src={insurance.imageUrl}
                alt={insurance.name}
                className="w-full h-96 object-cover"
              />
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-2 text-[#f1a61c] mb-4">
                <Shield className="w-5 h-5" />
                <span className="text-sm">{insurance.category}</span>
              </div>
              <h1 className="text-3xl text-gray-900 mb-4">{insurance.name}</h1>
              <p className="text-gray-600 mb-6">{insurance.description}</p>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-gray-900 mb-4">Coberturas Incluidas</h3>
                <ul className="space-y-3">
                  {insurance.coverage.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-green-600" />
                      </div>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column - Purchase Card */}
          <div>
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <div className="mb-6">
                <p className="text-sm text-gray-500 mb-2">Precio base</p>
                <p className="text-4xl text-gray-900">
                  ${insurance.basePrice}
                  <span className="text-lg text-gray-500">
                    /{insurance.duration.toLowerCase()}
                  </span>
                </p>
              </div>

              <div className="border-t border-b border-gray-200 py-6 mb-6">
                <label className="block mb-2">
                  <span className="text-gray-700">Duración</span>
                </label>
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    min="1"
                    max="365"
                    value={duration}
                    onChange={(e) => setDuration(Math.max(1, parseInt(e.target.value) || 1))}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f1a61c]"
                  />
                  <span className="text-gray-600">{insurance.duration.toLowerCase()}</span>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Ajusta la duración según tus necesidades
                </p>
              </div>

              <div className="bg-[#ffcc7c]/30 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-700">Subtotal</span>
                  <span className="text-gray-900">${calculatePrice().toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-700">Impuestos (16%)</span>
                  <span className="text-gray-900">${(calculatePrice() * 0.16).toFixed(2)}</span>
                </div>
                <div className="border-t border-[#f4b94c] pt-2 mt-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-900">Total</span>
                    <span className="text-2xl text-[#f1a61c]">
                      ${(calculatePrice() * 1.16).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {user ? (
                <div className="space-y-3">
                  <button
                    onClick={handleAddToCart}
                    className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg transition-colors ${
                      addedToCart
                        ? 'bg-green-600 text-white'
                        : 'bg-[#f1a61c] text-white hover:bg-[#f4b94c]'
                    }`}
                  >
                    {addedToCart ? (
                      <>
                        <Check className="w-5 h-5" />
                        Agregado al carrito
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-5 h-5" />
                        Agregar al carrito
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      handleAddToCart();
                      setTimeout(() => onNavigate('checkout'), 500);
                    }}
                    className="w-full flex items-center justify-center gap-2 bg-[#282c3f] text-white py-3 rounded-lg hover:bg-[#3c425e] transition-colors"
                  >
                    <DollarSign className="w-5 h-5" />
                    Comprar ahora
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <button
                    onClick={() => onNavigate('login')}
                    className="w-full bg-[#f1a61c] text-white py-3 rounded-lg hover:bg-[#f4b94c] transition-colors"
                  >
                    Iniciar sesión para comprar
                  </button>
                  <p className="text-sm text-center text-gray-500">
                    ¿No tienes cuenta?{' '}
                    <button
                      onClick={() => onNavigate('register')}
                      className="text-[#f1a61c] hover:text-[#f4b94c]"
                    >
                      Regístrate
                    </button>
                  </p>
                </div>
              )}

              <div className="mt-6 space-y-2 text-sm text-gray-500">
                <p className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  Activación inmediata
                </p>
                <p className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  Cancela cuando quieras
                </p>
                <p className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  Soporte 24/7
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
