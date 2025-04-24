const User = require("../database/models/user");
const { USER_STATES } = require("../config/constants");

/**
 * Foydalanuvchi haqiqiyligi tekshirish
 */
async function auth(ctx, next) {
  // Agar foydalanuvchi mavjud bo'lmasa, o'tkazib yuborish
  if (!ctx.from) {
    console.warn("Foydalanuvchi ma'lumotlari mavjud emas");
    return;
  }

  try {
    // Foydalanuvchini bazadan qidirish
    let user = await User.findOne({ telegramId: ctx.from.id });

    // Agar foydalanuvchi topilmasa, yangi yaratish
    if (!user) {
      user = new User({
        telegramId: ctx.from.id,
        firstName: ctx.from.first_name,
        lastName: ctx.from.last_name,
        username: ctx.from.username,
        languageCode: ctx.from.language_code || "uz",
        state: USER_STATES.ACTIVE,
      });
      await user.save();
    }

    // Foydalanuvchi bloklangan bo'lsa, xabar berish
    if (user.state === USER_STATES.BLOCKED) {
      await ctx.reply(
        "Sizning profilingiz bloklangan. Administrator bilan bog'laning."
      );
      return;
    }

    // Kontekstga foydalanuvchi ma'lumotlarini qo'shish
    ctx.dbUser = user;

    return next();
  } catch (error) {
    console.error("Auth middleware xatosi:", error);
    return next();
  }
}

module.exports = {
  auth,
};
