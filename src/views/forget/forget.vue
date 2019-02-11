<template>
    <div class="login">
        <headBox str="密码找回"
                 url="/login"
                 :ylBoolean="true"
                 :logo="false"></headBox>
        <div class="logo">
            <img src="http://youshantui.258.com/static/website/images/syt-logo.png"
                 alt="">
        </div>
        <!-- 第一步 -->
        <div class="forBox"
             v-if="status==0">
            <van-cell-group>
                <van-field placeholder="请输入您要找回密码的用户名"
                           label="用户名"
                           clearable
                           v-model="data.username"
                           :error-message="errorMsg.username"></van-field>
            </van-cell-group>
        </div>
        <!-- 第二步 -->
        <div class="forBox"
             v-if="status==1">
            <p class="small">
                您关联的验证手机号为：{{tel}}
            </p>
            <van-cell-group>
                <van-field placeholder="请输入您要找回密码的手机号"
                           label="手机号"
                           clearable
                           v-model="data.tel"
                           :error-message="errorMsg.tel"></van-field>
                <van-field v-model="data.codeno"
                           center
                           clearable
                           label="短信验证码"
                           :error-message="errorMsg.codeno"
                           placeholder="请输入短信验证码">
                    <van-button slot="button"
                                size="small"
                                @click="code"
                                type="primary">发送验证码</van-button>
                </van-field>
            </van-cell-group>
        </div>
        <div class=" btnBox">
            <van-button block
                        type="primary"
                        @click="submit()">
                下一步
            </van-button>
            <van-button block
                        class="mar-top"
                        @click="$router.push('/login')">
                返回登录
            </van-button>
        </div>
    </div>
</template>
<script>
import { Field } from 'vant'
import validator from '../../utils/validator.js'
import headBox from '../../components/head/head.vue'
export default {
  components: {
    [Field.name]: Field,
    headBox: headBox
  },
  data () {
    return {
      countdown: 0,
      status: 0,
      tel: '153*****321',
      data: {
        username: '',
        tel: '',
        codeno: ''
      },
      errorMsg: {
        username: '',
        tel: '',
        codeno: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ]
      },
      rules2: {
        tel: [
          { required: true, pattern: /^1[34578]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur' }
        ],
        codeno: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.validator = validator(this.rules, this.data)
    this.validator2 = validator(this.rules2, this.data)
  },
  methods: {
    // countdownSubtract () {
    //   if (this.countdown > 0) {
    //     setTimeout(() => {
    //       this.countdown -= 1
    //       this.countdownSubtract()
    //     }, 1000)
    //   }
    // },
    // 获取验证码
    code () {
      let reg = /^1[34578]\d{9}$/
      let str = this.data.tel
      if (reg.test(str)) {
        this.errorMsg.tel = ''
        this.postRequest('publics/send_sms', { mobile: str }).then(res => {
          if (res) {
            let dataBox = res.data
            console.log(dataBox, 222)
          }
        })
      } else {
        this.errorMsg.tel = '请输入正确的手机号码'
      }
    },
    /** 清除验证提示 */
    resetField (attrs) {
      attrs = !attrs ? Object.keys(this.errorMsg) : (Array.isArray(attrs) ? attrs : [attrs])
      attrs.forEach(attr => {
        this.errorMsg[attr] = ''
      })
    },
    /** 验证方法 */
    validate (callback, data) {
      switch (this.status) {
        case 0:
          this.validator.validate((errors, fields) => {
            this.resetField()
            if (errors) {
              fields.forEach(item => {
                this.errorMsg[item.field] = item.message
              })
            }
            callback && callback(errors, fields)
          }, data)
          break
        case 1:
          this.validator2.validate((errors, fields) => {
            this.resetField()
            if (errors) {
              fields.forEach(item => {
                this.errorMsg[item.field] = item.message
              })
            }
            callback && callback(errors, fields)
          }, data)
          break
      }
    },
    sub2 () {
      this.validate((errors, fields) => {
        if (!errors) {
          this.postRequest('publics/forget_step2', { codeno: this.data.codeno, mobile: this.data.tel }).then(res => {
            if (res) {
              let dataBox = res.data
              this.Toast(dataBox.msg)
              if (dataBox.status === 1) {
                this.$router.push('/reset')
              }
            }
          })
        }
      })
    },
    // 提交
    submit () {
      this.validate((errors, fields) => {
        if (!errors) {
          switch (this.status) {
            case 0:
              this.postRequest('publics/forget_step1', { username: this.data.username }).then(res => {
                if (res) {
                  let dataBox = res.data
                  this.tel = dataBox.mobile
                  this.status = 1
                }
              })
              break
            case 1:
              this.sub2()
              break
          }
        }
      })
    }
  }

}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.logo
    text-align center
    padding 50px 0
.small
    font-size 14px
    color #999
    text-align center
</style>
