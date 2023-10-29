export namespace Campaign {
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
    v6_aaaa: boolean;
    v6_www: boolean;
    v6_ns: boolean;
    v6_curl: boolean;
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
