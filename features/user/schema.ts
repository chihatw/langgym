export interface AppUser {
  uid: string;
  display: string;
  created_at: Date;
  realtime: boolean; // todo will delete AppUser.realtime
  realtimePage: string; // todo will delete AppUser.realtimePage
  // redirectTo: string;
  // updated_at: Date;
}
