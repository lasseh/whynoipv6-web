export namespace Domain {
  export interface Domain {
    rank: number;
    domain: string;
    v6_aaaa: boolean;
    v6_www: boolean;
    v6_ns: boolean;
    v6_curl: boolean;
    asn: string;
    country: string;
    ts_check: Date;
    ts_updated: Date;
  }
}
