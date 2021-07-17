{*<!--
/* ********************************************************************************
* The content of this file is subject to the Predictive Fields/Bills ("License");
* You may not use this file except in compliance with the License
* The Initial Developer of the Original Code is VTExperts.com
* Portions created by VTExperts.com. are Copyright(C) VTExperts.com.
* All Rights Reserved.
* ****************************************************************************** */
-->*}
<style>
    .listview-table > tbody > tr > td{
    vertical-align: top!important;
}
</style>
{strip}
<div class="container-fluid WidgetsManage">
    <link type="text/css" rel="stylesheet" href="libraries/jquery/colorpicker/css/colorpicker.css" media="screen">
    <script type="text/javascript" src="libraries/jquery/colorpicker/js/colorpicker.js"></script>
    <div class="widget_header row">
        <div class="col-sm-6"><h4><label>{vtranslate('Predictive Fields', 'VTEPredictiveFields')}</label>
        </div>
    </div>
    <hr>
    <div class="clearfix"></div>
    <div class="editViewPageDiv">
        <form id="EditView" action="index.php" method="post" name="EditVTEPredictiveFields">
            <input type="hidden" name="module" id="module" value="{$MODULE}">
            <input type="hidden" name="action" value="SavePredictiveFields" />
            <input type="hidden" name="record" id="record" value="{$RECORD}">
            <input type="hidden" name="added_field" id="added_field" value="0">
            <div class="col-sm-12 col-xs-12">
                <div class="col-sm-6 col-xs-6 form-horizontal">
                    <div class="form-group">
                        <label for="custom_expenses_module" class="control-label col-sm-3">
                            <span>{vtranslate('Module', 'VTEPredictiveFields')}</span>
                            <span class="redColor">*</span>
                        </label>
                        <div class="col-sm-8">
                            <select class="inputElement select2" id="custom_module" name="custom_module" data-rule-required="true">
                                <option value="">{vtranslate('Select an Option', 'VTEPredictiveFields')}</option>
                                {foreach item=MODULE_VALUES from=$ALL_MODULES}
                                    <option value="{$MODULE_VALUES->name}" {if $MODULE_VALUES->name eq $RECORDENTRIES['module']}selected{/if}>{vtranslate($MODULE_VALUES->label,$MODULE_VALUES->name)}</option>
                                {/foreach}
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="last_x_days" class="control-label col-sm-3">
                            <span>{vtranslate('Analyze Last X Days', 'VTEPredictiveFields')}</span>
                        </label>
                        <div class="col-sm-8">
                            <input class="inputElement" id="last_x_days" name="last_x_days" value="{if !empty($RECORDENTRIES['last_x_days'])}{$RECORDENTRIES['last_x_days']}{else}365{/if}">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="active" class="control-label col-sm-3">
                            <span>{vtranslate('Status', 'VTEPredictiveFields')}</span>
                        </label>
                        <div class="col-sm-8">
                            <select class="inputElement select2" id="active" name="active">
                                <option value="Active" selected="selected">Active</option>
                                <option value="Inactive" {if $RECORDENTRIES['active'] eq 'Inactive'}selected="" {/if}>Inactive</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="custom_expenses_quantity" class="control-label col-sm-3">
                            <span>&nbsp;</span>
                        </label>
                        <div class="col-sm-8 icon-section">
                            <button type="button" class="btn addButton btn-default" data-toggle="modal"
                                    data-target="#ModalFields">
                                <i class="fa fa-plus"></i> {vtranslate('ADD FIELD', 'VTEPredictiveFields')}
                            </button>&nbsp;&nbsp;
                            <button type="button" class="btn btn-default analyzeAllButton"  data-target="#ModalIcons">
                                <i class="fa fa-refresh"></i> {vtranslate('ANALYZE ALL', 'VTEPredictiveFields')}
                            </button>&nbsp;
                            <a class="info-icon" data-toggle="popover" data-placement="top" style="color: #333" data-content="This will analyze configured fields and determine predictions based on historical data." href="javascript:void(0)" data-original-title="" title="">
                                <i class="fa fa fa-info-circle"></i>
                            </a>
                            <input type="hidden" name="selected_fields" value="" />
                            <input type="hidden" name="un_selected_fields" value="" />
                        </div>
                    </div>
                </div>
                <div class="col-sm-6 col-xs-6 predictive-field-info">
                    <div class="label-info">
                        <h5>
                            <span class="glyphicon glyphicon-info-sign"></span> Info
                        </h5>
                    </div>
                    <span>
                       It's designed to predict the next field value user is going to select and present it in a way where it's only one-click to execute the action. Fields selected will be analyzed (based on last X days) and output generated for the user to select. VTiger logs every field/value change in the history log, which our extension utilizes to produce the output.
                    </span>
                </div>
            </div>
            <div style="padding-bottom: 25px;" class="list-content row">
                <div class="col-sm-12 col-xs-12 ">
                    <div id="table-content" class="table-container" style="padding-top:0px !important;margin-bottom: 30px;">
                        <table  id="edit-view-table" class="table edit-view-table">
                            <thead>
                            <tr style="background-color: #f1f1f1" class="listViewContentHeader">
                                <th nowrap style="width: 15%">Field Name</th>
                                <th nowrap  style="width: 5%;">Type</th>
                                <th nowrap  style="width: 10%;">Dont show if older than &nbsp;
                                    <a class="info-icon" data-toggle="popover" data-html="true" data-placement="top" style="color: #333" data-content="You can configure to stop showing predictions if the record is older than X days. For example, if you have field 'Next Date' on the opportunity and opportunity gets closed usually within 60 days, you would not want to see predictions for already closed opportunities (or records that you will no longer need to modify). That's why you would set 90 days or so. <br/><br/> Note: If you set it as 0, it will ALWAYS show up." href="javascript:void(0)" data-original-title="" title="">
                                        <i class="fa fa fa-info-circle"></i>
                                    </a>
                                </th>
                                <th nowrap  style="width: 10%;">Only on Create?&nbsp;
                                    <a class="info-icon" data-toggle="popover" data-placement="top" style="color: #333" data-content="The prediction will only show up only when the record is being created for the first time." href="javascript:void(0)" data-original-title="" title="">
                                        <i class="fa fa fa-info-circle"></i>
                                    </a>
                                </th>
                                <th nowrap  style="width: 10%;">Only if blank?&nbsp;
                                    <a class="info-icon" data-toggle="popover" data-placement="top" style="color: #333" data-content="The prediction will show up only if the field is empty. This include create/edit/detail/summary views." href="javascript:void(0)" data-original-title="" title="">
                                        <i class="fa fa fa-info-circle"></i>
                                    </a>
                                </th>
                                <th nowrap  style="width: 20%;">Predictions&nbsp;
                                    <a class="info-icon" data-html="true" data-toggle="popover" data-placement="top" style="color: #333" data-content="When the field is analyzed, you can see the predictions. Hover on the value to see more details. <br/><br/>Note: For date and text fields you will see it as 'Any value'. This by design, meaning that we are not predicting the value based on previous value, but instead any value. Picklist fields work differently, meaning that we predict next value based on previous value." href="javascript:void(0)" data-original-title="" title="">
                                        <i class="fa fa fa-info-circle"></i>
                                    </a>
                                </th>
                                <th nowrap  style="width: 18%;" colspan="2">Updates Analyzed&nbsp;
                                    <a class="info-icon" data-toggle="popover" data-placement="top" style="color: #333" data-content="Updates Analuzed: Last time the field was analyzed. Use [o] button to analyze field by field (recommended)." href="javascript:void(0)" data-original-title="" title="">
                                        <i class="fa fa fa-info-circle"></i>
                                    </a>
                                </th>
                                <th nowrap  style=""></th>
                            </tr>
                            </thead>
                            <tbody>
                             {foreach key=FIELD_NAME item=FIELD_ITEM from=$LISTVIEW_FIELDS name=prediction}
                                <tr class="listViewEntries">
                                    <td>
                                        <span class=""></span><span style="vertical-align: 5px;">&nbsp;{vtranslate($FIELD_ITEM[0]['field_label'],$FIELD_ITEM[0]['module'])}</span>
                                    </td>
                                    <td>
                                        <span class=""></span><span style="vertical-align: 5px;">&nbsp;{vtranslate($FIELD_ITEM[0]['field_type'],$FIELD_ITEM[0]['module'])}</span>
                                    </td>
                                    <td style="text-align: center;">
                                        <input value="{$FIELD_ITEM[0]['dont_show_if_older_than']}" class="inputElement" name="dont_show_if_older_than" data-parent-id = "{$FIELD_ITEM[0]['predictivefield_id']}" data-fieldname = "{$FIELD_ITEM[0]['field_name']}" data-id="{$FIELD_ITEM[0]['id']}" type="text" style="width: 80px;"/>
                                    </td>
                                    <td style="text-align: center;">
                                        <input {if $FIELD_ITEM[0]['only_on_create'] == 1}checked{/if} data-on-color="success" type="checkbox" name="only_on_create" data-parent-id = "{$FIELD_ITEM[0]['predictivefield_id']}" data-fieldname = "{$FIELD_ITEM[0]['field_name']}" data-id="{$FIELD_ITEM[0]['id']}" value="" class="switch"/>
                                    </td>
                                    <td style="text-align: center;">
                                        <input {if $FIELD_ITEM[0]['only_if_blank'] == 1}checked{/if} data-on-color="success" type="checkbox" name="only_if_blank" data-parent-id = "{$FIELD_ITEM[0]['predictivefield_id']}" data-fieldname = "{$FIELD_ITEM[0]['field_name']}" data-id="{$FIELD_ITEM[0]['id']}" value="" class="switch"/>
                                    </td>
                                    <td>
                                        <div class="header-div">
                                            {foreach key=PREVALUE item=PREDICTION from=$LISTVIEW_PREDICTION[$FIELD_NAME] name=pred}
                                                {if $PREVALUE eq NULL}
                                                    {if $FIELD_ITEM[0]['field_type'] == 'picklist'}
                                                        <a onclick="void(0);" class="vtepredictive-tooltip" data-tooltip = "{$PREDICTION}">{vtranslate('Empty', 'VTEPredictiveFields')}</a><br />
                                                    {else}
                                                        <a onclick="void(0);" class="vtepredictive-tooltip" data-tooltip = "{$PREDICTION}">{vtranslate('Any value', 'VTEPredictiveFields')}</a><br />
                                                    {/if}

                                                {else}
                                                    <a onclick="void(0);" class="vtepredictive-tooltip" data-tooltip = "{$PREDICTION}">{$PREVALUE}</a><br />
                                                {/if}
                                            {/foreach}
                                        </div>
                                    </td>
                                    <td>
                                        {$FIELD_ITEM[0]['date_analyzed']}
                                    </td>
                                    <td>
                                        <button type="button" class="btn btn-default analyzeThis" data-fieldname = {$FIELD_ITEM[0]['field_name']}>
                                            <i class="fa fa-refresh"></i>
                                        </button>
                                    </td>
                                    <td>
                                        <a href="javascript:void(0)" data-id="{$FIELD_ITEM[0]['id']}" id="predictive_field_delete" style="margin-left: 10px;"><i class="fa fa-trash"></i></a>
                                    </td>
                                </tr>
                            {/foreach}
                            </tbody>
                        </table>
                    </div>
                    <div id="scroller_wrapper" class="bottom-fixed-scroll">
                        <div id="scroller" class="scroller-div"></div>
                    </div>
                </div>
            </div>
            <div class="modal-overlay-footer clearfix">
                <div class="row clearfix">
                    <div class="textAlignCenter col-lg-12 col-md-12 col-sm-12 ">
                        <button type="button" class="btn btn-success VTEPredictiveFieldButtonSave buttonSave">Save</button>&nbsp;&nbsp;
                        <a class="cancelLink" href="index.php?module=VTEPredictiveFields&parent=Settings&view=Settings" type="reset">Cancel</a>
                    </div>
                </div>
            </div>
        </form>
    </div>
</div>
{/strip}
<!-- Modal -->
<div class="modal fade" id="ModalFields" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle"
     aria-hidden="true">
    <div class="modal-dialog" role="document" style="width: 650px">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Select fields</h4>
            </div>
            <div class="modal-body" id="list_fields_modal">
                <div class="form list_fields">
                    {assign var=LISTFIELDS_LENGTH value=(count($SELECTED_MODULE_FIELDS) -1)}
                    {assign var=SELECTED_FIELDS value= $RECORDENTRIES['list_fields']}
                    {assign var=INDEX value = 0 }
                    {assign var=REJECT_TABLE value = array("vtiger_inventoryproductrel")}
                    <table data-length="{$LISTFIELDS_LENGTH}" border="0px solid #cccccc">
                        {foreach from = $SELECTED_MODULE_FIELDS item =val key=k }
                            {if !$val->isEditable()}{continue}{/if}
                            {if !in_array($val->get('uitype'),$ALOW_UITYPE)}{continue}{/if}
                            {if in_array($val->get('table'),$REJECT_TABLE)}{continue}{/if}
                            {assign var=MODE4OK value=(($INDEX mod 4) == 0)}
                            {if $MODE4OK}
                                <tr>
                                    {/if}
                                    <td style="padding: 5px;width: 25%;" class="cell-icon">
                                        <input class="list_fields" type="checkbox" name="list_fields" value="{Vtiger_Util_Helper::toSafeHTML($k)}"
                                                {foreach from = $SELECTED_FIELDS item = FIELD key= KEY }
                                                    {if $k eq decode_html($FIELD['field_name'])}
                                                        checked
                                                    {/if}
                                                {/foreach}/>
                                        <span class="{$k} icon-module"" data-info="{$k}" style="margin-left: 5px;">
                                            {vtranslate($val ->get("label"),$SELECTED_MODULE_NAME)}
                                        </span>
                                    </td>
                                    {if ($INDEX mod 14) == 13 or $LISTFIELDS_LENGTH == $INDEX}
                                </tr>
                            {/if}
                            <input type="hidden" value="{$INDEX++}">
                        {/foreach}
                    </table>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary btn-submit btn-save-fields">Save</button>
            </div>
        </div>
    </div>
</div>