'use client';

import { Story } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ReviewEpisode } from './ReviewEpisode';

interface ReviewCardProps {
  story: Story;
}

export function ReviewCard({ story }: ReviewCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{story.story_name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-gray-600">{story.story_description}</p>

        {story.episodes.map((episode) => (
          <ReviewEpisode key={episode.id} episode={episode} storyId={story.id} />
        ))}
      </CardContent>
    </Card>
  );
}