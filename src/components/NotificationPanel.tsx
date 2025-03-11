import React from 'react';
import { format } from 'date-fns';
import { DoorClosed, DoorOpen, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { AccessLog } from '../types';
import clsx from 'clsx';

interface NotificationPanelProps {
  notifications: AccessLog[];
}

export const NotificationPanel: React.FC<NotificationPanelProps> = ({ notifications }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-lg font-semibold mb-4 flex items-center">
        <DoorOpen className="h-5 w-5 mr-2 text-indigo-600" />
        Recent Access Events
      </h2>
      <div className="space-y-4 max-h-[400px] overflow-y-auto">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={clsx(
              "p-4 rounded-lg border-l-4 flex items-start space-x-4",
              notification.accessType === 'granted' 
                ? "border-green-500 bg-green-50" 
                : "border-red-500 bg-red-50"
            )}
          >
            <div className="flex-shrink-0">
              {notification.accessType === 'granted' ? (
                <CheckCircle2 className="h-6 w-6 text-green-500" />
              ) : (
                <AlertTriangle className="h-6 w-6 text-red-500" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="font-medium text-gray-900">
                  {notification.userName}
                </p>
                <span className="text-sm text-gray-500">
                  {format(notification.timestamp, 'HH:mm')}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                {notification.accessType === 'granted' 
                  ? 'Access granted at' 
                  : 'Access denied at'} {notification.location}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Card ID: {notification.cardId}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationPanel;