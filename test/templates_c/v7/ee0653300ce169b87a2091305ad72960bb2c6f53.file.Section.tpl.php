<?php /* Smarty version Smarty-3.1.7, created on 2021-07-16 23:55:25
         compiled from "/var/www/html/VTiger/includes/runtime/../../layouts/v7/modules/Quoter/Section.tpl" */ ?>
<?php /*%%SmartyHeaderCode:37122653160f21c6d1751c7-07453671%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    'ee0653300ce169b87a2091305ad72960bb2c6f53' => 
    array (
      0 => '/var/www/html/VTiger/includes/runtime/../../layouts/v7/modules/Quoter/Section.tpl',
      1 => 1626475498,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '37122653160f21c6d1751c7-07453671',
  'function' => 
  array (
  ),
  'variables' => 
  array (
    'MODULE' => 0,
    'INDEX_SECTION' => 0,
    'SECTION_VALUE' => 0,
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.7',
  'unifunc' => 'content_60f21c6d176da',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_60f21c6d176da')) {function content_60f21c6d176da($_smarty_tpl) {?><tr><td style="vertical-align: middle; text-align: center;"><img src="layouts/vlayout/skins/images/drag.png" class="moveIcon" border="0" title="Drag" style="cursor: move;">&nbsp;&nbsp;<i class="fa fa-trash deleteSection cursorPointer" title="<?php echo vtranslate('LBL_DELETE',$_smarty_tpl->tpl_vars['MODULE']->value);?>
"></i></td><td><input type="text" name="section<?php echo $_smarty_tpl->tpl_vars['INDEX_SECTION']->value;?>
" class="inputElement sectionValue"  data-rule-required="true"  value="<?php echo $_smarty_tpl->tpl_vars['SECTION_VALUE']->value;?>
"></td></tr><?php }} ?>