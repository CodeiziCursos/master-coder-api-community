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
    const repository = new QuestionRepository();
    repository.save = jest.fn(() => Promise.resolve(true));
    const eventBus = new EventBusMock();
    const spy = jest.spyOn(EventBusMock.prototype, 'publish');
    return {
      repository,
      eventBus,
      spy,
    };
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call repository with correct question', async () => {
    const { repository } = makeSut();

    const hander = new NewQuestionHandler(repository, new EventBusMock());
    hander.execute(makeCommand());

    expect(repository.save).toBeCalledWith(makeQuestion());
  });

  it('should call event event created', async () => {
    const { id, idUser } = makeQuestion();
    const { repository, eventBus, spy } = makeSut();

    const hander = new NewQuestionHandler(repository, eventBus);
    await hander.execute(makeCommand());

    expect(spy.mock.calls.length).toBe(1);
    expect(spy).toBeCalledWith(new NewQuestionCreateEvent(idUser, id));
  });
});

export class QuestionRepository {
  async save(question: Question): Promise<boolean> {
    return Promise.resolve(true);
  }
}

export class EventBusMock implements IEventBus<NewQuestionCreateEvent> {
  publish(event: NewQuestionCreateEvent) {
    return event;
  }
}
