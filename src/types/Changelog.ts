export namespace Changelog {
  type DomainStatus = "supported" | "unsupported" | "no_record";
  export interface Log {
    id: number;
    ts: Date;
    domain: string;
    domain_url: string;
    message: string;
    ipv6_status: DomainStatus;
  }
}
