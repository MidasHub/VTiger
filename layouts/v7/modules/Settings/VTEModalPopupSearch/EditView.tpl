{*<!--
/* ********************************************************************************
* The content of this file is subject to the Custom Header/Bills ("License");
* You may not use this file except in compliance with the License
* The Initial Developer of the Original Code is VTExperts.com
* Portions created by VTExperts.com. are Copyright(C) VTExperts.com.
* All Rights Reserved.
* ****************************************************************************** */
-->*}
{strip}
<div class="container-fluid WidgetsManage">
    <div class="widget_header row">
        <div class="col-sm-6"><h4><label>{vtranslate('Popup Filter', 'VTEModalPopupSearch')}</label>
        </div>
    </div>
    <hr>
    <div class="clearfix"></div>
    <form id="EditView" action="index.php" method="post" name="EditView">
        <div class="editViewPageDiv">
                <input type="hidden" name="module" id="module" value="VTEModalPopupSearch">
                <input type="hidden" name="action" value="SaveVTEModalPopupSearch" />
                <input type="hidden" name="parent" value="Settings" />
                <input type="hidden" name="record" id="record" value="{$RECORD}">
                <input type="hidden" id="stdfilterlist" name="stdfilterlist" value=""/>
                <input type="hidden" id="advfilterlist" name="advfilterlist" value=""/>
                <div class="col-sm-12 col-xs-12">
                    <div class="col-sm-6 col-xs-6 form-horizontal">
                        <div class="form-group">
                            <label for="custom_expenses_module" class="control-label col-sm-3">
                                <span>{vtranslate('Module', 'VTEModalPopupSearch')}</span>
                                <span class="redColor">*</span>
                            </label>
                            <div class="col-sm-8">
                                <select class="inputElement select2" id="custom_module" name="custom_module" data-rule-required="true" >
                                    <option value="">{vtranslate('Select an Option', 'VTEModalPopupSearch')}</option>
                                    {foreach item=MODULE_VALUES from=$ALL_MODULES}
                                        <option value="{$MODULE_VALUES->name}" {if $MODULE_VALUES->name eq $RECORDENTRIES['module']}selected{/if}>{vtranslate($MODULE_VALUES->label,$MODULE_VALUES->name)}</option>
                                    {/foreach}
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="custom_expenses_quantity" class="control-label col-sm-3">
                                <span>{vtranslate('Field', 'VTEModalPopupSearch')}</span><span class="redColor">*</span>
                            </label>
                            <div class="col-sm-8">
                                <select class="inputElement select2" id="field_name" name="field_name"  data-rule-required="true"   >
                                    <option value="">{vtranslate('LBL_SELECT_OPTION',$MODULE)}</option>
                                    {foreach key=BLOCK_LABEL item=BLOCK_FIELDS from=$RECORD_STRUCTURE}
                                        <optgroup label='{vtranslate($BLOCK_LABEL, $SOURCE_MODULE)}'>
                                            {assign var=ARR_FIELD_TYPE value=','|explode:"10,57,59,66,51,73,76,78"}
                                            {foreach key=FIELD_NAME item=FIELD_MODEL from=$BLOCK_FIELDS}
                                                {if in_array($FIELD_MODEL->get('uitype'), $ARR_FIELD_TYPE)}
                                                {else}
                                                    {continue}
                                                {/if}
                                                {*{if $FIELD_MODEL->get('uitype') neq "10"}{continue}{/if}*}
                                                {assign var=FIELD_INFO value=$FIELD_MODEL->getFieldInfo()}
                                                {assign var=MODULE_MODEL value=$FIELD_MODEL->getModule()}
                                                {assign var="SPECIAL_VALIDATOR" value=$FIELD_MODEL->getValidator()}
                                                {if !empty($COLUMNNAME_API)}
                                                    {assign var=columnNameApi value=$COLUMNNAME_API}
                                                {else}
                                                    {assign var=columnNameApi value=getCustomViewColumnName}
                                                {/if}
                                                <option value="{$FIELD_MODEL->$columnNameApi()}" data-fieldtype="{$FIELD_MODEL->getFieldType()}" data-field-name="{$FIELD_NAME}"
                                                        {if decode_html($FIELD_MODEL->$columnNameApi()) eq decode_html($RECORDENTRIES['field_name'])}
                                                            {assign var=FIELD_TYPE value=$FIELD_MODEL->getFieldType()}
                                                            {assign var=SELECTED_FIELD_MODEL value=$FIELD_MODEL}
                                                            {if $FIELD_MODEL->getFieldDataType() == 'reference'  ||  $FIELD_MODEL->getFieldDataType() == 'multireference'}
                                                                {$FIELD_TYPE='V'}
                                                            {/if}
                                                            {$FIELD_INFO['value'] = decode_html($RECORDENTRIES['field_name'])}
                                                            selected="selected"
                                                        {/if}
                                                        {if ($MODULE_MODEL->get('name') eq 'Calendar' || $MODULE_MODEL->get('name') eq 'Events') && ($FIELD_NAME eq 'recurringtype')}
                                                            {assign var=PICKLIST_VALUES value = Calendar_Field_Model::getReccurencePicklistValues()}
                                                            {$FIELD_INFO['picklistvalues'] = $PICKLIST_VALUES}
                                                        {/if}
                                                        {if ($MODULE_MODEL->get('name') eq 'Calendar') && ($FIELD_NAME eq 'activitytype')}
                                                            {$FIELD_INFO['picklistvalues']['Task'] = vtranslate('Task', 'Calendar')}
                                                        {/if}
                                                        {if $FIELD_MODEL->getFieldDataType() eq 'reference'}
                                                            {assign var=referenceList value=$FIELD_MODEL->getWebserviceFieldObject()->getReferenceList()}
                                                            {if is_array($referenceList) && in_array('Users', $referenceList)}
                                                                {assign var=USERSLIST value=array()}
                                                                {assign var=CURRENT_USER_MODEL value = Users_Record_Model::getCurrentUserModel()}
                                                                {assign var=ACCESSIBLE_USERS value = $CURRENT_USER_MODEL->getAccessibleUsers()}
                                                                {foreach item=USER_NAME from=$ACCESSIBLE_USERS}
                                                                    {$USERSLIST[$USER_NAME] = $USER_NAME}
                                                                {/foreach}
                                                                {$FIELD_INFO['picklistvalues'] = $USERSLIST}
                                                                {$FIELD_INFO['type'] = 'picklist'}
                                                            {/if}
                                                        {/if}
                                                        data-fieldinfo='{Vtiger_Util_Helper::toSafeHTML(ZEND_JSON::encode($FIELD_INFO))}'
                                                        {if !empty($SPECIAL_VALIDATOR)}data-validator='{Zend_Json::encode($SPECIAL_VALIDATOR)}'{/if}>
                                                    {if $SOURCE_MODULE neq $MODULE_MODEL->get('name')}
                                                        ({vtranslate($MODULE_MODEL->get('name'), $MODULE_MODEL->get('name'))}) {vtranslate($FIELD_MODEL->get('label'), $MODULE_MODEL->get('name'))}
                                                    {else}
                                                        {vtranslate($FIELD_MODEL->get('label'), $SOURCE_MODULE)}
                                                    {/if}
                                                </option>
                                            {/foreach}
                                        </optgroup>
                                    {/foreach}
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="custom_expenses_quantity" class="control-label col-sm-3">
                                <span>{vtranslate('Message', 'VTEModalPopupSearch')}</span>
                            </label>
                            <div class="col-sm-8">
                                <textarea class="inputElement" style="height: 55px;" name="message" >{$RECORDENTRIES['message']}</textarea>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="custom_expenses_quantity" class="control-label col-sm-3">
                                <span>{vtranslate('Enable Override', 'VTEModalPopupSearch')}</span>
                            </label>
                            <div class="col-sm-8">
                                <input type="checkbox" name="enable_override" {if $RECORDENTRIES['enable_override']}checked{/if}>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="active" class="control-label col-sm-3">
                                <span>{vtranslate('Active', 'VTEModalPopupSearch')}</span>
                            </label>
                            <div class="col-sm-8">
                                <select class="inputElement select2" id="active" name="active">
                                    <option value="Active" {if $RECORDENTRIES['active'] eq 1}selected="" {/if}>Active</option>
                                    <option value="Inactive" {if $RECORDENTRIES['active'] eq 0}selected="" {/if}>Inactive</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6 col-xs-6 custom-header-info" style="height: 125px;">
                        <div class="label-info">
                            <h5>
                                <span class="glyphicon glyphicon-info-sign"></span> Info
                            </h5>
                        </div>
                        <span>
                            {vtranslate('lbl_message_info', 'VTEModalPopupSearch')}
                        </span>
                    </div>
                </div>
        </div>
        <div class="clearfix"></div>
        <div class="editViewPageDiv">
            <div class="col-sm-12 col-xs-12 form-horizontal">
                <div class="form-group marginBottom10px">
                    <label for="custom_expenses_quantity" class="control-label col-sm-2" style="width: 13%;">
                        <span>{vtranslate('Conditions', 'VTEModalPopupSearch')}</span><br>
                        <span class="referenceModulesList hide">
                            <select  id="slreferenceModulesList" name="slreferenceModulesList" class="inputElement select2 slreferenceModulesList" style="width: 100%">

                            </select>
                        </span>
                    </label>
                    <div class="col-sm-10 row ">
                        <div class="col-sm-12 vte-advancefilter">
                            <div class="" id="table-conditions" >
                              {* {include file='AdvanceFilter.tpl'|@vtemplate_path:$MODULE RECORD_STRUCTURE=$RECORD_STRUCTURE SOURCE_MODULE=$SELECTED_MODULE_NAME}*}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-sm-12 col-xs-12 form-horizontal">
                    <div class="form-group marginBottom10px">
                        <label  class="control-label col-sm-2" style="width: 13%;">
                            <strong>Sort By</strong>
                        </label>
                        <div class="fieldValue col-lg-4 col-md-4 col-sm-4 input-group" id="block_sort">

                        </div>
                    </div>
                </div>
                <div class="modal-overlay-footer clearfix">
                    <div class="row clearfix">
                        <div class="textAlignCenter col-lg-12 col-md-12 col-sm-12 ">
                            <button type="submit" class="btn btn-success buttonSave">Save</button>&nbsp;&nbsp;
                            <a class="cancelLink" href="javascript:history.back()" type="reset">Cancel</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div><a data-toggle="modal" data-target="#advancedQueryModal" href="javascript:void(0)" style="color: #15c;margin-right: 82px;" class="show-advanced-query-box pull-right">Show Advanced query box (MYSQL)</a></div>
        <div class="modal fade" id="advancedQueryModal" tabindex="-1" role="dialog" aria-labelledby="advancedQueryModal" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <div class="clearfix">
                            <div class="pull-right">
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <h4 class="pull-left" id="">Modal title</h4>
                        </div>
                    </div>
                    <div class="modal-body">
                        <div class="col-sm-12 col-xs-12 input-group">
                            <div class="form-group">
                                <label class="col-sm-4 control-label fieldLabel"><strong>Active</strong></label>
                                <input type="checkbox" name="active_query" {if $RECORDENTRIES['active_query'] == 1}checked{/if}>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-4 control-label fieldLabel"><strong>Advanced Query Box</strong></label>
                                <textarea style="width: 328px;height: 104px;" name="advanced_query">{htmlspecialchars_decode($RECORDENTRIES['advanced_query'])}</textarea>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-success" data-dismiss="modal">Save</button>
                    </div>
                </div>
            </div>
        </div>
    </form>
</div>
{/strip}