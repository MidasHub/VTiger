{*<!--
/* ********************************************************************************
* The content of this file is subject to the VTE Quick Edit ("License");
* You may not use this file except in compliance with the License
* The Initial Developer of the Original Code is VTExperts.com
* Portions created by VTExperts.com. are Copyright(C) VTExperts.com.
* All Rights Reserved.
* ****************************************************************************** */
-->*}
<div id="vtekbContainer" class="container-fluid WidgetsManage vtekb-bg">
	<input type="hidden" id="hfSourceModuleVTEKB" value="{$SOURCE_MODULE}" />
    {include file='HeaderPage.tpl'|@vtemplate_path:$QUALIFIED_MODULE}
    <div class='vtekb-body row'>
		<div class='vtekb-body-detail-title row'>
			<div class="span12">
				<h1 class="vtekb-title">{$TITLE}</h1>
			</div>
		</div>
		<div class='vtekb-body-detail-content row'>
			<div class="">
				<div class="vtekb-content">{$CONTENT}</div>
			</div>
		</div>
	</div>
</div>