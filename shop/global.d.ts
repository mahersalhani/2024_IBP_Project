type Messages = typeof import('@/messages/en.json');
declare interface IntlMessages extends Messages {}

declare type Message = 'error' | 'required' | 'short_field' | 'long_field';
