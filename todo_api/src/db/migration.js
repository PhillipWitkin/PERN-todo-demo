const dbConn = require('./dbConn');
const pool = dbConn.getPool();

async function runMigration(){
    // Connect to the PostgreSQL database
    try {
        await  pool.query(`CREATE TABLE IF NOT EXISTS todos (
            id SERIAL PRIMARY KEY,
            completed BOOLEAN,
            name text)`)
    } catch (error) {
        console.error('Error occurred during migration:', error);
    } finally {
        // Close the database connection
        await pool.end();
        console.log('Database connection closed.');
    }
}
    
runMigration();

