class ApplicationService {
  apiUrl = "";
  constructor() {
    this.apiUrl = "http://localhost:8000/api/v1/applications";
  }

  async applyJob(applicant, id) {
    try {
      const res = await fetch(`${this.apiUrl}/apply/${id}`, {
        method: "POST",
        credentials: "include",
        body: applicant,
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async getApplications() {
    try {
      const res = await fetch(`${this.apiUrl}/`, {
        credentials: "include",
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      return data;
    } catch (error) {
      throw error;
    }
  }
}

const applicationService = new ApplicationService();
export default applicationService;
