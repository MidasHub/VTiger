{*+***********************************************************************************
* The contents of this file are subject to the vtiger CRM Public License Version 1.0
* ("License"); You may not use this file except in compliance with the License
* The Original Code is: vtiger CRM Open Source
* The Initial Developer of the Original Code is vtiger.
* Portions created by vtiger are Copyright (C) vtiger.
* All Rights Reserved.
*************************************************************************************}
{strip}
    {*SLA Policy Details*}
    <style>
        .tooltip-inner {
            max-width: 350px;
            /* If max-width does not work, try using width instead */
            width: 350px;
        }
    </style>
    <div class="editViewPageDiv">
        <div class="col-sm-12 col-xs-12" id="EditView">
            <form id="editView" action="index.php" method="post" name="EditVTERoundRobin" class="form-horizontal">
                <input type="hidden" name="module" id="module" value="{$MODULE}">
                <input type="hidden" name="action" value="SaveVTERoundRobin" />
                <input type="hidden" name="parent" value="Settings" />
                <input type="hidden" name="record" id="record" value="{$RECORD_DATA['record']}">
                <div class="editViewHeader">
                    <div class="row">
                        <div class="col-lg-12 col-md-12 col-lg-pull-0">
                            <h4>{vtranslate('Round Robin Policy',{$QUALIFIED_MODULE})}</h4>
                        </div>
                    </div>
                </div>
                <hr style="margin-top: 0px !important;">
                <div class="editViewBody">
                    <div class="editViewContents">
                        <div class="col-sm-12 col-xs-12">
                            <div class="col-sm-7 col-xs-7 form-horizontal">
                                <div class="form-group">
                                    <label for="rr_name" class="setting-field col-sm-5">
                                        <span>{vtranslate('LBL_NAME',{$QUALIFIED_MODULE})}</span>
                                        <span class="redColor">*</span>
                                    </label>
                                    <div class="setting-field col-sm-7">
                                        <input class="form-control" id="rr_name" name="rr_name" value="{$RECORD_DATA['rr_name']}" data-rule-required="true" aria-required="true" aria-invalid="true"></div>
                                </div>
                                <div class="form-group">
                                    <label for="rr_module" class="setting-field col-sm-5">
                                        <span>{vtranslate('LBL_MODULE',{$QUALIFIED_MODULE})}</span>
                                        <span class="redColor">*</span>
                                    </label>
                                    <div class="setting-field col-sm-7">
                                        <select class="inputElement select2" id="rr_module" name="rr_module" data-rule-required="true">
                                            <option value="">{vtranslate('LBL_SELECT_OPTION',{$QUALIFIED_MODULE})}</option>
                                            {foreach item=MODULE_VALUES from=$ALL_MODULES}
                                                <option value="{$MODULE_VALUES->name}" {if {$RECORD_DATA['rr_module']} eq $MODULE_VALUES->name} selected="selected"{/if}>{vtranslate($MODULE_VALUES->label,$RECORD_DATA['rr_module'])}</option>
                                            {/foreach}
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="rr_status_field" class="setting-field col-sm-5">
                                        <span>{vtranslate('LBL_STATUS_FIELD',{$QUALIFIED_MODULE})}</span><span class="redColor">*</span> <i class="cursorPointer fa fa-info-circle" data-toggle="tooltip" title="{vtranslate('LBL_STATUS_TOOLTIPS',{$QUALIFIED_MODULE})}"></i>
                                    </label>
                                    <div class="setting-field col-sm-7">
                                        <select class="inputElement select2" id="rr_status_field" name="rr_status_field" data-rule-required="true">
                                            <option value="">{vtranslate('LBL_SELECT_OPTION',{$QUALIFIED_MODULE})}</option>
                                            {foreach item=FIELD_LABEL key=FIELD_NAME from=$FIELDS_PICKLIST_MODULE}
                                                <option value="{$FIELD_NAME}" {if $RECORD_DATA['rr_status_field'] == $FIELD_NAME}selected="selected"{/if}>{$FIELD_LABEL}</option>
                                            {/foreach}
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="rr_unassigned_status" class="setting-field col-sm-5">
                                        <span style="margin-left: 30px;">{vtranslate('LBL_UNASSIGNED_STATUS',{$QUALIFIED_MODULE})}</span><span class="redColor">*</span> <i class="cursorPointer fa fa-info-circle" data-toggle="tooltip" title="{vtranslate('LBL_UNASSIGNED_TOOLTIPS',{$QUALIFIED_MODULE})}"></i>
                                    </label>
                                    <div class="setting-field col-sm-7">
                                        <select class="inputElement select2" id="rr_unassigned_status" name="rr_unassigned_status" data-rule-required="true">
                                            <option value="">{vtranslate('LBL_SELECT_OPTION',{$QUALIFIED_MODULE})}</option>
                                            {foreach item=FIELD_VALUE_LABEL key=FIELD_VALUE from=$FIELDS_PICKLIST_MODULE_VALUES}
                                                <option value="{$FIELD_VALUE}" {if $RECORD_DATA['rr_unassigned_status'] == $FIELD_VALUE}selected="selected"{/if}>{$FIELD_VALUE}</option>
                                            {/foreach}
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="rr_assigned_status" class="setting-field col-sm-5">
                                        <span style="margin-left: 30px;">{vtranslate('LBL_ASSIGNED_STATUS',{$QUALIFIED_MODULE})}</span><span class="redColor">*</span> <i class="cursorPointer fa fa-info-circle" data-toggle="tooltip" title="{vtranslate('LBL_ASSIGNED_TOOLTIPS',{$QUALIFIED_MODULE})}"></i>
                                    </label>
                                    <div class="setting-field col-sm-7">
                                        <select class="inputElement select2" id="rr_assigned_status" name="rr_assigned_status" data-rule-required="true">
                                            <option value="">{vtranslate('LBL_SELECT_OPTION',{$QUALIFIED_MODULE})}</option>
                                            {foreach item=FIELD_VALUE_LABEL key=FIELD_VALUE from=$FIELDS_PICKLIST_MODULE_VALUES}
                                                <option value="{$FIELD_VALUE}" {if $RECORD_DATA['rr_assigned_status'] == $FIELD_VALUE}selected="selected"{/if}>{$FIELD_VALUE}</option>
                                            {/foreach}
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="rr_online_users_only" class="setting-field col-sm-5">
                                        <span>{vtranslate('LBL_ONLINE_USERS_ONLY',{$QUALIFIED_MODULE})}</span> <i class="cursorPointer fa fa-info-circle" data-toggle="tooltip" title="{vtranslate('LBL_ONLINE_USERS_ONLY_TOOLTIPS',{$QUALIFIED_MODULE})}"></i>
                                    </label>
                                    <div class="setting-field col-sm-7">
                                        <input type="checkbox" {if $RECORD_DATA['rr_online_users_only'] == 1}checked value="on"{/if} class="inputElement switch-input" data-on-color="success" id="rr_online_users_only" name="rr_online_users_only">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="rr_assigment_type" class="setting-field col-sm-5">
                                        <span>{vtranslate('LBL_ASSIGMENT_TYPE',{$QUALIFIED_MODULE})}<span class="redColor">*</span> <i class="cursorPointer fa fa-info-circle" data-toggle="tooltip" title="{vtranslate('LBL_ASSIGMENT_TYPE_TOOLTIPS',{$QUALIFIED_MODULE})}"></i></span>
                                    </label>
                                    <div class="setting-field col-sm-7">
                                        <select class="inputElement select2" id="rr_assigment_type" name="rr_assigment_type" data-rule-required="true">
                                            <option value="standard" {if $RECORD_DATA['rr_assigment_type'] == 'standard'}selected="selected"{/if}>{vtranslate('standard',{$QUALIFIED_MODULE})}</option>
                                            <option value="based_on_efficiency" {if $RECORD_DATA['rr_assigment_type'] == 'based_on_efficiency'}selected="selected"{/if}>{vtranslate('based_on_efficiency',{$QUALIFIED_MODULE})}</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="rr_assign_preferred_user" class="setting-field col-sm-5">
                                        <span>{vtranslate('Assign Preferred User',{$QUALIFIED_MODULE})}</span> <i class="cursorPointer fa fa-info-circle" data-toggle="tooltip" title="{vtranslate('LBL_ASSIGN_PREFER_USER_TOOLTIPS',{$QUALIFIED_MODULE})}"></i>
                                    </label>
                                    <div class="setting-field col-sm-7 rr_assign_preferred_user">
                                        <input {if $RECORD_DATA['rr_module'] != 'HelpDesk'}disabled{/if} type="checkbox" {if $RECORD_DATA['rr_assign_preferred_user'] == 1 && $RECORD_DATA['rr_module'] == 'HelpDesk'}checked value="on"{/if} class="inputElement switch-input" data-on-color="success" id="rr_assign_preferred_user" name="rr_assign_preferred_user">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="rr_members" class="setting-field col-sm-5">
                                        <span>{vtranslate('LBL_MEMBERS',{$QUALIFIED_MODULE})}</span><span class="redColor">*</span>  <i class="cursorPointer fa fa-info-circle" data-toggle="tooltip" title="{vtranslate('LBL_MEMBERS_TOOLTIPS',{$QUALIFIED_MODULE})}"></i>
                                    </label>
                                    <div class="setting-field col-sm-7">
                                        <select class="inputElement select2" id="rr_members"
                                                name="rr_members[]" multiple="multiple" data-rule-required="true">
                                            {foreach item=USER_MODEL from=$ALL_USERS}
                                                <option value="{$USER_MODEL->getId()}" {if !empty($RECORD_DATA['record']) && in_array($USER_MODEL->getId(),$RECORD_DATA['rr_members'])}selected="" {/if}>{$USER_MODEL->get('first_name')} {$USER_MODEL->get('last_name')}</option>
                                            {/foreach}
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="rr_status" class="setting-field col-sm-5">
                                        <span>{vtranslate('LBL_STATUS',{$QUALIFIED_MODULE})}</span><span class="redColor">*</span>
                                    </label>
                                    <div class="setting-field col-sm-7">
                                        <select class="inputElement select2" id="rr_status" name="rr_status" data-rule-required="true">
                                            <option value="Active" {if $RECORD_DATA['rr_status'] == 'Active'}selected="selected"{/if}>{vtranslate('LBL_ACTIVE',{$QUALIFIED_MODULE})}</option>
                                            <option value="Inactive" {if $RECORD_DATA['rr_status'] == 'Inactive'}selected="selected"{/if}>{vtranslate('LBL_INACTIVE',{$QUALIFIED_MODULE})}</option>
                                        </select>
                                    </div>
                                </div>

                            </div>
                            <div class="col-sm-5 col-xs-5 sla-policies-info">
                                <div class="label-info">
                                    <h5>
                                        <span class="glyphicon glyphicon-info-sign"></span> Info
                                    </h5>
                                </div>
                                <span>Here's how it works: Let's assume that you need tickets automatically assigned to your support users. First, select Tickets as your module. Next, status field has to be selected. It is used to identify any unassigned tickets. In our example, say we selected Status as "Ticket Status", Unassigned Status Value as "Open" and Assigned Status value as "In-Progress". This means, that if there's a ticket with status "Open" - it will get picked up by the round robin and assigned to one of the members on the policy. In addition, that ticket status will be updated to "In-Progress". Essentially, round robin finds all tickets with status "Open" (unassigned status) and assigns them to members + updates ticket status to "In-Progress" (assigned status). </br></br>

In addition, a field "Round Robin Policy" to tickets. This field is not editable and only visible on detail view. It will identify what policy was used to assign the record. </br></br>

*NOTE: Records are assigned when the cronjob runs. You have to make sure cronjob is setup and enabled.</span>

                            </div>
                        </div>
                        {if $RECORD_DATA['record']}
                            {*SLA Target*}
                            <div class="col-sm-12 col-xs-12 conditionsContainer" style="margin-bottom: 70px;">
                                <hr/>
                                <div class="col-sm-12 col-xs-12 form-horizontal" style="margin-left: 25px">
                                    <table class="sla-policy-listview-table table listview-table">
                                        <thead>
                                        <tr class="listViewContentHeader">
                                            <th nowrap>{vtranslate('Date time' , $MODULE)}</th>
                                            <th nowrap>{vtranslate('User' , $MODULE)}</th>
                                            <th nowrap>{vtranslate('Record' , $MODULE)}</th>
                                            <th>
                                                {assign var=RECORD_COUNT value=count($ROUNDROBIN_ASSIGMENTS)}
                                                {include file="EditAssigmentPagination.tpl"|vtemplate_path:$QUALIFIED_MODULE SHOWPAGEJUMP=false}
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {foreach item=ROUNDROBIN_ASSIGMENT from=$ROUNDROBIN_ASSIGMENTS}
                                            <tr>
                                                <td>{Vtiger_Util_Helper::convertDateTimeIntoUsersDisplayFormat($ROUNDROBIN_ASSIGMENT['datetime'],$CURRENT_USER)}</td>
                                                <td>
                                                    {$ROUNDROBIN_ASSIGMENT['user']->get('first_name')} {$ROUNDROBIN_ASSIGMENT['user']->get('last_name')}
                                                </td>
                                                <td colspan="2">
                                                    <a target="_blank" href="{$ROUNDROBIN_ASSIGMENT['record']->getDetailViewUrl()}">{$ROUNDROBIN_ASSIGMENT['record']->get('label')}</a>
                                                </td>
                                            </tr>
                                        {/foreach}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        {/if}
                    </div>
                </div>

                {*footer*}

                <div class="modal-overlay-footer clearfix">
                    <div class="row clearfix">
                        <div class="textAlignCenter col-lg-12 col-md-12 col-sm-12 ">
                            <button type="submit" class="btn btn-success buttonSave">Save</button>&nbsp;&nbsp;<a class="cancelLink" href="javascript:history.back()" type="reset">{vtranslate('LBL_CANCEL',{$QUALIFIED_MODULE})}</a>
                        </div>
                    </div>
                </div>
            </form>
        </div>

    </div>
    <script>
        $(document).ready(function(){
            $('[data-toggle="tooltip"]').tooltip();
        });
    </script>
{/strip}