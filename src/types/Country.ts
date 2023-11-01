export namespace Country {
  export interface Country {
    country: string;
    country_code: string;
    sites: number;
    v6sites: number;
    percent: number;
    rating: string;
    colorClass: string;
    gradientColor?: string;
  }

  // export interface CountryDomain {
  //   rank: number;
  //   domain: string;
  //   v6_aaaa: boolean;
  //   v6_www: boolean;
  //   v6_ns: boolean;
  //   v6_curl: boolean;
  //   asn: string;
  //   country: string;
  //   ts_aaaa: Date;
  //   ts_www: Date;
  //   ts_ns: Date;
  //   ts_curl: Date;
  //   ts_check: Date;
  //   ts_updated: Date;
  // }
}
