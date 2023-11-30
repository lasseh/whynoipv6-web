import API from "./API";
import { Metric } from "@/types/Metric";

class MetricService {
  getQueryParam(order?: string) {
    return order ? `?order=${encodeURIComponent(order)}` : "";
  }
  getTotals() {
    return API().get("/metric/overview");
  }
  fetchAsnData(order?: string) {
    const url = `/metric/asn${this.getQueryParam(order)}`;
    return API().get(url);
  }
  searchAsn(asn: string) {
    return API().get(`/metric/asn/search/${encodeURIComponent(asn)}`);
  }
}

export default new MetricService();
