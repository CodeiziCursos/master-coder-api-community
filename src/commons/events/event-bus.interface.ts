export interface IEventBus<T> {
  publish(event: T);
}
