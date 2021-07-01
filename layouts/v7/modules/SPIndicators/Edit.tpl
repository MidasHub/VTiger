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
    <div class="main-container clearfix">
        <div id="modnavigator" class="module-nav editViewModNavigator">
            <div class="hidden-xs hidden-sm mod-switcher-container">
                {include file="partials/Menubar.tpl"|vtemplate_path:$MODULE}
            </div>
        </div>

        <div class="editViewPageDiv viewContent">
            <div id="spWidgetReport" class="reportContents">
                <div class="col-sm-12 col-xs-12 content-area {if $LEFTPANELHIDE eq '1'} full-width {/if}">
                    <form id="indicatorsMainForm" class="form-horizontal recordEditView" method="post" action="index.php">
                        <div class="editViewHeader">
                            <div class='row'>
                                <div class="col-lg-12 col-md-12 col-lg-pull-0">
                                    {assign var=SINGLE_MODULE_NAME value='SINGLE_'|cat:$MODULE}
                                    {if $RECORD_ID neq ''}
                                        <h4 class="editHeader" style="margin-top:5px;" title="{vtranslate('LBL_EDITING', $MODULE)} {vtranslate($SINGLE_MODULE_NAME, $MODULE)} {$RECORD_STRUCTURE_MODEL->getRecordName()}">{vtranslate('LBL_EDITING', $MODULE)} {vtranslate($SINGLE_MODULE_NAME, $MODULE)} - {$RECORD_STRUCTURE_MODEL->getRecordName()}</h4>
                                    {else}
                                        <h4 class="editHeader" style="margin-top:5px;">{vtranslate('LBL_CREATING_NEW', $MODULE)} {vtranslate($SINGLE_MODULE_NAME, $MODULE)}</h4>
                                    {/if}
                                </div>
                            </div>
                        </div>



                        <div class="editViewBody">
                            <div class="editViewContents">
                                <div class='fieldBlockContainer'>
                                    <div class="row">
                                        <input type="hidden" name="module" value="{$MODULE}" />
                                        <input type="hidden" name="action" value="Save" >
                                        <input type="hidden" name="isDuplicate" value="{$IS_DUPLICATE}" />
                                        <input type="hidden" name="record" value="{$RECORD_ID}" />
                                        <input type="hidden" name="layers" value=""/>
                                        <input type="hidden" name="reportsIdsToNamesMap" id="reportsIdsToNamesMap" value='{ZEND_JSON::encode($REPORTS_CALCULATIONS_TYPES[vtranslate('All')])}'>
                                        <input type="hidden" name="foldersDependency" id="foldersDependency" value='{ZEND_JSON::encode($REPORTS_CALCULATIONS_TYPES)}'>

                                        <div class="row padding1per">
                                            <div class="col-md-3">{vtranslate('LBL_NAME', $MODULE)}<span class="redColor">*</span></div>
                                            <div class="col-md-4">
                                                <input class="inputElement" style="min-width: 400px;" type="text" name="name" id="editName" value="{$MODEL->get('name')}"/>
                                            </div>
                                        </div>
                                        <div class="row padding1per">
                                            <div class="col-md-3">&nbsp;</div>
                                            <div class="col-md-4">
                                                <table id="indicatorLayers" class="table table-bordered" style="table-layout: fixed;">
                                                    <thead>
                                                        <tr class="listViewHeaders">
                                                        <th>{vtranslate('LBL_LAYERS', $MODULE)}</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody class="ui-sortable" style="cursor: pointer">
                                                    <input type="hidden" id="dragImagePath" value="layouts/v7/skins/images/drag.png">
                                                    <tr class="hide">
                                                        <td class="textOverflowEllipsis selectedListItem">
                                                            <img class="alignMiddle" src="layouts/v7/skins/images/drag.png">
                                                            <div class="indicatorName" style="display: inline-block; margin-left: 5px;"></div>
                                                            <div style="float: right; display: inline-block">
                                                                <i title="{vtranslate('LBL_EDIT')}" class="icon-pencil fa fa-pencil alignMiddle"></i>
                                                                &nbsp;&nbsp;
                                                                <i title="{vtranslate('LBL_DELETE')}" class="icon-trash fa fa-trash alignMiddle"></i>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    {foreach item=INDICATOR from=$INDICATORS_LIST}
                                                        <tr data-details='{ZEND_JSON::encode($INDICATOR->getIndicatorInfo())}'>
                                                            <td class="textOverflowEllipsis selectedListItem">
                                                                <img class="alignMiddle" src="layouts/v7/skins/images/drag.png">
                                                                <div class="indicatorName" style="display: inline-block; margin-left: 5px;">{$INDICATOR->getName()}</div>
                                                                <span style="float: right; display: inline-block">
                                                                    <i title="{vtranslate('LBL_EDIT')}" class="icon-pencil fa fa-pencil alignMiddle"></i>
                                                                    &nbsp;&nbsp;
                                                                    <i title="{vtranslate('LBL_DELETE')}" class="icon-trash fa fa-trash alignMiddle"></i>
                                                                </span>

                                                            </td>
                                                        </tr>
                                                    {/foreach}
                                                    </tbody>
                                                </table>
                                                <button class="btn btn-default col-md-7 marginLeftZero" id="addIndicator" style="margin-top: 15px;">{vtranslate('LBL_ADD_INDICATOR', $MODULE)}</button>
                                            </div>
                                        </div>
                                        <div class="row padding1per">
                                            <div class="col-md-3">{vtranslate('LBL_CALCULATE_USERS', $MODULE)}<span class="redColor">*</span></div>
                                            <div class="col-md-7">
                                                <div class="col-md-6" style="margin-left: -15px;">
                                                    {assign var="GROUP_MEMBERS" value=$MODEL->getCalculateMembers()}
                                                    <select id="memberList" class="row members col-md-10" multiple="true" name="members[]" data-placeholder="{vtranslate('LBL_ADD_USERS_GROUPS', $MODULE)}">
                                                        {foreach from=$MODEL->getAllCalculateMembers() key=GROUP_LABEL item=ALL_CALCULATE_MEMBERS}
                                                            <optgroup label="{vtranslate($GROUP_LABEL, $MODULE)}" >
                                                                {foreach from=$ALL_CALCULATE_MEMBERS item=MEMBER}
                                                                    <option value="{$MEMBER->getId()}"  data-member-type="{$GROUP_LABEL}" {if isset($GROUP_MEMBERS[$GROUP_LABEL][$MEMBER->getId()])}selected="true"{/if}>{$MEMBER->getName()}</option>
                                                                {/foreach}
                                                            </optgroup>
                                                        {/foreach}
                                                    </select>
                                                </div>
                                                <div class="col-md-3">
                                                    <div class="pull-left groupMembersColors">
                                                        <ul class="liStyleNone">
                                                            <li class="Users padding5per textAlignCenter"><strong>{vtranslate('LBL_USERS', $QUALIFIED_MODULE)}</strong></li>
                                                            <li class="Groups padding5per textAlignCenter"><strong>{vtranslate('LBL_GROUPS', $QUALIFIED_MODULE)}</strong></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row padding1per">
                                            <div class="col-md-3">{vtranslate('LBL_DESCRIPTION', $MODULE)}</div>
                                            <div class="col-md-7">
                                                <textarea class="col-md-6" type="text" name="description" style="min-height: 100px;">{$MODEL->get('description')}</textarea>
                                            </div>
                                            {include file="partials/EditViewContents.tpl"|@vtemplate_path:$MODULE}
                                        </div>
                                    </div>
                                </div>
                            </div></div>


                        <div class="wrapper"></div>
                        <div class="modal-overlay-footer">
                            <div class="row clearfix">
                                <div class='textAlignCenter col-lg-12 col-md-12 col-sm-12 '>
                                    <button class="btn btn-success saveButton" id="saveSpWidgetReport" type="submit">{vtranslate('LBL_SAVE', $MODULE)}</button>&nbsp;&nbsp;
                                    <a class="cancelLink" href="javascript:history.back()" type="reset">{vtranslate('LBL_CANCEL', $MODULE)}</a>
                                </div>
                            </div>
                        </div> 
                    </form>
                    {include file="ExpressionEdit.tpl"|@vtemplate_path:$MODULE}
                   
                </div>
            </div>
        </div>
    </div>
{/strip}