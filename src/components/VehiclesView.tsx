import React from 'react';
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  Eye, 
  Video, 
  History,
  ShieldAlert,
  User,
  Building2
} from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { mockVehicles } from '../lib/mock-data';
import { cn } from '../lib/utils';

export function VehiclesView() {
  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Vehicle Database</h1>
          <p className="text-muted-foreground">Central database of all vehicles across all properties.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search plates..." className="pl-9" />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            Filters
          </Button>
        </div>
      </div>

      <div className="border rounded-xl bg-card overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead>Plate</TableHead>
              <TableHead>Owner / Parker</TableHead>
              <TableHead>Assigned Property</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>History</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockVehicles.map((vehicle) => (
              <TableRow key={vehicle.id} className="hover:bg-muted/30 transition-colors group">
                <TableCell>
                  <div className="font-mono font-bold text-sm tracking-tight bg-muted/50 px-2 py-1 rounded inline-block border">
                    {vehicle.plate}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 text-sm">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">{vehicle.owner || 'Unassigned'}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 text-sm">
                    <Building2 className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">{vehicle.property}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge 
                    variant="outline" 
                    className={cn(
                      "gap-1.5 font-medium border-none",
                      vehicle.status === 'authorized' && "bg-emerald-500/10 text-emerald-500",
                      vehicle.status === 'violation' && "bg-destructive/10 text-destructive",
                      vehicle.status === 'unknown' && "bg-amber-500/10 text-amber-500"
                    )}
                  >
                    <span className={cn(
                      "w-1.5 h-1.5 rounded-full",
                      vehicle.status === 'authorized' && "bg-emerald-500",
                      vehicle.status === 'violation' && "bg-destructive",
                      vehicle.status === 'unknown' && "bg-amber-500"
                    )} />
                    {vehicle.status.charAt(0).toUpperCase() + vehicle.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold">12 Visits</span>
                      <span className="text-[10px] text-muted-foreground">Last: {vehicle.lastSeen}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <History className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Video className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
