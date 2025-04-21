
import React from "react";
import { FileText, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSecurityEvents, SecurityEvent } from "@/hooks/useSecurityEvents";

const LogEventItem = ({ event }: { event: SecurityEvent }) => {
  const typeClasses = {
    info: "border-l-cyber-light-blue",
    warning: "border-l-cyber-alert-amber",
    error: "border-l-cyber-alert-red"
  };

  return (
    <div className={cn(
      "py-2 pl-3 border-l-2 hover:bg-slate-800 transition-colors",
      typeClasses[event.type]
    )}>
      <div className="text-sm text-slate-100">{event.message}</div>
      <div className="flex items-center mt-1 text-xs text-slate-400">
        <span>{event.source}</span>
        <span className="mx-2">•</span>
        <Clock className="h-3 w-3 mr-1" />
        <span>{event.timestamp}</span>
      </div>
    </div>
  );
};

export default function SecurityEventLog() {
  const { events } = useSecurityEvents();

  return (
    <div className="cyber-card h-80">
      <div className="cyber-card-header">
        <div className="flex items-center">
          <FileText className="h-5 w-5 mr-2 text-cyber-light-blue" />
          <h2>Security Event Log</h2>
          <div className="ml-2 flex items-center">
            <div className="h-2 w-2 rounded-full bg-cyber-alert-green animate-pulse mr-1"></div>
            <span className="text-xs text-slate-400">Live</span>
          </div>
        </div>
      </div>
      
      <ScrollArea className="h-64">
        <div className="mt-2 space-y-2 pr-4">
          {events.length > 0 ? (
            events.map(event => (
              <LogEventItem key={event.id} event={event} />
            ))
          ) : (
            <div className="text-center py-6 text-slate-400">
              No security events to display
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
