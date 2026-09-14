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
