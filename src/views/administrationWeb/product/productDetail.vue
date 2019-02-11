<template>
    <div class="help">
        <headBox str="产品详情"
                 url="/product"
                 :logo="false"></headBox>
        <div class="Detail">
            <img :src="data.main_img"
                 alt="">
            <div class="price">
                <p class="item tit">{{data.title}}</p>
                <div class="item"
                     v-if="data.show_price === 1">
                    <span class="titleBox">价格：</span>
                    <span class="red ">{{data.min_sales_price?data.min_sales_price:''}}{{data.max_sales_price? '-'+data.max_sales_price :''}}</span>
                    <del class="f12">
                        {{data.min_cost_price?data.min_cost_price:''}} {{data.max_cost_price?'-'+ data.max_cost_price:''}}
                    </del>
                </div>
                <div v-else
                     class="item">
                    <span class="titleBox">价格：</span>
                    <span class="red"> 面议</span>
                </div>
                <div class="item">
                    <span class="titleBox">型号：</span>
                    <span class="it "
                          v-for="(item,index) in data.models"
                          :key="index">{{data.model_name}}</span>
                </div>
                <div class="item">
                    <span class="titleBox">规格：</span>
                    <span v-for="(item,index) in data.models"
                          :key="index">
                        <span class="it"
                              v-for="(item2,index2) in item.sku"
                              :key="index2">
                            <img v-if="item2.sku_img"
                                 height="45px"
                                 :src="`${item2.sku_img}?x-oss-process=image/resize,m_fill,h_100,w_100`"
                                 :title="item2.sku_name"
                                 :alt="item2.product_alt">
                            <span v-else> {{item2.sku_name}} </span>
                        </span>
                    </span>
                </div>
            </div>
            <div>
                <div class="title">商品详情说明</div>
                {{data.summary}}
            </div>
            <div class="content"
                 v-html="data.content"></div>
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
      this.postRequest('content/productinfo', this.$route.query).then(res => {
        if (res) {
          let data = res.data
          if (data.status === 1) {
            this.data = data.data
            let str = this.data.content
            // str.replace(/\r?\n/g, '<br />')
            this.data.content = this.escape2Html(str)
            // if (typeof str ) {
            //   str.replace(/&lt;/g, '<')
            //   console.log(String(str))
            // }

            // content = content.replace(/&lt;/g, '<')
            // content = content.replace(/&lg;/g, '>')
            // console.log(this.data.content)
          }
        }
      })
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="stylus">
.Detail
    padding 20px 15px 0
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
.price
    .red
        color red
    .tit
        font-size 16px
        font-weight bold
    .it
        display inline-block
        border 1px solid #eee
        padding 0 15px
        min-height 35px
        margin-right 5px
        line-height 35px
        font-size 12px
        border-radius 3px
    .titleBox
        width 50px
        display inline-block
    .item
        border-bottom 1px solid #eee
        margin 5px 0
        padding 5px 0
        .f12
            font-size 12px
            color #999
</style>
