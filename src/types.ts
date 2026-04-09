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

export type ViolationStatus = 'detected' | 'in_review' | 'approved' | 'dispatched' | 'completed' | 'cancelled' | 'rejected';

export interface Violation {
  id: string;
  vehicleId: string;
  plate: string;
  vehicleImage: string;
  property: string;
  zone: string;
  rule: string;
  confidence: number;
  timestamp: string;
  status: ViolationStatus;
  videoUrl: string;
  duration: string;
  cameraId: string;
  aiReasoning: string;
  reviewerId?: string;
  decisionTimestamp?: string;
  notes?: string;
  rejectionReason?: string;
}

export interface AuditLog {
  id: string;
  violationId: string;
  userId: string;
  userName: string;
  action: string;
  timestamp: string;
  previousStatus?: ViolationStatus;
  newStatus: ViolationStatus;
  details: string;
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
  status: 'pending' | 'in_progress' | 'ready' | 'live';
  assignedAdmin?: string;
  pricing?: string;
  progress?: number;
}

export interface Camera {
  id: string;
  name: string;
  location: string;
  status: 'valid' | 'adjustment_needed' | 'offline';
  fov: number; // Field of view in degrees
  feedUrl?: string;
  coverage?: string;
  lastValidated?: string;
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
  type: 'resident' | 'visitor' | 'loading' | 'no_parking' | 'ev' | 'handicap' | 'reserved';
  rules: string[];
  coordinates?: { x: number, y: number }[]; // For map polygon
  color?: string;
}

export interface ParkingSpot {
  id: string;
  spotId: string;
  type: 'general' | 'ev' | 'handicap' | 'reserved';
  zoneId: string;
  status: 'vacant' | 'occupied' | 'violation';
  coordinates?: { x: number, y: number };
}

export interface PropertyRule {
  id: string;
  name: string;
  description: string;
  type: 'unauthorized' | 'time_limit' | 'ev_only' | 'no_parking' | 'grace_period';
  value: string | number;
  enabled: boolean;
}
