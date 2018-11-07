import sql from 'mssql';
import settings from '../settings';

/**
 * create a new connection to a SQLService for querying
 * @param serviceName - name of service. must match config object in settings.
 */
export default class SQLService {
  constructor(serviceName) {
    if (!serviceName) throw new Error('serviceName undefined. Required for SQLService');
    if (!settings[serviceName]) {
      throw new Error(
        `no config for '${serviceName}' found. Did you set your environment variables?`,
      );
    }
    this.serviceSettings = settings[serviceName];
    this.pool = null;
  }

  hasConnection() {
    return !!this.pool;
  }

  async setupConnection() {
    if (this.hasConnection()) return;

    const {
      username, password, server, database,
    } = this.serviceSettings;

    const config = {
      user: username,
      password,
      server,
      database,
      connectionTimeout: 3000,
      requestTimeout: 3000,
    };
    try {
      this.pool = await new sql.ConnectionPool(config).connect();
    } catch (err) {
      console.error('Unable to connect');
      console.error(err.message);
    }
  }

  async getPool() {
    if (!this.hasConnection()) await this.setupConnection();
    return this.pool;
  }

  async query(sqlQuery) {
    const pool = await this.getPool();
    const { recordset } = await pool.request().query(sqlQuery);
    return recordset;
  }

  close() {
    return this.pool && this.pool.close();
  }
}
