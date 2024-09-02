const movingButton = document.querySelector(".moving-button");//достаем кнопку 
const ball = document.querySelector(".ball");// достаем див с "шариком(лого)"
const ballWrapper = document.querySelector(".ball-wrapper");//достаем див чтобы ограничить движение лого 
const ballWrapperWidth = ballWrapper.clientWidth; // используем clientWidth для получения ширины
const ballWrapperHeight = ballWrapper.clientHeight; // используем clientHeight для получения высоты
const ballWidth = ball.offsetWidth;
const ballHeight = ball.offsetHeight;//достаем ширину и высоту логотипа
const timeCheck = document.querySelector(".end-time");//достаем куда будем показывать время между нажатиями 

let lastClickTime = 0; // Время последнего нажатия
const minInterval = 3000;//интервал нажатия - если дольше трех секунд - вы проиграли 

//функция для движения лого
function moveLogo() {
  const halfBallWidth = ballWidth / 2;
  const halfBallHeight = ballHeight / 2;
  // расчет допустимых координат
  let posX = Math.random() * (ballWrapperWidth - ballWidth) + halfBallWidth; // ограничение по X
  let posY = Math.random() * (ballWrapperHeight - ballHeight) + halfBallHeight; // ограничение по Y
  // изменяем стиль в зависимости от posX и posY
  ball.style.left = posX - halfBallWidth + "px"; // задаем позицию лого по оси Х
  ball.style.top = posY - halfBallHeight + "px"; // по оси У
}

movingButton.addEventListener("click", () => {
  const currentTime = Date.now(); // Получаем текущее время в миллисекундах

  // Если это первое нажатие, просто сохраняем текущее время
  if (lastClickTime === 0) {
    moveLogo();
    lastClickTime = currentTime;
    timeCheck.innerText = "Первое нажатие";
  } else {
    // Вычисляем временной интервал между нажатиями
    const timeDiff = currentTime - lastClickTime;

    if (timeDiff <= minInterval) {
      moveLogo();
      timeCheck.innerText = `Время между нажатиями: ${timeDiff} мс`; // Выводим время между нажатиями 
      lastClickTime = currentTime; // Обновляем время последнего нажатия
    } else if (timeDiff >= minInterval) {
      timeCheck.style = "color:red";
      timeCheck.innerText = "Вы проиграли";
    }
  }
});
