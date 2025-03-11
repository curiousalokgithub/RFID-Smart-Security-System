import React, { useState, useEffect } from 'react';
import { Shield, Users, AlertTriangle, Activity, Battery, Signal, Bell, DoorClosed } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';
import { AccessLog } from '../types';
import NotificationPanel from './NotificationPanel';
import MLInsights from './MLInsights';
import toast from 'react-hot-toast';
import { io } from 'socket.io-client';

const mockAccessData = [
  { time: '00:00', count: 2 },
  { time: '04:00', count: 1 },
  { time: '08:00', count: 8 },
  { time: '12:00', count: 12 },
  { time: '16:00', count: 15 },
  { time: '20:00', count: 5 },
];

const mockNotifications: AccessLog[] = [
  {
    id: '1',
    timestamp: new Date(),
    cardId: 'RFID-001',
    userName: 'John Smith',
    accessType: 'granted',
    location: 'Main Entrance'
  },
  {
    id: '2',
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    cardId: 'RFID-002',
    userName: 'Alice Johnson',
    accessType: 'denied',
    location: 'Server Room'
  }
];

const mockInsights = [
  {
    type: 'anomaly' as const,
    description: 'Unusual access pattern detected at Server Room',
    confidence: 85,
    timestamp: new Date()
  },
  {
    type: 'pattern' as const,
    description: 'Regular access pattern identified for morning shift',
    confidence: 92,
    timestamp: new Date()
  }
];

const Dashboard: React.FC = () => {
  const [notifications, setNotifications] = useState<AccessLog[]>(mockNotifications);
  
  useEffect(() => {
    // Initialize Socket.IO connection
    const socket = io('http://localhost:3000');

    socket.on('access-event', (event: AccessLog) => {
      setNotifications(prev => [event, ...prev].slice(0, 10));
      
      // Show toast notification
      toast(
        <div className="flex items-center space-x-2">
          <div className={event.accessType === 'granted' ? 'text-green-500' : 'text-red-500'}>
            <DoorClosed className="h-5 w-5" />
          </div>
          <div>
            <p className="font-medium">{event.userName}</p>
            <p className="text-sm">{event.location}</p>
          </div>
        </div>,
        {
          duration: 4000,
          position: 'top-right',
        }
      );
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatusCard
          title="System Status"
          value="Online"
          icon={<Shield className="h-6 w-6 text-green-500" />}
          color="bg-green-100"
        />
        <StatusCard
          title="Active Users"
          value="24"
          icon={<Users className="h-6 w-6 text-blue-500" />}
          color="bg-blue-100"
        />
        <StatusCard
          title="Alerts Today"
          value="2"
          icon={<AlertTriangle className="h-6 w-6 text-yellow-500" />}
          color="bg-yellow-100"
        />
        <StatusCard
          title="Total Access Events"
          value="156"
          icon={<Activity className="h-6 w-6 text-purple-500" />}
          color="bg-purple-100"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Access Activity</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockAccessData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="count" stroke="#4F46E5" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <NotificationPanel notifications={notifications} />
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">System Health</h2>
            <div className="space-y-4">
              <HealthMetric
                icon={<Battery className="h-5 w-5" />}
                label="Battery Level"
                value="85%"
                color="text-green-500"
              />
              <HealthMetric
                icon={<Signal className="h-5 w-5" />}
                label="Signal Strength"
                value="Excellent"
                color="text-blue-500"
              />
              <HealthMetric
                icon={<Bell className="h-5 w-5" />}
                label="Last Alert"
                value={format(new Date(), 'HH:mm')}
                color="text-yellow-500"
              />
            </div>
          </div>
          <MLInsights insights={mockInsights} />
        </div>
      </div>
    </div>
  );
};

const StatusCard: React.FC<{
  title: string;
  value: string;
  icon: React.ReactNode;
  color: string;
}> = ({ title, value, icon, color }) => (
  <div className={`${color} rounded-lg p-6 transform transition-transform hover:scale-105`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-semibold mt-1">{value}</p>
      </div>
      {icon}
    </div>
  </div>
);

const HealthMetric: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
}> = ({ icon, label, value, color }) => (
  <div className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50">
    <div className="flex items-center space-x-3">
      <div className={`${color}`}>{icon}</div>
      <span className="text-gray-600">{label}</span>
    </div>
    <span className="font-medium">{value}</span>
  </div>
);

export default Dashboard;