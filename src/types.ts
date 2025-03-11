export interface AccessLog {
  id: string;
  timestamp: Date;
  cardId: string;
  userName: string;
  accessType: 'granted' | 'denied';
  location: string;
}

export interface SystemStatus {
  isOnline: boolean;
  lastHeartbeat: Date;
  batteryLevel: number;
  signalStrength: number;
}

export interface User {
  id: string;
  name: string;
  cardId: string;
  accessLevel: 'admin' | 'user' | 'guest';
  lastAccess?: Date;
  isActive: boolean;
}