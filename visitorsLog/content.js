clog.getNowDMY();
clog.renderSelectDate(clog.currentYear, clog.currentMonth);

var date = clog.renderHead();
clog.loading();

$.getJSON('./TestData.json').done(function( data ){
    setTimeout(function(){
            clog.renderTbody( data, date.Year, date.Month );
            $('[data-toggle="tooltip"]').tooltip();
    },1500);	
});

var elemSelectUp = document.querySelector('.selectMonthUp');
var elemSelectDown  = document.querySelector('.selectMonthDown');


elemSelectUp.onclick = function () {
	this.blur();
	var date = clog.pickDate('right');
	clog.loading();
    $.getJSON('./TestData.json').done(function( data ){
        setTimeout(function(){
        	if (clog.selectYear == date.Year && clog.selectMonth == date.Month){
                clog.renderTbody( data, date.Year, date.Month );
                $('[data-toggle="tooltip"]').tooltip();
            }
        },1000);    
    });

};
elemSelectDown.onclick = function () {
	this.blur();
	var date = clog.pickDate('left');
	clog.loading();
    $.getJSON('./TestData.json').done(function( data ){
    	
	    setTimeout(function(){
	  		if (clog.selectYear == date.Year && clog.selectMonth == date.Month){
	        	clog.renderTbody( data, date.Year, date.Month );
	    		$('[data-toggle="tooltip"]').tooltip();
	    	}
	    },1000);

    });
};

$('[data-toggle="tooltip"]').tooltip();
