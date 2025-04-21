import React from "react";
import Header from "@/components/dashboard/Header";
import DashboardContent from "@/components/dashboard/DashboardContent";
import AppSidebar from "@/components/dashboard/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

// Sample data
const threats = [
  {
    id: 1,
    name: "Malicious IP Connection Attempt",
    source: "192.168.0.245",
    timestamp: "10 min ago",
    severity: "high" as const,
    status: "active" as const,
    type: "intrusion" as const
  },
  {
    id: 2,
    name: "Suspicious File Download",
    source: "User: jsmith",
    timestamp: "27 min ago",
    severity: "medium" as const,
    status: "investigating" as const,
    type: "malware" as const
  },
  {
    id: 3,
    name: "Brute Force Login Attempt",
    source: "45.123.45.67",
    timestamp: "1 hr ago",
    severity: "high" as const,
    status: "active" as const,
    type: "intrusion" as const
  },
  {
    id: 4,
    name: "Unauthorized Admin Access",
    source: "Internal Network",
    timestamp: "2 hrs ago",
    severity: "high" as const,
    status: "mitigated" as const,
    type: "intrusion" as const
  }
];

const anomalies = [
  {
    id: 1,
    title: "Unusual Login Pattern Detected",
    description: "Multiple login attempts from different geographic locations for same user account.",
    confidence: 87,
    timestamp: "15 minutes ago",
    status: "investigating" as const
  },
  {
    id: 2,
    title: "Unexpected Data Exfiltration",
    description: "Large volume of data transferred outside normal business hours.",
    confidence: 92,
    timestamp: "43 minutes ago",
    status: "detected" as const
  },
  {
    id: 3,
    title: "Network Scan Activity",
    description: "Internal host scanning multiple ports across the network.",
    confidence: 65,
    timestamp: "2 hours ago",
    status: "resolved" as const
  }
];

const Index = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-cyber-dark-blue text-slate-100">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          <Header />
          <main>
            <div className="flex items-center mb-4 p-6 pb-0">
              <SidebarTrigger className="mr-2" />
              <h1 className="text-xl font-bold">Security Dashboard</h1>
            </div>
            <DashboardContent threats={threats} anomalies={anomalies} />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
