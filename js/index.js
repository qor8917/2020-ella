/* *********전역변수********* */
/* *********사용자함수********* */
/* *********이벤트선언********* */
//언어선택
$(".top-wrapper .icon-down").click(onLangChg);
$(".top-wrapper .bt-down").click(onLangSel);
/* *********이벤트콜백********* */
function onLangChg() {
    $(".trans-wrapper").stop().slideToggle(200);
    $(".trans-wrapper .lang-sel").stop().slideUp(200);
}

function onLangSel() {
    $(".trans-wrapper .lang-sel").stop().slideUp(200);
    if ($(this).next().css("display") === "none")
        $(this).next().stop().slideDown(200);
}