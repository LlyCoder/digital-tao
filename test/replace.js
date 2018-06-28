const str = `<p><span style="color: rgb(194, 79, 74);">fssa</span><span style="color: rgb(0, 0, 0);">就<span style="background-color: rgb(0, 0, 0);">，jjjz</span></span></p>;`
const newStr = str.replace(/\"/g, "'");
console.log(newStr);
//先转成模板字符串，再进行替换。


      window.onload=function () {

            var da=document.getElementById('div1');
            var db=da.getElementsByTagName('div');
            var dc=da.getElementsByTagName('input');
            for ( var i=0;i<=dc.length;i++)
            {

                dc[i].onclick=function ()
                {
                    /*for(var a=0;a<dc.length;a++)
                    {
                        dc[a].className='none';

                    }*/
                    //alert(this.value);
                    this.className='active';

                }
            }
        }

// window.onload = () => {
//     var aLi = document.getElementsByTagName("a");
//     for (var i = 0; i < aLi.length; i++) {
//         var a =  (k) => {
//             aLi[k].onclick =  () => {
//                 alert(k);
//             }
//         }a(i);
//     }
// }    