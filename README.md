// Project Structure:
/_
├── src/
│ ├── config/
│ │ ├── config.js // Bot konfiguratsiyasi
│ │ └── constants.js // O'zgarmas qiymatlar
│ ├── database/
│ │ ├── index.js // Database ulanish
│ │ └── models/ // Ma'lumotlar modellari
│ │ ├── user.js
│ │ └── message.js
│ ├── middlewares/
│ │ ├── auth.js // Autentifikatsiya middleware
│ │ ├── logger.js // Log qilish middleware
│ │ └── index.js // Umumiy middleware
│ ├── scenes/ // Bot saxnalari (suhbat holatlari)
│ │ ├── registration.js
│ │ ├── mainMenu.js
│ │ └── index.js
│ ├── services/
│ │ ├── adminNotify.js // Adminlarga xabar yuborish servisi
│ │ ├── analytics.js // Analitika servisi
│ │ └── api.js // Tashqi API bilan aloqa
│ ├── utils/
│ │ ├── formatters.js // Formatlash funktsiyalari
│ │ └── helpers.js // Yordamchi funktsiyalar
│ ├── keyboards/ // Tugmalar va klaviaturalar
│ │ ├── inlineKeyboards.js
│ │ └── replyKeyboards.js
│ ├── commands/ // Bot buyruqlari
│ │ ├── start.js
│ │ ├── help.js
│ │ ├── settings.js
│ │ └── index.js
│ ├── handlers/ // Hodisalar boshqaruvchilari
│ │ ├── messageHandler.js
│ │ ├── callbackHandler.js
│ │ └── index.js
│ ├── locales/ // Ko'p tillilik
│ │ ├── uz.js
│ │ ├── ru.js
│ │ └── en.js
│ └── index.js // Asosiy fayl
├── .env // Environment o'zgaruvchilari
├── .gitignore // Git ignore fayli
├── package.json // Paket ma'lumotlari
└── README.md // Loyiha haqida ma'lumot
_/

<!--  Claudeni taklif qilgan deyarli katta loyihalar uchun ishlatsa bo'ladigan loyiha strukturasi--> 
"# claude-telegraf-bot-high-template" 
"# claude-telegraf-bot-high-template" 
