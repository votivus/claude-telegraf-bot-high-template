const Message = require("../database/models/message");

/**
 * Xabarlarni log qilish middleware
 */
async function logger(ctx, next) {
  const startTime = new Date();

  try {
    // Middleware zanjirini davom ettirish
    await next();

    // Faqat xabarlarni log qilish
    if (ctx.message) {
      // Ma'lumotlarni olish
      const {
        from,
        message_id,
        chat,
        text,
        photo,
        video,
        document,
        sticker,
        voice,
        location,
        contact,
        forward_from,
        reply_to_message,
      } = ctx.message;

      // Xabar turini aniqlash
      let type = "text";
      let fileId = null;

      if (photo) {
        type = "photo";
        fileId = photo[photo.length - 1].file_id;
      } else if (video) {
        type = "video";
        fileId = video.file_id;
      } else if (document) {
        type = "document";
        fileId = document.file_id;
      } else if (sticker) {
        type = "sticker";
        fileId = sticker.file_id;
      } else if (voice) {
        type = "voice";
        fileId = voice.file_id;
      } else if (location) {
        type = "location";
      } else if (contact) {
        type = "contact";
      }

      // Xabarni saqlash
      await Message.create({
        userId: from.id,
        messageId: message_id,
        chatId: chat.id,
        text: text || "",
        type,
        fileId,
        replyToMessageId: reply_to_message ? reply_to_message.message_id : null,
        forwardFromId: forward_from ? forward_from.id : null,
      });
    }
  } catch (error) {
    console.error("Logger middleware xatosi:", error);
  }

  // So'rovni bajarish vaqtini log qilish
  const ms = new Date() - startTime;
  console.log(`${ctx.from?.id || "Unknown"} - ${ctx.updateType} - ${ms}ms`);
}

module.exports = {
  logger,
};
