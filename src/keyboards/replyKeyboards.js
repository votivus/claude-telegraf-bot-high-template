module.exports = {
  mainKeyboard: {
    reply_markup: {
      keyboard: [
        [{ text: "📋 Asosiy menyu" }],
        [{ text: "ℹ️ Ma'lumot" }, { text: "⚙️ Sozlamalar" }],
      ],
      resize_keyboard: true,
    },
  },

  contactKeyboard: {
    reply_markup: {
      keyboard: [
        [{ text: "📱 Telefon raqamni yuborish", request_contact: true }],
        [{ text: "⬅️ Orqaga" }],
      ],
      resize_keyboard: true,
      one_time_keyboard: true,
    },
  },

  removeKeyboard: {
    reply_markup: {
      remove_keyboard: true,
    },
  },
};
