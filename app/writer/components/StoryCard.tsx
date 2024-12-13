'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Story } from '@/lib/types';
import { EpisodeForm } from './EpisodeForm';
import { EpisodeList } from './EpisodeList';
import { useStories } from '@/lib/context/StoryContext';

interface StoryCardProps {
  story: Story;
}

export function StoryCard({ story }: StoryCardProps) {
  const { submitForReview } = useStories();
  const [isAddingEpisode, setIsAddingEpisode] = useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{story.story_name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-600">{story.story_description}</p>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Review Progress</span>
            <span className="text-sm">{Math.round(story.review_progress)}%</span>
          </div>
          <Progress value={story.review_progress} />
        </div>

        {isAddingEpisode && (
          <EpisodeForm storyId={story.id} onCancel={() => setIsAddingEpisode(false)} />
        )}

        <EpisodeList episodes={story.episodes} />

        <div className="flex space-x-4">
          <Button
            variant="outline"
            onClick={() => setIsAddingEpisode(!isAddingEpisode)}
          >
            {isAddingEpisode ? 'Cancel' : 'Add Episode'}
          </Button>
          {story.episodes.length > 0 && story.status === 'draft' && (
            <Button onClick={() => submitForReview(story.id)}>
              Submit for Review
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}