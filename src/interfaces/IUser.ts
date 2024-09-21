export interface IUser {
  username: string;
  firstName: string;
  lastName: string;
  title: string;
  email: string;
  profilePicture: string | undefined;
  isAuthenticated: boolean;
}

export interface IUserResponse {
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  profilePicture: string | undefined;
  title: string;
}
