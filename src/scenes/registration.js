const { Scenes } = require("telegraf");
const User = require("../database/models/user");
const { notifyAdmins } = require("../services/adminNotify");

const registrationScene = new Scenes.WizardScene(
  "registration",
  // Bosqich 1: Ism so'rash
  async (ctx) => {
    await ctx.reply("Ro'yxatdan o'tish uchun ismingizni kiriting:");
    ctx.wizard.state.userData = {};
    return ctx.wizard.next();
  },
  // Bosqich 2: Familiya so'rash
  async (ctx) => {
    ctx.wizard.state.userData.firstName = ctx.message.text;
    await ctx.reply("Familiyangizni kiriting:");
    return ctx.wizard.next();
  },
  // Bosqich 3: Telefon raqam so'rash
  async (ctx) => {
    ctx.wizard.state.userData.lastName = ctx.message.text;
    await ctx.reply("Telefon raqamingizni kiriting (masalan: +998901234567):", {
      reply_markup: {
        keyboard: [
          [{ text: "📱 Telefon raqamni yuborish", request_contact: true }],
        ],
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    });
    return ctx.wizard.next();
  },
  // Bosqich 4: Ma'lumotlarni saqlash
  async (ctx) => {
    // Kontakt yoki oddiy xabar kelishi mumkin
    if (ctx.message.contact) {
      ctx.wizard.state.userData.phoneNumber = ctx.message.contact.phone_number;
    } else {
      ctx.wizard.state.userData.phoneNumber = ctx.message.text;
    }

    // Ma'lumotlarni saqlash
    try {
      const userData = ctx.wizard.state.userData;
      const user = await User.findOneAndUpdate(
        { telegramId: ctx.from.id },
        {
          firstName: userData.firstName,
          lastName: userData.lastName,
          phoneNumber: userData.phoneNumber,
          isRegistered: true,
        },
        { new: true }
      );

      await ctx.reply("Tabriklaymiz! Ro'yxatdan muvaffaqiyatli o'tdingiz.", {
        reply_markup: {
          keyboard: [
            [{ text: "📋 Asosiy menyu" }],
            [{ text: "ℹ️ Ma'lumot" }, { text: "⚙️ Sozlamalar" }],
          ],
          resize_keyboard: true,
        },
      });

      // Adminlarga yangi ro'yxatdan o'tgan foydalanuvchi haqida xabar berish
      notifyAdmins(
        ctx.bot,
        `✅ Yangi foydalanuvchi ro'yxatdan o'tdi!\n\nIsm: ${
          userData.firstName
        } ${userData.lastName}\nTelefon: ${userData.phoneNumber}\nUsername: @${
          ctx.from.username || "yo'q"
        }\nID: ${ctx.from.id}`
      );
    } catch (error) {
      console.error("Ro'yxatdan o'tishda xato:", error);
      await ctx.reply(
        "Xatolik yuz berdi. Iltimos, keyinroq qayta urinib ko'ring."
      );
    }

    return ctx.scene.leave();
  }
);

module.exports = registrationScene;
