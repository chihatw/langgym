export interface PathnameLog {
  id: number;
  uid: string;
  pathname: string;
  created_at: Date;
  removed_at: Date | null;
}

export interface PathnameLogView {
  uid: string | null;
  display: string | null;
  pathname: string | null;
  created_at: Date | null;
  removed_at: Date | null;
}
