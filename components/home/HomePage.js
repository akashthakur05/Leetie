'use client';

import { useState } from 'react';
import ViewTabs from '@/components/ViewTabs';
import RoadmapView from '@/components/roadmap/RoadmapView';
import AllQuestionsSection from '@/components/sections/AllQuestionsSection';

export default function HomePage({ companies }) {
  const [activeView, setActiveView] = useState('all');

  return (
    <>
      <ViewTabs activeView={activeView} onViewChange={setActiveView} />
      
      {activeView === 'beginner' && <RoadmapView type="beginner" />}
      {activeView === 'experienced' && <RoadmapView type="experienced" />}
      {activeView === 'all' && <AllQuestionsSection />}
    </>
  );
}
