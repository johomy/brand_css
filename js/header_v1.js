/*(function(w,d,t,r,u){var f,n,i;w[u]=w[u]||[],f=function(){var o={ti:"5424733"};o.q=w[u],w[u]=new UET(o),w[u].push("pageLoad")},n=d.createElement(t),n.src=r,n.async=1,n.onload=n.onreadystatechange=function(){var s=this.readyState;s&&s!=="loaded"&&s!=="complete"||(f(),n.onload=n.onreadystatechange=null)},i=d.getElementsByTagName(t)[0],i.parentNode.insertBefore(n,i)})(window,document,"script","//bat.bing.com/bat.js","uetq");
*/
/*(function(w,d,t,r,u){w[u]=w[u]||[];w[u].push({'projectId':'10000','properties':{'pixelId':'401666'}});var s=d.createElement(t);s.src=r;s.async=true;s.onload=s.onreadystatechange=function(){var y,rs=this.readyState,c=w[u];if(rs&&rs!="complete"&&rs!="loaded"){return}try{y=YAHOO.ywa.I13N.fireBeacon;w[u]=[];w[u].push=function(p){y([p])};y(c)}catch(e){}};var scr=d.getElementsByTagName(t)[0],par=scr.parentNode;par.insertBefore(s,scr)})(window,document,"script","https://s.yimg.com/wi/ytc.js","dotq");
*/
$(function() {
  fbq("init",FbBPixelId);
  if ($.trim(FbBPixelIdSet1) != ""){
    fbq("addPixelId",FbBPixelIdSet1);
  }
  fbq("track","PageView");
  ga("create",google_analyze_id,"auto");
  ga('require','displayfeatures');
  ga("send", "pageview");
//gotop icon隱藏
  $(".gotop_icon").hide()
//如果滾動window視窗大於1就顯示,否則就隱藏
  $(window).scroll(function(){
    if($(this).scrollTop()>1){
      $(".gotop_icon").fadeIn();
    } else {
      $(".gotop_icon").fadeOut();
    }
  });
//點擊gotop icon的a就置頂
  $(".gotop_icon a").click(function(){
    $("html,body").animate({scrollTop:0},400);
    return false;  
  });
//Header漢堡排
  $( ".hamburger_type_item" ).accordion({ 
    collapsible: true,
    active : false,
    heightStyle : "content",
    navigation: true 
  });
//點擊hamburger_icon選單(Header)
  $(".hamburger_icon").click(function() {  
    $(".search_wrap").hide(); //搜尋關鍵字隱藏
    $(".content_left").toggle("slide",300); //Menu內容
    $(".content_right").toggle("slide",300); //內容
  });
//搜尋關鍵字隱藏
  $(".search_wrap").hide();
//點擊search_icon搜尋
  $(".search_icon").click(function() {
    $(".search_wrap" ).toggle("blind",300); //搜尋關鍵字滑出
    $(".content_left").hide(); //Menu內容隱藏
    $(".content_right").show(); //內容顯示
  }); 
//點擊Menu_icon(Footer) 
  $(".menu_icon").click(function(){
    $(".menu_icon a").removeClass("active"); //先清除menu_icon a Class裡的active
    $(this).children(".menu_icon a").addClass("active"); //在當前的.menu_icon a加入Class="active"的設定
  });
//點擊搜尋按鈕
  $(".search_btn").click(function(){
    var search = $.trim($("#search_value").val());
    if (search != ""){
      top.location.href = "/search/"+search;
    } else {
      alert("請輸入關鍵字！");
    }
  });

  $(".buy_buy").click(function() {
    $(".search_wrap").hide();
    $(".hamburger_list_wrap").hide();
    var prod_id = $(this).attr("id");
    if (prod_id > 0){
      top.location.href = "/models/"+prod_id;
    }
  });
});
