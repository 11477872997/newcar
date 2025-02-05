 //生成并渲染出验证码图形
 function draw(show_num,name,width,height) {
  var canvas_width = width;
            var canvas_height = height;
            var canvas = document.getElementById(name); // 获取到canvas的对象
            var context = canvas.getContext("2d"); // 获取到canvas画图的环境
            canvas.width = canvas_width;
            canvas.height = canvas_height;
            var sCode = "a,b,c,d,e,f,g,h,i,j,k,m,n,p,q,r,s,t,u,v,w,x,y,z,A,B,C,E,F,G,H,J,K,L,M,N,P,Q,R,S,T,W,X,Y,Z,1,2,3,4,5,6,7,8,9,0";
            var aCode = sCode.split(",");
            var aLength = aCode.length; // 获取到数组的长度
            for (var i = 0; i < 4; i++) { // 这里的for循环可以控制验证码位数
                var j = Math.floor(Math.random() * aLength); // 获取到随机的索引值
                var deg = Math.random() - 0.5; // 产生一个随机弧度
                var txt = aCode[j]; // 得到随机的一个内容
                show_num[i] = txt.toLowerCase();
                var x = 10 + i * 22; // 增加字符间距，适应100px宽度
                var y = 15 + Math.random() * 5; // 文字在canvas上的y坐标
                context.font = "bold 16px 微软雅黑"; // 调整字体大小
                context.translate(x, y);
                context.rotate(deg);
                context.fillStyle = randomColor();
                context.fillText(txt, 0, 0);
                context.rotate(-deg);
                context.translate(-x, -y);
            }
            // 绘制验证码上的干扰线条
            for (var i = 0; i <= 3; i++) {
                context.strokeStyle = randomColor();
                context.beginPath();
                context.moveTo(Math.random() * canvas_width, Math.random() * canvas_height);
                context.lineTo(Math.random() * canvas_width, Math.random() * canvas_height);
                context.stroke();
            }
            // 绘制验证码上的小点
            for (var i = 0; i <= 15; i++) {
                context.strokeStyle = randomColor();
                context.beginPath();
                var x = Math.random() * canvas_width;
                var y = Math.random() * canvas_height;
                context.moveTo(x, y);
                context.lineTo(x + 1, y + 1);
                context.stroke();
            }
   }
   //得到随机的颜色值
   function randomColor() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + "," + g + "," + b + ")";
   }

export default draw
