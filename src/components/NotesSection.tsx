
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { FileText, Plus, Search, BookOpen, Calendar } from 'lucide-react';
import { useState } from 'react';

export const NotesSection = () => {
  const [notes] = useState([
    {
      id: 1,
      title: 'Binary Search Trees',
      subject: 'Data Structures',
      content: 'BST properties: left child < parent < right child...',
      lastModified: '2024-01-19',
      tags: ['algorithms', 'trees', 'important'],
      wordCount: 450
    },
    {
      id: 2,
      title: 'Indian Constitution - Articles 1-50',
      subject: 'Polity',
      content: 'Fundamental Rights and their significance...',
      lastModified: '2024-01-18',
      tags: ['constitution', 'fundamental-rights'],
      wordCount: 780
    },
    {
      id: 3,
      title: 'Database Normalization',
      subject: 'DBMS',
      content: '1NF, 2NF, 3NF, BCNF forms and their applications...',
      lastModified: '2024-01-17',
      tags: ['database', 'normalization', 'theory'],
      wordCount: 320
    },
    {
      id: 4,
      title: 'Current Affairs - January Week 1',
      subject: 'Current Affairs',
      content: 'Important events and developments...',
      lastModified: '2024-01-16',
      tags: ['current-affairs', 'weekly', 'news'],
      wordCount: 620
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');

  const subjects = ['all', 'Data Structures', 'Polity', 'DBMS', 'Current Affairs'];

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesSubject = selectedSubject === 'all' || note.subject === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Notes</h2>
        <p className="text-gray-600 mt-1">Create, organize, and review your study notes.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Notes</p>
                <p className="text-2xl font-bold">{notes.length}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Words</p>
                <p className="text-2xl font-bold">{notes.reduce((sum, note) => sum + note.wordCount, 0)}</p>
              </div>
              <BookOpen className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Subjects</p>
                <p className="text-2xl font-bold">{new Set(notes.map(note => note.subject)).size}</p>
              </div>
              <Calendar className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search notes, content, tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-4">
              <select 
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                {subjects.map(subject => (
                  <option key={subject} value={subject}>
                    {subject === 'all' ? 'All Subjects' : subject}
                  </option>
                ))}
              </select>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Note
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNotes.map((note) => (
          <Card key={note.id} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">{note.title}</CardTitle>
              <Badge variant="outline" className="w-fit">
                {note.subject}
              </Badge>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {note.content}
              </p>
              
              <div className="space-y-3">
                <div className="flex flex-wrap gap-1">
                  {note.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex justify-between items-center text-xs text-gray-500 pt-2 border-t">
                  <span>{note.wordCount} words</span>
                  <span>Modified: {note.lastModified}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Note Creation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Quick Note
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input placeholder="Note title..." />
            <textarea 
              placeholder="Start writing your note here..."
              className="w-full p-3 border border-gray-300 rounded-md resize-none h-32"
            />
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <select className="border border-gray-300 rounded-md px-3 py-1 text-sm">
                  <option>Select Subject</option>
                  {subjects.slice(1).map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
                <Input placeholder="Tags (comma separated)" className="w-48" />
              </div>
              <Button>Save Note</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
