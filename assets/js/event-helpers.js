import {setFilterLocale} from './html-handlers.js';
import {searchValue} from './index.js';
import {valueFilterLocale} from './index.js';
import {topicLocale} from './index.js';
import {totalNumberP} from './index.js';
import {totalSearchResult} from './index.js';

/* Declarando as funções listiners para coletar as cidades-UF */

export function getLocale(){
    searchValue.addEventListener('blur', function(e){
        if(searchValue.value==="") return
        setFilterLocale(searchValue.value.trim())
        searchValue.value = "";
    })
}

export function getLocaleKeypress(){
    searchValue.addEventListener('keypress', function(e){
        if(e.keyCode===13){
            if(searchValue.value==="") return
            setFilterLocale(searchValue.value.trim())
            searchValue.value = "";
        }
    })
}

/* Declarando as funções listiners para limpar os filtros */

export function clearFilterLocale(){
    valueFilterLocale.addEventListener('click', function(e){
        valueFilterLocale.innerText = ""
        topicLocale.innerText = ""
        topicLocale.setAttribute('class', 'topicLocale')

        totalNumberP.innerText = "";
        totalSearchResult.innerHTML = "";
    })
}

export function clearTopicLocale(){
    topicLocale.addEventListener('click', function(e){
        valueFilterLocale.innerText = ""
        topicLocale.innerText = ""
        topicLocale.setAttribute('class', 'topicLocale')

        totalNumberP.innerText = "";
        totalSearchResult.innerHTML = "";
    })
}