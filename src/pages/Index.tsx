
import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Dashboard } from '@/components/Dashboard';
import { SyllabusTracker } from '@/components/SyllabusTracker';
import { ResourceManager } from '@/components/ResourceManager';
import { StudyCalendar } from '@/components/StudyCalendar';
import { TaskManager } from '@/components/TaskManager';
import { NotesSection } from '@/components/NotesSection';
import { ProgressAnalytics } from '@/components/ProgressAnalytics';

const Index = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'syllabus':
        return <SyllabusTracker />;
      case 'resources':
        return <ResourceManager />;
      case 'calendar':
        return <StudyCalendar />;
      case 'tasks':
        return <TaskManager />;
      case 'notes':
        return <NotesSection />;
      case 'analytics':
        return <ProgressAnalytics />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <main className="flex-1 p-8 overflow-auto">
        {renderActiveSection()}
      </main>
    </div>
  );
};

export default Index;
