export class User {
  name: string;
  surname: string;
  userName: string;
  emailAddress: string;
  profileImg?: string;
  phoneNumber: string | null;
  profilePictureId: number | null;
  isEmailConfirmed: boolean;
  roles: any[];
  lastLoginTime: string | null;
  isActive: boolean;
  creationTime: string;
  id: number;
  token?: string;
}
