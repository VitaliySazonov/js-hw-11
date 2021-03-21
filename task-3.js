// Задание 3. Таймер обратного отсчета
// Оформить красиво, сделать в класе (ООП) и это можно прикладывать в резюме.
// Создай плагин настраиваемого таймера, который ведет обратный отсчет до предварительно определенной даты.
// Такой плагин может использоваться в блогах и интернет-магазинах, страницах регистрации событий, во время технического обслуживания и т. д.
// Плагин ожидает следующую HTML-разметку и показывает четыре цифры: дни, часы, минуты и секунды в формате XX:XX:XX:XX.
// Количество дней может состоять из более чем двух цифр.

$(".date").datetimepicker({
  format: "YYYY-MM-DD HH:mm",
  defaultDate: new Date(),
  locale: "ru",
  icons: {
    time: "glyphicon glyphicon-time",
    date: "glyphicon glyphicon-calendar",
    up: "glyphicon glyphicon-chevron-up",
    down: "glyphicon glyphicon-chevron-down",
  },
});
let inputDate = $(".form-control")
let promotion = new Date(inputDate.val());
let timer = $("#timer-1");
let calcButton = $('#calc')


let id
id = setInterval(() => tm(promotion), 1000);

function tm(promDate) {
  let
    now = new Date(),
    distance = promDate - now,
    days = Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
    seconds = Math.floor((distance % (1000 * 60)) / 1000);
  if (promDate !== $(".form-control").val()) calcButton.removeAttr('disabled')
  if (promDate < now) {
    timer.html(`<div class="time-is-over">Time is OVER</div>`)
    id = clearInterval(id)
    return
  }
  timer.html(`<div class="field">
        <p class="value" data-value="days"><span>${days}</span> days</p>
        <p class="value" data-value="hours"><span>${hours}</span> hours</p>
        <p class="value" data-value="mins"><span>${minutes}</span> hours</p>
        <p class="value" data-value="secs"><span>${seconds}</span> seconsds</p>
      </div>`)
  
}

calcButton.on('click', evt => {
  $(evt.target).attr('disabled', 'disabled')
  let newDate = $(".form-control").val()
  clearInterval(id)
  id = setInterval(() => tm(new Date(newDate)), 1000);
})


