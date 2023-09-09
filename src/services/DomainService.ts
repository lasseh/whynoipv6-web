import API from "./API";
import { Domain } from "@/types/Domain";

class DomainService {
  getDomainList(offset?: number) {
    const queryParam = offset !== undefined ? `?offset=${offset}` : "";
    return API().get(`/domain${queryParam}`);
  }
  getDomainHeroes(offset?: number) {
    const queryParam = offset !== undefined ? `?offset=${offset}` : "";
    return API().get(`/domain/heroes${queryParam}`);
  }
  getTopShame() {
    return API().get("/domain/topsinner");
  }
  getDomainDetails(domain: string) {
    return API().get(`/domain/${domain}`);
  }
  searchDomain(domain: string, offset: number) {
    const queryParam = offset !== undefined ? `?offset=${offset}` : "";
    return API().get(`/domain/search/${domain}${queryParam}`);
  }
}

export default new DomainService();
