import React from 'react';
import { 
  UserCheck, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Car, 
  Building2, 
  AlertTriangle,
  Mail,
  ShieldAlert
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
import { mockParkers } from '../lib/mock-data';
import { cn } from '../lib/utils';
import { 
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "./ui/tooltip"

export function AuthorizedParkersView() {
  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Authorized Parkers</h1>
          <p className="text-muted-foreground">Manage permitted users and their registered vehicles.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search parkers..." className="pl-9" />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            Filters
          </Button>
          <Button className="gap-2">
            <UserCheck className="w-4 h-4" />
            Add Parker
          </Button>
        </div>
      </div>

      <div className="border rounded-xl bg-card overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead>Parker</TableHead>
              <TableHead>Vehicles</TableHead>
              <TableHead>Assigned Property</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Flags</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockParkers.map((parker) => (
              <TableRow key={parker.id} className="hover:bg-muted/30 transition-colors group">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                      {parker.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{parker.name}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        {parker.email}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 text-sm">
                    <Car className="w-4 h-4 text-muted-foreground" />
                    <span className={cn(
                      "font-medium",
                      parker.vehiclesCount > 3 && "text-amber-500 font-bold"
                    )}>
                      {parker.vehiclesCount}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 text-sm">
                    <Building2 className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">{parker.assignedProperty}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge 
                    variant="outline" 
                    className={cn(
                      "gap-1.5 font-medium border-none",
                      parker.status === 'active' ? "bg-emerald-500/10 text-emerald-500" : "bg-destructive/10 text-destructive"
                    )}
                  >
                    <span className={cn(
                      "w-1.5 h-1.5 rounded-full",
                      parker.status === 'active' ? "bg-emerald-500" : "bg-destructive"
                    )} />
                    {parker.status.charAt(0).toUpperCase() + parker.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    {parker.flags.map((flag, idx) => (
                      <span key={idx}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="p-1 bg-amber-500/10 rounded text-amber-500 cursor-help">
                              <AlertTriangle className="w-4 h-4" />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="text-xs">{flag}</p>
                          </TooltipContent>
                        </Tooltip>
                      </span>
                    ))}
                    {parker.status === 'restricted' && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="p-1 bg-destructive/10 rounded text-destructive cursor-help">
                            <ShieldAlert className="w-4 h-4" />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-xs">Account Restricted</p>
                        </TooltipContent>
                      </Tooltip>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
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
