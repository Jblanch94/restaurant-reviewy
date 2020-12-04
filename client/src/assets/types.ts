export interface User {
  isadmin?: boolean;
  first_name?: string;
  last_name?: string;
  review_count?: number;
  username?: string;
  user_id?: number;
}

export interface Auth {
  error: string;
  token: string;
  isAuthenticated: boolean;
}

export interface Errors {
  first_name: string;
  last_name: string;
  username: string;
  password: string;
}
