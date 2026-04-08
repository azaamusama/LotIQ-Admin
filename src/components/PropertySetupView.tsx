import React, { useState } from 'react';
import { 
  Check, 
  ChevronRight, 
  ChevronLeft, 
  Map as MapIcon, 
  Camera as CameraIcon, 
  Shield, 
  Users, 
  Settings2, 
  Rocket,
  Info,
  Plus,
  Trash2,
  Video,
  Eye,
  MousePointer2,
  Layers
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

const steps = [
  { id: 1, title: 'Overview', icon: Info },
  { id: 2, title: 'Mapping', icon: MapIcon },
  { id: 3, title: 'Positions', icon: MousePointer2 },
  { id: 4, title: 'Cameras', icon: CameraIcon },
  { id: 5, title: 'Parkers', icon: Users },
  { id: 6, title: 'Rules', icon: Settings2 },
  { id: 7, title: 'Go Live', icon: Rocket },
];

export function PropertySetupView({ signUpId, onComplete }: { signUpId: string, onComplete: () => void }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [zones, setZones] = useState([
    { id: 'z1', name: 'Resident P1', type: 'resident' },
    { id: 'z2', name: 'Visitor V1', type: 'visitor' },
  ]);

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, steps.length));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Property Details</h3>
                <div className="grid gap-4">
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">Property Name</Label>
                    <Input defaultValue="Oakwood Heights" readOnly className="bg-muted/30" />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">Address</Label>
                    <Input defaultValue="742 Evergreen Terrace" readOnly className="bg-muted/30" />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">Service Level</Label>
                    <Input defaultValue="Full Lot Enforcement" readOnly className="bg-muted/30" />
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Installation Summary</h3>
                <div className="p-4 rounded-lg bg-muted/30 border space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Cameras Installed</span>
                    <span className="font-bold">4</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Installation Date</span>
                    <span className="font-bold">Apr 10, 2026</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Technician</span>
                    <span className="font-bold">Mike Ross</span>
                  </div>
                </div>
                <div className="h-48 rounded-lg bg-muted overflow-hidden relative">
                  <img 
                    src="https://picsum.photos/seed/map1/600/400" 
                    className="w-full h-full object-cover grayscale opacity-50"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Badge variant="secondary" className="gap-2">
                      <MapIcon className="w-3 h-3" />
                      Map Preview
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="h-[500px] flex gap-4">
            <div className="flex-1 bg-muted rounded-xl relative overflow-hidden border-2 border-dashed border-muted-foreground/20">
              <img 
                src="https://picsum.photos/seed/lot-map/1200/800" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              {/* Mock Zones Overlay */}
              <div className="absolute top-1/4 left-1/4 w-32 h-48 bg-primary/20 border-2 border-primary rounded flex items-center justify-center">
                <span className="text-[10px] font-bold text-primary bg-white px-1 rounded">Resident P1</span>
              </div>
              <div className="absolute top-1/3 right-1/4 w-40 h-32 bg-amber-500/20 border-2 border-amber-500 rounded flex items-center justify-center">
                <span className="text-[10px] font-bold text-amber-500 bg-white px-1 rounded">Visitor V1</span>
              </div>
              
              <div className="absolute bottom-4 left-4 flex gap-2">
                <Button size="sm" className="gap-2">
                  <Plus className="w-4 h-4" />
                  Draw Zone
                </Button>
                <Button size="sm" variant="secondary" className="gap-2">
                  <Layers className="w-4 h-4" />
                  Auto-Detect
                </Button>
              </div>
            </div>
            <div className="w-64 space-y-4 overflow-y-auto pr-2">
              <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Active Zones</h3>
              {zones.map(zone => (
                <div key={zone.id} className="p-3 rounded-lg border bg-card/50 space-y-2 group">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold">{zone.name}</span>
                    <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100">
                      <Trash2 className="w-3 h-3 text-destructive" />
                    </Button>
                  </div>
                  <Badge variant="outline" className="text-[10px] uppercase">{zone.type}</Badge>
                </div>
              ))}
            </div>
          </div>
        );
      case 4:
        return (
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map(cam => (
              <Card key={cam} className="overflow-hidden border-none bg-muted/30">
                <div className="aspect-video relative group">
                  <img 
                    src={`https://picsum.photos/seed/cam-val-${cam}/640/360`} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Button size="sm" variant="secondary" className="gap-2">
                      <Eye className="w-4 h-4" />
                      Full View
                    </Button>
                  </div>
                  <div className="absolute top-2 left-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded font-mono">
                    CAM 0{cam} - ENTRY GATE
                  </div>
                </div>
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-xs font-bold">Coverage: 94%</p>
                    <p className="text-[10px] text-muted-foreground">Plate visibility: High</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="h-8 text-[10px]">Needs Adj.</Button>
                    <Button size="sm" className="h-8 text-[10px] bg-emerald-500 hover:bg-emerald-600">Validate</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        );
      case 7:
        return (
          <div className="flex flex-col items-center justify-center py-12 space-y-8">
            <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center">
              <Rocket className="w-10 h-10 text-emerald-500" />
            </div>
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">Ready for Go-Live</h2>
              <p className="text-muted-foreground max-w-md">
                All configuration steps have been completed and validated. 
                Activating will start real-time enforcement and AI monitoring.
              </p>
            </div>
            <div className="w-full max-w-md p-6 rounded-xl border bg-card space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Final Checklist</h3>
              <div className="space-y-3">
                {[
                  'Cameras validated (4/4)',
                  'Parking zones defined (2)',
                  'Rules configured',
                  'Authorized parkers imported'
                ].map(item => (
                  <div key={item} className="flex items-center gap-3 text-sm">
                    <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="flex flex-col items-center justify-center h-[400px] text-muted-foreground italic">
            Configuration module for {steps[currentStep - 1].title} is ready for data entry.
          </div>
        );
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onComplete}>
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Property Setup</h1>
            <p className="text-muted-foreground">Configuring <span className="text-foreground font-semibold">Oakwood Heights</span></p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-none">
            Setup in Progress
          </Badge>
          <span className="text-xs text-muted-foreground font-medium">Step {currentStep} of {steps.length}</span>
        </div>
      </div>

      {/* Stepper */}
      <div className="flex items-center justify-between px-4">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = currentStep === step.id;
          const isCompleted = currentStep > step.id;
          
          return (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center gap-2 relative">
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300",
                  isActive ? "bg-primary text-primary-foreground ring-4 ring-primary/20" : 
                  isCompleted ? "bg-emerald-500 text-white" : "bg-muted text-muted-foreground"
                )}>
                  {isCompleted ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                </div>
                <span className={cn(
                  "text-[10px] font-bold uppercase tracking-widest",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}>
                  {step.title}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className={cn(
                  "flex-1 h-0.5 mx-4 transition-colors duration-500",
                  currentStep > step.id ? "bg-emerald-500" : "bg-muted"
                )} />
              )}
            </React.Fragment>
          );
        })}
      </div>

      <Card className="border-none shadow-sm bg-card/50 min-h-[600px] flex flex-col">
        <CardHeader className="border-b bg-muted/10">
          <CardTitle className="text-xl flex items-center gap-2">
            {React.createElement(steps[currentStep - 1].icon, { className: "w-5 h-5 text-primary" })}
            {steps[currentStep - 1].title}
          </CardTitle>
          <CardDescription>
            {currentStep === 1 && "Verify property and installation details before starting."}
            {currentStep === 2 && "Define the physical boundaries of enforcement zones."}
            {currentStep === 4 && "Ensure all cameras provide clear evidence for enforcement."}
            {currentStep === 7 && "Final review before activating live enforcement."}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8 flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {renderStepContent()}
            </motion.div>
          </AnimatePresence>
        </CardContent>
        <div className="p-6 border-t bg-muted/10 flex items-center justify-between">
          <Button 
            variant="ghost" 
            onClick={prevStep} 
            disabled={currentStep === 1}
            className="gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </Button>
          <Button 
            onClick={currentStep === steps.length ? onComplete : nextStep}
            className={cn(
              "gap-2 px-8",
              currentStep === steps.length && "bg-emerald-500 hover:bg-emerald-600"
            )}
          >
            {currentStep === steps.length ? (
              <>
                <Rocket className="w-4 h-4" />
                Go Live
              </>
            ) : (
              <>
                Next
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </Button>
        </div>
      </Card>
    </div>
  );
}
