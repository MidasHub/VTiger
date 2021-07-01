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
<div class="dashboardWidgetHeader">
{foreach key=index item=cssModel from=$STYLES}
	<link rel="{$cssModel->getRel()}" href="{$cssModel->getHref()}" type="{$cssModel->getType()}" media="{$cssModel->getMedia()}" />
{/foreach}
{foreach key=index item=jsModel from=$SCRIPTS}
	<script type="{$jsModel->getType()}" src="{$jsModel->getSrc()}"></script>
{/foreach}

<table width="100%" cellspacing="0" cellpadding="0">
	<tbody>
		<tr>
			<td width="30%">
				<div class="dashboardTitle textOverflowEllipsis" title="{vtranslate($WIDGET->getTitle(), $MODULE_NAME)}"><b>{vtranslate($WIDGET->getTitle(), $MODULE_NAME)}</b></div>
			</td>
            <td width="60%">
                <b>{vtranslate('LBL_ASSIGNED_USER', $MODULE_NAME)} &nbsp;</b>
                <select class="widgetFilter" id="assigned_user_id" name="assigned_user_id" style="width:170px; margin-bottom:0px">
                    <option value="{$DEFAULT_ASSIGNED_USER_FILTER}" selected>{vtranslate('LBL_ALL')}</option>
                    {foreach from=$CALCULATE_MEMBERS key=GROUP_LABEL item=ALL_CALCULATE_MEMBERS}
                        <optgroup label="{vtranslate($GROUP_LABEL, $MODULE)}">
                        {foreach from=$ALL_CALCULATE_MEMBERS item=MEMBER}
                            <option value="{$MEMBER->getId()}">{$MEMBER->getName()}</option>
                        {/foreach}
                        </optgroup>
                    {/foreach}
                </select>
            </td>
			<td class="widgeticons" width="10%" align="right">
				<div class="box pull-right">
					{include file="dashboards/DashboardHeaderIcons.tpl"|@vtemplate_path:$MODULE_NAME}
				</div>
			</td>
		</tr>
        <tr>
            <td class="refresh spReportWidgetRefresh" colspan="4">
			</td>
        </tr>
	</tbody>
</table>
</div>
<div class="dashboardWidgetContent {if !$IS_REPORT_VIEW} dashboardHeight {/if}">
	{include file="dashboards/SPIndicatorsDashBoardWidgetContents.tpl"|@vtemplate_path:$MODULE_NAME}
</div>
{/strip}