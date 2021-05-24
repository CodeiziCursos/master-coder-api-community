import { createConnection } from 'typeorm';
import { DATA_BASE_CONNECTION } from './constants';
import { AlternativeEntity } from './schemas/alternative.schema';
import { QuestionEntity } from './schemas/question.schema';

export const databaseProviders = [
  {
    provide: DATA_BASE_CONNECTION,
    useFactory: async () =>
      await createConnection({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'root',
        database: 'test',
        entities: [QuestionEntity, AlternativeEntity],
        synchronize: true,
      }),
  },
];
