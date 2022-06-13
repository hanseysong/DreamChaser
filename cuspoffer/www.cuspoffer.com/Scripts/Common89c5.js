//手机号验证
function IsMobilePhone(str) {
    // var reg = new RegExp(/^1[34578][0-9]{9}$/); //验证规则，
    var reg = new RegExp(/^[0-9]{10}$|^[0-9]{11}$/);//

    // var regCn = new RegExp(/^1[34578][0-9]{9}$/);
    return reg.test(str);

}
//验证身份证号并获取出生日期
function getBirthdatByIdNo(iIdNo) {
    var tmpStr = "";
    var idDate = "";
    var tmpInt = 0;
    var strReturn = "";

    iIdNo = trim(iIdNo);

    if ((iIdNo.length != 15) && (iIdNo.length != 18)) {
        strReturn = "";
        return strReturn;
    }

    if (iIdNo.length == 15) {
        tmpStr = iIdNo.substring(6, 12);
        tmpStr = "19" + tmpStr;
        tmpStr = tmpStr.substring(0, 4) + "-" + tmpStr.substring(4, 6) + "-" + tmpStr.substring(6)

        return tmpStr;
    }
    else {
        tmpStr = iIdNo.substring(6, 14);
        tmpStr = tmpStr.substring(0, 4) + "-" + tmpStr.substring(4, 6) + "-" + tmpStr.substring(6)

        return tmpStr;
    }
}

//身份证号码的验证规则
function IsIdCardNo(num) {
    //if (isNaN(num)) {alert("输入的不是数字！"); return false;} 
    var len = num.length, re;
    if (len == 15)
        re = new RegExp(/^(\d{6})()?(\d{2})(\d{2})(\d{2})(\d{2})(\w)$/);
    else if (len == 18)
        re = new RegExp(/^(\d{6})()?(\d{4})(\d{2})(\d{2})(\d{3})(\w)$/);
    else {
        //alert("输入的数字位数不对。"); 
        return false;
    }
    var a = num.match(re);
    if (a != null) {
        if (len == 15) {
            var D = new Date("19" + a[3] + "/" + a[4] + "/" + a[5]);
            var B = D.getYear() == a[3] && (D.getMonth() + 1) == a[4] && D.getDate() == a[5];
        }
        else {
            var D = new Date(a[3] + "/" + a[4] + "/" + a[5]);
            var B = D.getFullYear() == a[3] && (D.getMonth() + 1) == a[4] && D.getDate() == a[5];
        }
        if (!B) {
            //alert("输入的身份证号 "+ a[0] +" 里出生日期不对。"); 
            return false;
        }
    }
    if (!re.test(num)) {
        //alert("身份证最后一位只能是数字和字母。");
        return false;
    }
    return true;
}

//验证邮箱
function IsEmail(mail) {
    var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
    return reg.test(mail); //true
}

//生成 UUID
function guid() {
    return 'xxx3xxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

//检查是否登录,依赖layout
function checkLogin() {
    if (!_Logged) {
        $("#login").modal("show");
        return false;
    }
    return true;
}