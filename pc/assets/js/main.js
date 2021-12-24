// <---{(CÔNG THỨC CHUẨN THAM SỐ TRUYỀN VÀO HÀM CHẠY SLIDE)}--->

// paramSwiperSlide={
//     nameAttr: nameAttr,
//     slidesPerView: slidesPerView,
//     spaceBetween,
//     loop,
//     speed,
//     autoSlide:{
//         delay,
//         disableOnInteraction
//     },
//     delay,
//     breakpoints: {
//         640: {
//             slidesPerView: 2,
//             spaceBetween: 15
//         },
//         768: {
//             slidesPerView: 3,
//             spaceBetween: 15
//         },
//         1024: {
//             slidesPerView: 4,
//             spaceBetween: 30
//         },
//         1366: {
//             slidesPerView,
//             spaceBetween
//         }
//     }

// }

//---------------------------------------------------------------------------------->


function formatCurrency(a) {
    var b = parseFloat(a).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1.").toString();
    var len = b.length;
    b = b.substring(0, len - 3);
    return b;
}

//click len top
function gotoTopQuety(classNameAttr){
    var $html_body = $('html, body')
    $(`${classNameAttr}`).click(()=>{
        $html_body.animate({scrollTop: 0}, 'slow');
    })
  	$(`${classNameAttr}`).fadeOut()
    $(window).scroll(function(){
        if($(this).scrollTop() > 1000){
            $(`${classNameAttr}`).fadeIn()
        }else{
            $(`${classNameAttr}`).fadeOut()
        }
    })
}

//hiệu ứng thanh header
function handScrollHeaderMenu($header){
    
    var lastScrollTop = 0;
    $(window).scroll(function() {

        var y = $(this).scrollTop();
        var currentScrollTop = y + 1;

        if(y > 0){
            $($header).addClass('js-scroll-header');
        }else{
            $($header).removeClass('js-scroll-header');
        }

        if (currentScrollTop < lastScrollTop) {
            $($header).addClass('js-show-menu');
            $($header).removeClass('js-hidden-menu');
        }else {
            $($header).removeClass('js-show-menu');
            $($header).addClass('js-hidden-menu');
        }
        if(y <= 0){
            $($header).addClass('js-show-menu');
            $($header).removeClass('js-hidden-menu');
        }
        lastScrollTop = currentScrollTop;
    });
}

//hàm xử lý ẩn hiện nội dung của block
function toggleContent({block_content, action, height_block_content, xem_them, dong_lai}){
    var heightBlock = $(block_content).height()
    console.log(heightBlock)
    if(heightBlock > height_block_content){
        $(block_content).addClass('js-hidden-content')
        $(action).html(xem_them)
        $(action).click(function(){
            $(block_content).toggleClass('js-hidden-content')
            if($(this).html() == xem_them){
                $(this).html(dong_lai)
            }else{
                $(this).html(xem_them)
            }
        })
    }else{
        $(action).css({'display': 'none'})
    }
}

//scroll theo điểm chỉ định
function scrollPoit(attrNameFirst){
    $(attrNameFirst).click(function(){
        var attrNameLast =  $(this).attr('data-poit-first');
        var offsetTopAttrLass = $(`[data-poit-last=${attrNameLast}]`).offset().top - 50;
        $('html, body').animate({scrollTop: offsetTopAttrLass}, 'slow');
    })
}

//chạy slide kép
function galleryImageProductDouble({
    classNameThumb,
    classNameZomm, 
    slidesPerViewThumb, 
    spaceBetweenThumb,  
    spaceBetweenZoom
}){
    const galleryThumbs = new Swiper(`${classNameThumb} .swiper-container`, {
        
        slidesPerView: slidesPerViewThumb,
        spaceBetween: spaceBetweenThumb,
        freeMode: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        
    });
    const galleryZoom = new Swiper(`${classNameZomm} .swiper-container`, {
        spaceBetween: spaceBetweenZoom,
        thumbs: {
            swiper: galleryThumbs
        }
    });
}

//slide banner
function runMultipleSwiperBanner(nameAttr, slidesPerView, spaceBetween){
    
    new Swiper(`${nameAttr} .swiper-container`, {
        slidesPerView,
        spaceBetween,
        navigation: {
            nextEl: `${nameAttr} .swiper-button-next`,
            prevEl: `${nameAttr} .swiper-button-prev`,
        },
        pagination: {
            el: `${nameAttr} .swiper-pagination`,
        }
    });

}

function runMultipleSwiper(paramSwiperSlide){

    var {nameAttr} = paramSwiperSlide,
        {slidesPerView} = paramSwiperSlide,
        {spaceBetween} = paramSwiperSlide,
        {loop} = paramSwiperSlide,
        {autoSlide} = paramSwiperSlide,
        {breakpoints} = paramSwiperSlide,
        {speed} = paramSwiperSlide,
        {renderBullet} = paramSwiperSlide

    new Swiper(`${nameAttr} .swiper-container`, {
        slidesPerView,
        spaceBetween,
        speed : speed ? speed : 400,
        navigation: {
            nextEl: `${nameAttr} .swiper-button-next`,
            prevEl: `${nameAttr} .swiper-button-prev`,
        },
        loop: loop ? true : false,
        autoplay: autoSlide ? autoSlide : '',
        pagination: {
            el: `${nameAttr} .swiper-pagination`,
            click: true,
            renderBullet: renderBullet? function (index, className) {
                return '<span class="' + className + '">' + (index + 1) + "</span>";
            }:""
        },
        breakpoints: breakpoints
    });

}

// chạy nhiều sllide
function runMultipleSwiperParam(){
    for(let param of arguments){
        runMultipleSwiper(param)
    }
}

function toggleClassName(className, pointClassName, newClass, thisClassName ){
    $(`.${className}`).each(function(){
        $(this).click(function(){
            if(thisClassName==="this"){
                $(this).toggleClass(newClass)
            }
            $(`.${pointClassName}`).toggleClass(newClass)
        })
    })
}

function nextToggleSame(className, findName, newClassName){
    $(className).each(function(){
        $(this).click(function(){
            $(this).next().slideToggle()
            if(findName){
                $(this).find(findName).toggleClass(newClassName)
            }
        })
    })
}

//lấy các bài viết
function getArticleCategory({
    idInnerHtml = '#id-inner-html',
    idWrapArticle = '#id-wrap-article',
    mouse_id, 
    show, 
    itemTemplateTpl,
    wrapTemplateTpl, 
    runSlide
}) {

    var params = {
        action_type: "list",
        type: "article",
        catId: mouse_id,
        featured: 1,
    }

    var target = `${idInnerHtml}${mouse_id}`;

    //console.log(target)

    Hura.Ajax.get("article", params).then(function (data) {
        
        var listShow = data.list.slice(0, show)
        var html = Hura.Template.parse(itemTemplateTpl, listShow);
        var listItem = html;
        if(wrapTemplateTpl){
            listItem = wrapTemplateTpl
                    .replace(new RegExp("{{list-item}}", "g"), html)
        }
        if(html == ""){
            $(`${idWrapArticle}-${mouse_id}`).hide()
        }
        Hura.Template.render(target, listItem);
        if(runSlide){
            runMultipleSwiper(runSlide)
        }
        

    })

}

//hàm thay đổi tab và gọi ajax
function thayDoiTab(attrClassName){
    $(attrClassName).click(function(){
        $('[data-tab]').removeClass('js-active');
        var valueDt = $(this).attr('data-tab')
        $(`[data-tab = ${valueDt}]`).addClass("js-active")

        // if(!$(this).attr('data-load')){
        //     $(this).attr('data-load','check')
        //     if($(this).attr('data-id') == 'cung-hang'){
        //         getProductBrand({{page.product_info.id}},{{page.product_info.brand.id}},'#inner-cung-hang')
        //     }
        //     if($(this).attr('data-id') == 'da-xem'){
        //         getProductViewHistory('#inner-da-xem')
        //     }
        // }
    })
}

// lấy sản phẩm cùng danh mục theo id sản phẩm và danh mục
function getProductRelate({
    idProduct,
    idCategory,
    idInnerHtml,
    productTpl="",
    wrapTpl,
    runSlide,
}){
    var params = {
        action_type: "same-category",
        id: idProduct,
        category: idCategory,
        show: 6
    }

    Hura.Ajax.get("product", params).then(function (data) {

        var html = Hura.Template.parse(productTpl, data);

        if(wrapTpl){
            html = wrapTpl.replace(new RegExp("<<itemHtml>>", "g"), html)
        }

        Hura.Template.render(idInnerHtml, html);

        if(runSlide){
            runMultipleSwiper(runSlide)
        }

    })
}


// lấy sản phẩm đã xem
function getProductViewHistory({
    idInnerHtml,
    productTpl,
    wrapTpl,
    runSlide
}){
    var params = {
        action_type: "product-view-history",
    };

    Hura.Ajax.post("user", params).then(function (data){

        var html = Hura.Template.parse(productTpl, data.list);
        
        if(wrapTpl){
            html = wrapTpl.replace(new RegExp("<<itemContent>>","g"),html)
        }
        Hura.Template.render(idInnerHtml, html);
        if(runSlide){
            runMultipleSwiper(runSlide)
        }
    })
}

//kiểm tra form review có thỏa mãn không
function check_form_review() {
    var error = "";

    var name = document.getElementById("rating-name").value;
    var email = document.getElementById("rating-email").value;
    var tel = document.getElementById("rating-phone").value;
    var content = document.getElementById("rating-content").value;

    if(name=='') error+= "Bạn chưa nhập tên\n";
    if(email=='') error+= "Bạn chưa nhập email\n";
    if(content=='') error+= "Bạn chưa nhập nội dung\n";
    if(tel=='') error+= "Bạn chưa nhập sdt \n";
    if(error==''){
        return true;
    }
    else {
        alert(error);
        return false;
    }
}

// hàm gửi đánh giá của khách hàng
function postReview2021(){
    if(check_form_review() == false) return false ; 
    var user_name = document.getElementById("rating-name").value;
    var user_email = document.getElementById("rating-email").value;
    var user_tel = document.getElementById("rating-phone").value;
    var content = document.getElementById("rating-content").value;
    var rate = parseInt($(".rating-selection input:checked").val());
    var item_type = $("#item_type_2021").val();
    var item_id = $("#item_id_2021").val();
    var item_title = $("#item_item_title_2021").val();
    var title = $("#item_item_title_2021").val();
    console.log(rate)
    var reviewParams = {
        action_type: "review",
        info : {
            item_type   : item_type,
            item_id     : item_id,
            item_title  : item_title,
            user_name   : user_name + " - Số đt : " + user_tel,
            user_email  : user_email,
            user_avatar : '',
            user_note   : '',
            rate        : rate,
            title       : 'Đánh giá sản phẩm: ' + title,
            content     : content,
            files       : ''
        }
    }

    Hura.Ajax.post('customer', reviewParams).then(function (data) {
        //console.log("data",data);
        alert('Bạn đã gửi thành công!'); location.reload();
    })
}

//hàm ajax lấy thông tin đánh giá sản phẩm của khách hàng
function get_list_review() {
    var item_id = $("#item_id_2021").val();
    var params = {
        action_type: "list",
        item_id    :item_id,
        search : '',
        search_field :'',
        order_by :'new',
        numPerPage :20,
        item_type   : 'product'
    };

    Hura.Ajax.get("review", params).then(function (data) {
        console.log(data);
        var html = Hura.Template.parse(voteTpl , data);
        Hura.Template.render("#list_vote", html );
    })
}


// kiểm tra form khách hàng nhập comment
function check_form_comment(id) {
    var error = "";
    var name = document.getElementById("comment_box_name_"+id).value;
    var email = document.getElementById("comment_box_email_"+id).value;
    //var tel = document.getElementById("comment_box_tel").value;

    if(name=='') error+= "Bạn chưa nhập tên\n";
    if(email=='') error+= "Bạn chưa nhập email\n";
    //if(tel=='') error+= "Bạn chưa nhập sdt \n";

    if(error==''){
        return true;
    }
    else {
        alert(error);
        return false;
    }
}

// lấy chữ cái đầu
function spliceAvataCusCmt(className){
    $(className).each(function(){
        var name = $(this).html().substring(0, 1);
        $(this).html(name);
    })
}

// hàm sử lý post comment khách hàng
function reviewReply(action,reply,id) {
    var content = $('#comment_reply_content_'+id).val();
    if( content == null || content == '') {
        return alert('Vui lòng nhập nội dung bình luận !');
    } else{
        postForm2021(action,reply,id);
    }
}

//xử lý khách hàng gửi comment lên data
function postForm2021(action,reply,id) {
    if(check_form_comment(id) == false) return false ; 

    var item_type = $("#item_type_2021").val();
    var item_id = $("#item_id_2021").val();
    var item_title = $("#item_item_title_2021").val();
    var title = $("#item_title_2021").val();



    var user_name = $("#comment_box_name_"+id).val();
    var user_email = $("#comment_box_email_"+id).val();
    //var user_tel = $("#comment_box_tel").val();    
    if(action == 'review') var content = $("#review_reply_content_"+id).val();
    else var content = $('#comment_reply_content_'+id).val();



    if (reply == ''){
        var params = {
            action_type: "comment",
            type    :"ajax",
            info : {
                item_type   : item_type,
                item_id     : item_id,
                item_title  : item_title,
                user_email  : user_email,
                user_name   : user_name,
                user_avatar : '',
                user_note   : '',
                rate        : 5,
                title       : title,
                content     : content,
                files       : ''
            }
        }   

        Hura.Ajax.post('customer', params).then(function (data) {
            alert("Bạn đã gửi thành công");
            location.reload();
        })
    }else{
        var reply_to = id;

        var params = {
            action_type: "comment-reply",
            type    :"ajax",
            info : {
                item_type   : item_type,
                item_id     : item_id,
                item_title  : item_title,
                reply_to    : reply_to,
                user_email  : user_email,
                user_name   : user_name,
                user_avatar : '',
                user_note   : '',
                rate        : 5,
                title       : title,
                content     : content,
                files       : ''
            }
        } 

        Hura.Ajax.post('customer', params).then(function (data) {
            alert("Bạn đã gửi thành công");
            location.reload();
        })
    }
};

// hàm xử lý hiển thị các commnet của khách hàng
function layComment(productId,searchText,searchField,sort) {
    var params = {
        action_type: "get",
        item_type    :"product",
        item_id: productId,
        search : searchText,
        search_field : searchField,
        order_by : 'new',
        approved: 1,
    }

    Hura.Ajax.get('comment', params).then(function (data) {
        console.log(data, "kiem tra");
        var html = Hura.Template.parse(commentTpl, data);
          console.log(html,"kt html")
        Hura.Template.render("#comment-list", html );

        $('.js-write-reply').each(function(){
            $(this).click(function(){
                var id_reply = $(this).attr('data-id-reply')
                $(`#reply-comment-${id_reply}`).slideToggle('slow')
                // $(`#comment-form-input-${id_reply}`).hide()
            })
        })

        $('.js-close').click(function(){
            $(this).closest('.reply-comment').slideToggle('slow')
        })
        
        //Sử lý tên của khách hàng làm avatar
        spliceAvataCusCmt(".avatar-user")
        
    })

}

// đếm sản phẩm có trong giỏ hàng
function showCartSummary(display_node) {
    var $status_container = $(display_node);
    $status_container.html('...');
    Hura.Cart.getSummary().then(summary => {
        $status_container.html(summary.total_item);
    });
}

// hiệu ứng cuộn thanh header
function handScrollHeaderMenuVer2(vitriHeader,attrHeader){
    var $header = $(attrHeader)
    var lastScrollTop = 0;
    $(window).scroll(function() {

        var y = $(this).scrollTop();
        var currentScrollTop = y + 1;


        if(currentScrollTop > vitriHeader){
            if (currentScrollTop < lastScrollTop) {
                $header.addClass('js-show-menu');
                $header.removeClass('js-hidden-menu');
            }else {
                $header.removeClass('js-show-menu');
                $header.addClass('js-hidden-menu');
            }
            if(y <= 0){
                $header.addClass('js-show-menu');
                $header.removeClass('js-hidden-menu');
            }
            lastScrollTop = currentScrollTop;
        }

    });
}
//trả lời comment 
function getReply(commentId) {
    var replyParams = {
      action_type: "get-reply",
      item_id:  commentId
    };

    var target = "#reply_list_"+commentId;
    Hura.Ajax.get('comment', replyParams).then(function (data) {
          console.log(data, 'kiem tra rep')
        var html = Hura.Template.parse(replyTpl, data);
        Hura.Template.render(target, html );
          spliceAvataCusCmt(".avatar-user")
    })
}

// Gửi form liên hệ
function check_form_contact_detail(){
    var error = "";
    var check_name = document.getElementById('contact_name_detail').value;
    var check_email = document.getElementById('contact_email_detail').value;
    var check_tel = document.getElementById('contact_tel_detail').value;
    var check_message = document.getElementById('contact_message_detail').value;
    //var check_captcha = document.getElementById('captcha').value;

    if(check_name.length < 4) error += "- Bạn chưa nhập tên\n";
    if(check_email.length < 4) error += "- Bạn chưa nhập email\n";
    if(check_message.length < 4) error += "- Bạn chưa nhập nội dung\n";
  	if(check_tel.trim() == ""){
      	error += "- Bạn chưa nhập số điện thoại \n";
	}else{
      	if(check_tel.length != 10) error += "- Bận nhập sai số đt\n";
    }
    //if(check_captcha.length < 4) error += "- Bạn chưa nhập Mã bảo vệ\n";

    if(error == ""){
    var params = {
        action_type: "contact",
        type    :"contact",
        info : {
            name : check_name, 
            email : check_email, 
            tel : check_tel, 
            title: 'Khách hàng liên hệ ', 
            message : check_message
        }
    }
    Hura.Ajax.post('customer', params).then(function (data) {
        alert("Bạn đã gửi liên hệ thành công\nChúng tôi đã nhận được thông tin và sẽ liên hệ với quý khách trong thời gian sớm nhất");

        document.getElementById('contact_name_detail').value = '';
        document.getElementById('contact_email_detail').value = '';
        document.getElementById('contact_tel_detail').value = '';
        document.getElementById('contact_message_detail').value = '';
    })
    }
    else alert(error);
    return false;
}

// lay sp nổi bật theo id danh mục
function getProductCategoryHome({
  mouse_id,paramSwiperProduct
}) {
    //console.log('kiem tra')
    var params = {
        action_type: "product-list",
        type: "",
        category: mouse_id,
        sort: "order",
        show: 10,
    };

    var target = '#product-list-home' + mouse_id;

    Hura.Ajax.get("product", params).then(function (data) {
        console.log(data,"ppp");
        // productTpl is in template: javascript/tpl
        //var showData = data.list.splice(0, 10);

        var html = Hura.Template.parse(productTpl, data.list);
        if(html == ""){
            $(`#product-home-${mouse_id}`).hide()
        }
        Hura.Template.render(target, html);
      	paramSwiperProduct.nameAttr = `#product-home-${mouse_id}`
		
        runMultipleSwiper(paramSwiperProduct)
    })

}

// hàm lấy các bài viết nổi bật
function getArticleFeatured({
    idInnerHtml = '#id-inner-html',
    idWrapArticle = '#id-wrap-article',
    show, 
    itemTemplateTpl,
    wrapTemplateTpl, 
    runSlide
}) {

    var params = {
        action_type: "featured",
        type: "article",
        show: 3
    }

    var target = `${idInnerHtml}`;

    Hura.Ajax.get("article", params).then(function (data) {
        if(show){
            var listShow = data.slice(0, show);
            console.log(listShow);
        }else{
            var listShow = data;
        }

        var html = Hura.Template.parse(itemTemplateTpl, listShow);
        var listItem = html;
        if(wrapTemplateTpl){
            listItem = wrapTemplateTpl
                    .replace(new RegExp("{{list-item}}", "g"), html)
        }
        if(html == ""){
            $(`${idWrapArticle}`).hide()
        }
        Hura.Template.render(target, listItem);
        if(runSlide){
            runMultipleSwiper(runSlide)
        }


    })

}

//lấy các bài viết theo id danh mục
function getArticleCategory({
    idInnerHtml = '#id-inner-html',
    idWrapArticle = '#id-wrap-article',
    mouse_id, 
    show, 
    itemTemplateTpl,
    wrapTemplateTpl, 
    runSlide
}) {

    var params = {
        action_type: "list",
        type: "article",
        catId: mouse_id,
        featured: 1,
    }

    var target = `${idInnerHtml}${mouse_id}`;

    //console.log(target)

    Hura.Ajax.get("article", params).then(function (data) {

        var listShow = data.list.slice(0, show)
        var html = Hura.Template.parse(itemTemplateTpl, listShow);
        var listItem = html;
        if(wrapTemplateTpl){
            listItem = wrapTemplateTpl
                    .replace(new RegExp("{{list-item}}", "g"), html)
        }
        if(html == ""){
            $(`${idWrapArticle}-${mouse_id}`).hide()
        }
        Hura.Template.render(target, listItem);
        if(runSlide){
            runMultipleSwiper(runSlide)
        }


    })

}

// lấy bài viết liên quan theo id danh mục
function getArticleByIdCategory({
    idArticle,itemTpl,id,idInnerHtml,runSlide,wrapBlock
}){
    var params = {
        action_type: 'list',
        type: "article",
        catId: id,
        show: 5
    }

    Hura.Ajax.get("article", params).then(function (data){

        console.log(data, 'kiem tra')
      	var dataNoCurrent = data.list;
        if(idArticle){
          	dataNoCurrent = data.list.filter((item)=>{
              return item.id != idArticle
            })
        }
		
        var html = Hura.Template.parse(itemTpl, dataNoCurrent);
          
          if(wrapBlock){
              if(html==""){
                  $(wrapBlock).hide()
              }
          }

        Hura.Template.render(idInnerHtml, html);
          if(runSlide){
              runMultipleSwiper(runSlide)
          }
          

    })

}

//thêm sản phẩm vào giỏ hàng
function addProductToCartQ(){
  var product_id = $(this).attr("data-product-id")
  var variant_id = $(this).attr("data-variant-id")
  var redirect = $(this).attr("data-redirect")
  var quantity = $(this).attr("data-quantity")

  Hura.Cart.Product.add(product_id, variant_id, {quantity}).then(function(response){
      console.log(response)
      if(response.status == 'error') {
          // bao loi
          if(response.error_type == 'item-in-cart') alert('Sản phẩm đã trong giỏ hàng');
          else if(response.error_type == 'invalid-item-id') alert('ID sản phẩm không đúng');
          else alert(response.message);
      }else{
          // thành công, chuyển sang trang giỏ hàng
          if(redirect == 1){
          window.location.href= '/cart';
          }else {
              //showCartNotify()
              alert("Sản phẩm đã thêm vào giỏ hàng!");
              showCartSummary(".js-cart-counter");
          }
      }
  })
}

function tinhPhanTramMarket({
    price,innerOfPrice,marketPrice
}){
    var priceInt = parseInt($(price).val())
    var marketPriceInt = parseInt($(marketPrice).val())
    var perc="";
    if(isNaN( priceInt) || isNaN(marketPriceInt)){
        perc="";

    }else{
        if((marketPriceInt - priceInt) > 0){
            perc = (((marketPriceInt - priceInt) / marketPriceInt ) * 100).toFixed()
            $(innerOfPrice).html(`-${perc}%`)
        }else{
            $(innerOfPrice).html(``)
        }
    }
}

//tinh tong gia don hang
  function calculateCartTotalPrice() {
      var total_cart_price = 0;

      $(".js-total-item-price").each(function () {
          console.log($(this).html())
          total_cart_price += _strToNumber($(this).html());
      });

      //log for other reference
      $("#js-total-before-fee-discount").val(total_cart_price);
      //giam gia khac: voucher, membership, loyalty point conversion
      var total_discount  = 0;
      total_discount += parseInt($("#js-discount-voucher").val());
      total_discount += parseInt($("#js-discount-membership").val());

      //phi khac: shipping, COD...
      var total_other_fee = 0;
      total_other_fee += parseInt($("#js-fee-shipping").val());
      total_other_fee += parseInt($("#js-fee-cod").val());

      $(TOTAL_CART_VALUE_NODE).html(formatCurrency(total_cart_price));
  }
  
  //nghe thay doi so luong sp
  function listenQuantityChange() {
      var $track_change = $(".js-quantity-change");

      //thay doi so luong sp mua, neu nhap so luong
      $track_change.on("change", function (e) {
          changeItemTotalPrice.call(this);
      });

      //thay doi so luong sp theo - hoac +
      $track_change.on("click", function (e) {
          if(e.target.nodeName === 'INPUT') return ;

          var quantity_change = parseInt(this.getAttribute("data-value"));
          var $row = $(this).closest(".js-item-row");
          var current_quantity = parseInt($row.find(".js-buy-quantity").val());

          //loai bo so luong vo ly
          if(current_quantity + quantity_change < 1 && 1 < 2) {
              $row.find(".js-buy-quantity").val(1);
              return ;
          }


          $row.find(".js-buy-quantity").val(current_quantity + quantity_change);

          //then update
          changeItemTotalPrice.call(this);
      });
  }
  
  //nghe xoa san pham
function listenDeleteCartItem() {
  $(".delete-from-cart").on("click", function () {
      var $row        = $(this).closest(".js-item-row");
      var item_type   = $row.data("item_type");
      var item_id     = $row.data("item_id");

      // calculateCartTotalPrice();
      location.reload();

      console.log("deleting item from cart = " + item_type);

      var deleteStatus;
      //save to cart
      switch (item_type) {
          case "product":
              deleteStatus = Hura.Cart.Product.remove(item_id, $row.data("variant_id"));
              break;

          case "deal":

              deleteStatus = Hura.Cart.Deal.remove(item_id);
              break;

          case "combo":
              deleteStatus = Hura.Cart.Combo.remove(item_id);
              break;

      }

      if(deleteStatus) {
          deleteStatus.then(function () {
              $row.remove();
          })
      }
  })
}

function check_cart(){
    var error = "";
    var check_name = document.getElementById('buyer_name').value;
    if(check_name.length < 4) error += "- Bạn chưa nhập tên\n";
    var check_email = document.getElementById('buyer_email').value;
    if(check_email.length < 4) error += "- Bạn chưa nhập Email\n";
    var check_add = document.getElementById('buyer_address').value;
    if(check_add.length < 10) error += "- Bạn chưa nhập địa chỉ\n";
    var check_tel = document.getElementById('buyer_tel').value;
    if(check_tel.length < 4) error += "- Bạn chưa nhập SĐT\n";
    if(error != "") {
        alert(error); return false;
    }
    return true;
}

//thay doi tong gia cua 1 san pham
function changeItemTotalPrice() {
    var $row        = $(this).closest(".js-item-row");
    var item_type   = $row.data("item_type");
    var price       = $row.find(".js-buy-price").attr("data-price");
    var quantity    = $row.find(".js-buy-quantity").val();
    var total_price = price * quantity;

    //loai bo so luong vo ly
    if(quantity < 0) {
        $row.find(".js-quantity-change").val(0);
        total_price = 0;
    }

    $row.find(".js-total-item-price").html(formatCurrency(total_price));

    calculateCartTotalPrice();

    //console.log("updating cart = " + item_type);

    //save to cart
    switch (item_type) {
        case "product":
            Hura.Cart.Product.update($row.data("item_id"), $row.data("variant_id"), {quantity: quantity});
            break;

        case "deal":

            Hura.Cart.Deal.update($row.data("item_id"), {quantity: quantity});
            break;

        case "combo":
            Hura.Cart.Combo.update($row.data("item_id"), {quantity: quantity});
            break;

    }
}

function _strToNumber(str) {
    str += ''; //convert to str incase it's already a number
    while(str.indexOf(".") > 0){
        str = str.replace('.','');
    }
    var result = parseFloat(str);
    return isNaN(result) ? 0 : result;
}

// lấy bài viết mới
function getArticleNew(idInnerHtml){

    var params = {
        action_type: "new",
        type: "article",
        show: 5,
    }

    Hura.Ajax.get("article", params).then(function (data){

        var html = Hura.Template.parse(newArticleTpl, data);

        Hura.Template.render(idInnerHtml, html);

    })
}

// lấy danh sách sản phẩm theo thuộc tính(sản phẩm bán chạy) 
function plubginGetProductFeature({
    type, productTpl, productIdInner, blockWrap, paramsSwiper, paramsOwl
}) {
    var params = {
        action_type: 'product-list',
        type: type
    };

    Hura.Ajax.get('product', params).then(function (data) {
        console.log(data)

        if(data.list.length > 0){
            var html = Hura.Template.parse(productTpl, data.list);
            Hura.Template.render(productIdInner, html);
            if(paramsSwiper){
                runMultipleSwiperParam(paramsSwiper)
            }
            if(paramsOwl){
                runSlideOwl(paramsOwl)
            }

        }else{
            $(blockWrap).hide()
        }

    })
}
