
import React from "react";
import { 
  ArrowUp, 
  ArrowDown, 
  AlertTriangle, 
  Shield, 
  Activity,
  CheckCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon?: "alert" | "shield" | "activity" | "check";
  type?: "default" | "danger" | "warning" | "success";
}

export default function StatCard({ 
  title, 
  value, 
  change, 
  icon = "activity",
  type = "default" 
}: StatCardProps) {
  const icons = {
    alert: <AlertTriangle className="h-5 w-5" />,
    shield: <Shield className="h-5 w-5" />,
    activity: <Activity className="h-5 w-5" />,
    check: <CheckCircle className="h-5 w-5" />
  };

  const typeClasses = {
    default: "bg-cyber-medium-blue",
    danger: "bg-gradient-to-r from-cyber-medium-blue to-cyber-medium-blue border-l-4 border-cyber-alert-red",
    warning: "bg-gradient-to-r from-cyber-medium-blue to-cyber-medium-blue border-l-4 border-cyber-alert-amber",
    success: "bg-gradient-to-r from-cyber-medium-blue to-cyber-medium-blue border-l-4 border-cyber-alert-green",
  };

  const iconColors = {
    default: "text-cyber-light-blue",
    danger: "text-cyber-alert-red",
    warning: "text-cyber-alert-amber",
    success: "text-cyber-alert-green",
  };

  return (
    <div className={cn("rounded-lg shadow p-4", typeClasses[type])}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-400 mb-1">{title}</p>
          <p className="text-2xl font-bold text-slate-100">{value}</p>
          {change !== undefined && (
            <div className="flex items-center mt-1">
              {change > 0 ? (
                <ArrowUp className="h-3 w-3 text-cyber-alert-red mr-1" />
              ) : (
                <ArrowDown className="h-3 w-3 text-cyber-alert-green mr-1" />
              )}
              <span 
                className={cn(
                  "text-xs", 
                  change > 0 ? "text-cyber-alert-red" : "text-cyber-alert-green"
                )}
              >
                {Math.abs(change)}% from last week
              </span>
            </div>
          )}
        </div>
        <div className={cn("p-2 rounded-lg bg-opacity-10 bg-slate-700", iconColors[type])}>
          {icons[icon]}
        </div>
      </div>
    </div>
  );
}
