export type VehicleStatus = 'authorized' | 'violation' | 'unknown';

export interface Vehicle {
  id: string;
  plate: string;
  image: string;
  property: string;
  zone: string;
  duration: string;
  status: VehicleStatus;
  owner?: string;
  lastSeen: string;
}

export interface Violation {
  id: string;
  vehicleId: string;
  plate: string;
  property: string;
  zone: string;
  rule: string;
  confidence: number;
  timestamp: string;
  status: 'pending' | 'approved' | 'rejected' | 'towed';
  videoUrl: string;
}

export interface Property {
  id: string;
  name: string;
  location: string;
  activeVehicles: number;
  violationsToday: number;
  healthScore: number;
}

export interface SignUp {
  id: string;
  propertyName: string;
  address: string;
  serviceType: 'Full Lot Enforcement' | 'Visitor Only' | 'Security Monitoring';
  installationDate: string;
  status: 'pending' | 'in_progress' | 'ready';
  assignedReviewer?: string;
}

export interface Camera {
  id: string;
  name: string;
  location: string;
  status: 'valid' | 'adjustment_needed' | 'offline';
  fov: number; // Field of view in degrees
}

export interface PropertyManager {
  id: string;
  name: string;
  email: string;
  propertiesCount: number;
  activeVehicles: number;
  status: 'active' | 'inactive';
  lastActivity: string;
}

export interface AuthorizedParker {
  id: string;
  name: string;
  email: string;
  vehiclesCount: number;
  assignedProperty: string;
  status: 'active' | 'restricted';
  flags: string[];
}

export interface TowOperator {
  id: string;
  name: string;
  phone: string;
  propertiesAssigned: number;
  jobsCompleted: number;
  acceptanceRate: number;
  status: 'active' | 'inactive';
  avgResponseTime: string;
}

export interface ParkingZone {
  id: string;
  name: string;
  type: 'resident' | 'visitor' | 'loading' | 'no_parking' | 'ev' | 'handicap';
  rules: string[];
}
