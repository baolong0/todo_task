export default interface Container {
  inject(): void;
  set(type: symbol, instance: any): void;
  get<T>(type: symbol): T | null;
  getNotNull<T>(type: symbol): T;
}
