export namespace Changelog {
  export interface Log {
    id: number;
    ts: Date;
    domain: string;
    message: string;
    ipv6_status: boolean;
  }
}
