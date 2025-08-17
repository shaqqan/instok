# InstokBot - Telegram Bot for Media Downloads

A Telegram bot that can download videos and audios from various platforms including TikTok, Likee, YouTube, and Instagram without watermarks.

## Features

- Download videos from Instagram posts, reels, stories, and TV
- Download videos from TikTok, Likee, and YouTube (coming soon)
- User management with PostgreSQL database
- Session tracking and usage statistics
- Multi-language support
- Built with TypeScript and Drizzle ORM

## Prerequisites

- Node.js 18+ 
- PostgreSQL database
- Telegram Bot Token

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd instokbot
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
Create a `.env` file in the root directory:
```env
DATABASE_URL=postgresql://username:password@localhost:5432/instokbot
BOT_TOKEN=your_bot_token_here
```

4. Set up the database:
```bash
# Create PostgreSQL database
createdb instokbot

# Generate and run database migrations
pnpm run db:generate
pnpm run db:push
```

## Usage

### Development
```bash
pnpm run dev
```

### Production
```bash
pnpm run start
```

### Database Commands
```bash
# Generate migrations
pnpm run db:generate

# Push schema to database
pnpm run db:push

# Open Drizzle Studio
pnpm run db:studio
```

## Database Schema

The bot uses the following main tables:

- **users**: Stores user information and preferences
- **user_sessions**: Tracks user bot sessions
- **download_history**: Records all download attempts
- **language_preferences**: Stores user language settings

## Project Structure

```
src/
├── database/          # Database configuration and schema
├── handlers/          # Bot command handlers
├── keyboards/         # Inline keyboards
├── services/          # Business logic services
└── index.ts          # Main entry point
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

ISC
