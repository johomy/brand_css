/*
	Miya紅利館JS整理
 */
//20170724新增-兌換清單用(刪除商品及顯示需填寫資訊)
// 20170731新增-商品件數計算
$(function() {
  //點擊刪除鍵 刪除商品 商品件數計算 
  $(".ProdDelete").click(function(){
    //var C = parseInt($(".pieces_wrap").length); //宣告C為當前商品的件數
    //$("#pieces").html(C);
    if(confirm("是否要將此商品移除?")){ //確認是否要刪除商品
      //$(this).parents("#ProdDelete").remove(); //按確定就刪除
      //C -= 1; //件數-1
      var sn = $(this).attr("sn");
      //$("#ProdDelete"+sn).remove();
      var data_sn = $(this).attr("data_sn");
      var deliver_method_id = $(this).attr("deliver_method_id");
      var cart_obj = {
                      "sn" : data_sn,
                      "qty" : 0,
                      "deliver_method_id" : deliver_method_id
                     };
      updToBonusCart(cart_obj,sn,0);
    } else {
      return false; //按取消就停止動作
    }
    //$("#pieces").html(C);
  });
  //勾選索取三聯式發票 顯示需填寫資訊
  $(".Show_information").hide();
  $("#get_invoice").click(function(){
    $(".Show_information").toggle(300);
  });
});
//20170727新增-數量加減點擊
//20170728新增-點擊數量後有計算功能
//20170729新增-兌換使用點數計算
$(function() {
  $(".remind_color").hide(); //網頁一出現時先隱藏警示文字
  //增加按鈕設定
  $(".addition").click(function(){ 
    $(".remind_color").hide(); //當出現警示時，隱藏警示文字
    var sn = $(this).siblings(".price").attr("sn"); //宣告sn為當前有class="price"裡sn的值
    var num = $(this).siblings(".Quantity"); //宣告當前num為當前class="Quantity"的值
    var pri = $(this).siblings(".price").attr("unit_price"); //宣告單價為當前unit_price的值
    if (parseInt(num.val()) < 10) { //如果值小於10時做+1的動作
      num.val(parseInt(num.val())+1); 
      if (bonus_checkout){
        var prod_name = $("#p_name"+sn).text();
        if (confirm("確定增加 "+prod_name+" 的兌換數量?")){
          var data_sn = $(this).attr("data_sn");
          var deliver_method_id = $(this).attr("deliver_method_id");
          var cart_obj = {
                          "sn" : data_sn,
                          "qty" : num.val(),
                          "deliver_method_id" : deliver_method_id
                         };
          updToBonusCart(cart_obj,sn,num.val());
        } else {
          num.val(parseInt(num.val())-1);
        }
      }
    } else { //否則顯示警示
      $(this).siblings(".remind_color").show();
    }
    //在id="point_?"顯示num*單價的值
    $("#point_"+sn).html(num.val()*pri);
  });
  //減少按鈕設定
  $(".cut_back").click(function(){
    $(".remind_color").hide(); //當出現警示時，隱藏警示文字
    var sn = $(this).siblings(".price").attr("sn"); //宣告sn為當前有class="price"裡sn的值
    var num = $(this).siblings(".Quantity"); //宣告當前num為當前class="Quantity"的值
    var pri = $(this).siblings(".price").attr("unit_price"); //宣告單價為當前unit_price的值
    if (parseInt(num.val()) > 1) { //如果值大於1時做-1的動作
      num.val(parseInt(num.val())-1)
      if (bonus_checkout){
        var prod_name = $("#p_name"+sn).text();
        if (confirm("確定減少 "+prod_name+" 的兌換數量?")){
          var data_sn = $(this).attr("data_sn");
          var deliver_method_id = $(this).attr("deliver_method_id");
          var cart_obj = {
                          "sn" : data_sn,
                          "qty" : num.val(),
                          "deliver_method_id" : deliver_method_id
                         };
          updToBonusCart(cart_obj,sn,num.val());
        } else {
          num.val(parseInt(num.val())+1);
        }
      }
    } else { //否則顯示警示
      //$(this).siblings(".remind_color").show();
    }
    //在id="point_?"顯示num*單價的值
    $("#point_"+sn).html(num.val()*pri);
  });
  $(".exchange_now").click(function(){
    var sn = $(this).attr("sn");
    var cart_obj = {
                    "deliver_method_id" : $(this).attr("deliver_method_id"),
                    "bonus_product_id" : $(this).attr("bonus_id"),
                    "qty" : $("#qty"+sn).val()
                   };
    if ($("#qty"+sn).val() > 0){
      addToBonusCart(cart_obj,1);
    }
  });
  $(".add_bonus_cart").click(function(){
    var sn = $(this).attr("sn");
    var cart_obj = {
                    "deliver_method_id" : $(this).attr("deliver_method_id"), 
                    "bonus_product_id" : $(this).attr("bonus_id"),
                    "qty" : $("#qty"+sn).val()
                   };
    if ($("#qty"+sn).val() > 0){
      addToBonusCart(cart_obj,0);
    }
  });
});
//兌換使用點數計算
function setTotal(msg){
  var member_point = 0;
  //var exchange_point = 0;
  //var A = 0;
  //var B = 0;
  member_point = parseInt($("#hold_points").attr("hold_points"));
  //A = parseInt($("#point_a").html());
  //B = parseInt($("#point_b").html());
  /*$(".points").each(function(){
    exchange_point += parseInt($(this).text());
  });*/
  $("#remaining_points").html("0");
  $//("#point_totals").html(exchange_point);
  if (member_point - parseInt(msg.point_fee) >= 0){
    $("#remaining_points").html(member_point - parseInt(msg.point_fee));
  }
  $("#shipping_fees").text(msg.shipping_fee);
  $("#point_totals").text(msg.point_fee);
  $("#pieces").text(msg.prod_cnt);
}
function addToBonusCart(cart_obj,checkout){
  $.ajax({
      cache: false,
      method : "POST",
      url: "/bonus_add_cart/",
      dataType : "json",
      data : cart_obj
  }).done(function(msg) {
    var ok = 0;
    if (msg.code == 1){
      ok = 1;
    } else {
      alert("系統忙碌中!請稍等幾秒後再次嘗試一次。");
    }
    if (ok == 1){
      if (checkout == 1){
        top.location.href="/bonus_checkout/"+cart_obj.deliver_method_id;
      } else {
        alert("加入清單完成!");
      }
    }
  });
}
function updToBonusCart(cart_obj,sn,qty){
  $.ajax({
    cache: false,
    method : "POST",
    url: "/bonus_upd_cart/",
    dataType : "json",
    data : cart_obj
  }).done(function(msg) {
    console.log(msg)
    setTotal(msg);
    if (qty == 0){
      $("#ProdDelete"+sn).remove();
    }
    if ($.isEmptyObject(msg)){
      alert('兌換清單已清空');
      top.location.href="/bonus_home";
    }
  });
}
