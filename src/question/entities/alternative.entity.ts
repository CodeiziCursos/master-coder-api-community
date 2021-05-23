export class Alternative {
  private _text: string;
  private _correct: boolean;

  constructor(text: string, correct: boolean) {
    this._text = text;
    this._correct = correct;
  }

  public get text(): string {
    return this._text;
  }

  public get correct(): boolean {
    return this._correct;
  }
}
