const startCommand = require("./start");
const helpCommand = require("./help");
const settingsCommand = require("./settings");

function registerCommands(bot) {
  startCommand(bot);
  helpCommand(bot);
  settingsCommand(bot);

  // Admin buyruqlari
  bot.command("stats", async (ctx) => {
    const config = require("../config/config");
    const analytics = require("../services/analytics");

    // Faqat adminlar uchun
    if (!config.ADMIN_IDS.includes(ctx.from.id)) {
      return;
    }

    try {
      const stats = await analytics.getGeneralStatistics();

      await ctx.reply(
        "📊 Bot statistikasi:\n\n" +
          `👥 Jami foydalanuvchilar: ${stats.totalUsers}\n` +
          `✅ Faol foydalanuvchilar: ${stats.activeUsers}\n` +
          `🆕 Bugun qo'shilgan: ${stats.newUsersToday}\n` +
          `💬 Jami xabarlar: ${stats.totalMessages}\n` +
          `📈 Xabar/Foydalanuvchi: ${stats.messagesPerUser}`
      );
    } catch (error) {
      console.error("Stats buyrug'i xatosi:", error);
      ctx.reply("Statistikani olishda xatolik yuz berdi.");
    }
  });

  // Broadcast buyrug'i (admin uchun)
  bot.command("broadcast", async (ctx) => {
    const config = require("../config/config");
    const User = require("../database/models/user");

    // Faqat adminlar uchun
    if (!config.ADMIN_IDS.includes(ctx.from.id)) {
      return;
    }

    const messageText = ctx.message.text.split("/broadcast ")[1];

    if (!messageText) {
      return ctx.reply("Foydalanish: /broadcast <xabar matni>");
    }

    try {
      // Barcha faol foydalanuvchilarni olish
      const users = await User.find({ state: "active" });

      let successCount = 0;
      let errorCount = 0;

      for (const user of users) {
        try {
          await ctx.telegram.sendMessage(user.telegramId, messageText, {
            parse_mode: "HTML",
          });
          successCount++;
        } catch (err) {
          errorCount++;
          console.error(`Broadcast xatosi (${user.telegramId}):`, err.message);
        }

        // Telegram cheklovlaridan qochish uchun kichik kutish
        await new Promise((resolve) => setTimeout(resolve, 50));
      }

      await ctx.reply(
        `✅ Broadcast yakunlandi:\n\n` +
          `📨 Yuborilgan: ${successCount}\n` +
          `❌ Xatoliklar: ${errorCount}\n` +
          `👥 Jami: ${users.length}`
      );
    } catch (error) {
      console.error("Broadcast buyrug'i xatosi:", error);
      ctx.reply("Broadcast qilishda xatolik yuz berdi.");
    }
  });
}

module.exports = {
  registerCommands,
};
