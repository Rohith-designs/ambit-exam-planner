
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Plus, Target } from 'lucide-react';
import { useState } from 'react';

export const StudyCalendar = () => {
  const [currentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const events = [
    {
      id: 1,
      title: 'Computer Networks Revision',
      date: '2024-01-20',
      time: '09:00 AM',
      type: 'study',
      duration: '2 hours',
      priority: 'high'
    },
    {
      id: 2,
      title: 'RRB JE Mock Test',
      date: '2024-01-20',
      time: '02:00 PM',
      type: 'test',
      duration: '3 hours',
      priority: 'high'
    },
    {
      id: 3,
      title: 'Current Affairs Reading',
      date: '2024-01-21',
      time: '07:00 AM',
      type: 'study',
      duration: '1 hour',
      priority: 'medium'
    },
    {
      id: 4,
      title: 'UPSC Prelims - 2024',
      date: '2024-06-16',
      time: '09:30 AM',
      type: 'exam',
      duration: '2.5 hours',
      priority: 'high'
    }
  ];

  const upcomingExams = [
    { name: 'RRB JE IT', date: '2024-05-15', daysLeft: 120 },
    { name: 'UPSC Prelims', date: '2024-06-16', daysLeft: 152 },
    { name: 'UPSC Mains', date: '2024-09-20', daysLeft: 248 }
  ];

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'exam': return 'bg-red-100 text-red-800 border-red-200';
      case 'test': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'study': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const todaysEvents = events.filter(event => 
    event.date === currentDate.toISOString().split('T')[0]
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Study Calendar</h2>
        <p className="text-gray-600 mt-1">Plan your study schedule and track important exam dates.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Schedule */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Today's Schedule
              </span>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Event
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {todaysEvents.length > 0 ? (
              <div className="space-y-3">
                {todaysEvents.map((event) => (
                  <div key={event.id} className="flex items-center gap-4 p-3 rounded-lg border">
                    <div className="flex-shrink-0">
                      <Clock className="h-5 w-5 text-gray-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{event.title}</h3>
                      <p className="text-sm text-gray-600">{event.time} • {event.duration}</p>
                    </div>
                    <Badge className={getEventTypeColor(event.type)}>
                      {event.type}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No events scheduled for today</p>
                <Button variant="outline" className="mt-2">
                  Schedule Study Session
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Upcoming Exams */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Upcoming Exams
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingExams.map((exam, index) => (
                <div key={index} className="p-3 rounded-lg border border-red-200 bg-red-50">
                  <h3 className="font-semibold text-gray-900">{exam.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">Date: {exam.date}</p>
                  <div className="mt-2">
                    <Badge variant="destructive">
                      {exam.daysLeft} days left
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly View */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly View</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="p-4 text-center border rounded-lg">
                <p className="font-semibold text-sm text-gray-600">{day}</p>
                <p className="text-lg font-bold text-gray-900 mt-1">
                  {Math.floor(Math.random() * 28) + 1}
                </p>
                <div className="mt-2 space-y-1">
                  {Math.random() > 0.5 && (
                    <div className="w-full h-2 bg-blue-200 rounded-full" />
                  )}
                  {Math.random() > 0.7 && (
                    <div className="w-full h-2 bg-green-200 rounded-full" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
