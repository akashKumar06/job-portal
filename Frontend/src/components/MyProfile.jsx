import { useSelector } from "react-redux";

function MyProfile() {
  const { user } = useSelector((state) => state.user);
  return (
    <div className="account_components">
      <h3>My Profile</h3>
      <div>
        <label htmlFor="fullName">Full Name</label>
        <input id="fullName" type="text" disabled value={user.name} />
      </div>
      <div>
        <label htmlFor="address">Email Address</label>
        <input type="text" disabled value={user.email} />
      </div>
      {user.role === "Job Seeker" && (
        <div
          className={{ display: "flex", flexDirectio: "column", gap: "15px" }}
        >
          <label>My Preferred Job Niches</label>
          <input type="text" disabled value={user.firstNiche} />
          <input type="text" disabled value={user.secondNiche} />
          <input type="text" disabled value={user.thirdNiche} />
        </div>
      )}
      <div>
        <label>Phone Number</label>
        <input type="text" disabled value={user.phone} />
      </div>
      <div>
        <label>Address</label>
        <input type="text" disabled value={user.address} />
      </div>
      <div>
        <label>Role</label>
        <input type="text" disabled value={user.role} />
      </div>
      <div>
        <label>Joined On</label>
        <input type="text" disabled value={user.createdAt.substring(0, 10)} />
      </div>
    </div>
  );
}

export default MyProfile;
