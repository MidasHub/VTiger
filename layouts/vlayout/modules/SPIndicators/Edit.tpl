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
    <div id="spWidgetReport" class="reportContents">
        <form id="indicatorsMainForm" class="form-horizontal recordEditView" method="post" action="index.php">
            <input type="hidden" name="module" value="{$MODULE}" />
            <input type="hidden" name="action" value="Save" >
            <input type="hidden" name="isDuplicate" value="{$IS_DUPLICATE}" />
            <input type="hidden" name="record" value="{$RECORD_ID}" />
            <input type="hidden" name="layers" value=""/>
            <input type="hidden" name="reportsIdsToNamesMap" id="reportsIdsToNamesMap" value='{ZEND_JSON::encode($REPORTS_CALCULATIONS_TYPES[vtranslate('All')])}'>
            <input type="hidden" name="foldersDependency" id="foldersDependency" value='{ZEND_JSON::encode($REPORTS_CALCULATIONS_TYPES)}'>
            <div class="well contentsBackground">
                <div class="row-fluid padding1per">
                    <span class="span3">{vtranslate('LBL_NAME', $MODULE)}<span class="redColor">*</span></span>
                    <span class="span7">
                        <input class="span6" data-validation-engine='validate[required]' type="text" name="name" value="{$MODEL->get('name')}"/>
                    </span>
                </div>
                <div class="row-fluid padding1per">
                    <span class="span3">&nbsp;</span>
                    <span class="span4">
                        <table id="indicatorLayers" class="table table-bordered" style="table-layout: fixed;">
                            <thead>
                                <tr class="listViewHeaders">
                                    <th>{vtranslate('LBL_LAYERS', $MODULE)}</th>
                                </tr>
                            </thead>
                            <tbody class="ui-sortable" style="cursor: pointer">
                                <input type="hidden" id="dragImagePath" value="layouts/vlayout/skins/images/drag.png">
                                <tr class="hide">
                                    <td class="textOverflowEllipsis selectedListItem">
                                        <img class="alignMiddle" src="layouts/vlayout/skins/images/drag.png">
                                        <span class="indicatorName" style="display: inline-block; margin-left: 5px;"></span>
                                        <span style="float: right; display: inline-block">
                                            <i title="{vtranslate('LBL_EDIT')}" class="icon-pencil alignMiddle"></i>
                                            &nbsp;&nbsp;
                                            <i title="{vtranslate('LBL_DELETE')}" class="icon-trash alignMiddle"></i>
                                        </span>
                                    </td>
                                </tr>
                                {foreach item=INDICATOR from=$INDICATORS_LIST}
                                    <tr data-details='{ZEND_JSON::encode($INDICATOR->getIndicatorInfo())}'>
                                        <td class="textOverflowEllipsis selectedListItem">
                                            <img class="alignMiddle" src="layouts/vlayout/skins/images/drag.png">
                                            <span class="indicatorName" style="display: inline-block; margin-left: 5px;">{$INDICATOR->getName()}</span>
                                            <span style="float: right; display: inline-block">
                                                <i title="{vtranslate('LBL_EDIT')}" class="icon-pencil alignMiddle"></i>
                                                &nbsp;&nbsp;
                                                <i title="{vtranslate('LBL_DELETE')}" class="icon-trash alignMiddle"></i>
                                            </span>
                                            
                                        </td>
                                    </tr>
                                {/foreach}
                            </tbody>
                        </table>
                        <button class="btn span3 marginLeftZero" id="addIndicator" style="margin-top: 15px;">{vtranslate('LBL_ADD_INDICATOR', $MODULE)}</button>
                    </span>
                </div>
                <div class="row-fluid padding1per">
                    <span class="span3">{vtranslate('LBL_CALCULATE_USERS', $MODULE)}<span class="redColor">*</span></span>
                    <span class="span7">
                        <span class="span6" style="margin-left: 0px;">
                            {assign var="GROUP_MEMBERS" value=$MODEL->getCalculateMembers()}
                            <select id="memberList" class="row-fluid members" multiple="true" name="members[]" data-placeholder="{vtranslate('LBL_ADD_USERS_GROUPS', $MODULE)}" data-validation-engine="validate[required]">
                                {foreach from=$MODEL->getAllCalculateMembers() key=GROUP_LABEL item=ALL_CALCULATE_MEMBERS}
                                    <optgroup label="{vtranslate($GROUP_LABEL, $MODULE)}">
                                    {foreach from=$ALL_CALCULATE_MEMBERS item=MEMBER}
                                        <option value="{$MEMBER->getId()}"  data-member-type="{$GROUP_LABEL}" {if isset($GROUP_MEMBERS[$GROUP_LABEL][$MEMBER->getId()])}selected="true"{/if}>{$MEMBER->getName()}</option>
                                    {/foreach}
                                    </optgroup>
                                {/foreach}
                            </select>
                        </span>
                        <span class="span3">
                            <span class="pull-left groupMembersColors">
                                <ul class="liStyleNone">
                                    <li class="Users padding5per textAlignCenter"><strong>{vtranslate('LBL_USERS', $QUALIFIED_MODULE)}</strong></li>
                                    <li class="Groups padding5per textAlignCenter"><strong>{vtranslate('LBL_GROUPS', $QUALIFIED_MODULE)}</strong></li>
                                </ul>
                            </span>
                        </span>
                    </span>
                </div>
                <div class="row-fluid padding1per">
                    <span class="span3">{vtranslate('LBL_DESCRIPTION', $MODULE)}</span>
                    <span class="span7">
                        <textarea class="span6" type="text" name="description">{$MODEL->get('description')}</textarea>
                    </span>
                </div>
            </div>
            <div class="pull-right">
                <button id="saveSpWidgetReport" class="btn btn-success"><strong>{vtranslate('LBL_SAVE', $MODULE)}</strong></button>
                <button class="btn btn-danger" onclick="window.history.back(); return false;">{vtranslate('LBL_CANCEL', $MODULE)}</button>
            </div>
        </form>
        
        {include file="ExpressionEdit.tpl"|@vtemplate_path:$MODULE}
    </div>
{/strip}