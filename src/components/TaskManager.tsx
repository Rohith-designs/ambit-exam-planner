
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckSquare, Plus, Calendar, Flag } from 'lucide-react';
import { useState } from 'react';

export const TaskManager = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Complete Data Structures Chapter 5',
      subject: 'Computer Science',
      priority: 'high',
      dueDate: '2024-01-22',
      completed: false,
      type: 'study'
    },
    {
      id: 2,
      title: 'Solve 20 Aptitude Questions',
      subject: 'Quantitative Aptitude',
      priority: 'medium',
      dueDate: '2024-01-21',
      completed: true,
      type: 'practice'
    },
    {
      id: 3,
      title: 'Read Current Affairs - Week 3',
      subject: 'General Studies',
      priority: 'high',
      dueDate: '2024-01-20',
      completed: false,
      type: 'reading'
    },
    {
      id: 4,
      title: 'Revise Database Concepts',
      subject: 'Computer Science',
      priority: 'low',
      dueDate: '2024-01-25',
      completed: false,
      type: 'revision'
    }
  ]);

  const toggleTask = (taskId: number) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'study': return 'bg-blue-100 text-blue-800';
      case 'practice': return 'bg-purple-100 text-purple-800';
      case 'reading': return 'bg-orange-100 text-orange-800';
      case 'revision': return 'bg-cyan-100 text-cyan-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const completionRate = (completedTasks / totalTasks) * 100;

  const pendingTasks = tasks.filter(task => !task.completed);
  const overdueTasks = pendingTasks.filter(task => new Date(task.dueDate) < new Date());

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Task Manager</h2>
        <p className="text-gray-600 mt-1">Organize and track your daily study goals.</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Tasks</p>
                <p className="text-2xl font-bold">{totalTasks}</p>
              </div>
              <CheckSquare className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-green-600">{completedTasks}</p>
              </div>
              <CheckSquare className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-orange-600">{pendingTasks.length}</p>
              </div>
              <Calendar className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Overdue</p>
                <p className="text-2xl font-bold text-red-600">{overdueTasks.length}</p>
              </div>
              <Flag className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Bar */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold">Overall Progress</h3>
            <span className="text-sm text-gray-600">{completedTasks}/{totalTasks} tasks</span>
          </div>
          <Progress value={completionRate} className="h-3" />
          <p className="text-sm text-gray-500 mt-2">{Math.round(completionRate)}% complete</p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Tasks */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Pending Tasks</span>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Task
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingTasks.map((task) => (
                <div key={task.id} className="flex items-center gap-3 p-3 rounded-lg border hover:shadow-sm">
                  <Checkbox 
                    checked={task.completed}
                    onCheckedChange={() => toggleTask(task.id)}
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{task.title}</h3>
                    <p className="text-sm text-gray-600">{task.subject}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="secondary" className={getPriorityColor(task.priority)}>
                        {task.priority}
                      </Badge>
                      <Badge variant="outline" className={getTypeColor(task.type)}>
                        {task.type}
                      </Badge>
                      <span className="text-xs text-gray-500">Due: {task.dueDate}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Completed Tasks */}
        <Card>
          <CardHeader>
            <CardTitle>Completed Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {tasks.filter(task => task.completed).map((task) => (
                <div key={task.id} className="flex items-center gap-3 p-3 rounded-lg border bg-green-50">
                  <Checkbox 
                    checked={task.completed}
                    onCheckedChange={() => toggleTask(task.id)}
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 line-through">{task.title}</h3>
                    <p className="text-sm text-gray-600">{task.subject}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="secondary" className="bg-green-200 text-green-800">
                        completed
                      </Badge>
                      <span className="text-xs text-gray-500">Completed</span>
                    </div>
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
