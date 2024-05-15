const { Client } = require('pg');

exports.handler = async function(event, context) {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    const result = await client.query('SELECT * FROM blogs');
    return {
      statusCode: 200,
      body: JSON.stringify(result.rows)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  } finally {
    await client.end();
  }
};