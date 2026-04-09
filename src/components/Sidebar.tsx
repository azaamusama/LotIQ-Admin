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

import { useAuth } from '@/lib/auth-context';
import { LogOut } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['super_admin', 'reviewer'] },
  { id: 'live-parking', label: 'Live Parking', icon: Car, roles: ['super_admin', 'reviewer'] },
  { id: 'violations', label: 'Violations Queue', icon: ShieldAlert, roles: ['super_admin', 'reviewer'] },
  { id: 'incidents', label: 'Incidents', icon: AlertCircle, roles: ['super_admin', 'reviewer'] },
  { separator: true, roles: ['super_admin', 'reviewer'] },
  { id: 'signups', label: 'New Sign-Ups', icon: UserPlus, roles: ['super_admin'] },
  { id: 'setup', label: 'Property Setup', icon: Settings2, roles: ['super_admin'] },
  { separator: true, roles: ['super_admin'] },
  { id: 'properties', label: 'Properties', icon: Building2, roles: ['super_admin'] },
  { id: 'managers', label: 'Property Managers', icon: Users, roles: ['super_admin'] },
  { id: 'parkers', label: 'Authorized Parkers', icon: UserCheck, roles: ['super_admin'] },
  { id: 'vehicles', label: 'Vehicles', icon: Search, roles: ['super_admin'] },
  { separator: true, roles: ['super_admin'] },
  { id: 'towing', label: 'Towing Operations', icon: Truck, roles: ['super_admin'] },
  { id: 'analytics', label: 'Reports & Analytics', icon: BarChart3, roles: ['super_admin'] },
  { id: 'audit', label: 'Audit Logs', icon: History, roles: ['super_admin'] },
];

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const { user, logout } = useAuth();

  const filteredItems = menuItems.filter(item => 
    !item.roles || (user && item.roles.includes(user.role))
  );

  return (
    <div className="w-64 bg-card border-r flex flex-col h-screen sticky top-0">
      <div className="p-6 flex items-center gap-2">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <ShieldAlert className="text-primary-foreground w-5 h-5" />
        </div>
        <span className="text-xl font-bold tracking-tight">LotIQ</span>
      </div>
      
      <nav className="flex-1 px-4 space-y-1 overflow-y-auto pb-4">
        {filteredItems.map((item, index) => {
          if (item.separator) {
            // Only show separator if it's not the last item and the next item is not a separator
            const nextItem = filteredItems[index + 1];
            if (!nextItem || nextItem.separator) return null;
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
      
      <div className="p-4 border-t bg-muted/30 space-y-4">
        <div className="flex items-center gap-3 px-2 py-1">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs uppercase">
            {user?.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold truncate">{user?.name}</p>
            <p className="text-[10px] text-muted-foreground truncate capitalize">
              {user?.role.replace('_', ' ')}
            </p>
          </div>
        </div>
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </div>
  );
}
