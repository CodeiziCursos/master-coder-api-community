import { Question } from '../entities/question.entity';

export interface IQuestionRespository {
  save(question: Question): Promise<boolean>;
}
