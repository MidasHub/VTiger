<html>
	<head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8" ><title>Demo</title></head>
<body>

<?php
/***********************************************************************************
* CRM Remote Access
* Version: 1.0
* Copyright (C) crm-now GmbH
* All Rights Reserved
* www.crm-now.de
************************************************************************************/
ini_set('display_errors',1);
error_reporting(E_ALL^E_NOTICE);

//Include WebRequest performer module class to handle posts and gets
// e.g. from http://pear.php.net/package/HTTP_Client/download/1.2.1/
// here we use the Net_Client class from the CRM
require_once("vtlib/Vtiger/Net/Client.php");
//Include ZEND Json module (you may use the PHP json functions also)
require_once("include/Zend/Json.php");

//webservice class
class CRMwebrequests {
	var $endpointUrl;
	var $userName;
	var $userKey;
	var $token;
	
	//constructor saves the values
	function __construct($url, $name, $key) {
		$this->endpointUrl=$url;
		$this->userName=$name;
		$this->userKey=$key;
		$this->token=0;
	}

	function getChallenge() {
		//create webrequest performer
		$httpc = new Vtiger_Net_Client($this->endpointUrl);
		//GET request
		$params["operation"]="getchallenge";
		$params["username"]=$this->userName;
		$response = $httpc->doGet($params);
		$httpc->disconnect();
		//extract information from response
		$jsonResponse = Zend_JSON::decode($response);
		if($jsonResponse["success"]==false)
		//exit if something went wrong
		die("getChallenge failed:".$jsonResponse["error"]["message"]."<br>");

		$challengeToken = $jsonResponse["result"]["token"];

		return $challengeToken;
	}

	function Login() {
		$token = $this->getChallenge();
		//create md5 string containing user accesskey from my preference page
		//and the challenge token obtained from get challenge result
		$generatedKey = md5($token.$this->userKey);
		$httpc = new Vtiger_Net_Client($this->endpointUrl);
		//POST containing array
		$response = $httpc->doPost(
				array("operation"=>"login", "username"=>$this->userName,
				"accessKey"=>$generatedKey));
		$httpc->disconnect();
		$jsonResponse = Zend_JSON::decode($response);
		if($jsonResponse["success"]==false) {		
			die("Login failed:".$jsonResponse["error"]["message"]."<br>Token:".$token."<br>");
		}
		$sessionId = $jsonResponse["result"]["sessionName"];
		//save session id
		$this->token=$sessionId;
		return true;
	}
	
	function Query($query) {
		//handle "special" characters
		$queryParam = ($query);
		$params = array("sessionName"=>$this->token,"operation"=>"query", "query"=>$queryParam);
		$httpc = new Vtiger_Net_Client($this->endpointUrl);
		$response = $httpc->doGet($params);
		$jsonResponse = Zend_JSON::decode($response);
		if($jsonResponse["success"]==false) {
			die("Query failed:".$jsonResponse["error"]["message"]);
		}
		//Array of retrieved objects
		$retrievedObjects = $jsonResponse["result"];
		return $retrievedObjects;
	}

	function listTypes () {
		$params = array("sessionName"=>$this->token,"operation"=>"listtypes");
		$httpc = new Vtiger_Net_Client($this->endpointUrl);
		$response = $httpc->doGet($params);
		$jsonResponse = Zend_JSON::decode($response);
		if($jsonResponse["success"]==false) {
			die("Query failed:".$jsonResponse["error"]["message"]);
		}
		//Array of retrieved objects
		$retrievedObjects = $jsonResponse["result"]['types'];
		return $retrievedObjects;
	}
	
	function describe($moduleType) {
		//handle "special" characters
		$queryParam = ($moduleType);
		$params = array("sessionName"=>$this->token,"operation"=>"describe", "elementType"=>$queryParam);
		$httpc = new Vtiger_Net_Client($this->endpointUrl);
		$response = $httpc->doGet($params);
		$jsonResponse = Zend_JSON::decode($response);
		if($jsonResponse["success"]==false) {
			die("Query failed:".$jsonResponse["error"]["message"]);
		}
		//Array of retrieved objects
		$retrievedObjects = $jsonResponse["result"];
		return $retrievedObjects;
	}

	function LogOut() {
		$params = array("operation"=>"logout","sessionName"=>$this->token);
		$httpc = new Vtiger_Net_Client($this->endpointUrl);
		$response = $httpc->doGet($params);
		$jsonResponse = Zend_JSON::decode($response);
		if($jsonResponse["success"]==false) {
			//handle the failure case.
			die("Logout failed:".$jsonResponse["error"]["message"]);
		}
		return true;
	}
}
// start getting contents
$CRMurl = 'http://localhost/vtigercrm/';
//access key from admin
$APPkey = 'Nugw9ou5hGMCBsBQ';
//Constructor needs URL, UserName, UserKey (get it from My Settings Page)
//ADVISE: use a CRM user that has limited rights, e.g. Read Only Leads, Accounts, Potentials or Products
$crmobject = new CRMwebrequests($CRMurl."/webservice.php", "midasit", $APPkey);
//only do the tasks if the Login was successful
if ($crmobject->Login()) {
	//listtypes
	//list all types accessible by web service
	$listTypes = $crmobject->listTypes();
	echo "<b>Modules which can be reached</b><br>";
	echo "<table border='1'>";
	foreach ($listTypes as $value){
		echo "<tr>";
			echo "<td>".$value."</td>";
		echo "</tr>";
	}
	echo "</table></br>";

	//describe
	//list the properties of a specific module
	$describe = $crmobject->describe('Calendar');
	echo "<b>Calendar Fields:</b><br>";
	echo "<table border='1'>";
		echo "<tr>";
			echo "<th>Field Label</th>";
			echo "<th>Field Name</th>";
		echo "</tr>";
	foreach ($describe as $pkey => $value){
		//show field properties
		if ($pkey == 'fields') {
			foreach ($describe['fields'] as $fkey => $fvalue){
				echo "<tr>";
					echo "<td>".$fvalue['label']."</td>";
					echo "<td>".$fvalue['name']."</td>";
				echo "</tr>";
			}
		}
	}
	echo "</table></br>";
	
	//list Calendar Entries (tasks)
	//max. 100 entries, if more than loop
	$wsquery = "SELECT * FROM Calendar where date_start >'2014-01-01' LIMIT 100;";
	$Details = $crmobject->Query($wsquery);
	
	//Create table entries for every Product
	echo "<b>Calendar</b><br>";
		echo "<table border='1'>";
			echo "<tr>";
				echo "<th>ID</th>";
				echo "<th>Start Date</th>";
				echo "<th>Time</th>";
				echo "<th>Status</th>";
				echo "<th>Description</th>";
			echo "</tr>";
		foreach ($Details as $value){
			echo "<tr>";
				echo "<td>".$value["id"]."</td>";
				echo "<td>".$value["due_date"]."</td>";
				echo "<td>".$value["time_start"]."</td>";
				echo "<td>".$value["taskstatus"]."</td>";
				echo "<td>".$value["description"]."</td>";
			echo "</tr>";
		}
		echo "</table></br>";
	
	
	
	//Perform Logout to render the session id invalid
	$crmobject->LogOut();
}
else {
	echo "ups, so geht das nicht, Login notwendig";
}
?>
</body>
</html>