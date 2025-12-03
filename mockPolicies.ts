// Mock data for user policies
// API Endpoint: GET /api/policies/user/{userId}

export interface Policy {
  id: string;
  insuranceId: string;
  insuranceName: string;
  category: string;
  status: 'active' | 'expired' | 'cancelled';
  startDate: string;
  endDate: string;
  price: number;
  duration: string;
  imageUrl: string;
  policyNumber: string;
  coverage: string[];
}

export const mockPolicies: Policy[] = [
  {
    id: 'pol-001',
    insuranceId: 'ins-001',
    insuranceName: 'Seguro de Viaje',
    category: 'Viaje',
    status: 'active',
    startDate: '2025-01-15',
    endDate: '2025-01-22',
    price: 111.84,
    duration: '7 días',
    imageUrl: 'https://images.unsplash.com/photo-1513258728326-30cde8cf1071?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjB2YWNhdGlvbiUyMGJlYWNofGVufDF8fHx8MTc2NDY0NDA0MXww&ixlib=rb-4.1.0&q=80&w=1080',
    policyNumber: 'VES-2025-001-7892',
    coverage: [
      'Asistencia médica hasta $50,000',
      'Cancelación de viaje',
      'Pérdida de equipaje hasta $2,000',
      'Retraso de vuelo',
      'Asistencia legal en el extranjero'
    ]
  },
  {
    id: 'pol-002',
    insuranceId: 'ins-002',
    insuranceName: 'Seguro de Dispositivos',
    category: 'Tecnología',
    status: 'active',
    startDate: '2025-01-01',
    endDate: '2025-02-01',
    price: 11.59,
    duration: '1 mes',
    imageUrl: 'https://images.unsplash.com/photo-1678164235182-bc7e9beef2a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHBob25lJTIwZGV2aWNlJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjQ2NzkzODl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    policyNumber: 'VES-2025-002-4521',
    coverage: [
      'Robo y hurto',
      'Daños accidentales',
      'Daño por líquidos',
      'Fallas técnicas después de garantía',
      'Reemplazo en 48 horas'
    ]
  },
  {
    id: 'pol-003',
    insuranceId: 'ins-005',
    insuranceName: 'Seguro de Mascotas',
    category: 'Mascotas',
    status: 'active',
    startDate: '2024-12-15',
    endDate: '2025-01-15',
    price: 23.18,
    duration: '1 mes',
    imageUrl: 'https://images.unsplash.com/photo-1668993022779-71f5a7d34b97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXQlMjBkb2clMjBoYXBweXxlbnwxfHx8fDE3NjQ2NzkzOTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    policyNumber: 'VES-2024-003-9834',
    coverage: [
      'Consultas veterinarias',
      'Emergencias médicas',
      'Cirugías',
      'Medicamentos',
      'Hospitalización'
    ]
  }
];

// Mock function to simulate API call
export async function fetchUserPolicies(userId: string): Promise<Policy[]> {
  // In production, this will call: GET /api/policies/user/{userId}
  // Headers: { Authorization: `Bearer ${token}` }
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockPolicies), 500);
  });
}

export async function cancelPolicy(policyId: string): Promise<void> {
  // In production, this will call: PUT /api/policies/{policyId}/cancel
  // Headers: { Authorization: `Bearer ${token}` }
  return new Promise((resolve) => {
    setTimeout(() => resolve(), 500);
  });
}

export async function downloadPolicy(policyId: string): Promise<void> {
  // In production, this will call: GET /api/policies/{policyId}/download
  // Headers: { Authorization: `Bearer ${token}` }
  // This should trigger a file download
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate download
      console.log(`Downloading policy ${policyId}`);
      resolve();
    }, 500);
  });
}
