<template>
    <div class="login">
        <headBox str="推广优化"
                 url="/"
                 :logo="false"></headBox>
        <div class="optimization bg mt15">
            <div class="title"><i class="iconfont icon-baobiao1"></i>关键优化报表
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
        </div>
        <van-notice-bar :scrollable="false"
                        class="mt15">
            仅可查询近30天的历史记录，如下查询更多的内容请联系客服
        </van-notice-bar>
        <van-cell-group>
            <van-cell title="关键词名数"
                      is-link
                      @click="keyBox(1)"
                      arrow-direction="down"
                      :value="page_index" />
            <van-cell title="搜索引擎"
                      is-link
                      @click="keyBox(2)"
                      arrow-direction="down"
                      :value="platform_id" />
            <van-cell title="搜索日期"
                      is-link
                      @click="keyBox(3)"
                      arrow-direction="down"
                      :value="uday" />
        </van-cell-group>
        <div class="bg">
            <van-button type="primary"
                        @click="submit()"
                        block>立即搜索</van-button>
        </div>
        <!-- 关键词名数 -->
        <van-popup v-model="show"
                   position="bottom">
            <van-picker show-toolbar
                        title="关键词名数"
                        :columns="ranking"
                        @cancel="keyBox(1)"
                        @confirm="onPage" />
        </van-popup>
        <!-- 搜索引擎 -->
        <van-popup v-model="show2"
                   position="bottom">
            <van-picker show-toolbar
                        title="搜索引擎"
                        :columns="seo"
                        @cancel="keyBox(2)"
                        @confirm="onPlatform" />
        </van-popup>
        <!-- 日期 -->
        <van-popup v-model="show3"
                   position="bottom">
            <van-datetime-picker v-model="currentDate"
                                 @cancel="keyBox(3)"
                                 @confirm="onDateSet"
                                 type="date" />
        </van-popup>
        <div class="tableBox bg mt15"
             v-if="keyword.data.length>0">
            <table cellspacing="0">
                <tr>
                    <th>关键词</th>
                    <th>搜索引擎</th>
                    <th>页码排名</th>
                </tr>
                <tr v-for="(item,index) in keyword.data"
                    :key="index">
                    <td>{{item.kw}}</td>
                    <td class="itemBox">
                        <div class="item"
                             v-for="(item2,index2) in item.infos"
                             :key='index2'>{{format(item2.platform_id)}}</div>
                    </td>
                    <td class="itemBox">
                        <div class="item"
                             v-for="(item2,index2) in item.infos"
                             :key='index2'>
                            收录 <span class="num"> {{item2.nums}}</span>条
                            <span v-if="item2.ranking_json.pos && item2.ranking_json.pos.length>0">
                                第
                                <span class="num"
                                      v-for="(pos,posIndex) in item2.ranking_json.pos"
                                      :key="posIndex"> <span v-if="posIndex!==0">、</span>{{pos}}</span>名
                            </span>
                        </div>
                    </td>
                </tr>
            </table>
            <van-pagination v-model="data.page"
                            class="pagination"
                            :total-items="keyword.count"
                            :show-page-size="3"
                            @change="pageBox"
                            force-ellipses />
        </div>
        <div v-else
             class="null bg mt15">暂无数据</div>
        <navBox :index="2"></navBox>
    </div>
</template>
<script>
import { DatetimePicker, Picker, NoticeBar, Popup, Pagination } from 'vant'
import headBox from '../../components/head/head'
import navBox from '../../components/nav/nav'
export default {
  components: {
    [DatetimePicker.name]: DatetimePicker,
    [Popup.name]: Popup,
    [Picker.name]: Picker,
    [NoticeBar.name]: NoticeBar,
    [Pagination.name]: Pagination,
    headBox: headBox,
    navBox: navBox
  },
  data () {
    return {
      keyword: {
        data: []
      },
      show: false,
      show2: false,
      show3: false,
      ranking: ['全部', '10名以内', '20名以内', '30名以内', '40名以内', '50名以内'],
      seo: ['全部', '百度pc', '搜狗', '360', '百度移动', '搜狗移动', '360移动'], // 筛选平台：1百度pc 2搜狗 6 360  7百度移动 8搜狗移动  9360移动
      page_index: '全部',
      platform_id: '全部',
      uday: '',
      currentDate: new Date(),
      data: {
        uday: this.$route.query.uday ? '' : this.$route.query.uday,
        page_index: this.$route.query.page_index ? null : this.$route.query.page_index,
        platform_id: this.$route.query.platform_id ? null : this.$route.query.platform_id,
        page: this.$route.query.page ? null : this.$route.query.page,
        limit: 20
      }
    }
  },
  created () {
    this.uday = this.timeBox(new Date())
    this.data.uday = this.timeBox(new Date())
    this.keywordBox()
  },
  methods: {
    keyBox (num) {
      switch (num) {
        case 1:
          this.show = !this.show
          break
        case 2:
          this.show2 = !this.show2
          break
        case 3:
          this.show3 = !this.show3
          break
      }
    },
    // 排位
    onPage (value, index) {
      this.page_index = value
      if (index === 0) {
        this.data.page_index = null
      } else {
        this.data.page_index = index
      }
      this.keyBox(1)
    },
    // 引擎
    onPlatform (value, index) {
      let num = 1
      switch (index) {
        case 0:
          num = null
          break
        case 1:
          num = 1
          break
        case 2:
          num = 2
          break
        case 3:
          num = 6
          break
        case 4:
          num = 7
          break
        case 5:
          num = 8
          break
        case 6:
          num = 9
          break
      }
      this.platform_id = value
      this.data.platform_id = num
      this.keyBox(2)
    },
    // 日期
    onDateSet (value) {
      let day2 = value
      day2.setTime(day2.getTime())
      let s2 = day2.getFullYear() + '-' + (day2.getMonth() + 1) + '-' + day2.getDate()
      this.uday = s2
      this.data.uday = this.uday
      this.keyBox(3)
    },
    // 数据提交
    submit () {
      let page = {}
      if (this.data.page_index) {
        page.page_index = this.data.page_index
      }
      if (this.data.platform_id) {
        page.platform_id = this.data.platform_id
      }
      if (this.data.uday) {
        page.uday = this.data.uday
      }
      page.page = 1
      this.data.page = 1
      this.$router.push({ path: '/seoList', query: page })
      this.keywordBox()
    },
    format (num) {
      let text = ''
      // 筛选平台：1百度pc 2搜狗 6 360  7百度移动 8搜狗移动  9360移动
      switch (num) {
        case 1:
          text = '百度pc'
          break
        case 2:
          text = '搜狗'
          break
        case 6:
          text = '360'
          break
        case 7:
          text = '百度移动'
          break
        case 8:
          text = '搜狗移动'
          break
        case 9:
          text = '360移动'
          break
      }
      return text
    },
    // 时间换算
    timeBox (today) {
      let day1 = today
      day1.setTime(day1.getTime() - 24 * 60 * 60 * 1000)
      let s1 = day1.getFullYear() + '-' + (day1.getMonth() + 1) + '-' + day1.getDate()
      return s1
    },
    // 关键词优化
    keywordBox () {
      let data = {
        page_index: this.data.page_index,
        platform_id: this.data.platform_id,
        limit: 20,
        page: this.data.page - 1
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
    pageBox (index) {
      this.data.page = parseInt(index)
      this.$router.push({ path: '/seolist', query: this.data })
      this.keywordBox()
    }
  }

}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.pagination
    padding 20px 0
</style>
