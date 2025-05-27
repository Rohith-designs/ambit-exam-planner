
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Calendar, FileText, CheckSquare, Target, TrendingUp } from 'lucide-react';
import { useProfile } from '@/hooks/useProfile';
import { useSyllabusTopics } from '@/hooks/useSyllabusTopics';
import { useSubjects } from '@/hooks/useSubjects';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export const Dashboard = () => {
  const { user } = useAuth();
  const { data: profile } = useProfile();
  const { data: syllabusTopics = [] } = useSyllabusTopics();
  const { data: subjects = [] } = useSubjects();

  // Get user's tasks count
  const { data: tasksData } = useQuery({
    queryKey: ['tasks-count', user?.id],
    queryFn: async () => {
      if (!user) return { total: 0, completed: 0 };
      
      const { data, error } = await supabase
        .from('tasks')
        .select('completed')
        .eq('user_id', user.id);
      
      if (error) throw error;
      
      const total = data.length;
      const completed = data.filter(task => task.completed).length;
      return { total, completed };
    },
    enabled: !!user,
  });

  // Get user's notes count
  const { data: notesCount } = useQuery({
    queryKey: ['notes-count', user?.id],
    queryFn: async () => {
      if (!user) return 0;
      
      const { count, error } = await supabase
        .from('notes')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);
      
      if (error) throw error;
      return count || 0;
    },
    enabled: !!user,
  });

  const completedTopics = syllabusTopics.filter(topic => topic.completed).length;
  const totalTopics = syllabusTopics.length;
  const overallProgress = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;

  const stats = [
    { 
      label: 'Overall Progress', 
      value: `${overallProgress}%`, 
      icon: Target, 
      color: 'text-blue-600' 
    },
    { 
      label: 'Tasks Completed', 
      value: `${tasksData?.completed || 0}/${tasksData?.total || 0}`, 
      icon: CheckSquare, 
      color: 'text-green-600' 
    },
    { 
      label: 'Study Hours Today', 
      value: '0h', 
      icon: TrendingUp, 
      color: 'text-purple-600' 
    },
    { 
      label: 'Notes Created', 
      value: `${notesCount || 0}`, 
      icon: FileText, 
      color: 'text-orange-600' 
    },
  ];

  // Calculate subject-wise progress
  const subjectProgress = subjects.map(subject => {
    const subjectTopics = syllabusTopics.filter(topic => topic.subject_id === subject.id);
    const completedSubjectTopics = subjectTopics.filter(topic => topic.completed);
    const progress = subjectTopics.length > 0 ? Math.round((completedSubjectTopics.length / subjectTopics.length) * 100) : 0;
    
    return {
      subject: subject.name,
      progress
    };
  });

  const recentActivity = [
    { type: 'Welcome', item: 'Started RRB JE-IT preparation journey', time: 'Just now' },
    { type: 'Setup', item: 'Account created successfully', time: 'Just now' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>
        <p className="text-gray-600 mt-1">
          Welcome back, {profile?.full_name || 'Student'}! Here's your RRB JE-IT exam preparation overview.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  </div>
                  <Icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Subject Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              RRB JE-IT Subject Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {subjectProgress.length > 0 ? (
              subjectProgress.map((item) => (
                <div key={item.subject}>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">{item.subject}</span>
                    <span className="text-sm text-gray-500">{item.progress}%</span>
                  </div>
                  <Progress value={item.progress} className="h-2" />
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No syllabus topics added yet. Start by visiting the Syllabus Tracker!</p>
            )}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.type === 'Welcome' ? 'bg-green-500' :
                    activity.type === 'Setup' ? 'bg-blue-500' : 'bg-gray-500'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.type}: {activity.item}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
