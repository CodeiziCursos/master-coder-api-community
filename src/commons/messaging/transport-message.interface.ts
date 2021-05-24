import { Observable } from 'rxjs';

export interface ITransportMessage<T> {
  pattern: string;
  send(pattern: any, payload: any): Observable<T>;
  emit(pattern: any, payload: any): void;
}
