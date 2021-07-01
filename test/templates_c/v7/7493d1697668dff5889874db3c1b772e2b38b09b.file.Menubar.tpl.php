<?php /* Smarty version Smarty-3.1.7, created on 2021-07-01 11:55:48
         compiled from "E:\laragon\www\vtigercrm\includes\runtime/../../layouts/v7\modules\Documents\partials\Menubar.tpl" */ ?>
<?php /*%%SmartyHeaderCode:197458229160ddad443dbe22-92819938%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '7493d1697668dff5889874db3c1b772e2b38b09b' => 
    array (
      0 => 'E:\\laragon\\www\\vtigercrm\\includes\\runtime/../../layouts/v7\\modules\\Documents\\partials\\Menubar.tpl',
      1 => 1602587794,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '197458229160ddad443dbe22-92819938',
  'function' => 
  array (
  ),
  'variables' => 
  array (
    'MODULE_MODEL' => 0,
    'MODULE' => 0,
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.7',
  'unifunc' => 'content_60ddad443e2c5',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_60ddad443e2c5')) {function content_60ddad443e2c5($_smarty_tpl) {?>

<?php if ($_REQUEST['view']=='Detail'){?>
<div id="modules-menu" class="modules-menu">    
    <ul>
        <li class="active">
            <a href="<?php echo $_smarty_tpl->tpl_vars['MODULE_MODEL']->value->getListViewUrl();?>
">
				<?php echo $_smarty_tpl->tpl_vars['MODULE_MODEL']->value->getModuleIcon();?>

                <span><?php echo $_smarty_tpl->tpl_vars['MODULE']->value;?>
</span>
            </a>
        </li>
    </ul>
</div>
<?php }?><?php }} ?>