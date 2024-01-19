export namespace Metric {
  export interface TotalData {
    domains: number;
    base_domain: number;
    www_domain: number;
    nameserver: number;
    mx_record: number;
    heroes: number;
    top_heroes: number;
    top_nameserver: number;
  }

  export interface TotalMetric {
    time: Date;
    data: TotalData;
  }

  export type Totals = TotalMetric[];

  export interface ASN {
    name: string;
    number: number;
    count_v4: number;
    count_v6: number;
    percent_v4?: number;
    percent_v6?: number;
  }
}
