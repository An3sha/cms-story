"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useStories } from "@/lib/context/StoryContext";

interface EpisodeFormProps {
  storyId: string;
  onCancel: () => void;
  editFeedback?: boolean;
  episodeId?: string; 
  initialDescription?: string;
}

export function EpisodeForm({
  storyId,
  onCancel,
  editFeedback = false,
  episodeId,
  initialDescription = "",
}: EpisodeFormProps) {
  const { addEpisode, updateEpisode } = useStories();


  const [newEpisode, setNewEpisode] = useState({
    episode_name: "",
    episode_description: initialDescription,
    episode_number: 1,
  });

  const [newEpisodeDescription, setNewEpisodeDescription] = useState(initialDescription);

  useEffect(() => {
    if (editFeedback) {
      setNewEpisodeDescription(initialDescription);
    } else {
      setNewEpisode({
        episode_name: "",
        episode_description: "",
        episode_number: 1,
      });
    }
  }, [editFeedback, initialDescription]);

  const handleCreateEpisode = () => {
    if (newEpisode.episode_name.trim() && newEpisode.episode_description.trim()) {
      addEpisode(storyId, newEpisode);
      onCancel();
    }
  };

const handleSaveEpisode = () => {
  if (editFeedback && episodeId && newEpisodeDescription.trim()) {
    updateEpisode(storyId, episodeId, {
      episode_description: newEpisodeDescription.trim(),
    });
    console.log("Episode updated successfully.");
    onCancel(); 
  } else {
    console.warn("Episode ID or description missing.");
  }
};




  const handleEpisodeNumberChange = (value: string) => {
    const number = parseInt(value, 10);
    if (!isNaN(number) && number > 0) {
      setNewEpisode((prev) => ({
        ...prev,
        episode_number: number,
      }));
    }
  };

  return (
    <>
      {editFeedback ? (
        <div className="space-y-4 mt-4">
          <Textarea
  placeholder="Episode Description"
  value={newEpisodeDescription}
  onChange={(e) => setNewEpisodeDescription(e.target.value)}
/>

          <div className="flex space-x-2">
            <Button onClick={handleSaveEpisode}>Save</Button>
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-4 mt-4">
          <Input
            placeholder="Episode Name"
            value={newEpisode.episode_name}
            onChange={(e) =>
              setNewEpisode((prev) => ({
                ...prev,
                episode_name: e.target.value,
              }))
            }
          />
          <Textarea
            placeholder="Episode Description"
            value={newEpisode.episode_description}
            onChange={(e) =>
              setNewEpisode((prev) => ({
                ...prev,
                episode_description: e.target.value,
              }))
            }
          />
          <Input
            type="number"
            placeholder="Episode Number"
            value={newEpisode.episode_number}
            onChange={(e) => handleEpisodeNumberChange(e.target.value)}
          />
          <div className="flex space-x-2">
            <Button onClick={handleCreateEpisode}>Add Episode</Button>
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
