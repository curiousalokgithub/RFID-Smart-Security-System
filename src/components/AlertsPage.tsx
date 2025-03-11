import React from 'react';
import { AlertTriangle, AlertCircle, CheckCircle2 } from 'lucide-react';

const AlertsPage = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Security Alerts</h1>
        <div className="flex space-x-2">
          <button className="bg-red-100 text-red-800 px-4 py-2 rounded-lg hover:bg-red-200 transition-colors">
            Critical (2)
          </button>
          <button className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-lg hover:bg-yellow-200 transition-colors">
            Warnings (5)
          </button>
          <button className="bg-green-100 text-green-800 px-4 py-2 rounded-lg hover:bg-green-200 transition-colors">
            Resolved (12)
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <AlertCard
          type="critical"
          title="Unauthorized Access Attempt"
          description="Multiple failed access attempts detected at Server Room"
          time="2 minutes ago"
        />
        <AlertCard
          type="warning"
          title="Unusual Access Pattern"
          description="Off-hours access detected for user John Smith"
          time="15 minutes ago"
        />
        <AlertCard
          type="resolved"
          title="System Maintenance"
          description="Regular system check completed successfully"
          time="1 hour ago"
        />
      </div>
    </div>
  );
};

const AlertCard = ({ type, title, description, time }: {
  type: 'critical' | 'warning' | 'resolved';
  title: string;
  description: string;
  time: string;
}) => {
  const styles = {
    critical: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      icon: <AlertTriangle className="h-6 w-6 text-red-600" />,
      text: 'text-red-800'
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      icon: <AlertCircle className="h-6 w-6 text-yellow-600" />,
      text: 'text-yellow-800'
    },
    resolved: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      icon: <CheckCircle2 className="h-6 w-6 text-green-600" />,
      text: 'text-green-800'
    }
  }[type];

  return (
    <div className={`${styles.bg} ${styles.border} border rounded-lg p-4 transition-transform hover:scale-[1.01]`}>
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">{styles.icon}</div>
        <div className="flex-1">
          <h3 className={`text-lg font-medium ${styles.text}`}>{title}</h3>
          <p className="mt-1 text-gray-600">{description}</p>
          <p className="mt-2 text-sm text-gray-500">{time}</p>
        </div>
        <button className="px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow transition-shadow">
          View Details
        </button>
      </div>
    </div>
  );
};

export default AlertsPage;