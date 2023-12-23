let burger = document.querySelector('.header__burger');
let menu = document.querySelector('.header__menu');


function toggleBurger() {
   burger.addEventListener('click', function () {
      burger.classList.toggle('active');
      menu.classList.toggle('active');
      document.body.classList.toggle('lock');
   })
};

toggleBurger();

// Прокрутка
const menuLinks = document.querySelectorAll('.header__link[data-goto]');
if (menuLinks.length > 0) {
   menuLinks.forEach(menuLink => {
      menuLink.addEventListener("click", onMenuLinkClick);
   });

   function onMenuLinkClick(e) {
      const menuLink = e.target;
      if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
         const gotoBlock = document.querySelector(menuLink.dataset.goto);
         const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;

         if (burger.classList.contains('active')) {
            document.body.classList.remove('lock');
            burger.classList.remove('active');
            menu.classList.remove('active');
         }

         window.scrollTo({
            top: gotoBlockValue,
            behavior: "smooth"
         });
         e.preventDefault();
      }
   }
}

// Изменение фона header при скроле
document.addEventListener("scroll", function () {
   const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
   const header = document.querySelector(".header");
   const headerHeight = document.querySelector(".header__body").offsetHeight;

   if (scrollTop >= headerHeight) {
      header.style.backgroundColor = "#14213d";
   } else {
      header.style.backgroundColor = "transparent";
   }
});

// Пользователь отправляет видео 1. Отслеживание отправки формы; 2.Проверка длительности видео; 3.Отправка запроса на сервер только если видео не более 15сек и пользователь еще не загружал видео сегодня
document.getElementById('try__upload-form').addEventListener('submit', function (event) {
   event.preventDefault(); // Отменяем стандартное поведение формы (не обновляем страницу)

   const videoFile = document.getElementById('try__video-file').files[0];
   const messageDiv = document.getElementById('try__message');

   // Проверка наличия выбранного файла
   if (!videoFile) {
      messageDiv.textContent = 'Пожалуйста, выберите видео для загрузки.';
      return;
   }

   // Проверка длительности видео (не более 15 секунд)
   const videoDuration = videoFile.duration;
   if (videoDuration > 15) {
      messageDiv.textContent = 'Длительность видео не должна превышать 15 секунд.';
      return;
   }

   // Отправка данных на сервер (загрузка видео)
   const formData = new FormData();
   formData.append('video', videoFile);

   fetch('/upload-video', {
      method: 'POST',
      body: formData
   })
      .then(response => response.json())
      .then(data => {
         // Обработка ответа от сервера (data содержит информацию о загрузке, например, успешно ли загружено видео)
         // Очистка формы, вывод сообщений, обновление информации о доступности загрузки и т. д.
      })
      .catch(error => {
         // Обработка ошибок при отправке запроса на сервер
      });
});
