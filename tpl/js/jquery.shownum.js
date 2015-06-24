/**
 * Created by huanglong on 15/6/24.
 *
 * 滚动显示数据统计
 */
(function($){
    $.fn.showNum = function(options){
        var _this = this,
            settings = {
                'data_name':'attr-data',
                'step':22,
                'type':'money'
            },
            tpl="<span><i>0</i><i>1</i><i>2</i><i>3</i><i>4</i><i>5</i><i>6</i><i>7</i><i>8</i><i>9</i></span>";

        $.extend(settings, options);
        $(this).each(function(){
            settings.step = $(this).height();

            var num = parseInt($(this).attr(settings.data_name));
            for(var i=0, len=String(num).length; i<len; i++){
                var go_step = parseInt(String(num).charAt(i)) * settings.step * -1;
                if(settings.type=='money' && (len-(i+1)+1)%3==0 && i!=0){
                    var top = settings.step * 9 ;
                    $(this).append("<b style='top:-"+ top +"px'>,</b>");
                }
                $(this).append(tpl);


                $(this).find("span").eq(i).animate({"top":go_step+"px"});
            }
        });
    }
})(jQuery);