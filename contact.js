/* ============================================================
   CONTACT PAGE — contact.js
   EmailJS Integration + WhatsApp + Form Validation
   ============================================================
   
   ┌─────────────────────────────────────────────────────────┐
   │  EMAILJS SETUP — Complete these 4 steps once:          │
   │                                                         │
   │  1. Go to https://www.emailjs.com and sign in          │
   │                                                         │
   │  2. Add a Gmail service:                               │
   │     Dashboard → Email Services → Add New Service       │
   │     → Gmail → connect lacastlehomes@gmail.com          │
   │     Copy the Service ID → paste in EMAILJS_SERVICE_ID  │
   │                                                         │
   │  3. Create Template 1 (Notification to you):           │
   │     Dashboard → Email Templates → Create New           │
   │     Subject: New Project Enquiry – {{project_type}}    │
   │     Body:    (copy content from TEMPLATE_NOTIFICATION  │
   │              section below)                            │
   │     To:      lacastlehomes@gmail.com                   │
   │     Copy the Template ID → paste in EMAILJS_TEMPLATE_NOTIFY │
   │                                                         │
   │  4. Create Template 2 (Auto-reply to client):          │
   │     Dashboard → Email Templates → Create New           │
   │     Subject: We received your enquiry – La Castle Homes│
   │     Body:    (copy content from TEMPLATE_AUTOREPLY     │
   │              section below)                            │
   │     To:      {{reply_to}}                              │
   │     From:    La Castle Homes <lacastlehomes@gmail.com> │
   │     Copy the Template ID → paste in EMAILJS_TEMPLATE_REPLY  │
   │                                                         │
   └─────────────────────────────────────────────────────────┘

   ┌─────────────────────────────────────────────────────────┐
   │  TEMPLATE_NOTIFICATION (paste into EmailJS editor):    │
   │                                                         │
   │  Subject: New Project Enquiry – {{project_type}}       │
   │                                                         │
   │  You have a new project enquiry from La Castle Homes   │
   │  contact form.                                          │
   │                                                         │
   │  ─── CLIENT DETAILS ───────────────────────────────    │
   │  Name:         {{full_name}}                           │
   │  Email:        {{reply_to}}                            │
   │  Phone:        {{phone}}                               │
   │  Submitted on: {{submitted_on}}                        │
   │                                                         │
   │  ─── PROJECT DETAILS ──────────────────────────────    │
   │  Project Type: {{project_type}}                        │
   │  Budget Range: {{budget}}                              │
   │                                                         │
   │  ─── MESSAGE ──────────────────────────────────────    │
   │  {{message}}                                           │
   │                                                         │
   │  ─────────────────────────────────────────────────     │
   │  Reply directly to this email to respond to the client.│
   └─────────────────────────────────────────────────────────┘

   ┌─────────────────────────────────────────────────────────┐
   │  TEMPLATE_AUTOREPLY (paste into EmailJS editor):       │
   │                                                         │
   │  Subject: We received your enquiry – La Castle Homes   │
   │                                                         │
   │  Dear {{first_name}},                                  │
   │                                                         │
   │  Thank you for reaching out to La Castle Homes. We     │
   │  have received your enquiry and a senior member of our │
   │  team will contact you within one business day.        │
   │                                                         │
   │  ─── YOUR ENQUIRY SUMMARY ─────────────────────────    │
   │  Project Type: {{project_type}}                        │
   │  Budget Range: {{budget}}                              │
   │  Message:      {{message}}                             │
   │                                                         │
   │  ─── WHAT HAPPENS NEXT ────────────────────────────    │
   │  ✔ Within 24 hours — our team will review your enquiry │
   │  ✔ Free consultation — a 60-min discovery call         │
   │  ✔ Detailed proposal — within 5 business days          │
   │                                                         │
   │  In the meantime, feel free to reach us:               │
   │  📞 +91 95511 16009                                    │
   │  💬 WhatsApp: https://wa.me/919551116009               │
   │  📍 Choolaimedu, Chennai, Tamil Nadu                   │
   │                                                         │
   │  Warm regards,                                         │
   │  The La Castle Homes Team                              │
   │  www.lacastlehomes.com                                 │
   └─────────────────────────────────────────────────────────┘
*/

(function () {
  'use strict';

  /* ──────────────────────────────────────────────
     EMAILJS CONFIGURATION — fill in your IDs here
  ────────────────────────────────────────────── */
  const EMAILJS_PUBLIC_KEY      = 'KVjLILpms2q4KGs_M';
  const EMAILJS_SERVICE_ID      = 'Leader';    // e.g. 'service_abc123'
  const EMAILJS_TEMPLATE_NOTIFY = 'template_dgam0en'; // notification to you
  const EMAILJS_TEMPLATE_REPLY  = 'template_1k9ltlj';  // auto-reply to client

  /* ──────────────────────────────────────────────
     INIT EMAILJS
  ────────────────────────────────────────────── */
  (function initEmailJS() {
    if (typeof emailjs !== 'undefined') {
      emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
    } else {
      console.warn('EmailJS SDK not loaded. Check CDN script in HTML.');
    }
  })();

  /* ──────────────────────────────────────────────
     HELPERS
  ────────────────────────────────────────────── */
  function getVal(id) {
    return (document.getElementById(id)?.value || '').trim();
  }

  function formatDate() {
    return new Date().toLocaleString('en-IN', {
      dateStyle: 'long',
      timeStyle: 'short',
      timeZone: 'Asia/Kolkata'
    });
  }

  /* ──────────────────────────────────────────────
     VALIDATION
  ────────────────────────────────────────────── */
  function validate(form) {
    let valid = true;

    const fields = [
      { id: 'fname',   msg: 'First name is required.' },
      { id: 'lname',   msg: 'Last name is required.' },
      { id: 'email',   msg: 'A valid email address is required.' },
      { id: 'service', msg: 'Please select a project type.' },
      { id: 'message', msg: 'Please describe your project.' },
    ];

    fields.forEach(({ id, msg }) => {
      const input = document.getElementById(id);
      const error = document.getElementById(`${id}-error`);
      const group = input?.closest('.form-group');
      if (!input) return;

      let fieldValid = input.value.trim() !== '';
      if (id === 'email') {
        fieldValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim());
      }

      if (!fieldValid) {
        if (error) error.textContent = msg;
        if (group) group.classList.add('error');
        valid = false;
      } else {
        if (error) error.textContent = '';
        if (group) group.classList.remove('error');
      }
    });

    // Scroll to first error
    if (!valid) {
      const firstError = form.querySelector('.form-group.error input, .form-group.error select, .form-group.error textarea');
      firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    return valid;
  }

  /* ──────────────────────────────────────────────
     SET BUTTON STATE
  ────────────────────────────────────────────── */
  function setButtonState(btn, state) {
    const text    = btn.querySelector('.btn-text');
    const spinner = btn.querySelector('.btn-spinner');
    const arrow   = btn.querySelector('.btn-arrow');

    switch (state) {
      case 'loading':
        btn.disabled = true;
        if (text)    text.textContent = 'SENDING…';
        if (spinner) spinner.classList.remove('hidden');
        if (arrow)   arrow.classList.add('hidden');
        break;
      case 'success':
        btn.disabled = false;
        if (text)    text.textContent = 'SEND MESSAGE';
        if (spinner) spinner.classList.add('hidden');
        if (arrow)   arrow.classList.remove('hidden');
        break;
      case 'error':
        btn.disabled = false;
        if (text)    text.textContent = 'TRY AGAIN';
        if (spinner) spinner.classList.add('hidden');
        if (arrow)   arrow.classList.remove('hidden');
        break;
      default:
        break;
    }
  }

  /* ──────────────────────────────────────────────
     SEND EMAILS VIA EMAILJS
  ────────────────────────────────────────────── */
async function sendEmails(params) {
    if (typeof emailjs === 'undefined') {
      console.error('❌ EmailJS not loaded - Check if CDN script is included in HTML');
      throw new Error('EmailJS not loaded');
    }

    console.log('📧 ========== STARTING EMAIL SEND ==========');
    console.log('📋 Template Parameters:', params);
    console.log('🔑 Service ID:', EMAILJS_SERVICE_ID);
    console.log('📨 Admin Template ID:', EMAILJS_TEMPLATE_NOTIFY);
    console.log('📩 Client Template ID:', EMAILJS_TEMPLATE_REPLY);
    console.log('👤 Client Email being used:', params.email || params.reply_to || params.to_email);
    
    try {
      // 1. Notification email to La Castle Homes team
      console.log('📤 Sending admin notification...');
      const adminResult = await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_NOTIFY, params);
      console.log('✅ Admin notification sent successfully:', adminResult);
      
      // 2. Auto-reply email to the client
      console.log('📤 Sending client auto-reply to:', params.email || params.reply_to);
      const clientResult = await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_REPLY, params);
      console.log('✅ Client auto-reply sent successfully:', clientResult);
      
      console.log('🎉 ========== BOTH EMAILS SENT SUCCESSFULLY ==========');
      
    } catch (err) {
      console.error('❌ ========== EMAIL SEND FAILED ==========');
      console.error('❌ Error details:', err);
      console.error('❌ Error status:', err.status);
      console.error('❌ Error text:', err.text);
      console.error('❌ Full error object:', JSON.stringify(err, null, 2));
      throw err;
    }
}

  // /* ──────────────────────────────────────────────
  //    BUILD TEMPLATE PARAMS
  // ────────────────────────────────────────────── */
  // function buildParams() {
  //   const firstName = getVal('fname');
  //   const lastName  = getVal('lname');
  //   const budgetEl  = document.getElementById('budget');
  //   const budgetVal = budgetEl?.value || '';

  //   return {
  //     first_name:   firstName,
  //     full_name:    `${firstName} ${lastName}`,
  //     reply_to:     getVal('email'),      // EmailJS uses this to set Reply-To
  //     to_email:     getVal('email'),      // auto-reply recipient
  //     phone:        getVal('phone') || 'Not provided',
  //     project_type: getVal('service')    || 'Not specified',
  //     budget:       budgetVal            || 'Not specified',
  //     message:      getVal('message'),
  //     submitted_on: formatDate(),
  //   };
  // }

  function buildParams() {
  const firstName = getVal('fname');
  const lastName  = getVal('lname');
  const budgetEl  = document.getElementById('budget');
  const budgetVal = budgetEl?.value || '';
  const clientEmail = getVal('email');

  return {
    // For template variables
    first_name:   firstName,
    full_name:    `${firstName} ${lastName}`,
    reply_to:     clientEmail,
    to_email:     clientEmail,
    email:        clientEmail,        // ADD THIS - common EmailJS variable
    user_email:   clientEmail,        // ADD THIS - alternative name
    
    // Other fields
    phone:        getVal('phone') || 'Not provided',
    project_type: getVal('service')    || 'Not specified',
    budget:       budgetVal            || 'Not specified',
    message:      getVal('message'),
    submitted_on: formatDate(),
  };
}

  /* ──────────────────────────────────────────────
     FORM INIT
  ────────────────────────────────────────────── */
  function initForm() {
    const form       = document.getElementById('contact-form');
    const successMsg = document.getElementById('form-success');
    const errorMsg   = document.getElementById('form-error-msg');
    const btn        = document.getElementById('submit-btn');
    if (!form || !btn) return;

    /* Live clear errors on input */
    form.querySelectorAll('input, select, textarea').forEach(el => {
      el.addEventListener('input', () => {
        const group = el.closest('.form-group');
        const error = form.querySelector(`#${el.id}-error`);
        if (group) group.classList.remove('error');
        if (error) error.textContent = '';
      });
    });

    /* Submit handler */
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!validate(form)) return;

      // Hide any previous status
      successMsg?.classList.add('hidden');
      errorMsg?.classList.add('hidden');

      setButtonState(btn, 'loading');

      try {
        const params = buildParams();
        await sendEmails(params);

        // Success
        setButtonState(btn, 'success');
        form.reset();
        successMsg?.classList.remove('hidden');
        successMsg?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

      } catch (err) {
        console.error('EmailJS error:', err);
        setButtonState(btn, 'error');
        errorMsg?.classList.remove('hidden');
        errorMsg?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  }

  /* ──────────────────────────────────────────────
     INPUT FOCUS EFFECTS
  ────────────────────────────────────────────── */
  function initInputEffects() {
    document.querySelectorAll('.form-group input, .form-group select, .form-group textarea').forEach(el => {
      el.addEventListener('focus', () => {
        el.style.boxShadow = '0 0 0 3px rgba(201,168,76,0.12)';
      });
      el.addEventListener('blur', () => {
        el.style.boxShadow = '';
      });
    });
  }

  /* ──────────────────────────────────────────────
     WHATSAPP FAB — pulse animation on scroll
  ────────────────────────────────────────────── */
  function initWhatsAppFAB() {
    const fab = document.querySelector('.whatsapp-fab');
    if (!fab) return;

    // Show after 3s with a pulse to draw attention
    setTimeout(() => {
      fab.classList.add('whatsapp-fab--visible');
    }, 3000);
  }

  /* ──────────────────────────────────────────────
     BOOT
  ────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    initForm();
    initInputEffects();
    initWhatsAppFAB();
  });

})();