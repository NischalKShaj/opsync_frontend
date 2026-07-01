export interface User {
  id: string;
  userId?: string;
  email: string;
  name: string;
  organizationId?: string;
  role?: string;
  designation?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  organizationName: string;
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  data: {
    accessToken: string;
    refreshToken: string;
    user: {
      id?: string;
      userId?: string;
      email: string;
      name: string;
    };
    mustChangePassword?: boolean;
    organization?: {
      organizationId: string;
      name: string;
    };
  };
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}
