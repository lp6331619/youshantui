<template>
    <div class="login">
        <headBox str="重置密码"
                 url="/forget"
                 :ylBoolean="true"
                 :logo="false"></headBox>
        <div class="logo">
            <img src="http://youshantui.258.com/static/website/images/syt-logo.png"
                 alt="">
        </div>
        <!-- 第一步 -->
        <div class="forBox">
            <van-cell-group>
                <van-field placeholder="请输入新密码"
                           label="新密码"
                           clearable
                           type="password"
                           v-model="data.password"
                           :error-message="errorMsg.password"></van-field>
                <van-field placeholder="请输入新密码"
                           label="新密码"
                           clearable
                           type="password"
                           v-model="data.password2"
                           :error-message="errorMsg.password2"></van-field>
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
      tel: '153*****321',
      data: {
        password: '',
        password2: ''
      },
      errorMsg: {
        password: '',
        password2: ''
      },
      rules: {
        password: [
          { required: true, min: 6, message: '密码不少于6位', trigger: 'blur' }
        ],
        password2: [
          {
            validator: (rule, value, callback) => {
              let text = '输入的两次密码不相同！'
              if (value !== this.data.password) {
                callback(text)
              }
            }
          }
        ]
      }
    }
  },
  created () {
    this.validator = validator(this.rules, this.data)
  },
  methods: {
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
          this.postRequest('publics/forget_step3', this.data).then(res => {
            if (res) {
              let dataBox = res.data
              if (dataBox.status === 1) {
                this.Toast('密码修改成功！')
                this.$router.push('/login')
              }
            }
          })
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
