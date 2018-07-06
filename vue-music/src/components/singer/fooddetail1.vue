<template>
 	<transition name="slide">
		<div class="my-singer-detail">
			{{get+','+childValue}}
     <yd-button @click.native="sdsd" size="large" type="danger">danger</yd-button>

		</div>
	</transition>
</template>

<script>
import { lookOption } from '@/common/js/axous.js'
export default {
  data(){
        return {
          msg:'',
          get:0,
          post1:0,
          childValue: '我是子组件的数据1'
        }
  },
	created(){
    this.get=this.$route.query.getid
   
  },
  methods:{
    sdsd(){
      // console.log(this.childValue)
      this.$router.go(-1)
      this.$emit('childByValue',this.childValue)
      
    }
  }
}

</script>

<style lang="scss" scoped>
@import '~@/common/scss/const.scss';
@import '~@/common/scss/mymixin.scss';
.my-singer-detail {
	width:100%;
	height:100%;
  position: fixed;
  z-index: 100;
  top: $headerheight;
  left: 0;
  right: 0;
  bottom: $headerheight;
  background:$color-background ;
}

.slide-enter-active, .slide-leave-active {
  transition: all .3s ease;
}
.slide-enter, .slide-leave-to {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
</style>