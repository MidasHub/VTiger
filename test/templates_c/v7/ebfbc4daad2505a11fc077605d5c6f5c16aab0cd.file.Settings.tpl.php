<?php /* Smarty version Smarty-3.1.7, created on 2021-07-16 15:13:49
         compiled from "/var/www/html/VTiger/includes/runtime/../../layouts/v7/modules/AutomatedBackup/Settings.tpl" */ ?>
<?php /*%%SmartyHeaderCode:53470569360f1a22d933460-44949864%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    'ebfbc4daad2505a11fc077605d5c6f5c16aab0cd' => 
    array (
      0 => '/var/www/html/VTiger/includes/runtime/../../layouts/v7/modules/AutomatedBackup/Settings.tpl',
      1 => 1626331586,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '53470569360f1a22d933460-44949864',
  'function' => 
  array (
  ),
  'variables' => 
  array (
    'QUALIFIED_MODULE' => 0,
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.7',
  'unifunc' => 'content_60f1a22d93ac8',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_60f1a22d93ac8')) {function content_60f1a22d93ac8($_smarty_tpl) {?>

<div class="container-fluid">
    <div class="widget_header row-fluid">
        <h3><?php echo vtranslate($_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value,$_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value);?>
</h3>
    </div>
    <hr>
    <div class="clearfix"></div>
    <div class="related-tabs row summaryWidgetContainer">
        <ul class="nav nav-tabs massEditTabs">
            <li class="tab-item active">
                <a href="#module_LBL_LOCAL_BACKUP" data-toggle="tab">
                   <strong> <?php echo vtranslate('LBL_LOCAL_BACKUP',$_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value);?>
</strong>
                </a>
            </li>
            <li class="tab-item">
                <a href="#module_LBL_FTP_BACKUP" data-toggle="tab">
                    <strong><?php echo vtranslate('LBL_FTP_BACKUP',$_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value);?>
</strong>
                </a>
            </li>
            <li class="tab-item">
                <a href="#module_LBL_EMAIL_REPORT" data-toggle="tab">
                    <strong> <?php echo vtranslate('LBL_EMAIL_REPORT',$_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value);?>
</strong>
                </a>
            </li>
        </ul>
        <div class="tab-content massEditContent" style="margin:10px;">
            <div class="tab-pane active" id="module_LBL_LOCAL_BACKUP">
                <?php echo $_smarty_tpl->getSubTemplate (vtemplate_path('LocalBackup.tpl',$_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value), $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, null, null, array(), 0);?>

            </div>
            <div class="tab-pane" id="module_LBL_FTP_BACKUP">
                <?php echo $_smarty_tpl->getSubTemplate (vtemplate_path('FTPBackup.tpl',$_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value), $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, null, null, array(), 0);?>

            </div>
            <div class="tab-pane" id="module_LBL_EMAIL_REPORT">
                <?php echo $_smarty_tpl->getSubTemplate (vtemplate_path('EmailReport.tpl',$_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value), $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, null, null, array(), 0);?>

            </div>
        </div>
    </div>
</div><?php }} ?>