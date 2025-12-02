declare module 'next-sanity' {
  export function createClient(config: any): any;
  export type SanityDocument<T = any> = T & {
    _id: string;
    _type: string;
    _createdAt: string;
    _updatedAt: string;
    _rev: string;
  };
  export const defineQuery: any;
  export const groq: any;
}

declare module 'next-sanity/live' {
  export function defineLive(config: any): any;
}

