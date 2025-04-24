const User = require("../database/models/user");
const Message = require("../database/models/message");

/**
 * Umumiy statistikani olish
 */
async function getGeneralStatistics() {
  try {
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ state: "active" });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const newUsersToday = await User.countDocuments({
      createdAt: { $gte: today },
    });

    const totalMessages = await Message.countDocuments();
    const messagesPerUser =
      totalUsers > 0 ? (totalMessages / totalUsers).toFixed(2) : 0;

    return {
      totalUsers,
      activeUsers,
      newUsersToday,
      totalMessages,
      messagesPerUser,
    };
  } catch (error) {
    console.error("Statistika olishda xato:", error);
    throw error;
  }
}

/**
 * So'nggi N kun uchun foydalanuvchi o'sishini olish
 */
async function getUserGrowth(days = 7) {
  try {
    const results = [];

    for (let i = 0; i < days; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);

      const nextDay = new Date(date);
      nextDay.setDate(nextDay.getDate() + 1);

      const count = await User.countDocuments({
        createdAt: { $gte: date, $lt: nextDay },
      });

      results.unshift({
        date: date.toISOString().split("T")[0],
        count,
      });
    }

    return results;
  } catch (error) {
    console.error("Foydalanuvchi o'sishini olishda xato:", error);
    throw error;
  }
}

module.exports = {
  getGeneralStatistics,
  getUserGrowth,
};
