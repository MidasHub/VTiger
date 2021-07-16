<?php /* Smarty version Smarty-3.1.7, created on 2021-07-16 15:13:49
         compiled from "/var/www/html/VTiger/includes/runtime/../../layouts/v7/modules/AutomatedBackup/FTPBackup.tpl" */ ?>
<?php /*%%SmartyHeaderCode:52116135960f1a22d960966-95894628%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '783365b6d675d8753fd8077614e5acdb821b0882' => 
    array (
      0 => '/var/www/html/VTiger/includes/runtime/../../layouts/v7/modules/AutomatedBackup/FTPBackup.tpl',
      1 => 1626331586,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '52116135960f1a22d960966-95894628',
  'function' => 
  array (
  ),
  'variables' => 
  array (
    'QUALIFIED_MODULE' => 0,
    'SETTINGS' => 0,
    'LIST_BACKUP_LOG' => 0,
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.7',
  'unifunc' => 'content_60f1a22d97c1a',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_60f1a22d97c1a')) {function content_60f1a22d97c1a($_smarty_tpl) {?>

<form id="formFTPBackup"><div><h4 class="textOverflowEllipsis maxWidth50">&nbsp;<?php echo vtranslate('LBL_BASIC_INFORMATION',$_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value);?>
</h4></div><hr><div class="editViewContents"><div class="fieldBlockContainer"><table class="table detailview-table no-border"><tbody><tr><td class="fieldLabel medium"><label class="muted pull-right marginRight10px"><?php echo vtranslate('LBL_STATUS',$_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value);?>
</label></td><td class="fieldValue medium"><div class="row-fluid"><span class="span10"><select name="ftpbackup_status" class="inputElement select2  select2-offscreen"><option value="">--<?php echo vtranslate('LBL_SELECT',$_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value);?>
--</option><option value="Active" <?php if ($_smarty_tpl->tpl_vars['SETTINGS']->value['ftpbackup_status']=='Active'){?>selected="selected"<?php }?>><?php echo vtranslate('LBL_ACTIVE',$_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value);?>
</option><option value="Inactive" <?php if ($_smarty_tpl->tpl_vars['SETTINGS']->value['ftpbackup_status']=='Inactive'){?>selected="selected"<?php }?>><?php echo vtranslate('LBL_INACTIVE',$_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value);?>
</option></select></span></div></td><td class="fieldLabel medium"><label class="muted pull-right marginRight10px"><?php echo vtranslate('LBL_BACKUP_DATABASE',$_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value);?>
</label></td><td class="fieldValue medium"><div class="row-fluid"><span class="span10"><input type="checkbox" name="ftpbackup_database" <?php if ($_smarty_tpl->tpl_vars['SETTINGS']->value['ftpbackup_database']!=''){?>checked<?php }?> /></span></div></td></tr><tr><td class="fieldLabel medium"><label class="muted pull-right marginRight10px"><?php echo vtranslate('LBL_BACKUP_FILES',$_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value);?>
</label></td><td class="fieldValue medium"><div class="row-fluid"><span class="span10"><input type="checkbox" name="ftpbackup_files" <?php if ($_smarty_tpl->tpl_vars['SETTINGS']->value['ftpbackup_files']!=''){?>checked<?php }?> /></span></div></td><td class="fieldLabel medium"><label class="muted pull-right marginRight10px"><?php echo vtranslate('LBL_BACKUP_FREQUENCY',$_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value);?>
</label></td><td class="fieldValue medium"><div class="row-fluid"><span class="span10"><input value="<?php echo $_smarty_tpl->tpl_vars['SETTINGS']->value['ftpbackup_frequency'];?>
" type="text" class="inputElement nameField" name="ftpbackup_frequency" /></span></div></td></tr><tr><td class="fieldLabel medium"><label class="muted pull-right marginRight10px"><?php echo vtranslate('LBL_FTP_SERVER',$_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value);?>
</label></td><td class="fieldValue medium"><div class="row-fluid"><span class="span10"><input type="text" value="<?php echo $_smarty_tpl->tpl_vars['SETTINGS']->value['ftpbackup_server'];?>
" name="ftpbackup_server" class="inputElement nameField" /></span></div></td><td class="fieldLabel medium"><label class="muted pull-right marginRight10px"><?php echo vtranslate('LBL_BACKUP_DIRECTORY',$_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value);?>
</label></td><td class="fieldValue medium"><div class="row-fluid"><span class="span10"><input type="text" value="<?php if ($_smarty_tpl->tpl_vars['SETTINGS']->value['ftpbackup_directory']==''){?>/<?php }else{ ?><?php echo $_smarty_tpl->tpl_vars['SETTINGS']->value['ftpbackup_directory'];?>
<?php }?>" name="ftpbackup_directory" class="inputElement nameField" /></span></div></td></tr><tr><td class="fieldLabel medium"><label class="muted pull-right marginRight10px"><?php echo vtranslate('LBL_FTP_USERNAME',$_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value);?>
</label></td><td class="fieldValue medium"><div class="row-fluid"><span class="span10"><input type="text" class="inputElement nameField" value="<?php echo $_smarty_tpl->tpl_vars['SETTINGS']->value['ftpbackup_user'];?>
" name="ftpbackup_user" /></span></div></td><td class="fieldLabel medium"><label class="muted pull-right marginRight10px"><?php echo vtranslate('LBL_FTP_PASSWORD',$_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value);?>
</label></td><td class="fieldValue medium"><div class="row-fluid"><span class="span10"><input type="password" class="inputElement nameField" value="<?php echo $_smarty_tpl->tpl_vars['SETTINGS']->value['ftpbackup_password'];?>
" name="ftpbackup_password" /></span></div></td></tr><tr><td class="fieldLabel medium"><label class="muted pull-right marginRight10px"><?php echo vtranslate('LBL_NUMBER_OF_BACKUPS_TO_KEEP',$_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value);?>
</label></td><td class="fieldValue medium"><div class="row-fluid"><span class="span10"><input type="text" class="inputElement nameField" value="<?php echo $_smarty_tpl->tpl_vars['SETTINGS']->value['ftpbackup_number'];?>
" name="ftpbackup_number" /></span></div></td><td class="fieldLabel medium" colspan="2">&nbsp;</td></tr></tbody></table></div></div></form><div class="clearfix FTPBackupAction" style="padding-bottom: 15px; padding-top: 15px;"><button type="button" class="btn btn-success" name="testConnection"><?php echo vtranslate('LBL_TEST_CONNECTION',$_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value);?>
</button><button type="button" class="btn btn-success" name="runFTPBackup"><?php echo vtranslate('LBL_RUN_BACKUP',$_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value);?>
</button><button type="button" class="btn btn-success" name="saveFTPBackup"><?php echo vtranslate('LBL_SAVE',$_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value);?>
</button></div><table class="table table-bordered listViewEntriesTable" id="ftpbackupLogFiles"><thead><tr class="listViewHeaders"><th nowrap=""><a href="javascript:void(0);" class="listViewHeaderValues"><?php echo vtranslate('LBL_DATE',$_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value);?>
 <?php echo count($_smarty_tpl->tpl_vars['LIST_BACKUP_LOG']->value['ftpbackup']);?>
</a></th><th nowrap=""><a href="javascript:void(0);" class="listViewHeaderValues"><?php echo vtranslate('LBL_TYPE',$_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value);?>
</a></th><th nowrap=""><a href="javascript:void(0);" class="listViewHeaderValues"><?php echo vtranslate('LBL_FILESIZE',$_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value);?>
</a></th><th nowrap=""><a href="javascript:void(0);" class="listViewHeaderValues"><?php echo vtranslate('LBL_STATUS',$_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value);?>
</a></th><th width="5%" nowrap=""><a href="javascript:void(0);" class="listViewHeaderValues"><?php echo vtranslate('LBL_DOWNLOAD',$_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value);?>
</a></th></tr></thead><tbody><?php echo $_smarty_tpl->getSubTemplate (vtemplate_path('ListFileBackup.tpl',$_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value), $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, null, null, array('LISTBACKUPLOG'=>$_smarty_tpl->tpl_vars['LIST_BACKUP_LOG']->value['ftpbackup'],'LOG_TYPE'=>'ftpbackup'), 0);?>
</tbody></table><?php if (count($_smarty_tpl->tpl_vars['LIST_BACKUP_LOG']->value['ftpbackup'])==10){?><button style="margin: 10px 0px;" data-type="ftpbackup" data-page="0" type="button" class="btn btn-default showMoreFile"><?php echo vtranslate('LBL_SHOW_MORE',$_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value);?>
</button><?php }?><?php }} ?>