# Deployment Instructions for Railway

## What's Ready

Your Discord Bot has been updated to use **PostgreSQL** as the primary database. Railway has already:
- ✅ PostgreSQL service created and staged
- ✅ Discord-Bot service created and staged
- ✅ All code changes ready to deploy

## 1. Push Code to GitHub

The code changes are ready in your sandbox. Push them to your GitHub repo:

```bash
git push origin sandbox/9438120f-9fb0-44e6-80c6--9dzd
```

Or create a Pull Request on GitHub with the branch `sandbox/9438120f-9fb0-44e6-80c6--9dzd`

**What's being pushed:**
- ✅ `src/database/connectPostgres.js` — PostgreSQL connection handler
- ✅ `src/database/models/index.js` — Sequelize base structure
- ✅ Updated `src/bot.js` — Database auto-detection
- ✅ Updated `package.json` — `pg` + `sequelize` added
- ✅ Updated `.env.example` — All variables documented
- ✅ `MIGRATION_GUIDE.md` — Migration instructions
- ✅ `POSTGRESQL_MIGRATION.md` — Setup guide

## 2. Configure Variables on Railway

Go to https://railway.com/project/e0f5cadb-f54c-47c1-9e5b-adbdd598c9dd

### PostgreSQL Service
1. Click on "Postgres" service
2. Go to "Variables" tab
3. Copy the `DATABASE_URL` value (looks like `postgresql://user:pass@host:port/db`)

### Discord-Bot Service
1. Click on "discord-bot" service (or create it if not yet staged)
2. Go to "Variables" tab
3. Add these variables:

**CRITICAL (required to start):**
- `DISCORD_TOKEN` = Your Discord bot token
- `DISCORD_ID` = Your bot's Discord user ID

**RECOMMENDED:**
- `PREFIX` = `&` (command prefix)
- `DATABASE_URL` = Paste value from PostgreSQL service variables
- `GIPHY_TOKEN` = (optional, for /giphy commands)
- `TOPGG_TOKEN` = (optional, for Top.gg integration)
- `SPOTIFY_CLIENT_ID` = (optional, for Spotify music)
- `SPOTIFY_CLIENT_SECRET` = (optional, for Spotify music)
- `LAVALINK_HOST` = `lava.link` (optional, for music)
- `LAVALINK_PASSWORD` = Your Lavalink password (optional)
- `WEBHOOK_ID` = (optional, for logging)
- `WEBHOOK_TOKEN` = (optional, for logging)

## 3. Deploy

Once variables are set:
1. Click "Deploy" on Discord-Bot service
2. Railway automatically pulls latest code from GitHub
3. Bot starts automatically

## Verification

Check the logs to verify connection:
1. Click on Discord-Bot service → "Logs" tab
2. Look for messages like:
   - `📦 Using PostgreSQL` ✅ (Success)
   - Or `📦 Using MongoDB` (if DATABASE_URL not set)
   - `🎵 Music player initialized` (if Lavalink configured)

## Database Auto-Setup

On first run, Sequelize will:
- Authenticate to PostgreSQL
- Create connection pool
- Log successful connection

Models will be created as you migrate individual Mongoose schemas to Sequelize format.

## Rollback / Troubleshooting

### If PostgreSQL connection fails:
1. Check `DATABASE_URL` is set correctly in bot variables
2. Ensure PostgreSQL service is running
3. Check bot has network access to PostgreSQL (private domain: `postgres.railway.internal`)

### If bot doesn't start:
1. Check `DISCORD_TOKEN` is set and valid
2. Check bot has Message Content Intent enabled in Discord Developer Portal
3. Review logs for specific errors

### To revert to MongoDB:
1. Remove `DATABASE_URL` from bot variables
2. Set `MONGO_TOKEN` instead
3. Redeploy

## Next Steps

1. **[IMMEDIATE]** Get Discord bot token from https://discord.com/developers/applications
2. **[IMMEDIATE]** Configure bot variables on Railway
3. **[IMMEDIATE]** Deploy services
4. **[OPTIONAL]** Migrate individual models as you update commands
5. **[LATER]** Remove MongoDB support once all models migrated

## Support

- Sequelize docs: https://sequelize.org/
- Railway docs: https://docs.railway.app/
- Discord.js docs: https://discord.js.org/

---

**Questions?** Check `MIGRATION_GUIDE.md` or `POSTGRESQL_MIGRATION.md` for detailed info.

