$(function () {
  // 点击“去注册账号”的链接
  $('#link_reg').on('click', function () {
    $('.login-box').hide()
    $('.reg-box').show()
  })

  // 点击“去登录”的链接
  $('#link_login').on('click', function () {
    $('.login-box').show()
    $('.reg-box').hide()
  })

  // 自定义验证规则
  // 从 layui 中获取 form 对象
  var form = layui.form
  form.verify({
    pwd: [
      /^[\S]{6,12}$/,
      '密码必须6到12位，且不能出现空格'
    ],
    repwd: function (value) {
      var pwd = $('.reg-box input[name=[password]').val()
      if (value !== pwd) {
        return "两次输入密码不一致"
      }
    }
  })

  // 注册功能
  var layer = layui.layer;
  $('#form_reg').on('submit', function (e) {
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: "/api/reguser",
      data: {
        username: $('.reg-box [name=username]').val(),
        password: $('.reg-box [name=password]').val()
      },
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        layer.msg(res.message);
        $('#link_login').click()
      }
    })
  })

  // 登录功能
  $('#form_login').submit(function (e) {
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: "/api/login",
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message);

        }
        layer.msg(res.message);
        localStorage.setItem('token', res.token);
        location.href = '/index.html'
      }
    })
  })




})

