
import React from "react";
import { 
  Shield, 
  AlertCircle, 
  LineChart, 
  Bell, 
  Globe, 
  FileText, 
  Settings, 
  Lock, 
  User,
  Menu
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger
} from "@/components/ui/sidebar";

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  alert?: boolean;
}

const NavItem = ({ icon: Icon, label, active, alert }: NavItemProps) => (
  <SidebarMenuItem>
    <SidebarMenuButton 
      tooltip={label}
      isActive={active}
      className={cn(
        active ? "bg-cyber-medium-blue text-cyber-light-blue" : "text-slate-300 hover:bg-slate-800"
      )}
    >
      <Icon size={20} className="mr-3" />
      <span>{label}</span>
      {alert && (
        <div className="ml-auto bg-cyber-alert-red text-white text-xs px-2 py-0.5 rounded-full animate-pulse">
          New
        </div>
      )}
    </SidebarMenuButton>
  </SidebarMenuItem>
);

export default function AppSidebar() {
  return (
    <Sidebar className="bg-sidebar border-r border-slate-700">
      <SidebarHeader className="pb-2">
        <div className="flex items-center px-4 py-2">
          <Shield className="h-8 w-8 text-cyber-light-blue" />
          <span className="ml-2 text-xl font-bold text-slate-100">CyberShield</span>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarMenu>
          <NavItem icon={Shield} label="Dashboard" active />
          <NavItem icon={AlertCircle} label="Threats" alert />
          <NavItem icon={LineChart} label="Analytics" />
          <NavItem icon={Bell} label="Alerts" />
          <NavItem icon={Globe} label="Dark Web" />
          <NavItem icon={FileText} label="Reports" />
          <NavItem icon={Lock} label="Vulnerabilities" />
          <NavItem icon={Settings} label="Settings" />
        </SidebarMenu>
      </SidebarContent>
      
      <SidebarFooter>
        <div className="border-t border-slate-700 pt-4">
          <div className="flex items-center px-4 py-2">
            <div className="h-9 w-9 rounded-full bg-cyber-accent flex items-center justify-center text-white">
              <User size={18} />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-slate-100">Security Analyst</p>
              <p className="text-xs text-slate-400">admin@cybershield.com</p>
            </div>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
