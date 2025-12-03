import type { Insurance } from '../App';

// Mock data - In production, this will be fetched from your Java/Spring Boot API
// API Endpoint: GET /api/insurances

export const mockInsurances: Insurance[] = [
  {
    id: 'ins-001',
    name: 'Seguro de Viaje',
    category: 'Viaje',
    shortDescription: 'Protección completa durante tus vacaciones',
    description: 'Cobertura integral para tus viajes incluyendo asistencia médica, cancelación de vuelos, pérdida de equipaje y más. Actívalo solo cuando lo necesites.',
    basePrice: 15.99,
    duration: 'Por día',
    coverage: [
      'Asistencia médica hasta $50,000',
      'Cancelación de viaje',
      'Pérdida de equipaje hasta $2,000',
      'Retraso de vuelo',
      'Asistencia legal en el extranjero'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1513258728326-30cde8cf1071?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjB2YWNhdGlvbiUyMGJlYWNofGVufDF8fHx8MTc2NDY0NDA0MXww&ixlib=rb-4.1.0&q=80&w=1080',
    icon: 'plane'
  },
  {
    id: 'ins-002',
    name: 'Seguro de Dispositivos',
    category: 'Tecnología',
    shortDescription: 'Protege tu smartphone y gadgets',
    description: 'Seguro contra robo, daños accidentales y fallas técnicas para tus dispositivos móviles. Activación instantánea.',
    basePrice: 9.99,
    duration: 'Por mes',
    coverage: [
      'Robo y hurto',
      'Daños accidentales',
      'Daño por líquidos',
      'Fallas técnicas después de garantía',
      'Reemplazo en 48 horas'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1678164235182-bc7e9beef2a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHBob25lJTIwZGV2aWNlJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjQ2NzkzODl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    icon: 'smartphone'
  },
  {
    id: 'ins-003',
    name: 'Seguro de Eventos',
    category: 'Entretenimiento',
    shortDescription: 'Asegura tu entrada a conciertos y eventos',
    description: 'Protección para tus entradas a eventos. Si no puedes asistir por motivos justificados, recupera tu inversión.',
    basePrice: 5.99,
    duration: 'Por evento',
    coverage: [
      'Cancelación del evento',
      'Emergencia médica',
      'Problemas de transporte',
      'Reembolso del 100% del ticket',
      'Cobertura de gastos de viaje'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1669670617524-5f08060c8dcc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25jZXJ0JTIwZXZlbnQlMjBjcm93ZHxlbnwxfHx8fDE3NjQ2MjkwNjl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    icon: 'ticket'
  },
  {
    id: 'ins-004',
    name: 'Seguro de Bicicleta',
    category: 'Movilidad',
    shortDescription: 'Protección para tu medio de transporte',
    description: 'Cobertura completa para tu bicicleta contra robo, daños y accidentes. Ideal para ciclistas urbanos.',
    basePrice: 12.99,
    duration: 'Por mes',
    coverage: [
      'Robo con violencia',
      'Daños por accidente',
      'Responsabilidad civil',
      'Asistencia en carretera',
      'Reemplazo de partes'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1726543638998-f792eb7d081a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaWN5Y2xlJTIwY3ljbGluZyUyMGNpdHl8ZW58MXx8fHwxNzY0Njc5MzkwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    icon: 'bike'
  },
  {
    id: 'ins-005',
    name: 'Seguro de Mascotas',
    category: 'Mascotas',
    shortDescription: 'Cuidado veterinario para tu mejor amigo',
    description: 'Cobertura de gastos veterinarios, emergencias y tratamientos para tu mascota. Actívalo cuando lo necesites.',
    basePrice: 19.99,
    duration: 'Por mes',
    coverage: [
      'Consultas veterinarias',
      'Emergencias médicas',
      'Cirugías',
      'Medicamentos',
      'Hospitalización'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1668993022779-71f5a7d34b97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXQlMjBkb2clMjBoYXBweXxlbnwxfHx8fDE3NjQ2NzkzOTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    icon: 'heart'
  },
  {
    id: 'ins-006',
    name: 'Seguro de Equipaje',
    category: 'Viaje',
    shortDescription: 'Protege tus pertenencias en tránsito',
    description: 'Cobertura específica para pérdida, robo o daño de equipaje durante viajes. Activación on-demand.',
    basePrice: 7.99,
    duration: 'Por viaje',
    coverage: [
      'Pérdida de equipaje',
      'Robo de pertenencias',
      'Daños durante el transporte',
      'Retraso de equipaje',
      'Artículos de valor'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1718128120413-783e25de9a3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnN1cmFuY2UlMjBwcm90ZWN0aW9uJTIwc2hpZWxkfGVufDF8fHx8MTc2NDY2OTU4Nnww&ixlib=rb-4.1.0&q=80&w=1080',
    icon: 'luggage'
  }
];

// Mock function to simulate API call
export async function fetchInsurances(): Promise<Insurance[]> {
  // In production, this will call: GET /api/insurances
  // Headers: { Authorization: `Bearer ${token}` }
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockInsurances), 500);
  });
}

export async function fetchInsuranceById(id: string): Promise<Insurance | undefined> {
  // In production, this will call: GET /api/insurances/{id}
  // Headers: { Authorization: `Bearer ${token}` }
  return new Promise((resolve) => {
    setTimeout(() => {
      const insurance = mockInsurances.find((ins) => ins.id === id);
      resolve(insurance);
    }, 300);
  });
}
