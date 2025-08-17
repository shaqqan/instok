# Telegram Bot with Grammy, TypeScript & PostgreSQL

A modern Telegram bot built with Grammy framework, TypeScript, and PostgreSQL database, fully containerized with Docker.

## 🚀 Features

- **Modern Stack**: TypeScript, Grammy (Telegram Bot Framework), PostgreSQL
- **Docker Support**: Full containerization with docker-compose
- **Database Integration**: PostgreSQL with connection pooling
- **Logging**: Structured logging with Winston
- **Error Handling**: Comprehensive error handling and middleware
- **Type Safety**: Full TypeScript support with strict typing
- **Development Tools**: ESLint, hot reload, and debugging support

## 📁 Project Structure

```
telegram-bot/
├── src/
│   ├── commands/           # Bot command handlers
│   │   ├── index.ts       # Command setup
│   │   ├── start.ts       # /start command
│   │   ├── help.ts        # /help command
│   │   └── ping.ts        # /ping command
│   ├── database/          # Database related files
│   │   ├── connection.ts  # Database connection setup
│   │   ├── migrate.ts     # Migration runner
│   │   ├── schema.sql     # Database schema
│   │   └── queries/       # Database queries
│   │       └── user.ts    # User-related queries
│   ├── middleware/        # Bot middleware
│   │   └── index.ts       # Logging and error handling
│   ├── utils/            # Utility functions
│   │   └── logger.ts     # Winston logger setup
│   └── index.ts          # Main application entry point
├── logs/                 # Log files directory
├── docker-compose.yml    # Docker compose configuration
├── Dockerfile           # Docker configuration
├── package.json         # Node.js dependencies
├── tsconfig.json        # TypeScript configuration
├── .eslintrc.json       # ESLint configuration
├── .env.example         # Environment variables example
└── README.md            # This file
```

## 🛠️ Prerequisites

- Node.js 18+ (if running locally)
- Docker and Docker Compose (recommended)
- A Telegram Bot Token from [@BotFather](https://t.me/botfather)

## 🚀 Quick Start with Docker (Recommended)

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd telegram-bot
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your bot token:
   ```env
   BOT_TOKEN=your_actual_bot_token_here
   ```

3. **Start the application**
   ```bash
   # Start the bot and database
   docker-compose up -d
   
   # View logs
   docker-compose logs -f bot
   ```

4. **Optional: Start with pgAdmin for database management**
   ```bash
   docker-compose --profile admin up -d
   ```
   Access pgAdmin at http://localhost:8080 (admin@example.com / admin)

## 💻 Local Development Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up PostgreSQL database**
   ```bash
   # Start only the database
   docker-compose up postgres -d
   ```

3. **Run database migrations**
   ```bash
   npm run db:migrate
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

## 📋 Available Scripts

```bash
# Development
npm run dev          # Start development server with hot reload
npm run build        # Build the TypeScript project
npm start           # Start production server

# Database
npm run db:migrate   # Run database migrations

# Docker
npm run docker:build # Build Docker image
npm run docker:up    # Start with docker-compose
npm run docker:down  # Stop docker-compose

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
```

## 🐳 Docker Commands

```bash
# Start the entire stack
docker-compose up -d

# Start with pgAdmin
docker-compose --profile admin up -d

# View logs
docker-compose logs -f bot

# Stop everything
docker-compose down

# Rebuild and start
docker-compose up --build -d

# Access database directly
docker-compose exec postgres psql -U postgres -d telegram_bot
```

## 🗄️ Database Schema

The application includes a PostgreSQL database with the following tables:

- **users**: Stores Telegram user information
- **messages**: Stores bot message interactions (example table)

The schema automatically creates indexes and triggers for optimal performance.

## 🤖 Bot Commands

- `/start` - Initialize the bot and register user
- `/help` - Show available commands
- `/ping` - Test bot responsiveness

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `BOT_TOKEN` | Telegram Bot Token | **Required** |
| `DB_HOST` | Database host | `localhost` |
| `DB_PORT` | Database port | `5432` |
| `DB_NAME` | Database name | `telegram_bot` |
| `DB_USER` | Database user | `postgres` |
| `DB_PASSWORD` | Database password | `password` |
| `NODE_ENV` | Environment | `development` |
| `LOG_LEVEL` | Log level | `info` |

### Database Configuration

The application uses connection pooling with the following default settings:
- Max connections: 20
- Idle timeout: 30 seconds
- Connection timeout: 2 seconds

## 📝 Adding New Commands

1. Create a new command file in `src/commands/`:
   ```typescript
   // src/commands/mycommand.ts
   import { CommandContext, Context } from 'grammy';
   
   export async function myCommand(ctx: CommandContext<Context>) {
     await ctx.reply('Hello from my command!');
   }
   ```

2. Register the command in `src/commands/index.ts`:
   ```typescript
   import { myCommand } from './mycommand';
   
   export function setupCommands(bot: Bot) {
     bot.command('mycommand', myCommand);
     // ... other commands
   }
   ```

## 🔍 Monitoring and Logs

Logs are stored in the `logs/` directory:
- `combined.log` - All logs
- `error.log` - Error logs only

In development, logs are also displayed in the console with colors.

## 🚨 Troubleshooting

### Bot not responding
- Check if `BOT_TOKEN` is correctly set
- Verify the bot is started: `docker-compose logs bot`

### Database connection issues
- Ensure PostgreSQL is running: `docker-compose ps`
- Check database credentials in `.env`

### Permission issues with Docker
- Make sure Docker daemon is running
- Try running with `sudo` if on Linux

## 🔐 Security Notes

- Never commit `.env` files with real tokens
- The Docker setup runs the bot as a non-root user
- Database credentials should be changed in production
- Consider using Docker secrets for production deployments

## 📚 Learn More

- [Grammy Documentation](https://grammy.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
