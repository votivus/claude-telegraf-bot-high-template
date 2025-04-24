const { Scenes } = require("telegraf");
const { settingsMenu } = require("../keyboards/inlineKeyboards");
const { SCENES, LANGUAGES } = require("../config/constants");
const User = require("../database/models/user");

const settingsScene = new Scenes.BaseScene(SCENES.SETTINGS);

settingsScene.enter(async (ctx) => {
  await ctx.reply("⚙️ Sozlamalar:", settingsMenu);
});

settingsScene.action("change_language", async (ctx) => {
  await ctx.answerCbQuery();
  await ctx.reply("🌐 Tilni tanlang:", {
    reply_markup: {
      inline_keyboard: [
        [
          { text: "🇺🇿 O'zbek", callback_data: `lang_${LANGUAGES.UZ}` },
          { text: "🇷🇺 Русский", callback_data: `lang_${LANGUAGES.RU}` },
          { text: "🇬🇧 English", callback_data: `lang_${LANGUAGES.EN}` },
        ],
      ],
    },
  });
});

settingsScene.action(/^lang_(.+)$/, async (ctx) => {
  const language = ctx.match[1];

  try {
    // Foydalanuvchi tilini yangilash
    await User.findOneAndUpdate(
      { telegramId: ctx.from.id },
      { languageCode: language }
    );

    let message = "Til muvaffaqiyatli o'zgartirildi!";
    if (language === LANGUAGES.RU) {
      message = "Язык успешно изменен!";
    } else if (language === LANGUAGES.EN) {
      message = "Language has been successfully changed!";
    }

    await ctx.answerCbQuery(message);
    await ctx.reply(message);

    // Sozlamalar menyusiga qaytish
    await ctx.scene.reenter();
  } catch (error) {
    console.error("Tilni o'zgartirishda xato:", error);
    await ctx.answerCbQuery("Xatolik yuz berdi");
    await ctx.reply("Tilni o'zgartirishda xatolik yuz berdi");
  }
});

settingsScene.action("notifications", async (ctx) => {
  await ctx.answerCbQuery();

  try {
    const user = await User.findOne({ telegramId: ctx.from.id });
    const newNotificationState = !user.notificationsEnabled;

    await User.findOneAndUpdate(
      { telegramId: ctx.from.id },
      { notificationsEnabled: newNotificationState }
    );

    const stateText = newNotificationState ? "yoqildi" : "o'chirildi";
    await ctx.reply(`Bildirishnomalar ${stateText}!`);

    // Sozlamalar menyusiga qaytish
    await ctx.scene.reenter();
  } catch (error) {
    console.error("Bildirishnomalarni o'zgartirishda xato:", error);
    await ctx.reply("Bildirishnomalarni o'zgartirishda xatolik yuz berdi");
  }
});

settingsScene.action("back_to_main", async (ctx) => {
  await ctx.answerCbQuery();
  return ctx.scene.enter(SCENES.MAIN_MENU);
});

settingsScene.on("message", async (ctx) => {
  if (ctx.message.text === "📋 Asosiy menyu") {
    return ctx.scene.enter(SCENES.MAIN_MENU);
  } else {
    await ctx.reply("Iltimos, mavjud tugmalardan foydalaning");
  }
});

module.exports = settingsScene;
