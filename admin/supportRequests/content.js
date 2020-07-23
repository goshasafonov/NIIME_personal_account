





var supportRequests = [
    {
        "IdReq"      : 1,
        "Status"     : "New",
        "Title"      : "Отсутствует дока на редактор",
        "Author"     : "Рябинин А.Д.",
        "DateCreate" : "21.07.2020",
        "Content"    : "В разделе отправки заявок именуемом Поддержка нету документации обьясняющей работу самого редактора и отдельных его модулей"
    },
    {
        "IdReq"      : 1,
        "Status"     : "Job",
        "Title"      : "Отсутствует дока на редактор",
        "Author"     : "Рябинин А.Д.",
        "DateCreate" : "21.07.2020",
        "Content"    : "В разделе отправки заявок именуемом Поддержка нету документации обьясняющей работу самого редактора и отдельных его модулей"
    },
    {
        "IdReq"      : 1,
        "Status"     : "New",
        "Title"      : "Отсутствует дока на редактор",
        "Author"     : "Рябинин А.Д.",
        "DateCreate" : "21.07.2020",
        "Content"    : "В разделе отправки заявок именуемом Поддержка нету документации обьясняющей работу самого редактора и отдельных его модулей"
    },
    {
        "IdReq"      : 1,
        "Status"     : "Block",
        "Title"      : "Отсутствует дока на редактор",
        "Author"     : "Рябинин А.Д.",
        "DateCreate" : "21.07.2020",
        "Content"    : "В разделе отправки заявок именуемом Поддержка нету документации обьясняющей работу самого редактора и отдельных его модулей"
    },
    {
        "IdReq"      : 1,
        "Status"     : "New",
        "Title"      : "Отсутствует дока на редактор",
        "Author"     : "Рябинин А.Д.",
        "DateCreate" : "21.07.2020",
        "Content"    : "В разделе отправки заявок именуемом Поддержка нету документации обьясняющей работу самого редактора и отдельных его модулей"
    },
    {
        "IdReq"      : 1,
        "Status"     : "New",
        "Title"      : "Отсутствует дока на редактор",
        "Author"     : "Рябинин А.Д.",
        "DateCreate" : "21.07.2020",
        "Content"    : "В разделе отправки заявок именуемом Поддержка нету документации обьясняющей работу самого редактора и отдельных его модулей"
    },
    {
        "IdReq"      : 1,
        "Status"     : "Done",
        "Title"      : "Отсутствует дока на редактор",
        "Author"     : "Рябинин А.Д.",
        "DateCreate" : "21.07.2020",
        "Content"    : "В разделе отправки заявок именуемом Поддержка нету документации обьясняющей работу самого редактора и отдельных его модулей"
    },
    {
        "IdReq"      : 1,
        "Status"     : "Done",
        "Title"      : "Отсутствует дока на редактор",
        "Author"     : "Рябинин А.Д.",
        "DateCreate" : "21.07.2020",
        "Content"    : "В разделе отправки заявок именуемом Поддержка нету документации обьясняющей работу самого редактора и отдельных его модулей"
    }
];




renderAllCard( '.supportRequests', supportRequests);

$('[data-toggle="tooltip"]').tooltip();







function renderAllCard(selectorToAdd, data){
    var colCounter = 0;
    var container = document.querySelector(selectorToAdd);
    var row = document.createElement('div');
    row.setAttribute('class', 'row');
    container.appendChild(row);
    
    data.forEach(function(item, i, arr){
        var col = document.createElement('div');
        col.setAttribute('class', 'col');
        col.appendChild( createRequestCard(item) );
        
        if(colCounter >= 3){
            row = document.createElement('div');
            row.setAttribute('class', 'row');
            container.appendChild(row);
            colCounter = 0;
        }
        
        row.appendChild(col);        
        colCounter++;
    });
}

function addCard(selectorToAdd, elem){
    var container = document.querySelector(selectorToAdd);
    container.appendChild(elem);
};

function createRequestCard (_) {
    console.log(_);
    var opt = renderOptForStatus(_.Status);
    var card = document.createElement('div');
    card.setAttribute('class', `mb-3 card border-${opt.colorClass}`);
    card.setAttribute('data-idreq', _.IdReq);
    card.style.fontSize = '11px';

    card.innerHTML = 
    `
    <div class="card-body py-3">
        <div class="containerSpanTypeRequest" data-toggle="tooltip" data-placement="top" title="${opt.desc}">
            <span class="hoverSpanTypeRequest border border-${opt.colorClass}"></span>
            <span class="spanTypeRequest bg-${opt.colorClass}"></span>                                        
        </div>
        <h6 class="card-title">${_.Title}</h6>
        <p class="card-subtitle mb-2 text-muted" style="font-weight: 600; font-size: 12px;">
            <span>${_.Author}</span>
            <span class="mdi mdi-account-circle"></span>
            <span class="badge badge-${opt.colorClass} font-weight-bold" style="padding-top: 0.1rem;padding-bottom: 0.1rem;">
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
function renderOptForStatus (status){
    var type;
    var opt = {
        "New"   : {"desc" : "Новая заявка",         "colorClass": "info"},
        "Job"   : {"desc" : "Заявка в работе",      "colorClass": "warning"},
        "Done"  : {"desc" : "Заявка выполнена",     "colorClass": "success"},
        "Block" : {"desc" : "Заявка заблокирована", "colorClass": "danger"}
    };
    
    for (var key in opt) {
        if (key === status) {
            type = opt[key];
        };
    };
    return type;    
}



//Работа радио кнопок
function radioButton () {

}


var buttonConteiner = document.querySelector('.typeRequests');
var buttons = buttonConteiner.children;

for (var i = 0; i < buttons.length; i++) {

    var input = buttons[i].querySelector('input')
    if (input.checked) {
        input.getAttribute('id');
    }    


    buttons[i].addEventListener('mouseup', function (e) {
        var val = this.querySelector('input').getAttribute('id');
        console.log(val);
    });
}