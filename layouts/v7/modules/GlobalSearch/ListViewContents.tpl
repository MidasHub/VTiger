{*<!--
/* ********************************************************************************
 * The content of this file is subject to the Global Search ("License");
 * You may not use this file except in compliance with the License
 * The Initial Developer of the Original Code is VTExperts.com
 * Portions created by VTExperts.com. are Copyright(C) VTExperts.com.
 * All Rights Reserved.
 * ****************************************************************************** */
-->*}
{strip}
    <input type="hidden" id="pageStartRange{$SEARCH_MODULE}" value="{$PAGING_MODEL->getRecordStartRange()}" />
    <input type="hidden" id="pageEndRange{$SEARCH_MODULE}" value="{$PAGING_MODEL->getRecordEndRange()}" />
    <input type="hidden" id="previousPageExist{$SEARCH_MODULE}" value="{$PAGING_MODEL->isPrevPageExists()}" />
    <input type="hidden" id="nextPageExist{$SEARCH_MODULE}" value="{$PAGING_MODEL->isNextPageExists()}" />
    <input type='hidden' value="{$PAGE_NUMBER}" id='pageNumber{$SEARCH_MODULE}'>
    <input type='hidden' value="{$VALUE}" id='searchKey{$SEARCH_MODULE}'>
    <input type='hidden' value="{$PAGING_MODEL->getPageLimit()}" id='pageLimit{$SEARCH_MODULE}'>
    <input type="hidden" value="{$LISTVIEW_ENTRIES_COUNT}" id="noOfEntries{$SEARCH_MODULE}">
    <input type="hidden" value="{$ORDER_BY}" id="orderBy{$SEARCH_MODULE}">
    <input type="hidden" value="{$SORT_ORDER}" id="sortOrder{$SEARCH_MODULE}">
    <table class="table  listview-table  listViewEntriesTable">
        <thead>
        <tr class="listViewHeaders listViewContentHeader">
            <td></td>
            {foreach item=LISTVIEW_HEADER from=$LISTVIEW_HEADERS}
                {if $SEARCH_MODULE eq 'Emails' && $LISTVIEW_HEADER->get('label') eq 'Description'} {continue} {/if}
                <td {if $LISTVIEW_HEADER@last} colspan="2" {/if}>
                    <a class="{if $NO_SORTING}noSorting{else}listViewContentHeaderValues{/if}" {if !$NO_SORTING}data-nextsortorderval="{if $ORDER_BY eq $LISTVIEW_HEADER->get('name')}{$NEXT_SORT_ORDER}{else}ASC{/if}" data-columnname="{$LISTVIEW_HEADER->get('name')}"{/if} data-field-id='{$LISTVIEW_HEADER->getId()}' data-module="{$SEARCH_MODULE}">
                        {if !$NO_SORTING}
                            {if $ORDER_BY eq $LISTVIEW_HEADER->get('name')}
                                {if strtolower($SORT_ORDER) == 'asc'}
                                    <i class="fa fa-sort fa-sort-asc"></i>
                                {else}
                                    <i class="fa fa-sort fa-sort-desc"></i>
                                {/if}
                            {else}
                                <i class="fa fa-sort customsort"></i>
                            {/if}
                        {/if}
                        &nbsp;{vtranslate($LISTVIEW_HEADER->get('label'), $LISTVIEW_HEADER->getModuleName())}&nbsp;
                    </a>
                    {*{vtranslate($LISTVIEW_HEADER->get('label'), $SEARCH_MODULE)}*}
                </td>
            {/foreach}
        </tr>
        </thead>
        <tbody class="overflow-y">
        {foreach item=LISTVIEW_ENTRY from=$LISTVIEW_ENTRIES name=listview}
            {assign var=MODULE_MODEL value=$LISTVIEW_ENTRY->getModule()}
            {assign var=QUICK_PREVIEW_ENABLED value=$MODULE_MODEL->isQuickPreviewEnabled()}
            {if $SEARCH_MODULE eq 'ModComments'}
                {assign var=COMMENT_ID value=$LISTVIEW_ENTRY->getId()}
                {assign var=COMMENT_ID_MODEL value=Vtiger_Record_Model::getInstanceById($COMMENT_ID,'ModComments')}
                {assign var=RELATED_TO_RECORD value=$COMMENT_ID_MODEL->get('related_to')}
                {assign var=RELATED_TO_RECORD_MODEL value=Vtiger_Record_Model::getInstanceById($RELATED_TO_RECORD)}
                {assign var=RELATED_TO_RECORD_LINK value=$RELATED_TO_RECORD_MODEL->getDetailViewUrl()}
            {/if}
            <tr class="listViewEntries" data-id='{$LISTVIEW_ENTRY->getId()}' data-searchmodule = '{$SEARCH_MODULE}' data-record="{$LISTVIEW_ENTRY->getId()}"  data-recordUrl='{if $SEARCH_MODULE eq 'ModComments'}{$RELATED_TO_RECORD_LINK}{else}{$LISTVIEW_ENTRY->getDetailViewUrl()}{/if}' id="{$SEARCH_MODULE}_listView_row_{$smarty.foreach.listview.index+1}">
                <td class = "listViewRecordActions" style="width: 60px;">
                    {include file="ListViewRecordActions.tpl"|vtemplate_path:$SEARCH_MODULE}
                    {if $SEARCH_MODULE neq 'ModComments'}
                        <span style="display: none;" class="open-new-window-action">
                        <a href="{$LISTVIEW_ENTRY->getDetailViewUrl()}" target="_blank" class="">
                            <i class="fa fa-external-link"></i>
                        </a>
                    </span>
                    {/if}
                </td>
                {foreach item=LISTVIEW_HEADER from=$LISTVIEW_HEADERS}
                    {if $SEARCH_MODULE eq 'Emails' && $LISTVIEW_HEADER->get('label') eq 'Description'} {assign var=HAS_DESCRIPTION value=1}{continue} {/if}
                    {assign var=LISTVIEW_HEADERNAME value=$LISTVIEW_HEADER->get('name')}

                <td class="listViewEntryValue {$WIDTHTYPE} show-record-detail" data-field-type="{$LISTVIEW_HEADER->getFieldDataType()}" {if $LISTVIEW_HEADERNAME neq 'commentcontent'}nowrap{/if}>
                    {if ($LISTVIEW_HEADER->isNameField() eq true or $LISTVIEW_HEADER->get('uitype') eq '4')}
                        {if $SEARCH_MODULE eq 'Emails' && $LISTVIEW_HEADERNAME eq 'subject'}
                            {$LISTVIEW_ENTRY->get($LISTVIEW_HEADERNAME)}
                        {elseif $LISTVIEW_HEADERNAME eq 'commentcontent'}
                            {assign var=COMMENT_ID value=$LISTVIEW_ENTRY->getId()}
                            {assign var=COMMENT_ID_MODEL value=Vtiger_Record_Model::getInstanceById($COMMENT_ID,'ModComments')}
                            {assign var=COMMENT_CONTENT value={$COMMENT_ID_MODEL->get($LISTVIEW_HEADERNAME)}}
                            {assign var=COMMENT_CONTENT value={html_entity_decode($COMMENT_CONTENT)}}
                            {assign var=COMMENT_CONTENT value={strip_tags($COMMENT_CONTENT)}}
                            {assign var=COMMENT_CONTENT value=Vtiger_Util_Helper::toSafeHTML($COMMENT_CONTENT)}
                            {assign var=COMMENT_CONTENT value=htmlspecialchars_decode($COMMENT_CONTENT)}
                            <a href="#" nowrap>{$COMMENT_CONTENT}</a>
                        {else}
                            <a style="color: #15c;" href="{$LISTVIEW_ENTRY->getDetailViewUrl()}"  data-record="{$LISTVIEW_ENTRY->getId()}" data-url="{$LISTVIEW_ENTRY->getDetailViewUrl()}">{$LISTVIEW_ENTRY->get($LISTVIEW_HEADERNAME)}</a>
                        {/if}
                    {elseif $LISTVIEW_HEADER->get('uitype') eq '72'}
                        {assign var=CURRENCY_SYMBOL_PLACEMENT value={$CURRENT_USER_MODEL->get('currency_symbol_placement')}}
                        {if $CURRENCY_SYMBOL_PLACEMENT eq '1.0$'}
                            {$LISTVIEW_ENTRY->get($LISTVIEW_HEADERNAME)}{$LISTVIEW_ENTRY->get('currencySymbol')}
                        {else}
                            {$LISTVIEW_ENTRY->get('currencySymbol')}{$LISTVIEW_ENTRY->get($LISTVIEW_HEADERNAME)}
                        {/if}
                    {elseif $LISTVIEW_HEADER->get('uitype') eq '11'}
                        {assign var=PBXMANAGER_MODULE value='PBXManager'}
                        {assign var=MODULEMODEL value=Vtiger_Module_Model::getInstance($PBXMANAGER_MODULE)}
                        {if $MODULEMODEL}
                            {assign var=PERMISSION value=PBXManager_Server_Model::checkPermissionForOutgoingCall()}
                            {if $PERMISSION}
                                {assign var=PHONE_FIELD_VALUE value=$LISTVIEW_ENTRY->get($LISTVIEW_HEADERNAME)|strip_tags}
                                {assign var=PHONE_NUMBER value=$PHONE_FIELD_VALUE|regex_replace:"/[-()\s]/":""}
                                <a class="phoneField" data-value="{$PHONE_NUMBER}" record="{$LISTVIEW_ENTRY->getId()}" onclick="Vtiger_PBXManager_Js.registerPBXOutboundCall('{$PHONE_NUMBER}',{$LISTVIEW_ENTRY->getId()})">{$LISTVIEW_ENTRY->get($LISTVIEW_HEADERNAME)|strip_tags}</a>
                            {else}
                                {$LISTVIEW_ENTRY->get($LISTVIEW_HEADERNAME)}
                            {/if}
                        {else}
                            {$LISTVIEW_ENTRY->get($LISTVIEW_HEADERNAME)}
                        {/if}
                    {else}
                        {if $LISTVIEW_HEADER->getFieldDataType() eq 'double'}
                            {decimalFormat($LISTVIEW_ENTRY->get($LISTVIEW_HEADERNAME))}
                        {elseif $LISTVIEW_HEADER->getFieldDataType() eq 'reference'}
                            <span style="color: #15c">{$LISTVIEW_ENTRY->get($LISTVIEW_HEADERNAME)}</span>
                        {elseif $LISTVIEW_HEADER->getFieldDataType() eq 'picklist'}
                            {assign var=PICKLIST_COLOR value=Settings_Picklist_Module_Model::getPicklistColorByValue($LISTVIEW_HEADERNAME, $LISTVIEW_ENTRY->get($LISTVIEW_HEADERNAME))}
                            <span {if !empty($PICKLIST_COLOR)} class="picklist-color" style="background-color: {$PICKLIST_COLOR}; line-height:15px; color: {Settings_Picklist_Module_Model::getTextColor($PICKLIST_COLOR)};" {/if}>{$LISTVIEW_ENTRY->get($LISTVIEW_HEADERNAME)}</span>
                        {else}
                            {$LISTVIEW_ENTRY->get($LISTVIEW_HEADERNAME)}
                        {/if}
                    {/if}
                    {if $LISTVIEW_HEADER@last}
                        </td><td nowrap class="{$WIDTHTYPE}">
                        <div class="actions pull-right">
                                <span class="actionImages">
                                    <a href="{$LISTVIEW_ENTRY->getFullDetailViewUrl()}"><i title="{vtranslate('LBL_SHOW_COMPLETE_DETAILS', $SEARCH_MODULE)}" class="icon-th-list alignMiddle"></i></a>&nbsp;
                                    {if $IS_MODULE_EDITABLE}
                                        <a href='{$LISTVIEW_ENTRY->getEditViewUrl()}'><i title="{vtranslate('LBL_EDIT', $SEARCH_MODULE)}" class="icon-pencil alignMiddle"></i></a>&nbsp;
                                    {/if}
                                    {if $IS_MODULE_DELETABLE}
                                        <a class="deleteRecordButton"><i title="{vtranslate('LBL_DELETE', $SEARCH_MODULE)}" class="icon-trash alignMiddle"></i></a>
                                    {/if}
                                </span>
                        </div></td>
                    {/if}
                    </td>
                {/foreach}
            </tr>
            {if !empty($RECORD_COMMENTS[$LISTVIEW_ENTRY->getId()])}
                {assign var=COMMENTS value=$RECORD_COMMENTS[$LISTVIEW_ENTRY->getId()]}
                {foreach item=COMMENT from=$COMMENTS}
                    <tr class="listViewEntries" style="background-color: rgb(246,246,246);">
                        <td class="listViewRecordActions"></td>
                        <td class="listViewEntryValue" colspan="{$LISTVIEW_HEADERS|count + 1}">
                            <div class="row">
                                <div class="col-lg-3 col-sm-3">
                                    {assign var=CURRENT_USER_MODEL value=Users_Record_Model::getCurrentUserModel()}
                                    {assign var=COMMENT_USER_MODEL value=Users_Record_Model::getInstanceById($COMMENT['userid'],'Users')}
                                    {$COMMENT_USER_MODEL->get('first_name')} {$COMMENT_USER_MODEL->get('last_name')}<br>
                                    {Vtiger_Util_Helper::convertDateTimeIntoUsersDisplayFormat($COMMENT['modifiedtime'],$CURRENT_USER_MODEL)}
                                </div>
                                <div class="col-lg-9 col-sm-9">
                                    {assign var=COMMENT_CONTENT value={nl2br($COMMENT['commentcontent'])}}
                                    {assign var=COMMENT_CONTENT value={decode_html($COMMENT_CONTENT)}}
                                    {$COMMENT_CONTENT}
                                </div>
                            </div>
                        </td>
                    </tr>
                {/foreach}
            {/if}
            {if $SEARCH_MODULE eq 'Emails' && $HAS_DESCRIPTION eq 1}
                <tr class="listViewEntries">
                    <td class="fieldLabel"><strong>{vtranslate('Description', $SEARCH_MODULE)}</strong></td>
                    <td class="listViewEntryValue {$WIDTHTYPE}" colspan="{$LISTVIEW_HEADERS|count}">{decode_html($LISTVIEW_ENTRY->get('description'))}</td>
                </tr>
            {/if}
        {/foreach}
        </tbody>

    </table>
    <!--added this div for Temporarily -->
    {if $LISTVIEW_ENTRIES_COUNT eq '0'}
        <table class="table table-bordered listViewEntriesTable">
            <tbody>
            <tr>
                <td>
                    {assign var=SINGLE_MODULE value="SINGLE_$SEARCH_MODULE"}
                    {vtranslate('LBL_NO')} {vtranslate($SEARCH_MODULE, $SEARCH_MODULE)} {vtranslate('LBL_FOUND')}.
                </td>
            </tr>
            </tbody>
        </table>
    {/if}
{/strip}
