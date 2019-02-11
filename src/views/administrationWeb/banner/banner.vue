<template>
    <div class="banner">
        <headBox str="轮播图列表"
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
                    <div v-for="(item2,index2) in item.list"
                         :key="index2"
                         class="bannerBox bg">
                        <img :src="item2.pic"
                             alt="">
                        <div class="box"
                             @click="idBox(item2.id)">
                            <van-switch @change="change"
                                        v-model="item2.status2" />
                        </div>
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
import { Tab, Tabs, Card, PullRefresh, Switch } from 'vant'
export default {
  components: {
    navBox: navBox,
    headBox: headBox,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Card.name]: Card,
    [PullRefresh.name]: PullRefresh,
    [Switch.name]: Switch
  },
  data () {
    return {
      active: this.$route.query.tab,
      data: {
        page: 1,
        limit: 20,
        app_id: this.$route.query.app_id === undefined ? 5 : this.$route.query.app_id
      },
      tab: [{
        name: 'PC端',
        app_id: 5
      }, {
        name: 'MIP',
        app_id: 6
      }, {
        name: '小程序',
        app_id: 1
      }],
      Selected: [],
      isLoading: false,
      id: 0
    }
  },
  created () {
    this.getList()
  },
  methods: {
    // 获取列表
    getList (objNum) {
      console.log(this.data, 333)
      this.getRequest('content/banner', this.data).then(res => {
        if (res) {
          let data = res.data
          let box = data.data.data
          if (data.status === 1) {
            let num = this.active
            let dataBox = this.tab[num]
            box.forEach(item => {
              this.$set(item, 'status2', item.status === 1)
            })
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
    tabClick (item) {
      let id = this.tab[item].app_id
      this.$router.push(`/banner?tab=${item}&app_id=${id}`)
      this.data.app_id = id
      let strObj = []
      strObj = this.Selected.find(function (value, index, arr) {
        return id === value
      })
      if (strObj === undefined) {
        this.getList()
      }
      this.Selected.push(id)
    },
    onRefresh () {
      this.data.page++
      this.getList(1)
    },
    change (checked) {
      setTimeout(item => {
        let id = this.id
        let status = 0
        if (checked) {
          status = 1
        } else {
          status = 0
        }
        this.postRequest('content/banneredit', { id: id, status: status }).then(res => {
          if (res) {
            console.log(res)
          }
        })
      }, 100)
    },
    idBox (id) {
      this.id = id
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="stylus">
.tabsBox .van-tabs__content
    margin-top 10px
    .bannerBox
        padding-bottom 5px
        img
            width 100%
        .box
            text-align right
            padding 5px
</style>
