$(function () {
	var GET = infoGetQuery();
	$('[data-toggle="tooltip"]').tooltip();

	getInfoDocument();

	function getInfoDocument() {
		var formData = new FormData();
    	formData.append('queryId', 'getInfoDocument');
    	formData.append('docId', GET.doc);
    	$.ajax({
    	    url: 'ajax.php',
    	    type: 'POST',
    	    data: formData,
    	    processData: false,
    	    contentType: false,
    	    success: function(data) {
    	        successGetInfoDocument(data);
    	    },
    	});
	};
    function successGetInfoDocument(data) {
    	try {
            var jsonData = JSON.parse(data);
            if (typeof jsonData.AuthError !== "undefined") {
                alertMsg(jsonData.AuthError);
                location.reload();
            } else {
                renderDocument(jsonData);
                setTimeout(getInfoDocument, 10000);
            }
        } catch (e) {
            alertMsg("Ошибка в структуре ответа от сайта:<br>" + e);
        }
    };
    function renderDocument(jsonData){
    	var size = sizeParse(jsonData.Size);
    	var ext = checkingFileExtension(jsonData.Name);
    	
    	$('title').text('Личный кабинет | ' + jsonData.Name);
    	$('.docName').text(jsonData.Name);
    	$('.UploadUser').text(jsonData.UploadUserId);
    	$('.sizeFile').text(size.toUpperCase());
    	$('.DateUpload').text(new Date(jsonData.TimeStamp).toLocaleDateString() );
    	$('.DateUploadTip').attr('data-original-title', jsonData.TimeStamp);
    	$('.commentUploadFile').html(jsonData.Description == ''? '<small>Комментарий отсутствует<small>' : jsonData.Descriptions);
    	$('.downloadDoc').attr('href', jsonData.Host+'/'+jsonData.Path);
    	$('.fileMD5').text(jsonData.MD5);

    	$('.descExtDoc').text(ext.desc);
    	$('.ExtFileMDI').addClass(ext.mdi).css('color', ext.color);

    	$('.acceptList').html();
    	$('.lastUpdateDate').text( new Date(jsonData.TimeStamp).toLocaleDateString() );
    	$('.fullLastUpdateDate').attr('data-original-title', jsonData.TimeStamp);



    	console.log(jsonData);
    }

    $(document).on('click', '.fileMD5Container', function(){
    	var MD5 = $(this).find('.fileMD5').text();
    	
    	var copyForm = document.createElement('textarea');
    	copyForm.setAttribute('style', 'opacity:0;position:fixed;top:0;left:0;height:0;width:0;');
    	copyForm.value = MD5;
    	document.body.appendChild(copyForm);
    	copyForm.select();
    	document.execCommand('copy');
    	document.body.removeChild(copyForm);
    	
    	var tip = $(this).data('bs.tooltip').tip
    	var tooltipInner = $(tip).find('.tooltip-inner');
    	tooltipInner.html('Скопировано');
    	$(this).tooltip('update');
    });
    parseTimeLineData(data);
    agreementPopover();
  
    $('[data-toggle="popover"]').popover();

});


function infoGetQuery() {
	var params = window
	.location.search.replace('?','').split('&')
    .reduce(
        function(p,e){
            var a = e.split('=');
            p[ decodeURIComponent(a[0]) ] = decodeURIComponent(a[1]);
            return p;
        },
        {}
    );
    return params;
};
function sizeParse (size){
	if (size < Math.pow(2,10)) {
        size = size + ' B';
    }
    else if (size < Math.pow(2,20)) {
        size = parseFloat( size/Math.pow(2,10) ).toFixed(2) + ' KB';
    }
    else if (size < Math.pow(2,30)) {
        size = parseFloat( size/Math.pow(2,20) ).toFixed(2) + ' MB';
    }
    else if (size < Math.pow(2,40)) {
        size = parseFloat( size/Math.pow(2,30) ).toFixed(2) + ' GB';
    }
    else if (size < Math.pow(2,50)) {
        size = parseFloat( size/Math.pow(2,40) ).toFixed(2) + ' TB';
    };
    return size;
};
function checkingFileExtension(fileName){
    var ext   = fileName.split('.').pop();
    var mdi   =  { 'mdi' : 'mdi mdi-file-alert',            'color' : 'red',    'desc' : 'Не определено'};
    var obj = {
        'doc'  : { 'mdi' : ' mdi mdi-file-word',            'color' : 'blue',   'desc' : 'Microsoft Word'},
        'docx' : { 'mdi' : ' mdi mdi-microsoft-word',       'color' : 'blue',   'desc' : 'Microsoft Word'},
        'txt'  : { 'mdi' : ' mdi mdi-file-document',        'color' : 'grey',   'desc' : 'Text document'},
        'pdf'  : { 'mdi' : ' mdi mdi-file-pdf',             'color' : 'red',    'desc' : 'Adobe PDF'},
        'csv'  : { 'mdi' : ' mdi mdi-file-table',           'color' : 'green',  'desc' : 'Table document'},
        'xsl'  : { 'mdi' : ' mdi mdi-microsoft-excel',      'color' : 'green',  'desc' : 'Microsoft Excel'},
        'xlsx' : { 'mdi' : ' mdi mdi-microsoft-excel',      'color' : 'green',  'desc' : 'Microsoft Excel' },
        'xlsm' : { 'mdi' : ' mdi mdi-microsoft-excel',      'color' : 'green',  'desc' : 'Microsoft Excel'},
        'ppt'  : { 'mdi' : ' mdi mdi-file-powerpoint',      'color' : 'red',    'desc' : 'Microsoft Powerpoint'},
        'pptx' : { 'mdi' : ' mdi mdi-microsoft-powerpoint', 'color' : 'red',    'desc' : 'Microsoft Powerpoint'},
        'html' : { 'mdi' : ' mdi mdi-language-html5',       'color' : 'red',    'desc' : 'html'},
        'js'   : { 'mdi' : ' mdi mdi-language-javascript',  'color' : 'yellow', 'desc' : 'javascript'},
        'json' : { 'mdi' : ' mdi mdi-code-json',            'color' : 'red',    'desc' : 'json'},
        'mkv'  : { 'mdi' :  'mdi mdi-video',                'color' : 'red',    'desc' : 'mkv Video'}, //перекидывал рик и морти для проверки
    };
    for (var key in obj) {
        if (key === ext) {
            mdi   = obj[key];
            mdi.ext = ext;
            return mdi;
        };
    };
};


function timeLineItemCreate(data){
	var elem = 
	`
	<div class="timeline-item">
	    <div class="timeline-point-wraper">
	        <div class="rounded-circle timeline-point">
	        	<div class="rounded-circle timeline-point-color bg-${data.options.timePointColor}">
	        		${data.options.mdi == '' ? '' : '<span class="'+ data.options.mdi +'"></span>'}
	        	</div>
	        </div>
	    </div>
	    <div class="timeline-content">
	        <div class="timeline-body">
	        	<div class='d-inline-block mr-2' type="button" data-toggle="tooltip" 
	        	data-placement="top" data-html="true" title="" 
	        	data-original-title="${data.author + '<br>' + data.position}">
	        		<span class="mdi mdi-account-circle"></span>
	            	<span class="font-weight-bold text-muted">${smallFIO (data.author)}</span>
	        	</div>
	            <span class="badge badge-${data.options.badge}">${data.options.textStatus}</span>
	            <br>
	            <span>
	                ${data.comment}
	            </span>
	        </div>
	        <div class="timeline-date">
	            <span class="mr-1">${new Date(data.date).toLocaleDateString()}</span>
	            <span class="mdi mdi-calendar" type="button" data-toggle="tooltip" data-placement="top" title="" data-original-title="${data.date}"></span>
	        </div>
	    </div>
	</div>
	`;
	return elem;
};

function smallFIO (fullFIO) {
	var arr = fullFIO.split(' ');
	return arr[0] + ' ' + arr[1][0] + '. ' + arr[2][0] + '.';
}

function addTimeLineItem(data) {
	var obj = {
        'agree'    : { 'textStatus' : ' Согласованно ', 'timePointColor' : 'success', 'badge' : 'success', 'mdi' : '',},
        'disagree' : { 'textStatus' : ' Отказ ',        'timePointColor' : 'danger',  'badge' : 'danger',  'mdi' : '',},
        'comment'  : { 'textStatus' : ' Комментарий ',  'timePointColor' : 'primary', 'badge' : 'info',    'mdi' : 'mdi mdi-message',},
    };
    for (var key in obj) {
        if (key === data.status) {
            data.options = obj[key];
        };
    };
	$('.timeline-vertical .timeline-group').append( timeLineItemCreate(data) );
	$('.timeline-item [data-toggle="tooltip"]').tooltip();
};
function parseTimeLineData(data){
	data.forEach( timeLineItem => {
		addTimeLineItem(timeLineItem);
	});
}
function agreementPopover(){
	var c = false;
    var popoverElem = null;
    var content = `
    	<div>
        	<a href='#' class='buttonAgreeDoc w-100 pr-4 text-left rounded-0 border-0 btn btn-sm btn-outline-success'>
        		<span class='mdi mdi-thumb-up'></span>
        		Согласовать
        	</a>
        	<br>
        	<a href='#' class='buttonDesAgreeDoc w-100 pr-4 text-left rounded-0 border-0 btn btn-sm btn-outline-danger'>
        		<span class='mdi mdi-thumb-down'></span>
        		Отказать
        	</a>
        	<br>
        	<a href="#" class='buttonCommentDoc w-100 pr-4 text-left rounded-0 border-0 btn btn-sm btn-outline-info'>
        		<span class='mdi mdi-comment'></span>
        		Комментарий
        	</a>
        	<br>
        	<a href="#" class='buttonImageDoc w-100 pr-4 text-left rounded-0 border-0 btn btn-sm btn-outline-secondary'>
        		<span class='mdi mdi-image'></span>
        		Изображение
        	</a>
        <div>`;
    content = $(content)[0];
    content.querySelector('.buttonAgreeDoc').onclick = buttonAgreeDoc;
    content.querySelector('.buttonDesAgreeDoc').onclick = buttonAgreeDoc;
    content.querySelector('.buttonCommentDoc').onclick = buttonCommentDoc;

	$('.agreementDoc').popover({
    	content : content,
    }).on('mouseenter', function (){
    	c = false
    	$(this).popover('show');
    	var popoverElem =  $('.agreementDoc').data('bs.popover').tip;

    	$(popoverElem).addClass('shadow-sm').find('.popover-body').addClass('px-0');
    	popoverElem.onmouseenter = function (){ c = true; };
    	popoverElem.onmouseleave = function (){ $(this).popover('hide'); c = false; };
    }).on('mouseleave', function () {
    	setTimeout(function(){ if(!c){ $('.agreementDoc').popover('hide'); }
    	},100);
    });
}
function buttonAgreeDoc(e){
	preventDefaults (e);
	console.log('lol');
	$('.agreementDoc').popover('hide');
	$('.input-comment-document').focus();
}
function buttonDesAgreeDoc(e){
	preventDefaults (e);
	console.log('lol');
	$('.agreementDoc').popover('hide');
	$('.input-comment-document').focus();
}
function buttonCommentDoc(e){
	preventDefaults (e);
	console.log('lol');
	$('.agreementDoc').popover('hide');
	$('.input-comment-document').focus();
}
function preventDefaults (e) {
    e.preventDefault();
    e.stopPropagation();
}

var data = [
	{
		'status'  : 'agree',
		'author'  : 'Рябинин Артем Денисович',
		'position': 'Не знаю точно, кто-тот главный',
		'comment' : 'Все отлично, печатаем и на подпись!',
		'date'    : '2020-05-28 21:59:30',
	},
	{
		'status'  : 'disagree',
		'author'  : 'Сафонов Георгий Юрьевич',
		'position': 'Мл.научный сотрудник',
		'comment' : 'Не верно указаны отступы в отчете а так же и третью главу нужно переписать. Жду исправлений ^_^ .',
		'date'    : '2020-05-29 12:59:30',
	},
	{
		'status'  : 'comment',
		'author'  : 'Гагарина Лариса Генадьевна',
		'position': 'Директор СПИНТех',
		'comment' : 'Я себе скопирую на всякий случай, хороший отчет.',
		'date'    : '2020-05-29 07:59:30',
	},
	{
		'status'  : 'agree',
		'author'  : 'Гагарина Лариса Генадьевна',
		'position': 'Директор СПИНТех',
		'comment' : '',
		'date'    : '2020-05-29 07:59:30',
	},
	{
		'status'  : 'disagree',
		'author'  : 'Гагарина Лариса Генадьевна',
		'position': 'Директор СПИНТех',
		'comment' : '',
		'date'    : '2020-05-29 07:59:30',
	},
];

