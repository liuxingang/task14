/**
 * Created by sck on 2016/1/20.
 */
$(document).ready(function() {
    more();
    less();
    baijia();
    tuijian();

});
/*更多*/
function more() {
    $(".more").click(function() {
        $(this).css("display", "none");
        $(".tr_none").show();
        $(".footer").show();
    });
}
/*收起*/
function less() {
    $(".less").click(function() {
        $(".more").show();
        $(".tr_none").css("display", "none");
        $(".footer").css("display", "none");
    });
}

function baijia() {
    $("#baijia").click(function() {
        $(".cur").removeClass("cur");
        $("#dd").addClass("cur");
        $(".topic-gallery-container").css("display", "none");
        $("#myDiv").css("display", "none");
        $("#myDiv1").css("display", "block");
    });
}

function tuijian() {
    $("#tuijian").click(function() {
        $(".cur").removeClass("cur");
        $("#aa").addClass("cur");
        $(".topic-gallery-container").css("display", "block");
        $("#myDiv").css("display", "block");
        $("#myDiv1").css("display", "none");
    });
}
