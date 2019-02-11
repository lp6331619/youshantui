<template>
    <div class="web">
        <headBox str="网站管理"
                 url="/"
                 :logo="false"></headBox>
        <van-row class="bg mt15 webBox">
            <van-col span="8">
                <div class="item"
                     @click="$router.push('/banner')">
                    <div class="iconfont icon-kaishijiankongqiehuan"></div>
                    轮播管理
                </div>
            </van-col>
            <van-col span="8">
                <div class="item"
                     @click="$router.push('/article')">
                    <div class="iconfont icon-tianchongxing-"></div>
                    图文管理
                </div>
            </van-col>
            <van-col span="8">
                <div class="item"
                     @click="$router.push('/product')">
                    <div class="iconfont icon-chanpin"></div>
                    产品管理
                </div>
            </van-col>
            <van-col span="8">
                <div class="item"
                     @click="$router.push('/photo')">
                    <div class="iconfont icon-tupian"></div>
                    图集管理
                </div>
            </van-col>
            <!-- <van-col span="8">
                <div class="item"
                     @click="$router.push('/')">
                    <div class="iconfont icon-kehu"></div>
                    客户管理
                </div>
            </van-col> -->
            <!-- <van-col span="8">
                <div class="item"
                     @click="$router.push('/')">
                    <div class="iconfont icon-xinxi"></div>
                    基础信息
                </div>
            </van-col> -->
        </van-row>
        <!-- //底部 -->
        <navBox :index="1"></navBox>
    </div>
</template>
<script>
import navBox from '../../../components/nav/nav.vue'
import headBox from '../../../components/head/head.vue'
// import { Tab, Tabs } from 'vant'
export default {
  components: {
    navBox: navBox,
    headBox: headBox
  },
  data () {
    return {

    }
  },
  created () {
  },
  methods: {

  }

}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="stylus">
.webBox
    .van-col
        .item
            text-align center
            padding 10px 0
            font-size 14px
            .iconfont
                width 60px
                height 60px
                border-radius 50%
                margin 0 auto 10px
                line-height 60px
                color #fff
                background linear-gradient(#508eef, #6bb4ee)
                &:before
                    font-size 30px
        &:nth-child(2) .iconfont
            background linear-gradient(#83d48c, #a0dcc2)
        &:nth-child(3) .iconfont
            background linear-gradient(#ebb662, #f1d192)
        &:nth-child(4) .iconfont
            background linear-gradient(#83d38c, #a3ddc3)
        &:nth-child(5) .iconfont
            background linear-gradient(#ee8c58, #eab475)
        &:nth-child(6) .iconfont
            background linear-gradient(#8e78ef, #b3a3f3)
</style>
