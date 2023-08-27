import API from "./API";

class MetricService {
  getTotals() {
    return API().get("/metric/total");
  }
}

export default new MetricService();
