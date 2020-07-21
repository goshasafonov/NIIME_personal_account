





var supportRequests = [
    {
        "IdReq"      : 1,
        "Priority"   : 1,
        "Title"      : "Отсутствует дока на редактор",
        "Author"     : "Рябинин А.Д.",
        "DateCreate" : "21.07.2020",
        "Content"    : "В разделе отправки заявок именуемом Поддержка нету документации обьясняющей работу самого редактора и отдельных его модулей",

    }
];




//addCard( '.supportRequests', createRequestCard(supportRequests[0]) );




function addCard(selectorToAdd, elem){
    var container = document.querySelector(selectorToAdd);
    container.appendChild(elem);
};

function createRequestCard (_) {
    console.log(_);
    var card = document.createElement('div');
    card.setAttribute('class', 'card border-info');
    card.setAttribute('data-idreq', _.IdReq);
    card.style.width = '18rem';
    card.style.fontSize = '11px';

    card.innerHTML = 
    `
    <div class="card-body py-3">
        <h6 class="card-title">${_.Title}</h6>
        <p class="card-subtitle mb-2 text-muted" style="font-weight: 600; font-size: 12px;">
            <span>${_.Author}</span>
            <span class="mdi mdi-account-circle"></span>
            <span class="badge badge-info" style="padding-top: 0.1rem;padding-bottom: 0.1rem;">
                <span>Создано:</span>
                <span>${_.DateCreate}</span>
            </span>
        </p>
        <p class="card-text">${_.Content}</p>
        <div class="d-flex justify-content-between">
            <a href="#" class="card-link">Взять сразу</a>
            <a href="#" class="card-link">К заявке<span class="ml-1 mdi mdi-arrow-right"></span></a>
        </div>
    </div>
    `;
    return card;
}