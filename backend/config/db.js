const mongoose = require("mongoose");
const chalk = require("chalk"); // or require('colors')

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined");
    }

    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(chalk.cyan.underline(`MongoDB Connected: ${conn.connection.host}`));
  } catch (error) {
    console.error(chalk.red.underline.bold(`Error: ${error.message}`));
    // Instead of exiting immediately, consider logging more details:
    console.error(error);
    process.exit(1); // This will exit with code 1, which is typical for an error.
  }
};
module.exports = {connectDB};