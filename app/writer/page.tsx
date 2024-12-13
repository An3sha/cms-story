'use client';

import { useAuth } from '@/lib/context/AuthContext';
import { useStories } from '@/lib/context/StoryContext';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { CreateStoryForm } from './components/CreateStoryForm';
import { StoryCard } from './components/StoryCard';

export default function WriterDashboard() {
  const { logout } = useAuth();
  const router = useRouter();
  const { stories } = useStories();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Writer Dashboard</h1>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>

        <CreateStoryForm />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {stories.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      </div>
    </div>
  );
}