export namespace Campaign {
  type DomainStatus = "supported" | "unsupported" | "no_record";

  export interface Campaign {
    id: number;
    uuid: string;
    name: string;
    description: string;
    count: number;
    v6_ready: number;
    rating: string;
    colorClass: string;
    percent: number;
  }

  export interface CampaignDomain {
    domain: string;
    base_domain: DomainStatus;
    www_domain: DomainStatus;
    nameserver: DomainStatus;
    mx_record: DomainStatus;
    v6_only: DomainStatus;
    ts_aaaa: Date;
    ts_www: Date;
    ts_ns: Date;
    ts_curl: Date;
    ts_check: Date;
    ts_updated: Date;
    asn: string;
    country: string;
    campaign_uuid: string;
  }
}
