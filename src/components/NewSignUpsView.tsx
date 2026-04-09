import React from 'react';
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  Eye, 
  UserPlus, 
  Clock, 
  CheckCircle2, 
  ArrowRight,
  Building2,
  Calendar,
  DollarSign
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
import { mockSignUps } from '../lib/mock-data';
import { cn } from '../lib/utils';
import { SignUp } from '../types';

interface NewSignUpsViewProps {
  onStartSetup: (id: string) => void;
}

export function NewSignUpsView({ onStartSetup }: NewSignUpsViewProps) {
  const getStatusBadge = (status: SignUp['status']) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-none">Pending Review</Badge>;
      case 'in_progress':
        return <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-none">Setup in Progress</Badge>;
      case 'ready':
        return <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-none">Ready</Badge>;
      case 'live':
        return <Badge variant="outline" className="bg-primary/10 text-primary border-none">🚀 Live</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">New Property Sign-Ups</h1>
          <p className="text-muted-foreground">Review and configure newly submitted properties for enforcement.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            Filters
          </Button>
          <Button className="gap-2 bg-primary hover:bg-primary/90">
            <UserPlus className="w-4 h-4" />
            Assign Admin
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-card/50 border-none shadow-sm">
          <CardContent className="p-6">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Total Pending</p>
            <h3 className="text-2xl font-bold mt-1">12</h3>
          </CardContent>
        </Card>
        <Card className="bg-card/50 border-none shadow-sm">
          <CardContent className="p-6">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">In Setup</p>
            <h3 className="text-2xl font-bold mt-1">8</h3>
          </CardContent>
        </Card>
        <Card className="bg-card/50 border-none shadow-sm">
          <CardContent className="p-6">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Ready for Go-Live</p>
            <h3 className="text-2xl font-bold mt-1">5</h3>
          </CardContent>
        </Card>
        <Card className="bg-card/50 border-none shadow-sm">
          <CardContent className="p-6">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Activated This Week</p>
            <h3 className="text-2xl font-bold mt-1">14</h3>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search properties or addresses..." className="pl-9" />
        </div>
      </div>

      <div className="border rounded-xl bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>Property Details</TableHead>
              <TableHead>Service Type</TableHead>
              <TableHead>Installation Date</TableHead>
              <TableHead>Pricing</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockSignUps.map((signup) => (
              <TableRow key={signup.id} className="group hover:bg-muted/30 transition-colors">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-sm">{signup.propertyName}</span>
                      <span className="text-xs text-muted-foreground">{signup.address}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{signup.serviceType}</span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                    {new Date(signup.installationDate).toLocaleDateString()}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-sm font-medium">
                    <DollarSign className="w-3.5 h-3.5 text-muted-foreground" />
                    {signup.pricing || 'TBD'}
                  </div>
                </TableCell>
                <TableCell>
                  {getStatusBadge(signup.status)}
                </TableCell>
                <TableCell>
                  <div className="w-24 space-y-1.5">
                    <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider">
                      <span>{signup.progress || 0}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full transition-all" 
                        style={{ width: `${signup.progress || 0}%` }} 
                      />
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      className="gap-2 h-8"
                      onClick={() => onStartSetup(signup.id)}
                    >
                      {signup.status === 'pending' ? 'Review' : 'Configure'}
                      <ArrowRight className="w-3.5 h-3.5" />
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
