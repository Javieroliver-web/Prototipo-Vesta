import { useState, useEffect } from 'react';
import { Users, Shield, FileText, Search, Edit, Trash2, Download, AlertCircle } from 'lucide-react';
import { Header } from './Header';
import type { User, View } from '../App';

interface AdminPanelProps {
  user: User;
  onNavigate: (view: View) => void;
  onLogout: () => void;
  cartItemCount: number;
}

interface UserRecord {
  id: string;
  nombreCompleto: string;
  correoElectronico: string;
  movil: string;
  tipoUsuario: 'ADMINISTRADOR' | 'USUARIO';
  emailConfirmado: boolean;
  fechaCreacion: string;
}

export function AdminPanel({ user, onNavigate, onLogout, cartItemCount }: AdminPanelProps) {
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<'TODOS' | 'ADMINISTRADOR' | 'USUARIO'>('TODOS');
  const [deletingUserId, setDeletingUserId] = useState<string | null>(null);
  const [confirmDeleteText, setConfirmDeleteText] = useState('');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    
    // TODO: REQUISITO CSI2 - Búsqueda con varios conceptos
    // GET /api/usuarios?busqueda={searchTerm}&tipoUsuario={filterRole}
    // Headers: { Authorization: `Bearer ${user.token}` }
    // Solo accesible para rol ADMINISTRADOR

    // Mock data
    await new Promise((resolve) => setTimeout(resolve, 500));
    const mockUsers: UserRecord[] = [
      {
        id: 'user-001',
        nombreCompleto: 'Usuario Demo',
        correoElectronico: 'demo@vesta.com',
        movil: '+34612345678',
        tipoUsuario: 'USUARIO',
        emailConfirmado: true,
        fechaCreacion: '2025-01-15T10:30:00Z'
      },
      {
        id: 'user-002',
        nombreCompleto: 'Admin Vesta',
        correoElectronico: 'admin@vesta.com',
        movil: '+34687654321',
        tipoUsuario: 'ADMINISTRADOR',
        emailConfirmado: true,
        fechaCreacion: '2025-01-01T08:00:00Z'
      },
      {
        id: 'user-003',
        nombreCompleto: 'María García López',
        correoElectronico: 'maria.garcia@email.com',
        movil: '+34655443322',
        tipoUsuario: 'USUARIO',
        emailConfirmado: true,
        fechaCreacion: '2025-01-20T14:15:00Z'
      },
      {
        id: 'user-004',
        nombreCompleto: 'Carlos Rodríguez Pérez',
        correoElectronico: 'carlos.rodriguez@email.com',
        movil: '+34677889900',
        tipoUsuario: 'USUARIO',
        emailConfirmado: false,
        fechaCreacion: '2025-02-01T09:45:00Z'
      }
    ];
    setUsers(mockUsers);
    setLoading(false);
  };

  const handleDeleteUser = async (userId: string, userName: string) => {
    // TODO: REQUISITO CSI2 - Confirmación de borrado específica
    // El usuario debe escribir exactamente el texto para confirmar
    const confirmText = 'ELIMINAR';
    const userConfirm = prompt(
      `⚠️ ATENCIÓN: Esta acción es irreversible.\n\n` +
      `Vas a eliminar al usuario: ${userName}\n\n` +
      `Si este usuario tiene pólizas activas, NO podrá ser eliminado.\n\n` +
      `Para confirmar, escribe exactamente: ${confirmText}`
    );

    if (userConfirm !== confirmText) {
      if (userConfirm !== null) {
        alert('Texto de confirmación incorrecto. Eliminación cancelada.');
      }
      return;
    }

    setDeletingUserId(userId);

    // TODO: REQUISITO CSI2 - Validación de relaciones antes de borrar
    // DELETE /api/usuarios/{userId}
    // Headers: { Authorization: `Bearer ${user.token}` }
    // 
    // El backend debe verificar:
    // 1. No se puede eliminar al último administrador
    // 2. No se puede eliminar si tiene pólizas activas
    // 3. Si tiene pólizas vencidas, el backend decide si las mantiene o las elimina
    //
    // Respuesta de error esperada:
    // {
    //   "error": "No se puede eliminar el usuario porque tiene 3 pólizas activas",
    //   "polizasActivas": 3
    // }

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Simular verificación de último admin
      const adminUsers = users.filter(u => u.tipoUsuario === 'ADMINISTRADOR');
      const userToDelete = users.find(u => u.id === userId);
      
      if (userToDelete?.tipoUsuario === 'ADMINISTRADOR' && adminUsers.length === 1) {
        alert('❌ ERROR: No se puede eliminar al último administrador del sistema.');
        setDeletingUserId(null);
        return;
      }

      // Simular éxito
      setUsers(users.filter(u => u.id !== userId));
      alert('✓ Usuario eliminado correctamente');
    } catch (error) {
      alert('Error al eliminar usuario. Por favor intenta nuevamente.');
    } finally {
      setDeletingUserId(null);
    }
  };

  const handleDownloadReport = async () => {
    // TODO: REQUISITO CSI2 - Descarga de informe en PDF
    // GET /api/reportes/usuarios
    // Headers: { Authorization: `Bearer ${user.token}` }
    // Response: archivo PDF con:
    // - Total de usuarios registrados
    // - Usuarios por tipo (admin/usuario)
    // - Usuarios con email confirmado/sin confirmar
    // - Gráficos de registro por fecha
    // - Lista completa de usuarios

    alert('Descargando reporte de usuarios en PDF...\n\nEste archivo será generado por el backend usando librerías como iText o Apache PDFBox.');
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.nombreCompleto.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.correoElectronico.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.movil.includes(searchTerm);
    
    const matchesRole = filterRole === 'TODOS' || user.tipoUsuario === filterRole;
    
    return matchesSearch && matchesRole;
  });

  if (user.email !== 'admin@vesta.com' && user.email !== 'demo@vesta.com') {
    // REQUISITO CSI2: Control de roles - solo administradores
    return (
      <div className="min-h-screen bg-gray-50">
        <Header
          user={user}
          onNavigate={onNavigate}
          onLogout={onLogout}
          cartItemCount={cartItemCount}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl text-gray-900 mb-2">Acceso Denegado</h2>
            <p className="text-gray-600 mb-6">
              No tienes permisos para acceder a esta sección. Solo los administradores pueden ver el panel de gestión.
            </p>
            <button
              onClick={() => onNavigate('dashboard')}
              className="bg-[#f1a61c] text-white px-6 py-3 rounded-lg hover:bg-[#f4b94c] transition-colors"
            >
              Volver al Dashboard
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="w-8 h-8 text-[#f1a61c]" />
            <h1 className="text-3xl text-gray-900">Panel de Administración</h1>
          </div>
          <p className="text-gray-600">Gestión de usuarios y sistema</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#ffcc7c] rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-[#282c3f]" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Usuarios</p>
                <p className="text-2xl text-gray-900">{users.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#f1a61c] rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Administradores</p>
                <p className="text-2xl text-gray-900">
                  {users.filter(u => u.tipoUsuario === 'ADMINISTRADOR').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Emails Confirmados</p>
                <p className="text-2xl text-gray-900">
                  {users.filter(u => u.emailConfirmado).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar por nombre, email o móvil..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f1a61c]"
              />
            </div>
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value as any)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f1a61c] bg-white"
            >
              <option value="TODOS">Todos los roles</option>
              <option value="ADMINISTRADOR">Administradores</option>
              <option value="USUARIO">Usuarios</option>
            </select>
            <button
              onClick={handleDownloadReport}
              className="flex items-center gap-2 px-6 py-3 bg-[#282c3f] text-white rounded-lg hover:bg-[#3c425e] transition-colors"
            >
              <Download className="w-5 h-5" />
              Descargar Reporte PDF
            </button>
          </div>
        </div>

        {/* Users Table */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#f1a61c]"></div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm text-gray-600">Usuario</th>
                    <th className="px-6 py-4 text-left text-sm text-gray-600">Contacto</th>
                    <th className="px-6 py-4 text-left text-sm text-gray-600">Rol</th>
                    <th className="px-6 py-4 text-left text-sm text-gray-600">Estado</th>
                    <th className="px-6 py-4 text-left text-sm text-gray-600">Fecha Registro</th>
                    <th className="px-6 py-4 text-right text-sm text-gray-600">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredUsers.map((usuario) => (
                    <tr key={usuario.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-gray-900">{usuario.nombreCompleto}</p>
                          <p className="text-sm text-gray-500">{usuario.correoElectronico}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-gray-700">{usuario.movil}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                          usuario.tipoUsuario === 'ADMINISTRADOR'
                            ? 'bg-[#ffcc7c] text-[#282c3f]'
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          {usuario.tipoUsuario === 'ADMINISTRADOR' ? (
                            <>
                              <Shield className="w-3 h-3 mr-1" />
                              Admin
                            </>
                          ) : 'Usuario'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {usuario.emailConfirmado ? (
                          <span className="text-sm text-green-600">✓ Confirmado</span>
                        ) : (
                          <span className="text-sm text-orange-600">⚠ Sin confirmar</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-700">
                          {new Date(usuario.fechaCreacion).toLocaleDateString('es-ES')}
                        </p>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            className="p-2 text-gray-600 hover:text-[#f1a61c] transition-colors"
                            title="Editar usuario"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteUser(usuario.id, usuario.nombreCompleto)}
                            disabled={deletingUserId === usuario.id}
                            className="p-2 text-gray-600 hover:text-red-600 transition-colors disabled:opacity-50"
                            title="Eliminar usuario"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
