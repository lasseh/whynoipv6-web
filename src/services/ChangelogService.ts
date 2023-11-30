import API from "./API";
import { Changelog } from "@/types/Changelog";

class ChangelogService {
  getChangelog(offset: number) {
    return API().get(`/changelog?offset=${encodeURIComponent(offset)}`);
  }
  getCampaignChangelog(offset: number) {
    return API().get(`/changelog/campaign?offset=${encodeURIComponent(offset)}`);
  }
  getChangelogByDomain(domain: string) {
    return API().get(`/changelog/${encodeURIComponent(domain)}`);
  }
  getChangelogByCampaign(uuid: string) {
    return API().get(`/changelog/campaign/${encodeURIComponent(uuid)}`);
  }
  getChangelogByCampaignDomain(uuid: string, domain: string) {
    return API().get(`/changelog/campaign/${encodeURIComponent(uuid)}/${encodeURIComponent(domain)}`);
  }
}

export default new ChangelogService();
