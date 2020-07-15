var clog = {
    nowDate       : new Date(),
    holidaysColor : '#CB7770',
    holidayBG     : '#454d55',
    thead         : document.createElement('thead'),
    trDaysWeek    : document.createElement('tr'),
    trDaysMonth   : document.createElement('tr'),
    tbody         : document.createElement('tbody'),
    table         : document.querySelector('.visitorsLogTable'),
    
    renderSelectDate : function (Year, Month) {
        this.selector('.selectMonth').innerHTML = this.getMonthRus(Month);
	    this.selector('.selectYear').innerHTML  = Year;
    },
    
    renderHead    : function (Year, Month) {
        var Y, M, D, LD, headElement = ['#', 'Ф.И.О'];
        if (Year || Month){
            this.setSelectDate(Year, Month);
            Y  = this.selectYear;
            M  = this.selectMonth;
            LD = this.getLastDay(Y, M);
            console.log(Y, M);
        }
        else{
            Y  = this.currentYear;
            M  = this.currentMonth;
            D  = this.today;
            LD = this.getLastDay(Y, M);
        };
        console.log(Y,M,D,LD);
        
        // Рендер дней недели //
        var emptyTh       = document.createElement('th');
        var dayWeek       = new Date(Y, M);
        setAttributes(emptyTh, {'scope': 'col', 'colspan': '2'});
	    emptyTh.innerHTML = 'Таблица посещения';
        this.trDaysWeek.innerHTML = '';
        this.trDaysWeek.appendChild(emptyTh);
        
        for (var i = 1; i <= LD; i++) {
    		var th = document.createElement('th');
    		th.setAttribute('scope', 'col');
    		dayWeek.setDate(i);
    		th.innerHTML = this.getWeekDay(dayWeek);

    		if ( dayWeek.getDay() === 0 || dayWeek.getDay() === 6) {
    			th.style.backgroundColor = this.holidayBG;
    			th.style.color = this.holidaysColor;
    		}
    		this.trDaysWeek.appendChild(th);
	    };
        
        // Рендер чисел дней месяца //

        // Добавить первые элементы шапки таблицы
        this.trDaysMonth.innerHTML = '';
        
    	for (var i = 0; i < headElement.length; i++) {
    		var th = document.createElement('th');
    		th.setAttribute('scope', 'col');
    		th.innerHTML = headElement[i];
    		this.trDaysMonth.appendChild(th);
    	};
        
        // Заполняем шапку таблицы датами месяца
    	for (var i = 1; i <= LD; i++) {
    		var th = document.createElement('th');
    		th.setAttribute('scope', 'col');
    		th.innerHTML = i;
    		dayWeek.setDate(i);
    		if ( dayWeek.getDay() === 0 || dayWeek.getDay() === 6) {
    			th.style.backgroundColor = this.holidayBG;
    			th.style.color = this.holidaysColor;
    		};

    		if ( this.currentYear === Y && this.currentMonth === M && this.today === dayWeek.getDate() ) {
    			var span = document.createElement('span');
    			span.innerHTML = i;
    			span.style.backgroundColor = '#3F51B5';
    			span.setAttribute('class', 'toDaySpan');
                
    			th.innerHTML='';

                th.setAttribute('data-toggle', 'tooltip');
                th.setAttribute('data-placement', 'right');
                th.setAttribute('title', `Сегодня 
                    ${Number(this.today) < 10 ? '0' + Number(this.today) : Number(this.today)} .
                    ${Number(this.currentMonth) + 1 < 10 ? '0' + (Number(this.currentMonth) + 1) : Number(this.currentMonth) + 1} .
                    ${Number(this.currentYear) < 10 ? '0' + Number(this.currentYear) : Number(this.currentYear)}`);

    			th.appendChild(span);
    			th.style.padding = '0.2rem';
    		}
    		this.trDaysMonth.appendChild(th);
    	}
        
        this.thead.appendChild(this.trDaysWeek);
        this.thead.appendChild(this.trDaysMonth);
        this.table.appendChild(this.thead);
        return {Year : Y, Month: M};
    },
    
    renderTbody   : function (dataForTable, Year, Month) {
        var LD = this.getLastDay(Year, Month);
        var dayMonth     = new Date(Year, Month);
        this.tbody.innerHTML = '';
        
        for (var i = 0; i < dataForTable.length; i++){
            var tr   = document.createElement('tr');
            var th   = document.createElement('th');
            th.setAttribute('scope', 'row');
            th.innerHTML = i + 1;
            var span = document.createElement('span');
            span.setAttribute('class' , 'mdi mdi-chevron-double-down text-warning');
            tr.appendChild(th).appendChild(span).style.display = 'none';
            var td   = document.createElement('td');
            td.innerHTML = dataForTable[i].name;
            tr.appendChild(td);

            var rulesForData = {
                work    : { mdi : 'mdi mdi-check-bold', color: '#4CAF50' , description: 'Рабочий день' },
                sick    : { mdi : 'mdi mdi-ambulance',  color: '#FF9800' , description: 'Больничный'   },
                holiday : { mdi : 'mdi mdi-palm-tree',  color: '#2196F3' , description: 'Отпуск'       },
                not     : { mdi : 'emprty',             color: 'empty'   , description: 'Отсутствие'   }
            };

		      
            var colSick = 1;
            
            for (var j = 1; j <= LD; j++) {
                var td = document.createElement('td');
                var option = this.checkRulesForData(rulesForData, dataForTable[i].date[j]);
                var span = document.createElement('span');

                dayMonth.setDate(j);
                // Правило не позволяющее окрасить в цвет выходного дня склеиные ячейка интервала отпусков и больничных
                if ( dayMonth.getDay() === 0 || dayMonth.getDay() === 6) {
                    if ( (dataForTable[i].date[j] === 'sick' && (dataForTable[i].date[j - 1] === 'sick' || dataForTable[i].date[j + 1] === 'sick') ) ||
                         (dataForTable[i].date[j] === 'holiday' && (dataForTable[i].date[j - 1] === 'holiday' || dataForTable[i].date[j + 1] === 'holiday') ) )
                    {} else{ td.style.backgroundColor = this.holidayBG; }
                };
                // Набор правил рендеринга таблицы
                if ( option.mdi === 'empty' ) {
                    tr.appendChild(td);
                }
                // Склеивание столбцов при параметре больничного
                else if (dataForTable[i].date[j] === 'sick' ) {
                    if (dataForTable[i].date[j + 1] === 'sick') { colSick ++; 
                        if (dataForTable[i].date[j - 1] != 'sick') {var dateStart = j;}                         
                    }
                    else if ( dataForTable[i].date[j - 1] != 'sick' && dataForTable[i].date[j + 1] != 'sick' ) {
                        span.setAttribute('class', option.mdi );
                        tr.appendChild(td).appendChild(span).style.color = option.color;
                        //TOOLTIP
                        addtTooltipDATE (td, dataForTable[i].name, option.description, {'interval':false, 'dd':j, 'mm':Month + 1, 'yy':Year}, 'hover');
                    }
                    else if ( dataForTable[i].date[j - 1] === 'sick' && dataForTable[i].date[j + 1] != 'sick' ) {
                        td.appendChild( createBadge ('badge-warning', option.description, option.mdi) );
                        //TOOLTIP
                        var objDate = {'interval' : true, 'dd1': dateStart, 'mm1': Month+1, 'yy1': Year, 'dd2': j, 'mm2': Month+1, 'yy2': Year};
                        addtTooltipDATE( td, dataForTable[i].name, option.description, objDate, 'hover' );

                        tr.appendChild(td).setAttribute('colspan', colSick);
                        colSick = 1;
                    }
                }
                else if (dataForTable[i].date[j] === 'holiday' ) {
                    if (dataForTable[i].date[j + 1] === 'holiday') { colSick ++;                          
                        if (dataForTable[i].date[j - 1] != 'holiday') {var dateStart = j;}
                    }
                    else if ( dataForTable[i].date[j - 1] != 'holiday' && dataForTable[i].date[j + 1] != 'holiday' ) {
                        span.setAttribute('class', option.mdi );
                        tr.appendChild(td).appendChild(span).style.color = option.color;
                        //TOOLTIP
                        addtTooltipDATE (td, dataForTable[i].name, option.description, {'interval':false, 'dd':j, 'mm':Month + 1, 'yy':Year}, 'hover');
                    }
                    else if ( dataForTable[i].date[j - 1] === 'holiday' && dataForTable[i].date[j + 1] != 'holiday' ) {                        
                        td.appendChild( createBadge ('badge-info', option.description, option.mdi) );
                        //TOOLTIP
                        var objDate = {'interval' : true, 'dd1': dateStart, 'mm1': Month+1, 'yy1': Year, 'dd2': j, 'mm2': Month+1, 'yy2': Year};
                        addtTooltipDATE( td, dataForTable[i].name, option.description, objDate, 'hover' );

                        tr.appendChild(td).setAttribute('colspan', colSick);
                        colSick = 1;
                    }
                }
                else{
                    td.appendChild( setAttributes( span, {'class': option.mdi} ) ).style.color = option.color;
                    //TOOLTIP
                    if (dataForTable[i].date[j] != 'not') {
                        td.setAttribute('tabindex', 0);
                        addtTooltipDATE (td, dataForTable[i].name, option.description, {'interval':false, 'dd':j, 'mm':Month+1, 'yy':Year}, 'focus');
                    }
                    tr.appendChild(td);
                };
            }
            this.tbody.appendChild(tr);
	    };
	    this.table.appendChild(this.tbody);
        focusOneTr(this.tbody);
    },
    
    checkRulesForData : function (rulesForData, data) {
        for (var key in rulesForData) {
            if (data === undefined) {
                mdi   = rulesForData.not;
            }
            else if (key === data) {
                mdi   = rulesForData[key];
            };
        };
        return mdi;
    },
            
    getNowDMY     : function (Year, Month) {
        if (Year && Month){
            this.nowDate = new Date(Year, Month);
        };
        this.today         = this.nowDate.getDate();
        this.currentMonth  = this.nowDate.getMonth();
        this.currentYear   = this.nowDate.getFullYear();
    },
    
    setSelectDate : function (Year, Month) {
        if (Year || Month){
            this.selectDate = new Date(Year, Month);
        };
        //this.today         = this.nowDate.getDate();
        this.selectMonth  = this.selectDate.getMonth();
        this.selectYear   = this.selectDate.getFullYear();
    },

    getLastDay    : function (Year, Month) {
	   return new Date( Year, Month + 1, 0 ).getDate();
    },
    
    getWeekDay    : function (date) {
        let days = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];
        return days[date.getDay()];
    },
    
    getMonthRus   : function (NumberMonth) {
        var arr=[
           'Январь',
           'Февраль',
           'Март',
           'Апрель',
           'Май',
           'Июнь',
           'Июль',
           'Август',
           'Сентябрь',
           'Октябрь',
           'Ноябрь',
           'Декабрь'
        ];
        return arr[NumberMonth];
    },
    selector      : function (argument) {
        return document.querySelector(argument);
    },
    pickDate      : function (where) {
        var elemSelectMonth = this.selector('.selectMonth');
        var elemSelectYear  = this.selector('.selectYear');
        var selectMonth     = elemSelectMonth.innerHTML;
        var selectYear      = Number( elemSelectYear.innerHTML );
        var arr=[
           'Январь',
           'Февраль',
           'Март',
           'Апрель',
           'Май',
           'Июнь',
           'Июль',
           'Август',
           'Сентябрь',
           'Октябрь',
           'Ноябрь',
           'Декабрь'
        ];
        monthNumber = arr.indexOf(selectMonth);

        if (where === 'left') {
            monthNumber --;
            if ( monthNumber < 0 ) {
                monthNumber = arr.length - 1
                var nextMonth = arr[monthNumber];
                selectYear --;
                elemSelectYear.innerHTML = selectYear;
            }else{
                var nextMonth = arr[monthNumber];
            }
            elemSelectMonth.innerHTML = nextMonth;
        }else if(where === 'right') {
            monthNumber ++
            if ( monthNumber > arr.length - 1 ) {
                monthNumber = 0;
                var nextMonth = arr[monthNumber];
                selectYear ++;
                elemSelectYear.innerHTML = selectYear;
            }else{
                var nextMonth = arr[monthNumber];
            }
            elemSelectMonth.innerHTML = nextMonth;
        }
        this.renderHead(selectYear, monthNumber);
        return {Year: selectYear, Month: monthNumber};
    },

    loading       : function () {
        var col  = this.thead.lastElementChild.childNodes.length;
        var tr   = document.createElement('tr');
        var td   = document.createElement('td');
        var span = document.createElement('span');

        setAttributes( td, {'scope': 'col', 'colspan': col} ).style.height = '70px';
        td.appendChild(span).setAttribute( 'class', 'mdi mdi-loading mdi-spin mr-3' );
        var span = document.createElement('span');
        tr.appendChild(td).appendChild( span ).innerHTML = 'LOADING ...';

        this.tbody.innerHTML = '';
        this.tbody.appendChild(tr);
        this.table.appendChild( this.tbody );
    }
};

    /////////////////////////////////
   //                             //
  //    ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИ   //
 //                             //
/////////////////////////////////


function setAttributes (el, attrs) {
    for(var key in attrs) {
        el.setAttribute(key, attrs[key]);
    }; 
    return el;
};
function addtTooltipDATE (el, name, desc, date, trigger) {
    var options = {
        'data-toggle': 'tooltip', 'data-placement': 'top', 'data-trigger': trigger, 'data-html': true,
        'title' : `<span class="mdi mdi-account-circle"></span> ${name} 
        <br> ${desc} : <br> 
        ${date.dd < 10 ? '0' + date.dd : date.dd}.${date.mm < 10 ? '0' + date.mm : date.mm}.${date.yy < 10 ? '0' + date.yy : date.yy}`
    };
    if (date.interval) {
        options.title = `<span class="mdi mdi-account-circle"></span> ${name} 
            <br> ${desc} : <br>
            ${date.dd1 < 10 ? '0' + date.dd1 : date.dd1}.${date.mm1 < 10 ? '0' + date.mm1 : date.mm1}.${date.yy1 < 10 ? '0' + date.yy1 : date.yy1} - 
            ${date.dd2 < 10 ? '0' + date.dd2 : date.dd2}.${date.mm2 < 10 ? '0' + date.mm2 : date.mm2}.${date.yy2 < 10 ? '0' + date.yy2 : date.yy2}`;
    };
    setAttributes(el, options); 
    return el;
};
function createBadge (bclass, text, mdi,) {
    var span     = document.createElement('span');
    var spanText = document.createElement('span');
    var badge    = document.createElement('span');
    badge.setAttribute('class', `badge ${bclass}`); badge.style.width = '100%';
    spanText.innerHTML = text;
    badge.appendChild( span ).setAttribute('class', mdi );
    badge.appendChild ( spanText ).setAttribute( 'class', 'ml-2' );
    badge.style.color = 'black';
    return badge;
};
function focusOneTr (tbody) {
    var allTr = tbody.querySelectorAll('tr');
        allTr.forEach(tr => {
            attrs = {'data-toggle': 'tooltip', 'data-placement': 'top', 'data-html': true, 'title': 'Нажмите чтобы отобразить только эту строку' };
            setAttributes( tr.querySelector('th'),  attrs);
            tr.querySelector('th').addEventListener('click', function(e){
                e.stopPropagation();
                th = this;
                tr = this.parentNode;

                if (th.classList.contains('select')) {
                    th.querySelector('span').style.display = 'none';
                    allTr.forEach(tr => {tr.style.display = 'table-row'});
                    setAttributes(th, {'class' : '', 'data-original-title' : 'Нажмите чтобы отобразить только эту строку'});
                }else{
                    th.querySelector('span').style.display = 'inline-block';
                    allTr.forEach(tr => {tr.style.display = 'none'});
                    tr.style.display = 'table-row';
                    setAttributes(th, {'class' : 'select', 'data-original-title' : 'Развернуть все строки'});

                }                
            });
        })        
}

