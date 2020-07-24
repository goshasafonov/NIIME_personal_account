var supportRequests = [
    {
        "IdReq"      : 1,
        "Status"     : "New",
        "Title"      : "Отсутствует дока на редактор. Ох уж эта разработка веб приложений ",
        "Author"     : "Рябинин А.Д.",
        "DateCreate" : "21.07.2020",
        "Content"    : "В разделе отправки заявок именуемом Поддержка нету документации обьясняющей работу самого редактора и отдельных его модулей"
    },
    {
        "IdReq"      : 2,
        "Status"     : "Block",
        "Title"      : "Отсутствует дока на редактор. Ох уж эта разработка веб приложений ",
        "Author"     : "Рябинин А.Д.",
        "DateCreate" : "21.07.2020",
        "Content"    : "В разделе отправки заявок именуемом Поддержка нету документации обьясняющей работу самого редактора и отдельных его модулей"
    },
    {
        "IdReq"      : 3,
        "Status"     : "New",
        "Title"      : "Отсутствует дока на редактор. Ох уж эта разработка веб приложений ",
        "Author"     : "Рябинин А.Д.",
        "DateCreate" : "21.07.2020",
        "Content"    : "В разделе отправки заявок именуемом Поддержка нету документации обьясняющей работу самого редактора и отдельных его модулей"
    },
    {
        "IdReq"      : 4,
        "Status"     : "Done",
        "Title"      : "Отсутствует дока на редактор. Ох уж эта разработка веб приложений ",
        "Author"     : "Рябинин А.Д.",
        "DateCreate" : "21.07.2020",
        "Content"    : "В разделе отправки заявок именуемом Поддержка нету документации обьясняющей работу самого редактора и отдельных его модулей"
    },
    {
        "IdReq"      : 5,
        "Status"     : "New",
        "Title"      : "Отсутствует дока на редактор. Ох уж эта разработка веб приложений ",
        "Author"     : "Рябинин А.Д.",
        "DateCreate" : "21.07.2020",
        "Content"    : "В разделе отправки заявок именуемом Поддержка нету документации обьясняющей работу самого редактора и отдельных его модулей"
    },
    {
        "IdReq"      : 6,
        "Status"     : "Block",
        "Title"      : "Отсутствует дока на редактор. Ох уж эта разработка веб приложений ",
        "Author"     : "Рябинин А.Д.",
        "DateCreate" : "21.07.2020",
        "Content"    : "В разделе отправки заявок именуемом Поддержка нету документации обьясняющей работу самого редактора и отдельных его модулей"
    },{
        "IdReq"      : 7,
        "Status"     : "New",
        "Title"      : "Отсутствует дока на редактор. Ох уж эта разработка веб приложений ",
        "Author"     : "Рябинин А.Д.",
        "DateCreate" : "21.07.2020",
        "Content"    : "В разделе отправки заявок именуемом Поддержка нету документации обьясняющей работу самого редактора и отдельных его модулей"
    },{
        "IdReq"      : 8,
        "Status"     : "Job",
        "Title"      : "Отсутствует дока на редактор. Ох уж эта разработка веб приложений ",
        "Author"     : "Рябинин А.Д.",
        "DateCreate" : "21.07.2020",
        "Content"    : "В разделе отправки заявок именуемом Поддержка нету документации обьясняющей работу самого редактора и отдельных его модулей"
    },{
        "IdReq"      : 9,
        "Status"     : "New",
        "Title"      : "Отсутствует дока на редактор. Ох уж эта разработка веб приложений ",
        "Author"     : "Рябинин А.Д.",
        "DateCreate" : "21.07.2020",
        "Content"    : "В разделе отправки заявок именуемом Поддержка нету документации обьясняющей работу самого редактора и отдельных его модулей"
    },
    {
        "IdReq"      : 10,
        "Status"     : "Done",
        "Title"      : "Отсутствует дока на редактор. Ох уж эта разработка веб приложений ",
        "Author"     : "Рябинин А.Д.",
        "DateCreate" : "21.07.2020",
        "Content"    : "В разделе отправки заявок именуемом Поддержка нету документации обьясняющей работу самого редактора и отдельных его модулей"
    },
    {
        "IdReq"      : 11,
        "Status"     : "Job",
        "Title"      : "Отсутствует дока на редактор. Ох уж эта разработка веб приложений ",
        "Author"     : "Рябинин А.Д.",
        "DateCreate" : "21.07.2020",
        "Content"    : "В разделе отправки заявок именуемом Поддержка нету документации обьясняющей работу самого редактора и отдельных его модулей"
    }
];



StartButtonsFilter('.buttonsForChangeTypeRender', switchWidthRowCol);

StartButtonsFilter('.typeRequests', filterOptions);
renderAllCard( '.supportRequests', supportRequests, 'All');







function renderAllCard(selectorToAdd, data, type){
    var colCounter = 0;
    var container = document.querySelector(selectorToAdd);
    var row = document.createElement('div');
    row.setAttribute('class', 'row');
    container.innerHTML = '';
    container.appendChild(row);
    
    
    for(var i = 0; i < data.length; i++)
    {
        item = data[i];
        
        if (type) {
            if (type === 'All'){}
            else if (item.Status !== type) {continue}
        }
        
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
    };
    $('[data-toggle="tooltip"]').tooltip();
}

function addCard(selectorToAdd, elem){
    var container = document.querySelector(selectorToAdd);
    container.appendChild(elem);
};

function createRequestCard (_) {
    var opt = renderOptForStatus(_.Status);
    var card = document.createElement('div');
    card.setAttribute('class', `mb-3 card border-${opt.colorClass}`);
    card.setAttribute('data-idreq', _.IdReq);
    card.style.fontSize = '11px';
    
    
    var href = document.querySelector('.supportHrefFooter');
    href = href.getAttribute('href');
    var href = href.replace(/support/g, '');


    card.innerHTML = 
    `
    <div class="card-body py-3">
        <div class="containerSpanTypeRequest" data-toggle="tooltip" data-placement="top" title="${opt.desc}">
            <span class="hoverSpanTypeRequest border border-${opt.colorClass}"></span>
            <span class="spanTypeRequest bg-${opt.colorClass}"></span>                                        
        </div>
        <h6 class="card-title" style="border-bottom: 1px solid rgba(0,0,0,.2)">${_.Title}</h6>
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
            <a href="${href + 'admin/supportRequests/id/?req=' + _.IdReq}" class="card-link">К заявке<span class="ml-1 mdi mdi-arrow-right"></span></a>
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
function StartButtonsFilter (selector, func) {
    var buttonConteiner = document.querySelector(selector);
    var buttons = buttonConteiner.children;

    for (var i = 0; i < buttons.length; i++) {
        var input = buttons[i].querySelector('input');
        if (input.checked) {
            buttonConteiner.checkedtype = input.getAttribute('id');
            console.log('[APP] > Buttons filter checked: ', buttonConteiner.checkedtype);
            if ( func ) {
                func(buttonConteiner.checkedtype, input, buttonConteiner);
            };
        };

        buttons[i].querySelector('input').addEventListener('click', function (e) {
            e.stopPropagation(); this.blur();
            buttonConteiner.checkedtype = this.getAttribute('id');
            console.log('[APP] > Buttons filter checked: ', buttonConteiner.checkedtype);
            if ( func ) {
                func(buttonConteiner.checkedtype, this, buttonConteiner);
            };
        });
    };
};

function filterOptions (type){
    renderAllCard('.supportRequests', supportRequests, type);
};

function switchWidthRowCol(type){
    if (type === 'Cards'){RowColWidthAllPage('.supportRequests', 'col');}
    else if (type === 'Lines') {RowColWidthAllPage('.supportRequests', 'col-12');}
}

function RowColWidthAllPage (selector, className) {
    var container = document.querySelector(selector);
    var rows = container.children;
    
    for(var i = 0; i < rows.length; i++)
    {
        var cols = rows[i].children;
        
        for(var j = 0; j < cols.length; j++)
        {
            cols[j].setAttribute('class', className);
        }
    }
}