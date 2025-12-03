import { useState } from 'react';
import { Home } from './components/Home';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Dashboard } from './components/Dashboard';
import { InsuranceDetail } from './components/InsuranceDetail';
import { Cart } from './components/Cart';
import { Checkout } from './components/Checkout';
import { ForgotPassword } from './components/ForgotPassword';
import { AdminPanel } from './components/AdminPanel';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { TermsConditions } from './components/TermsConditions';
import { CookiePolicy } from './components/CookiePolicy';
import { CookieBanner } from './components/CookieBanner';
import { Footer } from './components/Footer';

/**
 * REQUISITO CSI2: Control de Acceso
 * 
 * IMPORTANTE: En producción con el backend Java/Spring Boot:
 * 
 * 1. El acceso a vistas protegidas debe validarse con el token JWT
 * 2. Si el token es inválido o ha expirado, redirigir automáticamente a login
 * 3. Verificar el rol del usuario antes de mostrar vistas de administrador
 * 4. No se puede acceder directamente a ninguna URL sin autenticación
 * 
 * Implementación recomendada:
 * - Crear un componente ProtectedRoute que verifique el token
 * - Usar useEffect para verificar token en cada cambio de vista
 * - Almacenar token en localStorage o sessionStorage (con precaución)
 * - Implementar refresh token para mejorar la experiencia
 */

export type View = 'home' | 'login' | 'register' | 'dashboard' | 'detail' | 'cart' | 'checkout' | 'forgotPassword' | 'admin' | 'privacy' | 'terms' | 'cookies';

export interface User {
  id: string;
  email: string;
  name: string;
  token: string;
  role?: 'ADMINISTRADOR' | 'USUARIO'; // REQUISITO CSI2: Control de roles
}

export interface Insurance {
  id: string;
  name: string;
  category: string;
  description: string;
  shortDescription: string;
  basePrice: number;
  duration: string;
  coverage: string[];
  imageUrl: string;
  icon: string;
}

export interface CartItem {
  insurance: Insurance;
  quantity: number;
  customOptions?: Record<string, any>;
}

function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [user, setUser] = useState<User | null>(null);
  const [selectedInsuranceId, setSelectedInsuranceId] = useState<string | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);

  const handleLogin = (userData: User) => {
    setUser(userData);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('home');
    setCart([]);
  };

  const handleViewInsurance = (insuranceId: string) => {
    setSelectedInsuranceId(insuranceId);
    setCurrentView('detail');
  };

  const handleAddToCart = (item: CartItem) => {
    const existingIndex = cart.findIndex(
      (cartItem) => cartItem.insurance.id === item.insurance.id
    );

    if (existingIndex >= 0) {
      const newCart = [...cart];
      newCart[existingIndex].quantity += item.quantity;
      setCart(newCart);
    } else {
      setCart([...cart, item]);
    }
  };

  const handleRemoveFromCart = (insuranceId: string) => {
    setCart(cart.filter((item) => item.insurance.id !== insuranceId));
  };

  const handleUpdateQuantity = (insuranceId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(insuranceId);
      return;
    }
    setCart(
      cart.map((item) =>
        item.insurance.id === insuranceId ? { ...item, quantity } : item
      )
    );
  };

  const handleCheckout = () => {
    // After successful checkout, clear cart
    setCart([]);
    setCurrentView('dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {currentView === 'home' && (
        <Home
          user={user}
          onNavigate={setCurrentView}
          onViewInsurance={handleViewInsurance}
          onLogout={handleLogout}
          cartItemCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        />
      )}
      {currentView === 'login' && (
        <Login onLogin={handleLogin} onNavigate={setCurrentView} />
      )}
      {currentView === 'register' && (
        <Register onRegister={handleLogin} onNavigate={setCurrentView} />
      )}
      {currentView === 'dashboard' && user && (
        <Dashboard
          user={user}
          onNavigate={setCurrentView}
          onLogout={handleLogout}
          onViewInsurance={handleViewInsurance}
          cartItemCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        />
      )}
      {currentView === 'detail' && selectedInsuranceId && (
        <InsuranceDetail
          insuranceId={selectedInsuranceId}
          user={user}
          onNavigate={setCurrentView}
          onLogout={handleLogout}
          onAddToCart={handleAddToCart}
          cartItemCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        />
      )}
      {currentView === 'cart' && (
        <Cart
          user={user}
          cart={cart}
          onNavigate={setCurrentView}
          onLogout={handleLogout}
          onRemoveFromCart={handleRemoveFromCart}
          onUpdateQuantity={handleUpdateQuantity}
        />
      )}
      {currentView === 'checkout' && (
        <Checkout
          user={user}
          cart={cart}
          onNavigate={setCurrentView}
          onLogout={handleLogout}
          onCheckout={handleCheckout}
        />
      )}
      {currentView === 'forgotPassword' && (
        <ForgotPassword onNavigate={setCurrentView} />
      )}
      {currentView === 'admin' && user && (
        <AdminPanel
          user={user}
          onNavigate={setCurrentView}
          onLogout={handleLogout}
          cartItemCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        />
      )}
      {currentView === 'privacy' && (
        <PrivacyPolicy
          user={user}
          onNavigate={setCurrentView}
          onLogout={handleLogout}
          cartItemCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        />
      )}
      {currentView === 'terms' && (
        <TermsConditions
          user={user}
          onNavigate={setCurrentView}
          onLogout={handleLogout}
          cartItemCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        />
      )}
      {currentView === 'cookies' && (
        <CookiePolicy
          user={user}
          onNavigate={setCurrentView}
          onLogout={handleLogout}
          cartItemCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        />
      )}

      {/* RGPD: Banner de cookies (solo se muestra si no hay consentimiento) */}
      <CookieBanner onNavigate={setCurrentView} />

      {/* Footer con información legal */}
      {currentView !== 'login' && currentView !== 'register' && currentView !== 'forgotPassword' && (
        <Footer onNavigate={setCurrentView} />
      )}
    </div>
  );
}

export default App;
