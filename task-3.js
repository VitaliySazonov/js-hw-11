// Задание 3. Таймер обратного отсчета
// Оформить красиво, сделать в класе (ООП) и это можно прикладывать в резюме.
// Создай плагин настраиваемого таймера, который ведет обратный отсчет до предварительно определенной даты.
// Такой плагин может использоваться в блогах и интернет-магазинах, страницах регистрации событий, во время технического обслуживания и т. д.
// Плагин ожидает следующую HTML-разметку и показывает четыре цифры: дни, часы, минуты и секунды в формате XX:XX:XX:XX.
// Количество дней может состоять из более чем двух цифр.

$(document).ready(() => {
  class Timer {
    constructor(data) {
      this.promotion = Date.now();
      this.timer = $("#timer-1");
      this.calcButton = $("#calc");
      this.id = setInterval(() => this.tm(this.promotion), 1000);
      this.datepicker();
      this.isClick();
      console.log(this.promotion);
    }
    
    datepicker() {
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
    }

    tm(promDate) {
      let now = new Date(),
        distance = promDate - now,
        days = Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds = Math.floor((distance % (1000 * 60)) / 1000);
      if (promDate !== $(".form-control").val())
        this.calcButton.removeAttr("disabled");
      if (promDate < now) {
        this.timer.html(`<div class="time-is-over">Time is OVER</div>`);
        this.id = clearInterval(this.id);
        return;
      }
      this.timer.html(`<div class="field">
        <p class="value" data-value="days"><span>${days}</span> days</p>
        <p class="value" data-value="hours"><span>${hours}</span> hours</p>
        <p class="value" data-value="mins"><span>${minutes}</span> minutes</p>
        <p class="value" data-value="secs"><span>${seconds}</span> seconsds</p>
      </div>`);
    }

    isClick() {
      this.calcButton.on("click", (evt) => {
        $(evt.target).attr("disabled", "disabled");
        let newDate = $(".form-control").val();
        clearInterval(this.id);
        this.id = setInterval(() => this.tm(new Date(newDate)), 1000);
      });
    }
  }
  let inputDate = $(".form-control").val();
  let timer = new Timer(inputDate);
});
