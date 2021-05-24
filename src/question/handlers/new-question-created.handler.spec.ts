import { ITransportMessage } from '../../commons/messaging/transport-message.interface';
import { NewQuestionCreateEvent } from '../events/new-question-created.event';
import { NewQuestionCreatedHandler } from './new-question-created.handler';

const messageTransport: jest.Mocked<ITransportMessage<NewQuestionCreateEvent>> =
  {
    emit: jest.fn(),
    send: jest.fn(),
    pattern: 'any_route',
  };

describe('NewQuestionCreatedHandler', () => {
  const makeNewQuestionCreateEvent = () => {
    return new NewQuestionCreateEvent('anY_id', 'any_id_question');
  };
  it('should call event with correct params', () => {
    const hander = new NewQuestionCreatedHandler(messageTransport);
    hander.handle(makeNewQuestionCreateEvent());
    expect(messageTransport.emit).toBeCalledWith(
      messageTransport.pattern,
      makeNewQuestionCreateEvent(),
    );
    expect(messageTransport.send).not.toBeCalled();
  });
});
