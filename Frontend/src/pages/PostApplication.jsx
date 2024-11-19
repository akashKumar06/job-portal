function PostApplication() {
  return (
    <article className="application_page">
      <form>
        <h3>Application form</h3>
        <div>
          <label htmlFor="title">Job Titlte</label>
          <input type="text" placeholder="job title" disabled />
        </div>
        <div>
          <label htmlFor="name">Your Name</label>
          <input type="text" />
        </div>
        <div>
          <label htmlFor="email">Your Email</label>
          <input type="email" />
        </div>
        <div>
          <label htmlFor="phone">Phone Number</label>
          <input type="text" />
        </div>
        <div>
          <label htmlFor="address">Address</label>
          <input type="text" />
        </div>
        <div>
          <label htmlFor="coverLetter">Cover Letter</label>
          <textarea name="coverLetter" id="coverLetter" rows={10}></textarea>
        </div>
        <div>
          <label htmlFor="resume">Resume</label>
          <input type="file" />
        </div>
        <div style={{ alignItems: "fkex-end" }}>
          <button type="submit">Apply</button>
        </div>
      </form>
    </article>
  );
}

export default PostApplication;
