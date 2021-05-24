import { Connection } from 'typeorm';
import { DATA_BASE_CONNECTION, QUESTION_REPOSITORY } from '../constants';
import { QuestionEntity } from './../schemas/question.schema';

export const photoProviders = [
  {
    provide: QUESTION_REPOSITORY,
    useFactory: (connection: Connection) =>
      connection.getRepository(QuestionEntity),
    inject: [DATA_BASE_CONNECTION],
  },
];
