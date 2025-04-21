import React, { useEffect, useState } from "react";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Activity } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ActivityData {
  name: string;
  networkActivity: number;
  threats: number;
}

const generateInitialData = () => {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  return hours.map(hour => ({
    name: `${hour}:00`,
    networkActivity: Math.floor(Math.random() * 100) + 20,
    threats: Math.floor(Math.random() * 20),
  }));
};

export default function ActivityChart() {
  const [data, setData] = useState<ActivityData[]>(generateInitialData());
  const { toast } = useToast();

  useEffect(() => {
    const interval = setInterval(() => {
      const newData = [...data];
      const lastEntry = newData[newData.length - 1];
      const networkChange = Math.floor(Math.random() * 30) - 15;
      const threatChange = Math.floor(Math.random() * 5) - 2;
      
      const newNetworkActivity = Math.max(20, Math.min(120, lastEntry.networkActivity + networkChange));
      const newThreats = Math.max(0, Math.min(20, lastEntry.threats + threatChange));
      
      if (newThreats > lastEntry.threats + 1) {
        toast({
          title: "Threat Alert",
          description: `Increased threat activity detected: ${newThreats} threats`,
          variant: "destructive"
        });
      }

      newData[newData.length - 1] = {
        ...lastEntry,
        networkActivity: newNetworkActivity,
        threats: newThreats
      };

      setData(newData);
    }, 5000);

    return () => clearInterval(interval);
  }, [data]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-cyber-dark-blue p-3 border border-slate-700 rounded shadow-lg">
          <p className="text-sm text-slate-300">{`Time: ${label}`}</p>
          <p className="text-xs text-cyber-light-blue">
            {`Network Activity: ${payload[0].value}`}
          </p>
          <p className="text-xs text-cyber-alert-red">
            {`Threats Detected: ${payload[1].value}`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="cyber-card h-80">
      <div className="cyber-card-header">
        <div className="flex items-center">
          <Activity className="h-5 w-5 mr-2 text-cyber-light-blue" />
          <h2>Network Activity</h2>
          <div className="ml-2 flex items-center">
            <div className="h-2 w-2 rounded-full bg-cyber-alert-green animate-pulse mr-1"></div>
            <span className="text-xs text-slate-400">Live</span>
          </div>
        </div>
      </div>
      
      <div className="mt-4 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis 
              dataKey="name" 
              stroke="#475569" 
              tick={{ fill: "#94a3b8" }}
              tickLine={{ stroke: "#475569" }}
              axisLine={{ stroke: "#475569" }}
            />
            <YAxis 
              stroke="#475569"
              tick={{ fill: "#94a3b8" }}
              tickLine={{ stroke: "#475569" }}
              axisLine={{ stroke: "#475569" }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="networkActivity" 
              stroke="#06b6d4" 
              strokeWidth={2} 
              dot={{ stroke: "#06b6d4", strokeWidth: 2, r: 3, fill: "#0f172a" }}
              activeDot={{ stroke: "#06b6d4", strokeWidth: 2, r: 4, fill: "#06b6d4" }}
            />
            <Line 
              type="monotone" 
              dataKey="threats" 
              stroke="#ef4444" 
              strokeWidth={2}
              dot={{ stroke: "#ef4444", strokeWidth: 2, r: 3, fill: "#0f172a" }}
              activeDot={{ stroke: "#ef4444", strokeWidth: 2, r: 4, fill: "#ef4444" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
