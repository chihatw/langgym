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
