'use client';

import React, { createContext, useContext, useState } from 'react';
import { Story, Episode } from '@/lib/types';

interface StoryContextType {
  stories: Story[];
  addStory: (storyData: Omit<Story, 'id' | 'episodes' | 'status' | 'review_progress'>) => void;
  addEpisode: (
    storyId: string,
    episodeData: Omit<Episode, 'id' | 'story_id' | 'status' | 'feedback' | 'highlights'>
  ) => void;
  updateEpisode: (storyId: string, episodeId: string, episodeData: Partial<Episode>) => void;
  submitForReview: (storyId: string) => void;
  addFeedback: (storyId: string, episodeId: string, feedback: string) => void;
  markEpisodeReviewed: (storyId: string, episodeId: string) => void;
  addHighlight: (storyId: string, episodeId: string, text: string, comment: string) => void;
}

const StoryContext = createContext<StoryContextType | undefined>(undefined);

export function StoryProvider({ children }: { children: React.ReactNode }) {
  const [stories, setStories] = useState<Story[]>([]);

  const addStory = (storyData: Omit<Story, 'id' | 'episodes' | 'status' | 'review_progress'>) => {
    const newStory: Story = {
      id: crypto.randomUUID(),
      ...storyData,
      episodes: [],
      status: 'draft',
      review_progress: 0,
    };
    setStories((prev) => [...prev, newStory]);
  };

  const addEpisode = (
    storyId: string,
    episodeData: Omit<Episode, 'id' | 'story_id' | 'status' | 'feedback' | 'highlights'>
  ) => {
    const newEpisode: Episode = {
      id: crypto.randomUUID(),
      story_id: storyId,
      ...episodeData,
      status: 'pending',
      feedback: [],
      highlights: [],
    };

    setStories((prev) =>
      prev.map((story) => {
        if (story.id === storyId) {
          return {
            ...story,
            episodes: [...story.episodes, newEpisode],
          };
        }
        return story;
      })
    );
  };

 const updateEpisode = (storyId: string, episodeId: string, episodeData: Partial<Episode>) => {
  console.log("Updating episode:", { storyId, episodeId, episodeData });
  setStories((prev) =>
    prev.map((story) => {
      if (story.id === storyId) {
        return {
          ...story,
          episodes: story.episodes.map((episode) =>
            episode.id === episodeId ? { ...episode, ...episodeData } : episode
          ),
        };
      }
      return story;
    })
  );
};


  const submitForReview = (storyId: string) => {
    setStories((prev) =>
      prev.map((story) =>
        story.id === storyId ? { ...story, status: 'in_review' } : story
      )
    );
  };

  const markEpisodeReviewed = (storyId: string, episodeId: string) => {
    setStories((prev) =>
      prev.map((story) => {
        if (story.id === storyId) {
          const updatedEpisodes = story.episodes.map((episode) =>
            episode.id === episodeId ? { ...episode, status: 'reviewed' } : episode
          );

          const reviewedCount = updatedEpisodes.filter((ep) => ep.status === 'reviewed').length;
          const progress = (reviewedCount / updatedEpisodes.length) * 100;

          return {
            ...story,
            episodes: updatedEpisodes,
            review_progress: progress,
            status: progress === 100 ? 'reviewed' : 'in_review',
          };
        }
        return story;
      })
    );
  };

  const addFeedback = (storyId: string, episodeId: string, feedback: string) => {
    setStories((prev) =>
      prev.map((story) =>
        story.id === storyId
          ? {
              ...story,
              episodes: story.episodes.map((episode) =>
                episode.id === episodeId
                  ? { ...episode, feedback: [...episode.feedback, feedback] }
                  : episode
              ),
            }
          : story
      )
    );
  };

  const addHighlight = (storyId: string, episodeId: string, text: string, comment: string) => {
    setStories((prev) =>
      prev.map((story) =>
        story.id === storyId
          ? {
              ...story,
              episodes: story.episodes.map((episode) =>
                episode.id === episodeId
                  ? {
                      ...episode,
                      highlights: [...(episode.highlights || []), { text, comment }],
                    }
                  : episode
              ),
            }
          : story
      )
    );
  };

  return (
    <StoryContext.Provider
      value={{
        stories,
        addStory,
        addEpisode,
        updateEpisode,
        submitForReview,
        addFeedback,
        markEpisodeReviewed,
        addHighlight,
      }}
    >
      {children}
    </StoryContext.Provider>
  );
}

export const useStories = () => {
  const context = useContext(StoryContext);
  if (!context) {
    throw new Error('useStories must be used within a StoryProvider');
  }
  return context;
};
