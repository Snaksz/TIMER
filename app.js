(function () {
  "use strict";

  var form = document.getElementById("timer-form");
  var minutesInput = document.getElementById("minutes");
  var secondsInput = document.getElementById("seconds");
  var startBtn = document.getElementById("start");
  var pauseBtn = document.getElementById("pause");
  var resetBtn = document.getElementById("reset");
  var display = document.getElementById("display");
  var status = document.getElementById("status");

  var remaining = 0;
  var endTime = 0;
  var intervalId = null;
  var running = false;

  function pad(n) {
    return n < 10 ? "0" + n : String(n);
  }

  function render(ms) {
    var total = Math.max(0, Math.ceil(ms / 1000));
    var m = Math.floor(total / 60);
    var s = total % 60;
    display.textContent = pad(m) + ":" + pad(s);
  }

  function tick() {
    var now = Date.now();
    var ms = endTime - now;
    if (ms <= 0) {
      render(0);
      stop();
      status.textContent = "Time is up.";
      status.classList.add("done");
      return;
    }
    render(ms);
  }

  function stop() {
    if (intervalId !== null) {
      clearInterval(intervalId);
      intervalId = null;
    }
    running = false;
    startBtn.textContent = "Start";
    pauseBtn.disabled = true;
  }

  function start(ms) {
    endTime = Date.now() + ms;
    remaining = ms;
    render(ms);
    intervalId = setInterval(tick, 250);
    running = true;
    startBtn.textContent = "Resume";
    pauseBtn.disabled = false;
    status.textContent = "Running.";
    status.classList.remove("done");
  }

  form.addEventListener("submit", function (ev) {
    ev.preventDefault();
    if (running) return;
    if (remaining > 0) {
      start(remaining);
      return;
    }
    var m = parseInt(minutesInput.value, 10) || 0;
    var s = parseInt(secondsInput.value, 10) || 0;
    var ms = (m * 60 + s) * 1000;
    if (ms <= 0) {
      status.textContent = "Set a time first.";
      return;
    }
    start(ms);
  });

  pauseBtn.addEventListener("click", function () {
    if (!running) return;
    remaining = Math.max(0, endTime - Date.now());
    stop();
    status.textContent = "Paused.";
  });

  resetBtn.addEventListener("click", function () {
    stop();
    remaining = 0;
    var m = parseInt(minutesInput.value, 10) || 0;
    var s = parseInt(secondsInput.value, 10) || 0;
    render((m * 60 + s) * 1000);
    status.textContent = "Ready.";
    status.classList.remove("done");
  });

  minutesInput.addEventListener("input", function () {
    if (!running && remaining === 0) {
      var m = parseInt(minutesInput.value, 10) || 0;
      var s = parseInt(secondsInput.value, 10) || 0;
      render((m * 60 + s) * 1000);
    }
  });
  secondsInput.addEventListener("input", function () {
    if (!running && remaining === 0) {
      var m = parseInt(minutesInput.value, 10) || 0;
      var s = parseInt(secondsInput.value, 10) || 0;
      render((m * 60 + s) * 1000);
    }
  });
})();
