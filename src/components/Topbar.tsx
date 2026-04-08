import React from 'react';
import { Bell, Search, Settings, HelpCircle } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';

export function Topbar() {
  return (
    <header className="h-16 border-b bg-card/50 backdrop-blur-sm flex items-center justify-between px-8 sticky top-0 z-10">
      <div className="flex items-center gap-4 flex-1 max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search plates, properties, or parkers..." 
            className="pl-9 bg-muted/50 border-none focus-visible:ring-1"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5 text-muted-foreground" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full border-2 border-background" />
        </Button>
        <Button variant="ghost" size="icon">
          <HelpCircle className="w-5 h-5 text-muted-foreground" />
        </Button>
        <Button variant="ghost" size="icon">
          <Settings className="w-5 h-5 text-muted-foreground" />
        </Button>
        <div className="w-px h-6 bg-border mx-2" />
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-medium">System Status</p>
            <p className="text-[10px] text-emerald-500 font-bold flex items-center justify-end gap-1">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              LIVE
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
