/*global formChangeLayerOfManagmentAllLayers_rowOptions, formChangeLayerOfManagmentAllLayers_optionsSelectOption, managePanelAllLayersCreateNewLayer, formCreateNewLayerOfManagmentAllLayers_name, formCreateNewLayerOfManagmentAllLayers_layer, managePanelAllLayersChangeNewLayer, formCreateNewLayerOfManagmentAllLayers_maskDivRow, formCreateNewLayerOfManagmentAllLayers_maskMark, formCreateNewLayerOfManagmentAllLayers_intermediateDivRow, formCreateNewLayerOfManagmentAllLayers_intermediateDensity, formCreateNewLayerOfManagmentAllLayers_intermediateMark, formCreateNewLayerOfManagmentAllLayers_cadDivRow, formCreateNewLayerOfManagmentAllLayers_cadTypeDummy, formCreateNewLayerOfManagmentAllLayers_cadTypeBase, formCreateNewLayerOfManagmentAllLayers_cadType, formCreateNewLayerOfManagmentAllLayers_type, formChangeLayerOfManagmentAllLayers_intermediateMergingRelation_id, formChangeLayerOfManagmentAllLayers_intermediateMergingRelation_attribute, formChangeLayerOfManagmentAllLayers_intermediateMergingRelation_route, formChangeLayerOfManagmentAllLayers_intermediateMergingRelation_name, formChangeLayerOfManagmentAllLayers_intermediateMergingRelation_layer, formChangeLayerOfManagmentAllLayers_forbiddingMergingRelation_id, formChangeLayerOfManagmentAllLayers_forbiddingMergingRelation_attribute, formChangeLayerOfManagmentAllLayers_forbiddingMergingRelation_route, formChangeLayerOfManagmentAllLayers_forbiddingMergingRelation_name, formChangeLayerOfManagmentAllLayers_forbiddingMergingRelation_layer, formChangeLayerOfManagmentAllLayers_intermediateMaskRelation_id, formChangeLayerOfManagmentAllLayers_intermediateMaskRelation_attribute, formChangeLayerOfManagmentAllLayers_intermediateMaskRelation_route, formChangeLayerOfManagmentAllLayers_intermediateMaskRelation_name, formChangeLayerOfManagmentAllLayers_intermediateMaskRelation_layer, formChangeLayerOfManagmentAllLayers_mergingIntermediateRelation_id, formChangeLayerOfManagmentAllLayers_mergingIntermediateRelation_attribute, formChangeLayerOfManagmentAllLayers_mergingIntermediateRelation_route, formChangeLayerOfManagmentAllLayers_mergingIntermediateRelation_name, formChangeLayerOfManagmentAllLayers_mergingIntermediateRelation_layer, formChangeLayerOfManagmentAllLayers_maskIntermediateRelation_id, formChangeLayerOfManagmentAllLayers_maskIntermediateRelation_attribute, formChangeLayerOfManagmentAllLayers_maskIntermediateRelation_route, formChangeLayerOfManagmentAllLayers_maskIntermediateRelation_name, formChangeLayerOfManagmentAllLayers_maskIntermediateRelation_layer, formChangeLayerOfManagmentAllLayers_mergingForbiddingRelation_id, formChangeLayerOfManagmentAllLayers_mergingForbiddingRelation_route, formChangeLayerOfManagmentAllLayers_mergingForbiddingRelation_name, formChangeLayerOfManagmentAllLayers_mergingForbiddingRelation_layer, formSearcheManagePanelAllLayersChangeLayer_route, formSearcheManagePanelAllLayersChangeLayer_attribute, formSearcheManagePanelAllLayersChangeLayer_type, formSearcheManagePanelAllLayersChangeLayer_name, formSearcheManagePanelAllLayersChangeLayer_layer, formSearcheManagePanelAllLayersChangeLayer, formChangeLayerOfManagmentAllLayers, formChangeLayerOfManagmentAllLayers_routesSelectRoute, formChangeLayerOfManagmentAllLayers_routesSelectTechnology, formChangeLayerOfManagmentAllLayers_rowRoutes, formChangeLayerOfManagmentAllLayers_rowRelationMaskIntermdiate, formChangeLayerOfManagmentAllLayers_maskMark, formChangeLayerOfManagmentAllLayers_rowAttributesMask, formChangeLayerOfManagmentAllLayers_rowRelationIntermdiateMask, formChangeLayerOfManagmentAllLayers_rowRelationIntermdiateMerging, formChangeLayerOfManagmentAllLayers_intermediateDensity, formChangeLayerOfManagmentAllLayers_intermediateMark, formChangeLayerOfManagmentAllLayers_rowAttributesIntermediate, formChangeLayerOfManagmentAllLayers_rowRelationMergingIntermdiate, formChangeLayerOfManagmentAllLayers_rowRelationMergingForbidding, formChangeLayerOfManagmentAllLayers_mergingDummy, formChangeLayerOfManagmentAllLayers_mergingBase, formChangeLayerOfManagmentAllLayers_rowAttributesMerging, formChangeLayerOfManagmentAllLayers_rowRelationForbiddingMerging, formChangeLayerOfManagmentAllLayers_type, formChangeLayerOfManagmentAllLayers_name, formChangeLayerOfManagmentAllLayers_layer, formSearcheManagePanelAllLayersChangeLayer_id, tableManageAllLayers, formChangeLayerOfManagmentAllLayers_id, formRoutes, technologySelect, pathAjax, layerManagmentPage, tableCadLayers, modalAlertBody, Element, routesCheckbox, formTechnology*/
var pathAjax = {
    'value' : './ajax.php',
};
/*
 Общие функции
 */

function alertMsg(text) {
    modalAlertBody.innerHTML = text;
    $('#modalAlert').modal('show');
}

function appendOpt(select, val, text) {
    var option = document.createElement("option");
    option.value = val;
    option.text = text;
    select.appendChild(option);
}

function checkTd(td) {
    if (td.innerHTML == "ERROR") {
        td.setAttribute("class", "table-danger");
    }
    if (td.innerHTML == "NONE") {
        td.setAttribute("class", "table-warning");
    }
    if (td.innerHTML == "undefined") {
        td.setAttribute("class", "table-secondary");
    }
}

function createCheckBox(parentForm) {
    var input = document.createElement("input");
    input.type = "checkbox";
    parentForm.appendChild(input);
}

function createEmptyOptionForSelect(select, val, text) {
    select.innerHTML = "";
    appendOpt(select, val, text);
}

function createInputGroup(parentEl, text, val, btnId, onclk) {
    var divIG = document.createElement("div");
    var divIGA = document.createElement("div");
    var input = document.createElement("input");
    var button = document.createElement("button");

    divIG.setAttribute("class", "input-group mb-3");
    input.type = "text";
    input.disabled = true;
    input.value = text;
    input.setAttribute("class", "form-control");
    input.setAttribute("placeholder", "");
    input.setAttribute("aria-label", "");
    input.setAttribute("aria-describedby", btnId);
    divIGA.setAttribute("class", "input-group-append");
    button.type = "button";
    button.id = btnId;
    button.setAttribute("class", "btn btn-outline-danger");
    button.setAttribute("onclick", onclk);
    button.value = val;
    button.innerHTML = "Удалить";

    parentEl.appendChild(divIG);
    divIG.appendChild(input);
    divIG.appendChild(divIGA);
    divIGA.appendChild(button);
}

function renameLabelInputFile(el) {
    var fileName = el.value;
    var label = el.parentNode.children[1];
    if (fileName != "") {
        label.innerHTML = el.files[0].name;
    } else {
        label.innerHTML = "Выберите файл";
    }

    tableCadLayers.children[1].innerHTML = "";
    tableCadLayers.hidden = true;
}

function selectpickerRefresh(id, text, arr, keyFlag, val) {
    if (document.getElementById(id)) {
        select = document.getElementById(id);
        createEmptyOptionForSelect(select, "", text);
        for (var key in arr) {
            if (keyFlag == 1) {
                appendOpt(select, arr[key], arr[key]);
            } else {
                appendOpt(select, key, arr[key]);
            }
        }
        select.value = val;
        $('#' + id).selectpicker('refresh');
        $('#' + id).selectpicker('val', val);
    }
}

window.onload = function () {
    //layerManagmentPage.setAttribute("class", "nav-item nav-link active");
    getTechnologyList();
};

Element.prototype.documentOffsetTop = function () {
    return this.offsetTop + (this.offsetParent ? this.offsetParent.documentOffsetTop() : 0);
};

/*
 Технология - маршруты
 */

function clearRoute() {
    routesCheckbox.innerHTML = "";
    var label = document.createElement("label");
    label.innerHTML = "Маршруты:";
    routesCheckbox.appendChild(label);

    initialStateDivStreamInOutUpload();
}

function createBaseRouteRadiokBox(parentForm, checkboxId, checkboxValue, labelText) {
    var div = document.createElement("div");
    var input = document.createElement("input");
    var label = document.createElement("label");
    div.setAttribute("class", "custom-control custom-radio");
    input.type = "radio";
    input.setAttribute("class", "custom-control-input");
    input.id = checkboxId;
    input.value = checkboxValue;
    input.name = "route";
    input.setAttribute("onchange", "getRouteContent()");
    label.setAttribute("class", "custom-control-label");
    label.setAttribute("for", checkboxId);
    label.innerHTML = labelText;
    parentForm.appendChild(div);
    div.appendChild(input);
    div.appendChild(label);
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
                            createBaseRouteRadiokBox(routesCheckbox, "baseRoute_" + jsonData.RouteList[key].Id, jsonData.RouteList[key].Id, jsonData.RouteList[key].Name);
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

function getRouteContent() {
    initialStateDivStreamInOutUpload();
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

/*
 Зона StreamInOut
 */

function checkRowStreamInOutFormCreateNewLayer(el) {
    var base = el.parentNode.parentNode.children[5].children[0];
    var dummy = el.parentNode.parentNode.children[6].children[0];

    base.checked = false;
    dummy.checked = false;

    switch (el.value) {
        case "0" :
            base.disabled = true;
            dummy.disabled = true;
            break;
        case "1" :
            base.disabled = true;
            dummy.disabled = true;
            break;
        case "2" :
            base.disabled = true;
            dummy.disabled = true;
            break;
        case "3" :
            base.disabled = false;
            dummy.disabled = false;
            break;
    }
}

function createButtonNewLayerOfStreamInOut(cellButton) {
    var button = document.createElement("button");
    button.type = "button";
    button.setAttribute("class", "btn btn-success btn-sm btn-block");
    button.setAttribute("onclick", "createNewLayerOfStreamInOut(this)");
    button.innerHTML = "Создать";
    cellButton.appendChild(button);
}

function createButtonNewBaseRouteLayerRelationOfStreamInOut(cellRelationBaseRoute) {
    var button = document.createElement("button");
    button.type = "button";
    button.setAttribute("class", "btn btn-danger btn-sm");
    button.setAttribute("onclick", "createNewBaseRouteLayerRelationOfStreamInOut(this)");
    button.innerHTML = "Добавить слой в маршрут";
    button.innerHTML = "X";
    cellRelationBaseRoute.appendChild(button);
}

function createButtonDeleteBaseRouteLayerRelationOfStreamInOut(cellRelationBaseRoute) {
    var button = document.createElement("button");
    button.type = "button";
    button.setAttribute("class", "btn btn-success btn-sm mdi mdi-delete");
    button.setAttribute("onclick", "deleteBaseRouteLayerRelationOfStreamInOut(this)");
    button.innerHTML = "Удалить слой";
    cellRelationBaseRoute.appendChild(button);
}

function createButtonNewRowStreamInOutLayers(cellButton) {
    var buttonCreateDuplicate = document.createElement("button");
    buttonCreateDuplicate.type = "button";
    buttonCreateDuplicate.setAttribute("class", "btn btn-primary btn-sm btn-block");
    buttonCreateDuplicate.innerHTML = "Копировать";
    buttonCreateDuplicate.setAttribute("onclick", "createNewRowStreamInOutLayers(this.parentElement.parentElement)");
    cellButton.appendChild(buttonCreateDuplicate);
}

function createNewBaseRouteLayerRelationOfStreamInOut(el) {
    var formDataRoute = new FormData(formRoutes);
    if (!formDataRoute.has("route")) {
        alertMsg("Необходимо выбрать маршрут");
        return false;
    }
    var row = el.parentNode.parentNode;
    var layerId = el.parentNode.parentNode.children[1].innerHTML;
    var formData = new FormData(formTechnology);
    formData.append('queryId', 'createLayerBaseRouteRelation');
    formData.append('layerId', layerId);
    formData.append('baseroute', formDataRoute.get('route'));

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
                } else if (typeof jsonData.Success !== "undefined") {
                    row.children[0].innerHTML = "";
                    createButtonDeleteBaseRouteLayerRelationOfStreamInOut(row.children[0]);
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

function createNewLayerOfStreamInOut(el) {
    var formDataRoute = new FormData(formRoutes);
    if (!formDataRoute.has("route")) {
        alertMsg("Необходимо выбрать маршрут");
        return false;
    }
    var row = el.parentNode.parentNode;
    var layer = row.children[2].innerHTML;
    var name = row.children[3].innerHTML;
    var type = row.children[4].children[0];
    var base = row.children[5].children[0];
    var dummy = row.children[6].children[0];

    var formData = new FormData(formTechnology);
    formData.append('layer', layer);
    formData.append('name', name);
    formData.append('baseroute', formDataRoute.get('route'));
    switch (type.value) {
        case "0" :
            alertMsg("Необходимо выбрать тип слоя.");
            return false;
            break;
        case "1" :
            formData.append('queryId', "createForbiddingLayer");
            break;
        case "2" :
            formData.append('queryId', "createSuspendedLayer");
            break;
        case "3" :
            formData.append('queryId', "createMergingLayer");
            if (base.checked) {
                formData.append('base', "1");
            }
            if (dummy.checked) {
                formData.append('dummy', "1");
            }
            break;
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
                } else if (typeof jsonData.Layer !== "undefined") {
                    row.children[0].innerHTML = "";
                    createButtonDeleteBaseRouteLayerRelationOfStreamInOut(row.children[0]);
                    row.children[1].innerHTML = jsonData.Layer["id"];
                    row.children[2].innerHTML = jsonData.Layer["layer"];
                    row.children[3].innerHTML = jsonData.Layer["name"];
                    row.children[4].innerHTML = jsonData.Layer["type"];
                    row.children[5].innerHTML = jsonData.Layer["base"];
                    row.children[6].innerHTML = jsonData.Layer["dummy"];
                    row.children[7].innerHTML = "";
                    createButtonNewRowStreamInOutLayers(row.children[7]);
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

function createNewRowStreamInOutLayers(rowGold) {
    var tbody = tableCadLayers.children[1];
    var row = tbody.insertRow(rowGold.rowIndex);

    var cellRelationBaseRoute = row.insertCell(row.length);
    var cellId = row.insertCell(row.length);
    var cellLayer = row.insertCell(row.length);
    var cellName = row.insertCell(row.length);
    var cellType = row.insertCell(row.length);
    var cellBase = row.insertCell(row.length);
    var cellDummy = row.insertCell(row.length);
    var cellButton = row.insertCell(row.length);

    cellLayer.innerHTML = rowGold.children[2].innerHTML;
    cellName.innerHTML = rowGold.children[3].innerHTML;
    createSelectTypeStereamInOutLayers(cellType);

    createCheckBox(cellBase);
    cellBase.children[0].disabled = true;
    createCheckBox(cellDummy);
    cellDummy.children[0].disabled = true;

    createButtonNewLayerOfStreamInOut(cellButton);
}

function createSelectTypeStereamInOutLayers(cellType) {
    var select = document.createElement("select");
    select.setAttribute("class", "custom-select custom-select-sm");
    select.setAttribute("onchange", "checkRowStreamInOutFormCreateNewLayer(this)");

    var opt0 = document.createElement("option");
    opt0.value = 0;
    opt0.text = "...";
    select.appendChild(opt0);

    var opt1 = document.createElement("option");
    opt1.value = 1;
    opt1.text = "Forbidding";
    select.appendChild(opt1);

    var opt2 = document.createElement("option");
    opt2.value = 2;
    opt2.text = "Suspended";
    select.appendChild(opt2);

    var opt3 = document.createElement("option");
    opt3.value = 3;
    opt3.text = "Merging";
    select.appendChild(opt3);

    cellType.appendChild(select);
}

function deleteBaseRouteLayerRelationOfStreamInOut(el) {
    var formDataRoute = new FormData(formRoutes);
    if (!formDataRoute.has("route")) {
        alertMsg("Необходимо выбрать маршрут");
        return false;
    }
    var row = el.parentNode.parentNode;
    var layerId = el.parentNode.parentNode.children[1].innerHTML;
    var formData = new FormData(formTechnology);
    formData.append('queryId', 'deleteLayerBaseRouteRelation');
    formData.append('layerId', layerId);
    formData.append('baseroute', formDataRoute.get('route'));

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
                } else if (typeof jsonData.Success !== "undefined") {
                    $(row).remove();
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

function initialStateDivStreamInOutUpload() {
    tableCadLayers.children[1].innerHTML = "";
    tableCadLayers.hidden = true;
}

function uploadStreamInOut() {
    tableCadLayers.children[1].innerHTML = "";
    tableCadLayers.hidden = true;

    var formDataRoute = new FormData(formRoutes);
    if (!formDataRoute.has("route")) {
        alertMsg("Необходимо выбрать маршрут");
        return false;
    }

    var formData = new FormData(streamOutfile);
    formData.append('queryId', 'uploadStremInOut');
    formData.append('baseroute', formDataRoute.get('route'));
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
                } else if (typeof jsonData.Content !== "undefined") {
                    var tbody = tableCadLayers.children[1];
                    for (var key in jsonData.Content) {
                        var row = tbody.insertRow(tbody.rows.length);
                        var cellRelationBaseRoute = row.insertCell(row.length);
                        var cellId = row.insertCell(row.length);
                        var cellLayer = row.insertCell(row.length);
                        var cellName = row.insertCell(row.length);
                        var cellType = row.insertCell(row.length);
                        var cellBase = row.insertCell(row.length);
                        var cellDummy = row.insertCell(row.length);
                        var cellButton = row.insertCell(row.length);

                        if (jsonData.Content[key].id != "") {
                            
                            createButtonDeleteBaseRouteLayerRelationOfStreamInOut(cellRelationBaseRoute);
                            
                            createButtonNewRowStreamInOutLayers(cellButton);
                            cellType.innerHTML = jsonData.Content[key].type;
                            cellBase.innerHTML = jsonData.Content[key].base;
                            cellDummy.innerHTML = jsonData.Content[key].dummy;
                        } else {
                            createSelectTypeStereamInOutLayers(cellType);
                            createCheckBox(cellBase);
                            cellBase.children[0].disabled = true;
                            createCheckBox(cellDummy);
                            cellDummy.children[0].disabled = true;
                            createButtonNewLayerOfStreamInOut(cellButton);
                        }
                        cellId.innerHTML = jsonData.Content[key].id;
                        cellLayer.innerHTML = jsonData.Content[key].layer;
                        cellName.innerHTML = jsonData.Content[key].name;
                    }
                    tableCadLayers.hidden = false;
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

/*
 Зона Управление слоями
 */

function scroolToRowInAllLayersTable(id) {
    if (id == "") {
        alertMsg("Необходимо выбрать id слоя");
        return false;
    }
    scroolIdRow = "tableManageAllLayers_row_" + id;
    if (document.getElementById(scroolIdRow)) {
        if (document.getElementById(scroolIdRow).hidden == false) {
            var top = document.getElementById(scroolIdRow).documentOffsetTop() - (window.innerHeight / 2);
            window.scrollTo(0, top);
            document.getElementById(scroolIdRow).setAttribute("class", "table-info");
            setTimeout(function () {
                document.getElementById(scroolIdRow).setAttribute("class", "");
            }, 1000);
        } else {
            alertMsg("Строка скрыта фильтрами");
        }
    } else {
        alertMsg("Не удалось найти такую строку в таблице: " + id);
    }
}

function showRowTableAllLayers() {
    var tbody = tableManageAllLayers.children[1];
    for (var i = 0; i < tbody.children.length; i++) {
        var row = tbody.children[i];
        var cellTypeLayers = row.children[5];
        switch (cellTypeLayers.innerHTML) {
            case "Cad":
                if (filtrShowCadLayers.checked) {
                    row.hidden = false;
                } else {
                    row.hidden = true;
                }
                break;
            case "Intermediate":
                if (filtrShowIntermediateLayers.checked) {
                    row.hidden = false;
                } else {
                    row.hidden = true;
                }
                break;
            case "Mask":
                if (filtrShowMaskLayers.checked) {
                    row.hidden = false;
                } else {
                    row.hidden = true;
                }
                break;
        }
    }
}

function createButtonsRowTableManageAllLayers(td) {
    var buttonCopy = document.createElement("button");
    var buttonDelete = document.createElement("button");
    var buttonChange = document.createElement("button");

    buttonCopy.type = "button";
    buttonCopy.setAttribute("class", "btn btn-primary btn-sm mr-2");
    buttonCopy.innerHTML = "<span class=\"mdi mdi-content-copy\"></span>";
    buttonCopy.setAttribute("onclick", "openDivManagePanelAllLayersCreateNewLayers(this)");
    buttonDelete.type = "button";
    buttonDelete.setAttribute("class", "btn btn-danger btn-sm mr-2");
    buttonDelete.setAttribute("onclick", "deleteLayerOfTableManageAllLayers(this)");
    buttonDelete.innerHTML = "<span class=\"mdi mdi-trash-can-outline\"></span>";
    buttonChange.type = "button";
    buttonChange.setAttribute("class", "btn btn-primary btn-sm ml-2 mr-2");
    buttonChange.innerHTML = "<span class=\"mdi mdi-grease-pencil\"></span>";
    buttonChange.setAttribute("onclick", "openDivManagePanelAllLayersChangeNewLayers(this)");

    td.appendChild(buttonChange);
    td.appendChild(buttonCopy);
    td.appendChild(buttonDelete);
}

function createNewLayerOfFormCreateNewLayerOfManagmentAllLayers() {
    var formData = new FormData(formCreateNewLayerOfManagmentAllLayers);
    var cadBase = formCreateNewLayerOfManagmentAllLayers_cadTypeBase;
    var cadDummy = formCreateNewLayerOfManagmentAllLayers_cadTypeDummy;
    var intMark = formCreateNewLayerOfManagmentAllLayers_intermediateMark;
    var intDens = formCreateNewLayerOfManagmentAllLayers_intermediateDensity;
    var maskMark = formCreateNewLayerOfManagmentAllLayers_maskMark;

    var formDataRoute = new FormData(formRoutes);
    if (!formDataRoute.has("route")) {
        alertMsg("Необходимо выбрать маршрут");
        return false;
    }else{
        formData.append('baseroute', formDataRoute.get('route'));
    }
    

    if (formCreateNewLayerOfManagmentAllLayers_layer.value == "") {
        alertMsg("Необходимо указать слой.");
        return false;
    }

    if (formCreateNewLayerOfManagmentAllLayers_name.value == "") {
        alertMsg("Необходимо указать название слоя.");
        return false;
    }

    switch (formCreateNewLayerOfManagmentAllLayers_type.value) {
        case "0" :
            alertMsg("Необходимо выбрать тип слоя.");
            return false;
            break;
        case "1" :
            switch (formCreateNewLayerOfManagmentAllLayers_cadType.value) {
                case "0" :
                    alertMsg("Необходимо выбрать тип Cad слоя.");
                    return false;
                    break;
                case "1" :
                    formData.append('queryId', "createForbiddingLayer");
                    break;
                case "2" :
                    formData.append('queryId', "createSuspendedLayer");
                    break;
                case "3" :
                    formData.append('queryId', "createMergingLayer");
                    if (cadBase.checked) {
                        formData.append('base', "1");
                    }
                    if (cadDummy.checked) {
                        formData.append('dummy', "1");
                    }
                    break;
            }
            break;
        case "2" :
            formData.append('queryId', "createIntermediateLayer");
            if (intMark.checked) {
                formData.append('mark', "1");
            }
            if (intDens.checked) {
                formData.append('density', "1");
            }
            break;
        case "3" :
            formData.append('queryId', "createMaskLayer");
            if (maskMark.checked) {
                formData.append('mark', "1");
            }
            break;
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
                } else if (typeof jsonData.Layer !== "undefined") {
                    getAllLayers(jsonData.Layer.id);

                    // $('#managePanelAllLayers a[href="#divManagePanelAllLayersChangeLayer"]').tab('show')
                    // managePanelAllLayersChangeNewLayer.scrollIntoView();
                    // initialFormChangeLayerOfManagmentAllLayers();
                    // formSearcheManagePanelAllLayersChangeLayer_id.value = jsonData.Layer.id;
                    // getFiltrForSearchChangeLayers(jsonData.Layer.id);

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

function createLayerBaseRouteRelationOfFormChangeLayerOfManagmentAllLayers() {
    if (formChangeLayerOfManagmentAllLayers_routesSelectRoute.value != "") {
        var formData = new FormData(formTechnology);
        formData.append('queryId', 'createLayerBaseRouteRelation');
        formData.append('layerId', formChangeLayerOfManagmentAllLayers_id.innerHTML);
        formData.append('baseroute', formChangeLayerOfManagmentAllLayers_routesSelectRoute.value);

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
                    } else if (typeof jsonData.Success !== "undefined") {
                        getAllInfoForLayers();
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
    } else {
        alertMsg("Необходимо выбрать маршрут");
    }
}

function createLayerIntermediateLayerMergingRelation_ofFormChangeLayerOfManagmentAllLayers_rowRelationMergingIntermdiate() {
    if (formChangeLayerOfManagmentAllLayers_mergingIntermediateRelation_id.value == "") {
        alertMsg("Необходимо выбрать id intermediate слоя");
        return false;
    }
    var formData = new FormData();
    formData.append('queryId', 'createLayerIntermediateLayerMergingRelation');
    formData.append('mergingLayerId', formChangeLayerOfManagmentAllLayers_id.innerHTML);
    formData.append('intermediateLayerId', formChangeLayerOfManagmentAllLayers_mergingIntermediateRelation_id.value);
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
                } else if (typeof jsonData.Success !== "undefined") {
                    getAllInfoForLayers();
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

function createLayerIntermediateLayerMergingRelation_ofFormChangeLayerOfManagmentAllLayers_rowRelationIntermdiateMerging() {
    if (formChangeLayerOfManagmentAllLayers_intermediateMergingRelation_id.value == "") {
        alertMsg("Необходимо выбрать id merging слоя");
        return false;
    }
    var formData = new FormData();
    formData.append('queryId', 'createLayerIntermediateLayerMergingRelation');
    formData.append('intermediateLayerId', formChangeLayerOfManagmentAllLayers_id.innerHTML);
    formData.append('mergingLayerId', formChangeLayerOfManagmentAllLayers_intermediateMergingRelation_id.value);
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
                } else if (typeof jsonData.Success !== "undefined") {
                    getAllInfoForLayers();
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

function createLayerMaskIntermediateLayerRelation_ofFormChangeLayerOfManagmentAllLayers_rowRelationIntermdiateMask() {
    if (formChangeLayerOfManagmentAllLayers_intermediateMaskRelation_id.value == "") {
        alertMsg("Необходимо выбрать id mask слоя");
        return false;
    }
    var formData = new FormData();
    formData.append('queryId', 'createLayerMaskLayerIntermediateRelation');
    formData.append('intermediateLayerId', formChangeLayerOfManagmentAllLayers_id.innerHTML);
    formData.append('maskLayerId', formChangeLayerOfManagmentAllLayers_intermediateMaskRelation_id.value);
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
                } else if (typeof jsonData.Success !== "undefined") {
                    getAllInfoForLayers();
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

function createLayerMaskIntermediateLayerRelation_ofFormChangeLayerOfManagmentAllLayers_rowRelationMaskIntermdiate() {
    if (formChangeLayerOfManagmentAllLayers_maskIntermediateRelation_id.value == "") {
        alertMsg("Необходимо выбрать id intermediate слоя");
        return false;
    }
    var formData = new FormData();
    formData.append('queryId', 'createLayerMaskLayerIntermediateRelation');
    formData.append('maskLayerId', formChangeLayerOfManagmentAllLayers_id.innerHTML);
    formData.append('intermediateLayerId', formChangeLayerOfManagmentAllLayers_maskIntermediateRelation_id.value);
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
                } else if (typeof jsonData.Success !== "undefined") {
                    getAllInfoForLayers();
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

function createLayerMergingLayerForbiddingRelation_ofFormChangeLayerOfManagmentAllLayers_rowRelationForbiddingMerging() {
    if (formChangeLayerOfManagmentAllLayers_forbiddingMergingRelation_id.value == "") {
        alertMsg("Необходимо выбрать id merging слоя");
        return false;
    }
    var formData = new FormData();
    formData.append('queryId', 'createLayerMergingLayerForbiddingRelation');
    formData.append('forbiddingLayerId', formChangeLayerOfManagmentAllLayers_id.innerHTML);
    formData.append('mergingLayerId', formChangeLayerOfManagmentAllLayers_forbiddingMergingRelation_id.value);
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
                } else if (typeof jsonData.Success !== "undefined") {
                    getAllInfoForLayers();
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

function createLayerMergingLayerForbiddingRelation_ofFormChangeLayerOfManagmentAllLayers_rowRelationMergingForbidding() {
    if (formChangeLayerOfManagmentAllLayers_mergingForbiddingRelation_id.value == "") {
        alertMsg("Необходимо выбрать id merging слоя");
        return false;
    }
    var formData = new FormData();
    formData.append('queryId', 'createLayerMergingLayerForbiddingRelation');
    formData.append('mergingLayerId', formChangeLayerOfManagmentAllLayers_id.innerHTML);
    formData.append('forbiddingLayerId', formChangeLayerOfManagmentAllLayers_mergingForbiddingRelation_id.value);
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
                } else if (typeof jsonData.Success !== "undefined") {
                    getAllInfoForLayers();
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

function createLayerOptionRelationOfFormChangeLayerOfManagmentAllLayers() {
    if (formChangeLayerOfManagmentAllLayers_optionsSelectOption.value != "") {
        var formData = new FormData(formTechnology);
        formData.append('queryId', 'createLayerOptionRelation');
        formData.append('layerId', formChangeLayerOfManagmentAllLayers_id.innerHTML);
        formData.append('option', formChangeLayerOfManagmentAllLayers_optionsSelectOption.value);

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
                    } else if (typeof jsonData.Success !== "undefined") {
                        getAllInfoForLayers();
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
    } else {
        alertMsg("Необходимо выбрать опцию");
    }
}

function deleteLayerBaseRouteRelationOfFormChangeLayerOfManagmentAllLayers(el) {
    var formData = new FormData(formTechnology);
    formData.append('queryId', 'deleteLayerBaseRouteRelation');
    formData.append('layerId', formChangeLayerOfManagmentAllLayers_id.innerHTML);
    formData.append('baseroute', el.value);

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
                } else if (typeof jsonData.Success !== "undefined") {
                    getAllInfoForLayers();
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

function deleteLayerIntermediateLayerMergingRelation_ofFormChangeLayerOfManagmentAllLayers_rowRelationIntermediateMerging(el) {
    var formData = new FormData();
    formData.append('queryId', 'deleteLayerIntermediateLayerMergingRelation');
    formData.append('intermediateLayerId', formChangeLayerOfManagmentAllLayers_id.innerHTML);
    formData.append('mergingLayerId', el.value);
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
                } else if (typeof jsonData.Success !== "undefined") {
                    getAllInfoForLayers();
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

function deleteLayerIntermediateLayerMergingRelation_ofFormChangeLayerOfManagmentAllLayers_rowRelationMergingIntermediate(el) {
    var formData = new FormData();
    formData.append('queryId', 'deleteLayerIntermediateLayerMergingRelation');
    formData.append('mergingLayerId', formChangeLayerOfManagmentAllLayers_id.innerHTML);
    formData.append('intermediateLayerId', el.value);
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
                } else if (typeof jsonData.Success !== "undefined") {
                    getAllInfoForLayers();
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

function deleteLayerMaskLayerIntermediateRelation_ofFormChangeLayerOfManagmentAllLayers_rowRelationIntermediateMask(el) {
    var formData = new FormData();
    formData.append('queryId', 'deleteLayerMaskLayerIntermediateRelation');
    formData.append('intermediateLayerId', formChangeLayerOfManagmentAllLayers_id.innerHTML);
    formData.append('maskLayerId', el.value);
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
                } else if (typeof jsonData.Success !== "undefined") {
                    getAllInfoForLayers();
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

function deleteLayerMaskLayerIntermediateRelation_ofFormChangeLayerOfManagmentAllLayers_rowRelationMaskIntermediate(el) {
    var formData = new FormData();
    formData.append('queryId', 'deleteLayerMaskLayerIntermediateRelation');
    formData.append('intermediateLayerId', el.value);
    formData.append('maskLayerId', formChangeLayerOfManagmentAllLayers_id.innerHTML);
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
                } else if (typeof jsonData.Success !== "undefined") {
                    getAllInfoForLayers();
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

function deleteLayerMergingLayerForbiddingRelation_ofFormChangeLayerOfManagmentAllLayers_rowRelationForbiddingMerging(el) {
    var formData = new FormData();
    formData.append('queryId', 'deleteLayerMergingLayerForbiddingRelation');
    formData.append('forbiddingLayerId', formChangeLayerOfManagmentAllLayers_id.innerHTML);
    formData.append('mergingLayerId', el.value);
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
                } else if (typeof jsonData.Success !== "undefined") {
                    getAllInfoForLayers();
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

function deleteLayerMergingLayerForbiddingRelation_ofFormChangeLayerOfManagmentAllLayers_rowRelationMergingForbidding(el) {
    var formData = new FormData();
    formData.append('queryId', 'deleteLayerMergingLayerForbiddingRelation');
    formData.append('mergingLayerId', formChangeLayerOfManagmentAllLayers_id.innerHTML);
    formData.append('forbiddingLayerId', el.value);
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
                } else if (typeof jsonData.Success !== "undefined") {
                    getAllInfoForLayers();
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

function deleteLayerOfTableManageAllLayers(btn) {
    var row = btn.parentNode.parentNode;
    var tbody = row.parentNode;
    var id = row.children[0].innerHTML;

    if (id != "") {
        var formData = new FormData();
        formData.append('queryId', 'deleteLayer');
        formData.append('id', id);
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
                    } else if (typeof jsonData.Success !== "undefined") {
                        tbody.removeChild(row);
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
    } else {
        tbody.removeChild(row);
    }
}

function deleteLayerOptionRelationOfFormChangeLayerOfManagmentAllLayers(el) {
    var formData = new FormData(formTechnology);
    formData.append('queryId', 'deleteLayerOptionRelation');
    formData.append('layerId', formChangeLayerOfManagmentAllLayers_id.innerHTML);
    formData.append('option', el.value);

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
                } else if (typeof jsonData.Success !== "undefined") {
                    getAllInfoForLayers();
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

function getAllLayers(scroolId) {
    var formData = new FormData()
    var scroolIdRow = scroolId;
    formData.append('queryId', 'getAllLayers');

    tableManageAllLayers.children[1].innerHTML = "";

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
                } else if (typeof jsonData.Content !== "undefined") {
                    var tbody = tableManageAllLayers.children[1];
                    for (var key in jsonData.Content) {
                        var row = tbody.insertRow(tbody.rows.length);
                        var cellId = row.insertCell(row.length);
                        var cellLayer = row.insertCell(row.length);
                        var cellName = row.insertCell(row.length);
                        var cellRoute = row.insertCell(row.length);
                        var cellOption = row.insertCell(row.length);
                        var cellType = row.insertCell(row.length);
                        var cellAttributions = row.insertCell(row.length);
                        var cellAdditionalInfo = row.insertCell(row.length);
                        var cellButton = row.insertCell(row.length);
                        //Данные
                        cellId.innerHTML = jsonData.Content[key].Id;
                        cellLayer.innerHTML = jsonData.Content[key].Layer;
                        cellName.innerHTML = jsonData.Content[key].Name;
                        cellRoute.innerHTML = jsonData.Content[key].Route;
                        cellOption.innerHTML = jsonData.Content[key].Option;
                        cellType.innerHTML = jsonData.Content[key].Type;
                        cellAttributions.innerHTML = jsonData.Content[key].Attributions;
                        cellAdditionalInfo.innerHTML = jsonData.Content[key].AdditionalInfo;
                        //Заливка столбцов
                        checkTd(cellRoute);
                        checkTd(cellOption);
                        checkTd(cellType);
                        checkTd(cellAttributions);
                        checkTd(cellAdditionalInfo);
                        //Управление кнопками
                        createButtonsRowTableManageAllLayers(cellButton);

                        row.id = "tableManageAllLayers_row_" + jsonData.Content[key].Id;
                    }
                    tableManageAllLayers.hidden = false;
                    showRowTableAllLayers();
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

function getAllInfoForLayers() {
    initialFormChangeLayerOfManagmentAllLayers();
    if (formSearcheManagePanelAllLayersChangeLayer_id.value != "") {
        var formData = new FormData();
        formData.append('queryId', 'getAllInfoForLayers');
        formData.append('id', formSearcheManagePanelAllLayersChangeLayer_id.value);
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
                    } else if (typeof jsonData.Content !== "undefined") {
                        formChangeLayerOfManagmentAllLayers_id.innerHTML = jsonData.Content.id;
                        formChangeLayerOfManagmentAllLayers_layer.value = jsonData.Content.layer;
                        formChangeLayerOfManagmentAllLayers_name.value = jsonData.Content.name;
                        formChangeLayerOfManagmentAllLayers_type.innerHTML = jsonData.Content.type;
                        //Свойства слоя
                        switch (jsonData.Content.type) {
                            case "Forbidding" :
                                formChangeLayerOfManagmentAllLayers_rowRelationForbiddingMerging.hidden = false;
                                for (var key in jsonData.Content.layerMergingLayerForbiddingR) {
                                    createInputGroup(formChangeLayerOfManagmentAllLayers_rowRelationForbiddingMerging.children[1].children[0], jsonData.Content.layerMergingLayerForbiddingR[key].Name, jsonData.Content.layerMergingLayerForbiddingR[key].Id, "formChangeLayerOfManagmentAllLayers_rowRelationForbiddingMerging_row_id" + jsonData.Content.layerMergingLayerForbiddingR[key].Id, "deleteLayerMergingLayerForbiddingRelation_ofFormChangeLayerOfManagmentAllLayers_rowRelationForbiddingMerging(this)");
                                }
                                getFiltrForSearchMergingLayerForFormForbiddingMergingRelation();
                                break;
                            case "Merging" :
                                formChangeLayerOfManagmentAllLayers_rowAttributesMerging.hidden = false;
                                if (jsonData.Content.mergingBase == 1) {
                                    formChangeLayerOfManagmentAllLayers_mergingBase.checked = true;
                                }
                                if (jsonData.Content.mergingDummy == 1) {
                                    formChangeLayerOfManagmentAllLayers_mergingDummy.checked = true;
                                }
                                //MergingForbiddingRelation
                                for (var key in jsonData.Content.layerMergingLayerForbiddingR) {
                                    createInputGroup(formChangeLayerOfManagmentAllLayers_rowRelationMergingForbidding.children[1].children[0], jsonData.Content.layerMergingLayerForbiddingR[key].Name, jsonData.Content.layerMergingLayerForbiddingR[key].Id, "formChangeLayerOfManagmentAllLayers_rowRelationMergingForbidding_row_id" + jsonData.Content.layerMergingLayerForbiddingR[key].Id, "deleteLayerMergingLayerForbiddingRelation_ofFormChangeLayerOfManagmentAllLayers_rowRelationMergingForbidding(this)");
                                }
                                formChangeLayerOfManagmentAllLayers_rowRelationMergingForbidding.hidden = false;
                                getFiltrForSearchForbiddingLayerForFormMergingForbiddingRelation();
                                //MergingIntermdiateRelation
                                for (var key in jsonData.Content.layerIntermediateLayerMergingR) {
                                    createInputGroup(formChangeLayerOfManagmentAllLayers_rowRelationMergingIntermdiate.children[1].children[0], jsonData.Content.layerIntermediateLayerMergingR[key].Name, jsonData.Content.layerIntermediateLayerMergingR[key].Id, "formChangeLayerOfManagmentAllLayers_rowRelationMergingIntermediate_row_id" + jsonData.Content.layerIntermediateLayerMergingR[key].Id, "deleteLayerIntermediateLayerMergingRelation_ofFormChangeLayerOfManagmentAllLayers_rowRelationMergingIntermediate(this)");
                                }
                                formChangeLayerOfManagmentAllLayers_rowRelationMergingIntermdiate.hidden = false;
                                getFiltrForSearchIntermediateLayerForFormMergingIntermediateRelation();
                                break;
                            case "Intermediate" :
                                formChangeLayerOfManagmentAllLayers_rowAttributesIntermediate.hidden = false;
                                if (jsonData.Content.intermediateMark == 1) {
                                    formChangeLayerOfManagmentAllLayers_intermediateMark.checked = true;
                                }
                                if (jsonData.Content.intermediateDensity == 1) {
                                    formChangeLayerOfManagmentAllLayers_intermediateDensity.checked = true;
                                }
                                //IntermediateMergingRelation
                                for (var key in jsonData.Content.layerIntermediateLayerMergingR) {
                                    createInputGroup(formChangeLayerOfManagmentAllLayers_rowRelationIntermdiateMerging.children[1].children[0], jsonData.Content.layerIntermediateLayerMergingR[key].Name, jsonData.Content.layerIntermediateLayerMergingR[key].Id, "formChangeLayerOfManagmentAllLayers_rowRelationIntermediateMerging_row_id" + jsonData.Content.layerIntermediateLayerMergingR[key].Id, "deleteLayerIntermediateLayerMergingRelation_ofFormChangeLayerOfManagmentAllLayers_rowRelationIntermediateMerging(this)");
                                }
                                formChangeLayerOfManagmentAllLayers_rowRelationIntermdiateMerging.hidden = false;
                                getFiltrForSearchMergingLayerForFormIntermediateMergingRelation();
                                //IntermdiateMaskRelation
                                for (var key in jsonData.Content.layerMaskLayerIntermediateR) {
                                    createInputGroup(formChangeLayerOfManagmentAllLayers_rowRelationIntermdiateMask.children[1].children[0], jsonData.Content.layerMaskLayerIntermediateR[key].Name, jsonData.Content.layerMaskLayerIntermediateR[key].Id, "formChangeLayerOfManagmentAllLayers_rowRelationIntermediateMask_row_id" + jsonData.Content.layerMaskLayerIntermediateR[key].Id, "deleteLayerMaskLayerIntermediateRelation_ofFormChangeLayerOfManagmentAllLayers_rowRelationIntermediateMask(this)");
                                }
                                formChangeLayerOfManagmentAllLayers_rowRelationIntermdiateMask.hidden = false;
                                getFiltrForSearchMaskLayerForFormIntermediateMaskRelation();
                                break;
                            case "Mask" :
                                formChangeLayerOfManagmentAllLayers_rowAttributesMask.hidden = false;
                                if (jsonData.Content.maskMark == 1) {
                                    formChangeLayerOfManagmentAllLayers_maskMark.checked = true;
                                }
                                //MaskIntermdiateRelation
                                for (var key in jsonData.Content.layerMaskLayerIntermediateR) {
                                    createInputGroup(formChangeLayerOfManagmentAllLayers_rowRelationMaskIntermdiate.children[1].children[0], jsonData.Content.layerMaskLayerIntermediateR[key].Name, jsonData.Content.layerMaskLayerIntermediateR[key].Id, "formChangeLayerOfManagmentAllLayers_rowRelationMaskIntermediate_row_id" + jsonData.Content.layerMaskLayerIntermediateR[key].Id, "deleteLayerMaskLayerIntermediateRelation_ofFormChangeLayerOfManagmentAllLayers_rowRelationMaskIntermediate(this)");
                                }
                                formChangeLayerOfManagmentAllLayers_rowRelationMaskIntermdiate.hidden = false;
                                getFiltrForSearchIntermediatekLayerForFormMaskIntermediateRelation();
                                break;
                        }
                        //Маршруты
                        for (var key in jsonData.Content.route) {
                            createInputGroup(formChangeLayerOfManagmentAllLayers_rowRoutes.children[1].children[0], jsonData.Content.route[key].Name, jsonData.Content.route[key].Id, "formChangeLayerOfManagmentAllLayers_routes_id_" + jsonData.Content.route[key].Id, "deleteLayerBaseRouteRelationOfFormChangeLayerOfManagmentAllLayers(this)");
                        }
                        //-Список технологий для добавления нового маршрута
                        createEmptyOptionForSelect(formChangeLayerOfManagmentAllLayers_routesSelectTechnology, "", "Технология...");
                        for (var key in jsonData.Content.routeTechnologyList) {
                            appendOpt(formChangeLayerOfManagmentAllLayers_routesSelectTechnology, jsonData.Content.routeTechnologyList[key].Id, jsonData.Content.routeTechnologyList[key].Name);
                        }
                        //-Список маршрутов для добавления нового маршрута
                        createEmptyOptionForSelect(formChangeLayerOfManagmentAllLayers_routesSelectRoute, "", "Маршрут...");
                        for (var key in jsonData.Content.routeList) {
                            appendOpt(formChangeLayerOfManagmentAllLayers_routesSelectRoute, jsonData.Content.routeList[key].Id, jsonData.Content.routeList[key].Name);
                        }
                        //Существующие связи по опциям
                        for (var key in jsonData.Content.option) {
                            createInputGroup(formChangeLayerOfManagmentAllLayers_rowOptions.children[1].children[0], jsonData.Content.option[key].Name, jsonData.Content.option[key].Id, "formChangeLayerOfManagmentAllLayers_options_id_" + jsonData.Content.option[key].Id, "deleteLayerOptionRelationOfFormChangeLayerOfManagmentAllLayers(this)");
                        }                        
                        //-Список опций
                        createEmptyOptionForSelect(formChangeLayerOfManagmentAllLayers_optionsSelectOption, "", "Опция...");
                        for (var key in jsonData.Content.optionList) {
                            appendOpt(formChangeLayerOfManagmentAllLayers_optionsSelectOption, jsonData.Content.optionList[key].Id, jsonData.Content.optionList[key].Name);
                        }

                        formChangeLayerOfManagmentAllLayers.children[0].disabled = false;
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
        getAllLayers();
    }
}

function getFiltrForSearchChangeLayers(id) {
    initialFormChangeLayerOfManagmentAllLayers();
    var formData = new FormData(formSearcheManagePanelAllLayersChangeLayer);
    formData.append('queryId', 'getFiltrForSearchChangeLayers');
    if (typeof id !== "undefined") {
        formData.append('id', id);
        formData.append('name', '');
        formData.append('layer', '');
        formData.append('type', '');
        formData.append('attribute', '');
        formData.append('route', '');
    } else {
        formData.append('id', '');
    }

    formSearcheManagePanelAllLayersChangeLayer.children[0].disabled = true;
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
                } else if (typeof jsonData.type !== "undefined" && typeof jsonData.route !== "undefined" && typeof jsonData.layer !== "undefined" && typeof jsonData.name !== "undefined" && typeof jsonData.id !== "undefined" && typeof jsonData.Routes !== "undefined" && typeof jsonData.Types !== "undefined" && typeof jsonData.Layers !== "undefined" && typeof jsonData.LayersId !== "undefined" && typeof jsonData.LayersName !== "undefined") {
                    //LayerId
                    createEmptyOptionForSelect(formSearcheManagePanelAllLayersChangeLayer_id, "", "Id...");
                    for (var key in jsonData.LayersId) {
                        appendOpt(formSearcheManagePanelAllLayersChangeLayer_id, key, jsonData.LayersId[key]);
                    }
                    formSearcheManagePanelAllLayersChangeLayer_id.value = jsonData.id;
                    if (jsonData.id != "") {
                        getAllInfoForLayers();
                    }
                    //Layer
                    selectpickerRefresh("formSearcheManagePanelAllLayersChangeLayer_layer", "Слой...", jsonData.Layers, 1, jsonData.layer);                   
                    //LayerName
                    selectpickerRefresh("formSearcheManagePanelAllLayersChangeLayer_name", "Название слоя...", jsonData.LayersName, 1, jsonData.name);                   
                    //Types
                    createEmptyOptionForSelect(formSearcheManagePanelAllLayersChangeLayer_type, "", "Тип слоя...");
                    for (var key in jsonData.Types) {
                        appendOpt(formSearcheManagePanelAllLayersChangeLayer_type, key, jsonData.Types[key]);
                    }
                    formSearcheManagePanelAllLayersChangeLayer_type.value = jsonData.type;
                    //Attributes
                    createEmptyOptionForSelect(formSearcheManagePanelAllLayersChangeLayer_attribute, "", "Свойства...");
                    for (var key in jsonData.Attributes) {
                        appendOpt(formSearcheManagePanelAllLayersChangeLayer_attribute, key, jsonData.Attributes[key]);
                    }
                    formSearcheManagePanelAllLayersChangeLayer_attribute.value = jsonData.attribute;
                    //Route
                    createEmptyOptionForSelect(formSearcheManagePanelAllLayersChangeLayer_route, "", "Маршрут...");
                    for (var key in jsonData.Routes) {
                        appendOpt(formSearcheManagePanelAllLayersChangeLayer_route, key, jsonData.Routes[key]);
                    }
                    formSearcheManagePanelAllLayersChangeLayer_route.value = jsonData.route;
                    //Разблокировка формы
                    formSearcheManagePanelAllLayersChangeLayer.children[0].disabled = false;

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

function getFiltrForSearchForbiddingLayerForFormMergingForbiddingRelation() {
    var formData = new FormData();
    formData.append('queryId', 'getFiltrForSearchChangeLayers');
    formData.append('id', '');

    formData.append('layer', formChangeLayerOfManagmentAllLayers_mergingForbiddingRelation_layer.value);
    formData.append('name', formChangeLayerOfManagmentAllLayers_mergingForbiddingRelation_name.value);
    formData.append('route', formChangeLayerOfManagmentAllLayers_mergingForbiddingRelation_route.value);
    formData.append('type', 'Forbidding');
    formData.append('attribute', '');

    formChangeLayerOfManagmentAllLayers.children[0].disabled = true;
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
                } else if (typeof jsonData.Attributes !== "undefined" && typeof jsonData.attribute !== "undefined" && typeof jsonData.type !== "undefined" && typeof jsonData.route !== "undefined" && typeof jsonData.layer !== "undefined" && typeof jsonData.name !== "undefined" && typeof jsonData.id !== "undefined" && typeof jsonData.Routes !== "undefined" && typeof jsonData.Types !== "undefined" && typeof jsonData.Layers !== "undefined" && typeof jsonData.LayersId !== "undefined" && typeof jsonData.LayersName !== "undefined") {
                    //LayerId
                    createEmptyOptionForSelect(formChangeLayerOfManagmentAllLayers_mergingForbiddingRelation_id, "", "Id...");
                    for (var key in jsonData.LayersId) {
                        appendOpt(formChangeLayerOfManagmentAllLayers_mergingForbiddingRelation_id, key, jsonData.LayersId[key]);
                    }
                    formChangeLayerOfManagmentAllLayers_mergingForbiddingRelation_id.value = jsonData.id;
                    //Layer
                    selectpickerRefresh("formChangeLayerOfManagmentAllLayers_mergingForbiddingRelation_layer", "Слой...", jsonData.Layers, 1, jsonData.layer);                   
                    //LayerName
                    selectpickerRefresh("formChangeLayerOfManagmentAllLayers_mergingForbiddingRelation_name", "Название слоя...", jsonData.LayersName, 1, jsonData.name);      
                    formChangeLayerOfManagmentAllLayers_mergingForbiddingRelation_name.value = jsonData.name;
                    //Route
                    createEmptyOptionForSelect(formChangeLayerOfManagmentAllLayers_mergingForbiddingRelation_route, "", "Маршрут...");
                    for (var key in jsonData.Routes) {
                        appendOpt(formChangeLayerOfManagmentAllLayers_mergingForbiddingRelation_route, key, jsonData.Routes[key]);
                    }
                    formChangeLayerOfManagmentAllLayers_mergingForbiddingRelation_route.value = jsonData.route;
                    //Разблокировка формы
                    formChangeLayerOfManagmentAllLayers.children[0].disabled = false;
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

function getFiltrForSearchIntermediatekLayerForFormMaskIntermediateRelation() {
    var formData = new FormData();
    formData.append('queryId', 'getFiltrForSearchChangeLayers');
    formData.append('id', '');

    formData.append('layer', formChangeLayerOfManagmentAllLayers_maskIntermediateRelation_layer.value);
    formData.append('name', formChangeLayerOfManagmentAllLayers_maskIntermediateRelation_name.value);
    formData.append('route', formChangeLayerOfManagmentAllLayers_maskIntermediateRelation_route.value);
    formData.append('type', 'Intermediate');
    formData.append('attribute', formChangeLayerOfManagmentAllLayers_maskIntermediateRelation_attribute.value);

    formChangeLayerOfManagmentAllLayers.children[0].disabled = true;
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
                } else if (typeof jsonData.Attributes !== "undefined" && typeof jsonData.attribute !== "undefined" && typeof jsonData.type !== "undefined" && typeof jsonData.route !== "undefined" && typeof jsonData.layer !== "undefined" && typeof jsonData.name !== "undefined" && typeof jsonData.id !== "undefined" && typeof jsonData.Routes !== "undefined" && typeof jsonData.Types !== "undefined" && typeof jsonData.Layers !== "undefined" && typeof jsonData.LayersId !== "undefined" && typeof jsonData.LayersName !== "undefined") {
                    //LayerId
                    createEmptyOptionForSelect(formChangeLayerOfManagmentAllLayers_maskIntermediateRelation_id, "", "Id...");
                    for (var key in jsonData.LayersId) {
                        appendOpt(formChangeLayerOfManagmentAllLayers_maskIntermediateRelation_id, key, jsonData.LayersId[key]);
                    }
                    formChangeLayerOfManagmentAllLayers_maskIntermediateRelation_id.value = jsonData.id;
                    //Layer
                    selectpickerRefresh("formChangeLayerOfManagmentAllLayers_maskIntermediateRelation_layer", "Слой...", jsonData.Layers, 1, jsonData.layer);                   
                    //LayerName
                    selectpickerRefresh("formChangeLayerOfManagmentAllLayers_maskIntermediateRelation_name", "Название слоя...", jsonData.LayersName, 1, jsonData.name);                   
                    //Attributes
                    createEmptyOptionForSelect(formChangeLayerOfManagmentAllLayers_maskIntermediateRelation_attribute, "", "Свойство...");
                    for (var key in jsonData.Attributes) {
                        appendOpt(formChangeLayerOfManagmentAllLayers_maskIntermediateRelation_attribute, key, jsonData.Attributes[key]);
                    }
                    formChangeLayerOfManagmentAllLayers_maskIntermediateRelation_attribute.value = jsonData.attribute;
                    //Route
                    createEmptyOptionForSelect(formChangeLayerOfManagmentAllLayers_maskIntermediateRelation_route, "", "Маршрут...");
                    for (var key in jsonData.Routes) {
                        appendOpt(formChangeLayerOfManagmentAllLayers_maskIntermediateRelation_route, key, jsonData.Routes[key]);
                    }
                    formChangeLayerOfManagmentAllLayers_maskIntermediateRelation_route.value = jsonData.route;
                    //Разблокировка формы
                    formChangeLayerOfManagmentAllLayers.children[0].disabled = false;
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

function getFiltrForSearchIntermediateLayerForFormMergingIntermediateRelation() {
    var formData = new FormData();
    formData.append('queryId', 'getFiltrForSearchChangeLayers');
    formData.append('id', '');

    formData.append('layer', formChangeLayerOfManagmentAllLayers_mergingIntermediateRelation_layer.value);
    formData.append('name', formChangeLayerOfManagmentAllLayers_mergingIntermediateRelation_name.value);
    formData.append('route', formChangeLayerOfManagmentAllLayers_mergingIntermediateRelation_route.value);
    formData.append('type', 'Intermediate');
    formData.append('attribute', formChangeLayerOfManagmentAllLayers_mergingIntermediateRelation_attribute.value);

    formChangeLayerOfManagmentAllLayers.children[0].disabled = true;
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
                } else if (typeof jsonData.Attributes !== "undefined" && typeof jsonData.attribute !== "undefined" && typeof jsonData.type !== "undefined" && typeof jsonData.route !== "undefined" && typeof jsonData.layer !== "undefined" && typeof jsonData.name !== "undefined" && typeof jsonData.id !== "undefined" && typeof jsonData.Routes !== "undefined" && typeof jsonData.Types !== "undefined" && typeof jsonData.Layers !== "undefined" && typeof jsonData.LayersId !== "undefined" && typeof jsonData.LayersName !== "undefined") {
                    //LayerId
                    createEmptyOptionForSelect(formChangeLayerOfManagmentAllLayers_mergingIntermediateRelation_id, "", "Id...");
                    for (var key in jsonData.LayersId) {
                        appendOpt(formChangeLayerOfManagmentAllLayers_mergingIntermediateRelation_id, key, jsonData.LayersId[key]);
                    }
                    formChangeLayerOfManagmentAllLayers_mergingIntermediateRelation_id.value = jsonData.id;
                    //Layer
                    selectpickerRefresh("formChangeLayerOfManagmentAllLayers_mergingIntermediateRelation_layer", "Слой...", jsonData.Layers, 1, jsonData.layer);                   
                    //LayerName
                    selectpickerRefresh("formChangeLayerOfManagmentAllLayers_mergingIntermediateRelation_name", "Название слоя...", jsonData.LayersName, 1, jsonData.name);                                       
                    //Attributes
                    createEmptyOptionForSelect(formChangeLayerOfManagmentAllLayers_mergingIntermediateRelation_attribute, "", "Свойство...");
                    for (var key in jsonData.Attributes) {
                        appendOpt(formChangeLayerOfManagmentAllLayers_mergingIntermediateRelation_attribute, key, jsonData.Attributes[key]);
                    }
                    formChangeLayerOfManagmentAllLayers_mergingIntermediateRelation_attribute.value = jsonData.attribute;
                    //Route
                    createEmptyOptionForSelect(formChangeLayerOfManagmentAllLayers_mergingIntermediateRelation_route, "", "Маршрут...");
                    for (var key in jsonData.Routes) {
                        appendOpt(formChangeLayerOfManagmentAllLayers_mergingIntermediateRelation_route, key, jsonData.Routes[key]);
                    }
                    formChangeLayerOfManagmentAllLayers_mergingIntermediateRelation_route.value = jsonData.route;
                    //Разблокировка формы
                    formChangeLayerOfManagmentAllLayers.children[0].disabled = false;
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

function getFiltrForSearchMaskLayerForFormIntermediateMaskRelation() {
    var formData = new FormData();
    formData.append('queryId', 'getFiltrForSearchChangeLayers');
    formData.append('id', '');

    formData.append('layer', formChangeLayerOfManagmentAllLayers_intermediateMaskRelation_layer.value);
    formData.append('name', formChangeLayerOfManagmentAllLayers_intermediateMaskRelation_name.value);
    formData.append('route', formChangeLayerOfManagmentAllLayers_intermediateMaskRelation_route.value);
    formData.append('type', 'Mask');
    formData.append('attribute', formChangeLayerOfManagmentAllLayers_intermediateMaskRelation_attribute.value);

    formChangeLayerOfManagmentAllLayers.children[0].disabled = true;
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
                } else if (typeof jsonData.Attributes !== "undefined" && typeof jsonData.attribute !== "undefined" && typeof jsonData.type !== "undefined" && typeof jsonData.route !== "undefined" && typeof jsonData.layer !== "undefined" && typeof jsonData.name !== "undefined" && typeof jsonData.id !== "undefined" && typeof jsonData.Routes !== "undefined" && typeof jsonData.Types !== "undefined" && typeof jsonData.Layers !== "undefined" && typeof jsonData.LayersId !== "undefined" && typeof jsonData.LayersName !== "undefined") {
                    //LayerId
                    createEmptyOptionForSelect(formChangeLayerOfManagmentAllLayers_intermediateMaskRelation_id, "", "Id...");
                    for (var key in jsonData.LayersId) {
                        appendOpt(formChangeLayerOfManagmentAllLayers_intermediateMaskRelation_id, key, jsonData.LayersId[key]);
                    }
                    formChangeLayerOfManagmentAllLayers_intermediateMaskRelation_id.value = jsonData.id;
                    //Layer
                    selectpickerRefresh("formChangeLayerOfManagmentAllLayers_intermediateMaskRelation_layer", "Слой...", jsonData.Layers, 1, jsonData.layer);                   
                    //LayerName
                    selectpickerRefresh("formChangeLayerOfManagmentAllLayers_intermediateMaskRelation_name", "Название слоя...", jsonData.LayersName, 1, jsonData.name);                   
                    //Attributes
                    createEmptyOptionForSelect(formChangeLayerOfManagmentAllLayers_intermediateMaskRelation_attribute, "", "Свойство...");
                    for (var key in jsonData.Attributes) {
                        appendOpt(formChangeLayerOfManagmentAllLayers_intermediateMaskRelation_attribute, key, jsonData.Attributes[key]);
                    }
                    formChangeLayerOfManagmentAllLayers_intermediateMaskRelation_attribute.value = jsonData.attribute;
                    //Route
                    createEmptyOptionForSelect(formChangeLayerOfManagmentAllLayers_intermediateMaskRelation_route, "", "Маршрут...");
                    for (var key in jsonData.Routes) {
                        appendOpt(formChangeLayerOfManagmentAllLayers_intermediateMaskRelation_route, key, jsonData.Routes[key]);
                    }
                    formChangeLayerOfManagmentAllLayers_intermediateMaskRelation_route.value = jsonData.route;
                    //Разблокировка формы
                    formChangeLayerOfManagmentAllLayers.children[0].disabled = false;
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

function getFiltrForSearchMergingLayerForFormForbiddingMergingRelation() {
    var formData = new FormData();
    formData.append('queryId', 'getFiltrForSearchChangeLayers');
    formData.append('id', '');

    formData.append('layer', formChangeLayerOfManagmentAllLayers_forbiddingMergingRelation_layer.value);
    formData.append('name', formChangeLayerOfManagmentAllLayers_forbiddingMergingRelation_name.value);
    formData.append('route', formChangeLayerOfManagmentAllLayers_forbiddingMergingRelation_route.value);
    formData.append('type', 'Merging');
    formData.append('attribute', formChangeLayerOfManagmentAllLayers_forbiddingMergingRelation_attribute.value);

    formChangeLayerOfManagmentAllLayers.children[0].disabled = true;
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
                } else if (typeof jsonData.Attributes !== "undefined" && typeof jsonData.attribute !== "undefined" && typeof jsonData.type !== "undefined" && typeof jsonData.route !== "undefined" && typeof jsonData.layer !== "undefined" && typeof jsonData.name !== "undefined" && typeof jsonData.id !== "undefined" && typeof jsonData.Routes !== "undefined" && typeof jsonData.Types !== "undefined" && typeof jsonData.Layers !== "undefined" && typeof jsonData.LayersId !== "undefined" && typeof jsonData.LayersName !== "undefined") {
                    //LayerId
                    createEmptyOptionForSelect(formChangeLayerOfManagmentAllLayers_forbiddingMergingRelation_id, "", "Id...");
                    for (var key in jsonData.LayersId) {
                        appendOpt(formChangeLayerOfManagmentAllLayers_forbiddingMergingRelation_id, key, jsonData.LayersId[key]);
                    }
                    formChangeLayerOfManagmentAllLayers_forbiddingMergingRelation_id.value = jsonData.id;                    
                    //Layer
                    selectpickerRefresh("formChangeLayerOfManagmentAllLayers_forbiddingMergingRelation_layer", "Слой...", jsonData.Layers, 1, jsonData.layer);                   
                    //LayerName
                    selectpickerRefresh("formChangeLayerOfManagmentAllLayers_forbiddingMergingRelation_name", "Название слоя...", jsonData.LayersName, 1, jsonData.name);
                    //Attributes
                    createEmptyOptionForSelect(formChangeLayerOfManagmentAllLayers_forbiddingMergingRelation_attribute, "", "Свойство...");
                    for (var key in jsonData.Attributes) {
                        appendOpt(formChangeLayerOfManagmentAllLayers_forbiddingMergingRelation_attribute, key, jsonData.Attributes[key]);
                    }
                    formChangeLayerOfManagmentAllLayers_forbiddingMergingRelation_attribute.value = jsonData.attribute;
                    //Route
                    createEmptyOptionForSelect(formChangeLayerOfManagmentAllLayers_forbiddingMergingRelation_route, "", "Маршрут...");
                    for (var key in jsonData.Routes) {
                        appendOpt(formChangeLayerOfManagmentAllLayers_forbiddingMergingRelation_route, key, jsonData.Routes[key]);
                    }
                    formChangeLayerOfManagmentAllLayers_forbiddingMergingRelation_route.value = jsonData.route;
                    //Разблокировка формы
                    formChangeLayerOfManagmentAllLayers.children[0].disabled = false;

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

function getFiltrForSearchMergingLayerForFormIntermediateMergingRelation() {
    var formData = new FormData();
    formData.append('queryId', 'getFiltrForSearchChangeLayers');
    formData.append('id', '');

    formData.append('layer', formChangeLayerOfManagmentAllLayers_intermediateMergingRelation_layer.value);
    formData.append('name', formChangeLayerOfManagmentAllLayers_intermediateMergingRelation_name.value);
    formData.append('route', formChangeLayerOfManagmentAllLayers_intermediateMergingRelation_route.value);
    formData.append('type', 'Merging');
    formData.append('attribute', formChangeLayerOfManagmentAllLayers_intermediateMergingRelation_attribute.value);

    formChangeLayerOfManagmentAllLayers.children[0].disabled = true;
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
                } else if (typeof jsonData.Attributes !== "undefined" && typeof jsonData.attribute !== "undefined" && typeof jsonData.type !== "undefined" && typeof jsonData.route !== "undefined" && typeof jsonData.layer !== "undefined" && typeof jsonData.name !== "undefined" && typeof jsonData.id !== "undefined" && typeof jsonData.Routes !== "undefined" && typeof jsonData.Types !== "undefined" && typeof jsonData.Layers !== "undefined" && typeof jsonData.LayersId !== "undefined" && typeof jsonData.LayersName !== "undefined") {
                    //LayerId
                    createEmptyOptionForSelect(formChangeLayerOfManagmentAllLayers_intermediateMergingRelation_id, "", "Id...");
                    for (var key in jsonData.LayersId) {
                        appendOpt(formChangeLayerOfManagmentAllLayers_intermediateMergingRelation_id, key, jsonData.LayersId[key]);
                    }
                    formChangeLayerOfManagmentAllLayers_intermediateMergingRelation_id.value = jsonData.id;
                    //Layer
                    selectpickerRefresh("formChangeLayerOfManagmentAllLayers_intermediateMergingRelation_layer", "Слой...", jsonData.Layers, 1, jsonData.layer);                   
                    //LayerName
                    selectpickerRefresh("formChangeLayerOfManagmentAllLayers_intermediateMergingRelation_name", "Название слоя...", jsonData.LayersName, 1, jsonData.name);                   
                    //Attributes
                    createEmptyOptionForSelect(formChangeLayerOfManagmentAllLayers_intermediateMergingRelation_attribute, "", "Свойство...");
                    for (var key in jsonData.Attributes) {
                        appendOpt(formChangeLayerOfManagmentAllLayers_intermediateMergingRelation_attribute, key, jsonData.Attributes[key]);
                    }
                    formChangeLayerOfManagmentAllLayers_intermediateMergingRelation_attribute.value = jsonData.attribute;
                    //Route
                    createEmptyOptionForSelect(formChangeLayerOfManagmentAllLayers_intermediateMergingRelation_route, "", "Маршрут...");
                    for (var key in jsonData.Routes) {
                        appendOpt(formChangeLayerOfManagmentAllLayers_intermediateMergingRelation_route, key, jsonData.Routes[key]);
                    }
                    formChangeLayerOfManagmentAllLayers_intermediateMergingRelation_route.value = jsonData.route;
                    //Разблокировка формы
                    formChangeLayerOfManagmentAllLayers.children[0].disabled = false;
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

function initialFormChangeLayerOfManagmentAllLayers() {
    formChangeLayerOfManagmentAllLayers.children[0].disabled = true;

    formChangeLayerOfManagmentAllLayers_id.innerHTML = "";
    formChangeLayerOfManagmentAllLayers_layer.value = "";
    formChangeLayerOfManagmentAllLayers_name.value = "";
    formChangeLayerOfManagmentAllLayers_type.innerHTML = "";

    formChangeLayerOfManagmentAllLayers_rowAttributesMerging.hidden = true;
    formChangeLayerOfManagmentAllLayers_mergingBase.checked = false;
    formChangeLayerOfManagmentAllLayers_mergingDummy.checked = false;

    formChangeLayerOfManagmentAllLayers_rowAttributesIntermediate.hidden = true;
    formChangeLayerOfManagmentAllLayers_intermediateMark.checked = false;
    formChangeLayerOfManagmentAllLayers_intermediateDensity.checked = false;

    formChangeLayerOfManagmentAllLayers_rowAttributesMask.hidden = true;
    formChangeLayerOfManagmentAllLayers_maskMark.checked = false;

    formChangeLayerOfManagmentAllLayers_rowRoutes.children[1].children[0].innerHTML = "";
    createEmptyOptionForSelect(formChangeLayerOfManagmentAllLayers_routesSelectTechnology, "", "Технология...");
    createEmptyOptionForSelect(formChangeLayerOfManagmentAllLayers_routesSelectRoute, "", "Маршрут...");
    
    formChangeLayerOfManagmentAllLayers_rowOptions.children[1].children[0].innerHTML = "";
    createEmptyOptionForSelect(formChangeLayerOfManagmentAllLayers_optionsSelectOption, "", "Опция...");

    //ForbiddingMerging
    formChangeLayerOfManagmentAllLayers_rowRelationForbiddingMerging.hidden = true;
    formChangeLayerOfManagmentAllLayers_rowRelationForbiddingMerging.children[1].children[0].innerHTML = "";
    createEmptyOptionForSelect(formChangeLayerOfManagmentAllLayers_forbiddingMergingRelation_id, "", "Id...");
    createEmptyOptionForSelect(formChangeLayerOfManagmentAllLayers_forbiddingMergingRelation_layer, "", "Слой...");
    createEmptyOptionForSelect(formChangeLayerOfManagmentAllLayers_forbiddingMergingRelation_name, "", "Название слоя...");
    createEmptyOptionForSelect(formChangeLayerOfManagmentAllLayers_forbiddingMergingRelation_attribute, "", "Свойство...");
    createEmptyOptionForSelect(formChangeLayerOfManagmentAllLayers_forbiddingMergingRelation_route, "", "Маршрут...");

    //MergingForbidding
    formChangeLayerOfManagmentAllLayers_rowRelationMergingForbidding.hidden = true;
    formChangeLayerOfManagmentAllLayers_rowRelationMergingForbidding.children[1].children[0].innerHTML = "";
    createEmptyOptionForSelect(formChangeLayerOfManagmentAllLayers_mergingForbiddingRelation_id, "", "Id...");
    createEmptyOptionForSelect(formChangeLayerOfManagmentAllLayers_mergingForbiddingRelation_layer, "", "Слой...");
    createEmptyOptionForSelect(formChangeLayerOfManagmentAllLayers_mergingForbiddingRelation_name, "", "Название слоя...");
    createEmptyOptionForSelect(formChangeLayerOfManagmentAllLayers_mergingForbiddingRelation_route, "", "Маршрут...");

    //MergingIntermdiate
    formChangeLayerOfManagmentAllLayers_rowRelationMergingIntermdiate.hidden = true;
    formChangeLayerOfManagmentAllLayers_rowRelationMergingIntermdiate.children[1].children[0].innerHTML = "";
    createEmptyOptionForSelect(formChangeLayerOfManagmentAllLayers_mergingIntermediateRelation_id, "", "Id...");
    createEmptyOptionForSelect(formChangeLayerOfManagmentAllLayers_mergingIntermediateRelation_layer, "", "Слой...");
    createEmptyOptionForSelect(formChangeLayerOfManagmentAllLayers_mergingIntermediateRelation_name, "", "Название слоя...");
    createEmptyOptionForSelect(formChangeLayerOfManagmentAllLayers_mergingIntermediateRelation_attribute, "", "Свойство...");
    createEmptyOptionForSelect(formChangeLayerOfManagmentAllLayers_mergingIntermediateRelation_route, "", "Маршрут...");

    //IntermdiateMerging
    formChangeLayerOfManagmentAllLayers_rowRelationIntermdiateMerging.hidden = true;
    formChangeLayerOfManagmentAllLayers_rowRelationIntermdiateMerging.children[1].children[0].innerHTML = "";
    createEmptyOptionForSelect(formChangeLayerOfManagmentAllLayers_intermediateMergingRelation_id, "", "Id...");
    createEmptyOptionForSelect(formChangeLayerOfManagmentAllLayers_intermediateMergingRelation_layer, "", "Слой...");
    createEmptyOptionForSelect(formChangeLayerOfManagmentAllLayers_intermediateMergingRelation_name, "", "Название слоя...");
    createEmptyOptionForSelect(formChangeLayerOfManagmentAllLayers_intermediateMergingRelation_attribute, "", "Свойство...");
    createEmptyOptionForSelect(formChangeLayerOfManagmentAllLayers_intermediateMergingRelation_route, "", "Маршрут...");

    //IntermdiateMask
    formChangeLayerOfManagmentAllLayers_rowRelationIntermdiateMask.hidden = true;
    formChangeLayerOfManagmentAllLayers_rowRelationIntermdiateMask.children[1].children[0].innerHTML = "";
    createEmptyOptionForSelect(formChangeLayerOfManagmentAllLayers_intermediateMaskRelation_id, "", "Id...");
    createEmptyOptionForSelect(formChangeLayerOfManagmentAllLayers_intermediateMaskRelation_layer, "", "Слой...");
    createEmptyOptionForSelect(formChangeLayerOfManagmentAllLayers_intermediateMaskRelation_name, "", "Название слоя...");
    createEmptyOptionForSelect(formChangeLayerOfManagmentAllLayers_intermediateMaskRelation_attribute, "", "Свойство...");
    createEmptyOptionForSelect(formChangeLayerOfManagmentAllLayers_intermediateMaskRelation_route, "", "Маршрут...");

    //MaskIntermdiate
    formChangeLayerOfManagmentAllLayers_rowRelationMaskIntermdiate.hidden = true;
    formChangeLayerOfManagmentAllLayers_rowRelationMaskIntermdiate.children[1].children[0].innerHTML = "";
    createEmptyOptionForSelect(formChangeLayerOfManagmentAllLayers_maskIntermediateRelation_id, "", "Id...");
    createEmptyOptionForSelect(formChangeLayerOfManagmentAllLayers_maskIntermediateRelation_layer, "", "Слой...");
    createEmptyOptionForSelect(formChangeLayerOfManagmentAllLayers_maskIntermediateRelation_name, "", "Название слоя...");
    createEmptyOptionForSelect(formChangeLayerOfManagmentAllLayers_maskIntermediateRelation_attribute, "", "Свойство...");
    createEmptyOptionForSelect(formChangeLayerOfManagmentAllLayers_maskIntermediateRelation_route, "", "Маршрут...");

}

function initialFormSearchLayerOfManagmentAllLayers(id) {
    //Настройка формы для поиска id слоя

    createEmptyOptionForSelect(formSearcheManagePanelAllLayersChangeLayer_id, "", "Id...");
    createEmptyOptionForSelect(formSearcheManagePanelAllLayersChangeLayer_layer, "", "Слой...");
    createEmptyOptionForSelect(formSearcheManagePanelAllLayersChangeLayer_name, "", "Название слоя...");
    createEmptyOptionForSelect(formSearcheManagePanelAllLayersChangeLayer_type, "", "Тип слоя...");
    createEmptyOptionForSelect(formSearcheManagePanelAllLayersChangeLayer_attribute, "", "Свойства...");
    createEmptyOptionForSelect(formSearcheManagePanelAllLayersChangeLayer_route, "", "Маршрут...");

    getFiltrForSearchChangeLayers("");
    initialFormChangeLayerOfManagmentAllLayers();
}

function intialFormCreateNewLayerOfManagmentAllLayers() {
    formCreateNewLayerOfManagmentAllLayers_type[0].selected = true;

    initialStateformCreateNewLayerOfManagmentAllLayers_cadDivRow();
    initialStateformCreateNewLayerOfManagmentAllLayers_intermediateDivRow();
    initialStateformCreateNewLayerOfManagmentAllLayers_maskDivRow();
}

function initialStateformCreateNewLayerOfManagmentAllLayers_cadDivRow() {
    formCreateNewLayerOfManagmentAllLayers_cadType[0].selected = true;
    formCreateNewLayerOfManagmentAllLayers_cadTypeBase.disabled = true;
    formCreateNewLayerOfManagmentAllLayers_cadTypeBase.checked = false;
    formCreateNewLayerOfManagmentAllLayers_cadTypeDummy.disabled = true;
    formCreateNewLayerOfManagmentAllLayers_cadTypeDummy.checked = false;
    formCreateNewLayerOfManagmentAllLayers_cadDivRow.hidden = true;
}

function initialStateformCreateNewLayerOfManagmentAllLayers_intermediateDivRow() {
    formCreateNewLayerOfManagmentAllLayers_intermediateMark.disabled = true;
    formCreateNewLayerOfManagmentAllLayers_intermediateMark.checked = false;
    formCreateNewLayerOfManagmentAllLayers_intermediateDensity.disabled = true;
    formCreateNewLayerOfManagmentAllLayers_intermediateDensity.checked = false;
    formCreateNewLayerOfManagmentAllLayers_intermediateDivRow.hidden = true;
}

function initialStateformCreateNewLayerOfManagmentAllLayers_maskDivRow() {
    formCreateNewLayerOfManagmentAllLayers_maskMark.disabled = true;
    formCreateNewLayerOfManagmentAllLayers_maskMark.checked = false;
    formCreateNewLayerOfManagmentAllLayers_maskDivRow.hidden = true;
}

function openDivManagePanelAllLayersChangeNewLayers(btn) {
    $('#managePanelAllLayers a[href="#divManagePanelAllLayersChangeLayer"]').tab('show');
    managePanelAllLayersChangeNewLayer.scrollIntoView();
    initialFormChangeLayerOfManagmentAllLayers();
    var row = btn.parentNode.parentNode;
    getFiltrForSearchChangeLayers(row.children[0].innerHTML);
}

function openDivManagePanelAllLayersCreateNewLayers(btn) {

    //browserType.indexOf('zilla');

    var row = btn.parentNode.parentNode;
    var layer = row.children[1].innerHTML;
    var name = row.children[2].innerHTML;
    var type = row.children[5].innerHTML;
    var attribute = row.children[6].innerHTML;

    $('#managePanelAllLayers a[href="#divManagePanelAllLayersCreateNewLayers"]').tab('show');

    intialFormCreateNewLayerOfManagmentAllLayers();

    formCreateNewLayerOfManagmentAllLayers_layer.value = layer;
    formCreateNewLayerOfManagmentAllLayers_name.value = name;

    //alert(type.indexOf("Mask"));
    switch (type) {
        case "Cad":
            formCreateNewLayerOfManagmentAllLayers_type.value = 1;
            break;
        case "Intermediate":
            formCreateNewLayerOfManagmentAllLayers_type.value = 2;
            break;
        case "Mask":
            formCreateNewLayerOfManagmentAllLayers_type.value = 3;
            break;
    }

    setTypeFormCreateNewLayerOfManagmentAllLyers_type();
    //CadLayer
    if (formCreateNewLayerOfManagmentAllLayers_type.value == 1) {

        if (attribute.indexOf("Forbidding") >= 0) {
            formCreateNewLayerOfManagmentAllLayers_cadType.value = 1;
        }
        if (attribute.indexOf("Suspended") >= 0) {
            formCreateNewLayerOfManagmentAllLayers_cadType.value = 2;
        }
        if (attribute.indexOf("Merging") >= 0) {
            formCreateNewLayerOfManagmentAllLayers_cadType.value = 3;
        }

        setTypeFormCreateNewLayerOfManagmentAllLyers_cadType();

        if (attribute.indexOf("Base") > 0) {
            formCreateNewLayerOfManagmentAllLayers_cadTypeBase.checked = true;
        }
        if (attribute.indexOf("Dummy") > 0) {
            formCreateNewLayerOfManagmentAllLayers_cadTypeDummy.checked = true;
        }
    }
    //Intermediate
    if (formCreateNewLayerOfManagmentAllLayers_type.value == 2) {
        if (attribute.indexOf("Mark") >= 0) {
            formCreateNewLayerOfManagmentAllLayers_intermediateMark.checked = true;
        }
        if (attribute.indexOf("Density") >= 0) {
            formCreateNewLayerOfManagmentAllLayers_intermediateDensity.checked = true;
        }
    }
    //Mask
    if (formCreateNewLayerOfManagmentAllLayers_type.value == 3) {
        if (attribute.indexOf("Mark") >= 0) {
            formCreateNewLayerOfManagmentAllLayers_maskMark.checked = true;
        }
    }
    managePanelAllLayersCreateNewLayer.scrollIntoView();
}

function setTypeFormCreateNewLayerOfManagmentAllLyers_cadType() {
    var select = formCreateNewLayerOfManagmentAllLayers_cadType;
    if (select.value == 3) {
        formCreateNewLayerOfManagmentAllLayers_cadTypeBase.disabled = false;
        formCreateNewLayerOfManagmentAllLayers_cadTypeDummy.disabled = false;
    } else {
        formCreateNewLayerOfManagmentAllLayers_cadTypeBase.disabled = true;
        formCreateNewLayerOfManagmentAllLayers_cadTypeBase.checked = false;
        formCreateNewLayerOfManagmentAllLayers_cadTypeDummy.disabled = true;
        formCreateNewLayerOfManagmentAllLayers_cadTypeDummy.checked = false;
    }

}

function setTypeFormCreateNewLayerOfManagmentAllLyers_type() {
    var select = formCreateNewLayerOfManagmentAllLayers_type;
    initialStateformCreateNewLayerOfManagmentAllLayers_cadDivRow();
    initialStateformCreateNewLayerOfManagmentAllLayers_intermediateDivRow();
    initialStateformCreateNewLayerOfManagmentAllLayers_maskDivRow();
    switch (select.value) {
        case "1" :
            formCreateNewLayerOfManagmentAllLayers_cadDivRow.hidden = false;
            break;
        case "2" :
            formCreateNewLayerOfManagmentAllLayers_intermediateMark.disabled = false;
            formCreateNewLayerOfManagmentAllLayers_intermediateDensity.disabled = false;
            formCreateNewLayerOfManagmentAllLayers_intermediateDivRow.hidden = false;
            break;
        case "3" :
            formCreateNewLayerOfManagmentAllLayers_maskMark.disabled = false;
            formCreateNewLayerOfManagmentAllLayers_maskDivRow.hidden = false;
            break;
    }
}

function updateFormChangeLayerOfManagmentAllLayers_routesSelectRoute() {
    formChangeLayerOfManagmentAllLayers.children[0].disabled = true;

    var formData = new FormData();
    formData.append('queryId', 'getRoutesByTechnologyForChangeLayers');
    formData.append('id', formSearcheManagePanelAllLayersChangeLayer_id.value);
    formData.append('technologyId', formChangeLayerOfManagmentAllLayers_routesSelectTechnology.value);
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
                } else if (typeof jsonData.Content !== "undefined") {
                    //-Список маршрутов для добавления нового маршрута
                    createEmptyOptionForSelect(formChangeLayerOfManagmentAllLayers_routesSelectRoute, "", "Маршрут...");
                    for (var key in jsonData.Content.routeList) {
                        appendOpt(formChangeLayerOfManagmentAllLayers_routesSelectRoute, jsonData.Content.routeList[key].Id, jsonData.Content.routeList[key].Name);
                    }
                    formChangeLayerOfManagmentAllLayers.children[0].disabled = false;
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

function updateIntermdiateDensityOfFormChangeLayerOfManagmentAllLayers() {
    if (formChangeLayerOfManagmentAllLayers_type.innerHTML != "Intermediate") {
        alertMsg("Установить флаг density можно только для intermediate слоя");
        return false;
    }

    var formData = new FormData();
    if (formChangeLayerOfManagmentAllLayers_intermediateDensity.checked) {
        var density = 1;
    } else {
        var density = 0;
    }
    formData.append('queryId', 'updateIntermdiateDensity');
    formData.append('id', formChangeLayerOfManagmentAllLayers_id.innerHTML);
    formData.append('density', density);
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
                } else if (typeof jsonData.Success !== "undefined") {
                    getAllInfoForLayers();
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

function updateIntermdiateMarkOfFormChangeLayerOfManagmentAllLayers() {
    if (formChangeLayerOfManagmentAllLayers_type.innerHTML != "Intermediate") {
        alertMsg("Установить флаг mark можно только для intermediate слоя");
        return false;
    }

    var formData = new FormData();
    if (formChangeLayerOfManagmentAllLayers_intermediateMark.checked) {
        var mark = 1;
    } else {
        var mark = 0;
    }
    formData.append('queryId', 'updateIntermdiateMark');
    formData.append('id', formChangeLayerOfManagmentAllLayers_id.innerHTML);
    formData.append('mark', mark);
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
                } else if (typeof jsonData.Success !== "undefined") {
                    getAllInfoForLayers();
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

function updateLayerOfFormChangeLayerOfManagmentAllLayers() {
    if (formChangeLayerOfManagmentAllLayers_layer.value != "") {
        var formData = new FormData();
        formData.append('queryId', 'updateLayer');
        formData.append('id', formChangeLayerOfManagmentAllLayers_id.innerHTML);
        formData.append('layer', formChangeLayerOfManagmentAllLayers_layer.value);
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
                    } else if (typeof jsonData.Success !== "undefined") {
                        getAllInfoForLayers();
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
    } else {
        alertMsg("Слой не может быть пустым");
    }
}

function updateMaskMarkOfFormChangeLayerOfManagmentAllLayers() {
    if (formChangeLayerOfManagmentAllLayers_type.innerHTML != "Mask") {
        alertMsg("Установить флаг mark можно только для mask слоя");
        return false;
    }

    var formData = new FormData();
    if (formChangeLayerOfManagmentAllLayers_maskMark.checked) {
        var mark = 1;
    } else {
        var mark = 0;
    }
    formData.append('queryId', 'updateMaskMark');
    formData.append('id', formChangeLayerOfManagmentAllLayers_id.innerHTML);
    formData.append('mark', mark);
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
                } else if (typeof jsonData.Success !== "undefined") {
                    getAllInfoForLayers();
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

function updateMergingBaseOfFormChangeLayerOfManagmentAllLayers() {
    if (formChangeLayerOfManagmentAllLayers_type.innerHTML != "Merging") {
        alertMsg("Установить флаг base можно только для merging слоя");
        return false;
    }

    var formData = new FormData();
    if (formChangeLayerOfManagmentAllLayers_mergingBase.checked) {
        var base = 1;
    } else {
        var base = 0;
    }
    formData.append('queryId', 'updateMergingBase');
    formData.append('id', formChangeLayerOfManagmentAllLayers_id.innerHTML);
    formData.append('base', base);
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
                } else if (typeof jsonData.Success !== "undefined") {
                    getAllInfoForLayers();
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

function updateMergingDummyOfFormChangeLayerOfManagmentAllLayers() {
    if (formChangeLayerOfManagmentAllLayers_type.innerHTML != "Merging") {
        alertMsg("Установить флаг dummy можно только для merging слоя");
        return false;
    }

    var formData = new FormData();
    if (formChangeLayerOfManagmentAllLayers_mergingDummy.checked) {
        var dummy = 1;
    } else {
        var dummy = 0;
    }
    formData.append('queryId', 'updateMergingDummy');
    formData.append('id', formChangeLayerOfManagmentAllLayers_id.innerHTML);
    formData.append('dummy', dummy);
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
                } else if (typeof jsonData.Success !== "undefined") {
                    getAllInfoForLayers();
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

function updateNameOfFormChangeLayerOfManagmentAllLayers() {
    if (formChangeLayerOfManagmentAllLayers_name.value != "") {
        var formData = new FormData();
        formData.append('queryId', 'updateName');
        formData.append('id', formChangeLayerOfManagmentAllLayers_id.innerHTML);
        formData.append('name', formChangeLayerOfManagmentAllLayers_name.value);
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
                    } else if (typeof jsonData.Success !== "undefined") {
                        getAllInfoForLayers();
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
    } else {
        alertMsg("Слой не может быть пустым");
    }
}



function getAllMergingLayers () {
    tableMergingLayers.children[1].innerHTML = "";
    tableMergingLayers.hidden = true;

    var formDataRoute = new FormData(formRoutes);
    if (!formDataRoute.has("route")) {
        alertMsg("Необходимо выбрать маршрут");
        return false;
    };

    var formData = new FormData();
    formData.append('queryId', 'getAllMergingLayers');
    formData.append('baseroute', formDataRoute.get('route'));

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
                } else if (typeof jsonData.Content !== "undefined") {
                    var tbody = tableMergingLayers.children[1];
                    for (var key in jsonData.Content) {
                        var row = tbody.insertRow(tbody.rows.length);
                        var cellRelationBaseRoute = row.insertCell(row.length);
                        var cellId = row.insertCell(row.length);
                        var cellLayer = row.insertCell(row.length);
                        var cellName = row.insertCell(row.length);
                        var cellType = row.insertCell(row.length);
                        var cellMark = row.insertCell(row.length);
                        var cellDensity = row.insertCell(row.length);
                        var cellLinks = row.insertCell(row.length);
                        var cellButton = row.insertCell(row.length);

                        if (jsonData.Content[key].IntermediateId != "") {
                            
                            createButtonDeleteBaseRouteLayerRelationOfStreamInOut(cellRelationBaseRoute);
                            
                            createButtonNewRowStreamInOutLayers(cellButton);
                            cellId.innerHTML = jsonData.Content[key].Id;
                            cellType.innerHTML = jsonData.Content[key].type;

                            Number(jsonData.Content[key].Base) ? $(cellType).append('<br><span class="badge badge-sm badge-info">Base</span>') : '';
                            Number(jsonData.Content[key].Dummy) ? $(cellType).append('<br><span class="badge badge-sm badge-info">Dammy</span>') : '';
                            createCheckBox(cellMark);
                            createCheckBox(cellDensity);
                            cellLinks.innerHTML = '';
                        } else {
                            cellId.innerHTML = '';
                            cellType.innerHTML = jsonData.Content[key].type;
                            Number(jsonData.Content[key].Base) ? $(cellType).append('<br><span class="badge badge-sm badge-info">Base</span>') : '';
                            Number(jsonData.Content[key].Dummy) ? $(cellType).append('<br><span class="badge badge-sm badge-info">Dammy</span>') : '';
                            createButtonNewLayerOfStreamInOut(cellButton);
                            $(cellLinks).append('<span class="badge badge-sm badge-warning">Нет</span>');
                        }
                        cellLayer.innerHTML = jsonData.Content[key].Layer;
                        cellName.innerHTML = jsonData.Content[key].Name;
                    }
                    tableMergingLayers.hidden = false;
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