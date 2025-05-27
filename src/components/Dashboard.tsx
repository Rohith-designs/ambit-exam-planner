
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Calendar, FileText, CheckSquare, Target, TrendingUp } from 'lucide-react';

export const Dashboard = () => {
  const stats = [
    { label: 'Overall Progress', value: '68%', icon: Target, color: 'text-blue-600' },
    { label: 'Tasks Completed', value: '24/35', icon: CheckSquare, color: 'text-green-600' },
    { label: 'Study Hours Today', value: '4.5h', icon: TrendingUp, color: 'text-purple-600' },
    { label: 'Notes Created', value: '127', icon: FileText, color: 'text-orange-600' },
  ];

  const recentActivity = [
    { type: 'Completed', item: 'Data Structures - Arrays', time: '2 hours ago' },
    { type: 'Added', item: 'Computer Networks Notes', time: '4 hours ago' },
    { type: 'Scheduled', item: 'Mock Test - UPSC GS', time: '6 hours ago' },
    { type: 'Updated', item: 'Database Management Progress', time: '1 day ago' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>
        <p className="text-gray-600 mt-1">Welcome back! Here's your study progress overview.</p>
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
        {/* Study Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Subject Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { subject: 'Computer Science', progress: 85 },
              { subject: 'General Studies', progress: 60 },
              { subject: 'Current Affairs', progress: 45 },
              { subject: 'Aptitude', progress: 75 },
            ].map((item) => (
              <div key={item.subject}>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">{item.subject}</span>
                  <span className="text-sm text-gray-500">{item.progress}%</span>
                </div>
                <Progress value={item.progress} className="h-2" />
              </div>
            ))}
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
                    activity.type === 'Completed' ? 'bg-green-500' :
                    activity.type === 'Added' ? 'bg-blue-500' :
                    activity.type === 'Scheduled' ? 'bg-purple-500' : 'bg-orange-500'
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
