import API from "./API";

class CountryService {
  getCountryList() {
    return API().get("/country");
  }
  getCountryInfo(id: string) {
    return API().get(`/country/${id}`);
  }
}

export default new CountryService();
