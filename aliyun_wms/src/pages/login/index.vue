<template>
  <div class="login-bg">
    <div class="login-left-bg" :style="fullWidth">
      <div class="icon-logo">
        <!-- <img src="../../common/img/logo_home.png" alt=""> -->
      </div>
      <div class="logo-text">
        <p>MANAGEMENT BACKGROUND</p>
        <P>昕斗云</P>
      </div>
    </div>
    <div class="login-right">
      <div class="login-box">
        <div class="login-logo">
          <span>欢迎登录昕斗云</span>
        </div>

        <div :class="{'input-box':true,'input-color':borderType=='user'}">
          <i class="icon-username" @click="iconClick('username',$event)"></i>
          <input @focus='focusFun("user")' @blur="blurFun" placeholder="请输入用户名" id="usernameIput" type="text" v-model="loginName" />

        </div>

        <div :class="{'input-box':true,'input-color':borderType=='password'}">
          <i class="icon-password" @click="iconClick('password',$event)"></i>
          <input @focus='focusFun("password")' @blur="blurFun" placeholder="请输入密码" id="passwordIput" type="password" v-model="loginPassword"
          />

        </div>

        <div class="loginbutonDiv">
          <el-button class="buttonSize button-solid" type="primary" @click="login">登录</el-button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import md5 from 'js-md5';
  import {
    Message
  } from 'element-ui'

  export default {
    data() {
      return {
        loginName: '',
        loginPassword: '',
        baseRouter: '',
        fullWidth: { // 动态获取屏幕高度
          width: (document.documentElement.clientWidth - 545) + "px"
        },
        borderType: ""
      }
    },
    methods: {
      iconClick(item) {
        if (item == 'username') {
          document.getElementById('usernameIput').focus();
        } else {
          document.getElementById('passwordIput').focus();
        }
      },
      focusFun(val) {
        let self = this;
        self.borderType = val;
      },
      blurFun() {
        let self = this;
        self.borderType = "";
      },
      login() {
        let self = this;
        // self.$router.push("/welcome");
        if (!self.loginName) {
          Message.error({
            message: '请填写用户名'
          })
          return
        }
        if (!self.loginPassword) {
          Message.error({
            message: '请填写密码'
          })
          return
        }
        var param = {
          userName: self.loginName,
          password: md5(self.loginPassword)
        }

        self.$api.post('auth/user/login', param, function (res) {
          Message.success({
            message: '登录成功',
            duration: 1000
          });
          if (!res.repData) {
            Message.error({
              message: res.repMsg
            });
            return
          }
          let user = {
            realName: res.repData.userEnity.realName,
            telephone: res.repData.userEnity.telephone,
            userId: res.repData.userEnity.id,
            account: self.loginName,
						orgId: res.repData.userEnity.orgId,
						type:res.repData.userEnity.type,
					};
          self.$api.sset("_token", res.repData.token);
          self.$api.sSetObject("_user", user);
          self.$api.sSetObject("_menuList", res.repData.permissions);

          // self.$router.push(self.baseRouter + "/welcome");
        }, function (e) {

        })
      }
    },
    mounted() {
      var self = this;
      // self.baseRouter = self.$api.baseRouter();
      document.onkeydown = function (e) {
        var ev = document.all ? window.event : e;
        if (ev.keyCode == 13) {
          if (self.$route.path == "/login" || self.$route.path == "/") {
            self.login();
            return false;
          }

        }
      };
      window.onresize = () => {
        return (() => {
          self.fullWidth.width = (document.documentElement.clientWidth - 516) + "px"
        })()
      }
    }
  }

</script>

<style scoped>
  .login-bg {
    width: 100%;
    height: 100%;

  }

  .login-left-bg {

    height: 100%;
    background: url(../../assets/imgs/icon_loginbg.jpg) 80% 100%;
    background-repeat: no-repeat;
    /*占满屏幕,auto是随尺寸*/
    background-size: cover;
  }

  .icon-logo {
    position: absolute;
    top: 50px;
    left: 50px;
  }

  .logo-text {
    font-family: PingFangSC-Semibold;
    color: #FFFFFF;
    text-align: right;
    position: absolute;

    bottom: 100px;
    right: 750px;
  }

  .logo-text>p:first-child {
    line-height: 67px;
    font-size: 48px;
  }

  .logo-text>p:last-child {
    padding-right: 30px;
    line-height: 40px;
    font-size: 28px;
  }

  /*400*300*/

  .login-right {
    width: 695px;
    height: 100%;
    /* background-color: red; */
    background: url(../../assets/imgs/loginbg_white.png) 100%;
    background-attachment: fixed;
    background-repeat: no-repeat;
    /*占满屏幕,auto是随尺寸*/
    /*background-size: cover;*/
    position: fixed;
    right: 0;
    top: 0;
  }

  .login-box {
    width: 330px;
    height: 300px;
    padding: 25px;
    position: absolute;
    top: 50%;
    right: 50%;
    margin: -210px -240px 0 0;
    border-radius: 5px;
    background-color: rgba(255, 255, 255, 0.3);

    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.15);
  }

  .login-logo {
    width: 220px;
    /*height: 120px;*/
    margin: 0 auto 100px;
    text-align: center;
    font-family: PingFangSC-Medium;
    font-size: 28px;
    color: #333333;
    letter-spacing: 2.33px;
  }

  .login-logo span {
    font-family: PingFangSC-Medium;
    font-size: 28px;
    color: #333333;
    letter-spacing: 2.33px;
    padding-bottom: 3px;
    border-bottom: 4px solid #7D82C4;
  }

  /*输入框*/

  .input-box {
    width: 320px;
    height: 40px;
    line-height: 40px;
    margin-bottom: 20px;
    background: white;
    margin: 0 auto 20px;
    /*		border-radius: 5px;*/
    overflow: hidden;
    position: relative;
    border-bottom: 2px solid #E6E6E6;
  }

  .input-color {
    border-color: #7986E1;
  }

  .input-box>input {
    width: 85%;
    height: 100%;
    background: none;
    color: #666;
    font-size: 14px;
    line-height: inherit;
    padding-left: 15%;
    display: inline-block;
    /*去除谷歌输入框的黄色背景*/
    -webkit-box-shadow: 0 0 0px 1000px white inset;
    overflow: hidden;
  }

  .icon-username {
    position: absolute;
    width: 15%;
    height: 40px;
    background: url(../../assets/imgs/icon_head.png) no-repeat center;
    display: inline-block;
  }

  .icon-password {
    position: absolute;
    width: 15%;
    height: 40px;
    background: url(../../assets/imgs/icon_password.png) no-repeat center;
    display: inline-block;
  }

  .loginbutonDiv {
    position: absolute;
    bottom: -23px;
    right: 50%;
    text-align: center;
    margin-right: -160px;
  }

  .buttonSize {
    width: 320px;
    height: 46px;
    border-radius: 6px;
  }

  /*实心*/

  .button-solid {
    background: #7D82C4;
    color: white;
    border-color: #7D82C4;
  }

  .button-solid.is-active,
  .button-solid:active {
    background: #7D82C4;
    border-color: #7D82C4;
    color: white;
  }

  .button-solid:focus,
  .button-solid:hover {
    background: #7D82C4;
    border-color: #7D82C4;
    color: white;
  }

</style>

