const { SCENES } = require("../config/constants");

module.exports = (bot) => {
  bot.command("settings", async (ctx) => {
    try {
      return ctx.scene.enter(SCENES.SETTINGS);
    } catch (error) {
      console.error("Settings buyrug'i xatosi:", error);
      ctx.reply("Xatolik yuz berdi. Iltimos, keyinroq qayta urinib ko'ring.");
    }
  });
};
