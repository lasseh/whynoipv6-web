import API from "./API";
import { Changelog } from "@/types/Changelog";

class ChangelogService {
  getChangelog(offset: number) {
    return API().get(`/changelog?offset=${offset}`);
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
