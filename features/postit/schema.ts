export interface PostIt {
  id: number;
  uid: string;
}

export interface PostItItem {
  id: number;
  postit_id: number;
  index: number;
  japanese: string;
  image_url: string | null;
}

export interface PostItNote {
  id: number;
  uid: string;
}

export interface PostItNoteItem {
  id: number;
  postit_note_id: number;
  image_url: string;
  created_at: Date;
}

export interface PostItWorkout {
  id: number;
  uid: string;
  checked: number[];
  topic: string;
  japanese: string;
  japanese_passed: boolean;
  descriptions: string[];
  three_topics_image_urls: string[];
  three_topics_passed: boolean;
  ordered_image_url: string;
  ordered_passed: boolean;
  one_topic_image_url: string;
  one_topic_passed: boolean;
  one_sentence_image_url: string;
  one_sentence_passed: boolean;
}
