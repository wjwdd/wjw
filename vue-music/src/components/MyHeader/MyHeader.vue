<template>
  <div class="my-header">
    <div class="icon"></div>
    <h1 class="text" @click="back">Chicken Music</h1>

    <!-- 个人中心 -->
    <router-link to="/user" class="mine" tag="div">
      <i  class="icon-mine"></i>
    </router-link>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods:{
    back(){
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/common/scss/const.scss';
@import '~@/common/scss/mymixin.scss';

.my-header {
  width:100%;
  position: fixed;
  z-index:1000;
  background:$color-background;
  height: $headerheight;
  text-align: center;
  color: $color-theme;
  font-size: 0;
  .icon {
    display: inline-block;
    vertical-align: top;
    margin-top: 6px;
    width: 30px;
    height: 32px;
    margin-right: 9px;
    @include bg-image('logo');
    background-size: 30px 32px;
  }
  .text {
    display: inline-block;
    vertical-align: top;
    line-height: 44px;
    font-size: $font-size-large;
  }
  .mine {
    position: absolute;
    top: 0;
    right: 0;
    .icon-mine {
      display: block;
      padding: 12px;
      font-size: 20px;
      color: $color-theme;
    }
  }
}
</style>
