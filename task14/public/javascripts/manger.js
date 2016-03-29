    $(document).ready(function() {
        $("#bj").click(function() {
            $('.cur').removeClass('cur');
            $('#bj').addClass('cur');
            $('#show-wrap').css('display', 'none');
            $('#show-wrap1').css('display', 'block');
            $('.c-title').html("百家新闻列表");
            $('#show-wrap1 table').show();
            $('#addNew').hide();
        });
        $("#tj").click(function() {
            $('.cur').removeClass('cur');
            $('#tj').addClass('cur');
            $('#show-wrap').css('display', 'block');
            $('#show-wrap1').css('display', 'none');
            $('.c-title').html("推荐新闻列表");
            $('#show-wrap table').show();
            $('#addNew').hide();
        });

        //

        //增加新闻
        $("#addBtn").click(function() {
            $('#show-wrap table').hide();
            $('#show-wrap1 table').hide();

            $('#addNew').show();
        });


        //返回新闻列表
        $("#backBtn").click(function() {
            $('#show-wrap table').show();
            $('#show-wrap1 table').show();
            $('#addNew').hide();

        });

        //修改新闻页面——————返回
        $("#backBtn-1").click(function() {
            $("#r-wrap").show();
            $("#r-wrap-1").hide();
            $('#show-wrap table').show();
            $('#show-wrap1 table').show();
            $('#addNew').hide();

        });


        //ajax

        //推荐
        $.get("http://127.0.0.1:3000/server/tuijian", function(data) {

            // console.log(JSON.stringify(data));
            // console.log(typeof(data));
            // console.log(data.length);


            for (var i = 0; i < data.length; i++) {

                var sub = "<tr>";
                sub += "<td>" + data[i].newsid + "</td>";
                sub += "<td>" + filterXSS(data[i].newstitle) + "</td>";//输出检查：过滤或者转义敏感字符
                sub += "<td>" + filterXSS(data[i].newsimg) + "</td>";//输出检查：过滤或者转义敏感字符
                sub += "<td>" + filterXSS(data[i].newscontent) + "</td>";//输出检查：过滤或者转义敏感字符
                sub += "<td>" + data[i].addtime + "</td>";
                sub += "<td class='del'>"
                    // sub += "<a id='delBtn' href='javascript:alert(" + data[i].newsid+ ")'>删除</a>"
                sub += "<a id='delBtn' onclick='doDel(" + data[i].newsid + ")'>删除</a> "
                sub += " <a id='updataBtn' onclick='doUpdata(" + data[i].newsid + ")'>修改</a>"
                sub += "</td>";
                sub += "</tr>"

                $("#show-wrap table").append(sub);
            }

        });

        //百家
        $.get("http://127.0.0.1:3000/server/baijia", function(data) {

            // console.log(JSON.stringify(data));
            // console.log(typeof(data));
            // console.log(data.length);

            for (var i = 0; i < data.length; i++) {

                var sub = "<tr>";
                sub += "<td>" + data[i].newsid + "</td>";
                sub += "<td>" + filterXSS(data[i].newstitle) + "</td>";//输出检查：过滤或者转义敏感字符
                sub += "<td>" + filterXSS(data[i].newsimg) + "</td>";//输出检查：过滤或者转义敏感字符
                sub += "<td>" + filterXSS(data[i].newscontent) + "</td>";//输出检查：过滤或者转义敏感字符
                sub += "<td>" + data[i].addtime + "</td>";
                sub += "<td class='del'>"
                sub += "<a id='delBtn' onclick='doDel(" + data[i].newsid + ")'>删除</a> "
                sub += " <a id='updataBtn' onclick='doUpdata(" + data[i].newsid + ")'>修改</a>"
                sub += "</td>";
                sub += "</tr>"


                $("#show-wrap1 table").append(sub);
            }

        });


        //增加新闻
        $("#sub").click(function() {
            $.ajax({
                type: "POST",
                dataType: "json",
                url: "http://127.0.0.1:3000/server/addnews",
                data: $("#addForm").serialize(),
                success: function() {
                    alert("添加成功");
                }

            })

        });

        //修改新闻  确认按钮
        $("#r-sub").click(function() {
            $.ajax({
                type: "POST",
                dataType: "json",
                url: "http://127.0.0.1:3000/server/renew",
                data: $("#resnewForm").serialize(),
                success: function() {
                    alert("修改成功");
                }

            })

        });

    });
    //删除新闻
    function doDel(newsid) {
        // alert(newsid);
        var r = confirm("确定要删除吗？");
        if (r == true) {
            $.ajax({
                type: "POST",
                dataType: "json",
                url: "http://127.0.0.1:3000/server/delnews",
                data: {
                    newsid: newsid
                },
                success: function() {
                    alert("删除成功");
                    window.location.reload();
                }
            });
        } else {
            return;
        }

    };

    //修改新闻
    function doUpdata(newsid) {
        document.getElementById('r-wrap').style.display = "none";
        document.getElementById('r-wrap-1').style.display = "block";
        $.ajax({
            type: "get",
            dataType: "json",
            url: "http://127.0.0.1:3000/server/updatanews",
            data: {
                newsid: newsid
            },
            success: function(data) {

                var a = JSON.stringify(data);
                var b = JSON.parse(a);
                var newsid = b[0].newsid;
                var newstitle = b[0].newstitle;
                var newsimg = b[0].newsimg;
                var newscontent = b[0].newscontent;
                var addtime = b[0].addtime;
                var lanmu = b[0].lanmu;
                $("#r-newsid").val(newsid);
                $("#r-newstitle").val(newstitle);
                $("#r-newsimg").val(newsimg);
                $("#r-newscontent").val(newscontent);
                $("#r-addtime").val(addtime);
                $("#r-lanmu").val(lanmu);

            }
        });
    }
