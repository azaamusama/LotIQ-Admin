import React from 'react';
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  Eye, 
  Video, 
  AlertTriangle,
  CheckCircle2,
  Clock
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

export function LiveParkingView() {
  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Live Parking Monitor</h1>
          <p className="text-muted-foreground">Real-time visibility of all vehicles currently on-site.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Filter by plate..." className="pl-9" />
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
              <TableHead className="w-[100px]">Vehicle</TableHead>
              <TableHead>License Plate</TableHead>
              <TableHead>Property & Zone</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Seen</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockVehicles.map((vehicle) => (
              <TableRow key={vehicle.id} className="hover:bg-muted/30 transition-colors group">
                <TableCell>
                  <div className="w-16 h-12 rounded-md overflow-hidden bg-muted relative">
                    <img 
                      src={vehicle.image} 
                      alt={vehicle.plate} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                  </div>
                </TableCell>
                <TableCell>
                  <div className="font-mono font-bold text-sm tracking-tight bg-muted/50 px-2 py-1 rounded inline-block border">
                    {vehicle.plate}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-0.5">
                    <p className="text-sm font-semibold">{vehicle.property}</p>
                    <p className="text-xs text-muted-foreground">{vehicle.zone}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                    {vehicle.duration}
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
                <TableCell className="text-sm text-muted-foreground">
                  {vehicle.lastSeen}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Eye className="w-4 h-4" />
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
