$(function () {
  // 1.获取用户信息
  getUserInfo()


  // 2.退出功能
  var layer = layui.layer;
  $('#btnLogout').on('click', function () {
    layer.confirm('是否确认退出?', { icon: 3, title: '提示' }, function (index) {
      //do something
      // 1. 清空本地存储中的 token
      localStorage.removeItem('token');
      // 2. 重新跳转到登录页面
      location.href = '/login.html';

      // 关闭 confirm 询问框
      layer.close(index);
    })
  })

})


// 1.获取用户基本信息
function getUserInfo() {
  $.ajax({
    url: '/my/userinfo',
    success: function (res) {
      if (res.status !== 0) {
        return layui.layer.msg(res.message)
      }
      // 调用 renderAvatar 渲染用户的头像
      renderAvatar(res.data);

    },
  });
}

// 封装用户头像渲染函数
function renderAvatar(user) {
  // 1.用户名(昵称优先，没有用usernam)
  var name = user.nickname || user.username;
  $('#welcome').html('欢迎　　' + name);
  // 2.用户头像
  if (user.user_pic !== null) {
    $('.layui-nav-img').show().attr('src', user.user_pic);
    $('.user-avatar').hide();
  } else {
    // 没有头像
    $('.layui-nav-img').hide();
    var text = name[0].toUpperCase();
    $('.user-avatar').show().html(text)

  }
}