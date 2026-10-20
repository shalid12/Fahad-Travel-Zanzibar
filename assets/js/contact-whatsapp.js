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
    if (get('interest')) lines.push('Interested in: ' + get('interest'));
    lines.push('', 'Trip ideas: ' + get('message'));

    const url = 'https://wa.me/255695368917?text=' + encodeURIComponent(lines.join('\n'));
    const opened = window.open(url, '_blank');
    if (opened) {
      opened.opener = null;
    } else {
      window.location.assign(url);
    }
  });
});
