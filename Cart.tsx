import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { Header } from './Header';
import type { User, View, CartItem } from '../App';

interface CartProps {
  user: User | null;
  cart: CartItem[];
  onNavigate: (view: View) => void;
  onLogout: () => void;
  onRemoveFromCart: (insuranceId: string) => void;
  onUpdateQuantity: (insuranceId: string, quantity: number) => void;
}

export function Cart({
  user,
  cart,
  onNavigate,
  onLogout,
  onRemoveFromCart,
  onUpdateQuantity,
}: CartProps) {
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        user={user}
        onNavigate={onNavigate}
        onLogout={onLogout}
        cartItemCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl text-gray-900 mb-8">Carrito de Compras</h1>

        {cart.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl text-gray-900 mb-2">Tu carrito está vacío</h2>
            <p className="text-gray-600 mb-6">
              Explora nuestro marketplace y encuentra el seguro perfecto para ti
            </p>
            <button
              onClick={() => onNavigate('home')}
              className="bg-[#f1a61c] text-white px-6 py-3 rounded-lg hover:bg-[#f4b94c] transition-colors"
            >
              Explorar Seguros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => {
                const itemPrice = item.customOptions?.totalPrice || item.insurance.basePrice;
                const duration = item.customOptions?.duration || 1;

                return (
                  <div
                    key={item.insurance.id}
                    className="bg-white rounded-xl shadow-sm p-6 flex gap-4"
                  >
                    <img
                      src={item.insurance.imageUrl}
                      alt={item.insurance.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-gray-900">{item.insurance.name}</h3>
                          <p className="text-sm text-gray-500">{item.insurance.category}</p>
                        </div>
                        <button
                          onClick={() => onRemoveFromCart(item.insurance.id)}
                          className="text-red-600 hover:text-red-700 transition-colors"
                          title="Eliminar"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">
                        Duración: {duration} {item.insurance.duration.toLowerCase()}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() =>
                              onUpdateQuantity(item.insurance.id, item.quantity - 1)
                            }
                            className="w-8 h-8 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                          >
                            -
                          </button>
                          <span className="text-gray-900 w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              onUpdateQuantity(item.insurance.id, item.quantity + 1)
                            }
                            className="w-8 h-8 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                          >
                            +
                          </button>
                        </div>
                        <p className="text-xl text-blue-600">
                          ${(itemPrice * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
                <h2 className="text-xl text-gray-900 mb-6">Resumen del Pedido</h2>

                <div className="space-y-3 mb-6">
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
                      <span className="text-2xl text-[#f1a61c]">
                        ${calculateTotal().toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onNavigate('checkout')}
                  className="w-full bg-[#f1a61c] text-white py-3 rounded-lg hover:bg-[#f4b94c] transition-colors flex items-center justify-center gap-2"
                >
                  Proceder al pago
                  <ArrowRight className="w-5 h-5" />
                </button>

                <button
                  onClick={() => onNavigate('home')}
                  className="w-full mt-3 text-gray-600 hover:text-gray-900 py-2 transition-colors"
                >
                  Continuar comprando
                </button>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-500">
                    Los seguros se activarán inmediatamente después del pago
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
