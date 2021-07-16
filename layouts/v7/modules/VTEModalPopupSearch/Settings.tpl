{*<!--
/* ********************************************************************************
* The content of this file is subject to the Custom Header/Bills ("License");
* You may not use this file except in compliance with the License
* The Initial Developer of the Original Code is VTExperts.com
* Portions created by VTExperts.com. are Copyright(C) VTExperts.com.
* All Rights Reserved.
* ****************************************************************************** */
-->*}
<style>
    .rcorners2 {
        border-radius: 5px;
        padding: 10px;
        width: 40px;
        height: 40px;
        float: left;
    }
</style>
<div class="container-fluid WidgetsManage">
    <div class="widget_header row">
        <div class="col-sm-6"><h4><label>{vtranslate('VTEModalPopupSearch', 'VTEModalPopupSearch')}</label>
        </div>
    </div>
    <hr>
    <div class="clearfix"></div>
    <div class = "row">
        <div class='col-md-5'>
            <div class="foldersContainer pull-left">
                <button type="button" class="btn addButton btn-default module-buttons"
                        onclick='window.location.href = "{$MODULE_MODEL->getCreateViewUrl()}"'>
                    <div class="fa fa-plus" ></div>
                    &nbsp;&nbsp;{vtranslate('lbl_new_vtemodalpopupsearch' , $MODULE)}
                </button>
            </div>
        </div>
        <div class="col-md-4">
        </div>
        <div class="col-md-3">

        </div>
    </div>
    <div class="list-content row">
        <div class="col-sm-12 col-xs-12 ">
            <div id="table-content" class="table-container" style="padding-top:0px !important;">
                <table id="listview-table" class="table listview-table">
                    <thead>
                    <tr class="listViewContentHeader">
                        <th></th>
                        <th nowrap>Module</th>
                        <th nowrap>Target Field</th>
                        <th nowrap>Conditions</th>
                        <th nowrap>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {foreach item=LISTVIEW_ENTRY from=$LISTVIEW_ENTRIES}
                    <tr class="listViewEntries" data-url = {{$MODULE_MODEL->getCreateViewUrl($LISTVIEW_ENTRY['id'])}}>
                        <td>
                            <input style="opacity: 0;" {if $LISTVIEW_ENTRY['active'] == '1'} checked value="on" {else} value="off"{/if} data-on-color="success"  data-id="{$LISTVIEW_ENTRY['id']}" type="checkbox" name="custom_header_status" id="custom_header_status">
                        </td>
                        <td>
                            <span class="vicon-{strtolower($LISTVIEW_ENTRY['module'])} module-icon"></span><span style="vertical-align: 5px;">&nbsp;{vtranslate($LISTVIEW_ENTRY['module'],$LISTVIEW_ENTRY['module'])}</span>
                        </td>
                        <td>
                            {vtranslate($LISTVIEW_ENTRY['field_value'],$LISTVIEW_ENTRY['module'])}
                        </td>
                        <td>
                            {assign var=CONDITION value=$LISTVIEW_ENTRY['row_conditions']}
                            {assign var=ALL_CONDITIONS value=$CONDITION['All']}
                            {assign var=ANY_CONDITIONS value=$CONDITION['Any']}
                            <span><strong>{vtranslate('All')}&nbsp;: </strong></span>
                            {if is_array($ALL_CONDITIONS) && !empty($ALL_CONDITIONS)}
                                {foreach item=ALL_CONDITION from=$ALL_CONDITIONS name=allCounter}
                                    <span>{$ALL_CONDITION}</span>
                                    <br/>
                                {/foreach}
                            {else}
                                {vtranslate('LBL_NA')}
                                <br/>
                            {/if}
                            <span><strong>{vtranslate('Any')}&nbsp;:&nbsp;</strong></span>
                            {if is_array($ANY_CONDITIONS) && !empty($ANY_CONDITIONS)}
                                {foreach item=ANY_CONDITION from=$ANY_CONDITIONS name=anyCounter}
                                    <span>{$ANY_CONDITION}</span>
                                    <br/>
                                {/foreach}
                            {else}
                                {vtranslate('LBL_NA')}
                            {/if}
                        </td>
                        <td>
                            <a href="{$MODULE_MODEL->getCreateViewUrl($LISTVIEW_ENTRY['id'])}"><i class="fa fa-pencil"></i> Edit</a>
                            <a href="javascript:void(0)" data-id="{$LISTVIEW_ENTRY['id']}" id="vtecustom_header_delete" style="margin-left: 10px;"><i class="fa fa-trash"></i> Delete</a>
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