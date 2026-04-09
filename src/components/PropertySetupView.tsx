import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  ChevronRight, 
  CheckCircle2, 
  Circle, 
  Camera as CameraIcon, 
  Layout, 
  ShieldCheck, 
  Users, 
  Settings2, 
  ArrowLeft, 
  ArrowRight, 
  Plus, 
  Trash2, 
  Maximize2, 
  Eye, 
  AlertTriangle, 
  Cpu, 
  Truck, 
  Info,
  Search,
  MoreHorizontal
} from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { cn } from '../lib/utils';
import { mockSignUps, mockCameras, mockZones, mockRules } from '../lib/mock-data';
import { SignUp, Camera, ParkingZone, PropertyRule } from '../types';

interface PropertySetupViewProps {
  signUpId: string;
  onComplete: () => void;
}

const steps = [
  { id: 'overview', label: 'Property Overview', icon: Building2 },
  { id: 'mapping', label: 'Parking Lot Mapping', icon: MapPin },
  { id: 'spots', label: 'Spot Definition', icon: Layout },
  { id: 'cameras', label: 'Camera Validation', icon: CameraIcon },
  { id: 'parkers', label: 'Authorized Parkers', icon: Users },
  { id: 'rules', label: 'Rule Configuration', icon: Settings2 },
  { id: 'review', label: 'Final Review', icon: ShieldCheck },
];

export function PropertySetupView({ signUpId, onComplete }: PropertySetupViewProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const signup = mockSignUps.find(s => s.id === signUpId) || mockSignUps[0];

  const handleNext = () => {
    const stepId = steps[currentStep].id;
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId]);
    }
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (steps[currentStep].id) {
      case 'overview':
        return <StepOverview signup={signup} />;
      case 'mapping':
        return <StepMapping />;
      case 'spots':
        return <StepSpots />;
      case 'cameras':
        return <StepCameras />;
      case 'parkers':
        return <StepParkers />;
      case 'rules':
        return <StepRules />;
      case 'review':
        return <StepReview signup={signup} onComplete={onComplete} />;
      default:
        return null;
    }
  };

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col bg-background overflow-hidden">
      {/* Top Header */}
      <div className="h-20 border-b bg-card px-8 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onComplete}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold tracking-tight">{signup.propertyName}</h2>
              <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-none capitalize">
                {signup.status.replace('_', ' ')}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {signup.address}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-8">
          <div className="flex flex-col items-end gap-1.5">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              <span>Setup Progress</span>
              <span className="text-primary">{Math.round((completedSteps.length / steps.length) * 100)}%</span>
            </div>
            <div className="w-48 h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary rounded-full transition-all duration-500" 
                style={{ width: `${(completedSteps.length / steps.length) * 100}%` }} 
              />
            </div>
          </div>
          <Button onClick={handleNext} className="gap-2 bg-primary hover:bg-primary/90 min-w-[120px]">
            {currentStep === steps.length - 1 ? 'Go Live' : 'Next Step'}
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar Navigation */}
        <div className="w-72 border-r bg-card/50 flex flex-col shrink-0">
          <div className="p-6 space-y-1">
            {steps.map((step, index) => {
              const isCompleted = completedSteps.includes(step.id);
              const isActive = currentStep === index;
              
              return (
                <button
                  key={step.id}
                  onClick={() => setCurrentStep(index)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all group",
                    isActive 
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  <div className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center shrink-0 border-2 transition-colors",
                    isActive ? "border-primary-foreground/40 bg-primary-foreground/10" : 
                    isCompleted ? "border-emerald-500 bg-emerald-500/10 text-emerald-500" : "border-muted-foreground/20"
                  )}>
                    {isCompleted ? <CheckCircle2 className="w-3.5 h-3.5" /> : <span className="text-[10px]">{index + 1}</span>}
                  </div>
                  <span className="flex-1 text-left">{step.label}</span>
                  {isActive && <ChevronRight className="w-4 h-4 opacity-50" />}
                </button>
              );
            })}
          </div>
          
          <div className="mt-auto p-6 border-t bg-muted/20">
            <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 space-y-2">
              <p className="text-[10px] font-bold text-primary uppercase tracking-widest">Setup Tip</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Mapping the parking lot correctly is the most critical step for AI accuracy.
              </p>
            </div>
          </div>
        </div>

        {/* Right Content Area */}
        <div className="flex-1 overflow-y-auto bg-muted/10">
          <div className="max-w-5xl mx-auto p-10">
            <div className="mb-8">
              <h3 className="text-2xl font-bold tracking-tight">{steps[currentStep].label}</h3>
              <p className="text-muted-foreground mt-1">Configure the necessary details to prepare this property for enforcement.</p>
            </div>
            {renderStepContent()}
            
            <div className="mt-12 pt-8 border-t flex items-center justify-between">
              <Button variant="outline" onClick={handleBack} disabled={currentStep === 0} className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Previous Step
              </Button>
              <Button onClick={handleNext} className="gap-2 min-w-[140px]">
                {currentStep === steps.length - 1 ? 'Finalize & Go Live' : 'Save & Continue'}
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StepOverview({ signup }: { signup: SignUp }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <Card className="border-none shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Property Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label className="text-[10px] uppercase text-muted-foreground">Property Name</Label>
              <p className="text-sm font-medium">{signup.propertyName}</p>
            </div>
            <div className="space-y-1">
              <Label className="text-[10px] uppercase text-muted-foreground">Service Type</Label>
              <p className="text-sm font-medium">{signup.serviceType}</p>
            </div>
          </div>
          <div className="space-y-1">
            <Label className="text-[10px] uppercase text-muted-foreground">Address</Label>
            <p className="text-sm font-medium">{signup.address}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label className="text-[10px] uppercase text-muted-foreground">Pricing Tier</Label>
              <p className="text-sm font-medium">{signup.pricing || '$499/mo'}</p>
            </div>
            <div className="space-y-1">
              <Label className="text-[10px] uppercase text-muted-foreground">Assigned Admin</Label>
              <p className="text-sm font-medium">{signup.assignedAdmin || 'Unassigned'}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-none shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Installation Schedule</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/30 border">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex flex-col items-center justify-center text-primary">
              <span className="text-[10px] font-bold uppercase">Apr</span>
              <span className="text-lg font-bold leading-none">10</span>
            </div>
            <div>
              <p className="text-sm font-bold">Camera Installation</p>
              <p className="text-xs text-muted-foreground">Scheduled for 09:00 AM - 12:00 PM</p>
            </div>
            <Badge className="ml-auto bg-emerald-500/10 text-emerald-500 border-none">Confirmed</Badge>
          </div>
          
          <div className="space-y-3">
            <Label className="text-[10px] uppercase text-muted-foreground">Installed Devices</Label>
            <div className="space-y-2">
              {mockCameras.map(cam => (
                <div key={cam.id} className="flex items-center justify-between p-3 rounded-lg border bg-card text-sm">
                  <div className="flex items-center gap-3">
                    <CameraIcon className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">{cam.name}</span>
                  </div>
                  <Badge variant="outline" className="text-[10px]">{cam.status}</Badge>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function StepMapping() {
  return (
    <div className="space-y-6">
      <Card className="border-none shadow-sm overflow-hidden">
        <div className="h-[500px] bg-zinc-900 relative group">
          {/* Mock Satellite View */}
          <div className="absolute inset-0 opacity-40">
            <img 
              src="https://picsum.photos/seed/parking-lot/1200/800" 
              className="w-full h-full object-cover grayscale" 
              referrerPolicy="no-referrer"
            />
          </div>
          
          {/* Map Grid Overlay */}
          <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 pointer-events-none opacity-20">
            {Array.from({ length: 144 }).map((_, i) => (
              <div key={i} className="border-[0.5px] border-white/20" />
            ))}
          </div>

          {/* Mock Zones */}
          {mockZones.map(zone => (
            <div 
              key={zone.id}
              className="absolute border-2 transition-all cursor-pointer hover:ring-4"
              style={{
                left: `${zone.coordinates?.[0].x}%`,
                top: `${zone.coordinates?.[0].y}%`,
                width: `${(zone.coordinates?.[1].x || 0) - (zone.coordinates?.[0].x || 0)}%`,
                height: `${(zone.coordinates?.[2].y || 0) - (zone.coordinates?.[1].y || 0)}%`,
                backgroundColor: `${zone.color}20`,
                borderColor: zone.color
              }}
            >
              <div className="absolute -top-6 left-0 flex items-center gap-1.5 px-2 py-0.5 rounded bg-black/80 text-[10px] font-bold text-white backdrop-blur-sm">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: zone.color }} />
                {zone.name}
              </div>
            </div>
          ))}

          {/* Camera FOV Overlays */}
          <div className="absolute top-[15%] left-[5%] w-32 h-32 border-2 border-primary/40 rounded-full border-t-transparent border-r-transparent -rotate-45 bg-primary/5 flex items-center justify-center">
            <CameraIcon className="w-4 h-4 text-primary absolute -bottom-2 -right-2 bg-black rounded-full p-1 border border-primary" />
          </div>

          {/* Map Toolbar */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            <div className="flex flex-col bg-black/80 backdrop-blur-md rounded-lg border border-white/10 p-1 shadow-2xl">
              <Button variant="ghost" size="icon" className="h-9 w-9 text-white hover:bg-white/10"><Plus className="w-4 h-4" /></Button>
              <Button variant="ghost" size="icon" className="h-9 w-9 text-white hover:bg-white/10"><Trash2 className="w-4 h-4" /></Button>
              <Separator className="my-1 bg-white/10" />
              <Button variant="ghost" size="icon" className="h-9 w-9 text-white hover:bg-white/10"><Maximize2 className="w-4 h-4" /></Button>
            </div>
          </div>

          {/* Zone Selection Tool */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/80 backdrop-blur-md rounded-full border border-white/10 p-2 shadow-2xl">
            <Button variant="ghost" size="sm" className="rounded-full text-white hover:bg-white/10 gap-2 px-4">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              Visitor
            </Button>
            <Button variant="ghost" size="sm" className="rounded-full text-white hover:bg-white/10 gap-2 px-4">
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
              Resident
            </Button>
            <Button variant="ghost" size="sm" className="rounded-full text-white hover:bg-white/10 gap-2 px-4">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              No Parking
            </Button>
            <Separator orientation="vertical" className="h-6 bg-white/10 mx-2" />
            <Button size="sm" className="rounded-full bg-primary hover:bg-primary/90 gap-2 px-6">
              Draw New Zone
            </Button>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-3 gap-6">
        {mockZones.map(zone => (
          <Card key={zone.id} className="border-none shadow-sm">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: zone.color }} />
                <div className="flex flex-col">
                  <span className="text-sm font-bold">{zone.name}</span>
                  <span className="text-[10px] text-muted-foreground uppercase">{zone.type}</span>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8"><Settings2 className="w-4 h-4" /></Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function StepSpots() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span className="text-xs font-medium">General</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
            <span className="text-xs font-medium">EV Charging</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-500" />
            <span className="text-xs font-medium">Handicap</span>
          </div>
        </div>
        <Button size="sm" variant="outline" className="gap-2">
          <Cpu className="w-4 h-4" />
          AI Suggest Spots
        </Button>
      </div>

      <div className="grid grid-cols-10 gap-2 p-6 bg-card rounded-xl border shadow-sm">
        {Array.from({ length: 40 }).map((_, i) => (
          <div 
            key={i} 
            className={cn(
              "aspect-square rounded border-2 flex items-center justify-center text-[10px] font-bold cursor-pointer transition-all hover:scale-110",
              i < 10 ? "border-primary bg-primary/5 text-primary" : 
              i < 15 ? "border-emerald-500 bg-emerald-500/5 text-emerald-500" :
              i < 20 ? "border-amber-500 bg-amber-500/5 text-amber-500" : "border-muted bg-muted/20 text-muted-foreground"
            )}
          >
            {i + 101}
          </div>
        ))}
      </div>

      <Card className="border-none shadow-sm bg-primary/5 border-primary/20">
        <CardContent className="p-4 flex gap-3">
          <Info className="w-5 h-5 text-primary shrink-0" />
          <p className="text-xs leading-relaxed">
            <span className="font-bold">Precision Layer:</span> Defining individual spots allows for more granular enforcement and occupancy tracking. AI can automatically suggest spot boundaries from camera feeds.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

function StepCameras() {
  return (
    <div className="grid grid-cols-2 gap-6">
      {mockCameras.map(cam => (
        <Card key={cam.id} className="border-none shadow-sm overflow-hidden">
          <div className="aspect-video bg-black relative group">
            <video 
              src={cam.feedUrl} 
              className="w-full h-full object-cover opacity-80" 
              autoPlay 
              muted 
              loop 
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
            <div className="absolute top-4 left-4 flex items-center gap-2 px-2 py-1 rounded bg-black/60 text-[10px] font-bold text-white backdrop-blur-sm">
              <div className={cn("w-2 h-2 rounded-full", cam.status === 'valid' ? "bg-emerald-500" : "bg-amber-500")} />
              {cam.name}
            </div>
            <div className="absolute bottom-4 right-4">
              <Button size="icon" variant="ghost" className="h-8 w-8 text-white bg-black/40 hover:bg-black/60"><Maximize2 className="w-4 h-4" /></Button>
            </div>
          </div>
          <CardContent className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-muted-foreground uppercase">Coverage Area</p>
                <p className="text-sm font-medium">{cam.coverage}</p>
              </div>
              <div className="text-right space-y-1">
                <p className="text-[10px] font-bold text-muted-foreground uppercase">Last Validated</p>
                <p className="text-xs">{cam.lastValidated ? new Date(cam.lastValidated).toLocaleTimeString() : 'Never'}</p>
              </div>
            </div>
            <Separator />
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="flex-1 gap-2 text-amber-600 hover:text-amber-700 hover:bg-amber-50">
                <AlertTriangle className="w-3.5 h-3.5" />
                Needs Adjustment
              </Button>
              <Button size="sm" className="flex-1 gap-2 bg-emerald-600 hover:bg-emerald-700">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Mark Valid
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function StepParkers() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search parkers..." className="pl-9" />
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Add Authorized Parker
        </Button>
      </div>

      <div className="border rounded-xl bg-card overflow-hidden">
        <div className="p-4 border-b bg-muted/30 flex items-center justify-between">
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Authorized Users</span>
          <span className="text-xs font-medium">128 Total</span>
        </div>
        <div className="divide-y">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="p-4 flex items-center justify-between hover:bg-muted/10 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  JD
                </div>
                <div>
                  <p className="text-sm font-bold">John Doe {i}</p>
                  <p className="text-xs text-muted-foreground">john.doe{i}@example.com</p>
                </div>
              </div>
              <div className="flex items-center gap-8">
                <div className="text-right">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase">Vehicles</p>
                  <p className="text-xs font-medium">ABC-123{i}, XYZ-987{i}</p>
                </div>
                <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-none">Active</Badge>
                <Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="w-4 h-4" /></Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StepRules() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {mockRules.map(rule => (
        <Card key={rule.id} className="border-none shadow-sm">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Settings2 className="w-4 h-4 text-primary" />
                </div>
                <CardTitle className="text-base">{rule.name}</CardTitle>
              </div>
              <Checkbox checked={rule.enabled} />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-xs text-muted-foreground">{rule.description}</p>
            <div className="space-y-2">
              <Label className="text-[10px] uppercase text-muted-foreground">Configuration</Label>
              <div className="flex items-center gap-3">
                <Input defaultValue={rule.value} className="h-9" />
                <span className="text-xs text-muted-foreground min-w-[60px]">
                  {rule.type === 'time_limit' || rule.type === 'grace_period' ? 'Minutes' : ''}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      
      <Card className="border-2 border-dashed border-muted bg-transparent shadow-none flex flex-col items-center justify-center p-8 text-center space-y-4">
        <div className="p-3 bg-muted rounded-full">
          <Plus className="w-6 h-6 text-muted-foreground" />
        </div>
        <div>
          <p className="text-sm font-bold">Add Custom Rule</p>
          <p className="text-xs text-muted-foreground">Define property-specific enforcement logic.</p>
        </div>
        <Button variant="outline" size="sm">Create Rule</Button>
      </Card>
    </div>
  );
}

function StepReview({ signup, onComplete }: { signup: SignUp, onComplete: () => void }) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              Readiness Checklist
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: 'Cameras Validated', status: 'complete' },
              { label: 'Parking Zones Mapped', status: 'complete' },
              { label: 'Spots Defined', status: 'complete' },
              { label: 'Authorized Parkers Added', status: 'complete' },
              { label: 'Rules Configured', status: 'complete' },
              { label: 'Tow Policy Signed', status: 'complete' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border/50">
                <span className="text-sm font-medium">{item.label}</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-zinc-900 text-white">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Cpu className="w-5 h-5 text-primary" />
              Visual Parking Intelligence
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="aspect-video rounded-xl bg-black/40 border border-white/10 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-20">
                <img src="https://picsum.photos/seed/digital-twin/600/400" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="relative z-10 flex flex-col items-center gap-3 text-center p-6">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary animate-pulse">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-bold">Digital Twin Active</p>
                  <p className="text-[10px] text-white/60">Simulating vehicle detection zones...</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-white/60">AI Coverage</span>
                <span className="font-bold text-emerald-400">98.4%</span>
              </div>
              <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 w-[98.4%]" />
              </div>
              <p className="text-[10px] text-white/40 leading-relaxed italic">
                Property model verified. All zones are within camera field-of-view and enforcement rules are logically consistent.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="p-8 rounded-2xl bg-primary/5 border-2 border-primary/20 flex flex-col items-center text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          <Truck className="w-8 h-8" />
        </div>
        <div className="max-w-md space-y-2">
          <h3 className="text-xl font-bold">Ready for Go-Live</h3>
          <p className="text-sm text-muted-foreground">
            All configurations are complete. Activating this property will start real-time monitoring and automated enforcement.
          </p>
        </div>
        <Button size="lg" className="bg-primary hover:bg-primary/90 px-12 h-14 text-lg font-bold shadow-2xl shadow-primary/20" onClick={onComplete}>
          🚀 Activate Property (Go Live)
        </Button>
      </div>
    </div>
  );
}
