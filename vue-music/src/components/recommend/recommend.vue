<template>
  <div class="my-recommend ">
    <my-scroll ref="scroll" :data="lists" class="recommend-content">
        <div>
          <div >
             <yd-slider class="jkjk" autoplay="3000">
                <yd-slider-item>
                    <a href="http://www.ydcss.com">
                        <img src="http://static.ydcss.com/uploads/ydui/1.jpg">
                    </a>
                </yd-slider-item>
                <yd-slider-item>
                    <a href="http://www.ydcss.com">
                        <img src="http://static.ydcss.com/uploads/ydui/2.jpg">
                    </a>
                </yd-slider-item>
                <yd-slider-item>
                    <a href="http://www.ydcss.com">
                        <img src="http://static.ydcss.com/uploads/ydui/3.jpg">
                    </a>
                </yd-slider-item>
            </yd-slider>
          </div>
          <div class="list" v-for="item in lists">
            {{item.name}}
          </div>
        </div>
         
      
     
    </my-scroll>
  </div>
</template>
<script>
import MySlider from '@/base/slider/slider'
import MyScroll from '@/base/MyScroll/MyScroll'

import { getRecommend, getList } from '@/api/recommend.js'
export default {
  components: {
    MySlider,
    MyScroll
  },
  data() {
    return {
      recommends: [],
      lists:[]
    }
  },
  created() {
    this._getRecommend()
  },
  methods: {
    // 获取轮播图数据
    _getRecommend() {
      for(var i=0;i<30;i++){
        this.lists.push({name:i})
      }
    },

  },
  mounted(){
    console.log(this.$refs.scroll.children)
  }
}

</script>
<style lang="scss" scoped>
@import '~@/common/scss/const.scss';
@import '~@/common/scss/mymixin.scss';

.my-recommend {
  position: fixed;
  width: 100%;
  top: 0;
  bottom: 0;
  .recommend-content {
    height: 100%;
    overflow: hidden;

    .list{
      padding:20px;
      background:$color-sub-theme;
      display:flex
    }
    .jkjk{
      width:750px;
      height:370px;
      background:#fff;
    }
  }
}

</style>
