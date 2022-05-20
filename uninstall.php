<?
// 如果 uninstall 不是从 WordPress 调用，则退出
if( !defined( 'WP_UNINSTALL_PLUGIN' ) )
exit();

//删除插件创建的项目，以确保不占用数据库资源
delete_option( 'fb-click-showHidden' );
