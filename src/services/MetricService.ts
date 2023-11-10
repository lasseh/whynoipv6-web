import API from "./API";
import { Metric } from "@/types/Metric";

class MetricService {
  getTotals() {
    return API().get("/metric/overview");
  }
  fetchAsnData(order?: string) {
    let url = "/metric/asn";
    if (order) {
      url += `?order=${encodeURIComponent(order)}`;
    }
    return API().get(url);
  }
  searchAsn(asn: string) {
    return API().get(`/metric/asn/search/${asn}`);
  }
}

export default new MetricService();
