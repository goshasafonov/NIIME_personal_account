var files = new Array;
$(function () {
    intialStartPage();
    startSelectCategory (selectCategoryForDownloadFiles);


    $('[data-toggle="popover"]').popover(); $('[data-toggle="tooltip"]').tooltip();
    // modal downloader
    
    var cancelDrag = false;
    dragNDropWindow = document.querySelector('.modal-drag-n-drop-downloader');

    dragNDropWindow.addEventListener('dragstart', e => {
      cancelDrag = true;
    });
    dragNDropWindow.addEventListener('dragend', e => {
      cancelDrag = false;
    });
    dragNDropWindow.addEventListener('dragenter', e => {
        cancelDrag = isDraggedFiles(e);
    });
    function isDraggedFiles (e) {
        for (n in e.dataTransfer.types)
        {
            if (e.dataTransfer.types[n] !== "Files") return true;
        }
        return false;
    };



    $(document).on('dragenter dragover dragleave drop', '.modal-drag-n-drop-downloader', preventDefaults);
    $(document).on('dragenter', '.modal-drag-n-drop-downloader', function(e){
        if (cancelDrag) return false;
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
        e.stopPropa
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
            $('.button-downloader-upload-all-documents').show();
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
        files.forEach( uploadfile => {            
            var ext = checkingFileExtension(uploadfile);
            $('.drag-n-drop-documents').append(
                `<div class="uploadDocument" data-number-in-array-files=${numberInArrayFiles} data-ext-check = ${ext.check}>
                    <h2 class="mb-0 mr-2 ${ext.icon.mdi}" style="color:${ext.icon.color}; font-size:2.3rem"></h2>
                    <div class="d-flex flex-column flex-grow-1" style="min-width:50px;">
                        <small class="font-weight-bold mr-3"
                        style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis; font-size:1.1rem"
                        >${uploadfile.name}</small>
                        <small class="text-muted d-flex flex-wrap meta-information-file-drag-n-drop-downloader align-items-center" >
                            <span class="mr-2 text-nowrap">${ext.size}</span>
                            <span class="font-weight-bold badge badge-danger ${ext.check? 'd-none':'d-inline-block'}" 
                            style="padding: 2px 5px;">не возможно загрузить</span>
                            <div class="comment-upload-document d-none align-items-center text-nowrap" style="min-width:50px;">
                                <span class="badge font-weight-bold badge-info d-inline-block mr-1" 
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
                        <button class="btn py-1 px-2 border-0 button-send-file-drag-n-drop-downloader ${!ext.check? 'd-none':'d-inline-block'} mdi mdi-file-send-outline mr-1 text-success"
                        data-toggle="tooltip" data-placement="top" title="Отправить файл на согласование"
                        data-number-in-array-files=${numberInArrayFiles} type="button" style="font-size:1.2rem"
                        ></button>
                        <button class="btn py-1 px-2 border-0 button-add-comment-drag-n-drop-downloader mdi mdi-comment-plus-outline mr-1 text-primary"
                        style="font-size:1.2rem; display:${!ext.check? 'none':'inline-block'}"
                        data-toggle="tooltip" data-placement="top" title="Добавить комментарий" 
                        data-number-in-array-files=${numberInArrayFiles} type="button"
                        ></button>
                        <button class="btn py-1 px-2 border-0 button-edit-comment-drag-n-drop-downloader mdi mdi-comment-edit mr-1 text-primary"
                        data-toggle="tooltip" data-placement="top" title="Редактировать комментарий" 
                        data-number-in-array-files=${numberInArrayFiles} type="button" style="display:none; font-size:1.2rem"
                        ></button>
                        <button class="btn py-1 px-2 border-0 button-delete-file-drag-n-drop-downloader mdi mdi-window-close close" style="font-size:inherit; line-height:1.5; font-size:1.2rem"
                        data-toggle="tooltip" data-placement="top" title="Не прикреплять файл" 
                        data-number-in-array-files=${numberInArrayFiles} type="button"
                        ></button>
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
            'mkv'  : { 'mdi' : 'mdi mdi-video',                'color' : 'red'}, //перекидывал рик и морти для проверки
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
    $(document).on('mousedown', '.button-send-comment-downloader', function() {
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
            $('.informing-window-commented-downloader small').html('Выберите документ и нажмиту кнопку добавить комментарий').parent().show();
            setTimeout(() => $('.informing-window-commented-downloader').hide(), 2000);
        }
    })
    $(document).on('click', '.button-send-file-drag-n-drop-downloader', function() {
        var number = $(this).attr('data-number-in-array-files');
        var uploadDocument = $(this).closest('.uploadDocument');
        var ProgressBar = uploadDocument.find('.progress-bar');
        $('.tooltip').remove();
        readFile(0, ProgressBar, number, 0);
    })
    $(document).on('click', '.button-delete-file-drag-n-drop-downloader', function() {
        $(this).closest('.uploadDocument').remove();
        $('.tooltip').remove();
        if( $('.drag-n-drop-documents').children().length === 0 ){
            $('.drag-n-drop-content').children().removeClass('d-none').addClass('d-flex');
            $('.drag-n-drop-documents').removeClass('d-flex').addClass('d-none');
            $('.button-downloader-upload-all-documents').hide();
        }
    });
    $(document).on('click', '.button-downloader-upload-all-documents', function () {
        $('.drag-n-drop-documents [data-ext-check=false]').remove();

        var elem   = $('.drag-n-drop-documents').children()[0];
        var number = $(elem).attr('data-number-in-array-files');
        var ProgressBar_2 = $(elem).find('.progress-bar');        

        if( $(elem).attr('data-ext-check')  && $('.drag-n-drop-documents').children().length != 0 ){
            readFile(0, ProgressBar_2, number, 0, true);
        } else {
            $(elem).remove();
        };
    });



        /////////////////////////////////////
       //                                 //
      //  Загрузка файла большого обьема //
     //                                 //
    /////////////////////////////////////

    function msgError(){
        console.log('or not');
    }

    function readFile(position, ProgressBar, projectFileId, dataBaseId, multiUpload) {
        //временнная проверка
        var category = selectCategoryForDownloadFiles.value;
        if (category == '')
        {
            $('.informing-window-commented-downloader small')
            .html(`Вы не выбрали категорию, продолжить? <button class="btn btn-light btn-sm">Да</button>
                <button class="btn btn-secondary btn-sm" onclick="$('.informing-window-commented-downloader').hide()">Нет</button>`)
            .parent().show();
            return false;
        }



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
            $('.informing-window-commented-downloader small').html('Файл загружается ...');
            $('.informing-window-commented-downloader').show();
            $('.button-send-file-drag-n-drop-downloader').prop('disabled', true);
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
        upload(blob, start, step, stop, fileName, ProgressBar, projectFileId, dataBaseId, multiUpload);
    };

    function upload(blobOrFile, from, sizePortion, sizeFile, fileName, ProgressBar, projectFileId, dataBaseId, multiUpload) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'loader.php' , true);
        xhr.setRequestHeader("Portion-From", from);
        xhr.setRequestHeader("Portion-Size", sizePortion);
        xhr.setRequestHeader("Portion-File", sizeFile);
        xhr.setRequestHeader("Project-File-Id", projectFileId);
        xhr.setRequestHeader("Data-Base-Id", dataBaseId);
        xhr.onload = function (data) {
            var jsonData = JSON.parse(xhr.responseText);
            var start = Number.parseInt(jsonData.From);
            var step = Number.parseInt(jsonData.Size);
            var stop = Number.parseInt(jsonData.File);
            var name = jsonData.name;
            var ProjectFileId = Number.parseInt(jsonData.ProjectFileId);
            var DB_id = Number.parseInt(jsonData.DB_id);
            if (ProjectFileId == ProjectFileId) { //Потом подумаю над проверкой
                if (typeof jsonData.AjaxError !== "undefined") {
                    msgError(formNewProject_msg, jsonData.AjaxError);
                } else {
                    if (start + step < stop) {
                        readFile(start + step, ProgressBar, ProjectFileId, DB_id, multiUpload);
                        var procent = start * 100 / stop;
                        ProgressBar.css('width',procent + '%');
                    } else {
                        ProgressBar.css('width', '100%');
                        $('.informing-window-commented-downloader small').html('Успешно загружен!');
                        $('.informing-window-commented-downloader').show();
                        setTimeout(()=>{
                            var elem = ProgressBar.closest('.uploadDocument').remove();
                            $('.tooltip').remove();
                            $('.button-send-file-drag-n-drop-downloader').prop('disabled', false);
                            $('.informing-window-commented-downloader').hide();
                            if( $('.drag-n-drop-documents').children().length === 0 ){
                                $('.drag-n-drop-content').children().removeClass('d-none').addClass('d-flex');
                                $('.drag-n-drop-documents').removeClass('d-flex').addClass('d-none');
                                $('.button-downloader-upload-all-documents').hide();
                            };

                            console.log(multiUpload,'LOAD GOOOD');

                            if (multiUpload && $('.drag-n-drop-documents').children().length != 0){

                                console.log(multiUpload,'NEXT LOAD');

                                var elem   = $('.drag-n-drop-documents').children()[0];
                                if( $(elem).attr('data-ext-check') ) {
                                    var number = $(elem).attr('data-number-in-array-files');
                                    var ProgressBar_2 = $(elem).find('.progress-bar');
                                    readFile(0, ProgressBar_2, number, 0, true);
                                } else {
                                    $(elem).remove();
                                }                                                               
                            };
                        }, 700);
                    }
                }
            }
        };
        var formData = new FormData();
        formData.append('blob', blobOrFile, fileName);
        formData.append('comment', files[projectFileId]['comment']);
        formData.append('category', Number( selectCategoryForDownloadFiles.value ) );
        xhr.send(formData);
    };




    // // Настройки страницы и добавление протатипа (sendAsBinary) XML для хрома // //
    // window.onbeforeunload = function () {
    //     return true;
    // };
    

    // // Обработка запроса на отображение карточек документов // //
    function intialStartPage() {
        console.log(`[START APP: Hello user, good u know devtools ⚡]`);


        $.get('../components/document-card.html', function(data){
            componentCard = data;
            getListDocuments();
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
            success: function(data) {
                successGetListDocuments(data, componentCard);
            },
        });
    };
    function successGetListDocuments(data, componentCard) {
        try {
            var jsonData = JSON.parse(data);
            if (typeof jsonData.AuthError !== "undefined") {
                alertMsg(jsonData.AuthError);
                location.reload();
            } else {
                renderCardsDocuments(jsonData, componentCard);
                setTimeout(getListDocuments, 10000);
            }
        } catch (e) {
            alertMsg("Ошибка в структуре ответа от сайта:<br>" + e);
        }
    };
    function renderCardsDocuments(JsonDocuments, componentCard) {
        console.log(JsonDocuments);
        var cardElements = $('.card-columns').children();
        if (JsonDocuments.length === 0){
            $('.allContentDocuments .emptyDocumentsList').removeClass('d-none').addClass('d-flex');
            cardElements.remove();
            return;
        }else{
            $('.allContentDocuments .emptyDocumentsList').removeClass('d-flex').addClass('d-none')
        };
        JsonDocuments.forEach(doc =>{
            var docOnPage = $(`[data-document-id-card=${doc.id_document}]`);
            if (docOnPage[0]){
                prepareCadrComponent ( doc, docOnPage[0] );
                UpdateCardPopover (doc);
                return
            } else {                
                $('.card-columns').append( prepareCadrComponent (doc, componentCard) );
                prepareCardPopover (doc);
                $('[data-toggle="popover"]').popover();$('[data-toggle="tooltip"]').tooltip();
            };
        });
        cardElements = $('.card-columns').children();
        cardElements.each(function(index, value){
            var val = $(value).attr('data-document-id-card');
            var check = JsonDocuments.find(item=>item.id_document == val);
            if(!check){
                var docOnPage = $(`[data-document-id-card=${val}]`);
                docOnPage.remove();
            }
        });
    };

    function prepareCadrComponent (doc, componentCard){
        var DomJqData = $(componentCard);
        DomJqData.attr( 'data-document-id-card', doc.id_document );
        DomJqData.find('.document_card_name').text(doc.name_document);
        DomJqData.find('.container_document_card_name').attr('title', doc.name_document);
        DomJqData.find('.card-title').html(doc.document_agreed ? 'Согласовано<span class="ml-1 mdi mdi-check-circle text-success"></span>' : 'Процесс согласования');
        DomJqData.find('.card-text').text(doc.comment_document);
        DomJqData.find('.href_card_id_document').attr('href',doc.href_document);
        DomJqData.find('.last_update_document').text(doc.last_update);
        //Распределение классов 
        for (var key in doc.status_document) {
            var status = doc.status_document[key].class;
            if(status === 'empty'){
                $(DomJqData.find('.timeline').children()[key]).find('div').addClass(status+'-score');
            }else{
                $(DomJqData.find('.timeline').children()[key]).find('div')
                .removeClass()
                .addClass('btn d-block rounded-circle ' + status+'-score');
            };
            //Popover
            $(DomJqData.find('.timeline').children()[key]).addClass('Popover_'+doc.id_document+'_'+key);
        };
        return DomJqData
    };
    function prepareCardPopover (doc) {
        for (var key in doc.status_document) {
            $('.Popover_'+doc.id_document+'_'+key).popover({
                content: `
                <div class='card bg-dark text-white'>
                    <h5 class='card-header py-2 bg-transparent'>${doc.status_document[key].name}</h5>
                    <div class='card-body py-2'>
                        <p class='card-text mb-2'>${doc.status_document[key].comment}</p>
                        <div class='dropdown-divider'></div>
                        <div class='d-flex justify-content-between'>
                            <span class='mdi mdi-account mr-1'>${doc.status_document[key].user}</span>
                            <span class='badge badge-${doc.status_document[key].class}'>
                                ${doc.status_document[key].status}
                            </span>
                        </div>
                    </div>
                    <div class='card-footer py-2'>
                        <span class='text-muted'>Дата загрузки: ${doc.status_document[key].date}</span>
                    </div>
                </div>`
            });
        };
    }
    function UpdateCardPopover (doc) {
        for (var key in doc.status_document) {
            var buttonPopover = $('.Popover_'+doc.id_document+'_'+key);
            var popoverContent =`
                <div class='card bg-dark text-white'>
                    <h5 class='card-header py-2 bg-transparent'>${doc.status_document[key].name}</h5>
                    <div class='card-body py-2'>
                        <p class='card-text mb-2'>${doc.status_document[key].comment}</p>
                        <div class='dropdown-divider'></div>
                        <div class='d-flex justify-content-between'>
                            <span class='mdi mdi-account mr-1'>${doc.status_document[key].user}</span>
                            <span class='badge badge-${doc.status_document[key].class}'>
                                ${doc.status_document[key].status}
                            </span>
                        </div>
                    </div>
                    <div class='card-footer py-2'>
                        <span class='text-muted'>Дата загрузки: ${doc.status_document[key].date}</span>
                    </div>
                </div>`;
            buttonPopover.data('bs.popover').config.content = popoverContent;
            /*Если в данный момент popover открыт то обновим его контент для отображения
            в ином случае при focus он автоматически его обновит на добавленный*/
            if (buttonPopover.data('bs.popover')._activeTrigger.focus) {
                var popoverElem =  buttonPopover.data('bs.popover').tip;
                $(popoverElem).find('.popover-body').html(popoverContent);
            }
        };
    }

    function alertMsg(text) {
        alert(text);
    }

    $(selectCategory).change(
        function (e) {
            console.log("Changed to: " + e.target.value)
            console.log("Changed to: " + e.target)
        }
    );
    $(selectCategoryForDownloadFiles).change(function(e){
       var valCategory = e.target.value;
       var textCategory = e.target.selectedOptions[0].text;
       
       $('#CategoryForDownloadFiles span:nth-child(2)').html( ': ' + textCategory);
       console.log(valCategory);
    });
    $(document).on('click', '.button-help-category', function(){
        $('.helperCategory').toggle(120);
        $(this).find('span').toggleClass('mdi-help mdi-close');
    });
    
    function checkCategory(){
        $('.informing-window-commented-downloader small')
            .html(`Категория не выбрана, однако вы можете ее изменить в дальнейших настройках, продолжить зарузку?
            <a class="text-primary" type="button">Да</a>  <a class="text-danger" type="button">Нет</a>`);
        $('.informing-window-commented-downloader').show();
    }









    $(document).on('focus', 'input.input-comment-downloader', () => {
        $('.container-Input-comment-downloader').addClass('container-Input-comment-downloader-active');
    });
    $(document).on('blur', 'input.input-comment-downloader', () => {
        $('.container-Input-comment-downloader').removeClass('container-Input-comment-downloader-active');
    });

    function startSelectCategory (inputSelect) {
        var optgroup = $(inputSelect).find('optgroup');
        optgroup.children().remove();

        var formData = new FormData();
        formData.append('queryId', 'getCategories');
        $.ajax({
            url: 'ajax.php',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function(data) {
                successGetCategories(data);
            },
        });
        function successGetCategories(data) {
            try {
                var jsonData = JSON.parse(data);
                if (typeof jsonData.AuthError !== "undefined") {
                    alertMsg(jsonData.AuthError);
                } else {
                    for( var key in jsonData) {
                        var Id   = jsonData[key].Id;
                        var Name = jsonData[key].NameCategory;

                        optgroup.append( `<option value="${Id}">${Name}</option>` )                                               
                    }
                    $(inputSelect).selectpicker('refresh');
                }
            } catch (e) {
                alertMsg("Ошибка в структуре ответа от сайта:<br>" + e);
            }
        };
    }
    


});