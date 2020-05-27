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
    	var copyEvent = document.createElement('div');
    	copyEvent.setAttribute('class', 'copyEvent');
    });
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
	        	<div class="rounded-circle timeline-point-color bg-success"></div>
	        </div>
	    </div>
	    <div class="timeline-content">
	        <div class="timeline-body">
	            <span class="mdi mdi-account-circle" type="button" data-toggle="tooltip" data-placement="top" title="" data-original-title="Рябинин Артем Денисович"></span>
	            <span class="font-weight-bold text-muted">Рябинин А.Д.</span>                       
	            <span class="badge badge-success">Согласованно</span>
	            <br>
	            <span>
	                Все отлично, печатаем и на подпись!
	            </span>
	        </div>
	        <div class="timeline-date">
	            <span class="mr-1">05.05.1925</span>
	            <span class="mdi mdi-calendar" type="button" data-toggle="tooltip" data-placement="top" title="" data-original-title="16:00"></span>
	        </div>
	    </div>
	</div>
	`;
	return elem;
};

function addTimeLineItem() {
	$('.timeline-vertical .timeline-group').append( timeLineItemCreate() );
}
