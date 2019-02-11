<template>
    <div class="help">
        <headBox str="帮助中心"
                 :logo="true"></headBox>
        <van-tabs v-model="active"
                  class="tabsBox "
                  @change="tabClick"
                  :offset-top="46"
                  sticky
                  animated
                  swipeable>
            <van-tab :title="item.name"
                     v-for="(item,index) in tab"
                     :key="index">
                <van-cell :title="item2.title"
                          v-for="(item2,index2) in list.data"
                          :to="`/helpDetail?id=${item2.id}`"
                          is-link
                          :key="index2" />
                <div v-if="list.data.length<=0"
                     class="null">暂无数据</div>
            </van-tab>
        </van-tabs>
        <!-- //底部 -->
        <navBox :index="3"></navBox>
    </div>
</template>
<script>
import navBox from '../../components/nav/nav.vue'
import headBox from '../../components/head/head.vue'
import { Tab, Tabs } from 'vant'
export default {
  components: {
    navBox: navBox,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    headBox: headBox
  },
  data () {
    return {
      active: 0,
      data: {
        page: 0,
        limit: 20
      },
      tab: [],
      list: {
        data: []
      }
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getList () {
      this.getRequest('users/articlelist', this.data).then(res => {
        if (res) {
          let data = res.data
          if (data.status === 1) {
            this.list = data.data
          }
        }
      })
    },
    getData () {
      this.postRequest('users/article_category').then(res => {
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
      this.data.cid = id
      this.getList()
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="stylus">
.tabsBox .van-tabs__content
    margin-top 10px
    background #fff
.tabsBox .van-card
    background #fff
</style>
