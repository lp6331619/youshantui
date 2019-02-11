<template>
    <div class="help">
        <headBox str="图集管理"
                 url="/administrationWeb"
                 :logo="false"></headBox>
        <van-pull-refresh v-model="isLoading"
                          class="photoList"
                          @refresh="onRefresh">
            <van-row gutter="20">
                <van-col span="12"
                         class="item"
                         v-for="(item,index) in list"
                         :key="index">
                    <div @click="$router.push(`/photoDetail?album_id=${item.id}&title=${item.title}`)">
                        <img :src="item.cover"
                             :alt="item.title">
                        <div class="title">{{item.title}}</div>
                    </div>
                </van-col>
            </van-row>

        </van-pull-refresh>
        <!-- <div class="null">暂无数据</div> -->
        <!-- //底部 -->
        <navBox :index="1"></navBox>
    </div>
</template>
<script>
import navBox from '../../../components/nav/nav.vue'
import headBox from '../../../components/head/head.vue'
import { PullRefresh } from 'vant'
export default {
  components: {
    navBox: navBox,
    headBox: headBox,
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
      list: [],
      Selected: [],
      isLoading: false
    }
  },
  created () {
    this.getList()
  },
  methods: {
    // 获取列表
    getList (objNum) {
      this.getRequest('content/album', this.data).then(res => {
        if (res) {
          let data = res.data
          let box = data.data.data
          if (data.status === 1) {
            if (box.length > 0) {
              //   this.$toast('获取数据成功！')
            } else {
              this.data.page--
              this.$toast('没有更多啦！')
            }
            this.isLoading = false
            this.list.unshift(...box)
          }
        }
      })
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
.photoList
    padding 0 10px
    .item
        margin-top 5px
        padding 5px !important
        box-sizing border-box
        div
            background #fff
            padding 5px !important
        img
            display block
            width 100%
            height 130px
            object-fit contain
            background #f9f9f9
        .title
            padding-top 5px
            text-align center
            overflow hidden
            text-overflow ellipsis
            white-space nowrap
</style>
