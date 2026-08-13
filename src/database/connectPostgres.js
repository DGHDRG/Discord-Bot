const { Sequelize } = require('sequelize');
const chalk = require('chalk');

let sequelize;

async function connectPostgres() {
    const databaseUrl = process.env.DATABASE_URL;

    if (!databaseUrl) {
        console.log(chalk.yellow('⚠️ PostgreSQL is disabled (DATABASE_URL not configured)'));
        return null;
    }

    try {
        console.log(chalk.blue(chalk.bold(`Database`)), (chalk.white(`>>`)), chalk.cyan(`PostgreSQL`), chalk.green(`is connecting...`));
        
        sequelize = new Sequelize(databaseUrl, {
            dialect: 'postgres',
            logging: false,
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000,
            },
        });

        await sequelize.authenticate();
        console.log(chalk.blue(chalk.bold(`Database`)), (chalk.white(`>>`)), chalk.cyan(`PostgreSQL`), chalk.green(`is ready!`));
        
        return sequelize;
    } catch (err) {
        console.log(chalk.red(`[ERROR]`), chalk.white(`>>`), chalk.cyan(`PostgreSQL`), chalk.white(`>>`), chalk.red(`Failed to connect!`), chalk.white(`>>`), chalk.red(`Error: ${err.message}`));
        console.log(chalk.yellow('⚠️ Bot will continue without database features'));
        return null;
    }
}

module.exports = { connectPostgres, getSequelize: () => sequelize };

