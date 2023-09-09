import API from "./API";
import { Metric } from "@/types/Metric";

class MetricService {
  getTotals() {
    return API().get("/metric/total");
  }
}

export default new MetricService();
