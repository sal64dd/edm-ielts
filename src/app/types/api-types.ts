export interface iAPIResultv2<t = any> {
  success: boolean;
  reason?: 'SERVER_ERROR' | 'TIMEOUT' | 'NO_NETWORK';
  message?: string;
  data?: t;
}

export type iStatus =
  | 'error'
  | 'not-found'
  | 'found'
  | 'loading'
  | 'none';
