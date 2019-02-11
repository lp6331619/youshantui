<template>
    <div class="head">
        <van-nav-bar class="header"
                     :title="active"
                     :right-text="ylText"
                     @click-left="back()"
                     @click-right="yl()"
                     fixed>
            <img v-if="logo"
                 src="http://youshantui.258.com/static/website/images/syt-logo2.png"
                 slot="left" />
            <van-icon v-else
                      name="arrow-left"
                      slot="left" />
        </van-nav-bar>
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
    str: String,
    logo: Boolean,
    url: String,
    ylBoolean: Boolean
  },
  data () {
    return {
      active: '头部',
      ylText: '预览'
    }
  },
  created () {
    this.active = this.str
    if (this.ylBoolean) {
      this.ylText = ''
    }
  },
  methods: {
    yl () {
      let url = this.$store.state.user.url
      window.open(url)
    },
    back () {
      if (this.logo) {
        this.$router.push('/')
      } else {
        this.$router.push(this.url)
      }
    }
  }

}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.head
    padding-top 46px
</style>
