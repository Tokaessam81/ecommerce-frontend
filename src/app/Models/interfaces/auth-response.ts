export interface AuthResponse {
  result: {
    accessToken: string;
    refreshToken: string;
    expiration: string;
  };
  statusCode: number;
  message: string;
}