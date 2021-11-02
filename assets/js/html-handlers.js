import {valueFilterLocale} from './index.js';
import {totalSearchResult} from './index.js';
import {totalNumberP} from './index.js';
import {topicLocale} from './index.js';


/* Tratando a localidade para inserção nos filtros */

export function setFilterLocale(locale){
    let tratedLocale = locale.toLowerCase().split(" ");
    
    getLocaleWithUF(tratedLocale.join());
}

/* Dicionário de UF's */

function getLocaleWithUF(locale){
    
    let localeTrated = locale.replace(new RegExp('[ÁÀÂÃ]','gi'), 'a');
    let localeTrated2 = localeTrated.replaceAll(',','')
    
    const uf = [
        {cidade:'saopaulo' , uf:'SP'},
        {cidade:'riodejaneiro' , uf:'RJ'}
    ];
    let localeUF='';
    uf.forEach(el => el.cidade === localeTrated2 ? localeUF = el.uf : '');

    trateLocaleEndPoint(localeTrated, localeUF.toLowerCase())
}

/* Tradutor das Amenities */

function getTranslate(amenities) {
    const worlds = [
        {ingles: 'PETS_ALLOWED' , portugues: 'Aceita Animais'},
        {ingles: 'ELEVATOR' , portugues: 'Elevador'},
        {ingles: 'ELECTRONIC_GATE' , portugues: 'Portão Eletrônico'},
        {ingles: 'CINEMA' , portugues: 'Cinema'},
        {ingles: 'GYM' , portugues: 'Academia'},
        {ingles: 'GATED_COMMUNITY' , portugues: 'Portão Comunitário'},
        {ingles: 'PLAYGROUND' , portugues: 'Parque Infantil'},
        {ingles: 'SAUNA' , portugues: 'Sauna'},
        {ingles: 'GARDEN' , portugues: 'Jardim'},
        {ingles: 'PARTY_HALL' , portugues: 'Salão de Festas'},
        {ingles: 'FURNISHED' , portugues: 'Mobiliada'},
        {ingles: 'FIREPLACE' , portugues: 'Lareira'},
        {ingles: 'POOL' , portugues: 'Piscina'},
        {ingles: 'BARBECUE_GRILL' , portugues: 'Churrasqueira'},
        {ingles: 'AIR_CONDITIONING' , portugues: 'Ar Condicionado'},
        {ingles: 'BICYCLES_PLACE' , portugues: 'Bicicletário'},
        {ingles: 'SPORTS_COURT' , portugues: 'Quadra de Esportes'},
        {ingles: 'AMERICAN_KITCHEN' , portugues: 'Cozinha Americana'},
        {ingles: 'TENNIS_COURT' , portugues: 'Quadra de Tênis'},
        {ingles: 'LAUNDRY' , portugues: 'Lavanderia'}
    ]
    let translatedWorld='';
    worlds.forEach(el => el.ingles === amenities ? translatedWorld = el.portugues : '');
    return translatedWorld;
}

/* Gerando os botões de filtro */

const generateFilter = (city, uf) => {
    valueFilterLocale.innerText = city + " - " + uf;
    topicLocale.innerText = city + " - " + uf;
    topicLocale.setAttribute('class', 'topicLocale2')
}

/* Tratamento das localidades para adicionar no end point */

function trateLocaleEndPoint(city,uf){
    let tratedLocale = city.toLowerCase().replaceAll(",", "-");
    let tratedLocale2 = tratedLocale.replace(new RegExp('[ÁÀÂÃ]','gi'), 'a')
    getInfo(tratedLocale2, uf);
}

/* Fetch */

const getInfo = async (uf,city) => {
    try{
        const response = await fetch(`https://private-9e061d-piweb.apiary-mock.com/venda?state=${city}&city=${uf}`)
        const data = await response.json();
        totalSearchResult.innerHTML = await generateHTML(data)
        
        generateMsg(data.search.totalCount, data.search.result.listings[0].link.data.state, data.search.result.listings[0].listing.address.stateAcronym);

        generateFilter(data.search.result.listings[0].link.data.state, data.search.result.listings[0].listing.address.stateAcronym);
    }
    catch(e){
        totalSearchResult.innerHTML = errorMsg();
        totalNumberP.innerText = '';
        valueFilterLocale.innerText = '';
        topicLocale.innerText = '';
        topicLocale.setAttribute('class', 'topicLocale')
    }
}

/* Criadora da tela de erro */

const errorMsg =()=>{
    let msgError = 
    `<div class="error">
        <P>OOOOPS!</P>
        <p>ALGO DEU ERRADO NA SUA BUSCA.</p>
        <p class="errorStatus">status 500</p>
        <p>POR FAVOR, TENTE NOVAMENTE.</p>
    </div>`
    
    return msgError
}

/* Inserção do card de resultados no HTML  */

const generateHTML = data => data.search.result.listings.reduce((acc, atual)=>{
    acc += 
    `
    <div class="searchResult">
                    <div class="divSearchImg">
                        <img class="searchImg" src="${atual.medias[0].url}" alt="">
                    </div>
                    <div class="searchInfo">
                        <div class="street">
                            <p>${atual.link.data.street}, ${atual.link.data.streetNumber} - ${atual.link.data.neighborhood}, ${atual.link.data.state} - ${atual.listing.address.stateAcronym}</p>
                        </div>
                        <div class="name">
                            <p>${atual.link.name}</p>
                        </div>
                        <div class="infoSearch">
                            <p>${atual.listing.usableAreas[0] || '-'}m² ${atual.listing.bedrooms[0]} Quartos ${atual.listing.bathrooms[0]} Banheiros ${atual.listing.parkingSpaces[0]} Vagas</p>
                        </div>
                        <ul class="amenities">
                            ${generateLI(atual.listing.amenities)}
                        </ul>
                        <div class="price">
                            <h3>${setPrice(atual.listing.pricingInfos[0].price)}</h3>
                        </div>
                        <div class="condominio">
                            <p>Condomínio: ${setCondoFee(atual.listing.pricingInfos[0].monthlyCondoFee)}</p>
                        </div>
                    </div>
                </div>
    `
    return acc;
}, '')

/* Tratando o valor do condomínio e do imóvel para formato BR */

const setCondoFee = condo =>{
    return !condo ? '-' : Number(condo).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
}

const setPrice = price => {
    return !price ? '-' : Number(price).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
}

/* Gerando as li's dos amenities */

const generateLI = (item) => {
    let lis = item.map(item => `<li>${getTranslate(item)}</li>`).join(' ')
    return lis
}

/* Gerando a mensagem do total da pesquisa */

const generateMsg = (total, city, uf) => {
    totalNumberP.innerText = `${total} Imóveis a venda em ${city} - ${uf}`
}