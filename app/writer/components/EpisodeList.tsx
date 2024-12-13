'use client';

import { Episode } from '@/lib/types';

interface EpisodeListProps {
  episodes: Episode[];
}

export function EpisodeList({ episodes }: EpisodeListProps) {
  return (
    <div className="space-y-4">
      {episodes.map((episode) => (
        <div
          key={episode.id}
          className="p-4 bg-gray-100 rounded-lg space-y-2"
        >
          <h4 className="font-medium">
            Episode {episode.episode_number}: {episode.episode_name}
          </h4>
          <p className="text-sm text-gray-600">{episode.episode_description}</p>
          <div className="text-sm">
            Status:{' '}
            <span
              className={`font-medium ${
                episode.status === 'reviewed'
                  ? 'text-green-600'
                  : 'text-yellow-600'
              }`}
            >
              {episode.status}
            </span>
          </div>
          {episode.feedback.length > 0 && (
            <div className="space-y-1">
              <h5 className="text-sm font-medium">Feedback:</h5>
              {episode.feedback.map((comment, index) => (
                <p key={index} className="text-sm text-gray-600">
                  • {comment}
                </p>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}