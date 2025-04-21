
import React from "react";
import { Search, Bell, Shield, AlertCircle } from "lucide-react";

export default function Header() {
  const currentDate = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <header className="bg-cyber-medium-blue border-b border-slate-700 py-4 px-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-slate-100">Security Operations Dashboard</h1>
        
        <div className="flex items-center space-x-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search threats..."
              className="bg-cyber-dark-blue border border-slate-700 rounded-md py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-cyber-light-blue w-64"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          </div>
          
          <div className="relative">
            <button className="p-2 rounded-full hover:bg-slate-700">
              <Bell className="h-5 w-5 text-slate-300" />
              <span className="absolute top-0.5 right-0.5 h-2 w-2 bg-cyber-alert-red rounded-full"></span>
            </button>
          </div>
          
          <div className="flex items-center ml-4 space-x-4 border-l border-slate-700 pl-4">
            <div className="flex items-center">
              <div className="h-3 w-3 rounded-full bg-cyber-alert-amber animate-pulse mr-2"></div>
              <span className="text-xs text-slate-300">DEFCON 3</span>
            </div>
            <div className="flex items-center">
              <AlertCircle className="h-4 w-4 text-cyber-alert-red mr-1" />
              <span className="text-xs text-slate-300">12 Critical Alerts</span>
            </div>
            <div className="text-xs text-slate-400">{currentDate}</div>
          </div>
        </div>
      </div>
    </header>
  );
}
