import { getLocale } from './event-helpers.js';
import { getLocaleKeypress } from './event-helpers.js';
import { clearFilterLocale } from './event-helpers.js';
import { clearTopicLocale } from './event-helpers.js';


export const searchValue = document.querySelector('.searchValue');
export const value = document.querySelector('.valueSearch');
export const valueFilterLocale = document.querySelector('.valueFilterLocale')
export const topicLocale = document.querySelector('.topicLocale');
export const totalNumberP = document.querySelector('.totalNumberP');
export const totalSearchResult = document.querySelector('.totalSearchResult')

searchValue.focus();

/* Chamando as funções listiners */

getLocale();
getLocaleKeypress();
clearFilterLocale();
clearTopicLocale();