export interface iWord {
  word: string;
  id: string;
  node: HTMLElement;
  highlightRanges: iHighlightRange[];
  highlighted: boolean;
}

export interface iHighlightRange {
  start: HTMLElement | null;
  end: HTMLElement | null;
}

export type DefinationStatus =
  | 'error'
  | 'not-found'
  | 'found'
  | 'loading'
  | 'none';

export interface iHighlightRangeID {
  startId: string;
  endId: string;
  text?: string;
}

export interface iBookmark {
  id: string;
  ranges: iHighlightRangeID[];
  text?: string;
  address?: { name: string; link: string };
}
