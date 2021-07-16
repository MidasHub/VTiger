<?php /* Smarty version Smarty-3.1.7, created on 2021-07-16 15:13:49
         compiled from "/var/www/html/VTiger/includes/runtime/../../layouts/v7/modules/AutomatedBackup/LocalBackup.tpl" */ ?>
<?php /*%%SmartyHeaderCode:59348364560f1a22d93cfc6-01569582%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '9e70dac33e63eb82466ff98ebb129b66e1f24939' => 
    array (
      0 => '/var/www/html/VTiger/includes/runtime/../../layouts/v7/modules/AutomatedBackup/LocalBackup.tpl',
      1 => 1626331586,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '59348364560f1a22d93cfc6-01569582',
  'function' => 
  array (
  ),
  'variables' => 
  array (
    'QUALIFIED_MODULE' => 0,
    'SETTINGS' => 0,
    'BACKUP_DIRECTORY' => 0,
    'LIST_BACKUP_LOG' => 0,
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.7',
  'unifunc' => 'content_60f1a22d954ae',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_60f1a22d954ae')) {function content_60f1a22d954ae($_smarty_tpl) {?>

<form id="formLocalBackup"><div><h4 class="textOverflowEllipsis maxWidth50">&nbsp;<?php echo vtranslate('LBL_BASIC_INFORMATION',$_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value);?>
</h4></div><hr><div class="editViewContents"><div class="fieldBlockContainer"><table class="table detailview-table no-border"><tbody><tr><td class="fieldLabel medium"><label class="muted pull-right marginRight10px"><?php echo vtranslate('LBL_STATUS',$_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value);?>
</label></td><td class="fieldValue medium"><div class="row-fluid"><span class="span10"><select name="localbackup_status" class="inputElement select2  select2-offscreen"><option value="">--<?php echo vtranslate('LBL_SELECT',$_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value);?>
--</option><option value="Active" <?php if ($_smarty_tpl->tpl_vars['SETTINGS']->value['localbackup_status']=='Active'){?>selected="selected"<?php }?>><?php echo vtranslate('LBL_ACTIVE',$_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value);?>
</option><option value="Inactive" <?php if ($_smarty_tpl->tpl_vars['SETTINGS']->value['localbackup_status']=='Inactive'){?>selected="selected"<?php }?>><?php echo vtranslate('LBL_INACTIVE',$_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value);?>
</option></select></span></div></td><td class="fieldLabel medium"><label class="muted pull-right marginRight10px"><?php echo vtranslate('LBL_BACKUP_DATABASE',$_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value);?>
</label></td><td class="fieldValue medium"><div class="row-fluid"><span class="span10"><input type="checkbox" name="localbackup_database" <?php if ($_smarty_tpl->tpl_vars['SETTINGS']->value['localbackup_database']!=''){?>checked<?php }?> /></span></div></td></tr><tr><td class="fieldLabel medium"><label class="muted pull-right marginRight10px"><?php echo vtranslate('LBL_BACKUP_FILES',$_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value);?>
</label></td><td class="fieldValue medium"><div class="row-fluid"><span class="span10"><input type="checkbox" name="localbackup_files" <?php if ($_smarty_tpl->tpl_vars['SETTINGS']->value['localbackup_files']!=''){?>checked<?php }?> /></span></div></td><td class="fieldLabel medium"><label class="muted pull-right marginRight10px"><?php echo vtranslate('LBL_BACKUP_FREQUENCY',$_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value);?>
</label></td><td class="fieldValue medium"><div class="row-fluid"><span class="span10"><input type="text" class="inputElement nameField" value="<?php echo $_smarty_tpl->tpl_vars['SETTINGS']->value['localbackup_frequency'];?>
" name="localbackup_frequency" /></span></div></td></tr><tr><td class="fieldLabel medium"><label class="muted pull-right marginRight10px"><?php echo vtranslate('LBL_NUMBER_OF_BACKUPS_TO_KEEP',$_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value);?>
</label></td><td class="fieldValue medium"><div class="row-fluid"><span class="span10"><input type="text" class="inputElement nameField" value="<?php echo $_smarty_tpl->tpl_vars['SETTINGS']->value['localbackup_number'];?>
" name="localbackup_number" /></span></div></td><td class="fieldLabel medium"><label class="muted pull-right marginRight10px"><?php echo vtranslate('LBL_BACKUP_DIRECTORY',$_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value);?>
</label></td><td class="fieldValue medium"><div class="row-fluid"><span class="span10"><input type="text" class="inputElement nameField" value="<?php if ($_smarty_tpl->tpl_vars['SETTINGS']->value['localbackup_directory']==''){?><?php echo $_smarty_tpl->tpl_vars['BACKUP_DIRECTORY']->value;?>
<?php }else{ ?><?php echo $_smarty_tpl->tpl_vars['SETTINGS']->value['localbackup_directory'];?>
<?php }?>" name="localbackup_directory" /></span></div></td></tr></tbody></table></div></div></form><div class="clearfix localBackupAction" style="padding-bottom: 15px; padding-top: 15px;"><button name="testPermissions" type="button" class="btn btn-success"><?php echo vtranslate('LBL_TEST_PERMISSIONS',$_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value);?>
</button><button name="runLocalBackup" type="button" class="btn btn-success"><?php echo vtranslate('LBL_RUN_BACKUP',$_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value);?>
</button><button name="saveLocalBackup" type="button" class="btn btn-success"><?php echo vtranslate('LBL_SAVE',$_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value);?>
</button></div><hr><table class="table table-bordered listViewEntriesTable" id="localbackupLogFiles"><thead><tr class="listViewHeaders"><th nowrap="" class="listViewHeaderValues"><?php echo vtranslate('LBL_DATE',$_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value);?>
</th><th nowrap="" class="listViewHeaderValues"><?php echo vtranslate('LBL_TYPE',$_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value);?>
</th><th nowrap="" class="listViewHeaderValues"><?php echo vtranslate('LBL_FILESIZE',$_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value);?>
</th><th nowrap="" class="listViewHeaderValues"><?php echo vtranslate('LBL_STATUS',$_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value);?>
</th><th width="5%" nowrap="" class="listViewHeaderValues"><?php echo vtranslate('LBL_DOWNLOAD',$_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value);?>
</th></tr></thead><tbody><?php echo $_smarty_tpl->getSubTemplate (vtemplate_path('ListFileBackup.tpl',$_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value), $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, null, null, array('LISTBACKUPLOG'=>$_smarty_tpl->tpl_vars['LIST_BACKUP_LOG']->value['localbackup'],'LOG_TYPE'=>'localbackup'), 0);?>
</tbody></table><?php if (count($_smarty_tpl->tpl_vars['LIST_BACKUP_LOG']->value['localbackup'])==10){?><button style="margin: 10px 0px;" data-type="localbackup" type="button" data-page="0" class="btn btn-default showMoreFile"><?php echo vtranslate('LBL_SHOW_MORE',$_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value);?>
</button><?php }?><?php }} ?>