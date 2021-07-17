<?php /* Smarty version Smarty-3.1.7, created on 2021-07-16 23:57:23
         compiled from "/var/www/html/VTiger/includes/runtime/../../layouts/v7/modules/VTEProgressbar/ViewProgressbar.tpl" */ ?>
<?php /*%%SmartyHeaderCode:190006462760f21ce33aa014-63838985%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    'f871c1d0de4a378213d539bdd63379b65eca5bec' => 
    array (
      0 => '/var/www/html/VTiger/includes/runtime/../../layouts/v7/modules/VTEProgressbar/ViewProgressbar.tpl',
      1 => 1626418882,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '190006462760f21ce33aa014-63838985',
  'function' => 
  array (
  ),
  'variables' => 
  array (
    'PROGRESSBARS' => 0,
    'PROGRESSBAR' => 0,
    'CURRENT_STATUS' => 0,
    'BAR' => 0,
    'MODULE_NAME' => 0,
    'key' => 0,
    'FIELD_NAME' => 0,
    'FIELD_LABEL' => 0,
    'READ_ONLY' => 0,
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.7',
  'unifunc' => 'content_60f21ce33ba71',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_60f21ce33ba71')) {function content_60f21ce33ba71($_smarty_tpl) {?>
<style>.vteProgressBarContainer {padding-left: 14%;max-height: 32px!important;padding-right: 0px!important;}.vteProgressBarContainer .vteProgressBarMiddleContainer {width: 95%;overflow-x: hidden;}.p-r-0 {padding-right: 0px!important;}.vteProgressBarContainer .vteProgressBarHeaderContainer {white-space: nowrap;display: flex;max-width: 100%!important;margin-top: -13px;}.list-inline {padding-left: 0;margin-left: -5px;list-style: none;}.vteProgressBarContainer .vteProgressBarHeaderContainer .vteProgressBarHeaderColumn {width: 128px!important;min-width: 128px;padding: 0;position: relative;padding-top: 16px;}.row ul li:first-child {margin-left: 0;}.vteProgressBarContainer .vteProgressBarHeaderContainer .vteProgressBarHeaderColumn .firstColumn {border-left: 0;}.vteProgressBarContainer .vteProgressBarHeaderContainer .vteProgressBarHeaderColumn .vteProgressBarHeaderEmpty {cursor: pointer;height: 28px;padding: 0 15px 0 0;display: inline-block;color: #e2e0e0;position: relative;width: 124px;max-width: 124px;border-top: 15px solid #e2e0e0;border-bottom: 15px solid #e2e0e0;border-left: 10px solid transparent;box-shadow: 0 -2px 0 #e2e0e0;margin-top: 2px;}.vteProgressBarContainer .vteProgressBarHeaderContainer .vteProgressBarHeaderColumn .vteProgressBarHeaderTitleContainer .vteProgressBarHeaderTitle {width: 100%;color: black;text-align: center;}.vteProgressBarContainer .vteProgressBarHeaderContainer .vteProgressBarHeaderColumn .vteProgressBarHeaderTitleContainer {margin-top: -10px;padding-left: 5px;width: 105px;max-width: 105px;}.vteProgressBarContainer .vteProgressBarHeaderContainer .vteProgressBarHeaderColumn .vteProgressBarHeaderEmpty:after {content: '\0000a0';width: 0;height: 0;border-left: 10px solid;border-top: 15px solid transparent;border-bottom: 15px solid transparent;display: inline-block;position: absolute;top: -15px;right: -10px;}.vteProgressBar-Active:after {color: #21ba5c;}.vteProgressBar-Active {border-top: 15px solid #21ba5c !important;border-bottom: 15px solid #21ba5c!important;border-left: 10px solid transparent!important;box-shadow: 0 -2px 0 #21ba5c!important;}.vteProgressBar-Active .vteProgressBarHeaderTitle{color:#fff!important;}.vteProgressBarContainer .progressbarNavigator {width: 4%;margin-top: -8px;}.p-x-0 {padding-left: 0px!important;padding-right: 0px!important;}.vteProgressBarMainContainer .progressbarPrev {right: 32px;margin-top: 18px;}.cursorPointer {cursor: pointer;text-decoration: none;}.pull-left {float: left!important;}.f-20 {font-size: 20px!important;}.vteProgressBarMainContainer .progressbarNext {right: 0;margin-top: 18px;}.slider-wrap{position: relative;width: 100%;height: 150px;overflow-y:hidden;overflow-x:scroll;}.slider-wrap {position: relative;width: 100%;height: 230px;overflow-y:hidden;overflow-x:scroll;/*margin-top: 20px;*/}.slide-wrap {position: relative;width: 100%;top: 0;left: 0;}.slider-slide-wrap {position: absolute;width: 128px;height: 100%;}#div_vtprogressbar{display: none;}.vteProgressBarContainer .vteProgressBarHeaderContainer .vteProgressBarHeaderColumn .vteProgressBarHeaderEmpty.readonly {cursor: default;}</style><div class="vteProgressBarMainContainer" id="div_vtprogressbar" ><div class="col-lg-12  col-md-12 col-sm-12 vteProgressBarContainer"><div style="min-height: 85px;height: 150px;" class="vteProgressBarMiddleContainer  col-lg-11 col-md-11 col-sm-11 p-r-0 slider-wrap"><div class="vteProgressBarHeaderContainer list-inline slide-wrap"><?php  $_smarty_tpl->tpl_vars['PROGRESSBAR'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['PROGRESSBAR']->_loop = false;
 $_smarty_tpl->tpl_vars['key'] = new Smarty_Variable;
 $_from = $_smarty_tpl->tpl_vars['PROGRESSBARS']->value; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['PROGRESSBAR']->key => $_smarty_tpl->tpl_vars['PROGRESSBAR']->value){
$_smarty_tpl->tpl_vars['PROGRESSBAR']->_loop = true;
 $_smarty_tpl->tpl_vars['key']->value = $_smarty_tpl->tpl_vars['PROGRESSBAR']->key;
?><?php $_smarty_tpl->tpl_vars['BAR'] = new Smarty_variable($_smarty_tpl->tpl_vars['PROGRESSBAR']->value['field_value'], null, 0);?><?php $_smarty_tpl->tpl_vars['READ_ONLY'] = new Smarty_variable($_smarty_tpl->tpl_vars['PROGRESSBAR']->value['read_only'], null, 0);?><div class="vteProgressBarHeaderColumn slider-slide-wrap <?php ob_start();?><?php echo vtranslate($_smarty_tpl->tpl_vars['BAR']->value,$_smarty_tpl->tpl_vars['MODULE_NAME']->value);?>
<?php $_tmp1=ob_get_clean();?><?php if ($_smarty_tpl->tpl_vars['CURRENT_STATUS']->value==$_tmp1){?>onView<?php }?>" data-no = "<?php echo $_smarty_tpl->tpl_vars['key']->value;?>
" data-value="<?php echo $_smarty_tpl->tpl_vars['BAR']->value;?>
" data-toggle="tooltip"data-placement="bottom" data-field-name="<?php echo $_smarty_tpl->tpl_vars['FIELD_NAME']->value;?>
"  data-field-label="<?php echo $_smarty_tpl->tpl_vars['FIELD_LABEL']->value;?>
"   data-original-title="<?php echo vtranslate($_smarty_tpl->tpl_vars['BAR']->value,$_smarty_tpl->tpl_vars['MODULE_NAME']->value);?>
"><div class="vteProgressBarHeaderEmpty  <?php ob_start();?><?php echo vtranslate($_smarty_tpl->tpl_vars['BAR']->value,$_smarty_tpl->tpl_vars['MODULE_NAME']->value);?>
<?php $_tmp2=ob_get_clean();?><?php if ($_smarty_tpl->tpl_vars['CURRENT_STATUS']->value==$_tmp2){?> vteProgressBar-Active <?php }?> <?php if ($_smarty_tpl->tpl_vars['READ_ONLY']->value==1){?>readonly<?php }?>"><div class="vteProgressBarHeaderTitleContainer width100Per "><div class="vteProgressBarHeaderTitle textOverflowEllipsis"><?php echo vtranslate($_smarty_tpl->tpl_vars['BAR']->value,$_smarty_tpl->tpl_vars['MODULE_NAME']->value);?>
</div></div></div></div><?php } ?></div></div><div class="progressbarNavigator pull-right col-lg-1 col-md-1 col-sm-1 p-x-0 m-t-8"><span class="progressbarPrev  pull-left cursorPointer"><i  class="fa fa-chevron-circle-left f-20"></i></span><span class="progressbarNext pull-right  cursorPointer"><i class="fa fa-chevron-circle-right f-20"></i></span></div></div></div><?php }} ?>