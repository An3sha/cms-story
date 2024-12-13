'use client';

import { useState } from 'react';
import { Episode } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Check, MessageSquare } from 'lucide-react';
import { useStories } from '@/lib/context/StoryContext';

interface ReviewEpisodeProps {
  episode: Episode;
  storyId: string;
}

export function ReviewEpisode({ episode, storyId }: ReviewEpisodeProps) {
  const { addFeedback, markEpisodeReviewed, addHighlight } = useStories();
  const [feedback, setFeedback] = useState('');
  const [selectedText, setSelectedText] = useState('');
  const [highlightComment, setHighlightComment] = useState('');

  const handleTextSelection = () => {
    const selection = window.getSelection();
    if (selection && selection.toString()) {
      setSelectedText(selection.toString());
    }
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg space-y-4">
      <h3 className="text-xl font-semibold">
        Episode {episode.episode_number}: {episode.episode_name}
      </h3>
      <div className="prose max-w-none" onMouseUp={handleTextSelection}>
        <p>{episode.episode_description}</p>
      </div>

      {selectedText && (
        <div className="space-y-2">
          <Textarea
            placeholder="Add comment for highlighted text"
            value={highlightComment}
            onChange={(e) => setHighlightComment(e.target.value)}
          />
          <Button
            onClick={() => {
              if (highlightComment) {
                addHighlight(storyId, episode.id, selectedText, highlightComment);
                setSelectedText('');
                setHighlightComment('');
              }
            }}
          >
            Add Highlight Comment
          </Button>
        </div>
      )}

      {episode.highlights && episode.highlights.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-medium">Highlights:</h4>
          {episode.highlights.map((highlight, index) => (
            <div key={index} className="bg-yellow-100 p-3 rounded-md space-y-1">
              <p className="text-sm font-medium">"{highlight.text}"</p>
              <p className="text-sm text-gray-600">{highlight.comment}</p>
            </div>
          ))}
        </div>
      )}

      <div className="space-y-2">
        <Textarea
          placeholder="Add feedback for this episode"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />
        <div className="flex space-x-2">
          <Button
            onClick={() => {
              if (feedback) {
                addFeedback(storyId, episode.id, feedback);
                setFeedback('');
              }
            }}
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            Add Feedback
          </Button>
          <Button
            variant="outline"
            onClick={() => markEpisodeReviewed(storyId, episode.id)}
            disabled={episode.status === 'reviewed'}
          >
            <Check className="mr-2 h-4 w-4" />
            Mark as Reviewed
          </Button>
        </div>
      </div>

      {episode.feedback.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-medium">Previous Feedback:</h4>
          {episode.feedback.map((comment, index) => (
            <p key={index} className="text-sm text-gray-600">
              • {comment}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}