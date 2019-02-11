<template>
    <div class="help">
        <headBox str="图文详情"
                 url="/article"
                 :logo="false"></headBox>
        <div class="Detail">
            <div class="title">{{data.title}}
                <p>{{data.ctime}} &nbsp;&nbsp;作者：{{data.author}}</p>
            </div>
            <img :src="data.main_img"
                 alt="">
            <div>
                {{data.summary}}
            </div>
            <div class="content"
                 v-html="data.content"></div>
            <van-button type="primary"
                        v-if="data.next"
                        block
                        @click="next()">下一个</van-button>
        </div>
        <!-- //底部 -->
        <navBox :index="1"></navBox>
    </div>
</template>
<script>
import navBox from '../../../components/nav/nav.vue'
import headBox from '../../../components/head/head.vue'
// import { Tab, Tabs, Card } from 'vant'
export default {
  components: {
    navBox: navBox,
    headBox: headBox
  },
  data () {
    return {
      id: {},
      data: {
      }
    }
  },
  created () {
    this.getData()
  },
  methods: {

    escape2Html (str) {
      var arrEntities = { 'lt': '<', 'gt': '>', 'nbsp': ' ', 'amp': '&', 'quot': '"' }
      return str.replace(/&(lt|gt|nbsp|amp|quot);/ig, function (all, t) { return arrEntities[t] })
    },
    getData () {
      this.postRequest('content/articleinfo', this.$route.query).then(res => {
        if (res) {
          let data = res.data
          if (data.status === 1) {
            this.data = data.data
            let str = this.data.content
            this.data.content = this.escape2Html(str)
          }
        }
      })
    },
    next () {
      this.$router.push(`/articleDetail?id=${this.data.next.id}`)
      this.getData()
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="stylus">
.Detail
    padding 0 15px 20px
    background #fff
    .title
        font-size 18px
        line-height 20px
        padding 15px 0 10px
        margin-bottom 20px
        border-bottom 1px solid #eee
        font-weight bold
        text-align center
        p
            font-size 14px
            margin 5px 0
            color #999
            font-weight normal
    img
        max-width 100%
    .content
        padding-bottom 20px
</style>
