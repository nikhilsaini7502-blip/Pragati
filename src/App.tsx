import React, { useState, useEffect } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LandingPage } from './components/LandingPage';
import { FarmerDashboard } from './components/FarmerDashboard';
import { BuyerDashboard } from './components/BuyerDashboard';
import { FpoDashboard } from './components/FpoDashboard';
import { AdminPortal } from './components/AdminPortal';
import { AiVisionModal } from './components/AiVisionModal';
import { PestDetectorModal } from './components/PestDetectorModal';
import { LogisticsTrackerModal } from './components/LogisticsTrackerModal';
import { GrievanceModal } from './components/GrievanceModal';
import { FloatingChatbot } from './components/FloatingChatbot';

import { UserRole, FarmerLot } from './types';
import { initialFarmerLots } from './data/mockData';

export default function App() {
  const [currentRole, setCurrentRole] = useState<UserRole>('landing');
  const [farmerLots, setFarmerLots] = useState<FarmerLot[]>(initialFarmerLots);

  // Modal states
  const [isVisionModalOpen, setIsVisionModalOpen] = useState(false);
  const [isPestModalOpen, setIsPestModalOpen] = useState(false);
  const [isLogisticsModalOpen, setIsLogisticsModalOpen] = useState(false);
  const [isGrievanceModalOpen, setIsGrievanceModalOpen] = useState(false);
  const [isGeminiModalOpen, setIsGeminiModalOpen] = useState(false);
  const [geminiQuery, setGeminiQuery] = useState<string | undefined>(undefined);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentRole]);


  const handleOpenGeminiModal = (query?: string) => {
    setGeminiQuery(query);
    setIsGeminiModalOpen(true);
  };

  const handleLotCreated = (
    cropName: string,
    grade: string,
    score: number,
    quantity: number,
    price: number,
    imageGallery?: string[]
  ) => {
    const newLot: FarmerLot = {
      id: `LOT-MH-${Math.floor(400 + Math.random() * 200)}`,
      farmerName: 'Rameshwar Patil',
      farmerPhone: '+91 98221 44521',
      village: 'Pimpalgaon Baswant',
      district: 'Nashik',
      commodity: cropName,
      variety: 'A+ Certified',
      quantityQuintals: quantity,
      expectedPricePerQuintal: price,
      harvestDate: 'Today',
      aiQualityGrade: (grade.includes('A+') ? 'A+' : grade.includes('A') ? 'A' : 'B') as any,
      aiQualityScore: score,
      imageGallery: imageGallery,
      aiQualityMetrics: {
        sizeUniformity: score > 90 ? 94 : 88,
        moistureContent: 10.5,
        blemishRate: 1.8,
        shelfLifeDays: 50,
      },
      status: 'Listed',
      verifiedFarmer: true,
    };

    setFarmerLots([newLot, ...farmerLots]);
    // Optionally switch to farmer view so user immediately sees their registered lot
    setCurrentRole('farmer');
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-emerald-200 selection:text-emerald-900">
        {/* Top Navbar */}
        <Navbar
          currentRole={currentRole}
          setCurrentRole={setCurrentRole}
          openGrievanceModal={() => setIsGrievanceModalOpen(true)}
        />

        {/* Main Content Area */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 pt-6">
          {currentRole === 'landing' && (
            <LandingPage
              onSelectRole={(role) => setCurrentRole(role)}
              openVisionModal={() => setIsVisionModalOpen(true)}
              openLogisticsModal={() => setIsLogisticsModalOpen(true)}
              openGeminiModal={handleOpenGeminiModal}
            />
          )}

          {currentRole === 'farmer' && (
            <FarmerDashboard
              lots={farmerLots}
              openVisionModal={() => setIsVisionModalOpen(true)}
              openPestModal={() => setIsPestModalOpen(true)}
              openLogisticsModal={() => setIsLogisticsModalOpen(true)}
              openGeminiModal={handleOpenGeminiModal}
              onBackToHome={() => setCurrentRole('landing')}
            />
          )}

          {currentRole === 'buyer' && (
            <BuyerDashboard
              openVisionModal={() => setIsVisionModalOpen(true)}
              openLogisticsModal={() => setIsLogisticsModalOpen(true)}
              onBackToHome={() => setCurrentRole('landing')}
            />
          )}

          {currentRole === 'fpo' && (
            <FpoDashboard
              onBackToHome={() => setCurrentRole('landing')}
              openVisionModal={() => setIsVisionModalOpen(true)}
            />
          )}

          {currentRole === 'admin' && (
            <AdminPortal
              onBackToHome={() => setCurrentRole('landing')}
              openGrievanceModal={() => setIsGrievanceModalOpen(true)}
            />
          )}
        </main>

        {/* Official Footer with Support Desk & Red Help & Complaints Button */}
        <Footer
          openGrievanceModal={() => setIsGrievanceModalOpen(true)}
          openLogisticsModal={() => setIsLogisticsModalOpen(true)}
          openVisionModal={() => setIsVisionModalOpen(true)}
        />

        {/* Interactive Feature Modals */}
        <AiVisionModal
          isOpen={isVisionModalOpen}
          onClose={() => setIsVisionModalOpen(false)}
          onLotCreated={handleLotCreated}
        />

        <PestDetectorModal
          isOpen={isPestModalOpen}
          onClose={() => setIsPestModalOpen(false)}
        />

        <LogisticsTrackerModal
          isOpen={isLogisticsModalOpen}
          onClose={() => setIsLogisticsModalOpen(false)}
        />

        <GrievanceModal
          isOpen={isGrievanceModalOpen}
          onClose={() => setIsGrievanceModalOpen(false)}
        />

        <FloatingChatbot />
      </div>
    </LanguageProvider>
  );
}
