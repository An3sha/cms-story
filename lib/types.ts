export interface Story {
  id: string;
  story_name: string;
  story_description: string;
  episodes: Episode[];
  status: 'draft' | 'in_review' | 'reviewed';
  review_progress: number;
    // feedback: string[];
  // highlights?: Highlight[];
}

export interface Episode {
  id: string;
  story_id: string;
  episode_name: string;
  episode_description: string;
  episode_number: number;
  status: string;
  feedback: string[];
  highlights?: Highlight[];
}

export interface Highlight {
  text: string;
  comment: string;
}

export type UserRole = 'writer' | 'reviewer';

export interface User {
  role: UserRole;
  isAuthenticated: boolean;
}