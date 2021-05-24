import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm/repository/Repository';
import { Question } from '../../../question/entities/question.entity';
import { IQuestionRespository } from '../../../question/repositories/question.repository';
import { QUESTION_REPOSITORY } from '../constants';

@Injectable()
export class QuestionRepository implements IQuestionRespository {
  constructor(
    @Inject(QUESTION_REPOSITORY)
    private respository: Repository<Question>,
  ) {}

  async save(question: Question): Promise<boolean> {
    await this.respository.save(question);
    return true;
  }
}
