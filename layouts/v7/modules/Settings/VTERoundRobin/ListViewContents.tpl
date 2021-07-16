{*+**********************************************************************************
* The contents of this file are subject to the vtiger CRM Public License Version 1.1
* ("License"); You may not use this file except in compliance with the License
* The Original Code is: vtiger CRM Open Source
* The Initial Developer of the Original Code is vtiger.
* Portions created by vtiger are Copyright (C) vtiger.
* All Rights Reserved.
*************************************************************************************}

{strip}
	<div class="col-sm-12 col-xs-12 ">
		<input type="hidden" id="pageStartRange" value="{$PAGING_MODEL->getRecordStartRange()}" />
		<input type="hidden" id="pageEndRange" value="{$PAGING_MODEL->getRecordEndRange()}" />
		<input type="hidden" id="previousPageExist" value="{$PAGING_MODEL->isPrevPageExists()}" />
		<input type="hidden" id="nextPageExist" value="{$PAGING_MODEL->isNextPageExists()}" />
		<input type="hidden" id="totalCount" value="{$LISTVIEW_COUNT}" />
		<input type='hidden' value="{$PAGE_NUMBER}" id='pageNumber'>
		<input type='hidden' value="{$PAGING_MODEL->getPageLimit()}" id='pageLimit'>
		<input type="hidden" value="{$LISTVIEW_ENTRIES_COUNT}" id="noOfEntries">
		<div class = "row">
			<div class='col-md-3'>
				<div class="foldersContainer hidden-xs pull-left">
					<button type="button" class="btn addButton btn-default module-buttons"
							onclick='window.location.href = "{$MODULE_MODEL->getCreateViewUrl()}"'>
						<div class="fa fa-plus" aria-hidden="true"></div>
						&nbsp;&nbsp;{vtranslate('ADD_NEW' , $MODULE)}
					</button>
				</div>
			</div>
            <div class='col-md-2'>
				<div class="foldersContainer hidden-xs pull-left">
					<button id="rr_show_online_users" class="btn btn-default module-buttons" type="button">Online Users</button>
				</div>
			</div>
			<div class="col-md-4">
				<div class="search-link hidden-xs" style="margin-top: 0px;">
					<span aria-hidden="true" class="fa fa-search"></span>
					<input class="searchRoundRobin" type="text" type="text" value="" placeholder="{vtranslate('LBL_SEARCH', $QUALIFIED_MODULE)}">
				</div>
			</div>
			<div class="col-md-3">
                {assign var=RECORD_COUNT value=$LISTVIEW_ENTRIES_COUNT}
                {include file="Pagination.tpl"|vtemplate_path:$MODULE SHOWPAGEJUMP=true}
			</div>
		</div>
		<div class="list-content row">
			<div class="col-sm-12 col-xs-12 ">
				<div id="table-content" class="table-container" style="padding-top:0px !important;">
					<table id="listview-table" class="sla-policy-listview-table table listview-table">
						<thead>
                            <tr class="listViewContentHeader">
                                <th></th>
                                <th nowrap>{vtranslate('LBL_MODULE' , $MODULE)}</th>
                                <th nowrap>{vtranslate('LBL_NAME' , $MODULE)}</th>
                                <th nowrap>{vtranslate('Status Field' , $MODULE)}</th>
                                <th nowrap>{vtranslate('LBL_ONLINE_USERS_ONLY' , $MODULE)}</th>
                                <th nowrap>{vtranslate('LBL_MEMBERS' , $MODULE)}</th>
                                <th nowrap>{vtranslate('Actions' , $MODULE)}</th>
                            </tr>
						</thead>
						<tbody>
                        {foreach item=LISTVIEW_ENTRY from=$LISTVIEW_ENTRIES}
							<tr class="listViewEntries" data-id="{$LISTVIEW_ENTRY->get('roundrobinid')}"
								data-recordurl="{$LISTVIEW_ENTRY->getEditViewUrl()}">
								<td>
                                    {include file="ListViewRecordActions.tpl"|vtemplate_path:$QUALIFIED_MODULE}
								</td>
								<td>
                                    {assign var="MODULE_ICON_NAME" value="{strtolower($LISTVIEW_ENTRY->get('rr_module'))}"}
									<i class="vicon-{$MODULE_ICON_NAME}" title="{$LISTVIEW_ENTRY->get('rr_module')}"></i>
								</td>
								<td><span>{$LISTVIEW_ENTRY->get('rr_name')}</span></td>
								<td>
									<span>{vtranslate('LBL_STATUS_FIELD' , $MODULE)} : <strong>{$LISTVIEW_ENTRY->get('fieldLabel')}</strong></span>
									<br/>
                                    <span>{vtranslate('LBL_UNASSIGNED_STATUS' , $MODULE)} : <strong>{$LISTVIEW_ENTRY->get('rr_unassigned_status')}</strong></span>
									<br/>
                                    <span>{vtranslate('LBL_ASSIGNED_STATUS' , $MODULE)} : <strong>{$LISTVIEW_ENTRY->get('rr_assigned_status')}</strong></span>
									<br/>
								</td>
								<td>
                                    <span>{if $LISTVIEW_ENTRY->get('rr_online_users_only') == 1}Yes{else}No{/if}</span>
								</td>
								<td>
                                    <span>{$LISTVIEW_ENTRY->get('users')}</span>
								</td>
                                <td>
                                    <div>
                                        <a href="index.php?module=VTERoundRobin&parent=Settings&view=Edit&record={$LISTVIEW_ENTRY->get('roundrobinid')}"><i class="fa fa-pencil"></i> Edit</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <a href="javascript:void(0)"  class="deleteRecordButton"><i class="fa fa-trash"></i> Delete</a>
                                    </div>
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
	</div>
{/strip}
