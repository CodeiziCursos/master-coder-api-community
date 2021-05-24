import { EntitySchema } from 'typeorm';

export const AlternativeEntity = new EntitySchema({
  name: 'alternative',
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    text: {
      type: String,
      length: 250,
      nullable: false,
    },
    correct: {
      type: Boolean,
      nullable: false,
    },
  },
  relations: {
    questions: {
      type: 'many-to-one',
      target: 'question',
      joinColumn: true,
    },
  },
});
