<template>

	<div class="my-singer" >
		<div>
	       	<yd-button @click.native="hahah" type="primary">primary</yd-button>
	        <yd-button  @click.native="hahah1" size="large" type="danger">danger</yd-button>
	        <yd-button  @click.native="hahah2" size="large" type="warning">warning</yd-button>
	        <yd-button  size="large" type="disabled" disabled>disabled</yd-button>
	        <yd-button @click.native="sdsd" size="large" type="hollow">hollow</yd-button>
	        <yd-button size="large" bgcolor="#000" color="#FFF">Custom Color</yd-button>
			<div  class="singerid">{{id}}</div>
			<div v-text="'getters:'+not_show"></div>
			<div>{{'State:'+show}}</div>
	    </div>
	    <keep-alive>
    		<router-view v-on:childByValue="childByValue"></router-view>
 		</keep-alive>
		
	</div>
</template>

<script>
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import {mapActions,mapMutations,mapGetters,mapState} from 'vuex';

export default {
	components: {
	    PulseLoader
	},
	data(){
		return{
			id:0,
			 color:'#fff',
      size:'13px'
		}
	},
	computed:{
		...mapState(['show']),
		...mapGetters(['not_show']),
		// ...mapGetters({
		//     notshow:'not_show'
	 //    }),
	    
	},
	methods:{
		hahah(){
			this.$router.push({
		        name: 'foodDetail',
		        params:{postid:'post',},
		        query:{getid:'get'}
		     })
		},
		hahah1(){
			this.$router.push({
		        name: 'foodDetail1',
		        query:{getid:'get1'}
		     })
		},
		hahah2(){
			this.$router.push({
		        name: 'foodDetail2',
		        query:{getid:'get2'}
		     })
		},
		childByValue: function (childValue) {
	        // childValue就是子组件传过来的值
	        this.id = childValue
	    },
	    sdsd(){
	    	this.switch_dialog()
	    },
	    ...mapActions(['switch_dialog']),
        // ...mapMutations(['switch_dialog'])
	}
}
</script>

<style lang="scss" scoped>
@import '~@/common/scss/const.scss';
	.singerid{
		font-size:$font-size-large-x;
	}
</style>