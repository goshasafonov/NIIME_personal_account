var files = new Array;
$(function () {
    $('[data-toggle="popover"]').popover(); $('[data-toggle="tooltip"]').tooltip();
    // modal downloader
    
    
    $(document).on('dragenter dragover dragleave drop', '.modal-drag-n-drop-downloader', preventDefaults);
    $(document).on('dragenter', '.modal-drag-n-drop-downloader', function(e){
        $('.drag-n-drop-downloader-preview').removeClass('d-none').addClass('d-flex');
    });
    $(document).on('dragleave', '.drag-n-drop-downloader-preview', function(e){
        $('.drag-n-drop-downloader-preview').removeClass('d-flex').addClass('d-none');
    });
    $(document).on('drop', '.modal-drag-n-drop-downloader', handleDrop);
    $(document).on('change', '#picker-input-downloader', function(e){
        var fileListInput = this.files;
        handleDrop(e, fileListInput);
    });
    function preventDefaults (e) {
        e.preventDefault();
        e.stopPropagation();
    }
    function handleDrop(e, fileListInput) {
        if (fileListInput) {
            var arrayFileList = fileListInput.length != 0 ? fileListInput : false;
        }else{
            var arrayFileList = e.originalEvent.dataTransfer.files.length != 0 ? e.originalEvent.dataTransfer.files : false;
        };
        if(arrayFileList){
            $('.drag-n-drop-downloader-preview').removeClass('d-flex').addClass('d-none');
            $('.drag-n-drop-content').children().addClass('d-none').removeClass('d-flex');
            $('.drag-n-drop-documents').removeClass('d-none').addClass('d-flex');
        }else return;
        
        arrayFileList = ([...arrayFileList]);
        var tempFileList = new Array;
        arrayFileList.forEach(file => {
            tempFileList.push({'file':file, 'comment': ''});
        });
        renderfiles(arrayFileList, files);
        if(files){
            files = ([...files, ...tempFileList]);
        }else{
            files = tempFileList;
        };
    }
    function renderfiles (files, GlobalArrayFiles) {
        var numberInArrayFiles = GlobalArrayFiles.length;
        files.forEach(uploadfile =>{
            
            var ext = checkingFileExtension(uploadfile);
            $('.drag-n-drop-documents').append(
                `<div class="uploadDocument" data-number-in-array-files=${numberInArrayFiles}>
                    <h2 class="mb-0 mr-2 ${ext.icon.mdi}" style="color:${ext.icon.color};"></h2>
                    <div class="d-flex flex-column flex-grow-1" style="min-width:50px;">
                        <small class="font-weight-bold mr-3"
                        style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;"
                        >${uploadfile.name}</small>
                        <small class="text-muted d-flex flex-wrap meta-information-file-drag-n-drop-downloader align-items-center" >
                            <span class="mr-2 text-nowrap">${ext.size}</span>
                            <span class="badge badge-danger ${ext.check? 'd-none':'d-inline-block'}" 
                            style="padding: 2px 5px;">не возможно загрузить</span>
                            <div class="comment-upload-document d-none align-items-center text-nowrap" style="min-width:50px;">
                                <span class="badge badge-info d-inline-block" 
                                style="padding: 2px 5px;">Комментарий</span>
                                <span class="mr-3 span-comment-upload-document" 
                                style = "white-space: nowrap;overflow: hidden;text-overflow: ellipsis;"
                                ></span>
                            </div>
                        </small>
                        <div class="progress mr-3 d-none" style="height:7px;">
                            <div class="progress-bar progress-bar-striped progress-bar-animated" 
                            role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 75%"></div>
                        </div>
                    </div>
                    <div class="align-items-center d-flex">
                        <span class="button-send-file-drag-n-drop-downloader ${!ext.check? 'd-none':'d-inline-block'} mdi mdi-file-send-outline mr-2 text-success"
                        data-toggle="tooltip" data-placement="top" title="Отправить файл на согласование"
                        data-number-in-array-files=${numberInArrayFiles} type="button"
                        ></span>
                        <span class="button-add-comment-drag-n-drop-downloader mdi mdi-comment-plus-outline mr-2 text-primary"
                        style="display:${!ext.check? 'none':'inline-block'}"
                        data-toggle="tooltip" data-placement="top" title="Добавить комментарий" 
                        data-number-in-array-files=${numberInArrayFiles} type="button"
                        ></span>
                        <span class="button-edit-comment-drag-n-drop-downloader mdi mdi-comment-edit mr-2 text-primary"
                        data-toggle="tooltip" data-placement="top" title="Редактировать комментарий" 
                        data-number-in-array-files=${numberInArrayFiles} type="button" style="display:none;"
                        ></span>
                        <span class="button-delete-file-drag-n-drop-downloader mdi mdi-window-close close" style="font-size:inherit;"
                        data-toggle="tooltip" data-placement="top" title="Не прикреплять файл" 
                        data-number-in-array-files=${numberInArrayFiles} type="button"
                        ></span>
                    </div>
                </div>`
            );
            numberInArrayFiles++;
        });
        $('[data-toggle="tooltip"]').tooltip();
    }
    function checkingFileExtension(file){
        var ext   = file.name.split('.').pop();
        var size  = file.size;
        var mdi   =  { 'mdi' : 'mdi mdi-file-alert',           'color' : 'red'};
        var check = false;
        var obj = {
            'doc'  : { 'mdi' : ' mdi mdi-file-word',            'color' : 'blue'},
            'docx' : { 'mdi' : ' mdi mdi-microsoft-word',       'color' : 'blue'},
            'txt'  : { 'mdi' : ' mdi mdi-file-document',        'color' : 'grey'},
            'pdf'  : { 'mdi' : ' mdi mdi-file-pdf',             'color' : 'red'},
            'csv'  : { 'mdi' : ' mdi mdi-file-table',           'color' : 'green'},
            'xsl'  : { 'mdi' : ' mdi mdi-microsoft-excel',      'color' : 'green'},
            'xlsx' : { 'mdi' : ' mdi mdi-microsoft-excel',      'color' : 'green'},
            'xlsm' : { 'mdi' : ' mdi mdi-microsoft-excel',      'color' : 'green'},
            'ppt'  : { 'mdi' : ' mdi mdi-file-powerpoint',      'color' : 'red'},
            'pptx' : { 'mdi' : ' mdi mdi-microsoft-powerpoint', 'color' : 'red'},
            'html' : { 'mdi' : ' mdi mdi-language-html5',       'color' : 'red'},
            'js'   : { 'mdi' : ' mdi mdi-language-javascript',  'color' : 'yellow'},
            'json' : { 'mdi' : ' mdi mdi-code-json',            'color' : 'red'},
            'mkv'  : { 'mdi' :  'mdi mdi-video',                'color' : 'red'}, //перекидывал рик и морти для проверки
        };
        for (var key in obj) {
            if (key === ext) {
                mdi   = obj[key];
                check = true; 
            };
        };
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
        return {'ext':ext, 'icon':mdi, 'size':size, 'check':check};
    }
    $(document).on('click', '.button-add-comment-drag-n-drop-downloader', function() {
        $('.input-comment-downloader').focus();
        $('.informing-window-commented-downloader').hide();
        $('.input-comment-downloader').attr('data-comented-document', $(this).attr('data-number-in-array-files'))
    })
    $(document).on('click', '.button-edit-comment-drag-n-drop-downloader', function() {
        $('.input-comment-downloader').focus();
        $('.informing-window-commented-downloader').hide();
        var number = $(this).attr('data-number-in-array-files');
        $('.input-comment-downloader').attr('data-comented-document', number).val(files[number]['comment']);
    })
    $(document).on('click', '.button-send-comment-downloader', function() {
        var number = $('.input-comment-downloader').attr('data-comented-document');
        if(number){
            var commentText = $('.input-comment-downloader').val();
            if (commentText != '') {                        
                $('.input-comment-downloader').val('');
                $(`.button-add-comment-drag-n-drop-downloader[data-number-in-array-files=${number}]`).hide();
                $(`.button-edit-comment-drag-n-drop-downloader[data-number-in-array-files=${number}]`).show();
                $(`.uploadDocument[data-number-in-array-files=${number}] .meta-information-file-drag-n-drop-downloader .comment-upload-document`).removeClass('d-none').addClass('d-flex').children('.span-comment-upload-document').html(commentText);
               
                files[number]['comment'] = commentText;
                $('.informing-window-commented-downloader small').html('Комментарий успешно добавлен').parent().show();
                setTimeout(() => $('.informing-window-commented-downloader').hide(), 1000);
            }else{
                files[number]['comment'] = commentText;
                $(`.button-add-comment-drag-n-drop-downloader[data-number-in-array-files=${number}]`).show();
                $(`.button-edit-comment-drag-n-drop-downloader[data-number-in-array-files=${number}]`).hide();
                $(`.uploadDocument[data-number-in-array-files=${number}] .meta-information-file-drag-n-drop-downloader .comment-upload-document`).removeClass('d-flex').addClass('d-none').children('.span-comment-upload-document').html(commentText);
                
                $('.informing-window-commented-downloader small').html('Комментарий удален').parent().show();
                setTimeout(() => $('.informing-window-commented-downloader').hide(), 1000);
            }
            $('.input-comment-downloader').removeAttr('data-comented-document');
        }else{
            console.log('выберите документ');
            $('.informing-window-commented-downloader small').html('Выберите документ и нажмиту кнопку добавить комментарий').parent().show();
        }
    })
    $(document).on('click', '.button-send-file-drag-n-drop-downloader', function() {
        var number = $(this).attr('data-number-in-array-files');
        var uploadDocument = $(this).closest('.uploadDocument');
        var ProgressBar = uploadDocument.find('.progress-bar');
        var file = files[number]['file'];
        var comment = files[number]['comment'];

        readFile(0, ProgressBar, number, number);
    })
    $(document).on('click', '.button-delete-file-drag-n-drop-downloader', function() {
        $(this).closest('.uploadDocument').remove();
        $('.tooltip').remove();
        if( $('.drag-n-drop-documents').children().length === 0 ){
            $('.drag-n-drop-content').children().removeClass('d-none').addClass('d-flex');
            $('.drag-n-drop-documents').removeClass('d-flex').addClass('d-none');
        }
    });



        /////////////////////////////////////
       //                                 //
      //  Загрузка файла большого обьема //
     //                                 //
    /////////////////////////////////////

    function msgError(){
        console.log('or not');
    }

    function readFile(position, ProgressBar,  projectFileId) {
        var file = files[projectFileId]['file'];
        if (!file) {
            msgError(formNewProject_msg, "Ошибка: файл утерян");
            return;
        };
        var fileName = files[projectFileId]['file']['name'];
        var start    = position || 0;
        var step     = 1024 * 1024;
        var stop     = file.size;
        if (start == 0) {
            ProgressBar.css('width', '0%').parent().removeClass('d-none').addClass('d-flex');
        }
        if (file.webkitSlice) {
            var blob = file.webkitSlice(start, start + step);
        } else if (file.mozSlice) {
            var blob = file.mozSlice(start, start + step);
        } else if (file.slice) {
            var blob = file.slice(start, start + step);
        } else {
            alert("Не удалось установить blob");
            return;
        };        
        upload(blob, start, step, stop, fileName, ProgressBar, projectFileId);
    };

    function upload(blobOrFile, from, sizePortion, sizeFile, fileName, ProgressBar, projectFileId) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'loader.php' , true);
        xhr.setRequestHeader("Portion-From", from);
        xhr.setRequestHeader("Portion-Size", sizePortion);
        xhr.setRequestHeader("Portion-File", sizeFile);
        xhr.setRequestHeader("Project-File-Id", projectFileId);
        xhr.onload = function (data) {
            var jsonData = JSON.parse(xhr.responseText);
            var start = Number.parseInt(jsonData.From);
            var step = Number.parseInt(jsonData.Size);
            var stop = Number.parseInt(jsonData.File);
            var name = jsonData.name;
            var ProjectFileId = Number.parseInt(jsonData.ProjectFileId);
            if (ProjectFileId == ProjectFileId) { //Потом подумаю над проверкой
                if (typeof jsonData.AjaxError !== "undefined") {
                    msgError(formNewProject_msg, jsonData.AjaxError);
                } else {
                    if (start + step < stop) {
                        readFile(start + step, ProgressBar, ProjectFileId);
                        var procent = start * 100 / stop;
                        ProgressBar.css('width',procent + '%');
                    } else {
                        ProgressBar.css('width', '100%');
                        setTimeout(()=>{
                            ProgressBar.closest('.uploadDocument').remove();
                            $('.tooltip').remove();
                            if( $('.drag-n-drop-documents').children().length === 0 ){
                                $('.drag-n-drop-content').children().removeClass('d-none').addClass('d-flex');
                                $('.drag-n-drop-documents').removeClass('d-flex').addClass('d-none');
                            };
                        }, 700);
                        //начинаем загрузку следующего файла допишу при появлении кнопки загрузить все файлы.
                    }
                }
            }
        };
        var formData = new FormData();
        formData.append('blob', blobOrFile, fileName);
        formData.append('comment', files[projectFileId]['comment']);
        xhr.send(formData);
    };




    // // Настройки страницы и добавление протатипа (sendAsBinary) XML для хрома // //
    // window.onbeforeunload = function () {
    //     return true;
    // };
    window.onload = function () {
        if (!XMLHttpRequest.prototype.sendAsBinary) {
            XMLHttpRequest.prototype.sendAsBinary = function (datastr) {
                function byteValue(x) {
                    return x.charCodeAt(0) & 0xff;
                }
                var ords = Array.prototype.map.call(datastr, byteValue);
                var ui8a = new Uint8Array(ords);
                this.send(ui8a.buffer);
            };
        }
        intialStartPage();
    };

    // // Обработка запроса на отображение карточек документов // //
    function intialStartPage() {
        console.log(`[START APP: Hello user, good u know devtools ⚡]`);

        $.get('../components/document-card.html', function(data){
            getListDocuments();      

                

            //ajaxSuccess
            JsonDocuments.forEach(doc =>{
                var DomJqData = $(data);
                DomJqData.find('.document_card_name').text(doc.name_document);
                DomJqData.find('.container_document_card_name').attr('title', doc.name_document);
                DomJqData.find('.card-title').html(doc.document_agreed ? 'Согласовано<span class="ml-1 mdi mdi-check-circle text-success"></span>' : 'Процесс согласования');
                DomJqData.find('.card-text').text(doc.comment_document);
                DomJqData.find('.href_card_id_document').attr('href',doc.href_document);
                DomJqData.find('.last_update_document').text(doc.last_update);
                //Распределение классов 
                for (var key in doc.status_document) {
                    var status = doc.status_document[key].status;

                    if(status === 'empty'){
                        $(DomJqData.find('.timeline').children()[key]).find('div').addClass(status+'-score');
                    }else{
                        $(DomJqData.find('.timeline').children()[key]).find('div')
                        .removeClass()
                        .addClass('btn rounded-circle ' + status+'-score');
                    };
                    //Popover
                    $(DomJqData.find('.timeline').children()[key]).addClass('Popover_'+doc.id_document+'_'+key);
                };
                
                $('.card-columns').append( DomJqData );

                for (var key in doc.status_document) {
                    $('.Popover_'+doc.id_document+'_'+key).popover({
                        content: `
                        <div class='card'>
                            <h5 class='card-header bg-transparent'>${doc.status_document[key].name}</h5>
                            <div class='card-body'>
                                <p class='card-text'>${doc.status_document[key].comment}</p>
                            </div> 
                            <div class='dropdown-divider'></div>
                            <ul><li>можно</li><li>было бы</li><li>что-то перечислять</li></ul>
                            <div class='card-footer'>
                                <small class='text-muted'>Last updated ${doc.status_document[key].date}</small>
                            </div>
                        </div>`
                    });
                };
            });
            $('[data-toggle="popover"]').popover();$('[data-toggle="tooltip"]').tooltip();
        });
    };

    function getListDocuments(){
        var formData = new FormData();
        formData.append('queryId', 'getListDocuments');
        $.ajax({
            url: 'ajax.php',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: successGetListDocuments,
        });
    };
    function successGetListDocuments(data) {
        try {
            var jsonData = JSON.parse(data);
            if (typeof jsonData.AuthError !== "undefined") {
                alertMsg(jsonData.AuthError);
                location.reload();
            } else {
                setTimeout(getListDocuments, 10000);
            }
        } catch (e) {
            alertMsg("Ошибка в структуре ответа от сайта:<br>" + e);
        }
    };
    function alertMsg(text) {
        alert(text);
    }
});


var JsonDocuments = [
    {
        'id_document'      : '1',
        'name_document'    : 'file-lflfl-s fdfdf df gdf gffff_1.pdf',
        'status_document'  : 
        {
            0:
            {
                'name'    : 'Процесс загрузки',
                'status'  : 'success',
                'comment' : 'загрузил с такой то целью',
                'date'    : '00.00.00.0.0.0',
            },
            1:
            {   
                'name'    : 'Процесс согласования',
                'status'  : 'empty',
                'comment' : 'тут к примеру последний утверждающий комментарий или описание',
                'date'    : '00.00.00.0.0.0',
            },
            2:
            {   
                'name'    : 'Процесс публикации',
                'status'  : 'danger',
                'comment' : 'что то что пишут при публикациях',
                'date'    : '00.00.00.0.0.0',
            },
        },
        'document_agreed'  : true,
        'comment_document' : 'Согласовать срочно, быстро, как можно быстрее, завтра приду и все согласовано, надеюсь. Пожалуйста ))',
        'href_document'    : 'http://ololol1.ru',
        'last_update'      : 'вчера',
    },    
]