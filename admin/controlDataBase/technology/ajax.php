<?php

$msg = array();

require_once './../../../config.php';
require_once './../../../auth.php';
require_once $phpLogin;




if (isset($msg["AjaxError"])) {
    echo json_encode($msg);
    exit();
}

$queryId = $_POST['queryId'];
switch ($queryId) {
    case "getOptionCombination" :
        //Получение списка опций под маршрут
        $query = ""
                . "SELECT"
                . " `BaseRoute`.Name as BaseRouteName, "
                . " `BaseRoute`.Id as BaseRouteId, "
                . " `BaseRoute`.Revision as BaseRouteRevision,"
                . " `Option`.Name as OptionName,"
                . " `Option`.Id as OptionId "
                . "FROM"
                . " `BaseRoute`"
                . " LEFT JOIN `OptionCombination_BaseRoute_R` ON `OptionCombination_BaseRoute_R`.`BaseRouteId` = `BaseRoute`.Id "
                . " LEFT JOIN `OptionCombination` ON `OptionCombination`.`Id` = `OptionCombination_BaseRoute_R`.OptionCombinationId "
                . " LEFT JOIN `OptionCombination_Option_R` ON `OptionCombination_Option_R`.`OptionCombinationId` = `OptionCombination`.`Id` "
                . " LEFT JOIN `Option` ON `Option`.Id = `OptionCombination_Option_R`.OptionId "
                . "WHERE"
                . " `BaseRoute`.Id IN (" . implode(', ', $_POST['route']) . ")";

        $result = $mysqli->query($query);
        if ($result) {
            $msg["RoutesList"] = array();
            while ($row = $result->fetch_assoc()) {
                $msg["RoutesList"][$row["BaseRouteId"]]["Name"] = $row["BaseRouteName"] . " <small>(r: " . $row['BaseRouteRevision'] . ")</small>";
                if ($row["OptionId"] == NULL) {
                    $msg["RoutesList"][$row["BaseRouteId"]]["Option"] = "";
                } else {
                    $msg["RoutesList"][$row["BaseRouteId"]]["Option"][$row["OptionId"]] = $row["OptionName"] . " <small>(id: " . $row['OptionId'] . ")</small>";
                }
            }
        } else {
            $msg["AjaxError"] = "$queryId: Ошибка получения списка опций под маршрут.";
        }
        //Получение полного списка комбинаций опций
        $query = ""
                . "SELECT"
                . " `OptionCombination`.Id,"
                . " `OptionCombination`.Name "
                . "FROM"
                . " `OptionCombination`";
        $result = $mysqli->query($query);
        if ($result) {
            $msg["OptionCombinationList"] = array();
            while ($row = $result->fetch_assoc()) {
                //Получение связей комбинаций опций и опций маршрутов
                $queryRelation = ""
                        . "SELECT"
                        . " `BaseRoute`.Id as BaseRouteId,"
                        . " `Option`.Id as OptionId,"
                        . " `Option`.Name as OptionName "
                        . "FROM"
                        . " `OptionCombination`"
                        . " LEFT JOIN `OptionCombination_BaseRoute_R` ON `OptionCombination_BaseRoute_R`.OptionCombinationId = `OptionCombination`.Id"
                        . " LEFT JOIN `BaseRoute` ON `OptionCombination_BaseRoute_R`.BaseRouteId = `BaseRoute`.Id"
                        . " LEFT JOIN `OptionCombination_Option_R` ON `OptionCombination_Option_R`.OptionCombinationId = `OptionCombination`.Id"
                        . " LEFT JOIN `Option` ON `Option`.Id = `OptionCombination_Option_R`.OptionId "
                        . "WHERE"
                        . " `OptionCombination`.Id = " . $row['Id'] . " AND"
                        . " `BaseRoute`.Id IN (" . implode(', ', $_POST['route']) . ")";
                $resultRelation = $mysqli->query($queryRelation);
                if ($resultRelation) {
                    $row["BaseRoute_Option_Relation"] = array();
                    while ($rowRelation = $resultRelation->fetch_assoc() ) {
                        $row["BaseRoute_Option_Relation"][$rowRelation["BaseRouteId"] . "_" . $rowRelation["OptionId"]] = $rowRelation["OptionName"];
                    }
                } else {
                    $msg["AjaxError"] = "$queryId: Ошибка получения списка со связью опция-базовый маршрут.";
                }

                $msg["OptionCombinationList"][] = $row;
            }
        } else {
            $msg["AjaxError"] = "$queryId: Ошибка получения списка комбинации опций.";
        }



        break;
    case "getRoute":
        $query = ""
                . "SELECT"
                . " `BaseRoute`.`Id`, "
                . " `BaseRoute`.`Name`, "
                . " `BaseRoute`.`Revision` "
                . "FROM"
                . " `BaseRoute` "
                . "WHERE"
                . " `BaseRoute`.`TechnologyId` = " . $_POST['technology'] . " "
                . "ORDER BY `Name`, `Revision`";
        $result = $mysqli->query($query);
        if ($result) {
            $msg["RouteList"] = array();
            while ($row = $result->fetch_assoc()) {
                $tmpRow["Id"] = $row["Id"];
                $tmpRow["Name"] = $row["Name"] . " <small>revision: " . $row['Revision'] . "</small>";
                $msg["RouteList"][] = $tmpRow;
            }
        } else {
            $msg['AjaxError'] = "$queryId: Ошибка в запросе.";
        }
        break;
    case "getTechnologyList":
        $query = ""
                . "SELECT"
                . " `Technology`.`Id`,"
                . " `Technology`.`Name` "
                . "FROM"
                . " `Technology` "
                . "ORDER BY `Name`";
        $result = $mysqli->query($query);
        if ($result) {
            $msg["TechnologyList"] = array();
            while ($row = $result->fetch_assoc()) {
                $msg["TechnologyList"][] = $row;
            }
        } else {
            $msg['AjaxError'] = "$queryId: Ошибка в запросе.";
        }
        break;

    default:
        $msg['AjaxError'] = "Не корректный ключ запроса.";
}

echo json_encode($msg);
?>