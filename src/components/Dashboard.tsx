import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Target, Clock, CheckCircle, AlertCircle, Calendar } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useProfile } from '@/hooks/useProfile';
import { StudyTimer } from './StudyTimer';

export const Dashboard = () => {
  const { user } = useAuth();
  const { data: profile } = useProfile();

  const upcomingExams = [
    { name: 'RRB JE IT', date: '2024-05-15', daysLeft: 120 },
    { name: 'UPSC Prelims', date: '2024-06-16', daysLeft: 152 }
  ];

  const recentActivity = [
    { action: 'Completed', item: 'Data Structures - Trees', time: '2 hours ago' },
    { action: 'Added', item: 'Database Systems Notes', time: '4 hours ago' },
    { action: 'Scheduled', item: 'Mock Test Session', time: '1 day ago' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>
        <p className="text-gray-600 mt-1">Welcome back, {profile?.name || 'Student'}!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Today's Focus</p>
                <p className="text-2xl font-bold text-gray-900">Computer Science</p>
                <p className="text-xs text-gray-500">3 topics to cover</p>
              </div>
              <Target className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Study Streak</p>
                <p className="text-2xl font-bold text-gray-900">7 days</p>
                <p className="text-xs text-green-600">Keep it up!</p>
              </div>
              <Calendar className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Next Exam</p>
                <p className="text-2xl font-bold text-gray-900">RRB JE IT</p>
                <p className="text-xs text-gray-500">120 days left</p>
              </div>
              <AlertCircle className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Study Timer
            </CardTitle>
          </CardHeader>
          <CardContent>
            <StudyTimer />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="h-2 w-2 rounded-full bg-blue-600" />
                  <div>
                    <p className="text-sm font-medium">
                      {activity.action} <span className="text-gray-600">{activity.item}</span>
                    </p>
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
