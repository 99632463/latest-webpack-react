declare module '*.jpg';
declare module '*.png';
declare module '*.gif';
declare module '*.bmp';
declare module '*.jpeg';
declare module '*.svg';
declare module '*.eot';
declare module '*.ttf';
declare module '*.woff';
declare module '*.woff2';

interface IKeyValueMap<T = any> {
  [key: string]: T;
}