import API from "./API";
import { Country } from "@/types/Country";

class CountryService {
  getCountryList() {
    return API().get("/country");
  }
  getCountryInfo(id: string) {
    return API().get(`/country/${id}`);
  }
  getCountrySinners(id: string, offset: number) {
    return API().get(`/country/${id}/sinners?offset=${offset}`);
  }
  getCountryHeroes(id: string, offset: number) {
    return API().get(`/country/${id}/heroes?offset=${offset}`);
  }
}

export default new CountryService();
