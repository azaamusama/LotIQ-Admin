import React from 'react';
import { 
  Truck, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Phone, 
  Building2, 
  CheckCircle2,
  Clock,
  TrendingUp,
  TrendingDown
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
import { mockTowOperators } from '../lib/mock-data';
import { cn } from '../lib/utils';
import { Progress } from './ui/progress';

export function TowingOperatorsView() {
  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Towing Operators</h1>
          <p className="text-muted-foreground">Manage towing companies and monitor their performance.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search companies..." className="pl-9" />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            Filters
          </Button>
          <Button className="gap-2">
            <Truck className="w-4 h-4" />
            Add Operator
          </Button>
        </div>
      </div>

      <div className="border rounded-xl bg-card overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead>Company</TableHead>
              <TableHead>Assigned Properties</TableHead>
              <TableHead>Performance</TableHead>
              <TableHead>Avg Response</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockTowOperators.map((operator) => (
              <TableRow key={operator.id} className="hover:bg-muted/30 transition-colors group">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                      <Truck className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{operator.name}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        {operator.phone}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 text-sm">
                    <Building2 className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">{operator.propertiesAssigned} properties</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="w-40 space-y-1.5">
                    <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider">
                      <span>Acceptance Rate</span>
                      <span className={cn(
                        operator.acceptanceRate > 0.9 ? "text-emerald-500" : "text-amber-500"
                      )}>
                        {(operator.acceptanceRate * 100).toFixed(0)}%
                      </span>
                    </div>
                    <Progress value={operator.acceptanceRate * 100} className="h-1" />
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">{operator.avgResponseTime}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge 
                    variant="outline" 
                    className={cn(
                      "gap-1.5 font-medium border-none",
                      operator.status === 'active' ? "bg-emerald-500/10 text-emerald-500" : "bg-muted text-muted-foreground"
                    )}
                  >
                    <span className={cn(
                      "w-1.5 h-1.5 rounded-full",
                      operator.status === 'active' ? "bg-emerald-500" : "bg-muted-foreground"
                    )} />
                    {operator.status.charAt(0).toUpperCase() + operator.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <TrendingUp className="w-4 h-4" />
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
