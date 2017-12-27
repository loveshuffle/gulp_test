var wrap = document.getElementById('wrap');
var paras = wrap.getElementsByTagName('p');
// 方法一
for(let i in paras){
    paras[i].index = i;
    paras[i].onclick = function(){
        console.log(this.index);
    }
}
// 方法二
// for(let i in paras){
//     paras[i].onclick = function(event){
//         var evt = evt || window.event;
//         if(evt.target == paras[i]){
//             alert("index:"+i); 
//         }
//     }
// }