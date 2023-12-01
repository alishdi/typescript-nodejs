import mongoose from "mongoose";
mongoose
  .connect("mongodb://127.0.0.1:27017/Ts-Backend")
  .then(() => console.log("connected To Ts-Backend DB...!"))
  .catch((err: any) => console.log(err.message));
mongoose.connection.on("connected", () => {
  console.log("connect to mongo DB");
});
mongoose.connection.on("disconnected", () => {
  console.log("mongoose connection is disconnect");
});
process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("disconnected");
  process.exit(0);
});
