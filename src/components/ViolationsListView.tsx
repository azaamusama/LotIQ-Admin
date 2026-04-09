import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  Eye, 
  Clock, 
  ShieldAlert,
  CheckCircle2,
  XCircle,
  MapPin,
  Cpu,
  ArrowRight
} from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from './ui/table';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent } from './ui/card';
import { mockViolations } from '../lib/mock-data';
import { cn } from '../lib/utils';
import { Violation, ViolationStatus } from '../types';

interface ViolationsListViewProps {
  statusFilter: ViolationStatus | 'all';
  title: string;
  onReview: (violation: Violation) => void;
}

export function ViolationsListView({ statusFilter, title, onReview }: ViolationsListViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredViolations = mockViolations.filter(v => {
    const matchesStatus = statusFilter === 'all' ? true : v.status === statusFilter;
    const matchesSearch = v.plate.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         v.property.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status: ViolationStatus) => {
    switch (status) {
      case 'detected':
        return <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-none">Detected</Badge>;
      case 'in_review':
        return <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-none">In Review</Badge>;
      case 'approved':
        return <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-none">Approved</Badge>;
      case 'dispatched':
        return <Badge variant="outline" className="bg-purple-500/10 text-purple-500 border-none">Dispatched</Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-zinc-500/10 text-zinc-500 border-none">Completed</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="bg-destructive/10 text-destructive border-none">Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          <p className="text-muted-foreground">Manage and review parking violations detected by AI.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            Filters
          </Button>
          <Button className="gap-2">
            Bulk Review
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search plates or properties..." 
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="border rounded-xl bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-[100px]">Evidence</TableHead>
              <TableHead>Vehicle & Plate</TableHead>
              <TableHead>Property / Zone</TableHead>
              <TableHead>Violation Type</TableHead>
              <TableHead>Confidence</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredViolations.map((violation) => (
              <TableRow 
                key={violation.id} 
                className={cn(
                  "group cursor-pointer hover:bg-muted/30 transition-colors",
                  violation.confidence > 0.9 && "bg-emerald-500/[0.02]",
                  violation.confidence < 0.8 && "bg-amber-500/[0.02]"
                )}
                onClick={() => onReview(violation)}
              >
                <TableCell>
                  <div className="relative w-16 h-10 rounded overflow-hidden border">
                    <img 
                      src={violation.vehicleImage} 
                      alt={violation.plate}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors flex items-center justify-center">
                      <Eye className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-mono font-bold text-sm">{violation.plate}</span>
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Vehicle ID: {violation.vehicleId}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium text-sm">{violation.property}</span>
                    <span className="text-xs text-muted-foreground">{violation.zone}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <ShieldAlert className="w-3.5 h-3.5 text-destructive" />
                    <span className="text-sm">{violation.rule}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-1.5 bg-muted rounded-full overflow-hidden">
                      <div 
                        className={cn(
                          "h-full rounded-full",
                          violation.confidence > 0.9 ? "bg-emerald-500" : 
                          violation.confidence > 0.8 ? "bg-amber-500" : "bg-destructive"
                        )}
                        style={{ width: `${violation.confidence * 100}%` }}
                      />
                    </div>
                    <span className="text-xs font-mono font-bold">{(violation.confidence * 100).toFixed(0)}%</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">10:30 AM</span>
                    <span className="text-[10px] text-muted-foreground">2 mins ago</span>
                  </div>
                </TableCell>
                <TableCell>
                  {getStatusBadge(violation.status)}
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" className="gap-2">
                    Review
                    <ArrowRight className="w-3 h-3" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {filteredViolations.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="h-32 text-center text-muted-foreground">
                  No violations found matching your criteria.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
