var lunbo = function() {
    console.log('lunbo is load');
    var lunbocss = `
        <style>
            // html {
            //     font-family: Microsoft YaHei;
            //     color: rgb(200, 200, 200);
            //     text-align: center;
            // }
            .container {
                width: 600px;
                height: 400px;
                position: absolute;
                left: 50%;
                top:50%;
                transform: translate(-50%,-50%);
                font-family: Microsoft YaHei;
                color: rgb(200, 200, 200);
                text-align: center;
            }
            .imgs {
                width: 600px;
                height: 400px;
                overflow: hidden;
                margin: 0 auto;;
            }
            .container img {
                width: 100%;
                height: 100%;
                display: none;
            }
            .button-change {
                background: rgba(0, 0, 0, 0.418);
                border: none;
                color: white;
                outline: none;
                width: 25px;
                height:70px;
                font-size: 26px;
                position: absolute;
                transform: translateY(-50%);
                display: none;
            }
            .button-left {
                top:50%;
                left:0;
            }
            .button-right {
                top:50%;
                right:0;
            }
            .button-change:hover {
                cursor: pointer;
                background: rgba(0, 0, 0, 0.8);
            }
            .imgs-active {
                display: block;
            }
            .slide-i {
                position: relative;
                width: 20px;
                height: 20px;
                font-size: 15px;
                background: rgba(0, 0, 0, 0.6);
                display: inline-block;
                border-radius: 50%;
                bottom: 30px;
                cursor: pointer;
                color:white;
            }
            .slide-i-active {
                background: rgba(255, 0, 0, 0.5);
            }
        </style>
    `
    $('head').append(lunbocss)
    var lunbohtml = `
            <div class="imgs" data-active='0' data-imgs='5'>
                <img class="imgs-img imgs-active" src="image/轮播图1.jpg" >
                <img class="imgs-img" src="image/轮播图2.jpg" >
                <img class="imgs-img" src="image/轮播图3.jpg" >
                <img class="imgs-img" src="image/轮播图4.jpg" >
                <img class="imgs-img" src="image/轮播图5.jpg" >
            </div>
            <div class="buttons">
                <button class="button-change button-left" type="button" name="button"><</button>
                <button class="button-change button-right" type="button" name="button">></button>
            </div>
            <div class="slide-indicators">
                <div class="slide-i slide-i-active">1</div>
                <div class="slide-i">2</div>
                <div class="slide-i">3</div>
                <div class="slide-i">4</div>
                <div class="slide-i">5</div>
            </div>
    `
    $('.container').append(lunbohtml)
    // 移入移出显示按钮
    $('.container').on('mouseover', function() {
        $('.button-change').css('display', 'block')
    })
    $('.container').on('mouseout', function() {
        $('.button-change').css('display', 'none')
    })
    // 点击切换图片
    var play = function(offset) {
        var activeIndex = $('.imgs').data('active')
        var numberOfImgs = $('.imgs').data('imgs')
        var i = (activeIndex + numberOfImgs + offset) % numberOfImgs
        $('.imgs').data('active',i)
        //
        $('.imgs-active').fadeOut()
        $('.imgs-active').removeClass('imgs-active')
        //
        var active = $($('.imgs-img')[i])
        active.addClass('imgs-active')
        active.fadeIn()
        // 改变指示器
        $('.slide-i-active').removeClass('slide-i-active')
        var activeIndicator = $($('.slide-i')[i])
        activeIndicator.addClass('slide-i-active')
    }
    var playPrev = function() {
        play(-1)
    }
    var playNext = function() {
        play(1)
    }
    $('.button-change').on('click',function(event) {
        var button = $(event.target)
        if (button.hasClass('button-left')) {
            playPrev()
        } else {
            playNext()
        }
    })
    $('.container').on('mouseover', function() {
        times = window.clearInterval(times)
    })
    $('.container').on('mouseout', function() {
        times = setInterval(function() {
            $('.button-right').click()
        },2000)
    })
    $('.slide-i').mouseover(function(event){
        var indicator = $(event.target)
        // 取出当前坐标，即为图片应该播放的图片
        var index = indicator.index()
        $('.slide-i-active').removeClass('slide-i-active')
        indicator.addClass('slide-i-active')
        // 使相应图片显示
        var imgCurrent = $('.imgs-active')
        imgCurrent.fadeOut()
        imgCurrent.removeClass('imgs-active')
        var imgNext = $($('.imgs-img')[index])
        imgNext.addClass('imgs-active')
        imgNext.fadeIn()
    })
    $('.button-right').click()
}
lunbo()
