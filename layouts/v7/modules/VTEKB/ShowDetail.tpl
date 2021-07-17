{*<!--
/* ********************************************************************************
* The content of this file is subject to the VTE Quick Edit ("License");
* You may not use this file except in compliance with the License
* The Initial Developer of the Original Code is VTExperts.com
* Portions created by VTExperts.com. are Copyright(C) VTExperts.com.
* All Rights Reserved.
* ****************************************************************************** */
-->*}
<script>
    $(".vtekb-body-detail-content").on('click', 'a', function(e){ 
    e.preventDefault(); 
    var url = $(this).attr('href'); 
    window.open(url, '_blank');
    });
</script>
<div id="vtekbContainer" class="container-fluid WidgetsManage vtekb-bg"  style="padding-left: 0px !important; padding-right: 0px !important">
	<input type="hidden" id="hfSourceModuleVTEKB" value="{$SOURCE_MODULE}" />
    {include file='HeaderPage.tpl'|@vtemplate_path:$QUALIFIED_MODULE}
    <div class='vtekb-body row'>
		<div class='vtekb-body-detail-title row' style="margin: 0px;">
			<div class="col-md-12">
				<h1 class="vtekb-title">{$TITLE}</h1>
			</div>
		</div>
		<div class='vtekb-body-detail-content row'>
			<div class="col-md-12">
				<div class="vtekb-content">{$CONTENT}</div>
			</div>
		</div>
	</div>
</div>