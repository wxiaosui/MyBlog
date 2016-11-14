/**
 * Created by mszz on 2016/11/6.
 */
(function () {

    var SaveAlertDiv = $("#save").find(".alert-div");
    
    $("#form-save").submit(function (e) {
        e.preventDefault();

        SaveAlertDiv.html("正在连接服务器...");

        $.post("/apis/save",{
            title:this['title'].value,
            art:this['art'].value
        }).done(function (data) {
            switch (data.state) {
                case 1:
                    SaveAlertDiv.html("保存成功");
                    break;
                default:
                    SaveAlertDiv.html("保存失败");
                    break;
            }
        }).fail(function () {
            SaveAlertDiv.html("无法连接服务器");
        });
    })

})();