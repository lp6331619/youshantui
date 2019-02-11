<template>
    <div class="login">
        <headBox str="推广优化"
                 url="/"
                 :logo="false"></headBox>
        <div class="optimization bg mt15">
            <div class="title"><i class="iconfont icon-guanjianzibiaoqian"></i> {{keyword.company}}
            </div>
            <van-row gutter="20"
                     class="topBox">
                <van-col span="8">
                    <div class="num"><strong>{{keyword.kw_count}}</strong> 个</div>
                    精准词百度<br />首页上线数
                </van-col>
                <van-col span="8">
                    <div class="num"><strong>{{keyword.pf_baidumain_num}}</strong> 个</div>
                    主词百度<br />首页上线数
                </van-col>
                <van-col span="8">
                    <div class="num"><strong>{{keyword.kw_num}}</strong> 个</div>
                    精准词全网<br />首页上线数
                </van-col>
                <van-col span="12">
                    <div class="num"><strong>{{keyword.index_day}}</strong> 天</div>
                    达标上线天数
                </van-col>
                <van-col span="12">
                    <div class="num"><strong>{{keyword.diff_day}}</strong> 天</div>
                    关键词上线时长
                </van-col>
            </van-row>
            <van-row gutter="20"
                     class="bottom">
                <van-col span="12">
                    <div class="item"
                         @click="$router.push('/seoList')">
                        <i class="iconfont icon-baobiao1"></i>
                        关键词优化报表
                    </div>
                </van-col>
                <van-col span="12">
                    <div class="item"
                         @click="$router.push('/commerceList')">
                        <i class="iconfont icon-baobiao"></i>
                        商贸推广报表
                    </div>
                </van-col>
            </van-row>
        </div>
        <navBox :index="2"></navBox>
    </div>
</template>
<script>
import { Field } from 'vant'
import headBox from '../../components/head/head'
import navBox from '../../components/nav/nav'
export default {
  components: {
    [Field.name]: Field,
    headBox: headBox,
    navBox: navBox
  },
  data () {
    return {
      keyword: {}

    }
  },
  created () {
    this.keywordBox()
  },
  methods: {
    // 关键词优化
    keywordBox () {
      let day1 = new Date()
      day1.setTime(day1.getTime() - 24 * 60 * 60 * 1000)
      let s1 = day1.getFullYear() + '-' + (day1.getMonth() + 1) + '-' + day1.getDate()
      let data = {
        uday: s1,
        page_index: 100,
        platform_id: 1,
        page: 1,
        limit: 20
      }
      this.getRequest('spread/keyword_report', data).then(res => {
        if (res) {
          let dataBox = res.data
          if (dataBox.status === 1) {
            this.keyword = dataBox
          }
        }
      })
    }
  }

}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
</style>
