// 커서
const cursor = document.querySelector('#cursor');
const cursorCircle = cursor.querySelector('.cursor__circle');

const mouse = { x: -100, y: -100 }; // mouse pointer's coordinates
const pos = { x: 0, y: 0 }; // cursor's coordinates
const speed = 0.1; // between 0 and 1

const updateCoordinates = e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
}

window.addEventListener('mousemove', updateCoordinates);

function getAngle(diffX, diffY) {
    return Math.atan2(diffY, diffX) * 180 / Math.PI;
}

function getSqueeze(diffX, diffY) {
    const distance = Math.sqrt(
        Math.pow(diffX, 2) + Math.pow(diffY, 2)
    );
    const maxSqueeze = 0.15;
    const accelerator = 1500;
    return Math.min(distance / accelerator, maxSqueeze);
}

const updateCursor = () => {
    const diffX = Math.round(mouse.x - pos.x);
    const diffY = Math.round(mouse.y - pos.y);

    pos.x += diffX * speed;
    pos.y += diffY * speed;

    const angle = getAngle(diffX, diffY);
    const squeeze = getSqueeze(diffX, diffY);

    const scale = 'scale(' + (1 + squeeze) + ', ' + (1 - squeeze) + ')';
    const rotate = 'rotate(' + angle + 'deg)';
    const translate = 'translate3d(' + pos.x + 'px ,' + pos.y + 'px, 0)';

    cursor.style.transform = translate;
    cursorCircle.style.transform = rotate + scale;
};

function loop() {
    updateCursor();
    requestAnimationFrame(loop);
}

requestAnimationFrame(loop);

const cursorModifiers = document.querySelectorAll('[cursor-class]');

cursorModifiers.forEach(curosrModifier => {
    curosrModifier.addEventListener('mouseenter', function () {
        const className = this.getAttribute('cursor-class');
        cursor.classList.add(className);
    });

    curosrModifier.addEventListener('mouseleave', function () {
        const className = this.getAttribute('cursor-class');
        cursor.classList.remove(className);
    });
});

// 검색
$(function () {
    $('input').click(function () {
        $(this).addClass('search');
    });
});

// 고정버튼
$(window).scroll(function () {
    var height = $(window).scrollTop();
    if (height > 50) {
        $('.top_btn').fadeIn();
    } else {
        $('.top_btn').fadeOut();
    }
});

$('.top_btn').click(function () {
    $('html, body').animate({ scrollTop: 0 }, 1000);
    return false;
});

$(window).scroll(function () {
    var height = $(window).scrollTop();
    if (height > 50) {
        $('.bottom_btn').fadeIn();
    } else {
        $('.bottom_btn').fadeOut();
    }
});

$('.bottom_btn').click(function () {
    $('html, body').animate({ scrollTop: 5550 }, 1000);
    return false;
});


$(function () {
    $('.award> a').click(function () {
        $('.add').show();
        $('.award> a').addClass('hide');
    });
    $('.add> a').click(function () {
        $('.add').hide();
        $('.award> a').removeClass('hide');
    });
});

// 서브 슬라이드
$(function () {
    $('.nav> li').mouseover(function () {
        $(this).children('.sub').stop().slideDown();
    });

    $('.nav> li').mouseout(function () {
        $(this).children('.sub').stop().slideUp();
    });

});

// form
$(function () {
    $("#input-file").on('change', function () {
        var fileName = $("#input-file").val();
        $(".upload-name").val(fileName);
        $(".file_name").css({ 'display': 'block' });
    });
    $('.close').click(function () {
        $(".file_name").css({ 'display': 'none' });
    });
});