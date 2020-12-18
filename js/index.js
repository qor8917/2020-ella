/* *********전역변수********* */

/* *********사용자함수********* */

/* *********이벤트선언********* */

$(".top-wrapper .icon-down").click(onLangChg);
$(".top-wrapper .bt-down").click(onLangSel);
$.get("../json/navi-new.json", onNaviNew);
$.get("../json/new-products.json", onNewProducts);
$(".navi-new").mouseenter(onNavienter);
$(".navi-new").mouseleave(onNavileave);

/* *********이벤트콜백********* */
function onNavienter(){
	$(this).find(".sub-wrapper").addClass("active");
}
function onNavileave(){
	$(this).find(".sub-wrapper").removeClass("active");
}
function onNaviNew(r) {
	var i, j, html = '';
	html += '<a href="' + r.link + '" class="hover-line">';
	html += '<i class="' + r.icon + '"></i>' + r.name + '</a>';
	$(".navi-new").prepend(html);
	
	html = '<div class="sub-navi-wrap">'
	for (i = 0; i < r.depth2.length; i++) {
		if (r.depth2[i].depth3) 		
		{html += '</div><div class="sub-navi-wrap">'}		
		html += '<a href="' + r.depth2[i].link + '" class="sub-navi bold">' + r.depth2[i].name + '</a>';
		if (r.depth2[i].depth3) {
			for (j = 0; j < r.depth2[i].depth3.length; j++) {
				html += '<a href="' + r.depth2[i].depth3[j].link + '" class="sub-navi hover-line">' + r.depth2[i].depth3[j].name + '</a>'
			}
		}
	}		
		html += '</div>';
        html +='<div class="sub-banner">'
		html +='<img src="../img/mega-menu-4_460x.jpg" alt="배너" class="mw-100">'
		html +='</div>'
		$(".sub-navi-wrapper").append(html)
	}
	function onNewProducts(r) {
		for (var i = 0, html = ''; i < r.length; i++) {
			html = '<div class="slide swiper-slide">';
			html += '<div class="img-wrap">';
			html += '<img src="' + r[i].src + '" alt="상품" class="w-100">';
			html += '</div>';
			html += '<div class="content-wrap">';
			html += '<h4 class="title">' + r[i].title + '</h4>';
			html += '<p class="summary">' + r[i].summary + '</p>';
			html += '<div class="star">';
			for (var j = 1; j <= 5; j++) {
				if (r[i].star == 0) html += '<i class="fa fa-star"></i>';
				else if (r[i].star >= j) {
					if (r[i].star >= j + 0.3 && r[i].star <= j + 0.7) html += '<i class="fa fa-star-half active"></i>';
					else html += '<i class="fa fa-star active"></i>';
				}
			}
			html += '</div>';
			html += '<div class="content">';
			html += '<span class="price-original">$' + r[i].originalPrice + '</span>';
			html += '<span> | </span>';
			html += '<span class="origin">' + r[i].origin + '</span>';
			html += '</div>';
			html += '<div class="price-sale">$' + r[i].salePrice + '</div>';
			html += '</div>';
			html += '</div>';
			$(".navi-new .slide-wrapper").append(html);
		}
		var mySwiper = new Swiper('#newSlide .swiper-container', {
			slidesPerView: 4,
			loop: true,
			navigation: {
				nextEl: '#newSlide .bt-next',
				prevEl: '#newSlide .bt-prev',
			},
		});
	}

	function onLangChg() {
		$(".trans-wrapper").stop().slideToggle(200);
		$(".trans-wrapper .lang-sel").stop().slideUp(200);
	}

	function onLangSel() {
		$(".trans-wrapper .lang-sel").stop().slideUp(200);
		if ($(this).next().css("display") === "none")
			$(this).next().stop().slideDown(200);
	}