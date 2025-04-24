/**
 * Sana va vaqtni formatlash
 * @param {Date} date - Sana obyekti
 * @param {boolean} includeTime - Vaqtni ham qo'shish
 * @returns {string} Formatlangan sana
 */
function formatDate(date, includeTime = false) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  let formatted = `${day}.${month}.${year}`;

  if (includeTime) {
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    formatted += ` ${hours}:${minutes}`;
  }

  return formatted;
}

/**
 * Raqamni chiroyli formatlash (minglik ajratuvchi bilan)
 * @param {number} num - Raqam
 * @returns {string} Formatlangan raqam
 */
function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

/**
 * Telefon raqamni formatlash
 * @param {string} phoneNumber - Telefon raqami
 * @returns {string} Formatlangan telefon raqami
 */
function formatPhoneNumber(phoneNumber) {
  // +998901234567 formatidan +998 90 123-45-67 formatiga o'tkazish
  if (!phoneNumber) return "";

  phoneNumber = phoneNumber.replace(/\D/g, "");

  if (phoneNumber.length === 12 && phoneNumber.startsWith("998")) {
    return `+${phoneNumber.substring(0, 3)} ${phoneNumber.substring(
      3,
      5
    )} ${phoneNumber.substring(5, 8)}-${phoneNumber.substring(
      8,
      10
    )}-${phoneNumber.substring(10, 12)}`;
  }

  return phoneNumber;
}

module.exports = {
  formatDate,
  formatNumber,
  formatPhoneNumber,
};
