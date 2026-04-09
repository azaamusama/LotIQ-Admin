export const mockSignUps: SignUp[] = [
  {
    id: 's1',
    propertyName: 'Oakwood Heights',
    address: '742 Evergreen Terrace',
    serviceType: 'Full Lot Enforcement',
    installationDate: '2026-04-10T09:00:00Z',
    status: 'pending',
    pricing: '$499/mo',
    progress: 0
  },
  {
    id: 's2',
    propertyName: 'Sunset Villas',
    address: '123 Ocean View Dr',
    serviceType: 'Visitor Only',
    installationDate: '2026-04-12T14:30:00Z',
    status: 'in_progress',
    assignedAdmin: 'Sarah Jenkins',
    pricing: '$299/mo',
    progress: 45
  },
  {
    id: 's3',
    propertyName: 'North Star Logistics',
    address: '888 Industrial Way',
    serviceType: 'Security Monitoring',
    installationDate: '2026-04-08T11:00:00Z',
    status: 'ready',
    assignedAdmin: 'Robert Chen',
    pricing: '$899/mo',
    progress: 100
  },
  {
    id: 's4',
    propertyName: 'Tech Plaza Phase II',
    address: '457 Innovation Way',
    serviceType: 'Full Lot Enforcement',
    installationDate: '2026-04-05T10:00:00Z',
    status: 'live',
    assignedAdmin: 'Sarah Jenkins',
    pricing: '$599/mo',
    progress: 100
  }
];

export const mockCameras: Camera[] = [
  {
    id: 'cam-1',
    name: 'North Entrance',
    location: 'Gate A',
    status: 'valid',
    fov: 90,
    feedUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    coverage: 'Entrance and visitor parking',
    lastValidated: '2026-04-09T10:00:00Z'
  },
  {
    id: 'cam-2',
    name: 'South Lot',
    location: 'Pole 4',
    status: 'adjustment_needed',
    fov: 110,
    feedUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    coverage: 'Resident parking rows 1-5',
    lastValidated: '2026-04-09T11:30:00Z'
  },
  {
    id: 'cam-3',
    name: 'Loading Dock',
    location: 'Building B',
    status: 'offline',
    fov: 75,
    feedUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    coverage: 'Loading area and fire lane'
  }
];

export const mockZones: ParkingZone[] = [
  {
    id: 'z1',
    name: 'Visitor Parking',
    type: 'visitor',
    rules: ['4h limit', 'No overnight'],
    color: '#0088FF',
    coordinates: [{ x: 10, y: 10 }, { x: 40, y: 10 }, { x: 40, y: 30 }, { x: 10, y: 30 }]
  },
  {
    id: 'z2',
    name: 'Resident Reserved',
    type: 'resident',
    rules: ['Permit required'],
    color: '#10B981',
    coordinates: [{ x: 50, y: 10 }, { x: 90, y: 10 }, { x: 90, y: 50 }, { x: 50, y: 50 }]
  },
  {
    id: 'z3',
    name: 'Fire Lane',
    type: 'no_parking',
    rules: ['Immediate tow'],
    color: '#EF4444',
    coordinates: [{ x: 10, y: 40 }, { x: 40, y: 40 }, { x: 40, y: 50 }, { x: 10, y: 50 }]
  }
];

export const mockRules: PropertyRule[] = [
  {
    id: 'r1',
    name: 'Unauthorized Parking',
    description: 'Vehicle not in authorized list',
    type: 'unauthorized',
    value: 'Immediate',
    enabled: true
  },
  {
    id: 'r2',
    name: 'Visitor Time Limit',
    description: 'Max duration for visitors',
    type: 'time_limit',
    value: 240,
    enabled: true
  },
  {
    id: 'r3',
    name: 'Grace Period',
    description: 'Time allowed before violation triggers',
    type: 'grace_period',
    value: 15,
    enabled: true
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

import { Vehicle, Violation, Property, SignUp, PropertyManager, AuthorizedParker, TowOperator, AuditLog, Camera, ParkingZone, PropertyRule } from '../types';

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
    vehicleImage: 'https://picsum.photos/seed/car2/400/300',
    property: 'Skyline Apartments',
    zone: 'Visitor V2',
    rule: 'Exceeded 4h Visitor Limit',
    confidence: 0.98,
    timestamp: '2026-04-09T10:30:00Z',
    status: 'detected',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    duration: '4h 45m',
    cameraId: 'CAM-01',
    aiReasoning: 'Vehicle not found in authorized parker list for this property and exceeded allowed duration.'
  },
  {
    id: 'viol-2',
    vehicleId: 'v3',
    plate: 'LMN-5544',
    vehicleImage: 'https://picsum.photos/seed/car3/400/300',
    property: 'Tech Plaza',
    zone: 'Loading Dock',
    rule: 'Unauthorized Parking in Loading Zone',
    confidence: 0.92,
    timestamp: '2026-04-09T11:15:00Z',
    status: 'in_review',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    duration: '15m',
    cameraId: 'CAM-04',
    aiReasoning: 'Vehicle detected in loading zone without valid commercial permit.'
  },
  {
    id: 'viol-3',
    vehicleId: 'v5',
    plate: 'GHI-7788',
    vehicleImage: 'https://picsum.photos/seed/car5/400/300',
    property: 'Grand Central Mall',
    zone: 'Handicap H1',
    rule: 'No Handicap Permit Detected',
    confidence: 0.85,
    timestamp: '2026-04-09T09:45:00Z',
    status: 'approved',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    duration: '10m',
    cameraId: 'CAM-02',
    aiReasoning: 'Vehicle parked in handicap spot; AI failed to detect valid permit on dashboard or license plate.',
    reviewerId: 'u1',
    decisionTimestamp: '2026-04-09T10:00:00Z'
  },
  {
    id: 'viol-4',
    vehicleId: 'v6',
    plate: 'DEF-4433',
    vehicleImage: 'https://picsum.photos/seed/car6/400/300',
    property: 'Skyline Apartments',
    zone: 'No Parking Zone',
    rule: 'Parking in Fire Lane',
    confidence: 0.99,
    timestamp: '2026-04-09T08:20:00Z',
    status: 'dispatched',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    duration: '5m',
    cameraId: 'CAM-01',
    aiReasoning: 'Vehicle stopped in designated fire lane for more than 3 minutes.',
    reviewerId: 'u1',
    decisionTimestamp: '2026-04-09T08:25:00Z'
  },
  {
    id: 'viol-5',
    vehicleId: 'v7',
    plate: 'JKL-1122',
    vehicleImage: 'https://picsum.photos/seed/car7/400/300',
    property: 'Tech Plaza',
    zone: 'Visitor V1',
    rule: 'Unauthorized Overnight Parking',
    confidence: 0.78,
    timestamp: '2026-04-09T02:00:00Z',
    status: 'rejected',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    duration: '8h',
    cameraId: 'CAM-03',
    aiReasoning: 'Vehicle remained in visitor parking past 2:00 AM cutoff.',
    reviewerId: 'u2',
    decisionTimestamp: '2026-04-09T07:30:00Z',
    rejectionReason: 'Authorized vehicle - guest permit found in manual override.'
  }
];

export const mockAuditLogs: AuditLog[] = [
  {
    id: 'log-1',
    violationId: 'viol-3',
    userId: 'u1',
    userName: 'Reviewer One',
    action: 'Approved Violation',
    timestamp: '2026-04-09T10:00:00Z',
    previousStatus: 'in_review',
    newStatus: 'approved',
    details: 'Confirmed no handicap permit visible in video evidence.'
  },
  {
    id: 'log-2',
    violationId: 'viol-4',
    userId: 'u1',
    userName: 'Reviewer One',
    action: 'Dispatched Tow',
    timestamp: '2026-04-09T08:25:00Z',
    previousStatus: 'approved',
    newStatus: 'dispatched',
    details: 'Dispatched Rapid Recovery Towing for fire lane violation.'
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
