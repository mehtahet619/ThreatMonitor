
import React from "react";
import DashboardStats from "./DashboardStats";
import ActivityChart from "./ActivityChart";
import SecurityEventLog from "./SecurityEventLog";
import ThreatList from "./ThreatList";
import AnomalyDetection from "./AnomalyDetection";

interface Props {
  threats: any[];  // We'll keep the existing type for now
  anomalies: any[];
}

export default function DashboardContent({ threats, anomalies }: Props) {
  return (
    <div className="flex-1 p-6">
      <DashboardStats />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <ActivityChart />
        </div>
        <div>
          <SecurityEventLog />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ThreatList threats={threats} />
        <AnomalyDetection anomalies={anomalies} />
      </div>
    </div>
  );
}
