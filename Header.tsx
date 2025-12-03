import { ShoppingCart, User, LogOut, Home, LayoutDashboard } from 'lucide-react';
import type { User as UserType, View } from '../App';
import logoImage from 'figma:asset/9bcc0a2330f206ec42d87aa936d286721440caa6.png';

interface HeaderProps {
  user: UserType | null;
  onNavigate: (view: View) => void;
  onLogout?: () => void;
  cartItemCount?: number;
  currentView?: View;
}

export function Header({ user, onNavigate, onLogout, cartItemCount = 0, currentView }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => onNavigate(user ? 'dashboard' : 'home')}
          >
            <img src={logoImage} alt="Vesta" className="h-10" />
          </div>

          <nav className="flex items-center gap-6">
            {user ? (
              <>
                <button
                  onClick={() => onNavigate('home')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    currentView === 'home'
                      ? 'bg-[#ffcc7c] text-[#282c3f]'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Home className="w-4 h-4" />
                  <span>Marketplace</span>
                </button>
                <button
                  onClick={() => onNavigate('dashboard')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    currentView === 'dashboard'
                      ? 'bg-[#ffcc7c] text-[#282c3f]'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Mis Pólizas</span>
                </button>
                {/* REQUISITO CSI2: Control de roles - solo administradores ven esta opción */}
                {(user.email === 'admin@vesta.com' || user.role === 'ADMINISTRADOR') && (
                  <button
                    onClick={() => onNavigate('admin')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      currentView === 'admin'
                        ? 'bg-[#ffcc7c] text-[#282c3f]'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <User className="w-4 h-4" />
                    <span>Admin</span>
                  </button>
                )}
                <button
                  onClick={() => onNavigate('cart')}
                  className="relative text-gray-600 hover:text-[#f1a61c] transition-colors p-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-[#f1a61c] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cartItemCount}
                    </span>
                  )}
                </button>
                <div className="flex items-center gap-3 pl-3 border-l border-gray-200">
                  <div className="text-right">
                    <p className="text-sm text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                  <div className="w-8 h-8 bg-[#ffcc7c] rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-[#282c3f]" />
                  </div>
                  <button
                    onClick={onLogout}
                    className="text-gray-400 hover:text-red-600 transition-colors"
                    title="Cerrar sesión"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </>
            ) : (
              <>
                <button
                  onClick={() => onNavigate('login')}
                  className="text-gray-600 hover:text-[#f1a61c] transition-colors px-4 py-2"
                >
                  Iniciar Sesión
                </button>
                <button
                  onClick={() => onNavigate('register')}
                  className="bg-[#f1a61c] text-white px-6 py-2 rounded-lg hover:bg-[#f4b94c] transition-colors"
                >
                  Registrarse
                </button>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
