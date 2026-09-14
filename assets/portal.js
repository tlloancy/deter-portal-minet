(function () {
  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  var panels = document.querySelectorAll(".panel");

  function closeAll() {
    panels.forEach(function (panel) {
      panel.hidden = true;
    });
  }

  function openPanel(id) {
    var panel = document.getElementById(id);
    if (!panel) return;
    closeAll();
    panel.hidden = false;
    var closeBtn = panel.querySelector("[data-close]");
    if (closeBtn) closeBtn.focus();
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (event) {
      var id = link.getAttribute("href").slice(1);
      if (!document.getElementById(id) || !document.getElementById(id).classList.contains("panel")) {
        return;
      }
      event.preventDefault();
      openPanel(id);
    });
  });

  document.querySelectorAll("[data-close]").forEach(function (btn) {
    btn.addEventListener("click", closeAll);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") closeAll();
  });

  panels.forEach(function (panel) {
    panel.addEventListener("click", function (event) {
      if (event.target === panel) closeAll();
    });
  });
})();

(function () {
  var root = document.getElementById("singularity");
  if (!root) return;

  var typed = root.querySelector(".singularity-typed");
  if (!typed) return;

  var force = /(?:\?|&)shell=1(?:&|$)/.test(window.location.search);
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) return;
  if (!force) {
    try {
      if (sessionStorage.getItem("deter-shell")) return;
    } catch (e) {}
    if (Math.random() > 0.34) return;
  }

  var message = "wake.\n$> un minet déter.";
  var anchors = [
    ["8%", "11%"],
    ["72%", "10%"],
    ["6%", "18%"],
    ["68%", "16%"],
  ];
  var spot = anchors[Math.floor(Math.random() * anchors.length)];
  root.style.setProperty("--sx", spot[0]);
  root.style.setProperty("--sy", spot[1]);

  var timers = [];
  var audio = new Audio("assets/audio/glitchcat-whatdoyousee.mp3");
  audio.preload = "metadata";
  audio.loop = false;
  var audioTarget = 0.07 + Math.random() * 0.07;
  var audioRaf = 0;
  var unlocked = false;
  var clipHold = 12 + Math.random() * 6;
  var club = document.getElementById("club");

  function later(fn, ms) {
    timers.push(window.setTimeout(fn, ms));
  }

  function randomCue() {
    var d = audio.duration;
    if (!d || !isFinite(d) || d < 3) return 0;
    return Math.random() * Math.max(0, d - clipHold);
  }

  function stopAudio() {
    if (audioRaf) {
      cancelAnimationFrame(audioRaf);
      audioRaf = 0;
    }
    var from = audio.volume;
    var t0 = performance.now();
    function fadeOut(now) {
      var k = Math.min(1, (now - t0) / 700);
      audio.volume = from * (1 - k);
      if (k < 1) audioRaf = requestAnimationFrame(fadeOut);
      else {
        audio.pause();
        audio.currentTime = 0;
        audio.volume = 0;
        audioRaf = 0;
      }
    }
    audioRaf = requestAnimationFrame(fadeOut);
  }

  function wobble(now) {
    if (audio.paused) return;
    audio.volume = Math.max(
      0.03,
      Math.min(0.18, audioTarget + Math.sin(now / 900) * 0.035)
    );
    audioRaf = requestAnimationFrame(wobble);
  }

  function startAudio() {
    if (audioRaf) {
      cancelAnimationFrame(audioRaf);
      audioRaf = 0;
    }
    function go() {
      try {
        audio.currentTime = randomCue();
      } catch (e) {}
      audio.muted = false;
      audio.volume = 0;
      var play = audio.play();
      if (play && play.catch) {
        play.catch(function () {
          document.addEventListener("pointerdown", startAudio, { once: true });
        });
      }
      var t0 = performance.now();
      function fadeIn(now) {
        var k = Math.min(1, (now - t0) / 1100);
        audio.volume = audioTarget * k;
        if (k < 1) audioRaf = requestAnimationFrame(fadeIn);
        else audioRaf = requestAnimationFrame(wobble);
      }
      audioRaf = requestAnimationFrame(fadeIn);
    }
    if (audio.readyState >= 1 && isFinite(audio.duration) && audio.duration > 0) go();
    else audio.addEventListener("loadedmetadata", go, { once: true });
  }

  function unlockAudio() {
    if (unlocked) return;
    unlocked = true;
    audio.volume = 0;
    var play = audio.play();
    if (play && play.then) {
      play
        .then(function () {
          if (!root.classList.contains("is-live")) {
            audio.pause();
            audio.currentTime = 0;
          }
        })
        .catch(function () {});
    }
  }

  ["pointerdown", "keydown"].forEach(function (type) {
    document.addEventListener(type, unlockAudio, { once: true, capture: true });
  });

  function dismiss() {
    timers.forEach(clearTimeout);
    timers = [];
    root.className = "singularity";
    if (club) club.classList.remove("is-on");
    document.body.classList.remove("is-club");
    stopAudio();
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") dismiss();
  });

  var startAt = force ? 700 : 2400 + Math.floor(Math.random() * 2200);

  later(function () {
    try {
      sessionStorage.setItem("deter-shell", "1");
    } catch (e) {}
    root.classList.add("is-live");
    if (club) club.classList.add("is-on");
    document.body.classList.add("is-club");
    if (unlocked) startAudio();
    else {
      var wait = function () {
        if (unlocked) startAudio();
        else later(wait, 200);
      };
      wait();
    }
    later(function () {
      root.classList.add("is-laser");
    }, 420);
    later(function () {
      root.classList.add("is-term");
      var i = 0;
      function tick() {
        typed.textContent = message.slice(0, i);
        i += 1;
        if (i <= message.length) later(tick, 38);
        else root.classList.add("is-done");
      }
      later(tick, 480);
    }, 820);
    later(dismiss, 18000);
  }, startAt);
})();
