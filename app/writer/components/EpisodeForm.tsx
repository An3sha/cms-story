'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useStories } from '@/lib/context/StoryContext';

interface EpisodeFormProps {
  storyId: string;
  onCancel: () => void;
}

export function EpisodeForm({ storyId, onCancel }: EpisodeFormProps) {
  const { addEpisode } = useStories();
  const [newEpisode, setNewEpisode] = useState({
    episode_name: '',
    episode_description: '',
    episode_number: 1,
  });

  const handleCreateEpisode = () => {
    if (newEpisode.episode_name && newEpisode.episode_description) {
      addEpisode(storyId, newEpisode);
      onCancel();
    }
  };

  return (
    <div className="space-y-4 mt-4">
      <Input
        placeholder="Episode Name"
        value={newEpisode.episode_name}
        onChange={(e) =>
          setNewEpisode({ ...newEpisode, episode_name: e.target.value })
        }
      />
      <Textarea
        placeholder="Episode Description"
        value={newEpisode.episode_description}
        onChange={(e) =>
          setNewEpisode({ ...newEpisode, episode_description: e.target.value })
        }
      />
      <Input
        type="number"
        placeholder="Episode Number"
        value={newEpisode.episode_number}
        onChange={(e) =>
          setNewEpisode({
            ...newEpisode,
            episode_number: parseInt(e.target.value),
          })
        }
      />
      <div className="flex space-x-2">
        <Button onClick={handleCreateEpisode}>Add Episode</Button>
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
}