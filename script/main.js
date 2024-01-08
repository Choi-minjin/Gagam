// top banner
$(function () {
    $('.x').click(function () {
        $('.popup').hide();
        $('.x').hide();
    });
});

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

// 서브 슬라이드
$(function () {
    $('.nav> li').mouseover(function () {
        $(this).children('.sub').stop().slideDown();
    });

    $('.nav> li').mouseout(function () {
        $(this).children('.sub').stop().slideUp();
    });

});

//이달의 책 미리보기
$(function () {
    var swiper = new Swiper('.gallery .gallery_inner ', {
        slidesPerView: 3,
        spaceBetween: 50,
        speed: 1500,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        loop: true,
        navigation: {
            nextEl: '.gallery .swiper-button-next',
            prevEl: '.gallery .swiper-button-prev',
        },
        pagination: {
            el: ".gallery .swiper-pagination",
            type: "progressbar",
        },
    });
});

// aos 효과
AOS.init({
    duration: 2000
});

//매거진
$(function () {
    $('.mgz_btn li').click(function () {
        $(this).addClass('on').siblings().removeClass('on');
    });

    $('.mgz_btn li:nth-child(1)').click(function () {
        $('.gg1, .ggt1').show();
        $('.gg2, .ggt2, .gg3, .ggt3').hide();
    });

    $('.mgz_btn li:nth-child(2)').click(function () {
        $('.gg2, .ggt2').show();
        $('.gg1, .ggt1, .gg3, .ggt3').hide();
    });

    $('.mgz_btn li:nth-child(3)').click(function () {
        $('.gg3, .ggt3').show();
        $('.gg2, .ggt2, .gg1, .ggt1').hide();
    });

});

// 슬라이드 sns
$(function () {
    var swiper = new Swiper('.slide ', {
        slidesPerView: 4,
        centeredSlides: true,
        spaceBetween: 30,
        speed: 1500,
        autoplay: {
            delay: 1000,
            disableOnInteraction: false,
        },
        loop: true,
        navigation: {
            nextEl: '.slide .swiper-button-next',
            prevEl: '.slide .swiper-button-prev',
        },
    });
});


// sub1 시작
// slogan 밑줄
const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.intersectionRatio > 0) {
            entry.target.classList.add('on');
        }
        else {
            entry.target.classList.remove('on');
        }
    });
});
const boxElList = document.querySelectorAll('.highlight');
boxElList.forEach((el) => {
    io.observe(el);
});
