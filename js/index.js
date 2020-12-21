/* *********전역변수********* */

/* *********사용자함수********* */
function mainBanner(){
	var mainSwiper = new Swiper(".main-wrapper", {
		slidesPerView: 1,
		loop: true,
		effect:"fade",
		speed:1000,			
		pagination: {
			el: '.main-wrapper .pager-wrap',
			clickable: true,
		},
		navigation: {
			nextEl: '.main-wrapper .bt-next',
			prevEl: '.main-wrapper .bt-prev',
		},
	})
}
function creatNavi(r) {
	html = '<a href="' + r.link + '">';
	if (r.icon) html += '<i class="' + r.icon + '"></i> ';
	html += r.name + '</a>';
	return html;
}

function creatSub(r) {
	html = '<div class="sub-navi-wrap">';
	for (var i of r.depth2) {
		if (i.depth3) html += '</div><div class="sub-navi-wrap">';
		html += '<a href="' + i.link + '" class="sub-navi bold">' + i.name + '</a>';
		if (i.depth3) {
			for (var j of i.depth3) {
				html += '<a href="' + j.link + '" class="sub-navi hover-line">' + j.name + '</a>';
			}
		}
	}
	html += '</div>';
	return html;
}

function creatSub2(r) {
	var html = '';
	for (var i of r.depth2) {
		html += '<li class="depth depth2"><a href="' + i.link + '">' + i.name + '</a>';
		if (i.depth3.length > 0) {
			html += '<ul>';
			for (var j of i.depth3) {
				html += '<li class="depth depth3">';
				html += '<a href="' + j.link + '">' + j.name + '</a>';
				html += '</li>';
			}
			html += '</ul>';
		}
		html += '</li>';
	}
	return html;
}

function creatSubNavi(el, r) {
	$(el).prepend(creatNavi(r));
	$(el).find(".sub-wrapper2").append(creatSub2(r));
	$(el).mouseenter(onSub2Enter);
	$(el).mouseleave(onSub2Leave);
	$(el).find(".depth2").mouseenter(onDepth2Enter);
	$(el).find(".depth2").mouseleave(onDepth2Leave);
}


/* *********이벤트선언********* */

$(".top-wrapper .icon-down").click(onLangChg);
$(".top-wrapper .bt-down").click(onLangSel);
$.get("../json/new-products.json", onNewProducts);
$.get("../json/navi-new.json", onNaviNew);
$.get("../json/navi-best.json", onNaviBest);
$.get("../json/navi-men.json", onNaviMen);
$.get("../json/navi-women.json", onNaviWomen);
$.get("../json/navi-kids.json", onNaviKids);

$(".navi-wrapper .navi").mouseenter(onNavienter);
$(".navi-wrapper .navi").mouseleave(onNavileave);

$(window).scroll(onScroll);

mainBanner();



/* *********이벤트콜백********* */
function onScroll(e){
 var scTop = $(this).scrollTop();
}

function onSub2Enter() {
	$(this).find(".sub-wrapper2").stop().slideDown(300);
}

function onSub2Leave() {
	$(this).find(".sub-wrapper2").stop().slideUp(300);
}

function onDepth2Enter() {
	$(this).find('ul').stop().fadeIn(300);
}

function onDepth2Leave() {
	$(this).find('ul').stop().fadeOut(300);
}

function onNavienter() {
	$(this).find(".sub-wrapper").addClass("active");
}

function onNavileave() {
	$(this).find(".sub-wrapper").removeClass("active");
}

function onNaviNew(r) {
	$(".navi.navi-new").prepend(creatNavi(r));
	var html = creatSub(r);
	html += '<div class="sub-banner">';
	html += '<img src="../img/mega-menu-4_460x.jpg" alt="배너" class="mw-100">';
	html += '</div>';
	$(".navi.navi-new").find('.sub-navi-wrapper').append(html);
}

function onNaviBest(r) {
	$(".navi.navi-best").prepend(creatNavi(r));
	var html = creatSub(r);
	$(".navi.navi-best").find('.sub-navi-wrapper').append(html);
}

function onNaviMen(r) {
	creatSubNavi(".navi.navi-men", r);
}

function onNaviWomen(r) {
	creatSubNavi(".navi.navi-women", r);
}

function onNaviKids(r) {
	creatSubNavi(".navi.navi-kids", r);
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

