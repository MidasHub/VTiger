{*+**********************************************************************************
 * The contents of this file are subject to the vtiger CRM Public License Version 1.1
 * ("License"); You may not use this file except in compliance with the License
 * The Original Code is: vtiger CRM Open Source
 * The Initial Developer of the Original Code is vtiger.
 * Portions created by vtiger are Copyright (C) vtiger.
 * All Rights Reserved.
 ************************************************************************************}
{* modules/Vtiger/views/Popup.php *}

{strip}
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            {include file="ModalHeader.tpl"|vtemplate_path:$MODULE TITLE={vtranslate($MODULE,$MODULE)}}
            <div class="modal-body">
                <div id="popupPageContainer" class="contentsDiv col-sm-12">
                    <input type="hidden" id="parentModule" value="{$SOURCE_MODULE}"/>
                    <input type="hidden" id="record_id" value="{$RECORD_ID}"/>
                    <input type="hidden" id="module" value="VTEModalPopupSearch"/>
                    <input type="hidden" id="parent_module" value="{$PARENT_MODULE}"/>
                    <input type="hidden" id="parent" value="{$PARENT_MODULE}"/>
                    <input type="hidden" id="sourceRecord" value="{$SOURCE_RECORD}"/>
                    <input type="hidden" id="sourceField" value="{$SOURCE_FIELD}"/>
                    <input type="hidden" id="url" value="{$GETURL}"/>
                    <input type="hidden" id="multi_select" value="{$MULTI_SELECT}"/>
                    <input type="hidden" id="currencyId" value="{$CURRENCY_ID}"/>
                    <input type="hidden" id="relatedParentModule" value="{$RELATED_PARENT_MODULE}"/>
                    <input type="hidden" id="relatedParentId" value="{$RELATED_PARENT_ID}"/>
                    <input type="hidden" id="vtemodalpopupsearch_id" name="vtemodalpopupsearch_id"
                           value="{$VTEMODALPOPUPSEARCH_ID}"/>
                    <input type="hidden" id="condtion_fields" name="condtion_fields" value="{$CONDTION_FIELDS}"/>
                    <input type="hidden" id="view" name="view" value="{$VIEW}"/>
                    <input type="hidden" id="relationId" value="{$RELATION_ID}"/>
                    <input type="hidden" id="selectedIds" name="selectedIds">
                    {if !empty($POPUP_CLASS_NAME)}
                        <input type="hidden" id="popUpClassName" value="{$POPUP_CLASS_NAME}"/>
                    {/if}
                    {if $ENABLE_OVERRIDE == 1}
                        <div style="margin-right: 200px;margin-left: 200px;text-align: center;z-index: 999999;top: 22px;position: relative;margin-top: -22px;"
                             class="message"><input type="hidden" name="show_all_results" value="0">{$MESSAGE} &nbsp;&nbsp;&nbsp;<a
                                    style="color: #15c;" data-showing-alls="0" class="show-all-results"
                                    href="javascript:void(0)">Show all results</a></div>
                    {/if}
                    <div id="popupContents" class="">
                        {if $MODULE_NAME eq "VTEEmployee"}
                            {include file='PopupContents.tpl'|vtemplate_path:'Vtiger'}
                        {else}
                            {include file='PopupContents.tpl'|vtemplate_path:$MODULE_NAME}
                        {/if}

                    </div>
                    <input type="hidden" class="triggerEventName" value="{$smarty.request.triggerEventName}"/>
                </div>
            </div>
        </div>
    </div>
{/strip}