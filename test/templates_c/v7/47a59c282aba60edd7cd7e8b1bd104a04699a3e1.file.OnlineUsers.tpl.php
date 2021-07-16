<?php /* Smarty version Smarty-3.1.7, created on 2021-07-16 15:08:43
         compiled from "/var/www/html/VTiger/includes/runtime/../../layouts/v7/modules/Settings/VTERoundRobin/OnlineUsers.tpl" */ ?>
<?php /*%%SmartyHeaderCode:141148756560f1a0fb4e1ad4-49906712%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '47a59c282aba60edd7cd7e8b1bd104a04699a3e1' => 
    array (
      0 => '/var/www/html/VTiger/includes/runtime/../../layouts/v7/modules/Settings/VTERoundRobin/OnlineUsers.tpl',
      1 => 1626434955,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '141148756560f1a0fb4e1ad4-49906712',
  'function' => 
  array (
  ),
  'variables' => 
  array (
    'USERS' => 0,
    'USER' => 0,
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.7',
  'unifunc' => 'content_60f1a0fb4e84a',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_60f1a0fb4e84a')) {function content_60f1a0fb4e84a($_smarty_tpl) {?>

<div class="modal-dialog modelContainer"><div class="modal-content" style="width:675px;"><div class="modal-header"><div class="clearfix"><div class="pull-right " ><button type="button" class="close" aria-label="Close" data-dismiss="modal"><span aria-hidden="true" class='fa fa-close'></span></button></div><h4 class="pull-left">Online Users</h4></div></div><div class="modal-body"><table style="width: 100%;" class="listview-table table-bordered listViewEntriesTable"><thead><tr class="listViewHeaders"><th style="text-align: center;">First Name</th><th style="text-align: center;">Last Name</th><th style="text-align: center;">Email</th><th style="text-align: center;">Role</th></tr></thead><tbody><?php  $_smarty_tpl->tpl_vars['USER'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['USER']->_loop = false;
 $_from = $_smarty_tpl->tpl_vars['USERS']->value; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['USER']->key => $_smarty_tpl->tpl_vars['USER']->value){
$_smarty_tpl->tpl_vars['USER']->_loop = true;
?><tr class="listViewEntries"><td class="listViewEntryValue value textOverflowEllipsis " style="padding: 5px"><?php echo $_smarty_tpl->tpl_vars['USER']->value->get('first_name');?>
</td><td class="listViewEntryValue value textOverflowEllipsis " style="padding: 5px"><?php echo $_smarty_tpl->tpl_vars['USER']->value->get('last_name');?>
</td><td class="listViewEntryValue value textOverflowEllipsis " style="padding: 5px"><?php echo $_smarty_tpl->tpl_vars['USER']->value->get('email1');?>
</td><td class="listViewEntryValue value textOverflowEllipsis " style="padding: 5px"><?php echo $_smarty_tpl->tpl_vars['USER']->value->get('rolename');?>
</td></tr><?php } ?></tbody></table></div></div></div>
<?php }} ?>