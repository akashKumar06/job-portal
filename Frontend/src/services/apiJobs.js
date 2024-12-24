class JobsService {
  apiUrl = "";
  constructor() {
    this.apiUrl = "http://localhost:8000/api/v1/jobs";
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

  async fetchJobById(id) {
    try {
      const res = await fetch(`${this.apiUrl}/${id}`, {
        credentials: "include",
      });
      const data = await res.json();
      return data.job;
    } catch (error) {
      console.log(error);
    }
  }

  async postJob(job) {
    try {
      const apiRes = await fetch(`${this.apiUrl}/post`, {
        credentials: "include",
        method: "POST",
        body: JSON.stringify(job),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const res = await apiRes.json();
      if (!res.success) throw new Error(res.message);
      return res;
    } catch (error) {
      throw error;
    }
  }

  async deleteJob(id) {
    console.log(id);
    try {
      const apiRes = await fetch(`${this.apiUrl}/delete/${id}`, {
        credentials: "include",
        method: "DELETE",
      });
      const res = await apiRes.json();
      if (!res.success) throw new Error(res.message);
      return res;
    } catch (error) {
      throw error;
    }
  }
}

const jobsService = new JobsService();
export default jobsService;
