/**
 * Created by mszz on 2016/11/6.
 */
(function () {
    var loginAlertDiv = $("#login").find(".alert-div");

    $("#form-login").submit(function (e) {
        e.preventDefault();

        loginAlertDiv.html("正在连接服务器...");
        $.post("/apis/login",{
            user:this['user'].value,
            pass:this['pass'].value
        }).done(function (data) {
            if (data.state==1){
                location.href="back.html";
            }
            switch (data.state){
                case 1:
                    loginAlertDiv.html("登陆成功 ");
                    break;
                case 5:
                case 6:
                    loginAlertDiv.html("用户名或密码错误");
                    break;
                default:
                    loginAlertDiv.html("登陆失败");
                    break;
            }
        }).fail(function () {
            loginAlertDiv.html("无法连接服务器");
        });
    })
})();