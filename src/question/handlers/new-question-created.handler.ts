import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ITransportMessage } from './../../commons/messaging/transport-message.interface';
import { NewQuestionCreateEvent } from './../events/new-question-created.event';

@EventsHandler(NewQuestionCreateEvent)
export class NewQuestionCreatedHandler
  implements IEventHandler<NewQuestionCreateEvent>
{
  constructor(private transport: ITransportMessage<NewQuestionCreateEvent>) {}
  handle(event: NewQuestionCreateEvent) {
    this.transport.emit(this.transport.pattern, event);
  }
}
