const { Client } = require('pg');

exports.handler = async function(event, context) {
  const projectId = event.queryStringParameters.id;
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    const result = await client.query('SELECT * FROM projects WHERE id = $1', [projectId]);
    if (result.rows.length > 0) {
      return {
        statusCode: 200,
        body: JSON.stringify(result.rows[0])
      };
    } else {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Project not found' })
      };
    }
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  } finally {
    await client.end();
  }
};