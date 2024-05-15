const { Client } = require('pg');

exports.handler = async function(event, context) {
  const projectId = event.queryStringParameters.projectId;
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    const result = await client.query('SELECT * FROM blogs WHERE project_id = $1', [projectId]);
    if (result.rows.length > 0) {
      return {
        statusCode: 200,
        body: JSON.stringify(result.rows[0])
      };
    } else {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'No blogs found for this project' })
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