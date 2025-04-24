const { SCENES } = require("../config/constants");

/**
 * Xabarlarni qayta ishlash uchun asosiy handler
 */
async function messageHandler(ctx) {
  // Agar scene faol bo'lsa, u qayta ishlaydi
  if (ctx.scene && ctx.scene.current) {
    return;
  }

  const text = ctx.message.text;

  // Asosiy menyu tugmasi
  if (text === "📋 Asosiy menyu") {
    return ctx.scene.enter(SCENES.MAIN_MENU);
  }

  // Ma'lumot tugmasi
  else if (text === "ℹ️ Ma'lumot") {
    await ctx.reply(
      "Bot haqida ma'lumot:\n\n" +
        "Bu bot sizga quyidagi imkoniyatlarni beradi:\n" +
        "- Ro'yxatdan o'tish\n" +
        "- Ma'lumotlarni saqlash\n" +
        "- Statistikani ko'rish\n" +
        "- va boshqalar..."
    );
  }

  // Sozlamalar tugmasi
  else if (text === "⚙️ Sozlamalar") {
    return ctx.scene.enter(SCENES.SETTINGS);
  }

  // Boshqa barcha xabarlar uchun
  else {
    // Agar foydalanuvchi ro'yxatdan o'tmagan bo'lsa
    if (ctx.dbUser && !ctx.dbUser.isRegistered) {
      await ctx.reply("Iltimos, avval ro'yxatdan o'ting:", {
        reply_markup: {
          inline_keyboard: [
            [{ text: "📝 Ro'yxatdan o'tish", callback_data: "register" }],
          ],
        },
      });
      return;
    }

    // Standart xabar uchun javob
    await ctx.reply("Kerakli bo'limni tanlang:", {
      reply_markup: {
        keyboard: [
          [{ text: "📋 Asosiy menyu" }],
          [{ text: "ℹ️ Ma'lumot" }, { text: "⚙️ Sozlamalar" }],
        ],
        resize_keyboard: true,
      },
    });
  }
}

module.exports = messageHandler;
