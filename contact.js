/* ============================================================
   CONTACT PAGE — contact.js
   Form validation & submission handling
   ============================================================ */
(function () {
  'use strict';

  function validate(form) {
    let valid = true;

    const fields = [
      { id: 'fname',   msg: 'First name is required.' },
      { id: 'lname',   msg: 'Last name is required.' },
      { id: 'email',   msg: 'A valid email is required.' },
      { id: 'service', msg: 'Please select a project type.' },
      { id: 'message', msg: 'Please describe your project.' },
    ];

    fields.forEach(({ id, msg }) => {
      const input  = document.getElementById(id);
      const error  = document.getElementById(`${id}-error`);
      const group  = input?.closest('.form-group');
      if (!input) return;

      let fieldValid = input.value.trim() !== '';
      if (id === 'email') {
        fieldValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim());
      }

      if (!fieldValid) {
        if (error)  error.textContent = msg;
        if (group)  group.classList.add('error');
        valid = false;
      } else {
        if (error)  error.textContent = '';
        if (group)  group.classList.remove('error');
      }
    });

    return valid;
  }

  function initForm() {
    const form    = document.getElementById('contact-form');
    const success = document.getElementById('form-success');
    const btn     = form?.querySelector('.form-submit');
    if (!form) return;

    // Live clear errors on input
    form.querySelectorAll('input, select, textarea').forEach(el => {
      el.addEventListener('input', () => {
        const group = el.closest('.form-group');
        const error = form.querySelector(`#${el.id}-error`);
        if (group) group.classList.remove('error');
        if (error) error.textContent = '';
      });
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!validate(form)) return;

      // Simulate submission
      btn.disabled = true;
      btn.querySelector('.btn-text').textContent = 'SENDING…';

      await new Promise(r => setTimeout(r, 1500));

      form.style.display = 'none';
      success.classList.remove('hidden');
    });
  }

  /* Input focus gold border animation */
  function initInputEffects() {
    document.querySelectorAll('input, select, textarea').forEach(el => {
      el.addEventListener('focus', () => {
        el.style.boxShadow = '0 0 0 2px rgba(201,168,76,0.15)';
      });
      el.addEventListener('blur', () => {
        el.style.boxShadow = '';
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initForm();
    initInputEffects();
  });
})();
