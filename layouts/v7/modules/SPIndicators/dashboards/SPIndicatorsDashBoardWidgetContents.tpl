{*<!--
/*+**********************************************************************************
 * Key Performance Indicators by SalesPlatform
 * Copyright (C) 2011-2016 SalesPlatform Ltd
 * All Rights Reserved.
 * This extension is licensed to be used within one instance of Vtiger CRM.
 * Source code or binaries may not be redistributed unless expressly permitted by SalesPlatform Ltd.
 * If you have any questions or comments, please email: extensions@salesplatform.ru
 ************************************************************************************/
-->*}
{strip}
{if count($DATA) gt 0 }
    <div class="widgetChartContainer {*if $IS_REPORT_VIEW} spWidgetDetailFullContainer {else} *}spWidgetHomeFullContainer {*/if*}">
       {foreach item=INDICATOR_ROW from=$DATA}
            <div class="spIndicatorRow">
                <div class="spIndicatorLabel">{$INDICATOR_ROW.indicatorModel->getName()}</div>
                <div class="{if $IS_REPORT_VIEW} spIndicatorValueFull {else} spIndicatorValue {/if}">{$INDICATOR_ROW.count} {$INDICATOR_ROW.indicatorModel->get('usage_unit')}</div>
                <input type="hidden" value="{$INDICATOR_ROW.indicatorModel->get('description')}">
            </div>
        {/foreach} 
    </div>
{else if $DATA_ERROR eq true}
    <span class="noDataMsg">
        {vtranslate('LBL_PARSE_ERROR', $MODULE_NAME)}
    </span>    
{else}
	<span class="noDataMsg">
        {vtranslate('LBL_NO')} {vtranslate($MODULE_NAME, $MODULE_NAME)} {vtranslate('LBL_MATCHED_THIS_CRITERIA')}
	</span>
{/if}
{/strip}