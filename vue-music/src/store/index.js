import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex);
export default new vuex.Store({//store对象
    state:{
        show:false
    },
     getters:{
        not_show(state){//这里的state对应着上面这个state
            return !state.show;
        }
    },
     mutations:{
        switch_dialog(state){//这里的state对应着上面这个state
        	// console.log('mutations')
            state.show = true;
            //你还可以在这里执行其他的操作改变state
        }, 
        switch_dialog1(state){//这里的state对应着上面这个state
            state.show = false;
            //你还可以在这里执行其他的操作改变state
        },

    },
    actions:{
        switch_dialog(context){//这里的context和我们使用的$store拥有相同的对象和方法
        	console.log('显示')
            context.commit('switch_dialog');
            //你还可以在这里触发其他的mutations方法
        },
        switch_dialog1(context){//这里的context和我们使用的$store拥有相同的对象和方法
            context.commit('switch_dialog1');
            //你还可以在这里触发其他的mutations方法
        },
    }
})