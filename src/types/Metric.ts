export namespace Metric {
  export interface TotalData {
    top_1k: number;
    top_ns: number;
    total_ns: number;
    total_www: number;
    total_aaaa: number;
    total_both: number;
    total_sites: number;
  }

  export interface TotalMetric {
    time: Date;
    data: TotalData;
  }

  export type Totals = TotalMetric[];
}
