import { Calendar, FileText, BookOpen, CheckSquare, Upload, BarChart3, Home, Target, LogOut, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { 
  LayoutDashboard, 
} from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'resources', label: 'Resources', icon: BookOpen },
  { id: 'calendar', label: 'Study Calendar', icon: Calendar },
  { id: 'tasks', label: 'Task Manager', icon: CheckSquare },
  { id: 'notes', label: 'Notes', icon: FileText },
];

export const Sidebar = ({ activeSection, onSectionChange }: SidebarProps) => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col">
      <div className="p-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-blue-600 flex items-center gap-2">
            <BookOpen className="h-8 w-8" />
            StudyPro
          </h1>
          <p className="text-sm text-gray-500 mt-1">RRB JE-IT Exam Prep</p>
        </div>
        
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant={activeSection === item.id ? 'default' : 'ghost'}
                className={cn(
                  'w-full justify-start gap-2',
                  activeSection === item.id && 'bg-blue-600 text-white hover:bg-blue-700'
                )}
                onClick={() => onSectionChange(item.id)}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </Button>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto p-4 border-t border-gray-200">
        <div className="flex items-center gap-2 mb-3 text-sm text-gray-600">
          <User className="h-4 w-4" />
          <span className="truncate">{user?.email}</span>
        </div>
        <Button
          onClick={handleSignOut}
          variant="outline"
          size="sm"
          className="w-full"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </div>
  );
};
