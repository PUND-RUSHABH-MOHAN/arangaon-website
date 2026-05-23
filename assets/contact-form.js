/**
 * contact-form.js — Arangaon Grampanchayat
 * Handles contact form submission.
 * Extracted from inline script to allow removal of CSP unsafe-inline.
 */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    var btn = document.getElementById("submit-btn");
    if (btn) {
      btn.addEventListener("click", submitContactForm);
    }
  });

  async function submitContactForm() {
    var nameEl    = document.getElementById("contact-name");
    var emailEl   = document.getElementById("contact-email");
    var messageEl = document.getElementById("contact-message");
    var btn       = document.getElementById("submit-btn");
    var success   = document.getElementById("form-success");
    var error     = document.getElementById("form-error");

    var name    = nameEl    ? nameEl.value.trim()    : "";
    var email   = emailEl   ? emailEl.value.trim()   : "";
    var message = messageEl ? messageEl.value.trim() : "";

    var turnstileInput = document.querySelector('[name="cf-turnstile-response"]');
    var turnstileToken = turnstileInput ? turnstileInput.value : "";

    if (success) success.style.display = "none";
    if (error)   error.style.display   = "none";

    if (!name || !email || !message) {
      alert("Please fill in all fields before sending.");
      return;
    }
    if (!email.includes("@") || !email.includes(".")) {
      alert("Please enter a valid email address.");
      return;
    }
    if (name.length > 100) {
      alert("Name is too long.");
      return;
    }
    if (message.length > 2000) {
      alert("Message is too long (max 2000 characters).");
      return;
    }
    if (!turnstileToken) {
      alert("Please complete the security check.");
      return;
    }

    if (btn) {
      btn.textContent = "Sending…";
      btn.disabled    = true;
    }

    try {
      var response = await fetch("https://api.arangaon.org/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, turnstileToken }),
      });

      if (!response.ok) throw new Error("Server error: " + response.status);

      var result = await response.json();

      if (result.success) {
        if (success) success.style.display = "block";
        if (nameEl)    nameEl.value    = "";
        if (emailEl)   emailEl.value   = "";
        if (messageEl) messageEl.value = "";
        if (typeof turnstile !== "undefined") turnstile.reset();
      } else {
        if (error) error.style.display = "block";
        if (typeof turnstile !== "undefined") turnstile.reset();
      }
    } catch (err) {
      if (error) error.style.display = "block";
      if (typeof turnstile !== "undefined") turnstile.reset();
    }

    if (btn) {
      btn.textContent = "Send Message";
      btn.disabled    = false;
    }
  }
})();
