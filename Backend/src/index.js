import app from "./app.js";
import connectDB from "./db/index.js";
connectDB()
  .then(() => {
    app.on("error", (error) => {
      throw error;
    });
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server listening at port ${process.env.PORT || 8000} 🌟`);
    });
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
