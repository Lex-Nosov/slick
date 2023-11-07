/* ВНИМАНИЕ!!! Если слайдер находится внутри флек-элемента либо же сам является флекс - элементом
тогда ОБЯЗАТЕЛЬНО для этого флекс элемента нужно указать параметр min-width: 0; Иначе слайдер 
работать не будет */

// =================== Самое необходимое для работы слайдера ======================= //

// Подключаем слайдер
$('.slider').slick({
	arrows: false,
});

/* Стили SCSS
///////////// Лента слайдов 
.slick-track{
	display: flex;
}
.slick-list {
	overflow: hidden;
}
.slick-slide{
	margin-right: 16px;
}
*/

// ============================= Все опции слайдера ================================ //

$(document).ready(function () {
	$('.slider').slick({
		arrows: true, // Показывать стрелки. По умолчанию true
		dots: true, // Показывать точки. По умолчанию false
		adaptiveHeight: true, // Адаптивная высота слайдера. По умолчанию false
		slidesToShow: 3, // Количество слайдов которое нужно отобразить за раз
		slidesToScroll: 1, // Количество слайдов которое будет пролистываться
		speed: 1000, // Скорость пролистывания. По умолчанию 300ms
		easing: 'linear', // Тип анимации при смене слайда. По умолчанию 'linear'
		infinite: true, // Бесконечность слайда. По умолчанию true
		initialSlide: 0, // Стартовый слайд. По умолчанию 0
		autoplay: false, // Автовоспроизведение. По умолчанию false
		autoplaySpeed: 3500, // Скорость автовоспроизведения
		pauseOnFocus: true, // Пауза при фокусе на слайд
		pauseOnHover: true, // Пауза при наведении на слайд
		pauseOnDotsHover: true, // Пауза при наведении на точку слайда
		draggable:false, // Перелистывание мышкой. По умолчанию true
		swipe: true, // Свайп (на телефонах). По умолчанию true
		touchThreshold: 5, // Длинна свайпа (расстояние проведенное пальцем, для срабатывания свайпа)
		touchMove: true, // Запретить перелистывание на телефонах (исключение: кнопки, точки)
		waitForAnimate: true, // Если быстро кликаем на перелистывание то быстрее не будет.
		centerMode: false, // Слайд становится по центру.
		variableWidth: false, // Картинки одна за другой без отступов между ними
		rows: 1, // Количество рядов в одном слайде
		slidesPerRow: 1, // Количество одновременно отображаемых рядов
		vertical: false, // Вертикальное положение слайдера
		verticalSwiping: false, // Вертикальный свайп
		asNavFor: ".sliderbig", // Связываем слайдеры. Указываем с кем нужно связаться
		responsive:[ // Позволяет задавать брэйкпоинты для слайдера
			{ 
				breakpoint: 768, // Указываем ширину экрана при которой срабатывает брэйкпоинт
				settings: {
					slidesToShow: 2
				}
			},{ 
				breakpoint: 480, // Указываем ширину экрана при которой срабатывает брэйкпоинт
				settings: {
					slidesToShow: 1
				}
			}
		],
		mobileFirst: false, // Меняет брэйкпоинты наоборот. С max-width на min-width
		// appendArrows: $('.content'), // Позволяет переместить кнопки управления в указанный блок
		// appendDots: $('.content'), // Позволяет переместить точки управления в указанный блок
	});

	$('.sliderbig').slick({
		arrows: false,
		fade: true, // Слайды не перелистываются, а заменяются затемнением
		asNavFor: ".slider"
	});

	// ---------------------------------------------------------------------
	// Slick так-же поддерживает работу с событиями, подробно у них на сайте
	// ---------------------------------------------------------------------

	// Функция ниже выводит в консоль index следующего слайда, до перелистывания
	$('.slider').on('beforeChange', function(event, slick, currentSlide, nextSlide) {
		console.log(nextSlide);
	});

	// Функция ниже выводит в консоль index текущего слайда, после перелистывания
	$('.slider').on('beforeChange', function(event, slick, currentSlide) {
		console.log(currentSlide);
	});

	// ---------------------------------------------------------------------
	// Slick так-же поддерживает работу с методами, подробно у них на сайте
	// ---------------------------------------------------------------------

	/* Метод ниже, перезагружает слайдер. Нужно это например при случае когда
	его родитель например был в состоянии display: none а стал в состояние 
	display: block, тогда слайдеру нужно пересчитать все свои величины. */
	$('.slider').slick('setPosition');

	$('.slider').slick('goTo', 3); // Позволяет пролиснуть до указанного слайда
	$('.slider').slick('slickPrev'); // Позволяет пролиснуть на следующий слайд
	$('.slider').slick('slickNext'); // Позволяет пролиснуть на предыдущий слайд
	$('.slider').slick('slickPlay'); // Включаем автопрокрутку слайдов
	$('.slider').slick('slickPause'); // Ставим автопрокрутку слайдов на паузу


	$(".link_add").click(function(){
		$('.slider').slick('slickAdd', '<div class="newSlide">123</div>');
		// Добавляем контент в наш слайдер при клике на кнопочку .link_add
		return false; // Нужно для того чтобы страничка не перезагружалась
	});

	$(".link_remove").click(function(){
		$('.slider').slick('slickRemove', 0);
		// Удаляем слайд по индексу при клике на кнопочку .link_remove
		return false;
	});

	// Функция ниже позволяет отфильтровать слайды пу указанному классу (.filter)
	var filtered = false;
	$(".link_filter").click(function(){
		if(filtered === false){
			$('.slider').slick('slickFilter', '.filter'); // Фильтруем
			$(this).text('Убрать фильтр');
			filtered = true;
		}else{
			$('.slider').slick('slickUnfilter'); // Отменяем фильтровку
			$(this).text('Фильтровать');
			filtered = false;
		}
		return false; // Нужно для того чтобы страничка не перезагружалась
	});

	// ---------------------------------------------------------------------
	// Slick так-же может узнавать и задавать значения своих параметров
	// ---------------------------------------------------------------------

	var s = $('.slider').slick('slickGetOption', 'slidesToShow');
	console.log(s); // Узнаем текущий параметр slidesToShow

	// Задаем параметр slidesToShow = 2
	$('.slider').slick('slickSetOption', 'slidesToShow', 2);

	// $('.slider').slick('unslick'); // Отключаем слайдер полностью
});


/* Слайдер */
.slick-slider{}
/* Слайдер запущен */
.slick-slider.slick-initialized{}
/* Слайдер с точками */
.slick-slider.slick-dotted{}
/* Ограничивающая оболочка */
.slick-list {}
/* Лента слайдов */
.slick-track{}
/* Слайд */
.slick-slide{}
/* Слайд активный (показывается) */
.slick-slide.slick-active{}
/* Слайд основной */
.slick-slide.slick-current{}
/* Слайд по центру */
.slick-slide.slick-center{}
/* Клонированный слайд */
.slick-slide.slick-cloned{}
/* Стрелка */
.slick-arrow{}
/* Стрелка влево */
.slick-arrow.slick-prev{}
/* Стрелка вправо */
.slick-arrow.slick-next{}
/* Стрелка не активная */
.slick-arrow.slick-disabled{}
/* Точки (булиты) */
.slick-dots{}
.slick-dots li{}
/* Активная точка */
.slick-dots li.slick-active{}
/* Элемент точки */
.slick-dots li button{}
