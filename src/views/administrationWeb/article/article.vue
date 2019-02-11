<template>
    <div class="help">
        <headBox str="图文列表"
                 url="/administrationWeb"
                 :logo="false"></headBox>
        <van-tabs v-model="active"
                  class="tabsBox"
                  @change="tabClick"
                  :offset-top="46"
                  sticky
                  animated
                  swipeable>
            <van-tab :title="item.name"
                     v-for="(item,index) in tab"
                     :key="index">
                <van-pull-refresh v-model="isLoading"
                                  @refresh="onRefresh">
                    <div @click="$router.push(`/articleDetail?id=${item2.id}`)"
                         v-for="(item2,index2) in item.list"
                         :key="index2">
                        <van-card class="bg card"
                                  :desc="item2.summary"
                                  :title="item2.title"
                                  :thumb="item2.main_img">
                            <div slot="num"> {{item2.ctime}}</div>
                        </van-card>
                    </div>
                </van-pull-refresh>
                <!-- <div class="null">暂无数据</div> -->
            </van-tab>
        </van-tabs>
        <!-- //底部 -->
        <navBox :index="1"></navBox>
    </div>
</template>
<script>
import navBox from '../../../components/nav/nav.vue'
import headBox from '../../../components/head/head.vue'
import { Tab, Tabs, Card, PullRefresh } from 'vant'
export default {
  components: {
    navBox: navBox,
    headBox: headBox,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Card.name]: Card,
    [PullRefresh.name]: PullRefresh
  },
  data () {
    return {
      active: this.$route.query.tab,
      data: {
        cid: this.$route.query.cid,
        page: 1,
        limit: 20
      },
      tab: [],
      list: {
        data: []
      },
      Selected: [],
      isLoading: false
    }
  },
  created () {
    this.getData()
  },
  methods: {
    // 获取列表
    getList (objNum) {
      this.getRequest('content/article', this.data).then(res => {
        if (res) {
          let data = res.data
          let box = data.data.data
          if (data.status === 1) {
            let num = this.active
            let dataBox = this.tab[num]
            if (objNum === 1) {
              if (box.length > 0) {
                this.$toast('刷新成功')
                dataBox.list.unshift(...box)
              } else {
                this.data.page--
                this.$toast('没有更多啦！')
              }
              this.isLoading = false
            } else {
              this.$set(dataBox, 'list', box)
            }
          }
        }
      })
    },
    // 获取分类
    getData () {
      this.postRequest('content/article_category').then(res => {
        if (res) {
          let data = res.data
          if (data.status === 1) {
            this.tab = data.data
            this.tab.unshift({
              name: '全部'
            })
            this.getList()
          }
        }
      })
    },
    tabClick (item) {
      let id = this.tab[item].id
      this.$router.push(`/article?tab=${item}&cid=${id}`)
      this.data.cid = id
      let strObj = []
      strObj = this.Selected.find(function (value, index, arr) {
        return id === value
      })
      if (strObj === undefined) {
        this.getList()
      }
      this.Selected.push(id)
    },
    scroll (scrollTop, item) {
      console.log(scrollTop, item)
    },
    onRefresh () {
      this.data.page++
      this.getList(1)
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="stylus">
.tabsBox .van-tabs__content
    margin-top 10px
.card
    margin-top 0 !important
    .van-card__title
        display block
        overflow hidden
        text-overflow ellipsis
        white-space nowrap
    .van-ellipsis
        max-height 54px
        line-height 18px
        white-space inherit
    .van-card__thumb
        background #fafafa
</style>
