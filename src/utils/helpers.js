const crypto = require("crypto");

/**
 * Xavfsiz tasodifiy ID yaratish
 * @param {number} length - ID uzunligi
 * @returns {string} Tasodifiy ID
 */
function generateRandomId(length = 10) {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString("hex")
    .slice(0, length);
}

/**
 * Matndagi maxsus belgilarni HTML uchun xavfsiz belgilarga o'zgartirish
 * @param {string} text - Matn
 * @returns {string} Xavfsiz matn
 */
function escapeHTML(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Taalluqli vaqt formatiga o'zgartirish
 * @param {Date} date - Sana
 * @returns {string} Taalluqli vaqt matni
 */
function timeAgo(date) {
  const seconds = Math.floor((new Date() - date) / 1000);

  const intervals = {
    yil: 31536000,
    oy: 2592000,
    hafta: 604800,
    kun: 86400,
    soat: 3600,
    minut: 60,
    sekund: 1,
  };

  for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / secondsInUnit);

    if (interval > 1) {
      return `${interval} ${unit} oldin`;
    } else if (interval === 1) {
      return `1 ${unit} oldin`;
    }
  }

  return "hozirgina";
}

/**
 * Matn uzunligini cheklash
 * @param {string} text - Matn
 * @param {number} maxLength - Maksimal uzunlik
 * @returns {string} Qisqartirilgan matn
 */
function truncateText(text, maxLength = 100) {
  if (!text || text.length <= maxLength) {
    return text;
  }

  return text.substring(0, maxLength - 3) + "...";
}

module.exports = {
  generateRandomId,
  escapeHTML,
  timeAgo,
  truncateText,
};
