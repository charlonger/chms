/**
 * Created by huanglong on 15/6/24.
 *
 * 倒计时插件
 */
(function($){
    $.fn.countdown = function(options){
        var settings = {
            get_syn_time_url:"/ajaxserver.do?actions=system_time",
            system_time:parseInt(Date.parse(new Date()) / 1000),
            call_back:function(){}
        };

        settings = $.extend(settings, options);

        var _this = this;
        var run_times = 0;
        run();

        function run(){
            if(parseInt($(_this).size())<=0){return;}
            run_times++;

            if((run_times % (2*60))==1){
                syn_time_from_server();
            }

            $(_this).not(".is_end").each(function(curr_index){
                var start_time = parseInt((new Date($(this).attr("start_time"))).getTime() / 1000);
                var left_time = start_time - settings.system_time;

                if(left_time == 20 && curr_index==0){
                    syn_time_from_server();
                }

                if(left_time >= 0){
                    var d = parseInt(left_time / (3600 * 24));
                    var h = parseInt((left_time - d * 3600 * 24) / 3600);
                    var i = parseInt((left_time - d * 3600 * 24 - h * 3600) / 60);
                    var s = left_time - d * 3600 * 24 - h * 3600 - i * 60;
                    $(this).find(".d").html(d);
                    $(this).find(".h").html(str_pad(h));
                    $(this).find(".i").html(str_pad(i));
                    $(this).find(".s").html(str_pad(s));

                    if(curr_index==0){
                        setTimeout(run, 1000);
                    }
                }

                if(left_time < 0){
                    settings.call_back();
                    $(this).addClass("is_end");
                }

                settings.system_time = settings.system_time+1;
            });
        }

        function str_pad(str){
            if(str<10){
                str = "0" + str;
            }

            return str;
        }

        function syn_time_from_server(){
            if(settings.get_syn_time_url==""){
                return ;
            }

            $.ajax({
                type: "GET",
                url: settings.get_syn_time_url,
                cache: false,
                dataType: "json",
                success: function (response) {
                    if (response.data['system_time'] != undefined) {
                        settings.system_time = response.data['system_time'];
                    }
                }
            });
        }

    };
})(jQuery);