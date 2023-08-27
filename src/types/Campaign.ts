export namespace Campaign {
  export interface Campaign {
    id: number;
    uuid: string;
    name: string;
    description: string;
    count: number;
  }

  export interface CampaignDomain {
    domain: string;
    v6_aaaa: boolean;
    v6_www: boolean;
    v6_ns: boolean;
    asn: string;
    v6_curl: boolean;
    country: string;
    ts_aaaa: Date;
    ts_www: Date;
    ts_ns: Date;
    ts_curl: Date;
    ts_check: Date;
    ts_updated: Date;
  }
}
