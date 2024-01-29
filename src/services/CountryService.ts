import API from "./API";

class CountryService {
  getCountryList() {
    return API().get("/country");
  }
  getCountryInfo(id: string) {
    return API().get(`/country/${encodeURIComponent(id)}`);
  }
  getCountrySinners(id: string, offset: number) {
    return API().get(`/country/${encodeURIComponent(id)}/sinners?offset=${encodeURIComponent(offset)}`);
  }
  getCountryHeroes(id: string, offset: number) {
    return API().get(`/country/${encodeURIComponent(id)}/heroes?offset=${encodeURIComponent(offset)}`);
  }
}

export default new CountryService();
