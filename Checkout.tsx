import { useState } from 'react';
import { CreditCard, Lock, CheckCircle, AlertCircle } from 'lucide-react';
import { Header } from './Header';
import type { User, View, CartItem } from '../App';

interface CheckoutProps {
  user: User | null;
  cart: CartItem[];
  onNavigate: (view: View) => void;
  onLogout: () => void;
  onCheckout: () => void;
}

export function Checkout({
  user,
  cart,
  onNavigate,
  onLogout,
  onCheckout,
}: CheckoutProps) {
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const calculateSubtotal = () => {
    return cart.reduce((sum, item) => {
      const itemPrice = item.customOptions?.totalPrice || item.insurance.basePrice;
      return sum + itemPrice * item.quantity;
    }, 0);
  };

  const calculateTaxes = () => {
    return calculateSubtotal() * 0.16;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTaxes();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    // Format card number with spaces
    if (e.target.name === 'cardNumber') {
      value = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
    }

    // Format expiry date
    if (e.target.name === 'expiryDate') {
      value = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2').slice(0, 5);
    }

    setPaymentData({
      ...paymentData,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // TODO: Replace with actual API call to your Java/Spring Boot backend
    // POST /api/orders/checkout
    // Headers: { Authorization: `Bearer ${user.token}` }
    // Body: {
    //   items: cart.map(item => ({
    //     insuranceId: item.insurance.id,
    //     quantity: item.quantity,
    //     duration: item.customOptions?.duration,
    //     price: item.customOptions?.totalPrice
    //   })),
    //   paymentMethod: {
    //     cardNumber: paymentData.cardNumber,
    //     cardName: paymentData.cardName,
    //     expiryDate: paymentData.expiryDate,
    //     cvv: paymentData.cvv
    //   },
    //   totalAmount: calculateTotal()
    // }
    // Response: { orderId, policies: [...] }

    try {
      // Simulated API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setSuccess(true);

      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        onCheckout();
      }, 2000);
    } catch (err) {
      setError('Error al procesar el pago. Por favor intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header
          user={user}
          onNavigate={onNavigate}
          onLogout={onLogout}
          cartItemCount={0}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <p className="text-gray-600 mb-4">No hay productos en el carrito</p>
            <button
              onClick={() => onNavigate('home')}
              className="text-[#f1a61c] hover:text-[#f4b94c]"
            >
              Volver al marketplace
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header
          user={user}
          onNavigate={onNavigate}
          onLogout={onLogout}
          cartItemCount={0}
        />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl text-gray-900 mb-2">¡Compra Exitosa!</h2>
            <p className="text-gray-600 mb-6">
              Tus seguros han sido activados y ya están disponibles en tu dashboard
            </p>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-sm text-gray-500 mt-4">Redirigiendo...</p>
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
        cartItemCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl text-gray-900 mb-8">Finalizar Compra</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-2 mb-6">
                <CreditCard className="w-6 h-6 text-[#f1a61c]" />
                <h2 className="text-xl text-gray-900">Información de Pago</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="cardNumber" className="block text-sm text-gray-700 mb-2">
                    Número de Tarjeta
                  </label>
                  <input
                    id="cardNumber"
                    name="cardNumber"
                    type="text"
                    value={paymentData.cardNumber}
                    onChange={handleChange}
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f1a61c]"
                  />
                </div>

                <div>
                  <label htmlFor="cardName" className="block text-sm text-gray-700 mb-2">
                    Nombre en la Tarjeta
                  </label>
                  <input
                    id="cardName"
                    name="cardName"
                    type="text"
                    value={paymentData.cardName}
                    onChange={handleChange}
                    placeholder="JUAN PÉREZ"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f1a61c]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="expiryDate" className="block text-sm text-gray-700 mb-2">
                      Fecha de Vencimiento
                    </label>
                    <input
                      id="expiryDate"
                      name="expiryDate"
                      type="text"
                      value={paymentData.expiryDate}
                      onChange={handleChange}
                      placeholder="MM/YY"
                      maxLength={5}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f1a61c]"
                    />
                  </div>
                  <div>
                    <label htmlFor="cvv" className="block text-sm text-gray-700 mb-2">
                      CVV
                    </label>
                    <input
                      id="cvv"
                      name="cvv"
                      type="text"
                      value={paymentData.cvv}
                      onChange={handleChange}
                      placeholder="123"
                      maxLength={4}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f1a61c]"
                    />
                  </div>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-2">
                  <Lock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-blue-700">
                    Tu información está protegida con encriptación de nivel bancario
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Procesando...
                    </>
                  ) : (
                    <>
                      <Lock className="w-5 h-5" />
                      Pagar ${calculateTotal().toFixed(2)}
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <h2 className="text-xl text-gray-900 mb-6">Resumen</h2>

              <div className="space-y-4 mb-6">
                {cart.map((item) => {
                  const itemPrice = item.customOptions?.totalPrice || item.insurance.basePrice;
                  const duration = item.customOptions?.duration || 1;

                  return (
                    <div key={item.insurance.id} className="flex gap-3">
                      <img
                        src={item.insurance.imageUrl}
                        alt={item.insurance.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">{item.insurance.name}</p>
                        <p className="text-xs text-gray-500">
                          {duration} {item.insurance.duration.toLowerCase()} × {item.quantity}
                        </p>
                        <p className="text-sm text-blue-600 mt-1">
                          ${(itemPrice * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="border-t border-gray-200 pt-4 space-y-3">
                <div className="flex items-center justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${calculateSubtotal().toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-gray-600">
                  <span>Impuestos (16%)</span>
                  <span>${calculateTaxes().toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-900">Total</span>
                    <span className="text-2xl text-blue-600">
                      ${calculateTotal().toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
