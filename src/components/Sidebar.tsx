import React from 'react';
import { 
  LayoutDashboard, 
  Car, 
  AlertCircle, 
  Building2, 
  Users, 
  UserCheck, 
  Truck, 
  BarChart3, 
  UserPlus, 
  History,
  ShieldAlert,
  Search,
  Settings2
} from 'lucide-react';
import { cn } from '../lib/utils';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'live-parking', label: 'Live Parking', icon: Car },
  { id: 'violations', label: 'Violations Queue', icon: ShieldAlert },
  { id: 'incidents', label: 'Incidents', icon: AlertCircle },
  { separator: true },
  { id: 'signups', label: 'New Sign-Ups', icon: UserPlus },
  { id: 'setup', label: 'Property Setup', icon: Settings2 },
  { separator: true },
  { id: 'properties', label: 'Properties', icon: Building2 },
  { id: 'managers', label: 'Property Managers', icon: Users },
  { id: 'parkers', label: 'Authorized Parkers', icon: UserCheck },
  { id: 'vehicles', label: 'Vehicles', icon: Search },
  { separator: true },
  { id: 'towing', label: 'Towing Operations', icon: Truck },
  { id: 'analytics', label: 'Reports & Analytics', icon: BarChart3 },
  { id: 'audit', label: 'Audit Logs', icon: History },
];

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  return (
    <div className="w-64 bg-card border-r flex flex-col h-screen sticky top-0">
      <div className="p-6 flex items-center gap-2">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <ShieldAlert className="text-primary-foreground w-5 h-5" />
        </div>
        <span className="text-xl font-bold tracking-tight">LotIQ</span>
      </div>
      
      <nav className="flex-1 px-4 space-y-1 overflow-y-auto pb-4">
        {menuItems.map((item, index) => {
          if (item.separator) {
            return <div key={`sep-${index}`} className="my-4 border-t border-border/50" />;
          }
          
          const Icon = item.icon!;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id!)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                isActive 
                  ? "bg-primary text-primary-foreground" 
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <Icon className="w-4 h-4" />
              {item.label}
            </button>
          );
        })}
      </nav>
      
      <div className="p-4 border-t bg-muted/30">
        <div className="flex items-center gap-3 px-2 py-1">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
            UA
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold truncate">Usama Azam</p>
            <p className="text-[10px] text-muted-foreground truncate">Super Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
}
