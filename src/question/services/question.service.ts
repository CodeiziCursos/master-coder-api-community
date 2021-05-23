import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { NewQuestionCommand } from '../commands/new-question.command';

@Injectable()
export class QuestionService {
  constructor(private commandBus: CommandBus) {}
  async newQuestion(command: NewQuestionCommand): Promise<void> {
    await this.commandBus.execute(command);
  }
}
