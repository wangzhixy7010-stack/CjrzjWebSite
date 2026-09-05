window.onload = function(){
    //designWidth/自己喜欢的字体大小 = 846px/100px = 8.46
    //我们采用基准fontSize是100是便于计算，设计稿上的px转化为rem只需要除以100
    document.documentElement.style.fontSize = document.documentElement.clientWidth/8.46 + 'px';
}
