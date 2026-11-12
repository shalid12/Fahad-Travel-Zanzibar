document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const values = new FormData(form);
    const get = (key) => String(values.get(key) || '').trim();
    const lines = [
      'Hello Fahad Travel Zanzibar, I would like help planning my trip.',
      '',
      'Name: ' + get('name'),
    ];

    if (get('email')) lines.push('Email: ' + get('email'));
    if (get('travel_dates')) lines.push('Travel dates: ' + get('travel_dates'));
    if (get('travellers')) lines.push('Travellers: ' + get('travellers'));
    const interests = values.getAll('interest').map((interest) => String(interest).trim()).filter(Boolean);
    if (interests.length) lines.push('Interested in: ' + interests.join(', '));
    lines.push('', 'Trip ideas: ' + get('message'));

    const message = lines.join('\n');
    if (event.submitter && event.submitter.value === 'email') {
      const subject = 'Trip enquiry - Fahad Travel Zanzibar';
      const url = 'mailto:fahadtravelzanzibar@gmail.com?subject=' + encodeURIComponent(subject)
        + '&body=' + encodeURIComponent(message);
      window.location.assign(url);
    } else {
      const url = 'https://wa.me/255695368917?text=' + encodeURIComponent(message);
      const opened = window.open(url, '_blank');
      if (opened) {
        opened.opener = null;
      } else {
        window.location.assign(url);
      }
    }
  });
});
