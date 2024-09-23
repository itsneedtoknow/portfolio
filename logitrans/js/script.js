
// Cкролл для прокручивания вверх
jQuery(document).ready(function () {
  jQuery(window).scroll(function () {
    if (jQuery(this).scrollTop() > 200) {
      jQuery(".scrollUp").fadeIn();
    } else {
      jQuery(".scrollUp").fadeOut();
    }
  });
  // scroll body to 0px on click
  jQuery(".scrollUp").click(function () {
    jQuery("body,html").animate(
      {
        scrollTop: 0,
      },
      0
    );
    return false;
  });
});

// слайдеры
$('.about .slider').slick({
    infinite: true,
    slidesToShow: 1,
    autoplay: true,
    slidesToScroll: 1,
    easing: 'ease',
    arrows: true,
  });
  $('.products .banner-links').slick({
    infinite: true,
    slidesToShow: 2,
    autoplay: true,
    slidesToScroll: 2,
    easing: 'ease',
    arrows: true,
    responsive:[
      {
        breakpoint: 870,
        settings:{
          slidesToShow: 1,
          slidesToScroll: 1,
        }
    }]
  });

  $('.services .services__list').slick({
    infinite: true,
    slidesToShow: 3,
    autoplay: true,
    slidesToScroll: 1,
    easing: 'ease',
    arrows: true,
    responsive:[
      {
        breakpoint: 992,
        settings:{
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
        {
          breakpoint: 620,
          settings:{
            slidesToShow: 1,
            slidesToScroll: 1,
          }
    }]
  });
  $('.activities .achievements__list').slick({
    infinite: true,
    slidesToShow: 1,
    autoplay: true,
    slidesToScroll: 1,
    easing: 'ease',
    arrows: true,
  });
  $('.partners .partners__list').slick({
    infinite: true,
    slidesToShow: 6,
    autoplay: true,
    slidesToScroll: 1,
    easing: 'ease',
    arrows: false,
    dots: true,
    responsive:[
      {
        breakpoint: 1340,
        settings:{
          slidesToShow: 5,
        }
      },
        {
          breakpoint: 1160,
          settings:{
            slidesToShow: 4,
          }
    },
    {
      breakpoint: 870,
      settings:{
        slidesToShow: 3,
      }
    },
    {
      breakpoint: 640,
      settings:{
        slidesToShow: 1,
      }
    },
   ]
  });
  $('.gallery-slider').slick({
    infinite: true,
    slidesToShow: 1,
    autoplay: true,
    slidesToScroll: 1,
    easing: 'ease',
    arrows: true
  });

// Яндекс Карта (использован API ключ с сайта https://roo.mozyrroo.by/)
  ymaps.ready(init);

    function init() {
        var myMap = new ymaps.Map ('myMap', {
            center: [53.889219, 28.034168],
            zoom: 9
        });
        var mainOffice = new ymaps.Placemark([53.907435, 27.509100], {
          
            balloonContentBody: [
                '<div class="map__item">',
                '<p class="item__header">',
                'Главный офис ЛогиТранс',
                '</p>',
                '<p class="address">',
                'Республика Беларусь,  г. Минск, 220085, Рокоссовского 107',
                '</p>',
                '<p class="phone">',
                '+375 (17) 222-22-22',
                '</p>',
                '<p class="email">',
                'logitrans@logitrans.by',
                '</p>',
                '</div>'
            ].join('')
        },
           {
            preset: 'twirl#greenIcon'
        });
        var productionOffice = new ymaps.Placemark([53.812507, 28.842065], { 
            balloonContentBody: [
                '<div class="map__item">',
                '<p class="item__header">',
                'Склад Логитранс',
                '</p>',
                '<p class="address">',
                'Минская область, Березинский район',
                '</p>',
                '<p class="phone">',
                '+375 (17) 222-22-22',
                '</p>',
                '<p class="email">',
                'logitrans@logitrans.by',
                '</p>',
                '</div>'
            ].join('')
        }, {
            preset: 'twirl#greenIcon'
        });
        myMap.geoObjects.add(mainOffice)
                        .add(productionOffice);
        if(window.innerWidth < 640){
          myMap.setZoom(9);
          myMap.setCenter([53.830219, 28.224168]);
        };
        if(window.innerWidth < 540){
          myMap.setZoom(8);
        }
    }
    

    document.addEventListener('DOMContentLoaded', function(){

      // КАЛЕНДАРЬ СОБЫТИЙ
      if(document.querySelector('#calendar')){
        var calendarEl = document.getElementById('calendar');
    
      var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        locale: 'ru',
        height: 280,
        contentHeight: 250,
        headerToolbar: {
          
          left: 'title ',
          center: 'customDateButton',
          right: 'prev next'
        },
        titleFormat: { year: 'numeric', month: 'long' },
        
        customButtons: {
          
            // Добавление выпадающего меню для выбора месяца
            customDateButton: {
             
              click: function () {
                
                $('#datepicker').datepicker('show');
              }
          }
      
         

        },
        eventClick: function(info) {
          if (info.event.url) {
              window.location = info.event.url;
          }
      },
        initialView: 'dayGridMonth',
        events: [
          {
            title: 'Круглый стол по теме «2024 – Год качества в республике Беларусь: работы по стандартизации в сфере автомобильных дорог»',
            start: '2024-07-15',
            display: 'background',
            url: 'event-details.html'
          },
          {
            title: 'Мероприятие 2',
            start: '2024-07-20',
            display: 'background',
             href: 'event-details.html',
            url: 'event-details.html'
          }
        ],

        eventDidMount: function(info) {
          
          tippy(info.el, {
            content: `${info.event.title}`, // Include the event title as a clickable link
            allowHTML: true, // Allow HTML content in the tooltip
            placement: 'bottom',
            appendTo: document.body,
            interactive: true,
            onMount(instance) {
              // Add a click event listener to the tooltip content (link)
              instance.popper.querySelector('.tippy-content').addEventListener('click', function(event) {
                  event.stopPropagation(); // Prevent the tooltip from closing when clicking the link
                  window.open(info.event.url); // Open the link in a new tab
              });
          }
            
          });
          
        },
        
        
      });
    
      calendar.render();
      
      calendar.updateSize();

      $(function () {
        // Initialize the date picker
        $('#datepicker').datepicker({
          changeMonth: true,
          changeYear: true,
          showOtherMonths: true,
          selectOtherMonths: true,
          dateFormat: 'yy-mm-dd', // Ensures the date format matches what FullCalendar expects
          
          onSelect: function (dateText) {
            // When a date is selected, change FullCalendar to that date
            var date = new Date(dateText);
            calendar.gotoDate(date);
          },
        });
       
      });
      
 /* Russian (UTF-8) initialisation for the jQuery UI date picker plugin. */
 ( function( factory ) {
  "use strict";

  if ( typeof define === "function" && define.amd ) {

    // AMD. Register as an anonymous module.
    define( [ "../widgets/datepicker" ], factory );
  } else {

    // Browser globals
    factory( jQuery.datepicker );
  }
} )( function( datepicker ) {
"use strict";

    datepicker.regional.ru = {
      closeText: "Закрыть",
      prevText: "Пред",
      nextText: "След",
      currentText: "Сегодня",
      monthNames: [ "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
      "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь" ],
      monthNamesShort: [ "Янв", "Фев", "Мар", "Апр", "Май", "Июн",
      "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек" ],
      dayNames: [ "воскресенье", "понедельник", "вторник", "среда", "четверг", "пятница", "суббота" ],
      dayNamesShort: [ "вск", "пнд", "втр", "срд", "чтв", "птн", "сбт" ],
      dayNamesMin: [ "Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб" ],
      weekHeader: "Нед",
      dateFormat: "dd.mm.yy",
      firstDay: 1,
      isRTL: false,
      showMonthAfterYear: false,
      yearSuffix: "" };
    datepicker.setDefaults( datepicker.regional.ru );

    return datepicker.regional.ru;

} );

    }

      //ОТКРЫТИЕ МОДАЛЬНЫХ ОКОН
      let modalWindows = document.querySelectorAll('.modal');
      let openModalBtn = document.querySelectorAll('.open-modal');
      let closeModalBtn = document.querySelectorAll('.close-modal');

      openModalBtn.forEach(button => {
      button.addEventListener('click', () => {
          const modalId = button.getAttribute('data-modal');
          const modal = document.getElementById(modalId);
          modal.querySelector('.close-modal').setAttribute('data-modal', modalId);
          
          modal.classList.add('open');
          modal.style.opacity = '1';
          document.querySelector('.overlay').classList.add('open');
          document.body.classList.add('modal-open');
      });



      // Закрытие модального окна
      closeModalBtn.forEach(button => {
      button.addEventListener('click', () => {
          const modalId = button.getAttribute('data-modal');
          const modal = document.getElementById(modalId);

          modal.style.opacity = '0';
          setTimeout(() => {
            modal.classList.remove('open');
            document.querySelector('.overlay').classList.remove('open');
            document.body.classList.remove('modal-open');
        }, 300); 
          

          
    });


      // Закрытие модального окна при клике вне его
    window.addEventListener('click', (event) => {
      
      modalWindows.forEach(modal => {
          if (event.target === document.querySelector('.overlay')) {
            modal.style.opacity = '0';
          setTimeout(() => {
            modal.classList.remove('open');
            document.querySelector('.overlay').classList.remove('open');
            document.body.classList.remove('modal-open');
        }, 300); 
          }
      });
  });
});
      });
      
    }
    )


    // МОБИЛЬНАЯ ФОРМА ПОИСКА
    let searchBtn = document.querySelector('.btn-search');
    let searchform = document.querySelector('.search');



    function checkWidth() {
      let windowWidth = jQuery("body").innerWidth();

      if (windowWidth < 992) {
        // перепозиционирование формы поиска в мобильной версии
        document.querySelector('.mobile-search').appendChild(searchform);
        searchform.querySelector('button').textContent = 'Искать';
        searchform.classList.add('mobile');
        // searchform.style.left='-9999px';

        
        // динамическое позиционирование внизу бокового меню внутренних страниц в мобильной версии
          if(document.querySelector('.grid-and-form') || document.querySelector('.lenta-and-form')){

            document.querySelector('.content-wrapper').style.flexWrap = 'wrap';
          }
          if(document.querySelector('.lenta-and-form')){

              let sideMenu = document.querySelector('.menu-sidebar');
              sideMenu.style.position = 'absolute';
              sideMenu.style.bottom = '0';
              sideMenu.style.right = '16px';
              sideMenu.style.left = '16px';
              let sideMenuHeight = sideMenu.getBoundingClientRect();
              let lentaContentNotMenu = document.querySelector('.lenta-and-form');
              lentaContentNotMenu.style.paddingBottom = sideMenuHeight.height +  "px";

            }

        
        
      }else{
         // перепозиционирование формы поиска в десктопной версии
        searchform.classList.remove('mobile')
        searchform.querySelector('button').textContent = '';
        // searchform.style.left = '0';
        document.querySelector('.social').after(searchform);

// динамическое позиционирование внизу бокового меню внутренних страниц в десктопной версии
      if(document.querySelector('.grid-and-form') || document.querySelector('.lenta-and-form')){

        document.querySelector('.content-wrapper').style.flexWrap = 'nowrap';
      }
      if(document.querySelector('.lenta-and-form')){

          let sideMenu = document.querySelector('.menu-sidebar');
          sideMenu.style.position = 'initial';
        }

      }

    }
    checkWidth(); 

    jQuery(window).resize(function () {
      checkWidth();
    });

  

// МОБИЛЬНОЕ МЕНЮ 

let mobileMenuBtn = document.querySelector('.hamburger-menu');
let mobileMenu = document.querySelector('.nav-menu');


mobileMenuBtn.addEventListener('click',function(){

  // $('.nav-menu').animate({width:'toggle'}, 50);
  mobileMenu.classList.add('open');
  document.querySelector('.overlay').classList.add('open');
  document.body.classList.add('menu-open');

});


$(document).click(function(event) {

  if (event.target.classList.contains('overlay')) {

      // $('.nav-menu').animate({width:'toggle'}, 50);
      $('.nav-menu').removeClass('open');
      $('.overlay').removeClass('open');
      $('body').removeClass('menu-open');
  }
});

// мобильное меню

  let navMenuBtns = document.querySelectorAll('svg');

  //  let dropDownMenu = document.querySelectorAll('.nav-menu-item');

  navMenuBtns.forEach((btn)=>{
    
    btn.addEventListener('click',function(){
      
      if(btn.closest('.drop-down')){
        if(btn.closest('.drop-down').querySelector('.drop-down-menu').classList.contains('open')){
          btn.closest('.drop-down').classList.remove('open')
          btn.closest('.drop-down').querySelector('.drop-down-menu').classList.remove('open');
          
        }else if(!btn.closest('.drop-down').querySelector('.drop-down-menu').classList.contains('open')){
          btn.closest('.drop-down').querySelector('.drop-down-menu').classList.add('open')
          btn.closest('.drop-down').classList.add('open');
          
        }
      
    }
    
  })
  })




// открытие мобильной формы поиска
searchBtn.addEventListener('click',function(){
  searchBtn.classList.add('hidden');
  searchform.querySelector('.search-form').classList.add('open');
})

// закрытие мобильной формы поиска
  jQuery(document).on("click", function (e) {
    if (!jQuery(e.target).closest(searchBtn).length && !jQuery(e.target).closest(".search").length) {
      searchBtn.classList.remove('hidden');
      searchform.querySelector('.search-form').classList.remove('open');
  }
  })
















