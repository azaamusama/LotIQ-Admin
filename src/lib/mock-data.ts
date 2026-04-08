export const mockSignUps: SignUp[] = [
  {
    id: 's1',
    propertyName: 'Oakwood Heights',
    address: '742 Evergreen Terrace',
    serviceType: 'Full Lot Enforcement',
    installationDate: '2026-04-10T09:00:00Z',
    status: 'pending'
  },
  {
    id: 's2',
    propertyName: 'Sunset Villas',
    address: '123 Ocean View Dr',
    serviceType: 'Visitor Only',
    installationDate: '2026-04-12T14:30:00Z',
    status: 'in_progress',
    assignedReviewer: 'Usama Azam'
  },
  {
    id: 's3',
    propertyName: 'North Star Logistics',
    address: '888 Industrial Way',
    serviceType: 'Security Monitoring',
    installationDate: '2026-04-08T11:00:00Z',
    status: 'ready'
  }
];

export const mockManagers: PropertyManager[] = [
  {
    id: 'm1',
    name: 'Sarah Jenkins',
    email: 'sarah.j@skyline.com',
    propertiesCount: 3,
    activeVehicles: 145,
    status: 'active',
    lastActivity: '10 mins ago'
  },
  {
    id: 'm2',
    name: 'Robert Chen',
    email: 'r.chen@techplaza.io',
    propertiesCount: 1,
    activeVehicles: 88,
    status: 'active',
    lastActivity: '2 hours ago'
  }
];

export const mockParkers: AuthorizedParker[] = [
  {
    id: 'ap1',
    name: 'Alice Cooper',
    email: 'alice@example.com',
    vehiclesCount: 2,
    assignedProperty: 'Skyline Apartments',
    status: 'active',
    flags: []
  },
  {
    id: 'ap2',
    name: 'Bob Marley',
    email: 'bob@reggae.com',
    vehiclesCount: 5,
    assignedProperty: 'Skyline Apartments',
    status: 'active',
    flags: ['Too many vehicles']
  },
  {
    id: 'ap3',
    name: 'Charlie Brown',
    email: 'charlie@peanuts.com',
    vehiclesCount: 1,
    assignedProperty: 'Tech Plaza',
    status: 'restricted',
    flags: ['Suspicious activity']
  }
];

export const mockTowOperators: TowOperator[] = [
  {
    id: 'to1',
    name: 'Rapid Recovery Towing',
    phone: '(555) 123-4567',
    propertiesAssigned: 12,
    jobsCompleted: 450,
    acceptanceRate: 0.98,
    status: 'active',
    avgResponseTime: '18 mins'
  },
  {
    id: 'to2',
    name: 'City Wide Impound',
    phone: '(555) 987-6543',
    propertiesAssigned: 8,
    jobsCompleted: 210,
    acceptanceRate: 0.75,
    status: 'active',
    avgResponseTime: '35 mins'
  }
];

import { Vehicle, Violation, Property, SignUp, PropertyManager, AuthorizedParker, TowOperator } from '../types';

export const mockVehicles: Vehicle[] = [
  {
    id: 'v1',
    plate: 'ABC-1234',
    image: 'https://picsum.photos/seed/car1/400/300',
    property: 'Skyline Apartments',
    zone: 'Resident P1',
    duration: '2h 15m',
    status: 'authorized',
    owner: 'John Doe',
    lastSeen: '2 mins ago'
  },
  {
    id: 'v2',
    plate: 'XYZ-9876',
    image: 'https://picsum.photos/seed/car2/400/300',
    property: 'Skyline Apartments',
    zone: 'Visitor V2',
    duration: '4h 45m',
    status: 'violation',
    lastSeen: 'Just now'
  },
  {
    id: 'v3',
    plate: 'LMN-5544',
    image: 'https://picsum.photos/seed/car3/400/300',
    property: 'Tech Plaza',
    zone: 'Loading Dock',
    duration: '15m',
    status: 'unknown',
    lastSeen: '5 mins ago'
  },
  {
    id: 'v4',
    plate: 'KJH-2211',
    image: 'https://picsum.photos/seed/car4/400/300',
    property: 'Skyline Apartments',
    zone: 'Resident P2',
    duration: '12h 30m',
    status: 'authorized',
    owner: 'Jane Smith',
    lastSeen: '10 mins ago'
  }
];

export const mockViolations: Violation[] = [
  {
    id: 'viol-1',
    vehicleId: 'v2',
    plate: 'XYZ-9876',
    property: 'Skyline Apartments',
    zone: 'Visitor V2',
    rule: 'Exceeded 4h Visitor Limit',
    confidence: 0.98,
    timestamp: '2026-04-08T10:30:00Z',
    status: 'pending',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4'
  },
  {
    id: 'viol-2',
    vehicleId: 'v3',
    plate: 'LMN-5544',
    property: 'Tech Plaza',
    zone: 'Loading Dock',
    rule: 'Unauthorized Parking in Loading Zone',
    confidence: 0.92,
    timestamp: '2026-04-08T11:15:00Z',
    status: 'pending',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4'
  }
];

export const mockProperties: Property[] = [
  {
    id: 'p1',
    name: 'Skyline Apartments',
    location: '123 Main St, Downtown',
    activeVehicles: 45,
    violationsToday: 12,
    healthScore: 94
  },
  {
    id: 'p2',
    name: 'Tech Plaza',
    location: '456 Innovation Way',
    activeVehicles: 120,
    violationsToday: 5,
    healthScore: 98
  },
  {
    id: 'p3',
    name: 'Grand Central Mall',
    location: '789 Retail Blvd',
    activeVehicles: 350,
    violationsToday: 28,
    healthScore: 88
  }
];
