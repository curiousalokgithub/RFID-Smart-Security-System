import React from 'react';
import { Save, Bell, Shield, Clock, Wifi, Database, Bot } from 'lucide-react';

const SettingsPage = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center space-x-2">
          <Save className="h-5 w-5" />
          <span>Save Changes</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <SettingsSection
            icon={<Bell className="h-6 w-6 text-indigo-600" />}
            title="Notifications"
          >
            <div className="space-y-4">
              <ToggleSetting
                label="Email Notifications"
                description="Receive email alerts for security events"
              />
              <ToggleSetting
                label="Telegram Notifications"
                description="Get instant alerts via Telegram"
              />
              <ToggleSetting
                label="Push Notifications"
                description="Browser push notifications for critical alerts"
              />
            </div>
          </SettingsSection>

          <SettingsSection
            icon={<Shield className="h-6 w-6 text-indigo-600" />}
            title="Security"
          >
            <div className="space-y-4">
              <ToggleSetting
                label="Two-Factor Authentication"
                description="Require 2FA for admin access"
              />
              <ToggleSetting
                label="Auto-lock"
                description="Automatically lock access after failed attempts"
              />
            </div>
          </SettingsSection>
        </div>

        <div className="space-y-6">
          <SettingsSection
            icon={<Database className="h-6 w-6 text-indigo-600" />}
            title="System"
          >
            <div className="space-y-4">
              <InputSetting
                label="Data Retention"
                type="number"
                placeholder="30"
                suffix="days"
              />
              <InputSetting
                label="API Endpoint"
                type="text"
                placeholder="https://api.example.com"
              />
            </div>
          </SettingsSection>

          <SettingsSection
            icon={<Bot className="h-6 w-6 text-indigo-600" />}
            title="ML Configuration"
          >
            <div className="space-y-4">
              <InputSetting
                label="Anomaly Threshold"
                type="number"
                placeholder="0.85"
                suffix="%"
              />
              <ToggleSetting
                label="Auto-learning"
                description="Enable ML model auto-learning from new data"
              />
            </div>
          </SettingsSection>
        </div>
      </div>
    </div>
  );
};

const SettingsSection = ({ icon, title, children }: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center space-x-2 mb-4">
        {icon}
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
      </div>
      {children}
    </div>
  );
};

const ToggleSetting = ({ label, description }: {
  label: string;
  description: string;
}) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-sm font-medium text-gray-900">{label}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <button className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 bg-indigo-600">
        <span className="translate-x-5 inline-block h-5 w-5 transform rounded-full bg-white transition duration-200 ease-in-out" />
      </button>
    </div>
  );
};

const InputSetting = ({ label, type, placeholder, suffix }: {
  label: string;
  type: string;
  placeholder: string;
  suffix?: string;
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-900">{label}</label>
      <div className="mt-1 flex rounded-md shadow-sm">
        <input
          type={type}
          className="flex-1 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder={placeholder}
        />
        {suffix && (
          <span className="inline-flex items-center rounded-r-md border border-l-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;