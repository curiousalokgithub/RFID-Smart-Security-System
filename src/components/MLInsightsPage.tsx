import React from 'react';
import { Brain, TrendingUp, AlertTriangle, RefreshCcw } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockData = [
  { time: '00:00', anomalyScore: 0.2 },
  { time: '04:00', anomalyScore: 0.3 },
  { time: '08:00', anomalyScore: 0.8 },
  { time: '12:00', anomalyScore: 0.4 },
  { time: '16:00', anomalyScore: 0.6 },
  { time: '20:00', anomalyScore: 0.3 },
];

const MLInsightsPage = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Brain className="h-6 w-6 text-purple-600" />
          <h1 className="text-2xl font-semibold text-gray-900">ML Insights</h1>
        </div>
        <button className="flex items-center space-x-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-lg hover:bg-purple-200 transition-colors">
          <RefreshCcw className="h-4 w-4" />
          <span>Update Analysis</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Anomaly Detection</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="anomalyScore" stroke="#9333EA" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Pattern Recognition</h2>
          <div className="space-y-4">
            <PatternCard
              title="Morning Rush Pattern"
              description="High traffic detected between 8-10 AM"
              confidence={92}
              type="pattern"
            />
            <PatternCard
              title="Unusual Weekend Access"
              description="Abnormal access pattern detected on Sundays"
              confidence={85}
              type="anomaly"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const PatternCard = ({ title, description, confidence, type }: {
  title: string;
  description: string;
  confidence: number;
  type: 'pattern' | 'anomaly';
}) => {
  return (
    <div className={`p-4 rounded-lg ${
      type === 'pattern' ? 'bg-blue-50' : 'bg-red-50'
    }`}>
      <div className="flex items-start space-x-3">
        {type === 'pattern' ? (
          <TrendingUp className="h-5 w-5 text-blue-500" />
        ) : (
          <AlertTriangle className="h-5 w-5 text-red-500" />
        )}
        <div className="flex-1">
          <h3 className="font-medium text-gray-900">{title}</h3>
          <p className="text-sm text-gray-600 mt-1">{description}</p>
          <div className="mt-2 flex items-center">
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${
                  type === 'pattern' ? 'bg-blue-500' : 'bg-red-500'
                }`}
                style={{ width: `${confidence}%` }}
              />
            </div>
            <span className="ml-2 text-xs text-gray-500">
              {confidence}% confidence
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MLInsightsPage;