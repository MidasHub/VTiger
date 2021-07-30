<?php /* Smarty version Smarty-3.1.7, created on 2021-07-29 14:26:12
         compiled from "/var/www/html/vtigercrm/includes/runtime/../../layouts/v7/modules/Settings/VTERoundRobin/ListViewContents.tpl" */ ?>
<?php /*%%SmartyHeaderCode:21084727506102ba84902966-77766822%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    'f71d3c7f285cd6fae6068d5cbbf7c9715d55bb38' => 
    array (
      0 => '/var/www/html/vtigercrm/includes/runtime/../../layouts/v7/modules/Settings/VTERoundRobin/ListViewContents.tpl',
      1 => 1627568753,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '21084727506102ba84902966-77766822',
  'function' => 
  array (
  ),
  'variables' => 
  array (
    'PAGING_MODEL' => 0,
    'LISTVIEW_COUNT' => 0,
    'PAGE_NUMBER' => 0,
    'LISTVIEW_ENTRIES_COUNT' => 0,
    'MODULE_MODEL' => 0,
    'MODULE' => 0,
    'QUALIFIED_MODULE' => 0,
    'LISTVIEW_ENTRIES' => 0,
    'LISTVIEW_ENTRY' => 0,
    'MODULE_ICON_NAME' => 0,
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.7',
  'unifunc' => 'content_6102ba8492c8e',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_6102ba8492c8e')) {function content_6102ba8492c8e($_smarty_tpl) {?>

<div class="col-sm-12 col-xs-12 "><input type="hidden" id="pageStartRange" value="<?php echo $_smarty_tpl->tpl_vars['PAGING_MODEL']->value->getRecordStartRange();?>
" /><input type="hidden" id="pageEndRange" value="<?php echo $_smarty_tpl->tpl_vars['PAGING_MODEL']->value->getRecordEndRange();?>
" /><input type="hidden" id="previousPageExist" value="<?php echo $_smarty_tpl->tpl_vars['PAGING_MODEL']->value->isPrevPageExists();?>
" /><input type="hidden" id="nextPageExist" value="<?php echo $_smarty_tpl->tpl_vars['PAGING_MODEL']->value->isNextPageExists();?>
" /><input type="hidden" id="totalCount" value="<?php echo $_smarty_tpl->tpl_vars['LISTVIEW_COUNT']->value;?>
" /><input type='hidden' value="<?php echo $_smarty_tpl->tpl_vars['PAGE_NUMBER']->value;?>
" id='pageNumber'><input type='hidden' value="<?php echo $_smarty_tpl->tpl_vars['PAGING_MODEL']->value->getPageLimit();?>
" id='pageLimit'><input type="hidden" value="<?php echo $_smarty_tpl->tpl_vars['LISTVIEW_ENTRIES_COUNT']->value;?>
" id="noOfEntries"><div class = "row"><div class='col-md-3'><div class="foldersContainer hidden-xs pull-left"><button type="button" class="btn addButton btn-default module-buttons"onclick='window.location.href = "<?php echo $_smarty_tpl->tpl_vars['MODULE_MODEL']->value->getCreateViewUrl();?>
"'><div class="fa fa-plus" aria-hidden="true"></div>&nbsp;&nbsp;<?php echo vtranslate('ADD_NEW',$_smarty_tpl->tpl_vars['MODULE']->value);?>
</button></div></div><div class='col-md-2'><div class="foldersContainer hidden-xs pull-left"><button id="rr_show_online_users" class="btn btn-default module-buttons" type="button">Online Users</button></div></div><div class="col-md-4"><div class="search-link hidden-xs" style="margin-top: 0px;"><span aria-hidden="true" class="fa fa-search"></span><input class="searchRoundRobin" type="text" type="text" value="" placeholder="<?php echo vtranslate('LBL_SEARCH',$_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value);?>
"></div></div><div class="col-md-3"><?php $_smarty_tpl->tpl_vars['RECORD_COUNT'] = new Smarty_variable($_smarty_tpl->tpl_vars['LISTVIEW_ENTRIES_COUNT']->value, null, 0);?><?php echo $_smarty_tpl->getSubTemplate (vtemplate_path("Pagination.tpl",$_smarty_tpl->tpl_vars['MODULE']->value), $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, null, null, array('SHOWPAGEJUMP'=>true), 0);?>
</div></div><div class="list-content row"><div class="col-sm-12 col-xs-12 "><div id="table-content" class="table-container" style="padding-top:0px !important;"><table id="listview-table" class="sla-policy-listview-table table listview-table"><thead><tr class="listViewContentHeader"><th></th><th nowrap><?php echo vtranslate('LBL_MODULE',$_smarty_tpl->tpl_vars['MODULE']->value);?>
</th><th nowrap><?php echo vtranslate('LBL_NAME',$_smarty_tpl->tpl_vars['MODULE']->value);?>
</th><th nowrap><?php echo vtranslate('Status Field',$_smarty_tpl->tpl_vars['MODULE']->value);?>
</th><th nowrap><?php echo vtranslate('LBL_ONLINE_USERS_ONLY',$_smarty_tpl->tpl_vars['MODULE']->value);?>
</th><th nowrap><?php echo vtranslate('LBL_MEMBERS',$_smarty_tpl->tpl_vars['MODULE']->value);?>
</th><th nowrap><?php echo vtranslate('Actions',$_smarty_tpl->tpl_vars['MODULE']->value);?>
</th></tr></thead><tbody><?php  $_smarty_tpl->tpl_vars['LISTVIEW_ENTRY'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['LISTVIEW_ENTRY']->_loop = false;
 $_from = $_smarty_tpl->tpl_vars['LISTVIEW_ENTRIES']->value; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['LISTVIEW_ENTRY']->key => $_smarty_tpl->tpl_vars['LISTVIEW_ENTRY']->value){
$_smarty_tpl->tpl_vars['LISTVIEW_ENTRY']->_loop = true;
?><tr class="listViewEntries" data-id="<?php echo $_smarty_tpl->tpl_vars['LISTVIEW_ENTRY']->value->get('roundrobinid');?>
"data-recordurl="<?php echo $_smarty_tpl->tpl_vars['LISTVIEW_ENTRY']->value->getEditViewUrl();?>
"><td><?php echo $_smarty_tpl->getSubTemplate (vtemplate_path("ListViewRecordActions.tpl",$_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value), $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, null, null, array(), 0);?>
</td><td><?php ob_start();?><?php echo strtolower($_smarty_tpl->tpl_vars['LISTVIEW_ENTRY']->value->get('rr_module'));?>
<?php $_tmp1=ob_get_clean();?><?php $_smarty_tpl->tpl_vars["MODULE_ICON_NAME"] = new Smarty_variable($_tmp1, null, 0);?><i class="vicon-<?php echo $_smarty_tpl->tpl_vars['MODULE_ICON_NAME']->value;?>
" title="<?php echo $_smarty_tpl->tpl_vars['LISTVIEW_ENTRY']->value->get('rr_module');?>
"></i></td><td><span><?php echo $_smarty_tpl->tpl_vars['LISTVIEW_ENTRY']->value->get('rr_name');?>
</span></td><td><span><?php echo vtranslate('LBL_STATUS_FIELD',$_smarty_tpl->tpl_vars['MODULE']->value);?>
 : <strong><?php echo $_smarty_tpl->tpl_vars['LISTVIEW_ENTRY']->value->get('fieldLabel');?>
</strong></span><br/><span><?php echo vtranslate('LBL_UNASSIGNED_STATUS',$_smarty_tpl->tpl_vars['MODULE']->value);?>
 : <strong><?php echo $_smarty_tpl->tpl_vars['LISTVIEW_ENTRY']->value->get('rr_unassigned_status');?>
</strong></span><br/><span><?php echo vtranslate('LBL_ASSIGNED_STATUS',$_smarty_tpl->tpl_vars['MODULE']->value);?>
 : <strong><?php echo $_smarty_tpl->tpl_vars['LISTVIEW_ENTRY']->value->get('rr_assigned_status');?>
</strong></span><br/></td><td><span><?php if ($_smarty_tpl->tpl_vars['LISTVIEW_ENTRY']->value->get('rr_online_users_only')==1){?>Yes<?php }else{ ?>No<?php }?></span></td><td><span><?php echo $_smarty_tpl->tpl_vars['LISTVIEW_ENTRY']->value->get('users');?>
</span></td><td><div><a href="index.php?module=VTERoundRobin&parent=Settings&view=Edit&record=<?php echo $_smarty_tpl->tpl_vars['LISTVIEW_ENTRY']->value->get('roundrobinid');?>
"><i class="fa fa-pencil"></i> Edit</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:void(0)"  class="deleteRecordButton"><i class="fa fa-trash"></i> Delete</a></div></td></tr><?php } ?></tbody></table></div><div id="scroller_wrapper" class="bottom-fixed-scroll"><div id="scroller" class="scroller-div"></div></div></div></div></div>
<?php }} ?>