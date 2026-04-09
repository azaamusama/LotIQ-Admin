import React from 'react';
import { Building2, Plus, MapPin, Users, ShieldAlert, MoreVertical } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { mockProperties } from '../lib/mock-data';
import { cn } from '../lib/utils';

export function PropertiesView() {
  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Properties</h1>
          <p className="text-muted-foreground">Manage parking zones and enforcement rules for each location.</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Add Property
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockProperties.map((property) => (
          <Card key={property.id} className="overflow-hidden group hover:border-primary/50 transition-colors">
            <div className="h-32 bg-muted relative">
              <img 
                src={`https://picsum.photos/seed/${property.id}/600/300`} 
                className="w-full h-full object-cover opacity-80"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 right-4">
                <Badge className={cn(
                  "font-bold",
                  property.healthScore > 90 ? "bg-emerald-500" : "bg-amber-500"
                )}>
                  {property.healthScore}% Health
                </Badge>
              </div>
            </div>
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <CardTitle className="text-xl">{property.name}</CardTitle>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="w-3 h-3" />
                {property.location}
              </div>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase">Active Vehicles</p>
                  <p className="text-lg font-bold flex items-center gap-2">
                    <Users className="w-4 h-4 text-primary" />
                    {property.activeVehicles}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase">Violations Today</p>
                  <p className="text-lg font-bold flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-destructive" />
                    {property.violationsToday}
                  </p>
                </div>
              </div>
              <Button variant="outline" className="w-full text-xs h-9">View Details</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

