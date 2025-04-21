
import React from "react";
import { ArrowRight, ShieldAlert, Globe, Bomb, Cpu, Server } from "lucide-react";
import { cn } from "@/lib/utils";

interface Threat {
  id: number;
  name: string;
  source: string;
  timestamp: string;
  severity: 'high' | 'medium' | 'low';
  status: 'active' | 'mitigated' | 'investigating';
  type: 'malware' | 'ddos' | 'intrusion' | 'ransomware' | 'vulnerability';
}

interface ThreatListProps {
  threats: Threat[];
}

const getThreatIcon = (type: Threat['type']) => {
  switch (type) {
    case 'malware':
      return <Cpu className="h-4 w-4" />;
    case 'ddos':
      return <Globe className="h-4 w-4" />;
    case 'intrusion':
      return <ShieldAlert className="h-4 w-4" />;
    case 'ransomware':
      return <Bomb className="h-4 w-4" />;
    case 'vulnerability':
      return <Server className="h-4 w-4" />;
  }
};

const ThreatItem = ({ threat }: { threat: Threat }) => {
  const severityClasses = {
    high: "bg-cyber-alert-red bg-opacity-10 text-cyber-alert-red border-cyber-alert-red",
    medium: "bg-cyber-alert-amber bg-opacity-10 text-cyber-alert-amber border-cyber-alert-amber",
    low: "bg-cyber-alert-green bg-opacity-10 text-cyber-alert-green border-cyber-alert-green"
  };

  const statusClasses = {
    active: "bg-cyber-alert-red bg-opacity-20 text-cyber-alert-red",
    investigating: "bg-cyber-alert-amber bg-opacity-20 text-cyber-alert-amber",
    mitigated: "bg-cyber-alert-green bg-opacity-20 text-cyber-alert-green"
  };

  return (
    <div className="py-3 border-b border-slate-700 flex items-center">
      <div className={cn("p-2 rounded mr-3", severityClasses[threat.severity])}>
        {getThreatIcon(threat.type)}
      </div>
      
      <div className="flex-1">
        <div className="flex items-center">
          <h3 className="font-medium text-slate-100">{threat.name}</h3>
          <span className={cn("text-xs px-2 py-0.5 rounded ml-2", statusClasses[threat.status])}>
            {threat.status}
          </span>
        </div>
        <div className="text-xs text-slate-400">
          <span>From {threat.source}</span>
          <span className="mx-2">•</span>
          <span>{threat.timestamp}</span>
        </div>
      </div>
      
      <button className="p-1 rounded-full hover:bg-slate-700">
        <ArrowRight className="h-4 w-4 text-slate-400" />
      </button>
    </div>
  );
};

export default function ThreatList({ threats }: ThreatListProps) {
  return (
    <div className="cyber-card">
      <div className="cyber-card-header">
        <div className="flex items-center">
          <ShieldAlert className="h-5 w-5 mr-2 text-cyber-alert-red" />
          <h2>Active Threats</h2>
        </div>
        <span className="text-xs bg-cyber-alert-red bg-opacity-20 text-cyber-alert-red px-2 py-0.5 rounded">
          {threats.filter(t => t.status === 'active').length} Active
        </span>
      </div>
      
      <div className="divide-y divide-slate-700">
        {threats.map(threat => (
          <ThreatItem key={threat.id} threat={threat} />
        ))}
      </div>
      
      <div className="mt-3 text-right">
        <button className="text-xs text-cyber-light-blue hover:underline flex items-center ml-auto">
          View all threats
          <ArrowRight className="h-3 w-3 ml-1" />
        </button>
      </div>
    </div>
  );
}
