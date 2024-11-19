import { ClipLoader } from "react-spinners";
function Spinner() {
  return (
    <section
      style={{
        minHeight: "500px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ClipLoader size={150} aria-label="Loading spinner" />
    </section>
  );
}

export default Spinner;
