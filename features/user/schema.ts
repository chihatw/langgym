export interface AppUser {
  uid: string;
  display: string;
  created_at: Date;
  realtime: boolean;
  realtimePage: string; // todo will delete AppUser.realtimePage
  redirectTo: string;
  updated_at: Date;
}
