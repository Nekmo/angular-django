import {Dictionary} from './utility-types';

export function getCookie(name: string): null | string {
  if (!document.cookie) {
    return null;
  }

  const xsrfCookies = document.cookie.split(';')
    .map(c => c.trim())
    .filter(c => c.startsWith(name + '='));

  if (xsrfCookies.length === 0) {
    return null;
  }

  return decodeURIComponent(xsrfCookies[0].split('=')[1]);
}


export function getNestedDictionary(dictionary: Dictionary<any>, nestedKey: string): any {
  nestedKey.split('__').forEach((subFieldName: string) => {
    dictionary = dictionary[subFieldName];
    if (dictionary === undefined) {
        throw new Error(`Invalid item ${subFieldName} on ${nestedKey} query`);
    }
    if (dictionary.type === 'nested object') {
        dictionary = dictionary.children;  // TODO: al devolverse dictionary.children no se sabe el tipo.
    }
  });
  return dictionary;
}
