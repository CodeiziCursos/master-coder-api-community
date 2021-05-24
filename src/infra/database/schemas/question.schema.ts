import { EntitySchema } from 'typeorm';

export const QuestionEntity = new EntitySchema({
  name: 'question',
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    idUser: {
      type: String,
      nullable: false,
    },
    query: {
      type: String,
      nullable: false,
      length: 500,
    },
    code: {
      type: String,
      nullable: true,
      length: 2000,
    },
    score: {
      type: Number,
      nullable: false,
    },
    status: {
      type: Number,
      nullable: false,
    },
  },
  relations: {
    alternative: {
      type: 'one-to-many',
      target: 'alternative',
      inverseSide: 'question',
    },
  },
});
