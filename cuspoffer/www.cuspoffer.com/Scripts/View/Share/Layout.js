//忘记密码发送邮件
function sendForgetEmail() {
    $("#find-resend").removeClass("text-mail");
    $.ajax({
        url: "/Home/ForgetPsdSubmit",
        type: "post",
        async: true, //异步请求
        cache: false,
        data: { code: $("#code").val(), account: $("#forgetAccount").val() },
        beforeSend: function () {
            layer.load();
        },
        success: function (res) {
            if (res.Code == 0) {
                $("#find-con").hide();
                $("#find-result").show();
                $("#find-result .account").html(res.Data);
                //开始倒计时
                var k = 10;
                var findtimer = setInterval(function () {
                    k = k - 1;
                    if (k < 0) {
                        clearInterval(findtimer);
                        //$("#find-con").show();
                        //$("#find-result").hide();
                        $("#find-resend").one("click", sendForgetEmail);
                        $("#find-resend").html("重新发送").addClass("text-mail");

                    }
                    else {
                        $("#find-resend").html("重新发送" + k + "s");
                    }
                }, 1000);
            }
            else {
                layer.msg("忘记密码提交失败" + res.Message)
            }
        },
        error: function () {
            layer.alert("忘记密码提交失败!");

        },
        complete: function () {
            layer.closeAll('loading');
        }
    })
}
//修改密码
function changeForgetPsd() {
    $('#login').modal("hide");
    $('#regist').modal("hide");
    setTimeout(function () {
        $('#find').modal("show");
        $("#valiCode").attr("src", "/Home/GetValidateCode?ts=" + Math.random());
    },
        500);

}

//登录
function login() {
    var email = $("#logEmail").val();
    var psd = $("#logPsd").val();
    var setCache = $("#remeber").is(':checked')
    var loginType = $("#logType").val();
    if (email == "" || email == null) {
        layer.msg("请输入邮箱");
        return false;
    }
    if (psd == "" || psd == null) {
        layer.msg("请输入密码");
        return false;
    }
    $.ajax({
        url: "/Home/LoginSubmit",
        type: "post",
        async: true, //异步请求
        cache: false,
        data: { account: email, pass: psd, setCache: setCache, loginType: loginType },
        beforeSend: function () {
            layer.load();
        },
        success: function (res) {
            if (res.Code == 0) {
                _Logged = true;
                //登录成功
                reloadLoginPart();
                $('#login').modal("hide");
            }
            else {
                layer.msg("登录失败" + res.Message)
                $("#logPsd").val("");
                $("#logType").val("0")
            }
        },
        error: function () {
            layer.alert("登录提交失败!");

        },
        complete: function () {
            layer.closeAll('loading');
        }
    })
    return false;
}

//点击注册
function reg() {
    var email = $("#regEmail").val();
    var psd = $("#regPsd").val();
    var type = $("#regType").val();
    var school = $("#regSchool").val();
    var source = $("#regSource").val();

    if (!IsEmail(email)) {
        layer.msg("请输入正确的邮箱");
        return false;
    }
    if (psd == "" || psd == null) {
        layer.msg("请输入密码");
        return false;
    }
    if (type == "Student" && school == "") {
        layer.msg("请输入在读院校");
        return false;
    }                                                                                                                                                       
    if (type == "Teacher") {
        //弹出确认框
        layer.load();
        $("#regprotocol").load("/Home/_RegProtocol", function () {
            $("#regprotocol").modal("show");
            layer.closeAll('loading');
        })
        return false;
    }
                            
    $.ajax({
        url: "/Home/RegSubmit",
        type: "post",
        async: true, //异步请求
        cache: false,
        data: { account: email, pass: psd, type: type, school: school, source: source},
        beforeSend: function () {
            layer.load();
        },
        success: function (res) {
            if (res.Code == 0) {
                //注册成功
                $("#regist-con").hide();
                $("#regist-result").show();
                $("#regist-result .account").html(res.Data);
                //开始倒计时
                var i = 10;
                var timer = setInterval(function () {
                    i = i - 1;
                    if (i < 0) {
                        clearInterval(timer);
                        //$("#regist-con").show();
                        //$("#regist-result").hide();
                        $("#reg-resend").html("重新发送");
                        $("#reg-resend").one("click", reSendRegMail).addClass("text-mail");
                    }
                    else {
                        $("#reg-resend").html("重新发送" + i + "s");
                    }
                }, 1000);
            }
            else {
                layer.msg("注册失败" + res.Message)
            }
        },
        error: function () {
            layer.alert("注册提交失败!");

        },
        complete: function () {
            layer.closeAll('loading');
        }
    })
    return false;
}

//刷新登录分布视图
function reloadLoginPart() {
    $("#loginPart").load("/Home/Login");
}
//邮件重新发送
function reSendRegMail() {
    var email = $("#regEmail").val();
    if (!IsEmail(email)) {
        layer.msg("注册邮箱验证失败,请刷新重新注册");
        return false;
    }
    $("#reg-resend").removeClass("text-mail");
    $.ajax({
        url: "/Home/ReSendActivationCode",
        type: "post",
        async: true, //异步请求
        cache: false,
        data: { account: email },
        beforeSend: function () {
            layer.load();
        },
        success: function (res) {
            if (res.Code == 0) {
                // $("#regist-result .account").html(res.Data);
                //开始倒计时
                var i = 10;
                var timer = setInterval(function () {
                    i = i - 1;
                    if (i < 0) {
                        clearInterval(timer);
                        //$("#regist-con").show();
                        //$("#regist-result").hide();
                        $("#reg-resend").html("重新发送");
                        $("#reg-resend").one("click", reSendRegMail).addClass("text-mail");
                    }
                    else {
                        $("#reg-resend").html("重新发送" + i + "s");
                    }
                }, 1000);
            }
            else {
                layer.msg("邮件重发失败" + res.Message)
            }
        },
        error: function () {
            layer.alert("邮件重发失败失败!");

        },
        complete: function () {
            layer.closeAll('loading');
        }
    })

}