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
<div class="popupUi modal hide" data-backdrop="false" style="z-index: 1000006;min-width: 800px; max-height: 1200px; overflow: visible">
	<div class="modal-header contentsBackground">
		<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
		<h3>{vtranslate('LBL_SET_VALUE', $EXPRESSION_MODULE)}</h3>
	</div>
    <form id="indicatorForm">
	<div class="modal-body">
        
            <div class="row-fluid marginBottom10px">
                <div class="row-fluid padding1per">
                    <span class="span2">{vtranslate('LBL_NAME', $MODULE)}<span class="redColor">*</span></span>
                    <span class="span4">
                        <input class="span4" data-validation-engine='validate[required]' type="text" name="name" value=""/>
                    </span>
                </div>
                <div class="row-fluid padding1per">
                    <span class="span2">{vtranslate('LBL_USAGE_UNIT', $MODULE)}</span>
                    <span class="span4">
                        <input class="span4" type="text" name="usage_unit" value=""/>
                    </span>
                </div>
                <div class="row-fluid padding1per">
                    <span class="span2">{vtranslate('LBL_ROUND', $MODULE)}</span>
                    <span class="span4">
                        <input class="span4" type="text" name="round" 
                               data-validation-engine='validate[funcCall[Vtiger_Base_Validator_Js.invokeValidation]]'
                               data-fieldinfo='{ldelim}"mandatory":false,"presence":true,"quickcreate":false,"masseditable":true,"defaultvalue":false,"type":"integer","name":"indicator_round","label":"{vtranslate('LBL_ROUND', $MODULE)}"{rdelim}'
                               value=""/>
                    </span>
                </div>
                <div class="row-fluid padding1per">
                    <span class="span2">{vtranslate('LBL_DESCRIPTION', $MODULE)}</span>
                    <span class="span6">
                        <textarea name="description"></textarea>
                    </span>
                </div>
                <br>
                <div class="row-fluid padding1per">
                    <div class="expressionPicklist">
                        <div class="half">
                            <label>{vtranslate('LBL_FOLDER', $MODULE)}</label>
                            <select name="folder" id="folder" class="chzn-select"> 
                                {foreach item=REPORT_FOLDER_NAME from=array_keys($REPORTS_CALCULATIONS_TYPES)}
                                    <option value="{$REPORT_FOLDER_NAME}" {if $REPORT_FOLDER_NAME eq vtranslate('All')} selected {/if}>{$REPORT_FOLDER_NAME}</option>
                                {/foreach}
                            </select>
                        </div>
                        <div class="half">    
                            <label>{vtranslate('LBL_AVAILABLE_REPORTS_VALUES', $MODULE)}</label>
                            <select name="useReportValue" id="useReportValue" class="chzn-select"> 
                                <option value="" default selected>{vtranslate('LBL_CHOOSE', $MODULE)}</option>
                                {assign var="ALL_REPORT_TYPES_MAPPING" value=$REPORTS_CALCULATIONS_TYPES[vtranslate('All')]}
                                {foreach item=CALCULATION_TYPE from=$ALL_REPORT_TYPES_MAPPING}
                                    <option value="{$CALCULATION_TYPE.key}">{$CALCULATION_TYPE.name}</option>
                                {/foreach}
                            </select>
                        </div>
                    </div>  
                </div>
                <div class="row-fluid padding1per">
                    <textarea id="expression" data-validation-engine='validate[required]' name="calculate_expression" data-textarea="true" class="fieldValue row-fluid"></textarea>
                </div>
                <div class="row-fluid padding1per">
                    <div id="expression_help" class="alert alert-info helpmessagebox">
                        <p><h5>{vtranslate('LBL_EXAMPLE_EXPRESSION', $MODULE)}</h5></p>
                        <p>{vtranslate('LBL_EXPRESSION_DEMO', $MODULE)}</p>
                    </div>
                </div>
            </div>
	</div>
    <div class="modal-footer">
        <div class=" pull-right cancelLinkContainer">
            <a class="cancelLink closeModal" type="button">{vtranslate('LBL_CANCEL', $MODULE)}</a>
        </div>
        <button class="btn btn-success" type="button" name="saveButton"><strong>{vtranslate('LBL_SAVE', $MODULE)}</strong></button>
    </div>
    </form>
</div>
{/strip}