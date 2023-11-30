import API from "./API";
import { Domain } from "@/types/Domain";

class DomainService {
  getQueryParam(offset?: number) {
    return offset !== undefined ? `?offset=${encodeURIComponent(offset)}` : "";
  }
  getDomainList(offset?: number) {
    return API().get(`/domain${this.getQueryParam(offset)}`);
  }
  getDomainHeroes(offset?: number) {
    return API().get(`/domain/heroes${this.getQueryParam(offset)}`);
  }
  getTopShame() {
    return API().get("/domain/topsinner");
  }
  getDomainDetails(domain: string) {
    return API().get(`/domain/${encodeURIComponent(domain)}`);
  }
  searchDomain(domain: string, offset: number) {
    return API().get(`/domain/search/${encodeURIComponent(domain)}${this.getQueryParam(offset)}`);
  }
}

export default new DomainService();
