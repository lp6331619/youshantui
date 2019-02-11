<template>
    <div class="help">
        <headBox :str="$route.query.title"
                 url="/photo"
                 :logo="false"></headBox>
        <div class="Detail">
            <div class="item"
                 v-for="(item,index) in data"
                 :key="index">
                <div class="name">{{item.description}}</div>
                <img :src="item.path"
                     :alt="item.alt">
            </div>
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
      album_id: {},
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
      this.postRequest('content/album_images', this.$route.query).then(res => {
        if (res) {
          let data = res.data
          if (data.status === 1) {
            this.data = data.data
            console.log(this.data)
            // let str = this.data.content
            // this.data.content = this.escape2Html(str)
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
    padding 15px
    background #fff
    .name
        padding 10px 0
    img
        max-width 100%
</style>
