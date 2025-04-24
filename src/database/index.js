const mongoose = require("mongoose");
const config = require("../config/config");

// MongoDB ulanish uchun funksiya
async function connectToDatabase() {
  try {
    await mongoose.connect(config.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB ulanishi muvaffaqiyatli o'rnatildi");
    return mongoose.connection;
  } catch (error) {
    console.error("MongoDB ulanishida xatolik:", error);
    throw error;
  }
}

// Databaseni yopish uchun funksiya
async function closeDatabaseConnection() {
  try {
    await mongoose.connection.close();
    console.log("MongoDB ulanishi yopildi");
  } catch (error) {
    console.error("MongoDB ulanishini yopishda xatolik:", error);
    throw error;
  }
}

module.exports = {
  connectToDatabase,
  closeDatabaseConnection,
  connection: mongoose.connection,
};
