
var files = new Array;
$(function () {
    $('.examplePoppver').popover({
        content: "<div class='card'><h5 class='card-header bg-transparent'>Название карточки</h5><div class='card-body'><p class='card-text'>This card has supporting text below as a natural lead-in to additional content.</p></div><div class='dropdown-divider'></div><ul><li>We can do it</li><li>Every day 24/7</li><li>Greatest UI in the word</li></ul><div class='card-footer'><small class='text-muted'>Last updated 29.05.1996</small></div></div>"
    });
    $('[data-toggle="popover"]').popover();
    $('.popover-dismiss').popover({
        trigger: 'focus'
    });
    $('[data-toggle="tooltip"]').tooltip();
    // modal downloader


    $(document).on('dragenter dragover dragleave drop', '.modal-drag-n-drop-downloader', preventDefaults);
    $(document).on('dragenter', '.modal-drag-n-drop-downloader', function (e) {
        $('.drag-n-drop-downloader-preview').removeClass('d-none').addClass('d-flex');
    });
    $(document).on('dragleave', '.drag-n-drop-downloader-preview', function (e) {
        $('.drag-n-drop-downloader-preview').removeClass('d-flex').addClass('d-none');
    });
    $(document).on('drop', '.modal-drag-n-drop-downloader', handleDrop);
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    function handleDrop(e) {
        $('.drag-n-drop-downloader-preview').removeClass('d-flex').addClass('d-none');
        $('.drag-n-drop-content').children().addClass('d-none').removeClass('d-flex');
        $('.drag-n-drop-documents').removeClass('d-none').addClass('d-flex');
        var arrayFileList = e.originalEvent.dataTransfer.files;
        arrayFileList = ([...arrayFileList]);
        var tempFileList = new Array;
        arrayFileList.forEach(file => {
            tempFileList.push({'file': file, 'comment': ''});
        });
        renderfiles(arrayFileList, files);
        if (files) {
            files = ([...files, ...tempFileList]);
        } else {
            files = tempFileList;
        }
        ;
    }

    function renderfiles(files, GlobalArrayFiles) {
        var numberInArrayFiles = GlobalArrayFiles.length;
        files.forEach(uploadfile => {

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
                                          <span class="badge badge-danger ${ext.check ? 'd-none' : 'd-inline-block'}" 
                                          style="padding: 2px 5px;">не возможно загрузить</span>

                                          <div class="comment-upload-document d-none align-items-center text-nowrap" style="min-width:50px;">
                                              <span class="badge badge-info d-inline-block" 
                                              style="padding: 2px 5px;">Комментарий</span>
                                              <span class="mr-3 span-comment-upload-document" 
                                              style = "white-space: nowrap;overflow: hidden;text-overflow: ellipsis;"
                                              ></span>
                                          </div>
                                      </small>
                                  </div>

                                  <div class="align-items-center ${!ext.check ? 'd-none' : 'd-flex'}">

                                      <span class="button-send-file-drag-n-drop-downloader mdi mdi-file-send-outline mr-2 text-success"
                                      data-toggle="tooltip" data-placement="top" title="Отправить файл на согласование"
                                      data-number-in-array-files=${numberInArrayFiles} type="button"
                                      ></span>

                                      <span class="button-add-comment-drag-n-drop-downloader mdi mdi-comment-plus-outline mr-2 text-primary"
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

    function checkingFileExtension(file) {
        var ext = file.name.split('.').pop();
        var size = file.size;
        var mdi = {'mdi': 'mdi mdi-file-alert', 'color': 'red'};
        var check = false;
        var obj = {
            'doc': {'mdi': ' mdi mdi-file-word', 'color': 'blue'},
            'docx': {'mdi': ' mdi mdi-microsoft-word', 'color': 'blue'},
            'txt': {'mdi': ' mdi mdi-file-document', 'color': 'grey'},
            'pdf': {'mdi': ' mdi mdi-file-pdf', 'color': 'red'},
            'csv': {'mdi': ' mdi mdi-file-table', 'color': 'green'},
            'xsl': {'mdi': ' mdi mdi-microsoft-excel', 'color': 'green'},
            'xlsx': {'mdi': ' mdi mdi-microsoft-excel', 'color': 'green'},
            'xlsm': {'mdi': ' mdi mdi-microsoft-excel', 'color': 'green'},
            'ppt': {'mdi': ' mdi mdi-file-powerpoint', 'color': 'red'},
            'pptx': {'mdi': ' mdi mdi-microsoft-powerpoint', 'color': 'red'},
            'html': {'mdi': ' mdi mdi-language-html5', 'color': 'red'},
            'js': {'mdi': ' mdi mdi-language-javascript', 'color': 'yellow'},
            'json': {'mdi': ' mdi mdi-code-json', 'color': 'red'},
        };
        for (var key in obj) {
            if (key === ext) {
                mdi = obj[key];
                check = true;
            }
            ;
        }
        ;
        if (size < Math.pow(2, 10)) {
            size = size + ' B';
        } else if (size < Math.pow(2, 20)) {
            size = parseFloat(size / Math.pow(2, 10)).toFixed(2) + ' KB';
        } else if (size < Math.pow(2, 30)) {
            size = parseFloat(size / Math.pow(2, 20)).toFixed(2) + ' MB';
        } else if (size < Math.pow(2, 40)) {
            size = parseFloat(size / Math.pow(2, 30)).toFixed(2) + ' GB';
        } else if (size < Math.pow(2, 50)) {
            size = parseFloat(size / Math.pow(2, 40)).toFixed(2) + ' TB';
        }
        ;
        return {'ext': ext, 'icon': mdi, 'size': size, 'check': check};
    }
    $(document).on('click', '.button-add-comment-drag-n-drop-downloader', function () {
        $('.input-comment-downloader').focus();
        $('.informing-window-commented-downloader').hide();
        $('.input-comment-downloader').attr('data-comented-document', $(this).attr('data-number-in-array-files'))
    })

    $(document).on('click', '.button-edit-comment-drag-n-drop-downloader', function () {
        $('.input-comment-downloader').focus();
        $('.informing-window-commented-downloader').hide();
        var number = $(this).attr('data-number-in-array-files');
        $('.input-comment-downloader').attr('data-comented-document', number).val(files[number]['comment']);
    })

    $(document).on('click', '.button-send-comment-downloader', function () {
        var number = $('.input-comment-downloader').attr('data-comented-document');
        if (number) {
            var commentText = $('.input-comment-downloader').val();
            if (commentText != '') {

                $('.input-comment-downloader').val('');
                $(`.button-add-comment-drag-n-drop-downloader[data-number-in-array-files=${number}]`).hide();
                $(`.button-edit-comment-drag-n-drop-downloader[data-number-in-array-files=${number}]`).show();
                $(`.uploadDocument[data-number-in-array-files=${number}] .meta-information-file-drag-n-drop-downloader .comment-upload-document`).removeClass('d-none').addClass('d-flex').children('.span-comment-upload-document').html(commentText);
                files[number]['comment'] = commentText;
                $('.informing-window-commented-downloader small').html('Комментарий успешно добавлен').parent().show();
                setTimeout(() => $('.informing-window-commented-downloader').hide(), 1000);
            } else {
                files[number]['comment'] = commentText;
                $(`.button-add-comment-drag-n-drop-downloader[data-number-in-array-files=${number}]`).show();
                $(`.button-edit-comment-drag-n-drop-downloader[data-number-in-array-files=${number}]`).hide();
                $(`.uploadDocument[data-number-in-array-files=${number}] .meta-information-file-drag-n-drop-downloader .comment-upload-document`).removeClass('d-flex').addClass('d-none').children('.span-comment-upload-document').html(commentText);
                $('.informing-window-commented-downloader small').html('Комментарий удален').parent().show();
                setTimeout(() => $('.informing-window-commented-downloader').hide(), 1000);
            }
            $('.input-comment-downloader').removeAttr('data-comented-document');
        } else {
            console.log('выберите документ');
            $('.informing-window-commented-downloader small').html('Выберите документ и нажмиту кнопку добавить комментарий').parent().show();
        }
    })
    $(document).on('click', '.button-send-file-drag-n-drop-downloader', function () {
        var number = $(this).attr('data-number-in-array-files');
        var formData = new FormData();
        formData.append('niime_documents', files[number]['file']);
        formData.append('niime_documents_comment', files[number]['comment']);
        $.ajax({
            xhr: function () {
                var xhr = new window.XMLHttpRequest();
                xhr.upload.onprogress = function (event) {
                    console.log((event.loaded / event.total) * 100);
                };
                return xhr;
            },
            url: '../php/documents.php',
            type: 'POST',
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            success: function (data) {
                alert(data);
            }
        });
    })
    $(document).on('click', '.button-delete-file-drag-n-drop-downloader', function () {
        $(this).closest('.uploadDocument').remove();
        $('.tooltip').remove();
        if ($('.drag-n-drop-documents').children().length === 0) {
            $('.drag-n-drop-content').children().removeClass('d-none').addClass('d-flex');
            $('.drag-n-drop-documents').removeClass('d-flex').addClass('d-none');
        }
    })
});