import { fetch } from 'common/js/fecth.js';
import api from 'common/js/url.js'; //引用url.js


//查看用户
export function lookOption() { //lookOption是你要调用接口的名字，issuer,userId是传进来的参数
  return fetch({
    //api.Hallowmas 引用url.js里面的数据
    url: api.Hallowmas+'/index.php/Api/My/shezhi',
    method: 'post',//请求方法
    params:{
      
    }
  })
}
