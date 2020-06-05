<?php

ini_set('error_reporting', 0);
ini_set('display_errors', 0);

$msg = array();
define('APP', true);

require_once './../../../config.php';
require_once './../../../auth.php';
require_once $phpLogin;

if (isset($msg["AjaxError"])) {
    echo json_encode($msg);
    exit();
}

$queryId = $_POST['queryId'];
switch ($queryId) {
    case "createForbiddingLayer" :
        $layer["id"] = "";
        $layer["layer"] = $_POST['layer'];
        $layer["name"] = $_POST['name'];
        $layer["type"] = "Forbidding";
        $layer["base"] = "";
        $layer["dummy"] = "";

        $query = "INSERT INTO"
                . " `Layer` "
                . "SET"
                . " `Layer` = '" . $_POST['layer'] . "', "
                . " `Name` = '" . $_POST['name'] . "', "
                . " `BaseRouteId` = " . $_POST['baseroute'];
        $result = $mysqli->query($query);
        if ($result) {
            $layer["id"] = $mysqli->insert_id;
        } else {
            $msg["AjaxError"] = "Ошибка при создании нового слоя.<br>" . $mysqli->error . "<br>$query";
            break;
        }

        $query = "INSERT INTO"
                . " `Layer::Cad` "
                . "SET"
                . " `LayerId` = " . $layer['id'];
        $result = $mysqli->query($query);
        if ($result) {
            $cadLayerId = $mysqli->insert_id;
        } else {
            $msg["AjaxError"] = "Ошибка при создании нового cad слоя.<br>" . $mysqli->error . "<br>$query";
            break;
        }

        $query = "INSERT INTO"
                . " `Layer::Forbidding` "
                . "SET"
                . " `CadLayerId` = " . $cadLayerId;
        $result = $mysqli->query($query);
        if ($result) {
            
        } else {
            $msg["AjaxError"] = "Ошибка при создании нового cad слоя.<br>" . $mysqli->error . "<br>$query";
            break;
        }
        $msg["Layer"] = $layer;
        if (!isset($_POST["baseroute"])) {
            break;
        }
        // $query = "INSERT INTO"
        //         . " `Layer_BaseRoute_R` "
        //         . "SET"
        //         . " `LayerId` = " . $layer['id'] . ", "
        //         . " `BaseRouteId` = " . $_POST['baseroute'];
        // $result = $mysqli->query($query);
        // if ($result) {
            
        // } else {
        //     $msg["AjaxError"] = "Ошибка при создании связи: слой - базовый маршрут.<br>" . $mysqli->error . "<br>$query";
        // }
        break;
    case "createIntermediateLayer" :
        $layer["id"] = "";
        $layer["layer"] = $_POST['layer'];
        $layer["name"] = $_POST['name'];
        $layer["type"] = "Intermediate";
        $layer["mark"] = "";
        $layer["density"] = "";

        $query = "INSERT INTO"
                . " `Layer` "
                . "SET"
                . " `Layer` = '" . $_POST['layer'] . "', "
                . " `Name` = '" . $_POST['name'] . "'";
        $result = $mysqli->query($query);
        if ($result) {
            $layer["id"] = $mysqli->insert_id;
        } else {
            $msg["AjaxError"] = "Ошибка при создании нового слоя.<br>" . $mysqli->error . "<br>$query";
            break;
        }

        if (isset($_POST["mark"])) {
            $layer["mark"] = "+";
            $mark = 1;
        } else {
            $mark = 0;
        }

        if (isset($_POST["density"])) {
            $layer["density"] = "+";
            $density = 1;
        } else {
            $density = 0;
        }

        $query = "INSERT INTO"
                . " `Layer::Intermediate` "
                . "SET"
                . " `LayerId` = " . $layer['id'] . ", "
                . " `Mark`=" . $mark . ", "
                . " `Density`=" . $density . "";

        $result = $mysqli->query($query);
        if ($result) {
            $cadLayerId = $mysqli->insert_id;
        } else {
            $msg["AjaxError"] = "Ошибка при создании нового intermediate слоя.<br>" . $mysqli->error . "<br>$query";
            break;
        }

        $msg["Layer"] = $layer;
        if (!isset($_POST["baseroute"])) {
            break;
        }
        $query = "INSERT INTO"
                . " `Layer_BaseRoute_R` "
                . "SET"
                . " `LayerId` = " . $layer['id'] . ", "
                . " `BaseRouteId` = " . $_POST['baseroute'];
        $result = $mysqli->query($query);
        if ($result) {
            
        } else {
            $msg["AjaxError"] = "Ошибка при создании связи: слой - базовый маршрут.<br>" . $mysqli->error . "<br>$query";
        }
        break;
    case "createLayerBaseRouteRelation" :

        $query = "INSERT INTO"
                . " `Layer_BaseRoute_R` "
                . "SET"
                . " `LayerId` = " . $_POST['layerId'] . ", "
                . " `BaseRouteId` = " . $_POST['baseroute'];
        $result = $mysqli->query($query);
        if ($result) {
            $msg["Success"] = 1;
        } else {
            $msg["AjaxError"] = "Ошибка при создании связи: слой - базовый маршрут.<br>" . $mysqli->error . "<br>$query";
        }
        break;
    case "createLayerIntermediateLayerMergingRelation" :
        //IntermediateId
        $query = ""
                . "SELECT"
                . " `Layer::Intermediate`.Id "
                . "FROM"
                . " `Layer`"
                . " LEFT JOIN `Layer::Intermediate` ON `Layer::Intermediate`.LayerId = `Layer`.Id "
                . "WHERE"
                . " `Layer`.Id = " . $_POST["intermediateLayerId"];
        $result = $mysqli->query($query);
        if ($result) {
            $row = $result->fetch_assoc();
            $intermediateLayerId = $row["Id"];
        } else {
            $msg['AjaxError'] = "$queryId: Ошибка при получении intermediateLayerId.<br>" . $mysqli->error . "<br>" . $query;
            break;
        }
        //MergingId
        $query = ""
                . "SELECT"
                . " `Layer::Merging`.Id "
                . "FROM"
                . " `Layer`"
                . " LEFT JOIN `Layer::Cad` ON `Layer::Cad`.LayerId = `Layer`.Id"
                . " LEFT JOIN `Layer::Merging` ON `Layer::Merging`.CadLayerId = `Layer::Cad`.Id "
                . "WHERE"
                . " `Layer`.Id = " . $_POST["mergingLayerId"];
        $result = $mysqli->query($query);
        if ($result) {
            $row = $result->fetch_assoc();
            $mergingLayerId = $row["Id"];
        } else {
            $msg['AjaxError'] = "$queryId: Ошибка при получении mergingLayerId.<br>" . $mysqli->error . "<br>" . $query;
            break;
        }
        //Создаем связь
        $query = ""
                . "INSERT INTO"
                . " `Layer::Intermediate_Layer::Merging_R` "
                . "SET"
                . " `IntermediateLayerId` = $intermediateLayerId,"
                . " `MergingLayerId` = $mergingLayerId";
        $result = $mysqli->query($query);
        if ($result) {
            $msg["Success"] = 1;
        } else {
            $msg['AjaxError'] = "$queryId: Ошибка в запросе.<br>" . $mysqli->error . "<br>" . $query;
        }
        break;
    case "createLayerMaskLayerIntermediateRelation":
        //IntermediateId
        $query = ""
                . "SELECT"
                . " `Layer::Intermediate`.Id "
                . "FROM"
                . " `Layer`"
                . " LEFT JOIN `Layer::Intermediate` ON `Layer::Intermediate`.LayerId = `Layer`.Id "
                . "WHERE"
                . " `Layer`.Id = " . $_POST["intermediateLayerId"];
        $result = $mysqli->query($query);
        if ($result) {
            $row = $result->fetch_assoc();
            $intermediateLayerId = $row["Id"];
        } else {
            $msg['AjaxError'] = "$queryId: Ошибка при получении intermediateLayerId.<br>" . $mysqli->error . "<br>" . $query;
            break;
        }
        //MaskgId
        $query = ""
                . "SELECT"
                . " `Layer::Mask`.Id "
                . "FROM"
                . " `Layer`"
                . " LEFT JOIN `Layer::Mask` ON `Layer::Mask`.LayerId = `Layer`.Id "
                . "WHERE"
                . " `Layer`.Id = " . $_POST["maskLayerId"];
        $result = $mysqli->query($query);
        if ($result) {
            $row = $result->fetch_assoc();
            $maskLayerId = $row["Id"];
        } else {
            $msg['AjaxError'] = "$queryId: Ошибка при получении mergingLayerId.<br>" . $mysqli->error . "<br>" . $query;
            break;
        }
        //Создаем связь
        $query = ""
                . "INSERT INTO"
                . " `Layer::Mask_Layer::Intermediate_R` "
                . "SET"
                . " `IntermediateLayerId` = $intermediateLayerId,"
                . " `MaskLayerId` = $maskLayerId";
        $result = $mysqli->query($query);
        if ($result) {
            $msg["Success"] = 1;
        } else {
            $msg['AjaxError'] = "$queryId: Ошибка в запросе.<br>" . $mysqli->error . "<br>" . $query;
        }
        break;
    case "createLayerMergingLayerForbiddingRelation" :
        //ForbiddingId
        $query = ""
                . "SELECT"
                . " `Layer::Forbidding`.Id "
                . "FROM"
                . " `Layer`"
                . " LEFT JOIN `Layer::Cad` ON `Layer::Cad`.LayerId = `Layer`.Id"
                . " LEFT JOIN `Layer::Forbidding` ON `Layer::Forbidding`.CadLayerId = `Layer::Cad`.Id "
                . "WHERE"
                . " `Layer`.Id = " . $_POST["forbiddingLayerId"];
        $result = $mysqli->query($query);
        if ($result) {
            $row = $result->fetch_assoc();
            $forbiddingLayerId = $row["Id"];
        } else {
            $msg['AjaxError'] = "$queryId: Ошибка при получении forbiddingLayerId.<br>" . $mysqli->error . "<br>" . $query;
            break;
        }
        //MergingId
        $query = ""
                . "SELECT"
                . " `Layer::Merging`.Id "
                . "FROM"
                . " `Layer`"
                . " LEFT JOIN `Layer::Cad` ON `Layer::Cad`.LayerId = `Layer`.Id"
                . " LEFT JOIN `Layer::Merging` ON `Layer::Merging`.CadLayerId = `Layer::Cad`.Id "
                . "WHERE"
                . " `Layer`.Id = " . $_POST["mergingLayerId"];
        $result = $mysqli->query($query);
        if ($result) {
            $row = $result->fetch_assoc();
            $mergingLayerId = $row["Id"];
        } else {
            $msg['AjaxError'] = "$queryId: Ошибка при получении mergingLayerId.<br>" . $mysqli->error . "<br>" . $query;
            break;
        }
        //Создаем связь
        $query = ""
                . "INSERT INTO"
                . " `Layer::Merging_Layer::Forbidding_R` "
                . "SET"
                . " `ForbiddingLayerId` = $forbiddingLayerId,"
                . " `MergingLayerId` = $mergingLayerId";
        $result = $mysqli->query($query);
        if ($result) {
            $msg["Success"] = 1;
        } else {
            $msg['AjaxError'] = "$queryId: Ошибка в запросе.<br>" . $mysqli->error . "<br>" . $query;
        }
        break;
    case "createLayerOptionRelation":
        $query = "INSERT INTO"
                . " `Layer_Option_R` "
                . "SET"
                . " `LayerId` = " . $_POST['layerId'] . ", "
                . " `OptionId` = " . $_POST['option'];
        $result = $mysqli->query($query);
        if ($result) {
            $msg["Success"] = 1;
        } else {
            $msg["AjaxError"] = "Ошибка при создании связи: слой - опция.<br>" . $mysqli->error . "<br>$query";
        }
        break;
    case "createMaskLayer" :
        $layer["id"] = "";
        $layer["layer"] = $_POST['layer'];
        $layer["name"] = $_POST['name'];
        $layer["type"] = "Mask";
        $layer["mark"] = "";

        $query = "INSERT INTO"
                . " `Layer` "
                . "SET"
                . " `Layer` = '" . $_POST['layer'] . "', "
                . " `Name` = '" . $_POST['name'] . "'";
        $result = $mysqli->query($query);
        if ($result) {
            $layer["id"] = $mysqli->insert_id;
        } else {
            $msg["AjaxError"] = "Ошибка при создании нового слоя.<br>" . $mysqli->error . "<br>$query";
            break;
        }

        if (isset($_POST["mark"])) {
            $layer["mark"] = "+";
            $mark = 1;
        } else {
            $mark = 0;
        }

        $query = "INSERT INTO"
                . " `Layer::Mask` "
                . "SET"
                . " `LayerId` = " . $layer['id'] . ", "
                . " `Mark`=" . $mark;

        $result = $mysqli->query($query);
        if ($result) {
            $cadLayerId = $mysqli->insert_id;
        } else {
            $msg["AjaxError"] = "Ошибка при создании нового mask слоя.<br>" . $mysqli->error . "<br>$query";
            break;
        }

        $msg["Layer"] = $layer;
        if (!isset($_POST["baseroute"])) {
            break;
        }
        $query = "INSERT INTO"
                . " `Layer_BaseRoute_R` "
                . "SET"
                . " `LayerId` = " . $layer['id'] . ", "
                . " `BaseRouteId` = " . $_POST['baseroute'];
        $result = $mysqli->query($query);
        if ($result) {
            
        } else {
            $msg["AjaxError"] = "Ошибка при создании связи: слой - базовый маршрут.<br>" . $mysqli->error . "<br>$query";
        }
        break;
    case "createMergingLayer" :
        $layer["id"] = "";
        $layer["layer"] = $_POST['layer'];
        $layer["name"] = $_POST['name'];
        $layer["type"] = "Merging";

        if (isset($_POST["base"])) {
            $base = 1;
            $layer["base"] = "+";
        } else {
            $base = 0;
            $layer["base"] = "";
        }
        if (isset($_POST["dummy"])) {
            $dummy = 1;
            $layer["dummy"] = "+";
        } else {
            $dummy = 0;
            $layer["dummy"] = "";
        }

        $query = "INSERT INTO"
                . " `Layer` "
                . "SET"
                . " `Layer` = '" . $_POST['layer'] . "', "
                . " `Name` = '" . $_POST['name'] . "', "
                . " `BaseRouteId` = " . $_POST['baseroute'];
        $result = $mysqli->query($query);
        if ($result) {
            $layer["id"] = $mysqli->insert_id;
        } else {
            $msg["AjaxError"] = "Ошибка при создании нового слоя.<br>" . $mysqli->error . "<br>$query";
            break;
        }

        $query = "INSERT INTO"
                . " `Layer::Cad` "
                . "SET"
                . " `LayerId` = " . $layer['id'];
        $result = $mysqli->query($query);
        if ($result) {
            $cadLayerId = $mysqli->insert_id;
        } else {
            $msg["AjaxError"] = "Ошибка при создании нового cad слоя.<br>" . $mysqli->error . "<br>$query";
            break;
        }

        $query = "INSERT INTO"
                . " `Layer::Merging` "
                . "SET"
                . " `CadLayerId` = " . $cadLayerId . ","
                . " `Base` =" . $base . ","
                . " `Dummy` =" . $dummy;

        $result = $mysqli->query($query);
        if ($result) {
            
        } else {
            $msg["AjaxError"] = "Ошибка при создании нового suspended слоя.<br>" . $mysqli->error . "<br>$query";
            break;
        }
        $msg["Layer"] = $layer;
        if (!isset($_POST["baseroute"])) {
            break;
        }
        // $query = "INSERT INTO"
        //         . " `Layer_BaseRoute_R` "
        //         . "SET"
        //         . " `LayerId` = " . $layer['id'] . ", "
        //         . " `BaseRouteId` = " . $_POST['baseroute'];
        // $result = $mysqli->query($query);
        // if ($result) {
            
        // } else {
        //     $msg["AjaxError"] = "Ошибка при создании связи: слой - базовый маршрут.<br>" . $mysqli->error . "<br>$query";
        // }

        break;
    case "createSuspendedLayer":
        $layer["id"] = "";
        $layer["layer"] = $_POST['layer'];
        $layer["name"] = $_POST['name'];
        $layer["type"] = "Suspended";
        $layer["base"] = "";
        $layer["dummy"] = "";

        $query = "INSERT INTO"
                . " `Layer` "
                . "SET"
                . " `Layer` = '" . $_POST['layer'] . "', "
                . " `Name` = '" . $_POST['name'] . "', "
                . " `BaseRouteId` = " . $_POST['baseroute'];
        $result = $mysqli->query($query);
        if ($result) {
            $layer["id"] = $mysqli->insert_id;
        } else {
            $msg["AjaxError"] = "Ошибка при создании нового слоя.<br>" . $mysqli->error . "<br>$query";
            break;
        }

        $query = "INSERT INTO"
                . " `Layer::Cad` "
                . "SET"
                . " `LayerId` = " . $layer['id'];
        $result = $mysqli->query($query);
        if ($result) {
            $cadLayerId = $mysqli->insert_id;
        } else {
            $msg["AjaxError"] = "Ошибка при создании нового cad слоя.<br>" . $mysqli->error . "<br>$query";
            break;
        }

        $query = "INSERT INTO"
                . " `Layer::Suspended` "
                . "SET"
                . " `CadLayerId` = " . $cadLayerId;
        $result = $mysqli->query($query);
        if ($result) {
            
        } else {
            $msg["AjaxError"] = "Ошибка при создании нового suspended слоя.<br>" . $mysqli->error . "<br>$query";
            break;
        }
        $msg["Layer"] = $layer;
        if (!isset($_POST["baseroute"])) {
            break;
        }
        // $query = "INSERT INTO"
        //         . " `Layer_BaseRoute_R` "
        //         . "SET"
        //         . " `LayerId` = " . $layer['id'] . ", "
        //         . " `BaseRouteId` = " . $_POST['baseroute'];
        // $result = $mysqli->query($query);
        // if ($result) {
            
        // } else {
        //     $msg["AjaxError"] = "Ошибка при создании связи: слой - базовый маршрут.<br>" . $mysqli->error . "<br>$query";
        // }
        break;
    case "deleteLayer" :
        $query = ""
                . "DELETE FROM"
                . " `Layer` "
                . "WHERE"
                . " `Layer`.`Id` = " . $_POST["id"];
        $result = $mysqli->query($query);
        if ($result) {
            $msg["Success"] = 1;
        } else {
            $msg["AjaxError"] = "Ошибка при удалении слоя.<br>" . $mysqli->error . "<br>$query";
        }
        break;
    case "deleteLayerBaseRouteRelation" :
        $query = "DELETE FROM"
                . " `Layer` "
                . "WHERE"
                . " `Id` = " . $_POST['layerId'] . " AND "
                . " `BaseRouteId` = " . $_POST['baseroute'];
        $result = $mysqli->query($query);
        if ($result) {
            $msg["Success"] = 1;
        } else {
            $msg["AjaxError"] = "Ошибка при удалении связи: слой - базовый маршрут.<br>" . $mysqli->error . "<br>$query";
        }
        break;
    case "deleteLayerIntermediateLayerMergingRelation":
        //IntermediateId
        $query = ""
                . "SELECT"
                . " `Layer::Intermediate`.Id "
                . "FROM"
                . " `Layer`"
                . " LEFT JOIN `Layer::Intermediate` ON `Layer::Intermediate`.LayerId = `Layer`.Id "
                . "WHERE"
                . " `Layer`.Id = " . $_POST["intermediateLayerId"];
        $result = $mysqli->query($query);
        if ($result) {
            $row = $result->fetch_assoc();
            $intermediateLayerId = $row["Id"];
        } else {
            $msg['AjaxError'] = "$queryId: Ошибка при получении intermediateLayerId.<br>" . $mysqli->error . "<br>" . $query;
            break;
        }
        //MergingId
        $query = ""
                . "SELECT"
                . " `Layer::Merging`.Id "
                . "FROM"
                . " `Layer`"
                . " LEFT JOIN `Layer::Cad` ON `Layer::Cad`.LayerId = `Layer`.Id"
                . " LEFT JOIN `Layer::Merging` ON `Layer::Merging`.CadLayerId = `Layer::Cad`.Id "
                . "WHERE"
                . " `Layer`.Id = " . $_POST["mergingLayerId"];
        $result = $mysqli->query($query);
        if ($result) {
            $row = $result->fetch_assoc();
            $mergingLayerId = $row["Id"];
        } else {
            $msg['AjaxError'] = "$queryId: Ошибка при получении mergingLayerId.<br>" . $mysqli->error . "<br>" . $query;
            break;
        }
        //Создаем связь
        $query = ""
                . "DELETE FROM"
                . " `Layer::Intermediate_Layer::Merging_R` "
                . "WHERE"
                . " `IntermediateLayerId` = $intermediateLayerId AND "
                . " `MergingLayerId` = $mergingLayerId";
        $result = $mysqli->query($query);
        if ($result) {
            $msg["Success"] = 1;
        } else {
            $msg['AjaxError'] = "$queryId: Ошибка в запросе.<br>" . $mysqli->error . "<br>" . $query;
        }
        break;
    case "deleteLayerMaskLayerIntermediateRelation":
        //IntermediateId
        $query = ""
                . "SELECT"
                . " `Layer::Intermediate`.Id "
                . "FROM"
                . " `Layer`"
                . " LEFT JOIN `Layer::Intermediate` ON `Layer::Intermediate`.LayerId = `Layer`.Id "
                . "WHERE"
                . " `Layer`.Id = " . $_POST["intermediateLayerId"];
        $result = $mysqli->query($query);
        if ($result) {
            $row = $result->fetch_assoc();
            $intermediateLayerId = $row["Id"];
        } else {
            $msg['AjaxError'] = "$queryId: Ошибка при получении intermediateLayerId.<br>" . $mysqli->error . "<br>" . $query;
            break;
        }
        //MaskgId
        $query = ""
                . "SELECT"
                . " `Layer::Mask`.Id "
                . "FROM"
                . " `Layer`"
                . " LEFT JOIN `Layer::Mask` ON `Layer::Mask`.LayerId = `Layer`.Id "
                . "WHERE"
                . " `Layer`.Id = " . $_POST["maskLayerId"];
        $result = $mysqli->query($query);
        if ($result) {
            $row = $result->fetch_assoc();
            $maskLayerId = $row["Id"];
        } else {
            $msg['AjaxError'] = "$queryId: Ошибка при получении mergingLayerId.<br>" . $mysqli->error . "<br>" . $query;
            break;
        }
        //Удаляем связь
        $query = ""
                . "DELETE FROM"
                . " `Layer::Mask_Layer::Intermediate_R` "
                . "WHERE"
                . " `IntermediateLayerId` = $intermediateLayerId AND "
                . " `MaskLayerId` = $maskLayerId";
        $result = $mysqli->query($query);
        if ($result) {
            $msg["Success"] = 1;
        } else {
            $msg['AjaxError'] = "$queryId: Ошибка в запросе.<br>" . $mysqli->error . "<br>" . $query;
        }
        break;
    case "deleteLayerMergingLayerForbiddingRelation" :
        //ForbiddingId
        $query = ""
                . "SELECT"
                . " `Layer::Forbidding`.Id "
                . "FROM"
                . " `Layer`"
                . " LEFT JOIN `Layer::Cad` ON `Layer::Cad`.LayerId = `Layer`.Id"
                . " LEFT JOIN `Layer::Forbidding` ON `Layer::Forbidding`.CadLayerId = `Layer::Cad`.Id "
                . "WHERE"
                . " `Layer`.Id = " . $_POST["forbiddingLayerId"];
        $result = $mysqli->query($query);
        if ($result) {
            $row = $result->fetch_assoc();
            $forbiddingLayerId = $row["Id"];
        } else {
            $msg['AjaxError'] = "$queryId: Ошибка при получении forbiddingLayerId.<br>" . $mysqli->error . "<br>" . $query;
            break;
        }
        //MergingId
        $query = ""
                . "SELECT"
                . " `Layer::Merging`.Id "
                . "FROM"
                . " `Layer`"
                . " LEFT JOIN `Layer::Cad` ON `Layer::Cad`.LayerId = `Layer`.Id"
                . " LEFT JOIN `Layer::Merging` ON `Layer::Merging`.CadLayerId = `Layer::Cad`.Id "
                . "WHERE"
                . " `Layer`.Id = " . $_POST["mergingLayerId"];
        $result = $mysqli->query($query);
        if ($result) {
            $row = $result->fetch_assoc();
            $mergingLayerId = $row["Id"];
        } else {
            $msg['AjaxError'] = "$queryId: Ошибка при получении mergingLayerId.<br>" . $mysqli->error . "<br>" . $query;
            break;
        }
        //Удаляем связь
        $query = ""
                . "DELETE FROM"
                . " `Layer::Merging_Layer::Forbidding_R` "
                . "WHERE "
                . " `ForbiddingLayerId` = $forbiddingLayerId AND "
                . " `MergingLayerId` = $mergingLayerId";
        $result = $mysqli->query($query);
        if ($result) {
            $msg["Success"] = 1;
        } else {
            $msg['AjaxError'] = "$queryId: Ошибка в запросе.<br>" . $mysqli->error . "<br>" . $query;
        }
        break;
    case "deleteLayerOptionRelation":
        $query = "DELETE FROM"
                . " `Layer_Option_R` "
                . "WHERE"
                . " `LayerId` = " . $_POST['layerId'] . " AND "
                . " `OptionId` = " . $_POST['option'];
        $result = $mysqli->query($query);
        if ($result) {
            $msg["Success"] = 1;
        } else {
            $msg["AjaxError"] = "Ошибка при удалении связи: слой - опция.<br>" . $mysqli->error . "<br>$query";
        }
        break;
    case "getAllInfoForLayers":
        //1. Определение данных слоя и его тип
        $query = ""
                . "SELECT"
                . " `Layer`.Id, "
                . " `Layer`.Layer, "
                . " `Layer`.Name, "
                . " `Layer::Intermediate`.Id as IntermediateLayerId,	"
                . " `Layer::Mask`.Id as MaskLayerId, "
                . " `Layer::Forbidding`.Id as ForbiddingLayerId, "
                . " `Layer::Suspended`.Id as SuspendedLayerId, "
                . " `Layer::Merging`.Id as MergingLayerId, "
                . " `Layer::Merging`.Base as MergingLayerBase, "
                . " `Layer::Merging`.Dummy as MergingLayerDummy, "
                . " `Layer::Intermediate`.Mark as IntermediateLayerMark,	"
                . " `Layer::Intermediate`.Density as IntermediateLayerDensity, "
                . " `Layer::Mask`.Mark as MaskLayerMark "
                . "FROM"
                . " `Layer` "
                . " LEFT JOIN `Layer::Cad` ON `Layer::Cad`.LayerId = `Layer`.Id"
                . " LEFT JOIN `Layer::Intermediate` ON `Layer::Intermediate`.LayerId = `Layer`.Id"
                . " LEFT JOIN `Layer::Mask` ON `Layer::Mask`.LayerId = `Layer`.Id "
                . " LEFT JOIN `Layer::Forbidding` ON `Layer::Forbidding`.CadLayerId = `Layer::Cad`.Id "
                . " LEFT JOIN `Layer::Suspended` ON `Layer::Suspended`.CadLayerId = `Layer::Cad`.Id "
                . " LEFT JOIN `Layer::Merging` ON `Layer::Merging`.CadLayerId = `Layer::Cad`.Id "
                . "WHERE"
                . " `Layer`.Id = " . $_POST['id'];
        $result = $mysqli->query($query);
        if ($result) {
            $row = $result->fetch_assoc();
            $msg["Content"]["id"] = $row["Id"];
            $msg["Content"]["layer"] = $row["Layer"];
            $msg["Content"]["name"] = $row["Name"];
            $msg["Content"]["type"] = "NONE";

            $countCheckLayersType = 5;
            //Forbidding
            if ($row["ForbiddingLayerId"] == NULL) {
                $countCheckLayersType--;
            } else {
                $msg["Content"]["type"] = "Forbidding";
                $queryFMR = ""
                        . "SELECT"
                        . " `Layer`.Id,"
                        . " `Layer`.Layer,"
                        . " `Layer`.Name,"
                        . " `Layer::Merging`.Base,"
                        . " `Layer::Merging`.Dummy "
                        . "FROM"
                        . " `Layer::Merging_Layer::Forbidding_R` "
                        . " LEFT JOIN `Layer::Merging` ON `Layer::Merging`.Id = `Layer::Merging_Layer::Forbidding_R`.`MergingLayerId`"
                        . " LEFT JOIN `Layer::Cad` ON `Layer::Cad`.Id = `Layer::Merging`.CadLayerId"
                        . " LEFT JOIN `Layer` ON `Layer`.Id = `Layer::Cad`.LayerId "
                        . "WHERE"
                        . " `Layer::Merging_Layer::Forbidding_R`.`ForbiddingLayerId` = " . $row['ForbiddingLayerId'];
                $resultFMR = $mysqli->query($queryFMR);
                if ($resultFMR) {
                    $msg["Content"]["layerMergingLayerForbiddingR"] = "";
                    while ($rowFMR = $resultFMR->fetch_assoc()) {
                        $tmp["Id"] = $rowFMR["Id"];
                        if ($rowFMR["Base"] == NULL && $rowFMR["Dummy"] == NULL) {
                            $atrFMR = "";
                        } else {
                            $atrFMR = array();
                            if ($rowFMR["Base"] == 1) {
                                $atrFMR[] = "Base";
                            }
                            if ($rowFMR["Dummy"] == 1) {
                                $atrFMR[] = "Dummy";
                            }
                            $atrFMR = implode(",", $atrFMR);
                            $atrFMR = "($atrFMR)";
                        }
                        $tmp["Name"] = $rowFMR["Layer"] . " " . $rowFMR["Name"] . " " . $atrFMR;
                        $msg["Content"]["layerMergingLayerForbiddingR"][] = $tmp;
                    }
                } else {
                    $msg["AjaxError"] = "Ошибка при получении данных на Layer::Merging_Layer::Forbidding_R.<br>" . $mysqli->error . "<br>" . $queryFMR;
                    break;
                }
            }
            //Suspended
            if ($row["SuspendedLayerId"] == NULL) {
                $countCheckLayersType--;
            } else {
                $msg["Content"]["type"] = "Suspended";
            }
            //Merging
            if ($row["MergingLayerId"] == NULL) {
                $countCheckLayersType--;
            } else {
                $msg["Content"]["type"] = "Merging";
                if ($row["MergingLayerBase"] == 1) {
                    $msg["Content"]["mergingBase"] = 1;
                }
                if ($row["MergingLayerDummy"] == 1) {
                    $msg["Content"]["mergingDummy"] = 1;
                }
                //ForbiddingInfo
                $queryMFR = ""
                        . "SELECT"
                        . " `Layer`.Id,"
                        . " `Layer`.Layer,"
                        . " `Layer`.Name "
                        . "FROM"
                        . " `Layer::Merging_Layer::Forbidding_R` "
                        . " LEFT JOIN `Layer::Forbidding` ON `Layer::Forbidding`.Id = `Layer::Merging_Layer::Forbidding_R`.`ForbiddingLayerId`"
                        . " LEFT JOIN `Layer::Cad` ON `Layer::Cad`.Id = `Layer::Forbidding`.CadLayerId"
                        . " LEFT JOIN `Layer` ON `Layer`.Id = `Layer::Cad`.LayerId "
                        . "WHERE"
                        . " `Layer::Merging_Layer::Forbidding_R`.`MergingLayerId` = " . $row['MergingLayerId'];
                $resultMFR = $mysqli->query($queryMFR);
                if ($resultMFR) {
                    $msg["Content"]["layerMergingLayerForbiddingR"] = "";
                    while ($rowMFR = $resultMFR->fetch_assoc()) {
                        $tmp["Id"] = $rowMFR["Id"];
                        $tmp["Name"] = $rowMFR["Layer"] . " " . $rowMFR["Name"];
                        $msg["Content"]["layerMergingLayerForbiddingR"][] = $tmp;
                    }
                } else {
                    $msg["AjaxError"] = "Ошибка при получении данных на Layer::Merging_Layer::Forbidding_R.<br>" . $mysqli->error . "<br>" . $queryMFR;
                    break;
                }
                //IntermediateInfo
                $queryMIR = ""
                        . "SELECT"
                        . " `Layer`.Id,"
                        . " `Layer`.Layer,"
                        . " `Layer`.Name, "
                        . " `Layer::Intermediate`.Mark, "
                        . " `Layer::Intermediate`.Density "
                        . "FROM"
                        . " `Layer::Intermediate_Layer::Merging_R` "
                        . " LEFT JOIN `Layer::Intermediate` ON `Layer::Intermediate`.Id = `Layer::Intermediate_Layer::Merging_R`.`IntermediateLayerId`"
                        . " LEFT JOIN `Layer` ON `Layer`.Id = `Layer::Intermediate`.LayerId "
                        . "WHERE"
                        . " `Layer::Intermediate_Layer::Merging_R`.`MergingLayerId` = " . $row['MergingLayerId'];
                $resultMIR = $mysqli->query($queryMIR);
                if ($resultMIR) {
                    $msg["Content"]["layerIntermediateLayerMergingR"] = "";
                    while ($rowMIR = $resultMIR->fetch_assoc()) {
                        $tmp["Id"] = $rowMIR["Id"];

                        if ($rowMIR["Mark"] == NULL && $rowMIR["Density"] == NULL) {
                            $atrMIR = "";
                        } else {
                            $atrMIR = array();
                            if ($rowMIR["Mark"] == 1) {
                                $atrMIR[] = "Mark";
                            }
                            if ($rowMIR["Density"] == 1) {
                                $atrMIR[] = "Density";
                            }
                            $atrMIR = implode(",", $atrMIR);
                            $atrMIR = "($atrMIR)";
                        }
                        $tmp["Name"] = $rowMIR["Layer"] . " " . $rowMIR["Name"] . " " . $atrMIR;
                        $msg["Content"]["layerIntermediateLayerMergingR"][] = $tmp;
                    }
                } else {
                    $msg["AjaxError"] = "Ошибка при получении данных на Layer::Intermediate_Layer::Merging_R.<br>" . $mysqli->error . "<br>" . $queryMFR;
                    break;
                }
            }
            //Intermediate
            if ($row["IntermediateLayerId"] == NULL) {
                $countCheckLayersType--;
            } else {
                $msg["Content"]["type"] = "Intermediate";
                if ($row["IntermediateLayerMark"] == 1) {
                    $msg["Content"]["intermediateMark"] = 1;
                }
                if ($row["IntermediateLayerDensity"] == 1) {
                    $msg["Content"]["intermediateDensity"] = 1;
                }
                //Merging
                $queryIMR = ""
                        . "SELECT"
                        . " `Layer`.Id,"
                        . " `Layer`.Layer,"
                        . " `Layer`.Name,"
                        . " `Layer::Merging`.Base,"
                        . " `Layer::Merging`.Dummy "
                        . "FROM"
                        . " `Layer::Intermediate_Layer::Merging_R` "
                        . " LEFT JOIN `Layer::Merging` ON `Layer::Merging`.Id = `Layer::Intermediate_Layer::Merging_R`.`MergingLayerId`"
                        . " LEFT JOIN `Layer::Cad` ON `Layer::Cad`.Id = `Layer::Merging`.CadLayerId"
                        . " LEFT JOIN `Layer` ON `Layer`.Id = `Layer::Cad`.LayerId "
                        . "WHERE"
                        . " `Layer::Intermediate_Layer::Merging_R`.`IntermediateLayerId` = " . $row['IntermediateLayerId'];
                $resultIMR = $mysqli->query($queryIMR);
                if ($resultIMR) {
                    $msg["Content"]["layerIntermediateLayerMergingR"] = "";
                    while ($rowIMR = $resultIMR->fetch_assoc()) {
                        $tmp["Id"] = $rowIMR["Id"];
                        if ($rowIMR["Base"] == NULL && $rowIMR["Dummy"] == NULL) {
                            $atrIMR = "";
                        } else {
                            $atrIMR = array();
                            if ($rowIMR["Base"] == 1) {
                                $atrIMR[] = "Base";
                            }
                            if ($rowIMR["Dummy"] == 1) {
                                $atrIMR[] = "Dummy";
                            }
                            $atrIMR = implode(",", $atrIMR);
                            $atrIMR = "($atrIMR)";
                        }
                        $tmp["Name"] = $rowIMR["Layer"] . " " . $rowIMR["Name"] . " " . $atrIMR;
                        $msg["Content"]["layerIntermediateLayerMergingR"][] = $tmp;
                    }
                } else {
                    $msg["AjaxError"] = "Ошибка при получении данных на Layer::Intermediate_Layer::Merging_R.<br>" . $mysqli->error . "<br>" . $queryIMR;
                    break;
                }
                //Mask
                $queryIMsR = ""
                        . "SELECT"
                        . " `Layer`.Id,"
                        . " `Layer`.Layer,"
                        . " `Layer`.Name,"
                        . " `Layer::Mask`.Mark "
                        . "FROM"
                        . " `Layer::Mask_Layer::Intermediate_R` "
                        . " LEFT JOIN `Layer::Mask` ON `Layer::Mask`.Id = `Layer::Mask_Layer::Intermediate_R`.`MaskLayerId`"
                        . " LEFT JOIN `Layer` ON `Layer`.Id = `Layer::Mask`.LayerId "
                        . "WHERE"
                        . " `Layer::Mask_Layer::Intermediate_R`.`IntermediateLayerId` = " . $row['IntermediateLayerId'];
                $resultIMsR = $mysqli->query($queryIMsR);
                if ($resultIMsR) {
                    $msg["Content"]["layerMaskLayerIntermediateR"] = "";
                    while ($rowIMsR = $resultIMsR->fetch_assoc()) {
                        $tmp["Id"] = $rowIMsR["Id"];
                        if ($rowIMsR["Mark"] == 0) {
                            $atrIMsR = "";
                        } else {
                            $atrIMsR = "(Mark)";
                        }
                        $tmp["Name"] = $rowIMsR["Layer"] . " " . $rowIMsR["Name"] . " " . $atrIMsR;
                        $msg["Content"]["layerMaskLayerIntermediateR"][] = $tmp;
                    }
                } else {
                    $msg["AjaxError"] = "Ошибка при получении данных на Layer::Mask_Layer::Intermediate_R.<br>" . $mysqli->error . "<br>" . $queryIMR;
                    break;
                }
            }
            //Mask
            if ($row["MaskLayerId"] == NULL) {
                $countCheckLayersType--;
            } else {
                $msg["Content"]["type"] = "Mask";
                if ($row["MaskLayerMark"] == 1) {
                    $msg["Content"]["maskMark"] = 1;
                }

                //IntermediateInfo
                $queryMIR = ""
                        . "SELECT"
                        . " `Layer`.Id,"
                        . " `Layer`.Layer,"
                        . " `Layer`.Name, "
                        . " `Layer::Intermediate`.Mark, "
                        . " `Layer::Intermediate`.Density "
                        . "FROM"
                        . " `Layer::Mask_Layer::Intermediate_R` "
                        . " LEFT JOIN `Layer::Intermediate` ON `Layer::Intermediate`.Id = `Layer::Mask_Layer::Intermediate_R`.`IntermediateLayerId`"
                        . " LEFT JOIN `Layer` ON `Layer`.Id = `Layer::Intermediate`.LayerId "
                        . "WHERE"
                        . " `Layer::Mask_Layer::Intermediate_R`.`MaskLayerId` = " . $row['MaskLayerId'];
                $resultMIR = $mysqli->query($queryMIR);
                if ($resultMIR) {
                    $msg["Content"]["layerMaskLayerIntermediateR"] = "";
                    while ($rowMIR = $resultMIR->fetch_assoc()) {
                        $tmp["Id"] = $rowMIR["Id"];

                        if ($rowMIR["Mark"] == NULL && $rowMIR["Density"] == NULL) {
                            $atrMIR = "";
                        } else {
                            $atrMIR = array();
                            if ($rowMIR["Mark"] == 1) {
                                $atrMIR[] = "Mark";
                            }
                            if ($rowMIR["Density"] == 1) {
                                $atrMIR[] = "Density";
                            }
                            $atrMIR = implode(",", $atrMIR);
                            $atrMIR = "($atrMIR)";
                        }
                        $tmp["Name"] = $rowMIR["Layer"] . " " . $rowMIR["Name"] . " " . $atrMIR;
                        $msg["Content"]["layerMaskLayerIntermediateR"][] = $tmp;
                    }
                } else {
                    $msg["AjaxError"] = "Ошибка при получении данных на Layer::Mask_Layer::Intermediate_R.<br>" . $mysqli->error . "<br>" . $queryMIR;
                    break;
                }
            }

            if ($countCheckLayersType != 1) {
                $msg["AjaxError"] = "Внимание слой имеет несколько типов. Корректировать такой слой не возможно.";
                break;
            }

            //Связанные маршруты со слоем
            $queryR = ""
                    . "SELECT DISTINCT"
                    . " `BaseRoute`.Id, "
                    . " `BaseRoute`.Name, "
                    . " `BaseRoute`.Revision "
                    . "FROM"
                    . " `BaseRoute` "
                    . " LEFT JOIN `Layer_BaseRoute_R` ON `Layer_BaseRoute_R`.`BaseRouteId` = `BaseRoute`.`Id` "
                    . "WHERE"
                    . " `Layer_BaseRoute_R`.`LayerId` = " . $row['Id'] . " "
                    . "ORDER BY `BaseRoute`.`Name`";
            $resultR = $mysqli->query($queryR);
            if ($resultR) {
                //$routes = array();
                $msg["Content"]["route"] = "";
                while ($rowR = $resultR->fetch_assoc()) {
                    $tmp["Id"] = $rowR["Id"];
                    $tmp["Name"] = $rowR["Name"] . " rev: " . $rowR["Revision"];
                    $msg["Content"]["route"][] = $tmp;
                }
            } else {
                $msg["AjaxError"] = "Ошибка при получении данных на BaseRoute.<br>" . $mysqli->error . "<br>" . $queryR;
                break;
            }

            //Связанные опции со слоем
            $queryR = ""
                    . "SELECT DISTINCT"
                    . " `Option`.Id, "
                    . " `Option`.Name "
                    . "FROM"
                    . " `Option` "
                    . " LEFT JOIN `Layer_Option_R` ON `Layer_Option_R`.`OptionId` = `Option`.`Id` "
                    . "WHERE"
                    . " `Layer_Option_R`.`LayerId` = " . $row['Id'] . " "
                    . "ORDER BY `Option`.`Name`";
            $resultR = $mysqli->query($queryR);
            if ($resultR) {
                $msg["Content"]["option"] = "";
                while ($rowR = $resultR->fetch_assoc()) {
                    $tmp["Id"] = $rowR["Id"];
                    $tmp["Name"] = $rowR["Name"];
                    $msg["Content"]["option"][] = $tmp;
                }
            } else {
                $msg["AjaxError"] = "Ошибка при получении данных на Option.<br>" . $mysqli->error . "<br>" . $queryR;
                break;
            }
        } else {
            $msg["AjaxError"] = "Ошибка при получении данных на Layer.<br>" . $mysqli->error . "<br>" . $query;
            break;
        }
        //Получение списка технологий
        $query = ""
                . "SELECT DISTINCT"
                . " `Technology`.Id,"
                . " `Technology`.`Name` "
                . "FROM"
                . " `Technology` "
                . " LEFT JOIN `BaseRoute` ON `BaseRoute`.`TechnologyId` = `Technology`.Id "
                . "WHERE"
                . " `BaseRoute`.Id NOT IN ("
                . " 		SELECT"
                . " 		 `BaseRoute`.Id"
                . " 		FROM"
                . " 		 `Layer_BaseRoute_R` "
                . "		 LEFT JOIN `BaseRoute` ON `BaseRoute`.Id = `Layer_BaseRoute_R`.BaseRouteId "
                . " 		WHERE"
                . " 		 `Layer_BaseRoute_R`.`LayerId` = " . $_POST['id'] . " "
                . " ) "
                . "ORDER BY `Name`";

        $result = $mysqli->query($query);
        if ($result) {
            while ($row = $result->fetch_assoc()) {
                $tmp["Id"] = $row["Id"];
                $tmp["Name"] = $row["Name"];
                $msg["Content"]["routeTechnologyList"][] = $tmp;
            }
        } else {
            $msg["AjaxError"] = "Ошибка при получении данных на Technology.<br>" . $mysqli->error . "<br>" . $query;
            break;
        }
        //Получение списка маршрутов
        $query = ""
                . "SELECT DISTINCT"
                . " `BaseRoute`.Id,"
                . " `BaseRoute`.`Name`, "
                . " `BaseRoute`.`Revision` "
                . "FROM"
                . " `BaseRoute` "
                . "WHERE"
                . " `BaseRoute`.Id NOT IN ("
                . " 		SELECT"
                . " 		 `BaseRoute`.Id"
                . " 		FROM"
                . " 		 `Layer_BaseRoute_R` "
                . "		 LEFT JOIN `BaseRoute` ON `BaseRoute`.Id = `Layer_BaseRoute_R`.BaseRouteId "
                . " 		WHERE"
                . " 		 `Layer_BaseRoute_R`.`LayerId` = " . $_POST['id'] . " "
                . " ) "
                . "ORDER BY `BaseRoute`.`Name`";
        $result = $mysqli->query($query);
        if ($result) {
            while ($row = $result->fetch_assoc()) {
                $tmp["Id"] = $row["Id"];
                $tmp["Name"] = $row["Name"] . " revision: " . $row["Revision"];
                $msg["Content"]["routeList"][] = $tmp;
            }
        } else {
            $msg["AjaxError"] = "Ошибка при получении данных на Technology.<br>" . $mysqli->error . "<br>" . $query;
            break;
        }

        //Получение списка опций для добавления
        $query = ""
                . "SELECT DISTINCT"
                . " `Option`.Id,"
                . " `Option`.`Name` "
                . "FROM"
                . " `Option` "
                . "WHERE"
                . " `Option`.Id NOT IN ("
                . " 		SELECT"
                . " 		 `Option`.Id"
                . " 		FROM"
                . " 		 `Layer_Option_R` "
                . "		 LEFT JOIN `Option` ON `Option`.Id = `Layer_Option_R`.OptionId "
                . " 		WHERE"
                . " 		 `Layer_Option_R`.`LayerId` = " . $_POST['id'] . " "
                . " ) "
                . "ORDER BY `Option`.`Name`";
        $result = $mysqli->query($query);
        if ($result) {
            $msg["Content"]["optionList"] = "";
            while ($row = $result->fetch_assoc()) {
                $tmp["Id"] = $row["Id"];
                $tmp["Name"] = $row["Name"];
                $msg["Content"]["optionList"][] = $tmp;
            }
        } else {
            $msg["AjaxError"] = "Ошибка при получении данных на Option.<br>" . $mysqli->error . "<br>" . $query;
            break;
        }
        break;
    case "getAllLayers":
        $query = ""
                . "SELECT"
                . " `Layer`.Id, "
                . " `Layer`.Layer, "
                . " `Layer`.Name, "
                . " `Layer::Cad`.Id as CadLayerId, "
                . " `Layer::Intermediate`.Id as IntermediateLayerId,	"
                . " `Layer::Mask`.Id as MaskLayerId, "
                . " `Layer::Forbidding`.Id as ForbiddingLayerId, "
                . " `Layer::Suspended`.Id as SuspendedLayerId, "
                . " `Layer::Merging`.Id as MergingLayerId, "
                . " `Layer::Merging`.Base as MergingLayerBase, "
                . " `Layer::Merging`.Dummy as MergingLayerDummy, "
                . " `Layer::Intermediate`.Mark as IntermediateLayerMark,	"
                . " `Layer::Intermediate`.Density as IntermediateLayerDensity, "
                . " `Layer::Mask`.Mark as MaskLayerMark "
                . "FROM"
                . " `Layer` "
                . " LEFT JOIN `Layer::Cad` ON `Layer::Cad`.LayerId = `Layer`.Id"
                . " LEFT JOIN `Layer::Intermediate` ON `Layer::Intermediate`.LayerId = `Layer`.Id"
                . " LEFT JOIN `Layer::Mask` ON `Layer::Mask`.LayerId = `Layer`.Id "
                . " LEFT JOIN `Layer::Forbidding` ON `Layer::Forbidding`.CadLayerId = `Layer::Cad`.Id "
                . " LEFT JOIN `Layer::Suspended` ON `Layer::Suspended`.CadLayerId = `Layer::Cad`.Id "
                . " LEFT JOIN `Layer::Merging` ON `Layer::Merging`.CadLayerId = `Layer::Cad`.Id "
                . "ORDER BY `Layer` ";
        $result = $mysqli->query($query);
        if ($result) {
            $msg["Content"] = array();
            while ($row = $result->fetch_assoc()) {
                $tmpRow["Id"] = $row["Id"];
                $tmpRow["Layer"] = $row["Layer"];
                $tmpRow["Name"] = $row["Name"];
                $tmpRow["Type"] = "NONE";
                $tmpRow["Route"] = "NONE";
                $tmpRow["Option"] = "NONE";
                $tmpRow["Attributions"] = "NONE";
                $tmpRow["AdditionalInfo"] = "NONE";
                //----------------------------------
                //Тип слоя
                $checkLayer = 3;
                //CadLayer
                if ($row["CadLayerId"] == NULL) {
                    $checkLayer--;
                } else {
                    $tmpRow["Type"] = "Cad";
                    $checkCadLayer = 3;

                    if ($row["ForbiddingLayerId"] == NULL) {
                        $checkCadLayer--;
                    } else {
                        $tmpRow["Attributions"] = "Forbidding";
                        $queryFMR = ""
                                . "SELECT"
                                . " `Layer`.Layer,"
                                . " `Layer`.Name,"
                                . " `Layer::Merging`.Base,"
                                . " `Layer::Merging`.Dummy "
                                . "FROM"
                                . " `Layer::Merging_Layer::Forbidding_R` "
                                . " LEFT JOIN `Layer::Merging` ON `Layer::Merging`.Id = `Layer::Merging_Layer::Forbidding_R`.`MergingLayerId`"
                                . " LEFT JOIN `Layer::Cad` ON `Layer::Cad`.Id = `Layer::Merging`.CadLayerId"
                                . " LEFT JOIN `Layer` ON `Layer`.Id = `Layer::Cad`.LayerId "
                                . "WHERE"
                                . " `Layer::Merging_Layer::Forbidding_R`.`ForbiddingLayerId` = " . $row['ForbiddingLayerId'];
                        $resultFMR = $mysqli->query($queryFMR);
                        if ($resultFMR) {
                            $tmpFMR = array();
                            while ($rowFMR = $resultFMR->fetch_assoc()) {
                                if ($rowFMR["Base"] == NULL && $rowFMR["Dummy"] == NULL) {
                                    $atrFMR = "";
                                } else {
                                    $atrFMR = array();
                                    if ($rowFMR["Base"] == 1) {
                                        $atrFMR[] = "Base";
                                    }
                                    if ($rowFMR["Dummy"] == 1) {
                                        $atrFMR[] = "Dummy";
                                    }
                                    $atrFMR = implode(",", $atrFMR);
                                    $atrFMR = "($atrFMR)";
                                }
                                $tmpFMR[] = $rowFMR["Layer"] . " " . $rowFMR["Name"] . " " . $atrFMR;
                            }
                            if (!empty($tmpFMR)) {
                                $tmpRow["AdditionalInfo"] = "Связь с merging слоями:<br>" . implode("<br>", $tmpFMR);
                            }
                        } else {
                            $msg["AjaxError"] = "Ошибка при получении данных на Layer::Merging_Layer::Forbidding_R.<br>" . $mysqli->error . "<br>" . $queryFMR;
                            break;
                        }
                    }

                    if ($row["SuspendedLayerId"] == NULL) {
                        $checkCadLayer--;
                    } else {
                        $tmpRow["Attributions"] = "Suspended";
                    }

                    if ($row["MergingLayerId"] == NULL) {
                        $checkCadLayer--;
                    } else {
                        $tmpRow["Attributions"] = "Merging";
                        if ($row["MergingLayerBase"] == 1) {
                            $tmpRow["Attributions"] = $tmpRow["Attributions"] . "<br>Base";
                        }
                        if ($row["MergingLayerDummy"] == 1) {
                            $tmpRow["Attributions"] = $tmpRow["Attributions"] . "<br>Dummy";
                        }
                        //Forbidding
                        $queryMFR = ""
                                . "SELECT"
                                . " `Layer`.Id,"
                                . " `Layer`.Layer,"
                                . " `Layer`.Name "
                                . "FROM"
                                . " `Layer::Merging_Layer::Forbidding_R` "
                                . " LEFT JOIN `Layer::Forbidding` ON `Layer::Forbidding`.Id = `Layer::Merging_Layer::Forbidding_R`.`ForbiddingLayerId`"
                                . " LEFT JOIN `Layer::Cad` ON `Layer::Cad`.Id = `Layer::Forbidding`.CadLayerId"
                                . " LEFT JOIN `Layer` ON `Layer`.Id = `Layer::Cad`.LayerId "
                                . "WHERE"
                                . " `Layer::Merging_Layer::Forbidding_R`.`MergingLayerId` = " . $row['MergingLayerId'];
                        $resultMFR = $mysqli->query($queryMFR);
                        if ($resultMFR) {
                            $tmpMFR = array();
                            while ($rowMFR = $resultMFR->fetch_assoc()) {
                                $tmpMFR[] = $rowMFR["Layer"] . " " . $rowMFR["Name"];
                            }
                            if (!empty($tmpMFR)) {
                                $tmpRow["AdditionalInfo"] = "Связь с forbidding слоями:<br>" . implode("<br>", $tmpMFR);
                            }
                        } else {
                            $msg["AjaxError"] = "Ошибка при получении данных на Layer::Merging_Layer::Forbidding_R.<br>" . $mysqli->error . "<br>" . $queryMFR;
                            break;
                        }
                        //IntermediateInfo
                        $queryMIR = ""
                                . "SELECT"
                                . " `Layer`.Id,"
                                . " `Layer`.Layer,"
                                . " `Layer`.Name, "
                                . " `Layer::Intermediate`.Mark, "
                                . " `Layer::Intermediate`.Density "
                                . "FROM"
                                . " `Layer::Intermediate_Layer::Merging_R` "
                                . " LEFT JOIN `Layer::Intermediate` ON `Layer::Intermediate`.Id = `Layer::Intermediate_Layer::Merging_R`.`IntermediateLayerId`"
                                . " LEFT JOIN `Layer` ON `Layer`.Id = `Layer::Intermediate`.LayerId "
                                . "WHERE"
                                . " `Layer::Intermediate_Layer::Merging_R`.`MergingLayerId` = " . $row['MergingLayerId'];
                        $resultMIR = $mysqli->query($queryMIR);
                        if ($resultMIR) {
                            $tmpMIR = array();
                            while ($rowMIR = $resultMIR->fetch_assoc()) {
                                if ($rowMIR["Mark"] == NULL && $rowMIR["Density"] == NULL) {
                                    $atrMIR = "";
                                } else {
                                    $atrMIR = array();
                                    if ($rowMIR["Mark"] == 1) {
                                        $atrMIR[] = "Mark";
                                    }
                                    if ($rowMIR["Density"] == 1) {
                                        $atrMIR[] = "Density";
                                    }
                                    $atrMIR = implode(",", $atrMIR);
                                    $atrMIR = "($atrMIR)";
                                }
                                $tmpMIR[] = $rowMIR["Layer"] . " " . $rowMIR["Name"] . " " . $atrMIR;
                            }
                            if (!empty($tmpMIR)) {
                                if ($tmpRow["AdditionalInfo"] != "NONE") {
                                    $tmpRow["AdditionalInfo"] = $tmpRow["AdditionalInfo"] . "<br><hr>Связь с intermediate слоями:<br>" . implode("<br>", $tmpMIR);
                                } else {
                                    $tmpRow["AdditionalInfo"] = "Связь с intermediate слоями:<br>" . implode("<br>", $tmpMIR);
                                }
                            }
                        } else {
                            $msg["AjaxError"] = "Ошибка при получении данных на Layer::Intermediate_Layer::Merging_R.<br>" . $mysqli->error . "<br>" . $queryMFR;
                            break;
                        }
                    }

                    if ($checkCadLayer > 1) {
                        $tmpRow["Attributions"] = "ERROR";
                    }
                }
                //IntermediateLayer
                if ($row["IntermediateLayerId"] == NULL) {
                    $checkLayer--;
                } else {
                    $tmpRow["Type"] = "Intermediate";
                    if ($row["IntermediateLayerMark"] == 1 || $row["IntermediateLayerDensity"] == 1) {
                        $attr = array();
                        if ($row["IntermediateLayerMark"] == 1) {
                            $attr[] = "Mark";
                        }
                        if ($row["IntermediateLayerDensity"] == 1) {
                            $attr[] = "Density";
                        }
                        $tmpRow["Attributions"] = implode("<br>", $attr);
                    }

                    //Merging
                    $queryIMR = ""
                            . "SELECT"
                            . " `Layer`.Id,"
                            . " `Layer`.Layer,"
                            . " `Layer`.Name,"
                            . " `Layer::Merging`.Base,"
                            . " `Layer::Merging`.Dummy "
                            . "FROM"
                            . " `Layer::Intermediate_Layer::Merging_R` "
                            . " LEFT JOIN `Layer::Merging` ON `Layer::Merging`.Id = `Layer::Intermediate_Layer::Merging_R`.`MergingLayerId`"
                            . " LEFT JOIN `Layer::Cad` ON `Layer::Cad`.Id = `Layer::Merging`.CadLayerId"
                            . " LEFT JOIN `Layer` ON `Layer`.Id = `Layer::Cad`.LayerId "
                            . "WHERE"
                            . " `Layer::Intermediate_Layer::Merging_R`.`IntermediateLayerId` = " . $row['IntermediateLayerId'];
                    $resultIMR = $mysqli->query($queryIMR);
                    if ($resultIMR) {
                        $tmpIMR = array();
                        while ($rowIMR = $resultIMR->fetch_assoc()) {
                            if ($rowIMR["Base"] == NULL && $rowIMR["Dummy"] == NULL) {
                                $atrIMR = "";
                            } else {
                                $atrIMR = array();
                                if ($rowIMR["Base"] == 1) {
                                    $atrIMR[] = "Base";
                                }
                                if ($rowIMR["Dummy"] == 1) {
                                    $atrIMR[] = "Dummy";
                                }
                                $atrIMR = implode(",", $atrIMR);
                                $atrIMR = "($atrIMR)";
                            }
                            $tmpIMR[] = $rowIMR["Layer"] . " " . $rowIMR["Name"] . " " . $atrIMR;
                        }
                        if (!empty($tmpIMR)) {
                            $tmpRow["AdditionalInfo"] = "Связь с merging слоями:<br>" . implode("<br>", $tmpIMR);
                        }
                    } else {
                        $msg["AjaxError"] = "Ошибка при получении данных на Layer::Intermediate_Layer::Merging_R.<br>" . $mysqli->error . "<br>" . $queryIMR;
                        break;
                    }
                    //Mask
                    $queryIMsR = ""
                            . "SELECT"
                            . " `Layer`.Id,"
                            . " `Layer`.Layer,"
                            . " `Layer`.Name,"
                            . " `Layer::Mask`.Mark "
                            . "FROM"
                            . " `Layer::Mask_Layer::Intermediate_R` "
                            . " LEFT JOIN `Layer::Mask` ON `Layer::Mask`.Id = `Layer::Mask_Layer::Intermediate_R`.`MaskLayerId`"
                            . " LEFT JOIN `Layer` ON `Layer`.Id = `Layer::Mask`.LayerId "
                            . "WHERE"
                            . " `Layer::Mask_Layer::Intermediate_R`.`IntermediateLayerId` = " . $row['IntermediateLayerId'];
                    $resultIMsR = $mysqli->query($queryIMsR);
                    if ($resultIMsR) {
                        $tmpIMsR = array();
                        while ($rowIMsR = $resultIMsR->fetch_assoc()) {
                            if ($rowIMsR["Mark"] == 0) {
                                $atrIMsR = "";
                            } else {
                                $atrIMsR = "(Mark)";
                            }
                            $tmpIMsR[] = $rowIMsR["Layer"] . " " . $rowIMsR["Name"] . " " . $atrIMsR;
                        }
                        if (!empty($tmpIMsR)) {
                            if ($tmpRow["AdditionalInfo"] == "NONE") {
                                $tmpRow["AdditionalInfo"] = "Связь с mask слоями:<br>" . implode("<br>", $tmpIMsR);
                            } else {
                                $tmpRow["AdditionalInfo"] = $tmpRow["AdditionalInfo"] . "<br><hr>Связь с mask слоями:<br>" . implode("<br>", $tmpIMsR);
                            }
                        }
                    } else {
                        $msg["AjaxError"] = "Ошибка при получении данных на Layer::Mask_Layer::Intermediate_R.<br>" . $mysqli->error . "<br>" . $queryIMR;
                        break;
                    }
                }
                //MaskLayer
                if ($row["MaskLayerId"] == NULL) {
                    $checkLayer--;
                } else {
                    $tmpRow["Type"] = "Mask";
                    if ($row["MaskLayerMark"] == 1) {
                        $tmpRow["Attributions"] = "Mark";
                    }

                    //IntermediateInfo
                    $queryMIR = ""
                            . "SELECT"
                            . " `Layer`.Id,"
                            . " `Layer`.Layer,"
                            . " `Layer`.Name, "
                            . " `Layer::Intermediate`.Mark, "
                            . " `Layer::Intermediate`.Density "
                            . "FROM"
                            . " `Layer::Mask_Layer::Intermediate_R` "
                            . " LEFT JOIN `Layer::Intermediate` ON `Layer::Intermediate`.Id = `Layer::Mask_Layer::Intermediate_R`.`IntermediateLayerId`"
                            . " LEFT JOIN `Layer` ON `Layer`.Id = `Layer::Intermediate`.LayerId "
                            . "WHERE"
                            . " `Layer::Mask_Layer::Intermediate_R`.`MaskLayerId` = " . $row['MaskLayerId'];
                    $resultMIR = $mysqli->query($queryMIR);
                    if ($resultMIR) {
                        $tmpMIR = array();
                        while ($rowMIR = $resultMIR->fetch_assoc()) {
                            if ($rowMIR["Mark"] == NULL && $rowMIR["Density"] == NULL) {
                                $atrMIR = "";
                            } else {
                                $atrMIR = array();
                                if ($rowMIR["Mark"] == 1) {
                                    $atrMIR[] = "Mark";
                                }
                                if ($rowMIR["Density"] == 1) {
                                    $atrMIR[] = "Density";
                                }
                                $atrMIR = implode(",", $atrMIR);
                                $atrMIR = "($atrMIR)";
                            }
                            $tmpMIR[] = $rowMIR["Layer"] . " " . $rowMIR["Name"] . " " . $atrMIR;
                        }
                        if (!empty($tmpMIR)) {
                            $tmpRow["AdditionalInfo"] = "Связь с intermediate слоями:<br>" . implode("<br>", $tmpMIR);
                        }
                    } else {
                        $msg["AjaxError"] = "Ошибка при получении данных на Layer::Mask_Layer::Intermediate_R.<br>" . $mysqli->error . "<br>" . $queryMIR;
                        break;
                    }
                }
                //CheckLayer
                if ($checkLayer > 1) {
                    $tmpRow["Type"] = "ERROR";
                    $tmpRow["Attributions"] = "ERROR";
                }
                //----------------------------------
                //BaseRoute
                //----------------------------------
                // $queryR = ""
                //         . "SELECT"
                //         . " `BaseRoute`.Name "
                //         . "FROM"
                //         . " `BaseRoute`"
                //         . " LEFT JOIN `Layer_BaseRoute_R` ON `Layer_BaseRoute_R`.BaseRouteId = `BaseRoute`.Id "
                //         . "WHERE"
                //         . " `Layer_BaseRoute_R`.LayerId = " . $row['Id'] . " "
                //         . "ORDER BY Name";

                $queryR = ""
                        . "SELECT"
                        . " `BaseRoute`.Name "
                        . "FROM"
                        . " `BaseRoute`"
                        . " LEFT JOIN `Layer` ON `Layer`.BaseRouteId = `BaseRoute`.Id "
                        . "WHERE"
                        . " `Layer`.Id = " . $row['Id'] . " "
                        . "ORDER BY Name";
                $resultR = $mysqli->query($queryR);
                if ($resultR) {
                    if ($resultR->num_rows > 0) {
                        $route = array();
                        while ($rowR = $resultR->fetch_assoc()) {
                            $route[] = $rowR["Name"];
                        }
                        $tmpRow["Route"] = implode("<br>", $route);
                    }
                } else {
                    $msg['AjaxError'] = "$queryId: Ошибка в запросе определения базового маршрута.<br>" . $mysqli->error . "<br>$queryR";
                }
                //----------------------------------
                //Option
                //----------------------------------
                $queryOpt = ""
                        . "SELECT"
                        . " `Option`.Name "
                        . "FROM"
                        . " `Option`"
                        . " LEFT JOIN `Layer_Option_R` ON `Layer_Option_R`.OptionId = `Option`.Id "
                        . "WHERE"
                        . " `Layer_Option_R`.LayerId = " . $row['Id'] . " "
                        . "ORDER BY Name";
                $resultOpt = $mysqli->query($queryOpt);
                if ($resultOpt) {
                    if ($resultOpt->num_rows > 0) {
                        $option = array();
                        while ($rowOpt = $resultOpt->fetch_assoc()) {
                            $option[] = $rowOpt["Name"];
                        }
                        $tmpRow["Option"] = implode("<br>", $option);
                    }
                } else {
                    $msg['AjaxError'] = "$queryId: Ошибка в запросе определения опций.<br>" . $mysqli->error . "<br>$queryOpt";
                }

                $msg["Content"][] = $tmpRow;
            }
        } else {
            $msg['AjaxError'] = "$queryId: Ошибка в запросе.<br>$query";
        }
        break;
    case "getFiltrForSearchChangeLayers":
        $msg["id"] = $_POST["id"];
        $msg["layer"] = $_POST["layer"];
        $msg["name"] = $_POST["name"];
        $msg["type"] = $_POST["type"];
        $msg["route"] = $_POST["route"];
        if (isset($_POST["attribute"])) {
            $msg["attribute"] = $_POST["attribute"];
        } else {
            $msg["attribute"] = "";
        }


        $queryWhere = array();

        if ($_POST["layer"] != "") {
            $queryWhere[] = " `Layer`.`Layer` = '" . $_POST['layer'] . "' ";
        }
        if ($_POST["name"] != "") {
            $queryWhere[] = " `Layer`.`Name` = '" . $_POST['name'] . "' ";
        }
        if ($_POST["type"] != "") {
            $attributes = "";
            switch ($_POST["type"]) {
                case "Forbidding" :
                    $queryWhere[] = " `Layer`.`Id` IN ("
                            . "SELECT"
                            . " `Layer`.`Id` "
                            . "FROM"
                            . " `Layer::Forbidding` "
                            . " LEFT JOIN `Layer::Cad` ON `Layer::Cad`.Id = `Layer::Forbidding`.CadLayerId "
                            . " LEFT JOIN `Layer` ON `Layer`.Id = `Layer::Cad`.LayerId "
                            . ") ";
                    break;
                case "Suspended" :
                    $queryWhere[] = " `Layer`.`Id` IN ("
                            . "SELECT"
                            . " `Layer`.`Id` "
                            . "FROM"
                            . " `Layer::Suspended` "
                            . " LEFT JOIN `Layer::Cad` ON `Layer::Cad`.Id = `Layer::Suspended`.CadLayerId "
                            . " LEFT JOIN `Layer` ON `Layer`.Id = `Layer::Cad`.LayerId "
                            . ") ";
                    break;
                case "Merging" :
                    if ($_POST["attribute"] == "base") {
                        $queryAttr = " WHERE `Layer::Merging`.Base = 1";
                    } else if ($_POST["attribute"] == "dummy") {
                        $queryAttr = " WHERE `Layer::Merging`.Dummy = 1";
                    } else if ($_POST["attribute"] == "baseDummy") {
                        $queryAttr = " WHERE `Layer::Merging`.Base = 1 AND `Layer::Merging`.Dummy = 1 ";
                    } else if ($_POST["attribute"] == "additional") {
                        $queryAttr = " WHERE `Layer::Merging`.Base = 0 AND `Layer::Merging`.Dummy = 0 ";
                    }

                    $queryWhere[] = " `Layer`.`Id` IN ("
                            . "SELECT"
                            . " `Layer`.`Id` "
                            . "FROM"
                            . " `Layer::Merging` "
                            . " LEFT JOIN `Layer::Cad` ON `Layer::Cad`.Id = `Layer::Merging`.CadLayerId "
                            . " LEFT JOIN `Layer` ON `Layer`.Id = `Layer::Cad`.LayerId "
                            . " $queryAttr ) ";
                    $attributes["base"] = "Base";
                    $attributes["dummy"] = "Dummy";
                    $attributes["baseDummy"] = "Base+Dummy";
                    $attributes["additional"] = "Дополнительный";
                    break;
                case "Intermediate" :
                    if ($_POST["attribute"] == "mark") {
                        $queryAttr = " WHERE `Layer::Intermediate`.Mark = 1";
                    } else if ($_POST["attribute"] == "density") {
                        $queryAttr = " WHERE `Layer::Intermediate`.Density = 1";
                    } else if ($_POST["attribute"] == "markDensity") {
                        $queryAttr = " WHERE `Layer::Intermediate`.Mark = 1 AND `Layer::Intermediate`.Density = 1 ";
                    }

                    $queryWhere[] = " `Layer`.`Id` IN ("
                            . "SELECT"
                            . " `Layer`.`Id` "
                            . "FROM"
                            . " `Layer::Intermediate` "
                            . " LEFT JOIN `Layer` ON `Layer`.Id = `Layer::Intermediate`.LayerId "
                            . " $queryAttr ) ";
                    $attributes["mark"] = "Mark";
                    $attributes["density"] = "Density";
                    $attributes["markDensity"] = "Mark+Density";
                    break;
                case "Mask" :
                    if ($_POST["attribute"] == "mark") {
                        $queryAttr = " WHERE `Layer::Mask`.Mark = 1";
                    }

                    $queryWhere[] = " `Layer`.`Id` IN ("
                            . "SELECT"
                            . " `Layer`.`Id` "
                            . "FROM"
                            . " `Layer::Mask` "
                            . " LEFT JOIN `Layer` ON `Layer`.Id = `Layer::Mask`.LayerId "
                            . " $queryAttr ) ";
                    $attributes["mark"] = "Mark";
                    break;
            }
            $msg["Attributes"] = $attributes;
        }
        if ($_POST["route"] != "") {
            $queryWhere[] = " `Layer`.`Id` IN ("
                    . "SELECT"
                    . " `Layer`.`Id` "
                    . "FROM"
                    . " `Layer_BaseRoute_R` "
                    . " LEFT JOIN `Layer` ON `Layer`.Id = `Layer_BaseRoute_R`.LayerId "
                    . "WHERE"
                    . " `Layer_BaseRoute_R`.BaseRouteId = " . $_POST['route'] . " "
                    . ") ";
        }

        if (!empty($queryWhere)) {
            $queryWhereText = implode(" AND ", $queryWhere);
        } else {
            $queryWhereText = "";
        }


        $layersId = array();
        $layersName = array();
        $layers = array();
        $types = array();
        $routes = array();
        $attributes = array();
        //LayersId
        $query = ""
                . "SELECT"
                . " `Layer`.Id,"
                . " `Layer`.Name,"
                . " `Layer`.Layer, "
                . " `Layer::Merging`.Base as MergingBase,"
                . " `Layer::Merging`.Dummy as MergingDummy,"
                . " `Layer::Intermediate`.Mark as IntermediateMark,"
                . " `Layer::Intermediate`.Density as IntermediateDensity,"
                . " `Layer::Mask`.Mark as MaskMark "
                . "FROM"
                . " `Layer` "
                . " LEFT JOIN `Layer::Cad` ON `Layer::Cad`.LayerId = `Layer`.Id "
                . " LEFT JOIN `Layer::Merging` ON `Layer::Merging`.CadLayerId = `Layer::Cad`.Id "
                . " LEFT JOIN `Layer::Intermediate` ON `Layer::Intermediate`.LayerId = `Layer`.Id "
                . " LEFT JOIN `Layer::Mask` ON `Layer::Mask`.LayerId = `Layer`.Id ";
        if ($queryWhereText != "") {
            $query = $query . " WHERE $queryWhereText";
        }
        $query = $query . "ORDER BY `Id`";

        $result = $mysqli->query($query);
        if ($result) {
            while ($row = $result->fetch_assoc()) {
                $name = $row["Id"] . " " . $row["Layer"] . " " . $row["Name"];
                $attr = array();
                if ($row["MergingBase"] == 1) {
                    $attr[] = "Base";
                }
                if ($row["MergingDummy"] == 1) {
                    $attr[] = "Dummy";
                }
                if ($row["IntermediateMark"] == 1) {
                    $attr[] = "Mark";
                }
                if ($row["IntermediateDensity"] == 1) {
                    $attr[] = "Density";
                }
                if ($row["MaskMark"] == 1) {
                    $attr[] = "Mark";
                }
                if (!empty($attr)) {
                    $name = "$name (" . implode(",", $attr) . ")";
                }
                $layersId[$row["Id"]] = $name;
            }
        } else {
            $msg["AjaxError"] = "Ошибка при получении данных на LayersId.<br>" . $mysqli->error . "<br>" . $query;
            break;
        }
        $msg["LayersId"] = $layersId;

        //Layers
        $query = ""
                . "SELECT DISTINCT"
                . " `Layer`.Layer "
                . "FROM"
                . " `Layer` ";
        if ($queryWhereText != "") {
            $query = $query . " WHERE $queryWhereText";
        }
        $query = $query . "ORDER BY `Layer`";

        $result = $mysqli->query($query);
        if ($result) {
            while ($row = $result->fetch_assoc()) {
                $layers[] = $row["Layer"];
            }
        } else {
            $msg["AjaxError"] = "Ошибка при получении данных на Layers.<br>" . $mysqli->error . "<br>" . $query;
            break;
        }
        $msg["Layers"] = $layers;
        //LayersName
        $query = ""
                . "SELECT DISTINCT"
                . " `Layer`.Name "
                . "FROM"
                . " `Layer` ";
        if ($queryWhereText != "") {
            $query = $query . " WHERE $queryWhereText";
        }
        $query = $query . "ORDER BY `Name`";

        $result = $mysqli->query($query);
        if ($result) {
            while ($row = $result->fetch_assoc()) {
                $layersName[] = $row["Name"];
            }
        } else {
            $msg["AjaxError"] = "Ошибка при получении данных на LayersName.<br>" . $mysqli->error . "<br>" . $query;
            break;
        }
        $msg["LayersName"] = $layersName;
        //Type
        $query = ""
                . "SELECT"
                . " COUNT(`Layer::Forbidding`.Id) as ForbiddingCount,"
                . " COUNT(`Layer::Suspended`.Id) as SuspendedCount,"
                . " COUNT(`Layer::Merging`.Id) as MergingCount,"
                . " COUNT(`Layer::Intermediate`.Id) as IntermediateCount,"
                . " COUNT(`Layer::Mask`.Id) as MaskCount "
                . "FROM"
                . " `Layer` "
                . " LEFT JOIN `Layer::Cad` ON `Layer::Cad`.LayerId = `Layer`.Id "
                . " LEFT JOIN `Layer::Forbidding` ON `Layer::Forbidding`.CadLayerId = `Layer::Cad`.Id "
                . " LEFT JOIN `Layer::Suspended` ON `Layer::Suspended`.CadLayerId = `Layer::Cad`.Id "
                . " LEFT JOIN `Layer::Merging` ON `Layer::Merging`.CadLayerId = `Layer::Cad`.Id "
                . " LEFT JOIN `Layer::Intermediate` ON `Layer::Intermediate`.LayerId = `Layer`.Id "
                . " LEFT JOIN `Layer::Mask` ON `Layer::Mask`.LayerId = `Layer`.Id ";
        if ($queryWhereText != "") {
            $query = $query . " WHERE $queryWhereText";
        }
        $result = $mysqli->query($query);
        if ($result) {
            while ($row = $result->fetch_assoc()) {
                if ($row["ForbiddingCount"] > 0) {
                    $types["Forbidding"] = "Forbidding - " . $row["ForbiddingCount"];
                }
                if ($row["SuspendedCount"] > 0) {
                    $types["Suspended"] = "Suspended - " . $row["SuspendedCount"];
                }
                if ($row["MergingCount"] > 0) {
                    $types["Merging"] = "Merging - " . $row["MergingCount"];
                }
                if ($row["IntermediateCount"] > 0) {
                    $types["Intermediate"] = "Intermediate - " . $row["IntermediateCount"];
                }
                if ($row["MaskCount"] > 0) {
                    $types["Mask"] = "Mask - " . $row["MaskCount"];
                }
            }
        } else {
            $msg["AjaxError"] = "Ошибка при получении данных на LayersName.<br>" . $mysqli->error . "<br>" . $query;
            break;
        }
        $msg["Types"] = $types;
        //Route
        $query = ""
                . "SELECT DISTINCT"
                . " `BaseRoute`.Id,"
                . " `BaseRoute`.Name, "
                . " `BaseRoute`.Revision "
                . "FROM"
                . " `BaseRoute` "
                . " LEFT JOIN `Layer_BaseRoute_R` ON `Layer_BaseRoute_R`.BaseRouteId = `BaseRoute`.Id "
                . " LEFT JOIN `Layer` ON `Layer`.Id = `Layer_BaseRoute_R`.LayerId "
                . "WHERE"
                . " `Layer_BaseRoute_R`.BaseRouteId IS NOT NULL ";
        if ($queryWhereText != "") {
            $query = $query . " AND $queryWhereText ";
        }
        $query = $query . "ORDER BY `Name`";

        $result = $mysqli->query($query);
        if ($result) {
            while ($row = $result->fetch_assoc()) {
                $routes[$row["Id"]] = $row["Name"] . " revision: " . $row["Revision"];
            }
        } else {
            $msg["AjaxError"] = "Ошибка при получении данных на LayersName.<br>" . $mysqli->error . "<br>" . $query;
            break;
        }
        $msg["Routes"] = $routes;
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
                $tmpRow["Name"] = $row["Name"] . " revision: " . $row['Revision'];
                $msg["RouteList"][] = $tmpRow;
            }
        } else {
            $msg['AjaxError'] = "$queryId: Ошибка в запросе.";
        }
        break;
    case "getRoutesByTechnologyForChangeLayers":
        $query = ""
                . "SELECT DISTINCT"
                . " `BaseRoute`.Id,"
                . " `BaseRoute`.`Name`, "
                . " `BaseRoute`.`Revision` "
                . "FROM"
                . " `BaseRoute` "
                . "WHERE"
                . " `BaseRoute`.Id NOT IN ("
                . " 		SELECT"
                . " 		 `BaseRoute`.Id"
                . " 		FROM"
                . " 		 `Layer_BaseRoute_R` "
                . "		 LEFT JOIN `BaseRoute` ON `BaseRoute`.Id = `Layer_BaseRoute_R`.BaseRouteId "
                . " 		WHERE"
                . " 		 `Layer_BaseRoute_R`.`LayerId` = " . $_POST['id'] . " "
                . " ) ";
        if ($_POST['technologyId'] != "") {
            $query = $query . " AND `BaseRoute`.`TechnologyId` = " . $_POST['technologyId'] . " ";
        }
        $query = $query . "ORDER BY `BaseRoute`.`Name`";

        $result = $mysqli->query($query);
        if ($result) {
            $msg["Content"]["routeList"] = "";
            while ($row = $result->fetch_assoc()) {
                $tmpRow["Id"] = $row["Id"];
                $tmpRow["Name"] = $row["Name"] . " revision: " . $row['Revision'];
                $msg["Content"]["routeList"][] = $tmpRow;
            }
        } else {
            $msg['AjaxError'] = "$queryId: Ошибка в запросе.";
        }
        break;
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
            $msg['AjaxError'] = "$queryId: Ошибка в запросе.<br>" . $mysqli->error . "<br>1<br>";
        }
        break;
    case "updateIntermdiateDensity":
        $query = ""
                . "UPDATE"
                . " `Layer::Intermediate` "
                . " LEFT JOIN `Layer` ON `Layer`.Id = `Layer::Intermediate`.LayerId "
                . "SET"
                . " `Layer::Intermediate`.`Density` = " . $_POST['density'] . " "
                . "WHERE"
                . " `Layer`.`Id` =" . $_POST['id'];
        $result = $mysqli->query($query);
        if ($result) {
            $msg["Success"] = 1;
        } else {
            $msg['AjaxError'] = "$queryId: Ошибка в запросе.<br>" . $mysqli->error . "<br>" . $query;
        }
        break;
    case "updateIntermdiateMark":
        $query = ""
                . "UPDATE"
                . " `Layer::Intermediate` "
                . " LEFT JOIN `Layer` ON `Layer`.Id = `Layer::Intermediate`.LayerId "
                . "SET"
                . " `Layer::Intermediate`.`Mark` = " . $_POST['mark'] . " "
                . "WHERE"
                . " `Layer`.`Id` =" . $_POST['id'];
        $result = $mysqli->query($query);
        if ($result) {
            $msg["Success"] = 1;
        } else {
            $msg['AjaxError'] = "$queryId: Ошибка в запросе.<br>" . $mysqli->error . "<br>" . $query;
        }
        break;
    case "updateLayer":
        $query = ""
                . "UPDATE"
                . " `Layer` "
                . "SET"
                . " `Layer`.`Layer` ='" . $_POST['layer'] . "' "
                . "WHERE"
                . " `Layer`.`Id` =" . $_POST['id'];
        $result = $mysqli->query($query);
        if ($result) {
            $msg["Success"] = 1;
        } else {
            $msg['AjaxError'] = "$queryId: Ошибка в запросе.<br>" . $mysqli->error . "<br>" . $query;
        }
        break;
    case "updateMaskMark":
        $query = ""
                . "UPDATE"
                . " `Layer::Mask` "
                . " LEFT JOIN `Layer` ON `Layer`.Id = `Layer::Mask`.LayerId "
                . "SET"
                . " `Layer::Mask`.`Mark` = " . $_POST['mark'] . " "
                . "WHERE"
                . " `Layer`.`Id` =" . $_POST['id'];
        $result = $mysqli->query($query);
        if ($result) {
            $msg["Success"] = 1;
        } else {
            $msg['AjaxError'] = "$queryId: Ошибка в запросе.<br>" . $mysqli->error . "<br>" . $query;
        }
        break;
    case "updateMergingDummy":
        $query = ""
                . "UPDATE"
                . " `Layer::Merging` "
                . " LEFT JOIN `Layer::Cad` ON `Layer::Cad`.Id = `Layer::Merging`.CadLayerId "
                . " LEFT JOIN `Layer` ON `Layer`.Id = `Layer::Cad`.LayerId "
                . "SET"
                . " `Layer::Merging`.`Dummy` = " . $_POST['dummy'] . " "
                . "WHERE"
                . " `Layer`.`Id` =" . $_POST['id'];
        $result = $mysqli->query($query);
        if ($result) {
            $msg["Success"] = 1;
        } else {
            $msg['AjaxError'] = "$queryId: Ошибка в запросе.<br>" . $mysqli->error . "<br>" . $query;
        }
        break;
    case "updateMergingBase":
        $query = ""
                . "UPDATE"
                . " `Layer::Merging` "
                . " LEFT JOIN `Layer::Cad` ON `Layer::Cad`.Id = `Layer::Merging`.CadLayerId "
                . " LEFT JOIN `Layer` ON `Layer`.Id = `Layer::Cad`.LayerId "
                . "SET"
                . " `Layer::Merging`.`Base` = " . $_POST['base'] . " "
                . "WHERE"
                . " `Layer`.`Id` =" . $_POST['id'];
        $result = $mysqli->query($query);
        if ($result) {
            $msg["Success"] = 1;
        } else {
            $msg['AjaxError'] = "$queryId: Ошибка в запросе.<br>" . $mysqli->error . "<br>" . $query;
        }
        break;
    case "updateName":
        $query = ""
                . "UPDATE"
                . " `Layer` "
                . "SET"
                . " `Layer`.`Name` ='" . $_POST['name'] . "' "
                . "WHERE"
                . " `Layer`.`Id` =" . $_POST['id'];
        $result = $mysqli->query($query);
        if ($result) {
            $msg["Success"] = 1;
        } else {
            $msg['AjaxError'] = "$queryId: Ошибка в запросе.<br>" . $mysqli->error . "<br>" . $query;
        }
        break;    
    case "uploadStremInOut" :
        if (is_uploaded_file($_FILES["filename"]["tmp_name"])) {
            $text = fopen($_FILES["filename"]["tmp_name"], "r");
            $array = null;
            if ($text) {
                while (($buffer = fgets($text)) !== false) {
                    if (substr($buffer, 0, 1) != "#") {
                        $layerInfo = preg_split("/[\s,]+/", $buffer);
                        $layer["layer"] = $layerInfo[2] . "." . $layerInfo[3];
                        $layer["name"] = $layerInfo[0] . "_" . $layerInfo[1];

                        $query = "SELECT"
                                . " `Layer`.Id,"
                                . " `Layer::Forbidding`.Id as ForbiddingId,"
                                . " `Layer::Suspended`.Id as SuspendedId,"
                                . " `Layer::Merging`.Id as MergingId,"
                                . " `Layer::Merging`.Base,"
                                . " `Layer::Merging`.Dummy "
                                . "FROM"
                                . " `Layer`"
                                . " LEFT JOIN `Layer::Cad` ON `Layer::Cad`.LayerId = `Layer`.Id"
                                . " LEFT JOIN `Layer::Forbidding` ON `Layer::Forbidding`.CadLayerId = `Layer::Cad`.Id"
                                . " LEFT JOIN `Layer::Suspended` ON `Layer::Suspended`.CadLayerId = `Layer::Cad`.Id"
                                . " LEFT JOIN `Layer::Merging` ON `Layer::Merging`.CadLayerId = `Layer::Cad`.Id "
                                . "WHERE"
                                . " `Layer`.`Layer`=" . $layer['layer'] . " AND "
                                . " `Layer`.`Name`='" . $layer['name'] . "' AND "
                                . " `Layer`.`BaseRouteId` =" .$_POST["baseroute"]. " AND "
                                . " `Layer::Cad`.Id IS NOT NULL"
                                . "";
                        $result = $mysqli->query($query);
                        if ($result) {
                            if ($result->num_rows > 0) {
                                while ($row = $result->fetch_assoc()) {
                                    $layer["id"] = $row["Id"];
                                    $layer["type"] = "";
                                    $layer["base"] = "";
                                    $layer["dummy"] = "";
                                    $layer["baseroute"] = 0;

                                    if ($row["ForbiddingId"] != NULL) {
                                        $layer["type"] = "Forbidding";
                                    }
                                    if ($row["SuspendedId"] != NULL) {
                                        $layer["type"] = "Suspended";
                                    }
                                    if ($row["MergingId"] != NULL) {
                                        $layer["type"] = "Merging";
                                    }
                                    if ($row["Base"] == 1) {
                                        $layer["base"] = "+";
                                    }
                                    if ($row["Dummy"] == 1) {
                                        $layer["dummy"] = "+";
                                    }

                                    $queryBR = ""
                                            . "SELECT"
                                            . " `Layer_BaseRoute_R`.Id "
                                            . "FROM"
                                            . " `Layer_BaseRoute_R` "
                                            . "WHERE"
                                            . " `Layer_BaseRoute_R`.LayerId=" . $row['Id'] . " AND "
                                            . " `Layer_BaseRoute_R`.BaseRouteId=" . $_POST['baseroute'] . ""
                                            . "";
                                    $resultBR = $mysqli->query($queryBR);
                                    if ($resultBR->num_rows > 0) {
                                        $layer['baseroute'] = 1;
                                    }
                                    //$layer['baseroute'] = $queryBR;
                                    $array[] = $layer;
                                }
                            } else {
                                $layer["id"] = "";
                                $layer["type"] = "";
                                $layer["base"] = "";
                                $layer["dummy"] = "";
                                $layer["baseroute"] = 0;
                                $array[] = $layer;
                            }
                        } else {
                            $layer["type"] = "$queryId: Ошибка получения данных по слою.<br>" . $mysqli->error . "<br>$query";
                        }
                    }
                }
            }
            fclose($text);

            $msg["Content"] = $array;
        } else {
            $msg["AjaxError"] = "Не удалось загрузить файл на сервер.";
        }
        break;
    default:
        $msg['AjaxError'] = "Не корректный ключ запроса.";
}

echo json_encode($msg);
?>
