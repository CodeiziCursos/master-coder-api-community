import { NewQuestionHandler } from './new-question.handler';
import { Question } from './../entities/question.entity';
import { Alternative } from '../entities/alternative.entity';
import { Status } from '../entities/status.entity';
import {
  AlternativeCommand,
  NewQuestionCommand,
} from './../commands/new-question.command';
import { IEventBus } from './../../commons/events/event-bus.interface';
import { NewQuestionCreateEvent } from './../events/new-question-created.event';
import { IQuestion } from '../repositories/question.repository';

const repository: jest.Mocked<IQuestion> = {
  save: jest.fn(),
};

const eventBus: jest.Mocked<IEventBus<NewQuestionCreateEvent>> = {
  publish: jest.fn(),
};
describe('NewQuestionHandler', () => {
  const makeQuestion = (): Question => {
    return new Question(undefined, '', '', 5, Status.Pending, [
      new Alternative('', false),
    ]);
  };

  const makeCommand = () => {
    return new NewQuestionCommand('', '', 5, [
      new AlternativeCommand('', false),
    ]);
  };

  const makeSut = () => {
    return {
      repository,
      eventBus,
    };
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call repository with correct question', async () => {
    const { repository, eventBus } = makeSut();

    const hander = new NewQuestionHandler(repository, eventBus);
    hander.execute(makeCommand());

    expect(repository.save).toBeCalledWith(makeQuestion());
  });

  it('should call event event created', async () => {
    const { id, idUser } = makeQuestion();
    const { repository, eventBus } = makeSut();

    const hander = new NewQuestionHandler(repository, eventBus);
    await hander.execute(makeCommand());

    expect(eventBus.publish).toBeCalledWith(
      new NewQuestionCreateEvent(idUser, id),
    );
  });
});
