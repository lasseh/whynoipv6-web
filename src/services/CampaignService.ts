import API from "./API";

class CampaignService {
  getCampaignList() {
    return API().get("/campaign");
  }
  getCampaign(uuid: string, offset: number) {
    return API().get(`/campaign/${encodeURIComponent(uuid)}?offset=${encodeURIComponent(offset)}`);
  }
  getCampaignDomain(uuid: string, domain: string) {
    return API().get(`/campaign/${encodeURIComponent(uuid)}/${encodeURIComponent(domain)}`);
  }
  searchDomain(domain: string, offset: number) {
    return API().get(`/campaign/search/${encodeURIComponent(domain)}?offset=${encodeURIComponent(offset)}`);
  }
}

export default new CampaignService();
