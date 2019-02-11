<template>
    <div class="login">
        <headBox str="登录"
                 :ylBoolean="true"
                 :logo="true"></headBox>
        <div class="logo">
            <img src="http://youshantui.258.com/static/website/images/syt-logo.png"
                 alt="">
        </div>
        <van-cell-group>
            <van-field placeholder="账户"
                       label="账户"
                       clearable
                       v-model="data.username"
                       :error-message="errorMsg.username"></van-field>
            <van-field placeholder="请输入密码"
                       label="密码"
                       type="password"
                       clearable
                       v-model="data.password"
                       :error-message="errorMsg.password"></van-field>
        </van-cell-group>
        <div class=" btnBox">
            <van-button block
                        type="primary"
                        @click="submit()">
                立即登录
            </van-button>
            <van-button block
                        class="mar-top"
                        @click="forget">
                忘记密码
            </van-button>
        </div>
    </div>
</template>
<script>
import { Field } from 'vant'
import headBox from '../../components/head/head.vue'
import validator from '../../utils/validator.js'
export default {
  components: {
    [Field.name]: Field,
    headBox: headBox
  },
  data () {
    return {
      countdown: 0,
      data: {
        username: '',
        password: ''
      },
      errorMsg: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.validator = validator(this.rules, this.data)
  },
  methods: {
    countdownSubtract () {
      if (this.countdown > 0) {
        setTimeout(() => {
          this.countdown -= 1
          this.countdownSubtract()
        }, 1000)
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
      this.validator.validate((errors, fields) => {
        this.resetField()
        if (errors) {
          fields.forEach(item => {
            this.errorMsg[item.field] = item.message
          })
        }
        callback && callback(errors, fields)
      }, data)
    },
    // 提交
    submit () {
      this.validate((errors, fields) => {
        if (!errors) {
          this.getRequest('publics/login', this.data).then(res => {
            if (res) {
              let dataBox = res.data.data

              this.$store.dispatch('setUser', {
                access_token: dataBox.access_token
              })
              this.$router.push('/')
            }
          })
        }
      })
    },
    forget () {
      this.$router.push('/forget')
    }
  }

}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.logo {
  text-align: center;
  padding: 50px 0;
}
</style>
