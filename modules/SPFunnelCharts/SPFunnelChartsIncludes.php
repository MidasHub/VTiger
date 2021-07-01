<?php
/*+**********************************************************************************
 * Advanced Funnel Charts by SalesPlatform
 * Copyright (C) 2011-2016 SalesPlatform Ltd
 * All Rights Reserved.
 * This extension is licensed to be used within one instance of Vtiger CRM.
 * Source code or binaries may not be redistributed unless expressly permitted by SalesPlatform Ltd.
 * If you have any questions or comments, please email: extensions@salesplatform.ru
 ************************************************************************************/

require_once 'modules/SPFunnelCharts/SPFunnelChartsWidgetExtensions.php';

class SPFunnelCharts_CheckDuplicate_Action extends SPFunnelChartsWidgetExtensions_CheckDuplicate_Action {}

class SPFunnelCharts_DeleteAjax_Action extends SPFunnelChartsWidgetExtensions_DeleteAjax_Action {}

class SPFunnelCharts_MassDelete_Action extends SPFunnelChartsWidgetExtensions_MassDelete_Action  {}

class SPFunnelCharts_Save_Action extends SPFunnelChartsWidgetExtensions_Save_Action {}

class SPFunnelCharts_SPFunnelCharts_Dashboard extends SPFunnelChartsWidgetExtensions_SPFunnelChartsWidgetExtensions_Dashboard {
    
    protected function getAdditionalScripts() {
        global $default_layout;
        $jsFileNames = array(
            "~/layouts/$default_layout/modules/SPFunnelCharts/resources/dashboards/SalesFunnelRenderer.js",
            "~/layouts/$default_layout/modules/SPFunnelCharts/resources/dashboards/SalesFunnelWidget.js",
        );
        return $this->checkAndConvertJsScripts($jsFileNames);
    }
    
    protected function getDashBoardWidgetTPL() {
        return 'dashboards/SalesFunnelWidget.tpl';
    }
    
    protected function getDashBoardWidgetContentsTPL() {
        return 'dashboards/DashBoardWidgetContents.tpl';
    }
    
    protected function getReportViewWidgetContentsTPL() {
        return 'dashboards/SalesFunnelBigWidgetContents.tpl';
    }

    protected function getReportViewWidgetTPL() {
        return 'dashboards/SalesFunnelBigWidget.tpl';
    }
}

class SPFunnelCharts_DetailView_Model extends SPFunnelChartsWidgetExtensions_DetailView_Model {}

class SPFunnelCharts_Field_Model extends Vtiger_Field_Model {}

class SPFunnelCharts_ListView_Model extends SPFunnelChartsWidgetExtensions_ListView_Model {}

class SPFunnelCharts_Module_Model extends SPFunnelChartsWidgetExtensions_Module_Model {
    
    public function getMainTableName() {
        return 'vtiger_sp_sales_funnel';
    }

    public function getReportsStagesTableName() {
        return 'vtiger_sp_sales_funnel_stages';
    }
}

class SPFunnelCharts_Record_Model extends SPFunnelChartsWidgetExtensions_Record_Model {
    
    public function getData($reportsParams) {
        $data = parent::getData($reportsParams);
        foreach($data as $funnelStepIndex => $funnelStepData) {
            $data[$funnelStepIndex]['count'] = (int) $funnelStepData['count'];
        }
        
        return $data;
    }
    
    protected function getFrontEndWidgetName() {
        return 'SPFunnelCharts';
    }
}

class SPFunnelCharts_Detail_View extends SPFunnelChartsWidgetExtensions_Detail_View {
    
    public function getHeaderScripts(Vtiger_Request $request) {
        $jsInstancies = $this->checkAndConvertJsScripts(array(
            'modules.SPFunnelCharts.resources.dashboards.SalesFunnelRenderer',
            'modules.SPFunnelCharts.resources.dashboards.SalesFunnelWidget'
        ));
        
        return array_merge(parent::getHeaderScripts($request), $jsInstancies);
    }
}

class SPFunnelCharts_Edit_View extends SPFunnelChartsWidgetExtensions_Edit_View {}

class SPFunnelCharts_List_View extends SPFunnelChartsWidgetExtensions_List_View {}

class SPFunnelCharts_ListAjax_View extends SPFunnelChartsWidgetExtensions_ListAjax_View {}
