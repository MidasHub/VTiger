{*<!--
/*+**********************************************************************************
 * Advanced Funnel Charts by SalesPlatform
 * Copyright (C) 2011-2016 SalesPlatform Ltd
 * All Rights Reserved.
 * This extension is licensed to be used within one instance of Vtiger CRM.
 * Source code or binaries may not be redistributed unless expressly permitted by SalesPlatform Ltd.
 * If you have any questions or comments, please email: extensions@salesplatform.ru
 ************************************************************************************/
-->*}
{strip}
{if count($DATA) gt 0 }
    <input class="widgetData" value="{Vtiger_Util_Helper::toSafeHTML(ZEND_JSON::encode($DATA))}" type="hidden">
    <div class="widgetChartContainer" style="height:640px;width:90%;margin: auto;"></div>
{else}
    <div class="noDataMsg spNoDataContainer">
        {vtranslate('LBL_NO')} {vtranslate($MODULE_NAME, $MODULE_NAME)} {vtranslate('LBL_MATCHED_THIS_CRITERIA')}
    </div>
{/if}
{/strip}