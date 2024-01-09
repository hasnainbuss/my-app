export interface ApplicationUser {
  id?: string;
  firstName?: string;
  lastName?: string;
  userName?: string;
  email?: string;
  token?: string;
  role?: string; // Admin,User
}
