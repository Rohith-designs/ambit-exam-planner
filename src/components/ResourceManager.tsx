
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Upload, FileText, Video, ExternalLink, Search, Filter } from 'lucide-react';
import { useState } from 'react';

export const ResourceManager = () => {
  const [resources] = useState([
    {
      id: 1,
      name: 'Data Structures Complete Guide.pdf',
      type: 'pdf',
      subject: 'Computer Science',
      size: '2.4 MB',
      uploadDate: '2024-01-15',
      tags: ['important', 'theory']
    },
    {
      id: 2,
      name: 'UPSC Previous Years Papers',
      type: 'link',
      subject: 'General Studies',
      url: 'https://example.com',
      uploadDate: '2024-01-14',
      tags: ['practice', 'previous-year']
    },
    {
      id: 3,
      name: 'Database Concepts Video Series',
      type: 'video',
      subject: 'Computer Science',
      duration: '45 min',
      uploadDate: '2024-01-13',
      tags: ['video', 'comprehensive']
    },
    {
      id: 4,
      name: 'Current Affairs January 2024.docx',
      type: 'document',
      subject: 'Current Affairs',
      size: '1.8 MB',
      uploadDate: '2024-01-12',
      tags: ['current-affairs', 'monthly']
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');

  const subjects = ['all', 'Computer Science', 'General Studies', 'Current Affairs'];

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf':
      case 'document':
        return <FileText className="h-8 w-8 text-red-500" />;
      case 'video':
        return <Video className="h-8 w-8 text-blue-500" />;
      case 'link':
        return <ExternalLink className="h-8 w-8 text-green-500" />;
      default:
        return <FileText className="h-8 w-8 text-gray-500" />;
    }
  };

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesSubject = selectedSubject === 'all' || resource.subject === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Resource Manager</h2>
        <p className="text-gray-600 mt-1">Upload, organize, and access your study materials.</p>
      </div>

      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload New Resource
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer">
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-lg font-medium text-gray-900 mb-2">Drop files here or click to upload</p>
            <p className="text-sm text-gray-500 mb-4">Support for PDFs, videos, documents, and links</p>
            <Button>Choose Files</Button>
          </div>
        </CardContent>
      </Card>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search resources, tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-500" />
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
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((resource) => (
          <Card key={resource.id} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                {getFileIcon(resource.type)}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 truncate mb-2">{resource.name}</h3>
                  <div className="space-y-2">
                    <Badge variant="outline">{resource.subject}</Badge>
                    <div className="flex flex-wrap gap-1">
                      {resource.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="text-sm text-gray-500 space-y-1">
                      {resource.size && <p>Size: {resource.size}</p>}
                      {resource.duration && <p>Duration: {resource.duration}</p>}
                      <p>Uploaded: {resource.uploadDate}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t">
                <Button variant="outline" size="sm" className="w-full">
                  {resource.type === 'link' ? 'Open Link' : 'Download'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
