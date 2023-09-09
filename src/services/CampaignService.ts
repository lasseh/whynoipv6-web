import API from "./API";
import { Campaign } from "@/types/Campaign";

class CampaignService {
  getCampaignList() {
    return API().get("/campaign");
  }
  getCampaign(uuid: string, offset: number) {
    return API().get(`/campaign/${uuid}?offset=${offset}`);
  }
  getCampaignDomain(uuid: string, domain: string) {
    return API().get(`/campaign/${uuid}/${domain}`);
  }
  searchDomain(domain: string, offset: number) {
    return API().get(`/campaign/search/${domain}?offset=${offset}`);
  }

  // Calculations
  calculateCampaignRating(campaign: Campaign.Campaign) {
    const { count, v6_ready } = campaign;
    const ratingPercentage = (v6_ready / count) * 100;

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

export default new CampaignService();
