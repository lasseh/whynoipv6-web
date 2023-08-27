export namespace Country {
  export interface Country {
    country: string;
    country_code: string;
    sites: number;
    v6sites: number;
    percent: number;
  }

  export interface CountryDomain {
    rank: number;
    domain: string;
    v6_aaaa: boolean;
    v6_www: boolean;
    v6_ns: boolean;
    v6_curl: boolean;
    asn: string;
    country: string;
    ts_check: string;
  }
}
