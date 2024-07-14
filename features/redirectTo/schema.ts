export interface RedirectTo {
  id: number;
  uid: string;
  redirect_to: string;
  updated_at: Date;
}

export interface RedirectToView {
  id: number | null;
  uid: string | null;
  display: string | null;
  redirect_to: string | null;
  updated_at: Date | null;
}
