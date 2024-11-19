class JobsService {
  apiUrl = "";
  constructor() {
    this.apiUrl = "http://localhost:8000/api/v1/jobs/";
  }

  async fetchAllJobs(city, niche, keyword) {
    let queryParam = [];
    if (city) {
      queryParam.push(`city=${city}`);
    }
    if (niche) {
      queryParam.push(`niche=${niche}`);
    }
    if (keyword) {
      queryParam.push(`keyword=${keyword}`);
    }
    const params = queryParam.join("&");
    const res = await fetch(`${this.apiUrl}?${params}`);
    const data = await res.json();
    return data.jobs;
  }
}

const jobsService = new JobsService();
export default jobsService;
