// types/api/LoginResponse.ts

export interface LoginResponse {
  version: string;
  messages: MessageApiResponse[];
  userSessions: UserSessionApiResponse[];
  users: UserApiResponse[];
  emailAddresses: EmailAddressApiResponse[];
}

export interface MessageApiResponse {
  id: string;
  error: string;
  code: string;
  source: string;
  content: string;
}

export interface UserSessionApiResponse {
  id: string;
  userID: string;
  userAgent: string;
  source: string;
  expiration: number; // timestamp
}

export interface UserApiResponse {
  id: string;
  nickName: string;
  avatarID: string;
  color: number;
  authLevel: number;
  passwordBytes: string | null;
  salt: string | null;
  state: string;
  lastUpdate: number;
  invalidLogonTries: number;
}

export interface EmailAddressApiResponse {
  id: string;
  userID: string;
  address: string;
  verified: boolean;
  verificationCode: string | null;
}
