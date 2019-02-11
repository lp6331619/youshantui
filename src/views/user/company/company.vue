<template>
    <div class="login">
        <headBox str="公司信息"
                 url="/user"
                 :logo="false"></headBox>
        <div class="mt15">
            <van-cell-group class="forBox">
                <van-field placeholder="请输入公司名称"
                           label="公司名称"
                           clearable
                           required
                           v-model="data.name"
                           :error-message="errorMsg.name"></van-field>
                <van-field placeholder="请输入网站名称"
                           label="网站名称"
                           clearable
                           required
                           v-model="data.website_name"
                           :error-message="errorMsg.website_name"></van-field>
                <van-cell title="从事行业"
                          :value="`${data.major_cate},${data.major_cate2}`"
                          is-link
                          required
                          :label="errorMsg.major_cate"
                          @click="show=true" />
                <div class="item"
                     @click="imgBox(1)">
                    <div class="title">企业商标</div>
                    <el-upload class="avatar-uploader"
                               :headers="headers"
                               :action="`${this.base}muser/qiniu/upload`"
                               :show-file-list="false"
                               :on-success="handleAvatarSuccess"
                               :before-upload="beforeAvatarUpload">
                        <img v-if="data.trademark"
                             :src="data.trademark"
                             class="avatar">
                        <i v-else
                           class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </div>
                <div class="item"
                     @click="imgBox(2)">
                    <div class="title">手机端商标</div>
                    <el-upload class="avatar-uploader"
                               :headers="headers"
                               :action="`${this.base}muser/qiniu/upload`"
                               :show-file-list="false"
                               :on-success="handleAvatarSuccess"
                               :before-upload="beforeAvatarUpload">
                        <img v-if="data.wap_trademark"
                             :src="data.wap_trademark"
                             class="avatar">
                        <i v-else
                           class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </div>
                <div class="item"
                     @click="imgBox(3)">
                    <div class="title">手机LOGO</div>
                    <el-upload class="avatar-uploader"
                               :headers="headers"
                               :action="`${this.base}muser/qiniu/upload`"
                               :show-file-list="false"
                               :on-success="handleAvatarSuccess"
                               :before-upload="beforeAvatarUpload">
                        <img v-if="data.wap_logo"
                             :src="data.wap_logo"
                             class="avatar">
                        <i v-else
                           class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </div>
                <div class="item"
                     @click="imgBox(4)">
                    <div class="title"><i class="red">*</i>icon图标</div>
                    <el-upload class="avatar-uploader"
                               :headers="headers"
                               :action="`${this.base}muser/qiniu/upload?debug=1`"
                               :show-file-list="false"
                               :on-success="handleAvatarSuccess"
                               :before-upload="beforeAvatarUpload">
                        <img v-if="data.icon"
                             :src="data.icon"
                             class="avatar">
                        <i v-else
                           class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    <div class="van-field__error-message"> {{errorMsg.icon}}</div>
                </div>
                <div class="item"
                     @click="imgBox(5)">
                    <div class="title"><i class="red">*</i>公司主图</div>
                    <el-upload :action="`${this.base}muser/qiniu/upload`"
                               :headers="headers"
                               :file-list="fileList"
                               list-type="picture-card"
                               :limit="5"
                               :on-exceed="exceed"
                               :on-success="handleAvatarSuccess"
                               :on-remove="handleRemove">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <div class="van-field__error-message"> {{errorMsg.fileList}}</div>
                </div>
                <!--  -->
                <div class="item"
                     @click="imgBox(6)">
                    <div class="title"><i class="red">*</i>手机端主图</div>
                    <el-upload :action="`${this.base}muser/qiniu/upload`"
                               :headers="headers"
                               list-type="picture-card"
                               :file-list="fileList2"
                               :limit="5"
                               :on-exceed="exceed"
                               :on-success="handleAvatarSuccess"
                               :on-remove="handleRemove2">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <div class="van-field__error-message"> {{errorMsg.fileList2}}</div>
                </div>
                <van-field placeholder="请输入电话号码"
                           label="MIP一键拨号"
                           clearable
                           v-model="data.mip_phone"
                           :error-message="errorMsg.mip_phone"></van-field>
                <van-field placeholder="请输入联系人"
                           label="联系人"
                           clearable
                           required
                           v-model="data.contact"
                           :error-message="errorMsg.contact"></van-field>
                <van-field placeholder="请输入联系电话"
                           label="联系电话"
                           clearable
                           required
                           v-model="data.mobile"
                           :error-message="errorMsg.mobile"></van-field>
                <van-field placeholder="请输入企业邮箱"
                           label="企业邮箱"
                           clearable
                           required
                           v-model="data.email"
                           :error-message="errorMsg.email"></van-field>
                <van-field placeholder="请输入联系QQ"
                           label="联系QQ"
                           clearable
                           v-model="data.qq"
                           :error-message="errorMsg.qq"></van-field>
                <van-field placeholder="请输入传真"
                           label="传真"
                           clearable
                           v-model="data.fax"
                           :error-message="errorMsg.fax"></van-field>
                <van-cell title="公司地址"
                          :value="`${data.province}-${data.city}-${data.area}`"
                          required
                          is-link
                          :label="`${errorMsg.province}`"
                          @click="show2=true" />
                <van-field placeholder="请输入公司地址"
                           label="公司地址"
                           clearable
                           required
                           type="textarea"
                           rows="2"
                           autosize
                           v-model="data.address"
                           :error-message="errorMsg.address"></van-field>
                <div class="amap-wrapper">
                    <div class="amap-page-container">
                        <el-amap-search-box class="search-box"
                                            :on-search-result="onSearchResult"></el-amap-search-box>
                        <el-amap vid="amapDemo"
                                 :center="mapCenter"
                                 :events="events"
                                 :zoom="12"
                                 :plugin="plugin"
                                 class="amap-demo">
                            <el-amap-marker v-for="(marker,index) in markers"
                                            :key="index"
                                            :position="marker"></el-amap-marker>
                        </el-amap>
                    </div>
                </div>
                <div class="item" style="padding:25px 15px 10px 0px;border:none">
                    <div class="title">企业描述</div>
                    <div style="border:1px solid #eee; padding:10px;margin-top:10px;" v-html="data.intro2"></div>
                </div>
                <div class="boxB">
                    <div class="tit"> 图片alt信息</div>
                    <van-row>
                        <van-col span="12"
                                 v-for="(item,index) in altList"
                                 :key="index">
                            <div class="boxItem">
                                <img :src="item.photo"
                                     alt="">
                                <input type="text"
                                       placeholder="请输入图片alt信息"
                                       v-model="item.text">
                            </div>
                        </van-col>
                    </van-row>
                </div>
            </van-cell-group>
        </div>
        <!-- 行业选择 -->
        <van-popup v-model="show"
                   position="bottom">
            <van-picker show-toolbar
                        title="选择行业"
                        :columns="columns"
                        @change="onChange"
                        @cancel="onCancel"
                        @confirm="onConfirm" />
        </van-popup>
        <!-- 城市选择 -->
        <van-popup v-model="show2"
                   position="bottom">
            <van-picker show-toolbar
                        title="选择行业"
                        :columns="aeraColumns"
                        @change="onChange2"
                        @cancel="onCancel2"
                        @confirm="onConfirm2" />
        </van-popup>
        <div class="btnBox">
            <van-button block
                        type="primary"
                        @click="submit()">
                确认修改
            </van-button>
        </div>
    </div>
</template>
<script>
import { Field, Uploader, Popup, Picker, Dialog } from 'vant'
import validator from '../../../utils/validator.js'
import headBox from '../../../components/head/head.vue'
import areaBox from '../../../components/area.json'
const industry = {
  '原材料': ['包装', '纸业', '纺织皮革', '化工', '精细化学品', '橡塑', '建筑建材', '能源', '农业', '汽摩和配件', '冶金矿产', '医药保养'],
  '工业品': ['照明工业', '电子元器件', '安全防护', '电工电气', '机械和行业设备', '五金工具', '仪器仪表'],
  '服装服饰': ['服装', '服饰', '运动休闲'],
  '家居百货': ['家居家纺', '美容母婴', '家用电器', '食品饮料', '家用容器'],
  '小商品': ['办公文教', '数码电脑', '礼品工艺品饰品', '通信产品', '玩具'],
  '商务服务': ['传媒广电', '环保', '交通运输', '二手设备转让', '库存积压', '加工', '代理', '项目合作', '商务服务', '咨询策划', '酒店', '二手回收']
}
export default {
  components: {
    [Field.name]: Field,
    [Uploader.name]: Uploader,
    [Popup.name]: Popup,
    [Picker.name]: Picker,
    [Dialog.name]: Dialog,
    headBox: headBox
  },
  data () {
    return {
      show: false,
      show2: false,
      columns: [
        {
          values: Object.keys(industry),
          defaultIndex: 0
        },
        {
          values: industry['工业品'],
          defaultIndex: 0
        }
      ],
      aera: {},
      aeraColumns: [],
      province: [],
      cityList: {},
      countyList: {},
      fileList: [],
      fileList2: [],
      altList: [],
      data: {
        name: '',
        major_cate: '',
        website_name: '',
        icon: '',
        mobile: '',
        email: '',
        address: '',
        province: ''
      },
      errorMsg: {
        name: '',
        website_name: '',
        major_cate: '',
        icon: '',
        mobile: '',
        email: '',
        address: '',
        fileList: '',
        fileList2: '',
        province: ''
      },
      rules: {
        name: [
          { required: true, message: '不能为空！', trigger: 'blur' }
        ],
        major_cate: [
          { required: true, message: '不能为空！', trigger: 'blur' }
        ],
        website_name: [
          { required: true, message: '不能为空！', trigger: 'blur' }
        ],
        icon: [
          { required: true, message: '请上传icon图标！', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '不能为空！', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '不能为空！', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '不能为空！', trigger: 'blur' }
        ],
        province: [
          { required: true, message: '不能为空！', trigger: 'blur' }
        ]
      },
      num: 1, // 选择的上传图片插件
      // 地图事件
      events: {
        init: (o) => {
          o.getCity(result => {
          })
        },
        'click': (e) => {
          this.Dialog.confirm({
            title: '是否确认定位到这里！'
          }).then(() => {
            let marker = [e.lnglat.lng, e.lnglat.lat]
            this.markers = [marker]
            this.data.lng = e.lnglat.lng
            this.data.lat = e.lnglat.lat
          }).catch(() => {
            // on cancel
          })
        }
      },
      markers: [],
      mapCenter: [121.59996, 31.197646],
      plugin: [{
        pName: 'ToolBar',
        events: {
          init (instance) {
          }
        }
      }],
      base: ''
    }
  },
  created () {
    this.getData()
    this.areaFunction()
    let url = window.location.href
    if (url.indexOf('m.') === -1) {
      this.base = '/apiBox/'
    } else {
      this.base = 'http://user.youshantui.258.com/'
    }
  },
  computed: {
    headers () {
      let token = this.$store.state.user.access_token
      let head = {
        Authorization: token
      }
      return head
    }
  },
  methods: {
    // 省市格式化
    areaFunction () {
      this.area = areaBox
      for (let i in this.area) {
        this.province.push(i)
        let item = this.area[i].items
        this.$set(this.cityList, i, Object.keys(item))
        for (let c in item) {
          let item2 = item[c].items
          let child = []
          if (item2) {
            child = Object.keys(item2)
          }
          this.$set(this.countyList, c, child)
        }
      }
      this.aeraColumns = [
        {
          values: this.province,
          defaultIndex: 0
        },
        {
          values: this.cityList['北京市'],
          defaultIndex: 0
        },
        {
          values: this.countyList['北京市'],
          defaultIndex: 0
        }
      ]
    },
    // html格式化
    escape2Html (str) {
      var arrEntities = { 'lt': '<', 'gt': '>', 'nbsp': ' ', 'amp': '&', 'quot': '"' }
      return str.replace(/&(lt|gt|nbsp|amp|quot);/ig, function (all, t) { return arrEntities[t] })
    },
    /** 清除验证提示 */
    resetField (attrs) {
      attrs = !attrs ? Object.keys(this.errorMsg) : (Array.isArray(attrs) ? attrs : [attrs])
      attrs.forEach(attr => {
        this.errorMsg[attr] = ''
      })
    },
    /** 验证方法 */
    validate (callback, data) {
      this.validator.validate((errors, fields) => {
        this.resetField()
        if (errors) {
          fields.forEach(item => {
            this.errorMsg[item.field] = item.message
          })
        }
        callback && callback(errors, fields)
      }, data)
    },
    // 获取数据
    getData () {
      this.getRequest('content/company').then(res => {
        if (res) {
          let dataBox = res.data
          if (dataBox.status === 1) {
            this.data = dataBox.data
            this.$set(this.data, 'intro2', this.escape2Html(this.data.intro))
            if (this.data.lng && this.data.lat) {
              this.mapCenter = [this.data.lng, this.data.lat]
              this.markers.push(this.mapCenter)
            }
            if (this.data.company_images1 && this.data.company_images1.length > 0) {
              this.data.company_images1.forEach(item => {
                this.fileList.push({ url: item.image })
              })
            }
            if (this.data.wap_images && this.data.wap_images.length > 0) {
              this.data.wap_images.forEach(item => {
                this.fileList2.push({ url: item.image })
              })
            }
            if (this.data.company_imgalt && this.data.company_imgalt.length > 0) {
              this.data.company_imgalt.forEach(item => {
                this.altList.push({ photo: item.photo, text: item.text })
              })
            }
          }
        }
      })
    },
    // 提交
    submit () {
      this.validator = validator(this.rules, this.data)
      delete this.data.intro
      delete this.data.intro2
      delete this.data.company_imgalt
      this.validate((errors, fields) => {
        console.log(errors)
        if (!errors) {
          let filebool = true
          let filebool2 = true
          if (this.fileList && this.fileList.length > 0) {
            this.$set(this.data, 'company_images', [])
            this.fileList.forEach(item => {
              this.data.company_images.push(item.url)
            })
          } else {
            this.errorMsg.fileList = '最少上传1张主图'
            filebool = false
          }
          if (this.fileList && this.fileList2.length > 0) {
            this.data.wap_images = []
            this.fileList2.forEach(item => {
              this.data.wap_images.push(item.url)
            })
            this.data.wap_images = JSON.parse(JSON.stringify(this.data.wap_images))
          } else {
            this.errorMsg.fileList2 = '最少上传1张主图'
            filebool2 = false
          }
          if (filebool && filebool2) {
            this.data = Object.assign({}, this.data, {
              text: [],
              altimg: []
            })
            if (this.altList.length > 0) {
              this.altList.forEach(item => {
                this.data.text.push(item.text)
                this.data.altimg.push(item.photo)
              })
            }
            this.postRequest('content/company', this.data).then(res => {
              if (res) {
                let dataBox = res.data
                this.Toast(dataBox.msg)
                setTimeout(item => {
                  this.$router.push('/user')
                }, 1000)
              }
            })
          }
        }
      })
    },
    imgBox (num) {
      this.num = num
    },
    imgGsh () {
      if (this.data.trademark.length > 0) {

      }
      if (this.data.wap_trademark.length > 0) {

      }
      if (this.data.wap_logo.length > 0) {

      }
      if (this.data.icon.length > 0) {

      }
      if (this.fileList.length > 0) {

      }
      if (this.fileList2.length > 0) {

      }
    },
    // 上传图片。超过限制
    exceed (files, fileList) {
      this.$message.error('最多只能5张哦！')
    },
    replaceAlt (url, res) {
      let obj = ''
      if (url) {
        obj = this.altList.findIndex((value, index, arr) => {
          return url === value.photo
        })
        this.altList[obj].photo = res.data.file
      } else {
        this.altList.push({
          photo: res.data.file,
          text: ''
        })
      }
    },
    handleAvatarSuccess (res, file) {
      let num = this.num
      switch (num) {
        case 1:
          let trademark = this.data.trademark
          this.replaceAlt(trademark, res)
          this.data.trademark = res.data.file
          break
        case 2:
          let wapTrademark = this.data.wap_trademark
          this.replaceAlt(wapTrademark, res)
          this.data.wap_trademark = res.data.file
          break
        case 3:
          let wapLogo = this.data.wap_logo
          this.replaceAlt(wapLogo, res)
          break
        case 4:
          let icon = this.data.icon
          this.replaceAlt(icon, res)
          this.data.icon = res.data.file
          break
        case 5:
          this.fileList.push({ url: res.data.file })
          this.altList.push({ photo: res.data.file, text: '' })
          break
        case 6:
          this.fileList2.push({ url: res.data.file })
          this.altList.push({ photo: res.data.file, text: '' })
          break
      }
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isGIF = file.type === 'image/gif'
      const isLt2M = file.size / 1024 / 1024 < 2
      let bool = isJPG || isPNG || isGIF
      if (!bool) {
        this.$message.error('上传头像图片只能是 jpg, gif, png, jpeg 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return bool && isLt2M
    },
    // 删除
    handleRemove (file, fileList) {
      this.deletAlt(file)
      this.fileList = fileList
    },
    // 删除alt
    deletAlt (file) {
      let obj = ''
      obj = this.altList.findIndex((value, index, arr) => {
        return file.url === value.photo
      })
      this.altList.splice(obj, 1)
    },
    handleRemove2 (file, fileList) {
      this.deletAlt(file)
      this.fileList2 = fileList
    },
    // 行业选择
    onConfirm (value, index) {
      this.data.major_cate = value[0]
      this.data.major_cate2 = value[1]
      this.onCancel()
    },
    onCancel () {
      this.show = false
    },
    onChange (picker, values) {
      picker.setColumnValues(1, industry[values[0]])
    },
    // 城市选择
    onConfirm2 (value, index) {
      let province = value[0]
      let city = value[1]
      let area = value[2]
      this.data.province = province
      this.data.province_id = this.area[province].val
      this.data.city = city
      this.data.city_id = this.area[province].items[city].val
      if (area) {
        this.data.area = area
        this.data.area_id = this.area[province].items[city].items[area]
      } else {
        this.data.area = null
      }
      this.onCancel2()
    },
    onCancel2 () {
      this.show2 = false
    },
    onChange2 (picker, values) {
      picker.setColumnValues(1, this.cityList[values[0]])
      picker.setColumnValues(2, this.countyList[values[1]])
    },
    // 地图
    onSearchResult (pois) {
      let latSum = 0
      let lngSum = 0
      if (pois.length > 0) {
        pois.forEach(poi => {
          let { lng, lat } = poi
          lngSum += lng
          latSum += lat
          this.markers.push([poi.lng, poi.lat])
        })
        let center = {
          lng: lngSum / pois.length,
          lat: latSum / pois.length
        }
        this.mapCenter = [center.lng, center.lat]
      }
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
.forBox
    .item
        padding 10px 15px 10px 90px
        font-size 14px
        border-bottom 1px solid #eee
        position relative
        min-height 20px
        margin-left 15px
        .title
            position absolute
            left 0
            top 7px
            width 90px
            color #323233
        .imgBox
            display block
        .red
            position absolute
            left -10px
            line-height 24px
            color #ec544d
.amap-wrapper
    height 300px
    .amap-page-container
        height 100%
        position relative
        .search-box
            position absolute
            top 25px
            left 20px
            right 20px
            width auto
.boxB
    padding-bottom 20px
    .tit
        font-size 14px
        color #323233
        padding 10px 15px
.boxItem
    img
        width 100%
        height 80px
        object-fit contain
        background #f9f9f9
    input
        border 1px solid #eee
        padding 5px 10px
        border-radius 3px
        font-size 14px
        width 100%
        box-sizing border-box
    padding 5px 10px
.avatar-uploader .el-upload
    border 1px dashed #d9d9d9
    border-radius 6px
    cursor pointer
    position relative
    overflow hidden
    width 100%
    text-align center
    &:hover
        border-color #409EFF
.avatar-uploader-icon
    font-size 28px
    color #8c939d
    width 100% !important
    height 45px !important
    line-height 45px !important
.avatar
    height 60px !important
    object-fit contain
    width 100% !important
.el-upload-list--picture-card .el-upload-list__item
    width 45% !important
    height 105px !important
.el-upload-list--picture-card .el-upload-list__item-thumbnail
    object-fit contain
.el-upload--picture-card
    width 80px !important
    height 80px !important
    line-height 90px !important
</style>
