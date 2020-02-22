import sql from 'mssql';
import settings from '../settings';

sql.on('error', console.error);

const queryService = poolPromise => async sqlStatement => {
  try {
    const pool = await poolPromise;
    const { recordset } = await pool.request().query(sqlStatement);
    return recordset;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

function getConfig(serviceName) {
  const { username, ...restOfConfig } = settings[serviceName];
  return {
    user: username,
    connectionTimeout: 3000,
    requestTimeout: 3000,
    options: {
      encrypt: true,
      enableArithAbort: true,
    },
    ...restOfConfig,
  };
}

function createSQLService(serviceName) {
  // create a connection pool to use for this service
  const config = getConfig(serviceName);
  const poolPromise = new sql.ConnectionPool(config).connect();

  return {
    query: queryService(poolPromise),
    close: async () => {
      const pool = await poolPromise;
      pool.close();
    },
  };
}

export default createSQLService;
