<template>
    <div class="nav">
        <van-tabbar v-model="active">
            <van-tabbar-item icon="home-o"
                             @click="$router.push('/')">首页</van-tabbar-item>
            <van-tabbar-item icon="cashier-o"
                             @click="$router.push('/administrationWeb')">网站管理</van-tabbar-item>
            <van-tabbar-item icon="aim"
                             @click="$router.push('/seo')">推广优化</van-tabbar-item>
            <van-tabbar-item icon="service-o"
                             @click="$router.push('/help')">帮助中心</van-tabbar-item>
            <van-tabbar-item icon="user-circle-o"
                             @click="$router.push('/user')">我的</van-tabbar-item>
        </van-tabbar>
    </div>
</template>
<script>
import { Tabbar, TabbarItem } from 'vant'

export default {
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  },
  props: {
    index: Number
  },
  data () {
    return {
      active: 0
    }
  },
  created () {
    this.active = this.index
  },
  methods: {

  }

}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.nav
    padding-bottom 46px
</style>
