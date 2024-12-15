export interface BlacklistEntry {
  account_name: string;
  discord_id: number | null;
  blacklisted_on: Date;
  reason: string;
  active: boolean;
}
