<?php
/*+**********************************************************************************
 * Key Performance Indicators by SalesPlatform
 * Copyright (C) 2011-2016 SalesPlatform Ltd
 * All Rights Reserved.
 * This extension is licensed to be used within one instance of Vtiger CRM.
 * Source code or binaries may not be redistributed unless expressly permitted by SalesPlatform Ltd.
 * If you have any questions or comments, please email: extensions@salesplatform.ru
 ************************************************************************************/

class SPIndicators {
    function vtlib_handler($moduleName, $event_type) {
        if($event_type == 'module.postinstall') {
            global $default_layout;
            if ($default_layout=="v7"){
            	Settings_MenuEditor_Module_Model::updateModuleApp($moduleName, "SALES", "ANALYTICS");
            }
        } else if($event_type == 'module.disabled') {

        } else if($event_type == 'module.enabled') {
            
        } else if($event_type == 'module.preuninstall') {
            
            /* Delete module tables */
            $db = PearDatabase::getInstance();
            $db->query("DROP TABLE vtiger_sp_indicators");
            $db->query("DROP TABLE vtiger_sp_indicators_seq");
            $db->query("DROP TABLE vtiger_sp_indicators_stages");
            
            /* Remove module links */
            $moduleTabId = getTabid('Home');
            foreach(Vtiger_Link::getAllForExport($moduleTabId) as $linkModel) {
                if(strpos($linkModel->linkurl, "module=SPIndicators") !== false) {
                    Vtiger_Link::deleteLink(
                        $linkModel->tabid,
                        $linkModel->linktype,
                        $linkModel->linklabel,
                        $linkModel->linkurl
                    );
                }
            }
            
        } else if($event_type == 'module.preupdate') {

        } else if($event_type == 'module.postupdate') {
            
            /* Migrate existed widgets to new data structure */
            $allMembers = array();
            foreach(SPIndicators_Record_Model::getAllCalculateMembers() as $membersList) {
                foreach($membersList as $memberModel) {
                    $allMembers[] = $memberModel->getId();         
                }
            }
            $allMembersJson = json_encode($allMembers);
            
            $db = PearDatabase::getInstance();
            $indicatorsList = SPIndicators_Record_Model::getAll("SPIndicators");
            foreach($indicatorsList as $indicator) {
                $db->pquery("INSERT INTO vtiger_sp_indicators_calculate_members VALUES(?,?)", array($indicator->getId(), $allMembersJson));
            }
        }
    }
    
    /**
     * For widget display of last records actions without fails.
     */
    function getNonAdminAccessControlQuery($module, $user, $scope='') {
        return null;
    }
}