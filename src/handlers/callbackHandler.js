const { SCENES } = require("../config/constants");

/**
 * Inline tugmalar bosilgandagi hodisalarni qayta ishlash
 */
async function callbackHandler(ctx) {
  try {
    const callbackData = ctx.callbackQuery.data;

    // Agar scene faol bo'lsa, u qayta ishlaydi
    if (ctx.scene && ctx.scene.current) {
      return;
    }

    // Ro'yxatdan o'tish tugmasi
    if (callbackData === "register") {
      await ctx.answerCbQuery();
      return ctx.scene.enter(SCENES.REGISTRATION);
    }

    // Asosiy menyuga o'tish
    else if (callbackData === "main_menu") {
      await ctx.answerCbQuery();
      return ctx.scene.enter(SCENES.MAIN_MENU);
    }

    // Boshqa barcha callback hodisalari uchun
    else {
      await ctx.answerCbQuery("Bu funksiya hozircha mavjud emas");
    }
  } catch (error) {
    console.error("Callback handler xatosi:", error);
    await ctx.answerCbQuery("Xatolik yuz berdi");
  }
}

module.exports = callbackHandler;
