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

export class UserRolePage {
  level: number;
  parentName: string | null;
  name: string | null;
  displayName: string | null;
  description: string | null;
  isGrantedByDefault: boolean;
}

export class UserRole {
  name: string;
  displayName: string;
  isStatic: boolean;
  isDefault: boolean;
  creationTime: string;
  id: number;
}
