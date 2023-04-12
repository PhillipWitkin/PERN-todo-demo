const dbConn = require('./dbConn');
const pool = dbConn.getPool();

async function seedTodosTable() {
    try {
       // Check if the "users" table is empty
        const checkEmptyTableQuery = 'SELECT COUNT(*) FROM todos;';
        const result = await pool.query(checkEmptyTableQuery);
        const count = parseInt(result.rows[0].count, 10);

        if (count > 0) {
            console.log('Todos table is not empty. Skipping seeding.');
            return;
        }
      // Prepare sample tdo data
      const todos = [
        {
            name: 'Eat',
            completed: true,
        },
        {
           name: "Sleep",
           completed: false,
        },
        {
           name: "Repeat",
           completed: false,
        }
      ];
  
      // Insert into the todos table
      for (const todo of todos) {
        const insertQuery = `INSERT INTO todos (name, completed) VALUES ($1, $2);`;
        await pool.query(insertQuery, [todo.name, todo.completed]);
        console.log(`Todo ${todo.name} inserted.`);
      }
  
      console.log('All todos seeded.');
    } catch (error) {
      console.error('Error occurred during seeding:', error);
    } finally {
      // Close the database connection
      await pool.end();
      console.log('Database connection closed.');
    }
  }
  
  seedTodosTable();