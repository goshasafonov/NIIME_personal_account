/*global formRoutes, formTechnology, combinationOptionsTable, hideEmptyRow, showNameOptions, routesCheckbox, technologySelect, modalAlertBody, modalAlert, pathAjax*/

var pathAjax = {
    'value':'./ajax.php',
};


function alertMsg(text) {
    modalAlertBody.innerHTML = text;
    $('#modalAlert').modal('show');
}

function clearRoute() {
    routesCheckbox.innerHTML = "";
    var label = document.createElement("label");
    label.innerHTML = "Маршруты:";
    routesCheckbox.appendChild(label);
    clearTable();
}

function clearTable() {
    showNameOptions.disabled = true;
    hideEmptyRow.disabled = true;
    combinationOptionsTable.children[1].innerHTML = "";
    combinationOptionsTable.hidden = true;
    combinationOptionsTable.children[0].children[0].innerHTML = "<th scope=\"col\" rowspan=\"2\">#</th><th scope=\"col\" rowspan=\"2\">Комбинация опций</th>";
    combinationOptionsTable.children[0].children[1].innerHTML = "";
}

function createBaseRouteCheckBox(parentForm, checkboxId, checkboxValue, labelText) {
    var div = document.createElement("div");
    var input = document.createElement("input");
    var label = document.createElement("label");

    div.setAttribute("class", "custom-control custom-checkbox");
    input.type = "checkbox";
    input.setAttribute("class", "custom-control-input");
    input.id = checkboxId;
    input.value = checkboxValue;
    input.name = "route[]";
    input.setAttribute("onchange", "getCombinationOption()");
    label.setAttribute("class", "custom-control-label");
    label.setAttribute("for", checkboxId);
    label.innerHTML = labelText;

    parentForm.appendChild(div);
    div.appendChild(input);
    div.appendChild(label);
}

function getTechnologyList() {
    clearRoute();
    technologySelect.innerHTML = "";
    technologySelect.disabled = true;

    var formData = new FormData();
    formData.append('queryId', 'getTechnologyList');
    $.ajax({
        url: pathAjax.value,
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function (data) {
            try {
                var jsonData = JSON.parse(data);
                if (typeof jsonData.AjaxError !== "undefined") {
                    alertMsg(jsonData.AjaxError);
                } else if (typeof jsonData.TechnologyList !== "undefined") {
                    technologySelect.innerHTML = "";
                    var opt = document.createElement("option");
                    opt.text = "...";
                    opt.selected = true;
                    technologySelect.appendChild(opt);
                    for (var key in jsonData.TechnologyList) {
                        var opt = document.createElement("option");
                        opt.text = jsonData.TechnologyList[key].Name;
                        opt.value = jsonData.TechnologyList[key].Id;
                        technologySelect.appendChild(opt);
                    }
                    technologySelect.disabled = false;
                } else {
                    alertMsg("Не корректный ответ от сервера");
                }
            } catch (e) {
                alertMsg("Ошибка в структуре ответа от сайта:<br>" + e);
            }
        },
        error: function (request, status, error) {
            alertMsg("Ошибка при обращении к серверу:<br>error:" + error + "<br>status:" + status);
        }
    });
}

function getRoute() {
    clearRoute();
    var formData = new FormData(formTechnology);
    formData.append('queryId', 'getRoute');
    if (formData.get("technology") == "...") {
        return false;
    }
    $.ajax({
        url: pathAjax.value,
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function (data) {
            try {
                var jsonData = JSON.parse(data);
                if (typeof jsonData.AjaxError !== "undefined") {
                    alertMsg(jsonData.AjaxError);
                } else if (typeof jsonData.RouteList !== "undefined") {
                    if (Object.keys(jsonData.RouteList).length > 0) {
                        for (var key in jsonData.RouteList) {
                            createBaseRouteCheckBox(routesCheckbox, "baseRoute_" + jsonData.RouteList[key].Id, jsonData.RouteList[key].Id, jsonData.RouteList[key].Name);
                        }
                    } else {
                        var div = document.createElement("div");
                        div.setAttribute("class", "alert alert-warning");
                        div.innerHTML = "Данных нет";
                        routesCheckbox.appendChild(div);
                    }
                } else {
                    alertMsg("Не корректный ответ от сервера");
                }
            } catch (e) {
                alertMsg("Ошибка в структуре ответа от сайта:<br>" + e);
            }
        },
        error: function (request, status, error) {
            alertMsg("Ошибка при обращении к серверу:<br>error:" + error + "<br>status:" + status);
        }
    });
}

function getCombinationOption() {

    clearTable();
    var formData = new FormData(formRoutes);
    formData.append('queryId', 'getOptionCombination');
    if (!formData.has("route[]")) {
        return false;
    }
    $.ajax({
        url: pathAjax.value,
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function (data) {
            try {
                var jsonData = JSON.parse(data);
                if (typeof jsonData.AjaxError !== "undefined") {
                    alertMsg(jsonData.AjaxError);
                } else if (typeof jsonData.RoutesList !== "undefined" && typeof jsonData.OptionCombinationList !== "undefined") {
                    if (Object.keys(jsonData.RoutesList).length == 0 || Object.keys(jsonData.OptionCombinationList).length == 0) {
                        return false;
                    }
                    //Заполнение заголовка таблицы
                    var thead = combinationOptionsTable.children[0];
                    var tbody = combinationOptionsTable.children[1];
                    var th1Row = thead.children[0];
                    var th2Row = thead.children[1];

                    for (var key in jsonData.RoutesList) {
                        var th = document.createElement("th");
                        th.innerHTML = jsonData.RoutesList[key].Name;
                        th.setAttribute("scope", "col");
                        th.setAttribute("style", "text-align:center;");
                        if (Object.keys(jsonData.RoutesList[key]["Option"]).length > 0) {
                            th.setAttribute("colspan", Object.keys(jsonData.RoutesList[key]["Option"]).length);
                            for (var key1 in jsonData.RoutesList[key]["Option"]) {
                                var th2 = document.createElement("th");
                                var input = document.createElement("input");
                                input.type = "hidden";
                                input.value = key + "_" + key1;
                                th2.appendChild(input);
                                th2.setAttribute("style", "text-align:center;");
                                th2.innerHTML = th2.innerHTML + jsonData.RoutesList[key]["Option"][key1];
                                th2Row.appendChild(th2);
                            }
                        } else {
                            var th2 = document.createElement("th");
                            var input = document.createElement("input");
                            input.type = "hidden";
                            input.value = "";
                            th2.appendChild(input);
                            th2.innerHTML = th2.innerHTML + "Нет данных";
                            th2.setAttribute("style", "text-align:center;");
                            th2Row.appendChild(th2);
                        }
                        th1Row.appendChild(th);
                    }
                    //Заполнение строк таблицы
                    for (var key in jsonData.OptionCombinationList) {
                        var row = tbody.insertRow(tbody.rows.length);
                        var cellId = row.insertCell(row.length);
                        var cellOptionCombinationName = row.insertCell(row.length);

                        cellId.innerHTML = jsonData.OptionCombinationList[key].Id;
                        cellOptionCombinationName.innerHTML = jsonData.OptionCombinationList[key].Name;

                        for (var i = 0; i < thead.children[1].children.length; i++) {
                            var cell = row.insertCell(row.length);
                            if (typeof jsonData.OptionCombinationList[key]["BaseRoute_Option_Relation"][thead.children[1].children[i].children[0].value] !== "undefined") {
                                var p1 = document.createElement("p");
                                var p2 = document.createElement("p");
                                p1.setAttribute("style", "margin:0;padding:0;");
                                p2.setAttribute("style", "margin:0;padding:0;");
                                p1.innerHTML = "+";
                                p2.innerHTML = jsonData.OptionCombinationList[key]["BaseRoute_Option_Relation"][thead.children[1].children[i].children[0].value];
                                p1.hidden = true;
                                p2.hidden = true;
                                cell.appendChild(p1);
                                cell.appendChild(p2);
                            }
                        }

                    }
                    showOptionName();
                    hideEmptyRows();
                    showNameOptions.disabled = false;
                    hideEmptyRow.disabled = false;
                    combinationOptionsTable.hidden = false;
                } else {
                    alertMsg("Не корректный ответ от сервера");
                }
            } catch (e) {
                alertMsg("Ошибка в структуре ответа от сайта:<br>" + e);
            }
        },
        error: function (request, status, error) {
            alertMsg("Ошибка при обращении к серверу:<br>error:" + error + "<br>status:" + status);
        }
    });
}

function hideEmptyRows() {
    var tbody = combinationOptionsTable.children[1];
    for (var i = 0; i < tbody.children.length; i++) {
        var row = tbody.children[i];
        var flagEmpty = true;
        for (var j = 2; j < row.children.length; j++) {
            var cell = row.children[j];
            
            if (cell.children.length > 0) {
                flagEmpty = false;
            }
        }
        if (hideEmptyRow.checked && flagEmpty) {
            row.hidden = true;
        } else {
            row.hidden = false;
        }
    }
}

function showOptionName() {
    var tbody = combinationOptionsTable.children[1];
    for (var i = 0; i < tbody.children.length; i++) {
        var row = tbody.children[i];
        for (var j = 2; j < row.children.length; j++) {
            var cell = row.children[j];
            if (cell.children.length > 0) {
                if (showNameOptions.checked) {
                    cell.children[0].hidden = true;
                    cell.children[1].hidden = false;
                } else {
                    cell.children[0].hidden = false;
                    cell.children[1].hidden = true;
                }
            }
        }
    }
}

window.onload = function () {
    //technologyPage.setAttribute("class", "nav-item nav-link active");
    technologySelect.disabled = true;
    getTechnologyList();
}