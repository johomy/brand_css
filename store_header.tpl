<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="zh-TW">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta http-equiv="cache-control" Content="public" />
    <meta http-equiv="Expires" Content="<{$web_expire_day}>" />
    <meta name="title" content="<{$seo["seo_title"]}>" />
    <meta name="keywords" content="<{$seo["seo_keyword"]}>" />
    <meta name="description" content="<{$seo["seo_description"]}>" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="shortcut icon" href="/favicon.ico?v=1.00" type="image/x-icon" />
    <{if $prod_id > 0}>
    <meta property="fb:app_id" content="<{$fb_app_id}>" />
    <meta property="og:url" content="<{$home_url}><{$prod_url}><{$prod_id}>" />
    <meta property="og:title" content="<{$seo["seo_title"]}>" />
    <meta property="og:description" content="<{$seo["seo_description"]}>" />
    <meta property="og:site_name" content="<{$seo["seo_title"]}>" />
    <meta property="og:image" content="<{$home_url}><{$prod_img_url}>"/>
    <meta property="og:type" content="website" />
    <{/if}>
    <title><{$page_title|strip_tags}></title>
  </head>
  <body>
    <div class="main_wrap">
      <div class="gotop_icon">
        <a href="<{$void_url}>">
          <img src="/images/gotop.png" width="40" height="40" />
        </a>
      </div>
      <{if $header_hide == 0}>
      <div class="header_wrap basic_color">   
        <div class="hamburger_icon">
          <span class="icon_bar"></span>
          <span class="icon_bar"></span>       
          <span class="icon_bar"></span>
        </div>
        <div class="header_mid">
          <a href="<{$home_url}>">
            <div class="header_logo"><{$seo["store_name"]}></div>
          </a>
        </div>
        <div class="search_icon">
          <a href="<{$void_url}>">
            <img src="/images/search.png" width="25px" height="25px"/>
            <p></p>
            <div class="clear"></div>
          </a>
        </div>
        <div class="top_home_icon">
          <a href="<{$home_url}>">
            <img src="/images/home.png" />
            <p></p>
            <div class="clear"></div>
          </a>
        </div>
        <div class="search_wrap basic_color">
          <div class="search_bar">
            <input type="text" placeholder="<{$search_holder}>" id="search_value" />
            <div class="search_btn"><{$search_text}></div>
            <div class="clear"></div>
          </div>
        </div>
        <div class="clear"></div>
        <{if $show_member_info == 1}>
          <{if !empty($member_login)}>
        <div class="block_model member_title">
          <div class="inner_box95 mg_center">
            <p class="float_L">
              <span class="title_icon">
                <img src="/images/menu_icon_member.png"/>
              </span>
              <span><{$member_account}></span>
            </p>
            <p><a class="logout_btn" href="<{$logout_url}>"><{$member_logout_text}></a></p>
            <p class="clear"></p>
          </div>
        </div>        
        <!-- 紅利館Top title -->
        <div class="top_title_wrap inner_box Top_title_bg"><!-- 與會員專區做切換 -->
          <div class="dividend_wrap">
            <span><img src="images/shipment.png" class="dividend_img"></span>
            <div class="dividend">
              <span>8888</span><!-- 目前紅利點數 四位數上限 -->
              <span>點</span>
            </div>
          </div>
          <div class=" top_title_logo"><a href="#">紅利館</a></div><!-- 連結至紅利館首頁 -->
        </div>
          <{/if}>
        <{/if}>
      </div>
      <div class="keep_top"></div>
      <{if $show_member_info == 1}>
        <{if !empty($member_login)}>
      <div class="keep_top2"></div>
      <div class="keep_top3"></div><!-- 20170801紅利館修改成height:50px; -->
        <{/if}>
      <{/if}>
      <{/if}>
      <div class="content_wrap">
        <div class="content_left">
          <div class="hamburger_list_wrap">
            <div class="hamburger_type_item">
              <{if !empty($categoryList)}>
              <{foreach from=$categoryList key=k1 item=v1}>
              <h3 class="basic_font_color"><{$v1[0]["category_name"]}></h3>
                <{if !empty($v1)}>
              <div>
                <{foreach from=$v1 key=k2 item=v2}>
                <p><a class="basic_color" href="<{$category_url}><{$v2.category_sub_id}>"><{$v2.sub_category_name}></a></p>
                <{/foreach}>
              </div>
                <{/if}>
              <{/foreach}>
              <{/if}>
            </div>
          </div>    
        </div>
