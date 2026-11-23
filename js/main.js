(function () {
  "use strict";

  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");

  function setNav(open) {
    if (!toggle || !nav) return;
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.body.style.overflow = open ? "hidden" : "";
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      setNav(toggle.getAttribute("aria-expanded") !== "true");
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        setNav(false);
      });
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") setNav(false);
    });

    window.addEventListener("resize", function () {
      if (window.matchMedia("(min-width: 761px)").matches) setNav(false);
    });
  }

  var form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var data = new FormData(form);
      var name = (data.get("name") || "").toString().trim();
      var email = (data.get("email") || "").toString().trim();
      var company = (data.get("company") || "").toString().trim();
      var topic = (data.get("topic") || "").toString().trim();
      var message = (data.get("message") || "").toString().trim();
      var subject = "Unigrity Solutions inquiry" + (topic ? ": " + topic : "");
      var body = [
        "Name: " + name,
        "Email: " + email,
        "Company: " + (company || "—"),
        "Topic: " + (topic || "—"),
        "",
        message
      ].join("\n");
      var href =
        "mailto:contact@unigritysolutions.com?subject=" +
        encodeURIComponent(subject) +
        "&body=" +
        encodeURIComponent(body);
      var status = form.querySelector(".form-status");
      window.location.href = href;
      if (status) {
        status.textContent = "If your email client did not open, write to contact@unigritysolutions.com.";
      }
    });
  }
})();
