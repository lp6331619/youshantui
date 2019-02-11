<template>
    <div class="user">
        <div class="topBox">
            <div class="tit">个人中心</div>
            <div class="flex">
                <img class="headImg"
                     src="/static/images/headImg.jpg"
                     alt="">
                <div class="textBox">
                    <p class="name">{{data.user_info.username}}</p>
                    <p class="time">可用期：{{dataBox}} ~ {{data.expires_time}}</p>
                    <p>域名：{{data.domain}}</p>
                </div>
            </div>
        </div>
        <div class="Box mt15">
            <van-cell class=""
                      title="修改密码"
                      is-link
                      to="/password" />
            <van-cell title="公司信息"
                      class="mt15"
                      is-link
                      to="/company" />
        </div>
        <div class="btnBox">
            <van-button type="danger"
                        class="btn"
                        @click="goOut()"
                        block>退出登录</van-button>
        </div>
        <navBox :index="4"></navBox>
    </div>
</template>
<script>
import { Field, Dialog } from 'vant'
import navBox from '../../components/nav/nav.vue'
export default {
  components: {
    [Field.name]: Field,
    [Dialog.name]: Dialog,
    navBox: navBox
  },
  data () {
    return {
      data: {
        user_info: {}
      }
    }
  },
  computed: {
    // 计算属性的 getter
    dataBox () {
      let data = this.format(this.data.user_info.ctime)
      return data
    }
  },
  created () {
    this.getData()
  },
  methods: {
    add0 (m) { return m < 10 ? '0' + m : m },
    format (timeBox) {
      // timeBox是整数，否则要parseInt转换
      var time = new Date(timeBox * 1000)
      var y = time.getFullYear()
      var m = time.getMonth() + 1
      var d = time.getDate()
      return y + '-' + this.add0(m) + '-' + this.add0(d)
    },
    getData () {
      this.getRequest('content/account', this.data).then(res => {
        if (res) {
          let dataBox = res.data.data
          this.data = dataBox
        }
      })
    },
    goOut () {
      Dialog.confirm({
        title: '消息确认',
        message: '是否确认登出账号'
      }).then(() => {
        // on confirm
        this.getRequest('publics/login_out').then(res => {
          if (res) {
            let dataBox = res.data
            if (dataBox.status === 1) {
              this.$toast(dataBox.msg)
              this.$store.dispatch('setUser', {
                access_token: ''
              })
              this.$router.push('/login')
            }
          }
        })
      }).catch(() => {
        // on cancel
      })
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.topBox
    height 160px
    background url('/static/images/headBg.png') no-repeat 0 -10px
    background-size 100%
    color #fff
.tit
    text-align center
    font-size 18px
    padding 20px 0
.headImg
    width 60px
    height 60px
    border-radius 50%
    border 2px solid rgba(255, 255, 255, 0.5)
.flex
    display flex
    padding 0 20px
    p
        margin 3px 0
        padding-left 20px
        font-size 14px
        overflow hidden
        text-overflow ellipsis
        white-space nowrap
    .name
        font-size 16px
        font-weight bold
</style>
