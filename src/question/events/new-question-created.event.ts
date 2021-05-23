import { Question } from './../entities/question.entity';
export class NewQuestionCreateEvent {
  constructor(
    public readonly idUser: string,
    public readonly idQuestion: string,
  ) {}

  static create(question: Question): NewQuestionCreateEvent {
    return new NewQuestionCreateEvent(question.idUser, question.id);
  }
}
