import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import * as path from 'path';

export const dbConfig: () => PostgresConnectionOptions = () => ({
  url: process.env.SUPABASE_URL,
  type: 'postgres',
  entities: [path.join(__dirname, '../**/*.entity{.ts,.js}')],
  synchronize: process.env.NODE_ENV === 'production' ? false : true,
});
