import API from "./API";

class CampaignService {
  getCampaignList() {
    return API().get("/campaign");
  }
  getCampaign(uuid: string) {
    return API().get(`/campaign/${uuid}`);
  }
   getCampaign2(uuid: string, offset: number) {
    return API().get(`/campaign/${uuid}?offset=${offset}`);
  }
  getCampaignDomain(uuid: string, domain: string) {
    return API().get(`/campaign/${uuid}/${domain}`);
  }
  SearchDomain(domain: string, offset: number) {
    return API().get(`/campaign/search/${domain}?offset=${offset}`);
  }
}

export default new CampaignService();
