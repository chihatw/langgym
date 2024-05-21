export interface PathnameLog {
  id: number;
  uid: string;
  pathname: string;
  created_at: Date;
}

export interface PathnameLogView {
  uid: string | null;
  display: string | null;
  pathname: string | null;
  created_at: Date | null;
}
