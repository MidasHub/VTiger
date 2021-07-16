<?php /* Smarty version Smarty-3.1.7, created on 2021-07-16 15:13:49
         compiled from "/var/www/html/VTiger/includes/runtime/../../layouts/v7/modules/AutomatedBackup/ListFileBackup.tpl" */ ?>
<?php /*%%SmartyHeaderCode:121424679760f1a22d9567d4-38607543%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '0c929b0d47f4efa82478e8345b0544d5d04944c4' => 
    array (
      0 => '/var/www/html/VTiger/includes/runtime/../../layouts/v7/modules/AutomatedBackup/ListFileBackup.tpl',
      1 => 1626331586,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '121424679760f1a22d9567d4-38607543',
  'function' => 
  array (
  ),
  'variables' => 
  array (
    'LISTBACKUPLOG' => 0,
    'LISTVIEW_ENTRY' => 0,
    'LOG_TYPE' => 0,
    'FTP_DOWNLOAD_LINK' => 0,
    'SITE_URL' => 0,
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.7',
  'unifunc' => 'content_60f1a22d95f2b',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_60f1a22d95f2b')) {function content_60f1a22d95f2b($_smarty_tpl) {?>

<?php  $_smarty_tpl->tpl_vars['LISTVIEW_ENTRY'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['LISTVIEW_ENTRY']->_loop = false;
 $_from = $_smarty_tpl->tpl_vars['LISTBACKUPLOG']->value; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['LISTVIEW_ENTRY']->key => $_smarty_tpl->tpl_vars['LISTVIEW_ENTRY']->value){
$_smarty_tpl->tpl_vars['LISTVIEW_ENTRY']->_loop = true;
?><tr class="listViewEntries"><td class="listViewEntryValue medium" nowrap=""><?php echo DateTimeField::convertToUserFormat($_smarty_tpl->tpl_vars['LISTVIEW_ENTRY']->value['createdtime']);?>
</td><td class="listViewEntryValue medium" nowrap=""><?php echo $_smarty_tpl->tpl_vars['LISTVIEW_ENTRY']->value['filetype'];?>
</td><td class="listViewEntryValue medium" nowrap=""><?php echo $_smarty_tpl->tpl_vars['LISTVIEW_ENTRY']->value['filesize'];?>
</td><td class="listViewEntryValue medium" nowrap=""><?php if ($_smarty_tpl->tpl_vars['LISTVIEW_ENTRY']->value['deleted']==0){?>Active<?php }else{ ?>Deleted<?php }?></td><td style="text-align: center;" class="listViewEntryValue medium" nowrap=""><?php if ($_smarty_tpl->tpl_vars['LISTVIEW_ENTRY']->value['deleted']==0){?><?php if ($_smarty_tpl->tpl_vars['LOG_TYPE']->value=='ftpbackup'){?><a class="fa fa-download alignMiddle downloadRecordButton" title="Download" data-file="<?php echo $_smarty_tpl->tpl_vars['FTP_DOWNLOAD_LINK']->value;?>
/<?php echo $_smarty_tpl->tpl_vars['LISTVIEW_ENTRY']->value['path'];?>
/<?php echo $_smarty_tpl->tpl_vars['LISTVIEW_ENTRY']->value['filename'];?>
"><i title="Download" class="icon-download alignMiddle"></i></a><?php }else{ ?><a class="fa fa-download alignMiddle downloadRecordButton" title="Download" data-file="<?php echo $_smarty_tpl->tpl_vars['SITE_URL']->value;?>
/<?php echo $_smarty_tpl->tpl_vars['LISTVIEW_ENTRY']->value['path'];?>
/automatedbackup_<?php echo $_smarty_tpl->tpl_vars['LISTVIEW_ENTRY']->value['filename'];?>
"><i title="Download" class="icon-download alignMiddle"></i></a><?php }?><?php }?></td></tr><?php } ?><?php }} ?>