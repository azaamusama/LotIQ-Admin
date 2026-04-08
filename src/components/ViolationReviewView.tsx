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
  MessageSquare
} from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { mockViolations } from '../lib/mock-data';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export function ViolationReviewView() {
  const [selectedViolation, setSelectedViolation] = useState(mockViolations[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showEvidence, setShowEvidence] = useState(true);

  return (
    <div className="h-[calc(100vh-64px)] flex overflow-hidden">
      {/* Left Side: Video Player */}
      <div className="flex-1 bg-black relative flex flex-col">
        <div className="flex-1 relative group">
          <video 
            src={selectedViolation.videoUrl} 
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
                <div className="border-2 border-destructive w-48 h-32 rounded-lg relative">
                  <div className="absolute -top-8 left-0 bg-destructive text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                    <Cpu className="w-3 h-3" />
                    AI DETECTION: {selectedViolation.plate}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Video Controls */}
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="flex flex-col gap-4">
              <div className="h-1 bg-white/20 rounded-full overflow-hidden cursor-pointer relative">
                <div className="absolute top-0 left-0 h-full bg-primary w-1/3" />
                <div className="absolute top-0 left-[45%] h-full w-2 bg-destructive" /> {/* Event Marker */}
              </div>
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center gap-4">
                  <button onClick={() => setIsPlaying(!isPlaying)}>
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  </button>
                  <RotateCcw className="w-5 h-5" />
                  <span className="text-xs font-mono">01:24 / 04:00</span>
                </div>
                <div className="flex items-center gap-4">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className={cn("text-xs gap-2", showEvidence && "bg-primary/20 text-primary")}
                    onClick={() => setShowEvidence(!showEvidence)}
                  >
                    <Cpu className="w-4 h-4" />
                    Smart Evidence
                  </Button>
                  <Maximize2 className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Multi-camera strip */}
        <div className="h-24 bg-zinc-900 border-t border-white/10 flex gap-2 p-2">
          {[1, 2, 3, 4].map((cam) => (
            <div key={cam} className={cn(
              "flex-1 rounded border border-white/5 overflow-hidden relative cursor-pointer hover:border-primary/50 transition-colors",
              cam === 1 && "border-primary"
            )}>
              <img 
                src={`https://picsum.photos/seed/cam${cam}/200/100`} 
                className="w-full h-full object-cover opacity-50" 
                referrerPolicy="no-referrer"
              />
              <span className="absolute top-1 left-1 text-[8px] font-bold text-white bg-black/50 px-1 rounded">CAM 0{cam}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right Side: Details & Actions */}
      <div className="w-[400px] bg-card border-l flex flex-col overflow-y-auto">
        <div className="p-6 space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <Badge variant="outline" className="bg-destructive/10 text-destructive border-none mb-2">
                VIOLATION DETECTED
              </Badge>
              <h2 className="text-2xl font-bold tracking-tight">{selectedViolation.plate}</h2>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold text-muted-foreground uppercase">AI Confidence</p>
              <p className="text-lg font-mono font-bold text-primary">{(selectedViolation.confidence * 100).toFixed(1)}%</p>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-muted rounded-lg">
                <MapPin className="w-4 h-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Property & Zone</p>
                <p className="text-sm font-semibold">{selectedViolation.property} • {selectedViolation.zone}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-muted rounded-lg">
                <ShieldAlert className="w-4 h-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Rule Violated</p>
                <p className="text-sm font-semibold text-destructive">{selectedViolation.rule}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-muted rounded-lg">
                <Clock className="w-4 h-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Detected At</p>
                <p className="text-sm font-semibold">Today, 10:30 AM</p>
              </div>
            </div>
          </div>

          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-4 flex gap-3">
              <Info className="w-5 h-5 text-primary shrink-0" />
              <p className="text-xs leading-relaxed">
                <span className="font-bold">Smart Evidence:</span> This vehicle is not authorized for this property and exceeded allowed duration.
              </p>
            </CardContent>
          </Card>

          <div className="space-y-3">
            <p className="text-xs font-bold text-muted-foreground uppercase">Vehicle History</p>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 rounded bg-muted/50 text-xs">
                <span className="text-muted-foreground">Total Violations</span>
                <span className="font-bold">3</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-muted/50 text-xs">
                <span className="text-muted-foreground">Last Authorized</span>
                <span className="font-bold">Mar 24, 2026</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold text-muted-foreground uppercase">Notes</p>
              <Button variant="ghost" size="sm" className="h-6 text-[10px]">Add Note</Button>
            </div>
            <div className="p-3 rounded-lg bg-muted/30 border text-xs text-muted-foreground italic">
              No notes added yet.
            </div>
          </div>
        </div>

        <div className="mt-auto p-6 border-t bg-muted/20 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="gap-2 h-11">
              <XCircle className="w-4 h-4" />
              Reject
            </Button>
            <Button className="gap-2 h-11">
              <CheckCircle2 className="w-4 h-4" />
              Approve
            </Button>
          </div>
          <Button variant="secondary" className="w-full gap-2 h-11">
            <UserCircle className="w-4 h-4" />
            Mark as Authorized
          </Button>
        </div>
      </div>
    </div>
  );
}
