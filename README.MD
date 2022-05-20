#wordpress插件：点击展开文章隐藏内容


类似csdn博客那样，点击“阅读更多”可以展开隐藏的文章内容

&nbsp;
<h3 id="L.........">简介：</h3>
由方包开发的wp插件（fangbao-subscribe-show），本插件可以隐藏文章中的任意部分内容。

原文地址：<a href="https://www.fang1688.cn/study-code/3050.html">https://www.fang1688.cn/study-code/3050.html</a>

&nbsp;

<span>使用方法：在文章编辑页插入短代码[collapse title="点击展开 查看更多"]此处输入你要隐藏的内容[/collapse]</span>

&nbsp;
<h3 id="L...............">使用教程：</h3>
点击下图蓝色文字后，会自动展开隐藏的文章内容。

<img src="http://wp.fang1688.cn/wp-content/uploads/2022/05/596de22a00ceb96-22.png" alt="" /><img class="alignnone wp-image-3054 size-full" src="https://www.fang1688.cn/wp-content/uploads/2022/05/Pasted-26.png" />

显示的内容：

<img class="alignnone wp-image-3055 size-full" src="https://www.fang1688.cn/wp-content/uploads/2022/05/Pasted-27.png" />

&nbsp;

关于插件自行的修改的内容“click-showHidden.php”。如下图：

<img class="alignnone wp-image-3052 size-full" src="https://www.fang1688.cn/wp-content/uploads/2022/05/Pasted-24.png" />

<img src="http://wp.fang1688.cn/wp-content/uploads/2022/05/596de22a00ceb96-25.png" alt="" />
<h3 id="L.....................">项目目录结构：</h3>
<img class="alignnone wp-image-3051 size-full" src="https://www.fang1688.cn/wp-content/uploads/2022/05/Pasted-23.png" />
<h3></h3>
<h3>项目代码：</h3>
click-showHidden.php
<div class="hcb_wrap">
<pre class="prism undefined-numbers lang-php" data-lang="PHP"><code>&lt;?php
/*
Plugin Name:click-showHidden
Plugin URI: https://www.fang1688.cn/study-code/3050.html
Description:方包点击展开文章隐藏的内容
Version: 1.0
Author: 方包
Author URI: http://www.fang1688.cn
License: GPLv2
*/

//设置时区为 亚洲/上海
date_default_timezone_set('Asia/Shanghai');

class click-showHidden {



//构造方法，创建类的时候调用
function click-showHidden() {



// //引用文件的钩子
add_action( 'wp_enqueue_scripts', 'fbao_enqueue_style' );
add_action( 'wp_enqueue_scripts', 'fbao_enqueue_script');
//
//
// //自定义引用样式表
function fbao_enqueue_style() {
wp_enqueue_style( 'core', plugins_url('css/modal.css', __FILE__) , false );
}
//
// //自定义引用脚本文件
function fbao_enqueue_script() {

wp_enqueue_script('plugin_script', plugins_url('js/modal.js', __FILE__), '','1.1', true);
}

//添加一个collapse短标签，调用 fb_show 方法进行处理
add_shortcode( 'collapse', array( $this, 'fb_show' ) );

add_action('admin_print_footer_scripts', 'appthemes_add_collapse' );



}

function fb_show( $atts, $content = "" ) {


// 文章页添加展开收缩效果
extract(shortcode_atts(array("title"=&gt;""),$atts));
return '&lt;div style="margin: 0.5em 0;"&gt;
&lt;div class="xControl"&gt;
&lt;a href="javascript:void(0)" class="collapseButton xButton"&gt;&lt;span class="xTitle"&gt;'.$title.'&lt;/span&gt;&lt;/a&gt;
&lt;div style="clear: both;"&gt;&lt;/div&gt;
&lt;/div&gt;
&lt;div class="xContent" style="display: none;"&gt;'.$content.'&lt;/div&gt;
&lt;/div&gt;';



// $atts = shortcode_atts( array(
// 'title' =&gt; '方包博客',
// ), $atts, 'fbshow' );
//
// return $atts['title'];

}


//添加展开/收缩快捷标签按钮
function appthemes_add_collapse() {
?&gt;
&lt;script type="text/javascript"&gt;
if ( typeof QTags != 'undefined' ) {
QTags.addButton( 'collapse', '展开/收缩按钮', '[collapse title="点击展开 查看更多"]','[/collapse]' );
}
&lt;/script&gt;
&lt;?php
}


}

new click-showHidden();

//定义插件停用时候调用的方法
register_deactivation_hook( __FILE__, 'fb-click-showHidden');

function fb-click-showHidden() {

//插件停用，设置停用标识为1
update_option( "fb-click-showHidden", "yes" );

}</code></pre>
</div>
&nbsp;

modal.js
<div class="hcb_wrap">
<pre class="prism undefined-numbers lang-js" data-lang="JavaScript"><code>// 添加文章页展开收缩JS效果


jQuery(document).ready(
function(jQuery){
jQuery('.collapseButton').click(
function(){
jQuery(this).parent().parent().find('.xContent').slideToggle('slow');
jQuery(this).parent().addClass("hidden-element");
}
);
}
);</code></pre>
</div>
&nbsp;

modal.css
<div class="hcb_wrap">
<pre class="prism undefined-numbers lang-css" data-lang="CSS"><code>.xControl {
font-size: 15px;
font-weight: bold;
padding: 5px 0;
background-color: #f5f5f5;
border-bottom: 4px solid #d0d0d0;
transition: all 0.3s linear;
text-align: center;
border-radius: 0 0 5% 5%;
}
.xControl a{
text-decoration: none;
display: block;
}

.hidden-element{
display: none;
}</code></pre>
</div>
&nbsp;



<hr style="border-style: solid; border-width: 1px 0 0; border-color: rgba(0,0,0,0.1); -webkit-transform-origin: 0 0; -webkit-transform: scale(1, 0.5); transform-origin: 0 0; transform: scale(1, 0.5);" />
<p style="line-height: 1.8em; orphans: 4; font-size: 15px; letter-spacing: 0.1em; white-space: pre-wrap; caret-color: #333333; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; text-align: start; background-color: #ffffff; margin: 2em 5px !important;">本期内容就到这里啦～以上内容均可在 <strong>方包博客<span style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 15px; letter-spacing: 1.5px; orphans: 4; text-align: start; white-space: pre-wrap; caret-color: #333333; background-color: #ffffff;">「<span style="color: #226ba3;">http://fang1688.cn</span></span><span style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 15px; letter-spacing: 1.5px; orphans: 4; text-align: start; white-space: pre-wrap; caret-color: #333333; background-color: #ffffff;">」</span></strong> 网站直接搜索名称访问哦。<span style="letter-spacing: 0.1em;">欢迎感兴趣的小伙伴试试，如果本文对您有帮助，也请帮忙点个<strong> 赞 + 在看 </strong>啦！</span><span style="color: #4a4a4a; font-family: Optima-Regular, Optima, PingFangSC-light, PingFangTC-light, 'PingFang SC', Cambria, Cochin, Georgia, Times, 'Times New Roman', serif; font-size: 16px; letter-spacing: 0.544px;">❤️</span></p>
<p style="line-height: 1.8em; orphans: 4; font-size: 15px; letter-spacing: 0.1em; white-space: pre-wrap; caret-color: #333333; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; text-align: start; background-color: #ffffff; margin: 2em 5px !important;">欢迎大家加入方包的<strong><span style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 15px; letter-spacing: 1.5px; orphans: 4; text-align: start; white-space: pre-wrap; caret-color: #333333; background-color: #ffffff;">「<span style="color: #226ba3;"><strong>优派编程</strong></span></span><span style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 15px; letter-spacing: 1.5px; orphans: 4; text-align: start; white-space: pre-wrap; caret-color: #333333; background-color: #ffffff;">」</span></strong>学习圈子，和多名小伙伴们一起交流学习，向方包 1 对 1 提问、跟着方包做项目、领取大量编程资源等。Q群<span style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 15px; letter-spacing: 1.5px; orphans: 4; text-align: start; white-space: pre-wrap; caret-color: #333333; background-color: #ffffff;">「</span><strong style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 15px; letter-spacing: 1.5px; orphans: 4; text-align: start; white-space: pre-wrap; caret-color: #333333; background-color: #ffffff; color: #226ba3;"><span style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 15px; letter-spacing: 1.5px; orphans: 4; text-align: start; white-space: pre-wrap; caret-color: #333333; background-color: #ffffff;">89</span><span style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 15px; letter-spacing: 1.5px; orphans: 4; text-align: start; white-space: pre-wrap; caret-color: #333333; background-color: #ffffff;">1029429</span></strong><span style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 15px; letter-spacing: 1.5px; orphans: 4; text-align: start; white-space: pre-wrap; caret-color: #333333; background-color: #ffffff;">」</span><span style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 15px; letter-spacing: 1.5px; orphans: 4; text-align: start; white-space: pre-wrap; caret-color: #333333; background-color: #ffffff;">欢迎想一起学习</span><span style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 15px; letter-spacing: 1.5px; orphans: 4; text-align: start; white-space: pre-wrap; caret-color: #333333; background-color: #ffffff;">进步的小伙伴~</span></p>
<p style="line-height: 1.8em; orphans: 4; font-size: 15px; letter-spacing: 0.1em; white-space: pre-wrap; caret-color: #333333; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; text-align: start; background-color: #ffffff; margin: 2em 5px !important;"><span style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 15px; letter-spacing: 1.5px; orphans: 4; text-align: start; white-space: pre-wrap; caret-color: #333333; background-color: #ffffff;"><span style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 15px; letter-spacing: 1.5px; orphans: 4; text-align: start; white-space: pre-wrap; caret-color: #333333; background-color: #ffffff;">另外方包最近开发了一款工具类的小程序</span><strong style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 15px; letter-spacing: 1.5px; orphans: 4; text-align: start; white-space: pre-wrap; caret-color: #333333; background-color: #ffffff;">「<span style="color: #226ba3;"><a class="weapp_text_link js_weapp_entry" style="font-size: 15px;" data-miniprogram-appid="wx56a60c28e8dead55" data-miniprogram-path="pages/index/index" data-miniprogram-nickname="方包工具箱" data-miniprogram-type="text" data-miniprogram-servicetype="">方包工具箱</a></span>」,</strong><span style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 15px; letter-spacing: 1.5px; orphans: 4; text-align: start; white-space: pre-wrap; caret-color: #333333; background-color: #ffffff;">功能包括：</span><span style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 15px; letter-spacing: 1.5px; orphans: 4; text-align: start; white-space: pre-wrap; caret-color: #333333; background-color: #ffffff;">抖音、小红书、快手去水印，天气预报，小说在线免费阅读（内含上万部热门小说），历史今天，生成图片二维码,图片识别文字，ai伪原创文章，数字摇号抽奖，文字转语音MP3功能...</span></span></p>

<section style="line-height: 1.8em; orphans: 4; font-size: 15px; letter-spacing: 0.1em; white-space: pre-wrap; caret-color: #333333; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; text-align: start; background-color: #ffffff; margin: 2em 5px !important;">送福利！关注下方的公众号：<span style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 15px; letter-spacing: 1.5px; orphans: 4; text-align: start; white-space: pre-wrap; caret-color: #333333; background-color: #ffffff;">「<span style="color: #226ba3;"><strong>优派编程</strong></span></span><span style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 15px; letter-spacing: 1.5px; orphans: 4; text-align: start; white-space: pre-wrap; caret-color: #333333; background-color: #ffffff;">」</span>回复<span style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 15px; letter-spacing: 1.5px; orphans: 4; text-align: start; white-space: pre-wrap; caret-color: #333333; background-color: #ffffff;">「<span style="color: #226ba3;"><strong>资料</strong></span></span><span style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 15px; letter-spacing: 1.5px; orphans: 4; text-align: start; white-space: pre-wrap; caret-color: #333333; background-color: #ffffff;">」</span>，即可获得软件app下载资源和python、java等编程学习资料！</section>
<p style="white-space: normal; margin-bottom: 0em;"><img class="aligncenter" src="https://www.fang1688.cn/wp-content/uploads/2022/04/frc-c379e5f1445ab0934f8c5697c29010aa.png" /></p>

<section style="letter-spacing: 0.544px; white-space: normal; caret-color: rgba(0, 0, 0, 0); outline: 0px; text-align: center;"><strong style="outline: 0px; text-align: justify;"><span style="outline: 0px; font-size: 14px;">   </span></strong></section><section style="text-align: center;"><span style="color: #000000; font-family: Roboto, Oxygen, Ubuntu, Cantarell, PingFangSC-light, PingFangTC-light, 'Open Sans', 'Helvetica Neue', 'sans-serif'; font-size: 16px; text-align: center; background-color: #ffffff;">点击卡片关注「优派编程」</span><br style="color: #000000; font-family: Roboto, Oxygen, Ubuntu, Cantarell, PingFangSC-light, PingFangTC-light, 'Open Sans', 'Helvetica Neue', 'sans-serif'; font-size: 16px; text-align: center; white-space: normal;" /><span style="color: #000000; font-family: Roboto, Oxygen, Ubuntu, Cantarell, PingFangSC-light, PingFangTC-light, 'Open Sans', 'Helvetica Neue', 'sans-serif'; font-size: 16px; text-align: center; background-color: #ffffff;">定期分享 it编程干货</span></section><section class="mp_profile_iframe_wrp"></section>
<p style="text-align: left;"><span style="display: none; line-height: 0px;">‍</span><span style="display: none; line-height: 0px;">‍</span><span style="display: none; line-height: 0px;">‍</span> <span style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 15px; letter-spacing: 1.5px; orphans: 4; text-align: start; white-space: pre-wrap; caret-color: #333333; background-color: #ffffff;">⬇️ 点击链接阅读原文直达 </span><a href="http://www.fang1688.cn"><strong style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 15px; letter-spacing: 1.5px; orphans: 4; text-align: start; white-space: pre-wrap; caret-color: #333333; background-color: #ffffff;">方包博客</strong></a></p>