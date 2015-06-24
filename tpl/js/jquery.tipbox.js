/**
 * Created by huanglong on 15/6/24.
 *
 * 弹窗展示模块
 */
(function($){
    $.fn.tipBox = function(){
        var _this = $(this).size()==1 ? this : this[0];
        var tip_box = {
            show_tip:function(){
                if($(".box-wrap").size()<1){
                    var $h = $("body").height(),$wh=$(window).height(),$hh=$(document).height();
                    $('<div class="box-wrap"></div>').appendTo('body').fadeIn(300);
                    $h = Math.max($h,$wh);
                    $h = Math.max($h,$hh);
                    $(".box-wrap").css({"z-index":"9999", "left":"0", "top":"0", "position":"absolute", "background-color": "#000",display:'block', width:$(window).width()+'px', 'height':$h+'px', 'opacity':0.5});
                }
                $(".box-wrap").show();

                var left = ($(window).width() - $(_this).width()) / 2;
                var top  = ($(window).height() - $(_this).height()) / 2 ;
                $(_this).css({'z-index':99999,'position':'fixed','display':'block','top':top+'px','left':left+'px'});
            },
            close_tip:function(){
                $(_this).hide();
                $(".box-wrap").hide();
            }
        };

        return tip_box;
    };
})(jQuery);
