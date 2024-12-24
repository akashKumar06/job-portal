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

  async getJobSeekerApplications() {
    try {
      const apiRes = await fetch(`${this.apiUrl}/jobseeker/getall`, {
        credentials: "include",
      });
      const res = await apiRes.json();
      if (!res.success) throw new Error(res.message);
      return res;
    } catch (error) {
      throw error;
    }
  }

  async getEmployerApplications() {
    try {
      const apiRes = await fetch(`${this.apiUrl}/employer/getall`, {
        credentials: "include",
      });
      const res = await apiRes.json();
      if (!res.success) throw new Error(res.message);
      return res;
    } catch (error) {
      throw error;
    }
  }

  async getApplications(role) {
    if (role === "Job Seeker") {
      const data = await this.getJobSeekerApplications();
      return data;
    }
    return await this.getEmployerApplications();
  }

  async deleteApplication(id) {
    try {
      const apiRes = await fetch(`${this.apiUrl}/delete/${id}`, {
        credentials: "include",
        method: "DELETE",
        headers: {
          ContentType: "application/json",
        },
      });
      const res = await apiRes.json();
      if (!res.success) throw new Error(res.message);
      return res;
    } catch (error) {
      throw error;
    }
  }
}

const applicationService = new ApplicationService();
export default applicationService;
