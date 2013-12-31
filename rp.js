object.define("module/fortune", "xn/mention,dom",
function(c, a) {
    var d = c("dom");
    var b = c("xn/mention");
    a.Slide = new Class(function() {
        this.s_speed = 200;
        this.s_invDisplay = false;
        this.s_invisible = null;
        this.s_invisibleStart = 0;
        this.s_invisibleEnd = 100;
        this.s_slideTrue = true;
        this.s_cssAll = new Object();
        this.s_init_f = function(e, f) {
            e.s_obj = typeof f == "string" ? document.getElementById(f) : f;
            e.s_arrayGetName = new Array();
            for (attrubute in e.s_cssAll) {
                e.s_arrayGetName.push([attrubute])
            }
            e.s_setTween = "Quad";
            e.s_setEase = ["easeIn", "easeOut", "easeInOut"];
            e.s_Tween = {
                Quad: {
                    easeIn: function(h, g, j, i) {
                        return j * (h /= i) * h + g
                    },
                    easeOut: function(h, g, j, i) {
                        return - j * (h /= i) * (h - 2) + g
                    },
                    easeInOut: function(h, g, j, i) {
                        if ((h /= i / 2) < 1) {
                            return j / 2 * h * h + g
                        }
                        return - j / 2 * ((--h) * (h - 2) - 1) + g
                    }
                }
            };
            e.s_setFun_f();
            e.s_Move_f()
        };
        this.s_setFun_f = function(e) {
            e._fun = e.s_Tween[e.s_setTween][e.s_setEase[2]]
        };
        this.s_Move_f = function(g) {
            var f = g.s_obj.style,
            m = g.s_speed / 10,
            j = 0,
            h = 0,
            e = new Array();
            function k() {
                f.display = "block";
                if (j < m && g.s_slideTrue == true) {
                    j++;
                    for (var q = 0; q < g.s_arrayGetName.length; q++) {
                        var o = parseInt(g.s_cssAll[g.s_arrayGetName[q]]);
                        if (e[q] == null) {
                            e[q] = parseInt(f[g.s_arrayGetName[q]])
                        }
                        if (isNaN(e[q])) {
                            e[q] = (parseInt(g.s_getDefaultStyle_f(g.s_obj, g.s_arrayGetName[q]))) ? (parseInt(g.s_getDefaultStyle_f(g.s_obj, g.s_arrayGetName[q]))) : 0;
                            g.s_obj.style[g.s_arrayGetName[q]] = e[q]
                        }
                        f[g.s_arrayGetName[q]] = parseInt(Math.ceil(g._fun(j, e[q], (o - e[q]), m))) + "px"
                    }
                    if (g.s_invisible == "out" || g.s_invisible == "in") {
                        var p = 0,
                        n = 1;
                        if (g.s_invisible == "in") {
                            p = 1,
                            n = -1
                        }
                        if (navigator.appName == "Microsoft Internet Explorer") {
                            g.s_obj.style.filter = "Alpha(Opacity=" + parseInt(p * g.s_invisibleEnd + n * Math.ceil(g._fun(j, g.s_invisibleStart, g.s_invisibleEnd, m))) + ")"
                        } else {
                            g.s_obj.style.opacity = p + n * Math.ceil(g._fun(j, g.s_invisibleStart, g.s_invisibleEnd, m)) / 100
                        }
                    }
                    g.s_Move_f.t = setTimeout(k, 10)
                } else {
                    for (var q = 0; q < g.s_arrayGetName.length; q++) {
                        g.s_obj.style[g.s_arrayGetName[q]] = g.s_cssAll[g.s_arrayGetName[q]] + "px"
                    }
                    if (g.s_invisible == "out" || g.s_invisible == "in") {
                        var p = 0,
                        n = 1;
                        if (g.s_invisible == "in") {
                            p = 1,
                            n = -1
                        }
                        if (navigator.appName == "Microsoft Internet Explorer") {
                            g.s_obj.style.filter = "Alpha(Opacity=" + parseInt(p * g.s_invisibleEnd + n * g.s_invisibleEnd) + ")"
                        } else {
                            g.s_obj.style.opacity = p * g.s_invisibleEnd / 100 + n * g.s_invisibleEnd / 100
                        }
                    }
                    if (g.s_invDisplay == true) {
                        f.display = "none"
                    }
                }
            }
            function l() {
                f.display = "block";
                for (var q = 0; q < g.s_arrayGetName.length; q++) {
                    var o = parseInt(g.s_cssAll[g.s_arrayGetName[q]]);
                    g.s_obj.style[g.s_arrayGetName[q]] = o + "px"
                }
                if (g.s_invisible == "out" || g.s_invisible == "in") {
                    var p = 0,
                    n = 1;
                    if (g.s_invisible == "in") {
                        p = 1,
                        n = -1
                    }
                    if (navigator.appName == "Microsoft Internet Explorer") {
                        g.s_obj.style.filter = "Alpha(Opacity=" + parseInt(p * g.s_invisibleEnd + n * g.s_invisibleEnd) + ")"
                    } else {
                        g.s_obj.style.opacity = p * g.s_invisibleEnd / 100 + n * g.s_invisibleEnd / 100
                    }
                }
                if (g.s_invDisplay == true) {
                    f.display = "none"
                }
            }
            if ( !! window.ActiveXObject && !window.XMLHttpRequest) {
                l()
            } else {
                k()
            }
        };
        this.s_getDefaultStyle_f = function(e, g, f) {
            return g.currentStyle ? g.currentStyle[f] : document.defaultView.getComputedStyle(g, false)[f]
        }
    });
    a.fortuneItem = new Class(function() {
        this.s_init_f = function(e) {
            e.s_item = jxn("#fortune");
            e.s_packUpBtn = e.s_item.find("#packUp");
            e.s_unFoldBtn = e.s_item.find("#unFold");
            e.s_operateBtn = e.s_item.find(".side-item-header a");
            e.s_itemName = e.s_item.find(".item_name");
            e.s_itemBody = e.s_item.find(".side-item-body");
            e.s_freshScoreBtn = e.s_item.find("#myFreshBtn");
            e.s_midContent = e.s_item.find(".for_content");
            e.s_assembleBtn = jxn("#assembleBtn");
            e.s_learnBox = jxn("#fortuneLearn");
            e.i_forPopup = new a.FortunePopup();
            e.s_bindOperateClick_f();
            e.s_operateHover_f();
            e.s_init_state_f();
            e.s_getFreshTime = jxn("#interval").val();
            e.s_countFresh_f();
            e.s_changeTime_f();
            e.s_sContentHover_f();
            e.s_learnHover_f();
            e.newGuide()
        };
        this.newGuide = function(e) {
            var f = jxn("#newGuidePop").val();
            if (f == 0) {
                e.guideWin = jxn("#fortuneGuide");
                e.guideWin.show();
                new XN.net.xmlhttp({
                    url: "http://renpin.renren.com/action/poppedguide",
                    onSuccess: function(g) {}
                });
                jxn("#forGuideNext").click(function() {
                    e.guideWin.find(".firstStep").hide();
                    e.guideWin.find(".secondStep").show()
                });
                jxn("#forGuideClose").click(function() {
                    e.guideWin.find(".firstStep").hide();
                    e.guideWin.hide();
                    e.s_assembleBtn_f();
                    e.s_freshHover_f();
                    e.s_assembleHover_f();
                    e.s_contentHover_f()
                })
            } else {
                e.s_assembleBtn_f();
                e.s_freshHover_f();
                e.s_assembleHover_f();
                e.s_contentHover_f()
            }
        };
        this.s_assembleBtn_f = function(e) {
            e.s_assembleBtn.click(function(f) {
                if (!jxn(this).hasClass("inactive")) {
                    if (jxn("#forPopupBox").length == 0) {
                        e.s_createfortunePopup_f();
                        e.i_forPopup.s_init_f()
                    }
                    e.s_popBox = jxn("#forPopupBox");
                    e.s_assembleAjax_f();
                    f.stopPropagation()
                } else {
                    if (jxn("#forPopupBox").length == 0) {
                        e.s_createfortunePopup_f();
                        e.i_forPopup.s_init_f()
                    }
                    e.s_popBox = jxn("#forPopupBox");
                    if (e.s_popBox.css("display") == "none") {
                        e.s_rankAjax_f()
                    }
                }
            })
        };
        this.s_rankAjax_f = function(e) {
            new XN.net.xmlhttp({
                url: "http://renpin.renren.com/info/rankinfo",
                onSuccess: function(j) {
                    var g = XN.json.parse(j.responseText);
                    if (g.code == 0) {
                        var f = g.data;
                        for (var h = 0; h < 3; h++) {
                            if (f[h]) {
                                var k = jxn("#todayRpRank").find("li").eq(h);
                                k.css("visibility", "visible");
                                k.find(".rpRankHead").attr("href", "http://www.renren.com/" + f[h].userId + "/profile").find("img").attr("src", f[h].pic);
                                k.find(".rankName").attr("href", "http://www.renren.com/" + f[h].userId + "/profile").html(f[h].name);
                                k.find(".rankRp").html(f[h].dailyRp)
                            } else {
                                break
                            }
                        }
                        e.i_forPopup.s_assembledClick_f()
                    }
                }
            })
        };
        this.s_assembleAjax_f = function(e) {
            new XN.net.xmlhttp({
                url: "http://renpin.renren.com/action/collectrp",
                onSuccess: function(g) {
                    var f = XN.json.parse(g.responseText);
                    if (f.code == 0) {
                        var h = f.unlockInfo;
                        e.s_ifUnlock = h.id;
                        if (typeof(e.s_ifUnlock) == "undefined") {
                            e.s_ifUnlock = false
                        } else {
                            e.s_ifUnlock = true;
                            e.s_popBox.find("#unlock_new_obj").attr("src", h.fullurl);
                            jxn(".success_unlock_box").find(".IDhideValue").attr("value", h.id);
                            jxn("#rpUnlockObj").attr("src", h.picUrl);
                            jxn("#score_float").find(".unlockModule span").html('成功解锁了"' + h.name + '"')
                        }
                        e.s_popBox.find(".score_num").html(f.currRp);
                        e.s_sContentHtml = "你今日的RP值" + f.dailyRp + "，总RP值" + f.rp;
                        e.s_item.find("#bTodayRpNum").html(f.dailyRp);
                        e.s_item.find("#bTotalRpNum").html(f.rp);
                        e.i_forPopup.s_assembleBtnClick_f(e.s_ifUnlock, h.name)
                    }
                }
            })
        };
        this.s_operateHover_f = function(e) {
            e.s_item.hover(function() {
                if (jxn(this).find(".fortuneBar").css("display") == "block") {
                    e.s_operateBtn.show();
                    e.s_unFoldBtn.hide()
                }
            },
            function() {
                if (jxn(this).find(".fortuneBar").css("display") == "block") {
                    e.s_operateBtn.hide()
                }
            })
        };
        this.s_createfortunePopup_f = function(f) {
            var e = '<div class="fortune_popup" id="forPopupBox">                                                                              <div class="fortune_win_arrow"></div>                                                                              <div class="fortune_win" id="fortune_win">                                                                                    <div class="fortune_win_close" id="for_win_close"></div>                                                                                    <div class="box_mask" id="box_mask"></div>                                                                                    <div class="score_float_layer" id="score_float">                                                                                          <div class="center_box">                                                                                                <div class="text_box" id="for_scoreF_text">                                                                                                        <span>恭喜您获得了<br/><span class="score_num" id="scoreNum">8</span><span class="big">人品值</span></span>                                                                                                </div>                                                                                                <div class="verticalLine"></div>                                                                                                <div class="unlockModule">                                                                                                        <img id="rpUnlockObj"  src="http://a.xnimg.cn/n/apps/rp/res/unlockObj.png"/>                                                                                                        <div class="unlockAni"></div>                                                                                                        <span>成功解锁了每日一攒</span>                                                                                                        <a href="http://renpin.renren.com/myrp" target="_blank">全部解锁</a>                                                                                                </div>                                                                                          </div>                                                                                          <div id="rpPubSucIcon"></div>                                                                                    </div>                                                                                    <div class="popup_content_box success_unlock_box">                                                                                               <div class="unlock_obj_box">                                                                                                          <input type="hidden" class="IDhideValue"></input>                                                                                                          <img id="unlock_new_obj" src=""/>                                                                                                </div>                                                                                                <div id="rpUnlockPubBox"></div>                                                                                    </div>                                                                                    <div class="popup_content_box no_unlock_box">                                                                                                <div class="no_text_box">                                                                                                          <div class="logo_bg"></div>                                                                                                          <span class="desc">恭喜您获得了<br/><span class="score_num"></span>人品值</span>                                                                                                </div>                                                                                                <a href="http://renpin.renren.com/myrp" target="_blank" class="question"><div class="whatIcon"></div>什么是人品值？攒人品有什么用？</a>                                                                                    </div>                                                                                    <div class="for_affirm_box" id="for_affirm">                                                                                                <span>如果关闭就会失去一次再攒人品的机会，确定关闭么？</span>                                                                                                <div  class="button_box">                                                                                                       <a href="#" class="for_submit" id="for_sub_btn">确认</a>                                                                                                       <a href="#" class="for_cancel" id="for_can_btn">取消</a>                                                                                                </div>                                                                                    </div>                                                                                    <div class="popup_content_box rank_list_box">                                                                                                <div class="assembledTip">你今天攒过了，尝试每半小时刷新获取更多人品吧</div>                                                                                                <div class="todayRpRank" id="todayRpRank">                                                                                                          <h3>今日人品排名</h3><a href="http://renpin.renren.com/myrp" target="_blank" class="viewMore">查看更多</a>                                                                                                          <ul>                                                                                                                  <li id="rpRankOne"><div class="rankBox"><a class="rpRankHead" target="_blank"><img src=""/></a></div><a class="rankName" target="_blank"></a><span class="rankRp">15</span></li>                                                                                                                  <li id="rpRankTwo"><div class="rankBox"><a class="rpRankHead" target="_blank"><img src=""/></a></div><a class="rankName" target="_blank"></a><span class="rankRp">15</span></li>                                                                                                                  <li id="rpRankThree"><div class="rankBox"><a class="rpRankHead" target="_blank"><img src=""/></a></div><a class="rankName" target="_blank"></a><span class="rankRp">15</span></li>                                                                                                          <ul>                                                                                                </div>                                                                                                <div class="rpMallEntry"><span>攒了这么多RP，看看能兑换点什么吧？</span><a href="http://renpin.renren.com/mall" class="mall_button" target="_blank">RP兑换中心</a></div>                                                                                    </div>                                                                        </div></div>';
            d.id("fortune-side-item-body").appendChild(d.getDom(e));
            var g = !!window.ActiveXObject;
            var h = g && !window.XMLHttpRequest;
            if (h) {
                jxn("#success_seal").attr("src", "http://a.xnimg.cn/n/apps/rp/res/sealIE.png")
            }
        };
        this.s_init_state_f = function(e) {
            if (e.s_item.find(".smallFortuneBar").length == 0) {
                e.s_item.find(".item_name").show();
                e.s_operateBtn.hide()
            } else {
                if (e.s_item.find(".fortuneBar").length == 0) {
                    e.s_item.find(".item_name").hide();
                    e.s_operateBtn.show();
                    e.s_packUpBtn.hide()
                }
            }
        };
        this.s_countFresh_f = function(f) {
            f.s_freshIcon = f.s_freshScoreBtn.find(".icon");
            if (f.s_getFreshTime > 0 && f.s_getFreshTime <= 1800000) {
                setTimeout(function() {
                    f.s_freshScoreBtn.addClass("active")
                },
                f.s_getFreshTime)
            } else {
                if (f.s_getFreshTime == 0) {
                    if (jxn("#fortune").find(".fortuneBar").length > 0) {
                        var e = parseInt(f.s_item.find("#bTodayRpNum").text());
                        f.s_item.find("#bTodayRpNum").html(e - 1);
                        f.s_freshScoreAni_f();
                        setTimeout(function() {
                            f.s_item.find("#bTodayRpNum").html(e)
                        },
                        1500);
                        f.s_getFreshTime = 1800000
                    }
                }
            }
        };
        this.s_changeTime_f = function(e) {
            setTimeout(function() {
                e.s_getFreshTime -= 1000;
                e.s_changeTime_f()
            },
            1000)
        };
        this.s_freshScoreAni_f = function(f) {
            if (f.s_item.find(".fortuneBar").find("#freshScoreAni").length == 0) {
                var h = '<span id="freshScoreAni">+1</span>';
                f.s_item.find(".fortuneBar").find(".barRight").append(h)
            }
            var g = !!window.ActiveXObject;
            var i = g && !window.XMLHttpRequest;
            if (i) {
                d.id("freshScoreAni").filter = "alpha(opacity=1)";
                setTimeout(function() {
                    d.id("freshScoreAni").filter = "alpha(opacity=0)"
                },
                1000)
            } else {
                f.s_item.find(".fortuneBar").find("#freshScoreAni").css("top", "15px");
                var e = new a.Slide();
                e.s_speed = 1000;
                e.s_invisible = "in";
                e.s_cssAll = {
                    top: 30 + "px"
                };
                e.s_init_f("freshScoreAni")
            }
        };
        this.s_bindOperateClick_f = function(e) {
            e.s_packUpBtn.click(function() {
                if (e.i_forPopup.s_packup || e.i_forPopup.s_packup == undefined) {
                    new XN.net.xmlhttp({
                        url: "http://renpin.renren.com/action/setfold",
                        data: "fold=true",
                        onSuccess: function(g) {}
                    });
                    if (e.s_item.find(".smallFortuneBar").length == 0) {
                        var f = '<div class="smallFortuneBar">                                                                                  <a class="assBtn"></a>                                                                                  <div class="smallBarRight">                                                                                            <a href="http://renpin.renren.com/myrp" target="_blank" class="today_score">今日RP值：<span id="sTodayrpNum" class="number"></span></a>                                                                                  </div>                                                                      </div>';
                        e.s_itemBody.append(f);
                        e.s_sContentHover_f()
                    }
                    e.s_item.find("#sTodayrpNum").html(e.s_item.find("#bTodayRpNum").html());
                    e.s_item.find(".smallFortuneBar").show();
                    e.s_item.find(".fortuneBar").hide();
                    e.s_itemName.hide();
                    e.s_operateBtn.show();
                    jxn(this).hide();
                    e.s_unFoldBtn.show();
                    if (jxn("#userIfPin").attr("value") == "true") {
                        e.s_item.find(".smallFortuneBar").find(".assBtn").addClass("gray")
                    }
                } else {
                    e.i_forPopup.s_popAffirmBox_f()
                }
            });
            e.s_unFoldBtn.click(function() {
                new XN.net.xmlhttp({
                    url: "http://renpin.renren.com/action/setfold",
                    data: "fold=false",
                    onSuccess: function(k) {}
                });
                if (e.s_item.find(".fortuneBar").length == 0) {
                    var j = jxn("#sRpRankNum").attr("value");
                    var f = e.s_item.find("#totalRp").val();
                    var i = e.s_item.find("#sTodayrpNum").html();
                    var h = e.s_item.find("#refreshRp").val();
                    var g = ' <div class="fortuneBar">                                                                                              <a class="assBtn" id="assembleBtn" target="_blank"></a>                                                                                              <div class="barRight">                                                                                                        <div class="learnMoreIcon" id="rpLearnMoreIcon"></div>                                                                                                        <a href="http://renpin.renren.com/myrp" target="_blank" class="for_content">                                                                                                            <span class="totalRp">总RP：<b id="bTotalRpNum">' + f + '</b></span>                                                                                                            <span>今日RP值：<b id="bTodayRpNum">' + i + '</b></span>                                                                                                        </a>                                                                                                        <div class="myFreshBtn" id="myFreshBtn">                                                                                                            <span class="title">刷新已得</span>                                                                                                            <span class="numBox"><b class="freshNum">' + h + '</b>RP</span>                                                                                                        </div>                                                                                              </div>                                                                                              <div></div>                                                                                              <div class="assembled"></div>                                                                                   </div>';
                    e.s_itemBody.append(g);
                    e.s_freshScoreBtn = e.s_item.find("#myFreshBtn");
                    e.s_midContent = e.s_item.find(".for_content");
                    e.s_countFresh_f();
                    e.s_freshHover_f();
                    e.s_contentHover_f();
                    e.s_learnHover_f()
                }
                jxn(".smallFortuneBar").hide();
                jxn(".fortuneBar").show();
                e.s_itemName.show();
                e.s_operateBtn.show();
                e.s_freshScoreBtn = e.s_item.find(".freshScore");
                e.s_assembleBtn = jxn("#assembleBtn");
                e.s_assembleHover_f();
                e.s_assembleBtn_f();
                jxn(this).hide();
                if (jxn("#userIfPin").attr("value") == "true") {
                    e.s_assembleBtn.addClass("inactive");
                    jxn(".assembled").show()
                } else {
                    jxn(".assembled").hide()
                }
                if (e.s_item.find(".fortuneBar").find("#freshScoreAni").length == 0) {
                    e.s_freshScoreBtn = e.s_item.find(".freshScore")
                }
            })
        };
        this.s_assembleHover_f = function(e) {
            var f;
            e.s_assembleBtn.hover(function() {
                if (! (e.s_popBox && e.s_popBox.css("display") == "block")) {
                    f = jxn("#userIfPin").attr("value");
                    if (f == "true") {
                        e.s_hoverBody.html("今日已攒，点击查看更多")
                    } else {
                        e.s_hoverBody.html("点击即可随机获取人品值")
                    }
                    e.s_hoverBox.css("top", "70px");
                    e.s_hoverBody.css("marginRight", "100px");
                    e.s_hoveArrow.css("marginRight", "205px");
                    e.s_hoverBox.show()
                }
            },
            function() {
                e.s_hoverBox.hide()
            })
        };
        this.s_freshHover_f = function(e) {
            e.s_hoverBox = jxn("#forBarHover");
            e.s_hoverBody = e.s_hoverBox.find(".hoverBoxBody");
            e.s_hoveArrow = e.s_hoverBox.find(".hoverBoxArrow");
            e.s_freshScoreBtn.hover(function() {
                if (! (e.s_popBox && e.s_popBox.css("display") == "block")) {
                    e.s_hoverBox.show();
                    e.s_hoverBox.css({
                        top: "70px",
                        width: "240px"
                    });
                    e.s_hoverBody.css("marginRight", "0px");
                    e.s_hoveArrow.css("marginRight", "25px");
                    e.s_hoverBody.html(e.s_formatTime_f())
                }
            },
            function() {
                e.s_hoverBox.hide()
            })
        };
        this.s_formatTime_f = function(e) {
            var f = Math.floor(e.s_getFreshTime / 60000);
            var g = Math.floor((e.s_getFreshTime % 60000) / 1000);
            e.s_formatTime = f + "分" + g + "秒";
            if (f <= 0 && g <= 0) {
                e.s_hoverBox.css("width", "180px");
                e.s_freshHtml = "立即刷新页面即可获得1点RP"
            } else {
                e.s_hoverBox.css("width", "240px");
                e.s_freshHtml = "每半小时刷新页面可获得1点RP，距离下<br>次还有" + e.s_formatTime + "。"
            }
            return e.s_freshHtml
        };
        this.s_learnHover_f = function(e) {
            e.learnMoreIcon = jxn("#rpLearnMoreIcon");
            e.learnMoreIcon.hover(function() {
                e.s_learnBox.show()
            },
            function() {
                e.s_learnBox.hide()
            })
        };
        this.s_contentHover_f = function(e) {
            e.s_midContent.hover(function() {
                if (! (e.s_popBox && e.s_popBox.css("display") == "block")) {
                    e.s_contentHtml = "点击查看更多";
                    e.s_hoverBox.show();
                    e.s_hoverBox.css({
                        top: "70px",
                        width: "240px"
                    });
                    e.s_hoverBody.css("marginRight", "83px");
                    e.s_hoveArrow.css("marginRight", "120px");
                    e.s_hoverBody.html(e.s_contentHtml)
                }
            },
            function() {
                e.s_hoverBox.hide()
            })
        };
        this.s_sContentHover_f = function(f) {
            var g;
            if (f.s_item.find(".fortuneBar").length > 0) {
                g = jxn("#bTodayRpNum").html()
            } else {
                g = jxn("#sTodayrpNum").html()
            }
            var e = jxn("#totalRp").val();
            f.s_sContentHtml = "你今日的RP值" + g + "，总RP值" + e;
            jxn(".today_score").hover(function() {
                f.s_hoverBox.show();
                f.s_hoverBox.css({
                    top: "10px",
                    width: "240px"
                });
                f.s_hoverBody.css("marginRight", "63px");
                f.s_hoveArrow.css("marginRight", "130px");
                f.s_hoverBody.html(f.s_sContentHtml)
            },
            function() {
                f.s_hoverBox.hide()
            })
        }
    });
    a.MouseHover = new Class(function() {
        this.s_init_f = function(e, f) {
            e.s_objId = f;
            e.s_children = jxn("#" + e.s_objId).find("li");
            e.s_bindHover_f()
        };
        this.s_bindHover_f = function(e) {
            e.s_children.hover(function() {
                if (jxn(this).hasClass("lock")) {
                    nowThis = jxn(this);
                    nowThis.find(".hoverMask").attr("id", "hoverNowLi");
                    nowThis.find("p").show();
                    var f = new a.Slide();
                    f.s_slideTrue = true;
                    f.s_invisible = "out";
                    f.s_speed = 200;
                    f.s_invisibleEnd = 80;
                    f.s_init_f("hoverNowLi");
                    if (nowThis.find("#friUnlockBox input").length == 0) {
                        new XN.net.xmlhttp({
                            url: "http://renpin.renren.com/info/alsounlock",
                            data: "value=" + nowThis.find(".IDhideValue").val(),
                            onSuccess: function(h) {
                                var g = XN.json.parse(h.responseText);
                                if (g.code == 0) {
                                    var i = "<input type='hidden' />";
                                    if (g.size == 0) {
                                        i += ""
                                    } else {
                                        if (g.size == 1) {
                                            i += '<a target="_blank" href="http://www.renren.com/' + g.users[0].uid + '">' + g.users[0].name + "</a>已解锁"
                                        } else {
                                            if (g.size == 2) {
                                                i += '<a target="_blank" href="http://www.renren.com/' + g.users[0].uid + '">' + g.users[0].name + '</a><span class="onlyOne">，<a target="_blank" href="http://www.renren.com/' + g.users[1].uid + '">' + g.users[1].name + "</a></span>已解锁"
                                            } else {
                                                if (g.size >= 3) {
                                                    i += '<a target="_blank" href="http://www.renren.com/' + g.users[0].uid + '">' + g.users[0].name + '</a><span class="onlyOne">，<a target="_blank" href="http://www.renren.com/' + g.users[1].uid + '">' + g.users[1].name + '</a></span><span class="moreThanTwo">等<a class="hoverValue">' + g.size + "</a>人</span>已解锁"
                                                }
                                            }
                                        }
                                    }
                                    nowThis.find("#friUnlockBox").html(i)
                                }
                            }
                        })
                    }
                }
            },
            function() {
                if (jxn(this).hasClass("lock")) {
                    jxn(this).find("p").hide();
                    var f = new a.Slide();
                    f.s_slideTrue = true;
                    f.s_invisible = "in";
                    f.s_speed = 200;
                    f.s_init_f("hoverNowLi");
                    nowThis.find(".hoverMask").removeAttr("id")
                }
            })
        }
    });
    a.cutImg = new Class(function() {
        this.s_init_f = function(e, f, g) {
            e.s_parent = jxn("." + f);
            e.s_objLen = g;
            e.OriginImage = new Image();
            e.s_initImg_f()
        };
        this.s_initImg_f = function(e) {
            for (var f = 0; f < e.s_parent.length; f++) {
                e.s_children = e.s_parent.eq(f).find("img");
                if (e.OriginImage.src != e.s_children.attr("src")) {
                    e.OriginImage.src = e.s_children.attr("src")
                }
                if (e.s_isImgLoad()) {
                    e.s_cutImg_f()
                } else {
                    setTimeout(function() {
                        e.s_initImg_f()
                    },
                    100)
                }
            }
        };
        this.s_cutImg_f = function(f) {
            var g = f.OriginImage.width;
            var e = f.OriginImage.height;
            if (g >= e) {
                _left = -(((f.s_objLen / e) * g) - f.s_objLen) / 2;
                f.s_children.css({
                    height: f.s_objLen + "px",
                    marginLeft: _left + "px"
                })
            } else {
                f.s_children.css({
                    width: f.s_objLen + "px",
                    top: "0px"
                })
            }
        };
        this.s_isImgLoad = function(e) {
            if ( !! window.ActiveXObject) {
                if (e.OriginImage.readyState == "complete") {
                    return true
                } else {
                    return false
                }
            } else {
                if (e.OriginImage.complete == true) {
                    return true
                } else {
                    return false
                }
            }
        }
    });
    a.FortunePopup = new Class(function() {
        this.s_init_f = function(e) {
            e.s_closeAble = true;
            e.s_popupBox = jxn("#forPopupBox");
            e.s_pubLeftBtn = jxn("#unlockPub_left");
            e.s_pubRightBtn = jxn("#unlockPub_right");
            e.s_assembleBtn = jxn("#assembleBtn");
            e.s_fortuneWin = jxn("#fortune_win");
            e.s_publishType = 0;
            e.s_pub = new a.fortunePublisher();
            e.s_clickDoc_f();
            e.s_bindClose_f();
            e.s_packup = true;
            e.s_popOpen = false
        };
        this.s_publishBoxCreate_f = function(e, f) {
            var g = '<div class="rpPublishBox">                                                                            <textarea name="content" placeholder="快和你的小伙伴们分享吧" id="rpStatus"></textarea>                                                                            <input class="submit" type="submit" value=""/>                                                                            <div class="status-toolbar">                                                                                      <div class="chars-info"><span class="chars-remain">200</span></div>                                                                          </div>                                                                </div>';
            jxn("#" + f).append(g)
        };
        this.s_unlockSubmitClick_f = function(e, f) {
            jxn(".success_unlock_box").find(".submit").bind("click",
            function() {
                if (e.s_pub.s_checkLen_f() && !jxn(this).hasClass("disabled")) {
                    jxn(this).addClass("disabled");
                    var h = jxn(".success_unlock_box").find("textarea").val();
                    if (h == "" || h == "点击”炫耀一下”可获取一次攒人品机会") {
                        h = '成功解锁了"' + f + '"!'
                    }
                    var g = jxn(".success_unlock_box").find(".IDhideValue").val();
                    new XN.net.xmlhttp({
                        url: "http://renpin.renren.com/action/publish",
                        method: "post",
                        data: "content=" + h + "&unlockid=" + g + "&from=" + e.s_publishType,
                        onSuccess: function(j) {
                            var i = XN.json.parse(j.responseText);
                            if (i.code == 0) {
                                jxn("#unlock_publish").find("textarea").val("");
                                e.scoreAni(2);
                                setTimeout(function() {
                                    e.s_popupBox.hide();
                                    jxn("#rpUnlockPubBox").find(".rpPublishBox").remove();
                                    if (i.auth) {
                                        jxn("#assembleBtn").removeClass("inactive");
                                        jxn(".assembled").hide()
                                    }
                                },
                                3000);
                                e.s_packup = true
                            }
                        }
                    })
                } else {
                    jxn(".success_unlock_box").find("textarea").focus()
                }
            })
        };
        this.s_initSize_f = function(e, g, f) {
            jxn(".fortune_win").css("height", g + "px");
            jxn(".fortune_win").css("width", f + "px");
            e.s_popupBox.css("width", (f + 2) + "px")
        };
        this.s_reInit_f = function(e) {
            jxn("#fortune").find(".box_mask").hide();
            jxn(".for_affirm_box").hide();
            jxn(".popup_content_box").hide();
            e.s_popupBox.show()
        };
        this.s_assembledClick_f = function(e) {
            e.s_popOpen = true;
            e.s_reInit_f();
            if (e.s_noUnlockBox) {
                e.s_noUnlockBox.find(".logo_bg").addClass("hidden")
            }
            jxn("#unlock_new_obj").addClass("forceHidden");
            jxn("#for_affirm").addClass("forceHidden");
            jxn(".fortune_win_arrow").css("marginRight", 205 + "px");
            e.s_initSize_f(285, 400);
            e.s_rankListBox = jxn("#fortune").find(".rank_list_box");
            e.s_rankListBox.show()
        };
        this.s_assembleBtnClick_f = function(e, f, h) {
            e.s_popOpen = true;
            e.s_publishType = 1;
            e.s_reInit_f();
            jxn(".fortune_win_arrow").css("marginRight", 205 + "px");
            if (f) {
                jxn("#unlock_new_obj").removeClass("forceHidden");
                jxn("#for_affirm").removeClass("forceHidden");
                e.s_publishBoxCreate_f("rpUnlockPubBox");
                jxn("#rpUnlockPubBox").find("#rpStatus").attr("placeholder", "点击”炫耀一下”可获取一次攒人品机会");
                e.s_pub.s_init_f("rpUnlockPubBox");
                e.s_unlockSubmitClick_f(h);
                e.s_initSize_f(235, 360);
                e.s_unlockBox = jxn("#fortune").find(".success_unlock_box");
                e.s_unlockBox.show();
                e.s_closeAble = false;
                e.s_packup = false;
                jxn("#score_float").css({
                    width: "360px",
                    height: "235px"
                });
                e.scoreAni(1)
            } else {
                jxn("#userIfPin").attr("value", "true");
                e.s_initSize_f(185, 285);
                e.s_closeAble = true;
                e.s_noUnlockBox = jxn("#fortune").find(".no_unlock_box");
                jxn("#unlock_new_obj").addClass("forceHidden");
                jxn("#for_affirm").addClass("forceHidden");
                e.s_noUnlockBox.show();
                e.s_noUnlockBox.find(".logo_bg").removeClass("hidden")
            }
            if (jxn(".assembled").length == 0) {
                var g = '<div class="assembled"></div>';
                jxn(".fortuneBar").append(g)
            }
            jxn("#assembleBtn").addClass("inactive");
            jxn(".assembled").show()
        };
        this.initScoreAni = function(e, f) {
            if (f == 1) {
                jxn("#score_float").css("opacity", 1)
            } else {
                if (f == 2) {
                    jxn("#score_float").css("opacity", 0.9)
                }
            }
            jxn("#score_float").find("#scoreNum").css({
                opacity: 0,
                fontSize: "50px"
            })
        };
        this.scoreAni = function(e, f) {
            jxn("#score_float").show();
            var h = new a.Slide();
            var g = new a.Slide();
            var i;
            if (f == 1) {
                e.initScoreAni(1);
                jxn("#score_float").find(".center_box").show();
                jxn("#rpPubSucIcon").hide();
                h.s_speed = 500;
                h.s_invisible = "out";
                h.s_cssAll = {
                    fontSize: "34px",
                    width: "45px"
                };
                h.s_init_f("scoreNum");
                i = 4000;
                g.s_speed = 1000
            } else {
                if (f == 2) {
                    e.initScoreAni(2);
                    jxn("#score_float").find(".center_box").hide();
                    jxn("#rpPubSucIcon").show();
                    i = 3000;
                    g.s_speed = 10
                }
            }
            setTimeout(function() {
                g.s_invisible = "in";
                g.s_invisibleStart = 10;
                g.s_invDisplay = true;
                g.s_init_f("score_float")
            },
            i)
        };
        this.s_bindClose_f = function(e) {
            jxn("#for_win_close").click(function() {
                if (e.s_closeAble) {
                    e.s_popupBox.hide();
                    e.s_popOpen = false
                } else {
                    e.s_popAffirmBox_f()
                }
            });
            jxn("#for_affirm").find("#for_sub_btn").click(function() {
                jxn(".for_affirm_box").css({
                    height: 0,
                    top: 0
                });
                e.s_popupBox.hide();
                jxn(".for_affirm_box").hide();
                jxn("#rpUnlockPubBox").find(".rpPublishBox").remove();
                e.s_closeAble = true;
                e.s_packup = true;
                jxn("#userIfPin").attr("value", "true");
                e.s_popOpen = false
            });
            jxn("#for_affirm").find("#for_can_btn").click(function() {
                var f = new a.Slide();
                f.s_speed = 200;
                f.s_invDisplay = true;
                f.s_cssAll = {
                    height: 0,
                    top: 0
                };
                f.s_init_f("for_affirm");
                var g = new a.Slide();
                g.s_speed = 200;
                g.s_invisible = "in";
                g.s_invDisplay = true;
                g.s_invisibleStart = 50;
                g.s_init_f("box_mask")
            })
        };
        this.s_popAffirmBox_f = function(g) {
            var f = new a.Slide();
            f.s_speed = 200;
            f.s_cssAll = {
                height: 150,
                top: 40
            };
            f.s_init_f("for_affirm");
            var e = new a.Slide();
            e.s_speed = 200;
            e.s_invisible = "out";
            e.s_invisibleEnd = 50;
            e.s_init_f("box_mask");
            jxn("#fortune").find(".box_mask").show();
            jxn(".for_affirm_box").show()
        };
        this.s_clickDoc_f = function(e) {
            var f = true;
            jxn(document).click(function() {
                if (f && e.s_closeAble && e.s_popOpen) {
                    e.s_popupBox.hide();
                    e.s_popOpen = false
                }
                f = true
            });
            e.s_popupBox.click(function() {
                f = false
            })
        }
    });
    a.fortunePublisher = new Class(function() {
        this.s_init_f = function(f, e) {
            f.container = jxn("#" + e);
            f.rp_pubBtn = f.container.find(".submit");
            f.rp_input = f.container.find("textarea")[0];
            f.s_remainWords = f.container.find(".chars-remain");
            f.s_publishBox = f.container.find(".rpPublishBox");
            f.charsTotal = 200;
            f.s_enableAt_f();
            f.s_bindClick_f();
            f.s_clickDoc_f();
            f.s_rpStates = jxn("#rpStatus");
            f.s_rpStates.focus(function() {
                f.s_rpStates.css("color", "#000")
            });
            f.s_rpStates.blur(function() {
                f.s_rpStates.css("color", "#999")
            })
        };
        this.s_checkLen_f = function(e) {
            if (parseInt(e.s_remainWords.text()) < 0) {
                return false
            } else {
                return true
            }
        };
        this._showEmotion = function(e) {
            XN.loadFiles(["http://s.xnimg.cn/jspro/xn.ui.emoticons.js", "http://s.xnimg.cn/csspro/module/minieditor.css"],
            function() {
                if (!e.emotions) {
                    var f = {
                        url: "http://shell.renren.com/ubb/doingubb?t=" + Math.random(),
                        input: d.id("rpStatus"),
                        button: d.id("rpEmotionBtn"),
                        btnAlignWith: d.getElement(".unlock_obj_box")
                    };
                    e.emotions = new XN.ui.emoticons(f)
                }
                e.emotions.showEmoPop(e.__emotionsClickEvent)
            })
        };
        this._hideEmotion = function(e) {
            jxn(".m-editor").find("li").click(function() {
                e.emotions.emotionsContainer.frame.hide()
            })
        };
        this.s_enableAt_f = function(e) {
            b.Mention.init([{
                obj: e.rp_input
            }])
        };
        this.s_bindClick_f = function(e) {
            e.container.find("textarea").click(function() {
                e._startCharsCounter()
            })
        };
        this.s_clickDoc_f = function(e) {
            var f = true;
            jxn(document).click(function() {
                if (f) {
                    e._stopCharsCounter()
                }
                f = true
            });
            e.s_publishBox.click(function() {
                f = false
            })
        };
        this._startCharsCounter = function(e) {
            if (e.charsTotal < 0) {
                return
            }
            e._charsCounter = setInterval(function() {
                e._updateCharsCount()
            },
            500)
        };
        this._stopCharsCounter = function(e) {
            clearInterval(e._charsCounter)
        };
        this._updateCharsCount = function(e) {
            var f = e.getLength(e.rp_input.value);
            e.s_remainWords.text((e.charsTotal - f).toString());
            if (parseInt(e.s_remainWords.text()) < 0) {
                e.s_remainWords.css("color", "#f2532f");
                e.rp_pubBtn.addClass("disabled")
            } else {
                e.s_remainWords.css("color", "#888");
                e.rp_pubBtn.removeClass("disabled")
            }
        };
        this.getLength = function(e, g) {
            var f = g.length;
            return f
        }
    })
});