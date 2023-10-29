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
}

export default new CampaignService();
