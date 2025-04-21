
import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { createClient } from '@supabase/supabase-js';

// Types for our security events
export interface SecurityEvent {
  id: number;
  message: string;
  source: string;
  timestamp: string;
  type: 'info' | 'warning' | 'error';
  created_at: string;
}

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL || '',
  import.meta.env.VITE_SUPABASE_ANON_KEY || ''
);

export function useSecurityEvents() {
  const [events, setEvents] = useState<SecurityEvent[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Initial fetch of events
    fetchEvents();

    // Subscribe to new events
    const channel = supabase
      .channel('security_events')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'security_events',
        },
        (payload) => {
          const newEvent = payload.new as SecurityEvent;
          
          if (newEvent.type === 'error') {
            toast({
              title: "Security Alert",
              description: newEvent.message,
              variant: "destructive"
            });
          }

          setEvents(prev => [newEvent, ...prev.slice(0, 7)]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('security_events')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(8);

      if (error) {
        console.error("Error fetching security events:", error);
        return;
      }

      if (data) {
        setEvents(data);
      }
    } catch (err) {
      console.error("Failed to fetch security events:", err);
    }
  };

  return { events };
}
