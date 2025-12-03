import { useEffect, useState } from 'react';
import { FileText, Download, XCircle, Calendar, Shield, DollarSign, CheckCircle, AlertCircle } from 'lucide-react';
import { Header } from './Header';
import type { User, View } from '../App';
import { fetchUserPolicies, cancelPolicy, downloadPolicy, type Policy } from '../data/mockPolicies';

interface DashboardProps {
  user: User;
  onNavigate: (view: View) => void;
  onLogout: () => void;
  onViewInsurance: (id: string) => void;
  cartItemCount: number;
}

export function Dashboard({ user, onNavigate, onLogout, onViewInsurance, cartItemCount }: DashboardProps) {
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'active' | 'expired'>('all');
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  useEffect(() => {
    loadPolicies();
  }, [user.id]);

  const loadPolicies = async () => {
    setLoading(true);
    // TODO: Replace with actual API call to your Java/Spring Boot backend
    // GET /api/policies/user/{userId}
    // Headers: { Authorization: `Bearer ${user.token}` }
    const data = await fetchUserPolicies(user.id);
    setPolicies(data);
    setLoading(false);
  };

  const handleCancelPolicy = async (policyId: string, policyNumber: string) => {
    // REQUISITO CSI2: Confirmación específica para borrado/cancelación
    // El usuario debe escribir texto específico para confirmar la acción
    const confirmText = 'CANCELAR';
    const userConfirm = prompt(
      `⚠️ CONFIRMACIÓN DE CANCELACIÓN\n\n` +
      `Vas a cancelar la póliza: ${policyNumber}\n\n` +
      `Esta acción es irreversible y no se realizarán reembolsos.\n\n` +
      `Para confirmar, escribe exactamente: ${confirmText}`
    );

    if (userConfirm !== confirmText) {
      if (userConfirm !== null) {
        alert('Texto de confirmación incorrecto. Cancelación abortada.');
      }
      return;
    }

    setCancellingId(policyId);
    try {
      // TODO: Replace with actual API call
      // PUT /api/policies/{policyId}/cancel
      // Headers: { Authorization: `Bearer ${user.token}` }
      await cancelPolicy(policyId);
      
      // Update local state
      setPolicies(policies.map(p => 
        p.id === policyId ? { ...p, status: 'cancelled' as const } : p
      ));
    } catch (error) {
      alert('Error al cancelar la póliza');
    } finally {
      setCancellingId(null);
    }
  };

  const handleDownloadPolicy = async (policyId: string) => {
    try {
      // TODO: Replace with actual API call
      // GET /api/policies/{policyId}/download
      // Headers: { Authorization: `Bearer ${user.token}` }
      await downloadPolicy(policyId);
      alert('Descargando póliza...');
    } catch (error) {
      alert('Error al descargar la póliza');
    }
  };

  const filteredPolicies = policies.filter(policy => {
    if (filter === 'all') return true;
    if (filter === 'active') return policy.status === 'active';
    if (filter === 'expired') return policy.status === 'expired' || policy.status === 'cancelled';
    return true;
  });

  const activePolicies = policies.filter(p => p.status === 'active');
  const totalSpent = policies.reduce((sum, p) => sum + p.price, 0);

  const getStatusBadge = (status: Policy['status']) => {
    switch (status) {
      case 'active':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm">
            <CheckCircle className="w-4 h-4" />
            Activa
          </span>
        );
      case 'expired':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm">
            <AlertCircle className="w-4 h-4" />
            Vencida
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-red-100 text-red-700 text-sm">
            <XCircle className="w-4 h-4" />
            Cancelada
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        user={user}
        onNavigate={onNavigate}
        onLogout={onLogout}
        cartItemCount={cartItemCount}
        currentView="dashboard"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl text-gray-900 mb-2">Mi Dashboard</h1>
          <p className="text-gray-600">Gestiona tus pólizas y seguros activos</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Pólizas Activas</p>
                <p className="text-2xl text-gray-900">{activePolicies.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Invertido</p>
                <p className="text-2xl text-gray-900">${totalSpent.toFixed(2)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Pólizas</p>
                <p className="text-2xl text-gray-900">{policies.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Filtrar por:</span>
            <div className="flex gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                  filter === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Todas ({policies.length})
              </button>
              <button
                onClick={() => setFilter('active')}
                className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                  filter === 'active'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Activas ({activePolicies.length})
              </button>
              <button
                onClick={() => setFilter('expired')}
                className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                  filter === 'expired'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Inactivas ({policies.filter(p => p.status !== 'active').length})
              </button>
            </div>
          </div>
        </div>

        {/* Policies List */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : filteredPolicies.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <Shield className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl text-gray-900 mb-2">No tienes pólizas {filter !== 'all' ? filter === 'active' ? 'activas' : 'inactivas' : ''}</h2>
            <p className="text-gray-600 mb-6">
              Explora nuestro marketplace y encuentra el seguro perfecto para ti
            </p>
            <button
              onClick={() => onNavigate('home')}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Explorar Seguros
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredPolicies.map((policy) => (
              <div
                key={policy.id}
                className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex gap-6">
                  <img
                    src={policy.imageUrl}
                    alt={policy.insuranceName}
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl text-gray-900">{policy.insuranceName}</h3>
                          {getStatusBadge(policy.status)}
                        </div>
                        <p className="text-sm text-gray-500">
                          Póliza No. {policy.policyNumber}
                        </p>
                      </div>
                      <p className="text-2xl text-blue-600">${policy.price.toFixed(2)}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">
                          Inicio: {new Date(policy.startDate).toLocaleDateString('es-ES')}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">
                          Fin: {new Date(policy.endDate).toLocaleDateString('es-ES')}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                      <button
                        onClick={() => handleDownloadPolicy(policy.id)}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        <Download className="w-4 h-4" />
                        Descargar
                      </button>
                      <button
                        onClick={() => onViewInsurance(policy.insuranceId)}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                      >
                        <FileText className="w-4 h-4" />
                        Ver Detalles
                      </button>
                      {policy.status === 'active' && (
                        <button
                          onClick={() => handleCancelPolicy(policy.id, policy.policyNumber)}
                          disabled={cancellingId === policy.id}
                          className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ml-auto"
                        >
                          <XCircle className="w-4 h-4" />
                          {cancellingId === policy.id ? 'Cancelando...' : 'Cancelar Póliza'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
