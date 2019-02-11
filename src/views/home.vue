<template>
    <div class="home">
        <headBox str=""
                 :logo="true"></headBox>
        <!-- 建设中 -->
        <div v-if="config.seo_status===1">
            <div class="top bg mt15">
                <ul class="steps">
                    <li :class="[{'on':config.bind_status===-2 },{'on':config.bind_status===-3 },{'yes':config.bind_status===1}]">
                        <i class="iconfont ">www</i>
                        <p>绑定顶级域名</p>
                    </li>
                    <li :class="{'yes':config.is_beian===1}">
                        <i class="iconfont icon-beian"></i>
                        <p>网站备案</p>
                    </li>
                    <li :class="step3">
                        <i class="iconfont icon-songmenhuwangzhan"></i>
                        <p>建站检测</p>
                    </li>
                    <li :class="step4">
                        <i class="iconfont icon-xuancizhushouchazhao"></i>
                        <p>关键词检测</p>
                    </li>
                    <li :class="step5">
                        <i class="iconfont icon-yumingguanli"></i>
                        <p>检测域名解析</p>
                    </li>
                </ul>
                <van-notice-bar :scrollable="false"
                                class="notice">
                    <div v-if="config.is_jiexi===0"
                         v-html="textBox"></div>

                    <div style="text-align: left;"
                         v-if="config.is_jiexi===1"
                         v-for="(item,index) in cname.cname_info"
                         :key="index">
                        域名地址：{{item.domain}}
                        <span style="float:right">
                            <span v-if="item.is_jiexin===1">
                                <van-icon class="green"
                                          name="checked" />
                                已解析
                            </span>
                            <span v-else>
                                <van-icon name="clear" />
                                未解析
                            </span>

                        </span>
                    </div>
                </van-notice-bar>
            </div>
            <!-- 建站检测 -->
            <div class="mt15 bg errorBox"
                 v-if="config.site_status === 1 || config.site_status === 4">
                <div class="name iconfont icon-point">
                    网站检测：不合格
                </div>
                <div class="text"
                     v-if="config.site_status===4">
                    当前网站建设不符合要求，请前往电脑端查看不符合信息并及时修改，修改后重新提交网站建设信息！
                </div>
                <div class="text"
                     v-else>
                    您还未提交网站建设检测，请前往电脑端提交建站检测！
                </div>
            </div>
        </div>
        <!-- //优化中 -->
        <div v-else
             class=" optimization bg mt15">
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
                <van-col span="8">
                    <div class="num"><strong>{{keyword.index_day}}</strong> 天</div>
                    达标上线天数
                </van-col>
                <van-col span="8">
                    <div class="num"><strong>{{seo_day}}</strong> 天</div>
                    累计优化
                </van-col>
                <van-col span="8">
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
        <!-- <div class="domainlog bg mt15"
             v-if="domainlog.length>0">
            <div class="title"><i class="iconfont icon-shouxinxiangqing-caozuorizhi"></i> 建站日志</div>
            <div class="group"
                 :style="group">
                <van-cell-group>
                    <van-cell :title="item.content"
                              class="item"
                              :label="item.mtime"
                              v-for="(item,index) in domainlog"
                              :key="index">
                        <van-icon slot="right-icon"
                                  name="passed"
                                  class="green custom-icon" />
                    </van-cell>
                </van-cell-group>
            </div>
            <div class="bottom"
                 v-if="domainlog.length>4"
                 @click="more(1,true)">
                <van-icon v-if="this.groupStatus"
                          name="arrow-down" />
                <van-icon v-else
                          name="arrow-up" />
            </div>
        </div> -->
        <div class="domainlog domainlog2 bg mt15"
             v-if="op_log.length>0">
            <div class="title"><i class="iconfont icon--zixun"></i> 运营日志</div>
            <div class="group"
                 :style="group2">
                <van-cell-group>
                    <van-cell :title="item.title"
                              class="item"
                              :label="item.content"
                              v-for="(item,index) in op_log"
                              :key="index">
                        <span slot="right-icon"
                              class="time">{{item.mtime}}</span>
                    </van-cell>
                </van-cell-group>
            </div>
            <div class="bottom"
                 v-if="op_log.length>4"
                 @click="more(2,true)">
                <van-icon v-if="this.group2Status"
                          name="arrow-down" />
                <van-icon v-else
                          name="arrow-up" />
            </div>
        </div>
        <div class="domainlog domainlog3 bg mt15"
             v-if="keyword_analysis.length>0">
            <div class="title"><i class="iconfont icon-gongsi"></i> 关键词优化（{{keyword_count}}个）
                <span class="fr"
                      @click="$router.push('/seo')">更多 →</span>
            </div>
            <div class="tableBox">
                <table cellspacing="0">
                    <tr>
                        <th>关键词</th>
                        <th>首页竞争指数</th>
                        <th>年化估值</th>
                    </tr>
                    <tr v-for="(item,index) in keyword_analysis"
                        :key="index">
                        <td>{{item.word}}</td>
                        <td>{{item.index_num}}</td>
                        <td>{{item.seo_price}} 元/年</td>
                    </tr>
                </table>
            </div>
        </div>
        <navBox :index="0"></navBox>
    </div>
</template>

<script>
import navBox from '../components/nav/nav.vue'
import headBox from '../components/head/head.vue'
import { NoticeBar } from 'vant'
export default {
  components: {
    navBox: navBox,
    headBox: headBox,
    [NoticeBar.name]: NoticeBar
  },
  data () {
    return {
      group: {},
      groupStatus: true,
      group2: {},
      cname: {},
      keyword: {},
      seo_day: '',
      config: {
        bind_status: 0, // 已经绑定域名 -1 未提交 -2 已提交 -3 已审核 1
        check_all: 0, //    1就是3个都通过
        is_beian: 0, //   是否备案 '备案 1-已备案 0-未备案',
        is_jiexi: 0, //    是否解析 1  1-已解析 0-未解析
        kw_status: 1, //   关键词检测 1未提交 2待检测 3 检测成功 4检测失败 5布局失败 6布局成功',
        site_status: 1, //   建站检测 1未检测 2检测中 3检测成功 4检测失败
        seo_status: 1 // 1 建设期 2优化期 3维护期',
      }, // 配置
      group2Status: true,
      progress: {},
      domainlog: [],
      op_log: [],
      keyword_analysis: [],
      keyword_count: 0
    }
  },
  created () {
    this.getData()
  },
  computed: {
    textBox () {
      let config = this.config
      let text = ''
      if (config.bind_status === -1 || config.bind_status === 0) {
        text = '还未绑定域名，请绑定域名！'
        return text
      } else if (config.bing_status === -2) {
        text = '已经提交域名绑定，请等待通过！'
        return text
      } else if (config.is_beian === 0) {
        text = '域名还未备案！'
        return text
      } else if (config.site_status === 1) {
        text = '建站检测还未检测！'
        return text
      } else if (config.site_status === 2) {
        text = '建站检测正在检测中，请等待。'
        return text
      } else if (config.site_status === 4) {
        text = '建站检测失败，请重新检测！'
        return text
      } else if (config.kw_status === 1) {
        text = '关键词检测还未提交！'
        return text
      } else if (config.kw_status === 2) {
        text = '关键词检测已提交，请等待检测！'
        return text
      } else if (config.kw_status === 4) {
        text = '关键词检测失败，请重新提交！'
        return text
      } else if (config.is_jiexi === 0) {
        text = '域名还未解析，请等待解析！'
        return text
      }
    },
    step3 () {
      let config = this.config
      let classBox = ''
      if (config.site_status === 2 || config.site_status === 4) {
        classBox = 'on'
      } else if (config.site_status === 3) {
        classBox = 'yes'
      }
      return classBox
    },
    step4 () {
      let config = this.config
      let classBox = ''
      if (config.kw_status === 2 || config.kw_status === 3) {
        classBox = 'on'
      } else if (config.kw_status === 6) {
        classBox = 'yes'
      }
      return classBox
    },
    step5 () {
      let config = this.config
      let classBox = ''
      if (config.kw_status === 6 && config.site_status === 3 && config.is_beian === 1 && config.bind_status === 1) {
        classBox = 'on'
      } else if (config.is_jiexi === 1) {
        classBox = 'yes'
      }
      return classBox
    }
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
    // 获取页面解析
    getcname () {
      this.getRequest('users/cname', { domain: this.config.domain }).then(res => {
        if (res) {
          let dataBox = res.data
          if (dataBox.status === 1) {
            this.cname = dataBox.data
            if (this.config.seo_status !== 1) {
              this.keywordBox()
            }
          }
        }
      })
    },
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
    },
    // 获取数据
    getData () {
      this.getRequest('users/siteinfo').then(res => {
        if (res) {
          let dataBox = res.data
          if (dataBox.status === 1) {
            this.config = dataBox.data
            this.$store.dispatch('setUser', {
              access_token: this.$store.state.user.access_token,
              url: this.config.site_url
            })
            if (this.config.is_jiexi === 1) {
              this.getcname()
            }
          }
        }
      })
      this.getRequest('users/index_data').then(res => {
        if (res) {
          let dataBox = res.data
          if (dataBox.status === 1) {
            this.domainlog = dataBox.data.domainlog
            this.seo_day = dataBox.data.seo_day
            this.keyword_count = dataBox.data.keyword_count
            this.op_log = dataBox.data.op_log
            this.op_log.forEach((item) => {
              item.mtime = this.format(item.mtime)
            })
            //
            try {
              dataBox.data.keyword_analysis.forEach((item, index) => {
                if (index <= 4) {
                  this.keyword_analysis.push(item)
                } else {
                  throw new Error('打断循环')
                }
              })
            } catch (e) {
            }
          }
        }
      })
    },
    // 展开更多
    more (num, bol) {
      switch (num) {
        case 1:
          if (this.groupStatus) {
            this.$set(this.group, 'max-height', '10000px')
          } else {
            this.$set(this.group, 'max-height', '260px')
          }
          this.groupStatus = !this.groupStatus
          break
        case 2:
          if (this.group2Status) {
            this.$set(this.group2, 'max-height', '10000px')
          } else {
            this.$set(this.group2, 'max-height', '260px')
          }
          this.group2Status = !this.group2Status
          break
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" >
.errorBox
    .name
        position relative
        height 40px
        line-height 40px
        padding 0 0 0 60px
        &:before
            position absolute
            left 0
            top 0
            width 40px
            height 40px
            line-height 40px
            text-align center
            border-radius 50%
            background linear-gradient(#FD8749, #F3B36A)
            color #fff
    .text
        padding-left 60px
        font-size 12px
        color #999
.notice
    height auto !important
    padding 10px 15px !important
    .van-notice-bar__wrap
        height auto
    .van-ellipsis
        position relative
        text-align center
    .green
        color #57bd6a
.steps
    width 300px
    height 200px
    margin 0 auto
    position relative
    z-index 1
    &:after
        content ''
        position absolute
        left 50%
        top 38px
        z-index 1
        width 110px
        height 110px
        margin 0 0 0 -55px
        border 1px solid #eee
        border-radius 50%
        background #fff
    li
        line-height 42px
        color #666
        flex 1
        cursor pointer
        position absolute
        z-index 1
        left 0
        top 72px
        p
            position absolute
            left 50%
            margin 0 0 0 -45px
            width 90px
            line-height 22px
            text-align center
            font-size 12px
        &:nth-child(1)
            &:before
                content ''
                position absolute
                left 0
                top 50%
                z-index -1
                width 300%
                height 1px
                background #eee
        &:nth-child(2)
            left 50%
            top 20px
            z-index 3
            margin-left -20px
        &:nth-child(3)
            left 50%
            top 112px
            z-index 3
            margin-left -66px
        &:nth-child(4)
            left 50%
            top 112px
            z-index 3
            margin-left 23px
        &:nth-child(5)
            left auto
            right 0
            &:before
                content ''
                position absolute
                right 0
                top 50%
                z-index -1
                width 300%
                height 1px
                background #eee
        i
            display block
            width 40px
            height 40px
            line-height 40px
            text-align center
            border-radius 50%
            border 1px solid #eee
            background #fff
            font-size 14px
            &:before
                font-size 24px
        &.on
            i
                border-color #3380df
                color #3380df
        &.yes
            i
                background #3380df
                color #fff
            &:before
                background #3380df
.domainlog
    .title
        font-size 16px
        line-height 40px
        margin -10px -15px -1px
        padding 0 15px
        border-bottom 1px solid #eee
        .iconfont:before
            font-size 20px
            margin-right 5px
            background linear-gradient(to bottom, #9472F7, #B9A1F9)
            -webkit-background-clip text
            color transparent
    .item
        padding 10px
        .green
            color #57bd6a
            line-height 45px
    .group
        max-height 260px
        overflow hidden
        transition all 0.5s ease-in-out 0s
    &.domainlog2
        .title .iconfont:before
            background linear-gradient(to bottom, #64D783, #93DFC3)
            -webkit-background-clip text
            color transparent
        .time
            position absolute
            right 10px
            top 10px
    .bottom
        margin-top 10px
        line-height 45px
        text-align center
        border 1px solid #eee
    &.domainlog3
        .title
            .fr
                float right
                color #3380df
                font-size 14px
            .iconfont:before
                background linear-gradient(to bottom, #F4B54F, #F7D189)
                -webkit-background-clip text
                color transparent
</style>
