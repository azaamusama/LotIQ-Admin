/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
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
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedSignUpId, setSelectedSignUpId] = useState<string | null>(null);

  const handleStartSetup = (id: string) => {
    setSelectedSignUpId(id);
    setActiveTab('setup');
  };

  const renderView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView />;
      case 'live-parking':
        return <LiveParkingView />;
      case 'violations':
        return <ViolationReviewView />;
      case 'properties':
        return <PropertiesView />;
      case 'analytics':
        return <AnalyticsView />;
      case 'signups':
        return <NewSignUpsView onStartSetup={handleStartSetup} />;
      case 'setup':
        return (
          <PropertySetupView 
            signUpId={selectedSignUpId || 's1'} 
            onComplete={() => setActiveTab('signups')} 
          />
        );
      case 'managers':
        return <PropertyManagersView />;
      case 'parkers':
        return <AuthorizedParkersView />;
      case 'vehicles':
        return <VehiclesView />;
      case 'towing':
        return <TowingOperatorsView />;
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
    <TooltipProvider>
      <div className="flex min-h-screen bg-background text-foreground font-sans">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="flex-1 flex flex-col min-w-0">
          <Topbar />
          <div className="flex-1 overflow-y-auto">
            {renderView()}
          </div>
        </main>
        <Toaster position="top-right" />
      </div>
    </TooltipProvider>
  );
}
