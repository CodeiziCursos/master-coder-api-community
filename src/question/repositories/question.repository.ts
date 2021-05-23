import { Question } from '../entities/question.entity';

export interface IQuestion {
  save(question: Question): Promise<boolean>;
}
