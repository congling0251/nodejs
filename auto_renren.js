var http=require("http");  
var querystring=require("querystring");  
var url="/ajaxLogin/login?1=1&uniqueTimestamp=";
var nowDate = new Date;
    url = url  + nowDate.getFullYear() + nowDate.getMonth() + nowDate.getDay() + nowDate.getHours() + nowDate.getSeconds() + nowDate.getUTCMilliseconds();
  
var contents=querystring.stringify({  
    email:"504004322@qq.com",  
    icode:"",
    origURL:"http://www.renren.com/home",
    domain:"renren.com",
    key_id:1,
    captcha_type:"web_login",
    password:"6e72a3771b64ae529afc22563fdd48b633f41faf99df7da52f1037c98a932506",
    rkey:"d0cf42c2d3d337f9e5d14083f2d52cb2",
});  
  
var options={  
    host:"www.renren.com", 
    path: url,
    method:"post",  
    headers:{     
        "Content-Type":"application/x-www-form-urlencoded",  
        "Content-Length":contents.length,         
        "Accept":" */*",   
        "Origin": "http://www.renren.com",  
        "X-Requested-With": "XMLHttpRequest",
        "Accept-Encoding": "gzip,deflate,sdch",
        "Accept-Language":"zh-CN,zh;q=0.8,en;q=0.6,zh-TW;q=0.4",  
        "Cache-Control":"no-cache",  
        "Connection":"Keep-Alive", 
         "host":"www.renren.com",    
        "Referer":"http://www.renren.com/SysHome.do",         
        "User-Agent":"Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0; BOIE9;ZHCN)"  
    }  
};  
  
var req=http.request(options,function(res){      
   res.setEncoding("utf8");  
    var headers=res.headers;  
    //console.log(headers);  
    var cookies=headers["set-cookie"];  
    cookies.forEach(function(cookie){  
      //  console.log(cookie);  
    });  
    res.on("data",function(data){  
        console.log(data);  
    });  
});  
req.write(contents);  
req.end(); 