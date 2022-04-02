$(function(){
    $(".review-block__slider").slick({
        autoplay: true,
        prevArrow: '<button type="button" class="review-block__slider-btn review-block__slider-prev"><img src="images/arrow-left.svg" alt=""></button>',
        nextArrow: '<button type="button" class="review-block__slider-btn review-block__slider-next"><img src="images/arrow-right.svg" alt=""></button>'
    })

    $('.player__hidden').on('click', function(){
        $('.player').toggleClass('active')
    })

    $('.job-list__item-right__like').on('click', function(){
        $('job-list__item-right__like').toggleClass('active')
    })

    $('.header__menu-hamburger').on('click', function(){
        $('.menu__mobile').slideToggle()
        $('.header__menu-hamburger').toggleClass('active')
      });

    $(".js-range-slider").ionRangeSlider({
        type: "double",
        min: 0,
        max: 1000,
        from: 200,
        to: 500,
        grid: false
    });

    // select
    $('.select').each(function() {
        const _this = $(this),
            selectOption = _this.find('option'),
            selectOptionLength = selectOption.length,
            selectedOption = selectOption.filter(':selected'),
            duration = 450; // длительность анимации 
    
        _this.hide();
        _this.wrap('<div class="select"></div>');
        $('<div>', {
            class: 'new-select',
            text: _this.children('option:disabled').text()
        }).insertAfter(_this);
    
        const selectHead = _this.next('.new-select');
        $('<div>', {
            class: 'new-select__list'
        }).insertAfter(selectHead);
    
        const selectList = selectHead.next('.new-select__list');
        for (let i = 1; i < selectOptionLength; i++) {
            $('<div>', {
                class: 'new-select__item',
                html: $('<span>', {
                    text: selectOption.eq(i).text()
                })
            })
            .attr('data-value', selectOption.eq(i).val())
            .appendTo(selectList);
        }
    
        const selectItem = selectList.find('.new-select__item');
        selectList.slideUp(0);
        selectHead.on('click', function() {
            if ( !$(this).hasClass('on') ) {
                $(this).addClass('on');
                selectList.slideDown(duration);
    
                selectItem.on('click', function() {
                    let chooseItem = $(this).data('value');
    
                    $('select').val(chooseItem).attr('selected', 'selected');
                    selectHead.text( $(this).find('span').text() );
    
                    selectList.slideUp(duration);
                    selectHead.removeClass('on');
                });
    
            } else {
                $(this).removeClass('on');
                selectList.slideUp(duration);
            }
        });
    });
    // select


    /////////////////////////////////modal

// Получить модальный
let modal = document.querySelector('#modal')
let superModal = document.querySelectorAll('.super-modal')

// Получить элемент <span>, который закрывает модальный
let span = document.getElementsByClassName("close")[0];

// Когда пользователь нажимает на кнопку, откройте модальный
// for (const btn of btns) {
//     btn.addEventListener('click', function(event) {
//         event.preventDefault()
//         if (document.documentElement.clientWidth < 840){
//             $('.menu__mobile').slideToggle()
//             $('.header__menu-hamburger').toggleClass('active')
//         }
//         modal.style.display = "block";
//     })
// }


for (let box of superModal){
    box.addEventListener('click', function(event) {
        event.preventDefault()
        if (event.target.classList.value == 'header__login'){
            document.querySelector('.login__title').textContent = 'Вход'
            document.querySelector('.creat-acc').style.visibility = 'visible'
            if (document.documentElement.clientWidth < 840){
                $('.menu__mobile').slideToggle()
                $('.header__menu-hamburger').toggleClass('active')
            }
            modal.style.display = "block";
        }
        if (event.target.classList.value == 'header__register'){
                document.querySelector('.login__title').textContent = 'Регистрация'
                document.querySelector('.creat-acc').style.visibility = 'hidden'
                if (document.documentElement.clientWidth < 840){
                    $('.menu__mobile').slideToggle()
                    $('.header__menu-hamburger').toggleClass('active')
                }
                modal.style.display = "block";
        }
    })
}

// Когда пользователь нажимает на <span> (x), закройте модальное окно
span.onclick = function() {
  modal.style.display = "none";
}

// Когда пользователь щелкает в любом месте за пределами модального, закройте его
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


/////////////////////////////////modal
})


////////////////////////////////////////////////player///////////////////////////////////////////
const player = document.querySelector('.player'),
      playBtn = document.querySelector('.player__btn-play'),
      prevBtn = document.querySelector('.player__btn-prev'),
      nextBtn = document.querySelector('.player__btn-next'),
      audio = document.querySelector('.player__audio'),
      imgSrc = document.querySelector('.player__btn-play__img')

const songs = [
                'music', 'music1',
                'music2', 'music3',
                'music4', 'music5',
                'music6'
            ]

let songIndex = 0

function loadSong(song){
    audio.src = `audio/${song}.mp3`
}

loadSong(songs[songIndex])

function playSong(){
    player.classList.add('play')
    imgSrc.src = './images/pause.svg'
    audio.play()
}

function pauseSong(){
    player.classList.remove('play')
    imgSrc.src = './images/play.svg'
    audio.pause()
}

playBtn.addEventListener('click', ()=>{
    const isPlaying = player.classList.contains('play')
    if (isPlaying){
        pauseSong()
    }
    else {
        playSong()
    }
})

function nextSong(){
    songIndex++
    if (songIndex > songs.length - 1){
        songIndex = 0
    }
    loadSong(songs[songIndex])
    playSong()
}

nextBtn.addEventListener('click', nextSong)

function prevSong(){
    songIndex--
    if (songIndex < 0){
        songIndex = songs.length - 1
    }
    loadSong(songs[songIndex])
    playSong()
}

prevBtn.addEventListener('click', prevSong)

audio.addEventListener('ended', nextSong)

////////////////////////////////////////////////player end///////////////////////////////////////////

const animItems = document.querySelectorAll('._anim-items')
if (animItems.length > 0){
    window.addEventListener('scroll', animOnScroll)
    function animOnScroll(){
        for (let i = 0; i < animItems.length; i++) {
            const animItem = animItems[i]
            const animItemHeight = animItem.offsetHeight
            const animItemOffset = offset(animItem).top
            const animStart = 4
            let animItemPoint = window.innerHeight - animItemHeight / animStart

            if (animItemHeight >= window.innerHeight){
                animItemPoint = window.innerHeight - window.innerHeight / animStart
            }
            
            if ((pageYOffset >= animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)){
                animItem.classList.add('_active')
            }
            else {
                if (!animItem.classList.contains('_anim-no-hide')){
                    animItem.classList.remove('_active')
                }
            }
        }
    }
    function offset(el){
        const rect = el.getBoundingClientRect(),
            scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
            scrollTop = window.pageYOffset || document.documentElement.scrollTop
        return {top: rect.top + scrollTop, left: rect.left + scrollLeft}
    }
    setTimeout(()=>{
        animOnScroll()
    }, 300)
}


let likeBtn = document.querySelector('.blog-detail__navigation-top__like')
if (likeBtn){
    likeBtn.addEventListener('click', function(event){
        let checkBtn = event.target.classList.contains('blog-detail__navigation-top__like')
        if (checkBtn){
            let checkClass = likeBtn.classList.contains('active');
            if (checkClass){
                likeBtn.classList.remove('active')
            }
            else {
                likeBtn.classList.add('active')
            }
        }
    })
}

let favoriteBtn = document.querySelectorAll('.job-list__item-right__like')
if (favoriteBtn){
    for (let obj of favoriteBtn){
        if (obj){
            obj.addEventListener('click', function(event){
                event.preventDefault()
                let isActive = obj.classList.contains('active')
                if(isActive){
                    obj.classList.remove('active')
                }
                else {
                    obj.classList.add('active')
                }
            })
        }    
    }
}

