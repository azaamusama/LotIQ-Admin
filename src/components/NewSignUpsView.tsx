import React from 'react';
import { 
  ClipboardList, 
  Calendar, 
  MapPin, 
  ArrowRight, 
  UserPlus,
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockSignUps } from '../lib/mock-data';
import { cn } from '../lib/utils';

interface NewSignUpsViewProps {
  onStartSetup: (signUpId: string) => void;
}

export function NewSignUpsView({ onStartSetup }: NewSignUpsViewProps) {
  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">New Sign-Ups</h1>
          <p className="text-muted-foreground">Review and configure new property registrations.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockSignUps.map((signUp) => (
          <Card key={signUp.id} className="border-none shadow-sm bg-card/50 hover:shadow-md transition-shadow group">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <ClipboardList className="w-5 h-5 text-primary" />
                </div>
                <Badge 
                  variant="outline" 
                  className={cn(
                    "font-bold border-none",
                    signUp.status === 'pending' && "bg-amber-500/10 text-amber-500",
                    signUp.status === 'in_progress' && "bg-blue-500/10 text-blue-500",
                    signUp.status === 'ready' && "bg-emerald-500/10 text-emerald-500"
                  )}
                >
                  {signUp.status === 'pending' && 'Pending Review'}
                  {signUp.status === 'in_progress' && 'Setup in Progress'}
                  {signUp.status === 'ready' && 'Ready for Go-Live'}
                </Badge>
              </div>
              <div className="mt-4">
                <CardTitle className="text-xl">{signUp.propertyName}</CardTitle>
                <CardDescription className="flex items-center gap-1 mt-1">
                  <MapPin className="w-3 h-3" />
                  {signUp.address}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Service Type</span>
                  <span className="font-semibold">{signUp.serviceType}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Installation</span>
                  <span className="font-semibold flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(signUp.installationDate).toLocaleDateString()}
                  </span>
                </div>
                {signUp.assignedReviewer && (
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Assigned To</span>
                    <span className="font-semibold flex items-center gap-1">
                      <UserPlus className="w-3 h-3" />
                      {signUp.assignedReviewer}
                    </span>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t flex gap-2">
                <Button variant="outline" className="flex-1 text-xs h-9">
                  Order Summary
                </Button>
                <Button 
                  className="flex-1 text-xs h-9 gap-2"
                  onClick={() => onStartSetup(signUp.id)}
                >
                  {signUp.status === 'pending' ? 'Review Property' : 'Continue Setup'}
                  <ArrowRight className="w-3 h-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
