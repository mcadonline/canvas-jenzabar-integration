import mssql from 'mssql';
import settings from '../../settings.js';

// holds the connection pool
let pool = null;

function close() {
  pool.close();
  pool = null;
}

async function query(sqlQuery) {
  try {
    if (!pool) {
      pool = await mssql.connect(settings.jex);
      pool.on('error', console.error);
    }
    const result = await pool.request().query(sqlQuery);
    return result.recordset;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export default {
  query,
  close,
};
