
import React from "react";
import StatCard from "@/components/dashboard/StatCard";

export default function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <StatCard 
        title="Security Incidents" 
        value={42} 
        change={12} 
        icon="alert"
        type="danger"
      />
      <StatCard 
        title="System Vulnerabilities" 
        value={87} 
        change={-5} 
        icon="shield"
        type="warning"
      />
      <StatCard 
        title="Network Uptime" 
        value="99.8%" 
        icon="activity"
        type="success"
      />
      <StatCard 
        title="Security Score" 
        value="B+" 
        change={3} 
        icon="check"
        type="default"
      />
    </div>
  );
}
