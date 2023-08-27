import API from "./API";

class DomainService {
  getDomainList() {
    return API().get("/domain");
  }
  getDomainHeroes() {
    return API().get("/domain/heroes");
  }
  getTopShame() {
    return API().get("/domain/shamers");
  }
  getDomainDetails(domain: string) {
    return API().get(`/domain/${domain}`);
  }
  SearchDomain(domain: string, offset: number) {
    return API().get(`/domain/search/${domain}?offset=${offset}`);
  }
}

export default new DomainService();
