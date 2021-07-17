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
        <div class="col-sm-6"><h4><label>{vtranslate('Predictive Fields', 'VTEPredictiveFields')}</label>
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
                    &nbsp;&nbsp;{vtranslate('New Predictive Fields' , $MODULE)}
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
                        <th nowrap>Last X Days</th>
                        <th nowrap>Fields</th>
                        <th nowrap>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {foreach item=LISTVIEW_ENTRY from=$LISTVIEW_ENTRIES}
                    <tr class="listViewEntries" data-url = {{$MODULE_MODEL->getCreateViewUrl($LISTVIEW_ENTRY['id'])}}>
                        <td style="text-align: center">
                            <input style="opacity: 0;" {if $LISTVIEW_ENTRY['active'] == '1'} checked value="on" {else} value="off"{/if} data-on-color="success"  data-id="{$LISTVIEW_ENTRY['id']}" type="checkbox" name="predictive_field_status" id="predictive_field_status">
                        </td>
                        <td>
                            <span class="vicon-{strtolower($LISTVIEW_ENTRY['module'])} module-icon"></span><span style="vertical-align: 5px;">&nbsp;{vtranslate($LISTVIEW_ENTRY['module'],$LISTVIEW_ENTRY['module'])}</span>
                        </td>
                        <td>
                            {$LISTVIEW_ENTRY['last_x_days']}
                        </td>
                        <td>
                            <div class="header-div">
                               {foreach item=FIELD from=$LISTVIEW_ENTRY['list_fields'] name=fieldidex}
                                 {$FIELD['field_label']}
                                 {if not $smarty.foreach.fieldidex.last} , {/if}
                               {/foreach}
                            </div>
                        </td>
                        <td>
                            <a href="{$MODULE_MODEL->getCreateViewUrl($LISTVIEW_ENTRY['id'])}"><i class="fa fa-pencil"></i> Edit</a>
                            <a href="javascript:void(0)" data-id="{$LISTVIEW_ENTRY['id']}" id="predictive_field_delete" style="margin-left: 10px;"><i class="fa fa-trash"></i> Delete</a>
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