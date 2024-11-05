import cron from "node-cron";
import Job from "../models/job.model.js";
import User from "../models/user.model.js";
import { sendEmail } from "../utils/sendMail.js";

function newsLetterCron() {
  cron.schedule("*/1 * * * *", async function () {
    const jobs = await Job.find({ newsLettersSend: false });
    console.log(jobs);
    jobs.forEach(async (job) => {
      try {
        const filteresUsers = await User.find({
          $or: [
            { "niches.firstNiche": job.jobNiche },
            { "niches.secondNiche": job.jobNiche },
            { "niches.thirdNiche": job.jobNiche },
          ],
        });

        filteresUsers.forEach(async (user) => {
          const subject = `Exciting Opportunity at ${job.companyName}`;
          const message = `Dear ${user.name},\n\nThank you for your interest in joining our team at ${job.companyName}. We were impressed with your background and experience and are excited to explore the possibility of working together.Based on our initial review, we believe your skills could be an excellent fit for our ${job.title} position. We would love to schedule a conversation to learn more about your experience and discuss how you could contribute to our team.\n\nPlease let us know your availability over the next few days, and we will do our best to accommodate. We are happy to arrange either a virtual or in-person meeting, depending on what is convenient for you.\n\nIn the meantime, please feel free to review more about our company and culture on our website.We look forward to connecting soon and learning more about you!\nWarm regards`;
          await sendEmail(user.email, subject, message);
        });
        job.newsLettersSend = true;
        await job.save();
      } catch (error) {
        console.log(`Error in node-cron catch block\n Error: ${error}`);
      }
    });
  });
  sendEmail;
}

export { newsLetterCron };
