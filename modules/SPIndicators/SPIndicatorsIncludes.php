<?php
/*+**********************************************************************************
 * Key Performance Indicators by SalesPlatform
 * Copyright (C) 2011-2016 SalesPlatform Ltd
 * All Rights Reserved.
 * This extension is licensed to be used within one instance of Vtiger CRM.
 * Source code or binaries may not be redistributed unless expressly permitted by SalesPlatform Ltd.
 * If you have any questions or comments, please email: extensions@salesplatform.ru
 ************************************************************************************/

require_once 'modules/SPIndicators/SPIndicatorsWidgetExtensions.php';
require_once 'modules/com_vtiger_workflow/expression_engine/VTTokenizer.inc';
require_once 'modules/com_vtiger_workflow/expression_engine/VTParser.inc';
require_once 'modules/com_vtiger_workflow/expression_engine/VTExpressionEvaluater.inc';

class SPIndicators_CheckDuplicate_Action extends SPIndicatorsWidgetExtensions_CheckDuplicate_Action {}

class SPIndicators_DeleteAjax_Action extends SPIndicatorsWidgetExtensions_DeleteAjax_Action {}

class SPIndicators_MassDelete_Action extends SPIndicatorsWidgetExtensions_MassDelete_Action {}

class SPIndicators_Save_Action extends SPIndicatorsWidgetExtensions_Save_Action {}

class SPIndicators_SPIndicators_Dashboard extends SPIndicatorsWidgetExtensions_SPIndicatorsWidgetExtensions_Dashboard {
      
    protected function getAdditionalScripts() {
        global $default_layout;
         $jsFileNames = array(
            "~/layouts/$default_layout/modules/SPIndicators/resources/dashboards/SPIndicatorsWidget.js"
        );
        return $this->checkAndConvertJsScripts($jsFileNames);
    }

    protected function getDashBoardWidgetTPL() {
        return 'dashboards/SPIndicatorsDashBoard.tpl';
    }
    
    protected function getDashBoardWidgetContentsTPL() {
        return 'dashboards/SPIndicatorsDashBoardWidgetContents.tpl';
    }
    
    protected function getReportViewWidgetContentsTPL() {
        return 'dashboards/SPIndicatorsDashBoardWidgetContents.tpl';
    }

    protected function getReportViewWidgetTPL() {
        return 'dashboards/SPIndicatorsDashBoard.tpl';
    }

}

class SPIndicators_DetailView_Model extends SPIndicatorsWidgetExtensions_DetailView_Model {}

class SPIndicators_ListView_Model extends SPIndicatorsWidgetExtensions_ListView_Model {}

class SPIndicators_Module_Model extends SPIndicatorsWidgetExtensions_Module_Model {
    
    public function getMainTableName() {
        return 'vtiger_sp_indicators';
    }

    public function getReportsStagesTableName() {
        return 'vtiger_sp_indicators_stages';
    }

}

class SPIndicators_Record_Model extends SPIndicatorsWidgetExtensions_Record_Model {
    
    public function getSaveFieldsNames() {
        return array('name', 'description', 'layers', 'members');
    }
    
    /**
     * Save info about reports which use in plot
     */
    protected function savePlotReports() {
        $db = PearDatabase::getInstance();
        $moduleModel = $this->getModule();
        $db->pquery("DELETE FROM " . $moduleModel->getReportsStagesTableName() . " WHERE record_id=?", array($this->getId()));
        
        $layers = $this->get('layers');       
        if( !empty($layers) ) {
            $params = array();
            $sql = "INSERT INTO " . $moduleModel->getReportsStagesTableName() . " VALUES";
            foreach ($layers as $sequence => $layerDetails) {
                $sql .= "(?,?,?,?,?,?,?),";
                $params[] = $this->getId();
                $params[] = $layerDetails['name'];
                $params[] = $layerDetails['usage_unit'];
                $params[] = ($layerDetails['round'] == null) ? NULL : $layerDetails['round'];
                $params[] = $layerDetails['description'];
                $str_rep = str_replace('&lt;', '<', $layerDetails['calculate_expression']);
                $str_rep = str_replace('&gt;', '>', $str_rep);
                $params[] = $str_rep;
                $params[] = $sequence;
            }
            $db->pquery(substr($sql, 0, -1), $params);  
        }
    }
    
    protected function getFrontEndWidgetName() {
        return 'SPIndicators';
    }
}

class SPIndicators_Detail_View extends SPIndicatorsWidgetExtensions_Detail_View {}

class SPIndicators_Edit_View extends SPIndicatorsWidgetExtensions_Edit_View {
    
    public function process(Vtiger_Request $request) {
        $record = $request->get('record');
        $moduleName = $request->getModule();
        $recordModel = SPIndicatorsWidgetExtensions_Record_Model::getCleanInstance($moduleName);
        if($record != null) {
            $recordModel = SPIndicatorsWidgetExtensions_Record_Model::getInstanceById($record, $moduleName);
        }
        
        $viewer = $this->getViewer($request);
        $viewer->assign('EXPRESSION_MODULE', 'Settings:Workflows');
        
        parent::process($request);
    }
}

class SPIndicators_List_View extends SPIndicatorsWidgetExtensions_List_View {}

class SPIndicators_ListAjax_View extends SPIndicatorsWidgetExtensions_ListAjax_View {}