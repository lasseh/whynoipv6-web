import API from "./API";

class ChangelogService {
  getChangelog() {
    return API().get("/changelog");
  }
  getDomainChangelog(domain: string) {
    return API().get(`/changelog/${domain}`);
  }
  getCampaignChangelog(uuid: string) {
    return API().get(`/changelog/campaign/${uuid}`);
  }
  getCampaignChangelogByDomain(uuid: string, domain: string) {
    return API().get(`/changelog/campaign/${uuid}/${domain}`);
  }
}

export default new ChangelogService();
