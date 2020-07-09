function selector (argument) {
	return document.querySelector(argument);
}
function getLastDay (Year, Month) {
	return new Date( Year, Month + 1, 0 ).getDate();
}
function getWeekDay (date) {
  let days = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];

  return days[date.getDay()];
}
function getMonthRus (NumberMonth) {
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
	   'Декабрь',
	];
	return arr[NumberMonth];
}




var nowDate      = new Date();
var today        = nowDate.getDate();
var currentMonth = nowDate.getMonth();
var currentYear  = nowDate.getFullYear();
var holidaysColor = '#CB7770';
var holidayBG    = '#454d55';

function renderSelectDate (Year, Month) {
	selector('.selectMonth').innerHTML = getMonthRus(Month);
	selector('.selectYear').innerHTML  = Year;
}

renderSelectDate(currentYear, currentMonth);

function createHeadTable ( Year, Month ) {
	// Дата сегодняшнего дня, года и месяца
	var nowDate      = new Date();
	var today        = nowDate.getDate();
	var currentMonth = nowDate.getMonth();
	var currentYear  = nowDate.getFullYear();

	// Даты поступившие на вход функции
	var selectMonth = new Date( Year, Month);
	var lastDay     = getLastDay (Year, Month);
	var thead       = document.createElement('thead');
	var headElement = ['#', 'Ф.И.О'];

	// Добавить первые элементы шапки таблицы
	var tr          = document.createElement('tr');
	for (var i = 0; i < headElement.length; i++) {
		var th = document.createElement('th');
		th.setAttribute('scope', 'col');
		th.innerHTML = headElement[i];
		tr.appendChild(th);
	};

	// Заполняем шапку таблицы датами месяца
	for (var i = 1; i <= lastDay; i++) {
		var th = document.createElement('th');
		th.setAttribute('scope', 'col');
		th.innerHTML = i;
		selectMonth.setDate(i);
		if ( selectMonth.getDay() == 0 || selectMonth.getDay() == 6) {
			th.style.backgroundColor = holidayBG;
			th.style.color = holidaysColor;
		};

		if ( currentYear === Year && currentMonth === Month && today === selectMonth.getDate() ) {
			var span = document.createElement('span');
			span.innerHTML = i;
			span.style.backgroundColor = '#3F51B5';
			span.setAttribute('class', 'toDaySpan');
			th.innerHTML='';
			th.appendChild(span);
			th.style.padding = '0.2rem';
		}
		tr.appendChild(th);
	}

	// Создаем еще один уровень шапки и заполнем днями недели
	var trDaysWeek   = document.createElement('tr');
	var dayWeek      = new Date( Year, Month, 1 );
	var emptyTh      = document.createElement('th');
	emptyTh.setAttribute('scope', 'col');
	emptyTh.setAttribute('colspan', '2');
	emptyTh.innerHTML = 'Таблица посещения';
	trDaysWeek.appendChild(emptyTh);

	for (var i = 1; i <= lastDay; i++) {
		var th = document.createElement('th');
		th.setAttribute('scope', 'col');
		dayWeek.setDate(i);
		th.innerHTML = getWeekDay(dayWeek);

		if ( dayWeek.getDay() == 0 || dayWeek.getDay() == 6) {
			th.style.backgroundColor = holidayBG;
			th.style.color = holidaysColor;
		}
		trDaysWeek.appendChild(th);
	}
	thead.appendChild(trDaysWeek);
	thead.appendChild(tr);
	var table = selector('.visitorsLogTable');
	table.appendChild(thead);
}

function createTable (dataForTable, Year, Month) {

	var lastDay     = 31;

	var table       = selector('.visitorsLogTable');
	var tbody       = document.createElement('tbody');
	var dayWeek     = new Date( Year, Month, 1 );

	dataForTable.forEach(function (item, i) {
		var tr   = document.createElement('tr');
		var th   = document.createElement('th');
		th.setAttribute('scope', 'row');
		th.innerHTML = i + 1;
		tr.appendChild(th);
		var td   = document.createElement('td');
		td.innerHTML = item.name;
		tr.appendChild(td);


		var rulesForData = {
			work    : { mdi : 'mdi mdi-check-bold', color: '#4CAF50'},
			sick    : { mdi : 'mdi mdi-ambulance',  color: '#FF9800'},
			holiday : { mdi : 'mdi mdi-palm-tree',  color: '#2196F3'},
			not     : { mdi : 'emprty', color: 'empty'}
		}

		
		for (var j = 1; j <= lastDay; j++) {
			var td = document.createElement('td');
			var option = checkRulesForData(rulesForData, dataForTable[i].date[j]);
			var span = document.createElement('span');
			if ( option.mdi === 'empty' ) {
				
			}else{
				span.setAttribute('class', option.mdi );
				span.style.color = option.color;
				td.appendChild(span);
			};

			dayWeek.setDate(j);
			if ( dayWeek.getDay() == 0 || dayWeek.getDay() == 6) {
				td.style.backgroundColor  = holidayBG;
			}
			
			
			tr.appendChild(td);
		}
		
		tbody.appendChild(tr);
	});
	table.appendChild(tbody);
};

function checkRulesForData (rulesForData, data) {
	for (var key in rulesForData) {
		if (data == undefined) {
			mdi   = rulesForData.not;
		}
        else if (key === data) {
            mdi   = rulesForData[key];
        };
    };
    return mdi;
};


createHeadTable ( currentYear, currentMonth );

var arrr;

$.getJSON('./TestData.json').done(function( data ){
	setTimeout(function(){
		createTable( data, currentYear, currentMonth );
	},1500)
	
});