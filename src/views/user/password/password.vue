<template>
    <div class="login">
        <headBox str="修改密码"
                 url="/user"
                 :logo="false"></headBox>
        <div class="forBox mt15">
            <van-cell-group>
                <van-field placeholder="请输入原始密码"
                           label="原始密码"
                           clearable
                           v-model="data.old_pwd"
                           :error-message="errorMsg.old_pwd"></van-field>
                <van-field placeholder="请输入新密码"
                           label="新密码"
                           clearable
                           v-model="data.new_pwd"
                           :error-message="errorMsg.new_pwd"></van-field>
                <van-field placeholder="请输入新密码"
                           label="新密码"
                           clearable
                           v-model="data.new_pwd2"
                           :error-message="errorMsg.new_pwd2"></van-field>
            </van-cell-group>
        </div>
        <div class=" btnBox">
            <van-button block
                        type="primary"
                        @click="submit()">
                确定修改
            </van-button>
        </div>
    </div>
</template>
<script>
import { Field } from 'vant'
import validator from '../../../utils/validator.js'
import headBox from '../../../components/head/head.vue'
export default {
  components: {
    [Field.name]: Field,
    headBox: headBox
  },
  data () {
    return {
      tel: '153*****321',
      data: {
        old_pwd: '',
        new_pwd: '',
        new_pwd2: ''
      },
      errorMsg: {
        old_pwd: '',
        new_pwd: '',
        new_pwd2: ''
      },
      rules: {
        old_pwd: [
          { required: true, min: 6, message: '密码不少于6位', trigger: 'blur' }
        ],
        new_pwd: [
          { required: true, min: 6, message: '密码不少于6位', trigger: 'blur' }
        ],
        new_pwd2: [
          {
            validator: (rule, value, callback) => {
              let text = '输入的两次密码不相同！'
              if (value !== this.data.new_pwd) {
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
          this.postRequest('content/edit_pwd', this.data).then(res => {
            if (res) {
              let dataBox = res.data
              if (dataBox.status === 1) {
                this.Toast('密码修改成功！')
                this.$store.dispatch('setUser', {
                  access_token: ''
                })
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
