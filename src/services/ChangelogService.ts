import API from "./API";
import { Changelog } from "@/types/Changelog";

class ChangelogService {
  getChangelog(offset: number) {
    return API().get(`/changelog?offset=${offset}`);
  }
  getCampaignChangelog(offset: number) {
    return API().get(`/changelog/campaign?offset=${offset}`);
  }
  getChangelogByDomain(domain: string) {
    return API().get(`/changelog/${domain}`);
  }
  getChangelogByCampaign(uuid: string) {
    return API().get(`/changelog/campaign/${uuid}`);
  }
  getChangelogByCampaignDomain(uuid: string, domain: string) {
    return API().get(`/changelog/campaign/${uuid}/${domain}`);
  }
}

export default new ChangelogService();
