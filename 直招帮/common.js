// job列表处理tag标签
function chulitag(data) {
  var tagarr = [];
  var arr = [];
  var tagclass;
  for (var i = 0; i < data.length; i++) {
    tagarr.push([])
    for (var j = 0; j < data[i].tag.length; j++) {
      switch (data[i].tag[j]) {
        case '年终奖':
          tagclass = 'tag1';
          break;
        case '工作餐':
          tagclass = 'tag2';
          break;
        case '五险一金':
          tagclass = 'tag3';
          break;
        case '长白班':
          tagclass = 'tag4';
          break;
        case '两班倒':
          tagclass = 'tag5';
          break;
        case '双休':
          tagclass = 'tag6';
          break;
        case '工作轻松':
          tagclass = 'tag3';
          break;
        case '单休':
          tagclass = 'tag4';
          break;
        case '恒温车间':
          tagclass = 'tag5';
          break;
        case '坐着上班':
          tagclass = 'tag6';
          break;
        default:
          tagclass = 'tag7';
          break;
      }
      tagarr[i].push({ tagcn: data[i].tag[j], classtag: tagclass })
    }

  }
  return tagarr
}

// job接口的基本信息只是一大段字符串需要前端自己解析一下基本信息等相关数据
function Resoveto(data) {
  var arry = [];
  var ay = new Array();
  var to = new Array();
  ay = data.split('【')
  for (var i = 0; i < ay.length; i++) {
    to = ay[i].split('】');

    var st = String(to[1]);
    ///\d、/
    var stin = st.replace(/\d、/g, '|');
    var stin1 = stin.replace(/\&nbsp/g, '');
    var xiangqing = stin1.split('|');

    if (xiangqing.length > 1) {
      var au = [];
      for (var x = 1; x < xiangqing.length; x++) {
        au.push(xiangqing[x]);
      }
      //console.log(au);
      var ob = {
        title: to[0],
        text: au,
        isbul: 1
      };
    } else {
      var ob = {
        title: to[0],
        text: to[1],
        isbul: 2
      };
    }

    arry.push(ob);
  }

  arry.shift(0)
  if (arry.length) {
    return {
      key: 1,
      value: arry
    };
  } else {
    return {
      key: 2,
      value: data
    };
  }
}

module.exports = {
  chulitag: chulitag,
  Resoveto:Resoveto
}