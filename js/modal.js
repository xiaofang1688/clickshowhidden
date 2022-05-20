 // 添加文章页展开收缩JS效果     
	  
	  
	  jQuery(document).ready(
        function(jQuery){
            jQuery('.collapseButton').click(
			    function(){
                    jQuery(this).parent().parent().find('.xContent').slideToggle('slow');
                    jQuery(this).parent().addClass("hidden-element");
                }
		    );
        }
    );