<!--  Claudeni taklif qilgan deyarli katta loyihalar uchun ishlatsa bo'ladigan loyiha strukturasi-->

---

/\*

# Telegram Bot

This is a Telegram bot built with Telegraf.js and MongoDB.

## Features

- User registration
- Admin notifications
- Statistics
- Multilingual support
- Scenes for complex dialogs
- Keyboard interfaces

## Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env` file with the required environment variables
4. Start the bot: `npm start`

## Environment Variables

- `BOT_TOKEN`: Your Telegram bot token from BotFather
- `ADMIN_IDS`: Comma-separated list of admin Telegram IDs
- `DATABASE_URL`: MongoDB connection string
- `NODE_ENV`: Environment (development/production)
- `LOG_LEVEL`: Logging level

## Project Structure

- `src/`: Source code
  - `config/`: Configuration files
  - `database/`: Database connection and models
  - `middlewares/`: Middleware functions
  - `scenes/`: Telegraf scenes for multi-step dialogs
  - `services/`: Business logic services
  - `utils/`: Utility functions
  - `keyboards/`: Keyboard layouts
  - `commands/`: Bot command handlers
  - `handlers/`: Event handlers
  - `locales/`: Multilingual support
  - `index.js`: Main entry point

## Commands

- `/start` - Start the bot
- `/help` - Show help information
- `/settings` - Open settings menu
- `/stats` - Show statistics (admin only)
- `/broadcast` - Send message to all users (admin only)

## License

ISC
\*/
