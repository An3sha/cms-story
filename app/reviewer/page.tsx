'use client';

import { useAuth } from '@/lib/context/AuthContext';
import { useStories } from '@/lib/context/StoryContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { ReviewCard } from './components/ReviewCard';

export default function ReviewerDashboard() {
  const { logout } = useAuth();
  const router = useRouter();
  const { stories } = useStories();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const storiesForReview = stories.filter((story) => story.status === 'in_review');

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Reviewer Dashboard</h1>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>

        {storiesForReview.length === 0 ? (
          <Card>
            <CardContent className="p-6">
              <p className="text-center text-gray-600">No stories to review at the moment.</p>
            </CardContent>
          </Card>
        ) : (
          storiesForReview.map((story) => (
            <ReviewCard key={story.id} story={story} />
          ))
        )}
      </div>
    </div>
  );
}