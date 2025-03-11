import React from 'react';
import { Brain, AlertTriangle, TrendingUp } from 'lucide-react';

interface MLInsight {
  type: 'anomaly' | 'pattern';
  description: string;
  confidence: number;
  timestamp: Date;
}

interface MLInsightsProps {
  insights: MLInsight[];
}

const MLInsights: React.FC<MLInsightsProps> = ({ insights }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-lg font-semibold mb-4 flex items-center">
        <Brain className="h-5 w-5 mr-2 text-purple-600" />
        ML Insights
      </h2>
      <div className="space-y-4">
        {insights.map((insight, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg ${
              insight.type === 'anomaly'
                ? 'bg-red-50 border border-red-200'
                : 'bg-blue-50 border border-blue-200'
            }`}
          >
            <div className="flex items-start space-x-3">
              {insight.type === 'anomaly' ? (
                <AlertTriangle className="h-5 w-5 text-red-500" />
              ) : (
                <TrendingUp className="h-5 w-5 text-blue-500" />
              )}
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {insight.description}
                </p>
                <div className="mt-2 flex items-center">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        insight.type === 'anomaly'
                          ? 'bg-red-500'
                          : 'bg-blue-500'
                      }`}
                      style={{ width: `${insight.confidence}%` }}
                    />
                  </div>
                  <span className="ml-2 text-xs text-gray-500">
                    {insight.confidence}% confidence
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MLInsights;