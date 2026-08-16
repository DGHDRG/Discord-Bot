# PostgreSQL Migration Guide

## What Changed

Your Discord Bot now supports **PostgreSQL** as the primary database, replacing MongoDB. The migration includes:

- ✅ PostgreSQL connection via Sequelize ORM
- ✅ Auto-detection of `DATABASE_URL` (PostgreSQL) or `MONGO_TOKEN` (MongoDB)
- ✅ Backward compatibility with MongoDB
- ✅ Full setup for Railway deployment

## Environment Variables

### PostgreSQL (Recommended for Railway)
```env
DATABASE_URL=postgresql://user:password@host:5432/database_name
```

### MongoDB (Legacy - Optional)
```env
MONGO_TOKEN=mongodb+srv://user:password@cluster.mongodb.net/database
```

### Required Variables
```env
DISCORD_TOKEN=your_discord_bot_token
DISCORD_ID=your_bot_discord_id
PREFIX=&
```

### Optional Variables
```env
GIPHY_TOKEN=
SPOTIFY_CLIENT_ID=
SPOTIFY_CLIENT_SECRET=
LAVALINK_HOST=lava.link
LAVALINK_PASSWORD=
LAVALINK_PORT=80
LAVALINK_SECURE=false
WEBHOOK_ID=
WEBHOOK_TOKEN=
NODE_ENV=production
```

## How It Works

1. **Bot starts** → Checks `DATABASE_URL` (PostgreSQL)
2. If `DATABASE_URL` is set and valid → **Uses PostgreSQL** ✅
3. If `DATABASE_URL` fails or not set → Falls back to `MONGO_TOKEN` (MongoDB)
4. If neither is set → Bot continues without database features

## Railway Deployment

### Step 1: Create PostgreSQL Service
1. Go to Railway dashboard
2. Click "+ New"
3. Select "PostgreSQL" template
4. Railway auto-generates `DATABASE_URL`

### Step 2: Create Discord Bot Service
1. Click "+ New"
2. Select "GitHub Repo"
3. Select `DGHDRG/Discord-Bot`
4. Configure variables:
   ```
   DISCORD_TOKEN=your_token
   DATABASE_URL=<copy from PostgreSQL service>
   DISCORD_ID=your_bot_id
   ```

### Step 3: Deploy
- Railway automatically links services
- Bot detects `DATABASE_URL` and uses PostgreSQL
- Done! 🎉

## Migration Path

### For New Deployments
Simply use PostgreSQL. Set `DATABASE_URL`, skip `MONGO_TOKEN`.

### For Existing Users
- **MongoDB users**: Keep `MONGO_TOKEN`, no action needed
- **Want to migrate to PostgreSQL**: Set both, test, then remove `MONGO_TOKEN`

## Model Migration (Future)

Mongoose models are still working. To gradually migrate to Sequelize:

**Before (Mongoose)**
```javascript
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    discordId: String,
    level: Number,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
```

**After (Sequelize)**
```javascript
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('User', {
        discordId: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        level: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
    }, {
        tableName: 'users',
        timestamps: true,
    });
};
```

## Troubleshooting

**"Failed to connect to PostgreSQL"**
- Check `DATABASE_URL` format
- Ensure PostgreSQL service is running on Railway
- Verify bot has access to private network

**"No database configured"**
- Set either `DATABASE_URL` (PostgreSQL) or `MONGO_TOKEN` (MongoDB)
- Check Railway Variables tab

**"Models not defined"**
- Individual models still use Mongoose
- Migrate gradually as you update each model
- See "Model Migration" section above

## Files Changed

- `src/bot.js` — Auto-detect DB connection
- `src/database/connectPostgres.js` — NEW: PostgreSQL handler
- `.env.example` — Added `DATABASE_URL` documentation
- `package.json` — Added `pg` and `sequelize`

## Support

For issues:
- Check `.env.example` for all variables
- Review `src/database/connectPostgres.js` for details
- See [Sequelize Docs](https://sequelize.org/)
- See [Railway Docs](https://docs.railway.app/)

