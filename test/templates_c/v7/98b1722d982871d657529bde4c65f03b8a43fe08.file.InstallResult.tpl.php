<?php /* Smarty version Smarty-3.1.7, created on 2021-07-16 15:02:26
         compiled from "/var/www/html/VTiger/includes/runtime/../../layouts/v7/modules/VTEStore/InstallResult.tpl" */ ?>
<?php /*%%SmartyHeaderCode:186012545160f19f82e37728-90905745%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '98b1722d982871d657529bde4c65f03b8a43fe08' => 
    array (
      0 => '/var/www/html/VTiger/includes/runtime/../../layouts/v7/modules/VTEStore/InstallResult.tpl',
      1 => 1626327454,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '186012545160f19f82e37728-90905745',
  'function' => 
  array (
  ),
  'variables' => 
  array (
    'ERROR' => 0,
    'EXTENSION_NAME' => 0,
    'MESSAGE' => 0,
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.7',
  'unifunc' => 'content_60f19f82e3fcc',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_60f19f82e3fcc')) {function content_60f19f82e3fcc($_smarty_tpl) {?>
<div class='modal-dialog modal-lg'><div class="modal-content"><div class="modal-header contentsBackground"><button type="button" class="close" data-dismiss="modal" aria-hidden="true" onclick="<?php if ($_smarty_tpl->tpl_vars['ERROR']->value=='0'){?>app.helper.showSuccessNotification({message: app.vtranslate('JS_PLEASE_WAIT')});location.reload();<?php }?>"><span aria-hidden="true" class='fa fa-close'></span></button><h4 style="color:white;"><?php echo $_smarty_tpl->tpl_vars['EXTENSION_NAME']->value;?>
</h4></div><div class="modal-body" id="installationLog"><div class="row-fluid" <?php if ($_smarty_tpl->tpl_vars['ERROR']->value!='0'){?>style="color:red;"<?php }?>><span class="font-x-x-large"><?php echo $_smarty_tpl->tpl_vars['MESSAGE']->value;?>
</span><br><br><div align="center"> <?php if ($_smarty_tpl->tpl_vars['ERROR']->value=='0'){?><img src="layouts/v7/modules/VTEStore/resources/images/VTEStoreSetting.jpg" style="width: 100%;" align="center"><?php }?></div></div></div><div class="modal-footer"><span class="pull-right"><button class="btn btn-success" id="importCompleted" onclick="app.hideModalWindow();<?php if ($_smarty_tpl->tpl_vars['ERROR']->value=='0'||$_smarty_tpl->tpl_vars['ERROR']->value=='2'){?>app.helper.showSuccessNotification({message: app.vtranslate('JS_PLEASE_WAIT')});location.reload();<?php }?>"><?php echo vtranslate('LBL_OK','VTEStore');?>
</button></span></div></div></div><?php }} ?>