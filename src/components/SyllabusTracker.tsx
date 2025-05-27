
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, CheckCircle, Clock } from 'lucide-react';
import { useState } from 'react';

export const SyllabusTracker = () => {
  const [subjects] = useState([
    {
      name: 'Computer Science & IT',
      totalTopics: 25,
      completedTopics: 18,
      topics: [
        { name: 'Data Structures', completed: true, priority: 'high' },
        { name: 'Algorithms', completed: true, priority: 'high' },
        { name: 'Database Management', completed: true, priority: 'medium' },
        { name: 'Computer Networks', completed: false, priority: 'high' },
        { name: 'Operating Systems', completed: false, priority: 'medium' },
        { name: 'Software Engineering', completed: false, priority: 'low' },
      ]
    },
    {
      name: 'General Studies',
      totalTopics: 30,
      completedTopics: 12,
      topics: [
        { name: 'Indian History', completed: true, priority: 'high' },
        { name: 'Geography', completed: true, priority: 'high' },
        { name: 'Polity', completed: false, priority: 'high' },
        { name: 'Economics', completed: false, priority: 'medium' },
        { name: 'Environment', completed: false, priority: 'medium' },
        { name: 'Science & Technology', completed: false, priority: 'low' },
      ]
    }
  ]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Syllabus Tracker</h2>
        <p className="text-gray-600 mt-1">Track your progress across all subjects and topics.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {subjects.map((subject) => (
          <Card key={subject.name} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                  {subject.name}
                </span>
                <Badge variant="outline">
                  {subject.completedTopics}/{subject.totalTopics}
                </Badge>
              </CardTitle>
              <div className="space-y-2">
                <Progress 
                  value={(subject.completedTopics / subject.totalTopics) * 100} 
                  className="h-2"
                />
                <p className="text-sm text-gray-500">
                  {Math.round((subject.completedTopics / subject.totalTopics) * 100)}% Complete
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {subject.topics.map((topic, index) => (
                  <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <Checkbox 
                        checked={topic.completed}
                        className="data-[state=checked]:bg-green-600"
                      />
                      <span className={`text-sm ${topic.completed ? 'line-through text-gray-500' : ''}`}>
                        {topic.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className={getPriorityColor(topic.priority)}>
                        {topic.priority}
                      </Badge>
                      {topic.completed && <CheckCircle className="h-4 w-4 text-green-600" />}
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                <Clock className="h-4 w-4 mr-2" />
                View Full Syllabus
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
