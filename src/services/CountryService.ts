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
  // Calculations
  calculateCountryRating(country: Country.Country) {
    const { sites, v6sites } = country;
    const ratingPercentage = (v6sites / sites) * 100;

    let rating = "";
    let colorClass = "";

    if (ratingPercentage >= 60) {
      rating = "Good";
      colorClass = "bg-emerald-400/30 text-emerald-400";
    } else if (ratingPercentage >= 40) {
      rating = "Medium";
      colorClass = "bg-amber-400/30 text-amber-400";
    } else {
      rating = "Bad";
      colorClass = "bg-rose-400/30 text-rose-400";
    }

    return { rating, colorClass };
  }
}

export default new CountryService();
