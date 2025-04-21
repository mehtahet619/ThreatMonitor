
import React from "react";
import { cn } from "@/lib/utils";
import { AlertCircle, ZapOff, Zap, Search } from "lucide-react";

interface Anomaly {
  id: number;
  title: string;
  description: string;
  confidence: number;
  timestamp: string;
  status: 'detected' | 'investigating' | 'resolved';
}

interface AnomalyDetectionProps {
  anomalies: Anomaly[];
}

const AnomalyItem = ({ anomaly }: { anomaly: Anomaly }) => {
  const statusClasses = {
    detected: "bg-cyber-alert-red bg-opacity-10 text-cyber-alert-red",
    investigating: "bg-cyber-alert-amber bg-opacity-10 text-cyber-alert-amber",
    resolved: "bg-cyber-alert-green bg-opacity-10 text-cyber-alert-green",
  };

  const statusIcon = {
    detected: <AlertCircle className="h-3 w-3 mr-1" />,
    investigating: <Search className="h-3 w-3 mr-1" />,
    resolved: <ZapOff className="h-3 w-3 mr-1" />,
  };

  const confidenceLevel = anomaly.confidence > 80 ? 'high' : anomaly.confidence > 50 ? 'medium' : 'low';
  const confidenceClasses = {
    high: "bg-cyber-alert-red",
    medium: "bg-cyber-alert-amber",
    low: "bg-cyber-alert-green",
  };

  return (
    <div className="bg-cyber-dark-blue border border-slate-700 rounded-md p-3 mb-2">
      <div className="flex items-start justify-between">
        <div>
          <h4 className="font-medium text-slate-100">{anomaly.title}</h4>
          <p className="text-xs text-slate-400 mt-1">{anomaly.description}</p>
          
          <div className="flex items-center mt-2">
            <div className={cn("flex items-center text-xs px-2 py-0.5 rounded", statusClasses[anomaly.status])}>
              {statusIcon[anomaly.status]}
              <span>{anomaly.status}</span>
            </div>
            <span className="mx-2 text-slate-600">•</span>
            <span className="text-xs text-slate-400">{anomaly.timestamp}</span>
          </div>
        </div>
        
        <div className="flex flex-col items-end">
          <div className="flex items-center mb-1">
            <Zap className="h-3 w-3 mr-1 text-cyber-light-blue" />
            <span className="text-xs text-slate-300">AI Confidence</span>
          </div>
          <div className="w-24 bg-slate-700 rounded-full h-1.5">
            <div 
              className={cn("h-1.5 rounded-full", confidenceClasses[confidenceLevel])}
              style={{ width: `${anomaly.confidence}%` }}
            />
          </div>
          <span className="text-xs text-slate-400 mt-1">{anomaly.confidence}%</span>
        </div>
      </div>
    </div>
  );
};

export default function AnomalyDetection({ anomalies }: AnomalyDetectionProps) {
  return (
    <div className="cyber-card">
      <div className="cyber-card-header">
        <div className="flex items-center">
          <AlertCircle className="h-5 w-5 mr-2 text-cyber-alert-amber" />
          <h2>Anomaly Detection</h2>
        </div>
        <div className="flex items-center text-xs">
          <div className="h-2 w-2 rounded-full bg-cyber-light-blue animate-pulse mr-1"></div>
          <span className="text-slate-400">AI Model Active</span>
        </div>
      </div>
      
      <div className="mt-2 space-y-2">
        {anomalies.map(anomaly => (
          <AnomalyItem key={anomaly.id} anomaly={anomaly} />
        ))}
      </div>
    </div>
  );
}
