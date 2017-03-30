export interface Server {
  id: number;
  name: string;
  description: string;
  address: string;
  port: number;
  user: string
  auth: string
  error_message: string;
  syncing: boolean;
}
