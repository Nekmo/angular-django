export interface Dict<TVal, /*TKey = string*/> {
  [key: string /*TKey*/]: TVal;
}


export type Dictionary<T> = Dict<T>;
