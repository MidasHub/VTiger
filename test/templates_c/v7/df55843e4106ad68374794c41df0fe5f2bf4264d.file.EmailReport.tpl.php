<?php /* Smarty version Smarty-3.1.7, created on 2021-07-16 15:13:49
         compiled from "/var/www/html/VTiger/includes/runtime/../../layouts/v7/modules/AutomatedBackup/EmailReport.tpl" */ ?>
<?php /*%%SmartyHeaderCode:93979067060f1a22d97e718-01686754%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    'df55843e4106ad68374794c41df0fe5f2bf4264d' => 
    array (
      0 => '/var/www/html/VTiger/includes/runtime/../../layouts/v7/modules/AutomatedBackup/EmailReport.tpl',
      1 => 1626331586,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '93979067060f1a22d97e718-01686754',
  'function' => 
  array (
  ),
  'variables' => 
  array (
    'QUALIFIED_MODULE' => 0,
    'SETTINGS' => 0,
    'EMAILREPORT_BACKUPTYPE' => 0,
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.7',
  'unifunc' => 'content_60f1a22d98e70',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_60f1a22d98e70')) {function content_60f1a22d98e70($_smarty_tpl) {?>

<form id="formEmailReport"><div><h4 class="textOverflowEllipsis maxWidth50">&nbsp;<?php echo vtranslate('LBL_BASIC_INFORMATION',$_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value);?>
</h4></div><hr><div class="editViewContents"><div class="fieldBlockContainer"><table class="table detailview-table no-border"><tbody><tr><td class="fieldLabel medium"><label class="muted pull-right marginRight10px"><?php echo vtranslate('LBL_STATUS',$_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value);?>
</label></td><td class="fieldValue medium"><div class="row-fluid"><span class="span10"><select class="inputElement select2  select2-offscreen" name="emailreport_status"><option value="">--<?php echo vtranslate('LBL_SELECT',$_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value);?>
--</option><option value="Active" <?php if ($_smarty_tpl->tpl_vars['SETTINGS']->value['emailreport_status']=='Active'){?>selected="" <?php }?>><?php echo vtranslate('LBL_ACTIVE',$_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value);?>
</option><option value="Inactive" <?php if ($_smarty_tpl->tpl_vars['SETTINGS']->value['emailreport_status']=='Inactive'){?>selected="" <?php }?>><?php echo vtranslate('LBL_INACTIVE',$_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value);?>
</option></select></span></div></td><td class="fieldLabel medium"><label class="muted pull-right marginRight10px"><?php echo vtranslate('LBL_EMAIL_ADDRESS',$_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value);?>
</label></td><td class="fieldValue medium"><div class="row-fluid"><span class="span10"><input type="text" class="inputElement nameField" name="emailreport_email" value="<?php echo $_smarty_tpl->tpl_vars['SETTINGS']->value['emailreport_email'];?>
" /></span></div></td></tr><tr><td class="fieldLabel medium"><label class="muted pull-right marginRight10px"><?php echo vtranslate('LBL_SEND_EMAIL',$_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value);?>
</label></td><td class="fieldValue medium"><div class="row-fluid"><span class="span10"><?php $_smarty_tpl->tpl_vars['EMAILREPORT_BACKUPTYPE'] = new Smarty_variable(explode("|##|",$_smarty_tpl->tpl_vars['SETTINGS']->value['emailreport_backuptype']), null, 0);?><select class="inputElement select2  select2-offscreen" name="emailreport_backuptype" multiple><option value="localbackup" <?php if (in_array('localbackup',$_smarty_tpl->tpl_vars['EMAILREPORT_BACKUPTYPE']->value)){?>selected="" <?php }?>><?php echo vtranslate('LBL_LOCAL',$_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value);?>
</option><option value="ftpbackup" <?php if (in_array('ftpbackup',$_smarty_tpl->tpl_vars['EMAILREPORT_BACKUPTYPE']->value)){?>selected="" <?php }?>><?php echo vtranslate('LBL_FTP',$_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value);?>
</option></select></span></div></td><td class="fieldLabel medium"><label class="muted pull-right marginRight10px"><?php echo vtranslate('LBL_EMAIL_SUBJECT',$_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value);?>
</label></td><td class="fieldValue medium"><div class="row-fluid"><span class="span10"><input type="text" class="inputElement nameField" name="emailreport_subject" value="<?php echo $_smarty_tpl->tpl_vars['SETTINGS']->value['emailreport_subject'];?>
"/></span></div></td></tr><tr><td class="fieldLabel medium"><label class="muted pull-right marginRight10px"><?php echo vtranslate('LBL_BODY',$_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value);?>
</label><span class="pull-right"><?php echo vtranslate('LBL_BODY_DESCRIPTION',$_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value);?>
</span></td><td class="fieldValue medium" colspan="3"><div class="row-fluid"><span class="span12"><textarea name="emailreport_body" id="emailreport_body"><?php echo $_smarty_tpl->tpl_vars['SETTINGS']->value['emailreport_body'];?>
</textarea></span></div></td></tr></tbody></table></div></div><div class="clearfix" style="padding-bottom: 15px; padding-top: 15px;"><button type="button" class="btn btn-success" name="saveEmailReport"><?php echo vtranslate('LBL_SAVE',$_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value);?>
</button></div></form><?php }} ?>