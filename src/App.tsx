/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Button } from './components/ui/button';
import { Sidebar } from './components/Sidebar';
import { Topbar } from './components/Topbar';
import { DashboardView } from './components/DashboardView';
import { LiveParkingView } from './components/LiveParkingView';
import { ViolationReviewView } from './components/ViolationReviewView';
import { PropertiesView } from './components/PropertiesView';
import { AnalyticsView } from './components/AnalyticsView';
import { NewSignUpsView } from './components/NewSignUpsView';
import { PropertySetupView } from './components/PropertySetupView';
import { PropertyManagersView } from './components/PropertyManagersView';
import { AuthorizedParkersView } from './components/AuthorizedParkersView';
import { VehiclesView } from './components/VehiclesView';
import { TowingOperatorsView } from './components/TowingOperatorsView';
import { Toaster } from './components/ui/sonner';
import { TooltipProvider } from './components/ui/tooltip';

import { AuthProvider, useAuth } from './lib/auth-context';
import { LoginView } from './components/LoginView';
import { Loader2, Settings2, History } from 'lucide-react';

import { ViolationsListView } from './components/ViolationsListView';
import { Violation } from './types';

function AppContent() {
  const { user, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedSignUpId, setSelectedSignUpId] = useState<string | null>(null);
  const [selectedViolation, setSelectedViolation] = useState<Violation | null>(null);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return <LoginView />;
  }

  const handleStartSetup = (id: string) => {
    setSelectedSignUpId(id);
    setActiveTab('setup');
  };

  const handleReviewViolation = (violation: Violation) => {
    setSelectedViolation(violation);
  };

  const renderView = () => {
    if (selectedViolation) {
      return (
        <ViolationReviewView 
          violation={selectedViolation} 
          onBack={() => setSelectedViolation(null)} 
        />
      );
    }

    switch (activeTab) {
      case 'dashboard':
        return <DashboardView />;
      case 'violations-queue':
        return (
          <ViolationsListView 
            statusFilter="detected" 
            title="Violations Queue" 
            onReview={handleReviewViolation} 
          />
        );
      case 'under-review':
        return (
          <ViolationsListView 
            statusFilter="in_review" 
            title="Under Review" 
            onReview={handleReviewViolation} 
          />
        );
      case 'approved-dispatched':
        return (
          <ViolationsListView 
            statusFilter="approved" 
            title="Approved / Dispatched" 
            onReview={handleReviewViolation} 
          />
        );
      case 'rejected':
        return (
          <ViolationsListView 
            statusFilter="rejected" 
            title="Rejected Violations" 
            onReview={handleReviewViolation} 
          />
        );
      case 'audit-logs':
        return (
          <div className="p-8 space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Audit Logs</h1>
            <div className="border rounded-xl p-12 flex flex-col items-center justify-center text-center space-y-4 bg-card">
              <div className="p-4 bg-muted rounded-full">
                <History className="w-8 h-8 text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Audit Logs coming soon</h3>
                <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                  Detailed traceability for every decision will be available in the next update.
                </p>
              </div>
            </div>
          </div>
        );
      case 'new-signups':
        return <NewSignUpsView onStartSetup={handleStartSetup} />;
      case 'property-setup':
        if (selectedSignUpId) {
          return (
            <PropertySetupView 
              signUpId={selectedSignUpId} 
              onComplete={() => {
                setSelectedSignUpId(null);
                setActiveTab('new-signups');
              }} 
            />
          );
        }
        return (
          <div className="p-8 space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Property Setup</h1>
            <div className="border rounded-xl p-12 flex flex-col items-center justify-center text-center space-y-4 bg-card">
              <div className="p-4 bg-primary/10 rounded-full">
                <Settings2 className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">No Property Selected</h3>
                <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                  Please select a property from the New Sign-Ups queue to begin configuration.
                </p>
              </div>
              <Button onClick={() => setActiveTab('new-signups')}>Go to Sign-Ups</Button>
            </div>
          </div>
        );
      case 'live-parking':
        return <LiveParkingView />;
      case 'properties':
        return <PropertiesView />;
      case 'analytics':
        return <AnalyticsView />;
      case 'managers':
        return <PropertyManagersView />;
      case 'parkers':
        return <AuthorizedParkersView />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-[calc(100vh-64px)] text-muted-foreground space-y-4">
            <div className="p-4 bg-muted rounded-full">
              <span className="text-4xl">🚧</span>
            </div>
            <div className="text-center">
              <h2 className="text-xl font-bold text-foreground">Module Under Construction</h2>
              <p className="text-sm">The {activeTab} module is currently being optimized for enterprise use.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-background text-foreground font-sans">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 flex flex-col min-w-0">
        <Topbar />
        <div className="flex-1 overflow-y-auto">
          {renderView()}
        </div>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <TooltipProvider>
        <AppContent />
        <Toaster position="top-right" />
      </TooltipProvider>
    </AuthProvider>
  );
}
