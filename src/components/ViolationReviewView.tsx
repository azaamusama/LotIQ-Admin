import React, { useState } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Maximize2, 
  CheckCircle2, 
  XCircle, 
  UserCircle, 
  Info,
  ShieldAlert,
  Clock,
  MapPin,
  Cpu,
  MessageSquare,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  Truck,
  History,
  AlertTriangle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { Violation, ViolationStatus } from '../types';
import { useAuth } from '../lib/auth-context';

interface ViolationReviewViewProps {
  violation: Violation;
  onBack: () => void;
}

export function ViolationReviewView({ violation, onBack }: ViolationReviewViewProps) {
  const { user } = useAuth();
  const [isPlaying, setIsPlaying] = useState(false);
  const [showEvidence, setShowEvidence] = useState(true);
  const [activeCamera, setActiveCamera] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showDispatch, setShowDispatch] = useState(false);
  const [decision, setDecision] = useState<ViolationStatus | null>(violation.status);

  const isSuperAdmin = user?.role === 'super_admin';

  const handleApprove = () => {
    setDecision('approved');
    setShowDispatch(true);
  };

  const handleReject = () => {
    setDecision('rejected');
  };

  const handleMarkAuthorized = () => {
    setDecision('completed');
  };

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col overflow-hidden bg-background">
      {/* Top Header / Breadcrumbs */}
      <div className="h-12 border-b flex items-center px-4 gap-4 bg-card">
        <Button variant="ghost" size="sm" onClick={onBack} className="gap-2">
          <ChevronLeft className="w-4 h-4" />
          Back to Queue
        </Button>
        <Separator orientation="vertical" className="h-4" />
        <div className="flex items-center gap-2 text-sm font-medium">
          <span className="text-muted-foreground">Violations</span>
          <ChevronRight className="w-3 h-3 text-muted-foreground" />
          <span>{violation.plate}</span>
        </div>
        <div className="ml-auto flex items-center gap-2">
          {isSuperAdmin && (
            <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20 gap-1">
              <ShieldAlert className="w-3 h-3" />
              Super Admin Mode
            </Badge>
          )}
          <Badge variant="outline" className={cn(
            "capitalize",
            violation.status === 'detected' && "bg-blue-500/10 text-blue-500 border-none",
            violation.status === 'approved' && "bg-emerald-500/10 text-emerald-500 border-none",
            violation.status === 'rejected' && "bg-destructive/10 text-destructive border-none"
          )}>
            {violation.status.replace('_', ' ')}
          </Badge>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* LEFT: Video Evidence Panel (60%) */}
        <div className="flex-[0.6] bg-black relative flex flex-col border-r">
          <div className="flex-1 relative group overflow-hidden">
            <video 
              src={violation.videoUrl} 
              className="w-full h-full object-contain"
              loop
              muted
              autoPlay={isPlaying}
            />
            
            {/* Smart Evidence Overlay */}
            <AnimatePresence>
              {showEvidence && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                >
                  <div className="border-2 border-primary w-64 h-40 rounded-lg relative ring-4 ring-primary/20">
                    <div className="absolute -top-8 left-0 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1 shadow-lg">
                      <Cpu className="w-3 h-3" />
                      AI TRACKING: {violation.plate}
                    </div>
                    <div className="absolute -bottom-8 right-0 bg-black/80 text-white text-[10px] font-medium px-2 py-1 rounded backdrop-blur-sm">
                      Confidence: {(violation.confidence * 100).toFixed(1)}%
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Video Controls Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="flex flex-col gap-4">
                {/* Timeline Scrubber */}
                <div className="relative h-1.5 bg-white/20 rounded-full cursor-pointer group/timeline">
                  <div className="absolute top-0 left-0 h-full bg-primary w-1/3 rounded-full" />
                  {/* Event Markers */}
                  <div className="absolute top-1/2 -translate-y-1/2 left-[10%] w-2 h-2 bg-blue-400 rounded-full ring-2 ring-black" title="Vehicle Entered" />
                  <div className="absolute top-1/2 -translate-y-1/2 left-[45%] w-3 h-3 bg-destructive rounded-full ring-2 ring-black shadow-[0_0_10px_rgba(239,68,68,0.5)]" title="Violation Triggered" />
                  <div className="absolute top-1/2 -translate-y-1/2 left-1/3 w-3 h-3 bg-white rounded-full shadow-lg scale-0 group-hover/timeline:scale-100 transition-transform" />
                </div>

                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-4">
                      <button onClick={() => setIsPlaying(!isPlaying)} className="hover:text-primary transition-colors">
                        {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current" />}
                      </button>
                      <button className="hover:text-primary transition-colors">
                        <RotateCcw className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono bg-black/40 px-2 py-1 rounded">01:24 / 04:00</span>
                      <select 
                        className="bg-black/40 text-[10px] border-none rounded px-1 py-0.5 focus:ring-0 cursor-pointer"
                        value={playbackSpeed}
                        onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
                      >
                        <option value={0.5}>0.5x</option>
                        <option value={1}>1.0x</option>
                        <option value={1.5}>1.5x</option>
                        <option value={2}>2.0x</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className={cn(
                        "text-[10px] gap-2 h-7 px-2 uppercase font-bold tracking-wider transition-all",
                        showEvidence ? "bg-primary text-white hover:bg-primary/90" : "bg-white/10 text-white hover:bg-white/20"
                      )}
                      onClick={() => setShowEvidence(!showEvidence)}
                    >
                      <Cpu className="w-3 h-3" />
                      Smart Evidence
                    </Button>
                    <button className="hover:text-primary transition-colors">
                      <ZoomIn className="w-5 h-5" />
                    </button>
                    <button className="hover:text-primary transition-colors">
                      <Maximize2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Multi-camera strip */}
          <div className="h-28 bg-zinc-950 border-t border-white/5 flex gap-3 p-3 overflow-x-auto scrollbar-hide">
            {[0, 1, 2, 3].map((idx) => (
              <div 
                key={idx} 
                onClick={() => setActiveCamera(idx)}
                className={cn(
                  "flex-shrink-0 w-40 rounded-lg border-2 transition-all cursor-pointer relative group overflow-hidden",
                  activeCamera === idx ? "border-primary ring-2 ring-primary/20" : "border-transparent opacity-60 hover:opacity-100"
                )}
              >
                <img 
                  src={`https://picsum.photos/seed/cam${idx + 1}/200/120`} 
                  className="w-full h-full object-cover" 
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                <span className="absolute top-1.5 left-1.5 text-[9px] font-bold text-white bg-black/60 px-1.5 py-0.5 rounded backdrop-blur-sm">
                  CAM 0{idx + 1}
                </span>
                {idx === 0 && (
                  <div className="absolute bottom-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full animate-pulse" />
                )}
              </div>
            ))}
            <div className="flex-shrink-0 w-40 rounded-lg border-2 border-dashed border-white/10 flex flex-col items-center justify-center gap-2 text-white/40 hover:text-white/60 hover:border-white/20 transition-all cursor-pointer">
              <Maximize2 className="w-5 h-5" />
              <span className="text-[9px] font-bold uppercase tracking-wider">Stitched View</span>
            </div>
          </div>
        </div>

        {/* RIGHT: Violation Details Panel (40%) */}
        <div className="flex-[0.4] bg-card flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            {/* Property & Context */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Property & Context</h3>
                <Badge variant="outline" className="text-[10px] font-mono">{violation.cameraId}</Badge>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-xl bg-muted/30 border border-border/50 space-y-1">
                  <p className="text-[10px] text-muted-foreground font-medium uppercase">Property</p>
                  <p className="text-sm font-bold truncate">{violation.property}</p>
                </div>
                <div className="p-3 rounded-xl bg-muted/30 border border-border/50 space-y-1">
                  <p className="text-[10px] text-muted-foreground font-medium uppercase">Zone</p>
                  <p className="text-sm font-bold truncate">{violation.zone}</p>
                </div>
              </div>
            </section>

            {/* Violation Details */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Violation Details</h3>
                <span className="text-[10px] font-mono text-muted-foreground">ID: {violation.id}</span>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-destructive/5 border border-destructive/10">
                  <div className="p-2 bg-destructive/10 rounded-lg">
                    <ShieldAlert className="w-5 h-5 text-destructive" />
                  </div>
                  <div>
                    <p className="text-[10px] text-destructive font-bold uppercase tracking-wider">Rule Triggered</p>
                    <p className="text-sm font-bold">{violation.rule}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 border border-border/50">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-[10px] text-muted-foreground font-medium uppercase">Duration</p>
                      <p className="text-xs font-bold">{violation.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 border border-border/50">
                    <History className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-[10px] text-muted-foreground font-medium uppercase">Detected</p>
                      <p className="text-xs font-bold">10:30 AM</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* AI Reasoning */}
            <section className="space-y-3">
              <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">AI Reasoning</h3>
              <Card className="bg-primary/5 border-primary/20 shadow-none overflow-hidden">
                <div className="h-1 bg-primary w-full" />
                <CardContent className="p-4 flex gap-3">
                  <Cpu className="w-5 h-5 text-primary shrink-0" />
                  <p className="text-xs leading-relaxed font-medium">
                    {violation.aiReasoning}
                  </p>
                </CardContent>
              </Card>
            </section>

            {/* Vehicle Information */}
            <section className="space-y-4">
              <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Vehicle Information</h3>
              <div className="flex gap-4">
                <div className="w-24 h-24 rounded-xl border overflow-hidden shrink-0 bg-muted">
                  <img 
                    src={violation.vehicleImage} 
                    className="w-full h-full object-cover" 
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex-1 space-y-3">
                  <div>
                    <p className="text-[10px] text-muted-foreground font-medium uppercase">License Plate</p>
                    <p className="text-xl font-mono font-black tracking-tighter">{violation.plate}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-destructive/10 text-destructive border-none text-[10px] font-bold">
                      NOT AUTHORIZED
                    </Badge>
                    <Button variant="ghost" size="sm" className="h-6 text-[10px] gap-1">
                      <History className="w-3 h-3" />
                      History
                    </Button>
                  </div>
                </div>
              </div>
            </section>

            {/* Internal Notes */}
            <section className="space-y-3 pb-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Internal Notes</h3>
                <Button variant="ghost" size="sm" className="h-6 text-[10px]">Add Note</Button>
              </div>
              <div className="p-4 rounded-xl bg-muted/20 border border-dashed text-xs text-muted-foreground text-center italic">
                No internal notes have been added to this violation yet.
              </div>
            </section>
          </div>

          {/* BOTTOM ACTION BAR (STICKY) */}
          <div className="p-6 border-t bg-card shadow-[0_-10px_20px_rgba(0,0,0,0.02)] space-y-4">
            {showDispatch ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-3">
                  <Truck className="w-6 h-6 text-emerald-500" />
                  <div>
                    <p className="text-xs font-bold text-emerald-600 uppercase">Violation Approved</p>
                    <p className="text-[10px] text-emerald-600/80">Ready to dispatch tow operator.</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="h-11" onClick={() => setShowDispatch(false)}>Cancel</Button>
                  <Button className="h-11 bg-emerald-600 hover:bg-emerald-700 gap-2">
                    <Truck className="w-4 h-4" />
                    Dispatch Tow
                  </Button>
                </div>
              </motion.div>
            ) : (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <Button 
                    variant="outline" 
                    className="gap-2 h-12 border-2 hover:bg-destructive/5 hover:border-destructive/20 hover:text-destructive transition-all"
                    onClick={handleReject}
                  >
                    <XCircle className="w-4 h-4" />
                    Reject
                  </Button>
                  <Button 
                    className="gap-2 h-12 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all"
                    onClick={handleApprove}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Approve
                  </Button>
                </div>
                <Button 
                  variant="secondary" 
                  className="w-full gap-2 h-12 border-2 border-transparent hover:border-muted-foreground/20 transition-all"
                  onClick={handleMarkAuthorized}
                >
                  <UserCircle className="w-4 h-4" />
                  Mark as Authorized
                </Button>
              </div>
            )}
            
            {isSuperAdmin && violation.status !== 'detected' && (
              <div className="pt-2">
                <Button variant="ghost" className="w-full text-[10px] font-bold uppercase tracking-widest text-amber-600 hover:text-amber-700 hover:bg-amber-500/5 gap-2">
                  <RotateCcw className="w-3 h-3" />
                  Override Decision / Reopen
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
