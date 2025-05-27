
import { Calendar, FileText, BookOpen, CheckSquare, Upload, BarChart3, Home, Target } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'syllabus', label: 'Syllabus Tracker', icon: Target },
  { id: 'resources', label: 'Resources', icon: Upload },
  { id: 'calendar', label: 'Study Calendar', icon: Calendar },
  { id: 'tasks', label: 'Task Manager', icon: CheckSquare },
  { id: 'notes', label: 'Notes', icon: FileText },
  { id: 'analytics', label: 'Progress', icon: BarChart3 },
];

export const Sidebar = ({ activeSection, onSectionChange }: SidebarProps) => {
  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-blue-600 flex items-center gap-2">
          <BookOpen className="h-8 w-8" />
          StudyPro
        </h1>
        <p className="text-sm text-gray-500 mt-1">Competitive Exam Prep</p>
      </div>
      
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors",
                activeSection === item.id
                  ? "bg-blue-50 text-blue-600 border border-blue-200"
                  : "text-gray-600 hover:bg-gray-50"
              )}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
};
