module.exports = (bot) => {
  bot.command("help", async (ctx) => {
    try {
      await ctx.reply(
        "Bot bo'yicha yordam:\n\n" +
          "/start - Botni qayta ishga tushirish\n" +
          "/help - Yordam ko'rsatish\n" +
          "/settings - Sozlamalarni ochish\n\n" +
          "Qo'shimcha savollar uchun administrator bilan bog'laning."
      );
    } catch (error) {
      console.error("Help buyrug'i xatosi:", error);
      ctx.reply("Xatolik yuz berdi. Iltimos, keyinroq qayta urinib ko'ring.");
    }
  });
};
