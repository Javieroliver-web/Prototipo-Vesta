import { useEffect, useState } from 'react';
import { Shield, Search, Filter, Plane, Smartphone, Ticket, Bike, Heart, Luggage } from 'lucide-react';
import { Header } from './Header';
import type { User, View, Insurance } from '../App';
import { fetchInsurances } from '../data/mockInsurances';

interface HomeProps {
  user: User | null;
  onNavigate: (view: View) => void;
  onViewInsurance: (id: string) => void;
  onLogout: () => void;
  cartItemCount: number;
}

const categoryIcons: Record<string, any> = {
  Viaje: Plane,
  Tecnología: Smartphone,
  Entretenimiento: Ticket,
  Movilidad: Bike,
  Mascotas: Heart,
};

export function Home({ user, onNavigate, onViewInsurance, onLogout, cartItemCount }: HomeProps) {
  const [insurances, setInsurances] = useState<Insurance[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');

  useEffect(() => {
    loadInsurances();
  }, []);

  const loadInsurances = async () => {
    setLoading(true);
    // TODO: Replace with actual API call to your Java/Spring Boot backend
    // GET /api/insurances
    const data = await fetchInsurances();
    setInsurances(data);
    setLoading(false);
  };

  const categories = ['Todos', ...Array.from(new Set(insurances.map((ins) => ins.category)))];

  const filteredInsurances = insurances.filter((insurance) => {
    const matchesSearch = insurance.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      insurance.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Todos' || insurance.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        user={user}
        onNavigate={onNavigate}
        onLogout={onLogout}
        cartItemCount={cartItemCount}
        currentView="home"
      />

      {/* Hero Section */}
      <div className="bg-[#282c3f] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-12 h-12 text-[#f1a61c]" />
              <h1 className="text-5xl text-[#f1a61c]">Vesta</h1>
            </div>
            <h2 className="text-3xl mb-4">Micro-seguros On-Demand</h2>
            <p className="text-xl text-gray-300 mb-8">
              Protección instantánea cuando la necesitas. Activa y desactiva coberturas según tus necesidades.
            </p>
            {!user && (
              <button
                onClick={() => onNavigate('register')}
                className="bg-[#f1a61c] text-white px-8 py-3 rounded-lg hover:bg-[#f4b94c] transition-colors"
              >
                Comenzar Ahora
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar seguros..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f1a61c]"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="text-gray-400 w-5 h-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f1a61c] bg-white"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Insurance Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#f1a61c]"></div>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-gray-600">
                {filteredInsurances.length} seguro{filteredInsurances.length !== 1 ? 's' : ''} disponible{filteredInsurances.length !== 1 ? 's' : ''}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredInsurances.map((insurance) => {
                const Icon = categoryIcons[insurance.category] || Shield;
                return (
                  <div
                    key={insurance.id}
                    className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all cursor-pointer border border-gray-200 overflow-hidden group"
                    onClick={() => onViewInsurance(insurance.id)}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={insurance.imageUrl}
                        alt={insurance.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full text-sm text-[#f1a61c]">
                        {insurance.category}
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-10 h-10 bg-[#ffcc7c] rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon className="w-5 h-5 text-[#282c3f]" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-gray-900 mb-1">{insurance.name}</h3>
                          <p className="text-sm text-gray-500">{insurance.shortDescription}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                        <div>
                          <p className="text-sm text-gray-500">Desde</p>
                          <p className="text-2xl text-[#f1a61c]">
                            ${insurance.basePrice}
                            <span className="text-sm text-gray-500">/{insurance.duration.toLowerCase()}</span>
                          </p>
                        </div>
                        <button
                          className="bg-[#f1a61c] text-white px-4 py-2 rounded-lg hover:bg-[#f4b94c] transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            onViewInsurance(insurance.id);
                          }}
                        >
                          Ver más
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* Features Section */}
      <div className="bg-white py-16 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl text-center text-gray-900 mb-12">¿Por qué elegir Vesta?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#ffcc7c] rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-[#282c3f]" />
              </div>
              <h3 className="text-gray-900 mb-2">Activación Instantánea</h3>
              <p className="text-gray-600">
                Activa tu seguro cuando lo necesites, sin trámites complicados ni esperas.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#ffcc7c] rounded-full flex items-center justify-center mx-auto mb-4">
                <Smartphone className="w-8 h-8 text-[#282c3f]" />
              </div>
              <h3 className="text-gray-900 mb-2">100% Digital</h3>
              <p className="text-gray-600">
                Gestiona todos tus seguros desde tu dispositivo, sin papeleos.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#ffcc7c] rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-[#282c3f]" />
              </div>
              <h3 className="text-gray-900 mb-2">Paga Solo lo que Usas</h3>
              <p className="text-gray-600">
                Sin compromisos a largo plazo. Activa y desactiva según necesites.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
