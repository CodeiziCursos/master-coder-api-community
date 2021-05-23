export class NewQuestionCommand {
  constructor(
    public readonly idUser: string,
    public readonly query: string,
    public readonly score: number,
    public readonly alternatives: AlternativeCommand[],
  ) {}
}

export class AlternativeCommand {
  constructor(public readonly text: string, public readonly correct: boolean) {}
}
