$(function () {
  var form = layui.form
  form.verify({
    nickname: function (value) {
      if (value.length > 6) {
        return "长度必须在1~6个字符之间"
      }
    }
  });

  // 2.初始化用户基本信息
  initUserInfo()

  // 初始化用户的基本信息
  var layer = layui.layer
  function initUserInfo() {
    $.ajax({
      method: 'GET',
      url: '/my/userinfo',
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        // console.log(res)
        form.val('formUserInfo', res.data)
      }
    })
  }

  // 3.重置表单
  $('btnReset').on('click', function (e) {
    e.preventDefault();
    initUserInfo()
  })

  // 4.修改用户消息
  $(".layui-form").on('submit', function (e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/my/userinfo',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        layer.msg('恭喜您修改信息成功！')
        window.parent.getUserInfo()
      }
    })
  })



})