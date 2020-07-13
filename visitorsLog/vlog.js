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
	    emptyTh.setAttribute('scope', 'col');
	    emptyTh.setAttribute('colspan', '2');
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
                ${this.today < 10 ? '0' + this.today : this.today} . 
                ${this.currentMonth < 10 ? '0' + this.currentMonth : this.currentMonth} . 
                ${this.currentYear}`);

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
        
        //dataForTable.forEach(function (item, i) {
        for (var i = 0; i < dataForTable.length; i++){
            var tr   = document.createElement('tr');
            var th   = document.createElement('th');
            th.setAttribute('scope', 'row');
            th.innerHTML = i + 1;
            tr.appendChild(th);
            var td   = document.createElement('td');
            td.innerHTML = dataForTable[i].name;
            tr.appendChild(td);

            var rulesForData = {
                work    : { mdi : 'mdi mdi-check-bold', color: '#4CAF50'},
                sick    : { mdi : 'mdi mdi-ambulance',  color: '#FF9800'},
                holiday : { mdi : 'mdi mdi-palm-tree',  color: '#2196F3'},
                not     : { mdi : 'emprty', color: 'empty'}
            };

		      
            var colSick = 1;
            
            for (var j = 1; j <= LD; j++) {
                var td = document.createElement('td');
                var option = this.checkRulesForData(rulesForData, dataForTable[i].date[j]);
                var span = document.createElement('span');

                dayMonth.setDate(j);
                if ( dayMonth.getDay() === 0 || dayMonth.getDay() === 6) {
                    td.style.backgroundColor  = this.holidayBG;
                }

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
                        td.appendChild(span).style.color = option.color;
                        tr.appendChild(td);
                    }
                    else if ( dataForTable[i].date[j - 1] === 'sick' && dataForTable[i].date[j + 1] != 'sick' ) {
                        var spanText    = document.createElement('span')
                        var badge       = document.createElement('span');
                        badge.setAttribute('class', 'badge badge-warning'); badge.style.width = '100%';
                        spanText.innerHTML = 'Больничный';
                        badge.appendChild( span ).setAttribute('class', option.mdi );
                        badge.appendChild ( spanText ).setAttribute( 'class', 'ml-2' );
                        td.appendChild(badge).style.color = 'black';
                        td.setAttribute('colspan', colSick);
                        //TOOLTIP
                        td.setAttribute('data-toggle', 'tooltip');
                        td.setAttribute('data-placement', 'top');
                        td.setAttribute('data-html', true);
                        td.setAttribute('title', `<span class="mdi mdi-account-circle"></span> ${dataForTable[i].name} 
                            <br> Больничный : <br>
                            ${dateStart < 10 ? '0' + dateStart : dateStart}.${Month < 10 ? '0' + Month : Month}.${Year} - 
                            ${j < 10 ? '0' + j : j}.${Month < 10 ? '0' + Month : Month}.${Year}`);

                        tr.appendChild(td);
                        colSick = 1;
                    }
                }
                else if (dataForTable[i].date[j] === 'holiday' ) {
                    if (dataForTable[i].date[j + 1] === 'holiday') { colSick ++;                          
                        if (dataForTable[i].date[j - 1] != 'holiday') {var dateStart = j;}
                    }
                    else if ( dataForTable[i].date[j - 1] != 'holiday' && dataForTable[i].date[j + 1] != 'holiday' ) {
                        span.setAttribute('class', option.mdi );
                        td.appendChild(span).style.color = option.color;
                        tr.appendChild(td);
                    }
                    else if ( dataForTable[i].date[j - 1] === 'holiday' && dataForTable[i].date[j + 1] != 'holiday' ) {
                        var spanText    = document.createElement('span')
                        var badge       = document.createElement('span');
                        badge.setAttribute('class', 'badge badge-info'); badge.style.width = '100%';
                        spanText.innerHTML = 'Отпуск';
                        badge.appendChild( span ).setAttribute('class', option.mdi );
                        badge.appendChild ( spanText ).setAttribute( 'class', 'ml-2' );
                        td.appendChild(badge).style.color = 'black';
                        td.setAttribute('colspan', colSick);
                        //TOOLTIP
                        td.setAttribute('data-toggle', 'tooltip');
                        td.setAttribute('data-placement', 'top');
                        td.setAttribute('data-html', true);
                        td.setAttribute('title', `<span class="mdi mdi-account-circle"></span> ${dataForTable[i].name} 
                            <br> Отпуск : <br>
                            ${dateStart < 10 ? '0' + dateStart : dateStart}.${Month < 10 ? '0' + Month : Month}.${Year} - 
                            ${j < 10 ? '0' + j : j}.${Month < 10 ? '0' + Month : Month}.${Year}`);

                        tr.appendChild(td);
                        colSick = 1;
                    }
                }
                else{
                        span.setAttribute('class', option.mdi );
                        span.style.color = option.color;
                        td.appendChild(span);
                        tr.appendChild(td);
                };
            }
		this.tbody.appendChild(tr);
	    };
	this.table.appendChild(this.tbody);
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

        td.setAttribute('scope', 'col');
        td.setAttribute('colspan', col);
        td.style.height = '70px';

        span.setAttribute( 'class', 'mdi mdi-loading mdi-spin mr-3' );

        td.appendChild(span);
        var span = document.createElement('span');
        span.innerHTML = 'LOADING ...';
        td.appendChild( span );
        tr.appendChild(td);
        this.tbody.innerHTML = '';
        this.tbody.appendChild(tr);
    }
};