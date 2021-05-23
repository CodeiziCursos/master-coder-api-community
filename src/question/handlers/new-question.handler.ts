import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { NewQuestionCommand } from './../commands/new-question.command';
import { Question } from './../entities/question.entity';
import { Status } from '../entities/status.entity';
import { Alternative } from './../entities/alternative.entity';
import { NewQuestionCreateEvent } from './../events/new-question-created.event';
import { IEventBus } from '../../commons/events/event-bus.interface';
import { IQuestion } from '../repositories/question.repository';

@CommandHandler(NewQuestionCommand)
export class NewQuestionHandler implements ICommandHandler<NewQuestionCommand> {
  constructor(
    private repository: IQuestion,
    private eventBus: IEventBus<NewQuestionCreateEvent>,
  ) {}
  async execute(command: NewQuestionCommand): Promise<void> {
    const question = new Question(
      undefined,
      command.idUser,
      command.query,
      command.score,
      Status.Pending,
      command.alternatives.map((ac) => new Alternative(ac.text, ac.correct)),
    );
    await this.repository.save(question);
    this.eventBus.publish(NewQuestionCreateEvent.create(question));
  }
}
