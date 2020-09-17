$(function(){

	function toggleMenu() {
		$('.header-nav__box').toggleClass('visible');
		$('body').toggleClass('no-scroll');
		$('.burger-btn__item:nth-child(1)').toggleClass('burger-btn__item_cross-1');
		$('.burger-btn__item:nth-child(2)').toggleClass('burger-btn__item_cross-2');
		$('.burger-btn__item:nth-child(3)').toggleClass('burger-btn__item_cross-3');
		
	}

	$('.burger-btn').click(function(){
		toggleMenu();
		event.stopPropagation();
	});

	$('body').click(function(){
		if (
			($('.burger-btn').css('display') !== 'none') &&
			($('.header-nav__box').css('left') == '0px')
			//(event.target.className == 'header-nav__link')
			) toggleMenu();	
	});

	$('nav a').click(function(){
		event.preventDefault();
		let href = $(this).attr('href');
			offset = $(href).offset().top;
		$('body, html').animate({
			scrollTop: offset,
		}, 700);
	});

	$(window).scroll(function(){
		if ($(window).scrollTop() >= 300) {
			$('.to-top').fadeIn();
		} else {
			$('.to-top').fadeOut();
		}
	});

	$('.to-top').click(function(){
		$('body, html').animate({
			scrollTop: 0,
		}, 500);
	});

	new Swiper('.slider', {
		slidesPerView: 1,
  		spaceBetween: 20,
  		breakpoints: {
		    700: {
		      slidesPerView: 2,
		      spaceBetween: 40,
		    },
		    1042: {
		      slidesPerView: 3,
		      spaceBetween: 30
		    }
		},
		wrapperClass: 'slider__list',
		slideClass: 'slider__item',
		loop: true,

		pagination: {
			el: '.slider__pagination',
			bulletClass: 'pagination__item',
	    	bulletActiveClass: 'pagination__item_active',
			clickable: true,
		},

		navigation: {
			nextEl: '.slider__button_next',
			prevEl: '.slider__button_prev',
		},

	});

	function disableScroll() {
		document.body.style.top = `-${window.scrollY}px`;
		$('body').addClass('no-scroll');
	}

	function enableScroll() {
		$('body').removeClass('no-scroll');
		const scrollY = document.body.style.top;
		document.body.style.top = '';
		window.scrollTo(0, parseInt(scrollY || '0') * -1);
	}
	
	$('.callback-button, a.button').click(function(){
		event.preventDefault();
		$('.popup-backdrop').fadeIn(disableScroll);
		//document.body.style.top = `-${window.scrollY}px`;
		$('.popup').addClass('popup_visible');
		//$('body').addClass('no-scroll');
	});

	$('input[type="tel"]').mask("+7(999) 999-9999");

	let timerId;

	$('form').submit(function(){
	    // для читаемости кода
	    var $form = $(this);

	    // чистим ошибки
	    //$form.find('.popup__error').remove();
	    $form.find('input[name=Name]').removeClass('error');
	    $form.find('input[name=Phone]').removeClass('error');

	    // проверяем поле с именем пользователя
	    if ($form.find('input[name=Name]').val() === '') {
	        // добавляем текст ошибки
	        //$form.find('input[name=Name]').parents('.popup__input')
	          	//.before('<div class="popup__error">Введите имя</div>');
	        $form.find('input[name=Name]').addClass('error');
	        $('input[name=Name]').focus();
	        // прерываем дальнейшую обработку
	        return false;
	    }

	    // проверяем поле с телефоном пользователя
	    if ($form.find('input[name=Phone]').val() === '') {
	        // добавляем текст ошибки
	        //$form.find('input[name=Phone]').parents('.popup__input')
	          	//.before('<div class="popup__error">Введите телефон</div>');
	        $form.find('input[name=Phone]').addClass('error');
	        $('input[name=Phone]').focus();
	        // прерываем дальнейшую обработку
	        return false;
	    }

	    // всё хорошо – отправляем запрос на сервер
	    $.post(
	        $form.attr('action'), // ссылка куда отправляем данные
	        $form.serialize()     // данные формы
	    );

	    //$('.popup__btn-submit')
	        //.after('<div class="popup__sent">Данные отправлены.</div>');
	    $('.popup__notice').fadeIn();

	    // очищаем форму
	    $('input[name=Name]').val('');
	    $('input[name=Phone]').val('');
	    $('textarea[name=Comment]').val('');

	    setTimeout(function(){
	    	$('.popup__notice').fadeOut();
	    	}, 2000);

	    timerId = setTimeout(function(){
	    	closePopup();
	    	}, 2500);

	    // отключаем действие по умолчанию
	    return false;
	});

	$('input[name=Name], input[name=Phone]').blur(function(){
    	if ($(this).val() !== '') {
        //$(this).parents('form').find('.popup__error').remove();
        $(this).removeClass('error');
    	}
	});

	function closePopup() {
		$('.popup-backdrop').fadeOut(enableScroll);
		$('.popup').removeClass('popup_visible');
		//$('body').removeClass('no-scroll');
		//const scrollY = document.body.style.top;
		//document.body.style.top = '';
		//window.scrollTo(0, parseInt(scrollY || '0') * -1);
		$('input[name=Name]').val('');
	    $('input[name=Phone]').val('');
	    $('textarea[name=Comment]').val('');
	    //$('.popup__error').remove();
	    $('input[name=Name]').removeClass('error');
	    $('input[name=Phone]').removeClass('error');
	    $('.popup__notice').fadeOut();
	    clearTimeout(timerId);
	}

	$('.popup__btn-close').click(closePopup);

	$('.popup-backdrop').click(function(){
		if (event.target == this) {
			closePopup();
		}
	});

});