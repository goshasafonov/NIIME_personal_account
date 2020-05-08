/*global exampleLargeMdiIcon, formCreatePage_MdiIcon */

//selectMdiIcon.innerHTML = "";

$(document).ready(function () {
    fillMdiIconInSelectPicker(formCreatePage_MdiIcon);
});

function createNewPage() {
    var formData = new FormData(formCreatePage);
    formData.append('queryId', 'getRoute');
     $.ajax({
        url: 'ajax.php',
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function (data) {
            try {
                var jsonData = JSON.parse(data);
                if (typeof jsonData.AjaxError !== "undefined") {
                    //alertMsg(jsonData.AjaxError);
                    createToast("Error", jsonData.AjaxError);    
                } else {
                    alert(1);
                }
            } catch (e) {
                createToast("Error", "Ошибка в структуре ответа от сайта:<br>" + e);                 
            }
        },
        error: function (request, status, error) {
            createToast("Error", "Ошибка при обращении к серверу:<br>error:" + error + "<br>status:" + status);
        }
    });
}

function showExampleMdiIcon(sel) {
    exampleLargeMdiIcon.setAttribute("class","text-muted text-center "+sel.value);
}