import { AggregateRoot } from '@nestjs/cqrs';
import { Alternative } from './alternative.entity';
import { Score } from './score.entity';
import { Status } from './status.entity';
import { NewQuestionCreateEvent } from './../events/new-question-created.event';

export class Question extends AggregateRoot {
  private _score: Score;

  constructor(
    private _id: string,
    private _idUser: string,
    private _query: string,
    score: number,
    private _status: Status = Status.Pending,
    private _alternatives: Alternative[] = [],
  ) {
    super();
    this._score = new Score(score);
  }
  public get id(): string {
    return this._id;
  }

  public get idUser(): string {
    return this._idUser;
  }

  public get query(): string {
    return this._query;
  }

  public get score(): Score {
    return this._score;
  }

  public get status(): Status {
    return this._status;
  }

  public get alternatives(): Alternative[] {
    return [...this._alternatives];
  }

  public newQuestionCreated() {
    this.apply(new NewQuestionCreateEvent(this.idUser, this._id));
  }
}
