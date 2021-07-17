<?php /* Smarty version Smarty-3.1.7, created on 2021-07-16 23:57:23
         compiled from "/var/www/html/VTiger/includes/runtime/../../layouts/v7/modules/VTECustomHeader/HeaderIcon.tpl" */ ?>
<?php /*%%SmartyHeaderCode:55320359760f21ce3331443-37875625%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    'e8b9b01a11cba8d59babd479af344de015211e70' => 
    array (
      0 => '/var/www/html/VTiger/includes/runtime/../../layouts/v7/modules/VTECustomHeader/HeaderIcon.tpl',
      1 => 1626418862,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '55320359760f21ce3331443-37875625',
  'function' => 
  array (
  ),
  'variables' => 
  array (
    'HEADERS' => 0,
    'key' => 0,
    'HEADER' => 0,
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.7',
  'unifunc' => 'content_60f21ce333e64',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_60f21ce333e64')) {function content_60f21ce333e64($_smarty_tpl) {?>
<style>.rcorners2 {border-radius: 5px;padding: 10px;width: 40px;height: 40px;float: left;}.header-div{float: left;width: 25%;}.c-header{padding-top: 5px;margin-left: -22%;}#div_custome_header{display: none;}</style><div class="col-lg-6 c-header" id="div_custome_header" ><?php  $_smarty_tpl->tpl_vars['HEADER'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['HEADER']->_loop = false;
 $_smarty_tpl->tpl_vars['key'] = new Smarty_Variable;
 $_from = $_smarty_tpl->tpl_vars['HEADERS']->value; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['HEADER']->key => $_smarty_tpl->tpl_vars['HEADER']->value){
$_smarty_tpl->tpl_vars['HEADER']->_loop = true;
 $_smarty_tpl->tpl_vars['key']->value = $_smarty_tpl->tpl_vars['HEADER']->key;
?><div class="header-div" <?php if ($_smarty_tpl->tpl_vars['key']->value>3){?> style="margin-top: 5px;"<?php }?>><div class="rcorners2" style="border: 2px solid #<?php echo $_smarty_tpl->tpl_vars['HEADER']->value['color'];?>
;"><span class="icon-module <?php echo $_smarty_tpl->tpl_vars['HEADER']->value['icon'];?>
" style="font-size: 17px;color: #<?php echo $_smarty_tpl->tpl_vars['HEADER']->value['color'];?>
;"></span></div><div style="text-align: left;margin-top: 4px;"><span class="l-header muted" style="vertical-align: left; padding-left: 11px;"><?php if (mb_strlen($_smarty_tpl->tpl_vars['HEADER']->value['header'], 'UTF-8')>15){?><?php echo mb_substr(trim($_smarty_tpl->tpl_vars['HEADER']->value['header']),0,14);?>
...<?php }else{ ?><?php echo $_smarty_tpl->tpl_vars['HEADER']->value['header'];?>
<?php }?></span></div><div  style="text-align: left;"><span class="l-value" style="vertical-align: left; padding-left: 11px;text-align: left;"><?php if (mb_strlen($_smarty_tpl->tpl_vars['HEADER']->value['field_value'], 'UTF-8')>15&&!strstr($_smarty_tpl->tpl_vars['HEADER']->value['field_value'],'</a>')){?><?php echo mb_substr(trim($_smarty_tpl->tpl_vars['HEADER']->value['field_value']),0,14);?>
...<?php }else{ ?><?php echo $_smarty_tpl->tpl_vars['HEADER']->value['field_value'];?>
<?php }?></span></div></div><?php } ?></div><?php }} ?>