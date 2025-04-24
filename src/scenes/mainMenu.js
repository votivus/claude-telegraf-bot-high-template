const { Scenes } = require("telegraf");
const { mainMenu } = require("../keyboards/inlineKeyboards");
const { SCENES } = require("../config/constants");

const mainMenuScene = new Scenes.BaseScene(SCENES.MAIN_MENU);

mainMenuScene.enter(async (ctx) => {
  await ctx.reply("Asosiy menyu:", mainMenu);
});

mainMenuScene.action("fill_form", async (ctx) => {
  await ctx.answerCbQuery();
  return ctx.scene.enter(SCENES.REGISTRATION);
});

mainMenuScene.action("statistics", async (ctx) => {
  await ctx.answerCbQuery();

  // Statistika ma'lumotlarini olish
  const User = require("../database/models/user");
  const Message = require("../database/models/message");

  try {
    const userCount = await User.countDocuments();
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const newUsersToday = await User.countDocuments({
      createdAt: { $gte: todayStart },
    });

    const messageCount = await Message.countDocuments();

    await ctx.reply(
      `📊 Statistika:\n\n` +
        `👥 Jami foydalanuvchilar: ${userCount}\n` +
        `🆕 Bugun qo'shilgan: ${newUsersToday}\n` +
        `💬 Jami xabarlar: ${messageCount}`
    );
  } catch (error) {
    console.error("Statistika olishda xato:", error);
    await ctx.reply("Statistika ma'lumotlarini olishda xatolik yuz berdi");
  }
});

mainMenuScene.action("search", async (ctx) => {
  await ctx.answerCbQuery();
  await ctx.reply("Qidiruv funksiyasi tez orada qo'shiladi!");
});

mainMenuScene.action("contact", async (ctx) => {
  await ctx.answerCbQuery();
  await ctx.reply(
    "📞 Bog'lanish uchun:\n\n" +
      "Telefon: +998901234567\n" +
      "Email: example@example.com\n" +
      "Telegram: @username"
  );
});

mainMenuScene.on("message", async (ctx) => {
  const text = ctx.message.text;

  if (text === "📋 Asosiy menyu") {
    return ctx.scene.reenter();
  } else if (text === "ℹ️ Ma'lumot") {
    await ctx.reply(
      "Bot haqida ma'lumot:\n\n" +
        "Bu bot sizga quyidagi imkoniyatlarni beradi:\n" +
        "- Ro'yxatdan o'tish\n" +
        "- Ma'lumotlarni saqlash\n" +
        "- Statistikani ko'rish\n" +
        "- va boshqalar..."
    );
  } else if (text === "⚙️ Sozlamalar") {
    return ctx.scene.enter(SCENES.SETTINGS);
  } else {
    await ctx.reply("Iltimos, mavjud tugmalardan foydalaning");
  }
});

module.exports = mainMenuScene;
