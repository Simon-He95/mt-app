<template>
    <div class="page-register">
      <article class="header">
        <header>
          <a href="/" class="site-logo"></a>
          <span class="login">
            <em class="bold">已有美团账号？</em>
            <a href="/login">
              <el-button type="primary" size="small">登录</el-button>
            </a>
          </span>
        </header>
      </article>
      <section>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="昵称" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="ruleForm.email"></el-input>
            <el-button size="mini" round @click="sendMessage()">发送验证码</el-button>
            <span class="status" v-if="index">{{statusMsg}}</span>
          </el-form-item>
          <el-form-item label="验证码" prop="code">
            <el-input v-model="ruleForm.code" maxlength="4"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="register">同意以下协议并注册</el-button>
            <div class="error">{{error}}</div>
          </el-form-item>
          <el-form-item>
            <a class="f1" href="">《美团网用户协议》</a>
          </el-form-item>
        </el-form>
      </section>
    </div>
</template>

<script>
  import CryptoJS from 'crypto-js'
    export default {
        name: "register",
      layout:'blank',
      data() {
        var validatePass = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入密码'));
          } else {
            if (this.ruleForm.checkPass !== '') {
              this.$refs.ruleForm.validateField('checkPass');
            }
            callback();
          }
        };
        var validatePass2 = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请再次输入密码'));
          } else if (value !== this.ruleForm.pass) {
            callback(new Error('两次输入密码不一致!'));
          } else {
            callback();
          }
        };
          return {
            statusMsg: '',
            error: '',
            index: 0,
            ruleForm: {
              code: '',
              name: '',
              pass: '',
              checkPass: '',
              email: ''
            },
            rules: {
              name: [{
                required: true, type: 'string', message: '请输入昵称', trigger: 'blur'
              }],
              email: [{
                required: true, type: 'email', message: '请输入邮箱', trigger: 'blur'
              }],
              pass: [
                { validator: validatePass, trigger: 'blur' }
              ],
              checkPass: [
                { validator: validatePass2, trigger: 'blur' }
              ],
            }
          }
      },
      methods: {
        sendMessage() {
          const that = this
          let namePass, emailPass
          if(this.index) {
            this.$message({
              showClose: true,
              message: '请勿再1分钟内多次申请验证码',
              type: 'warning'
            });
          }
          this.index = 1
          console.log(namePass,emailPass,this.timerid)

          if(this.timerid) {
            return false
          }
          this.$refs['ruleForm'].validateField('name', (valid) => {
            namePass = valid // 有值代表错误
          })
          this.statusMsg = ''
          if(namePass) {
            return false
          }
          this.$refs['ruleForm'].validateField('email', (valid) => {
            emailPass = valid // 有值代表错误
          })
          if(!namePass && !emailPass) {
            this.$axios.post('/users/verify', {
              username: encodeURIComponent(that.ruleForm.name),
              email: that.ruleForm.email
            }).then(({status, data}) => {
              console.log(status, data)
              if(status === 200 && data && data.code ===0){
                // 成功
                let count = 60
                that.statusMsg = `验证码已发送，剩余${count--}秒`
                that.timerid = setInterval(() => {
                  that.statusMsg = `验证码已发送，剩余${count--}秒`

                  if(count < 0){
                    clearInterval(that.timerid)
                    this.index = 0
                    that.timerid = 0
                  }
                },1000)
                console.log('成功')
              }else{
                console.log('失败')
                that.statusMsg = data.msg
              }
            })
          }
        },
        register () {
          let that = this
          this.$refs['ruleForm'].validate((valid) => {
            if(valid){
              this.$axios.post('/users/signup', {
                username: window.encodeURIComponent(that.ruleForm.name),
                password: CryptoJS.MD5(that.ruleForm.pass).toString(),
                email: that.ruleForm.email,
                code: that.ruleForm.code
              }).then(({status, data}) => {
                if(status === 200) {
                  if (data && data.code === 0) {
                    location.href = '/login'
                  } else {
                    that.error = data.msg
                  }
                }else {
                  that.error = `服务器出错，错误码${status}`
                }
                setTimeout(() => {
                  that.error = ''
                },1500)
              })
            }
          })
        }
      }
    }
</script>

<style lang="scss" scoped>
  @import "@/assets/css/register/index.scss";
</style>
