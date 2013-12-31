var http=require("http");  
var querystring=require("querystring");  
var url = require('url');
var fs = require('fs');
var rl = require('readline');
var pUrl="http://pt.3g.qq.com";
var args = url.parse(pUrl);
    //console.log(args);
var options = args;  
var contents=querystring.stringify({  
     loginType:2,//1：不登录 2：隐身登录 3：在线登录
    qq:504004322,//qq号
    pwd:''//q密码
});  
  
options.method="post";
options.headers={          
        "User-Agent":"Mozilla/5.0 (Linux; U; Android 3.0; en-us; Xoom Build/HRI39) AppleWebKit/534.13 (KHTML, like Gecko) Version/4.0 Safari/534.13",
         'Content-Type' : 'application/x-www-form-urlencoded',
         'Content-Length':contents.length
     };     
  console.log(options);
var req=http.request(options,function(res){
    if(res.statusCode!=200){
               onResponse(res);
               return;
          }
          var body = new Buffer(1024*10);
          var size = 0;
          res.on('data', function (chunk) {
            size+=chunk.length;
            if(size>body.length){//每次扩展10kb
                var ex = Math.ceil(size/(1024*10));
                var tmp = new Buffer(ex * 1024*10);
                body.copy(tmp);
                body = tmp;
            }
            chunk.copy(body,size - chunk.length);
          });
          res.on('end', function () {
            res.data = new Buffer(size);
            body.copy(res.data);
            res.body = res.data.toString();
            onResponse(res);
          });
//     res.setEncoding("utf8"); // 设置编码, 如果目标网址的编码是gbk/gbk2312神码的, 就别设置了, 下面就专门讲解
    console.log(res.statusCode);
    var result = "",
        resData = "",
        headers = res.headers, // 像上面所说的, 获取响应的头信息
        cookies = headers["set-cookie"]; // 获得服务器返回的cookie信息, 以后某些功能或许会需要将这些信息一起发送, 因此最好保存下来
    if(cookies){
        cookies.forEach(function(cookie) {
            result += cookie.replace(/path=\//g,'');
        }); 
    }
    if(res.statusCode == 302){
            var regex = new RegExp('sid=(.[^&]+)',"ig");
            regex.exec(res.headers.location);
            var sid = RegExp.$1;
            console.log('登录成功'+sid);//：'+sid);
  //          return;
       } 
   if(res.body.indexOf('密码错误')>=0){
            console.log('密码错误');
          //  return;
        }
        if(res.body.indexOf('验证码')>=0){
            console.log('需要输入验证码');
            var regex = new RegExp(' src="(http://vc\.gtimg\.com.[^"]*)"','ig');
            regex.exec(res.body);
            var imgurl = RegExp.$1;
            get(imgurl,null,function(res) {
                    fs.writeFile('verify.gif', res.data,0,res.data.length,0, function (err) {
                        console.log('请输入目录下图片：verify.gif 的文字：(TODO:未完成！！)');                        
                        /*var tty = rl.createInterface(process.stdin, process.stdout, null);
                        tty.question('请输入目录下图片：verify.gif 的文字：', function(answer) {
                          
                        });    */  
                    });
            });
          //  return;
        }
        console.log("登录失败\\n"+res.body);
        res.on("data",function(data){
     //   console.log(data);//：'+sid);
    });

    // 在数据发送完毕后触发
    res.on("end", function() {
        // querystring.parse功能: 就是解析...比如一个object会把它解析成object

     console.log(result);
    });
}).on('error', function(e) {
      console.log("Got error: " + e.message);
    });  
  
req.write(contents);  
req.end();  