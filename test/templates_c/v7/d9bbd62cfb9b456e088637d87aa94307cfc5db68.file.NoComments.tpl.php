<?php /* Smarty version Smarty-3.1.7, created on 2021-07-16 23:57:23
         compiled from "/var/www/html/VTiger/includes/runtime/../../layouts/v7/modules/Vtiger/NoComments.tpl" */ ?>
<?php /*%%SmartyHeaderCode:122766963360f21ce32fe7e7-95436704%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    'd9bbd62cfb9b456e088637d87aa94307cfc5db68' => 
    array (
      0 => '/var/www/html/VTiger/includes/runtime/../../layouts/v7/modules/Vtiger/NoComments.tpl',
      1 => 1626323256,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '122766963360f21ce32fe7e7-95436704',
  'function' => 
  array (
  ),
  'variables' => 
  array (
    'MODULE_NAME' => 0,
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.7',
  'unifunc' => 'content_60f21ce32ffb0',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_60f21ce32ffb0')) {function content_60f21ce32ffb0($_smarty_tpl) {?>
<div class="noCommentsMsgContainer noContent"><p class="textAlignCenter"> <?php echo vtranslate('LBL_NO_COMMENTS',$_smarty_tpl->tpl_vars['MODULE_NAME']->value);?>
</p></div><?php }} ?>