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
    <div class="popupUi modal modal-lg" data-backdrop="false" style="z-index: 0; max-width: 60%; max-height: 1200px;  overflow: visible">
        <ul style="position: relative; left: 25%; top: 10%">
	<div class="modal-header contentsBackground">
		<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
		<h3>{vtranslate('LBL_SET_VALUE', $EXPRESSION_MODULE)}</h3>
	</div>
    <form id="indicatorForm">
	<div class="modal-body">
        
            <div class="row marginBottom10px">
                <div class="row padding1per">
                    <div class="col-md-2">{vtranslate('LBL_NAME', $MODULE)}<span class="redColor">*</span></div>
                    <div class="col-md-3">
                        <input class="inputElement" id="expression_edit_name" type="text" name="name" value=""/>
                    </div>
                </div>
                <div class="row padding1per">
                    <div class="col-md-2">{vtranslate('LBL_USAGE_UNIT', $MODULE)}</div>
                    <div class="col-md-3">
                        <input class="inputElement" type="text" name="usage_unit" value=""/>
                    </div>
                </div>
                <div class="row padding1per">
                    <div class="col-md-2">{vtranslate('LBL_ROUND', $MODULE)}</div>
                    <div class="col-md-3">
                        <input class="inputElement" type="text" name="round" id="expression_edit_round"
                               data-fieldinfo='{ldelim}"mandatory":false,"presence":true,"quickcreate":false,"masseditable":true,"defaultvalue":false,"type":"integer","name":"indicator_round","label":"{vtranslate('LBL_ROUND', $MODULE)}"{rdelim}'
                               value=""/>
                    </div>
                </div>
                <div class="row padding1per">
                    <div class="col-md-2">{vtranslate('LBL_DESCRIPTION', $MODULE)}</div>
                    <div class="col-md-6">
                        <textarea class="inputElement" style="min-height: 100px;" name="description"></textarea>
                    </div>
                </div>
                <br>
                <div class="row padding1per">
                    <div class="expressionPicklist">
                        <div class="col-md-2">
                            <label>{vtranslate('LBL_FOLDER', $MODULE)}</label>
                            <select name="folder" id="folder" class="select2" style="width:170px; margin-bottom:0px;"> 
                                {foreach item=REPORT_FOLDER_NAME from=array_keys($REPORTS_CALCULATIONS_TYPES)}
                                    <option value="{$REPORT_FOLDER_NAME}" {if $REPORT_FOLDER_NAME eq vtranslate('All')} selected {/if}>{$REPORT_FOLDER_NAME}</option>
                                {/foreach}
                            </select>
                        </div>
                        <div class="col-md-3" style="margin-left: 160px;">
                       
                            <label>{vtranslate('LBL_AVAILABLE_REPORTS_VALUES', $MODULE)}</label>
                            <select name="useReportValue" id="useReportValue" class="select2" style="width:270px; margin-bottom:0px"> 
                                <option value="" default selected>{vtranslate('LBL_CHOOSE', $MODULE)}</option>
                                {assign var="ALL_REPORT_TYPES_MAPPING" value=$REPORTS_CALCULATIONS_TYPES[vtranslate('All')]}
                                {foreach item=CALCULATION_TYPE from=$ALL_REPORT_TYPES_MAPPING}
                                    <option value="{$CALCULATION_TYPE.key}">{$CALCULATION_TYPE.name}</option>
                                {/foreach}
                            </select>
                        
                        </div>
                    </div>  
                </div>
                    <div class="row padding1per">   
                            <textarea id="expression" class="inputElement expression" style="max-width: 97%" name="calculate_expression" data-textarea="true"></textarea>
                    </div>
                <div class="row padding1per">
                    <div class="col-md-12">
                        <div id="expression_help" class="alert alert-info helpmessagebox">
                            <p><h5>{vtranslate('LBL_EXAMPLE_EXPRESSION', $MODULE)}</h5></p>
                            <p>{vtranslate('LBL_EXPRESSION_DEMO', $MODULE)}</p>
                        </div>
                    </div>
                </div>
            </div>
	</div>
                    
      <div class="modal-footer">
          <div class='textAlignCenter col-lg-12 col-md-12 col-sm-12 '>
              <button class="btn btn-success" type="button" name="saveButton"><strong>{vtranslate('LBL_SAVE', $MODULE)}</strong></button>
            <a class="cancelLink closeModal" type="button">{vtranslate('LBL_CANCEL', $MODULE)}</a>
        </div>
    </div>
    </form>
        </ul>
    
    </div>
{/strip}