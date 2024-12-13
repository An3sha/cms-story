'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { PlusCircle } from 'lucide-react';
import { useStories } from '@/lib/context/StoryContext';

export function CreateStoryForm() {
  const { addStory } = useStories();
  const [newStory, setNewStory] = useState({ story_name: '', story_description: '' });

  const handleCreateStory = () => {
    if (newStory.story_name && newStory.story_description) {
      addStory(newStory);
      setNewStory({ story_name: '', story_description: '' });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Story</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          placeholder="Story Name"
          value={newStory.story_name}
          onChange={(e) => setNewStory({ ...newStory, story_name: e.target.value })}
        />
        <Textarea
          placeholder="Story Description"
          value={newStory.story_description}
          onChange={(e) => setNewStory({ ...newStory, story_description: e.target.value })}
        />
        <Button onClick={handleCreateStory}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Story
        </Button>
      </CardContent>
    </Card>
  );
}