export interface Job {
  id: number;
  server_id: number;
  name: string;
  description: string;
  command: string;
  type: string;
  cron_entry: string;
  active: boolean
}
