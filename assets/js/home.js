// ============================================================
// SECTION: Billing Toggle
// Handles: annual ↔ monthly switch, updates displayed prices
// ============================================================

$(document).ready(function () {

  var isMonthly = false;
  var prices = {
    pro:  { annual: '18', monthly: '22' },
    team: { annual: '29', monthly: '36' }
  };

  function updatePrices() {
    var mode = isMonthly ? 'monthly' : 'annual';
    $('#price-pro').text(prices.pro[mode]);

    if (isMonthly) {
      $('#billing-toggle').attr('aria-pressed', 'true');
      $('#toggle-thumb')
        .css({ 'inset-inline-start': '4px', 'inset-inline-end': 'auto' });
      $('#lbl-monthly')
        .removeClass('text-[#44474F] font-normal')
        .addClass('font-bold text-g-navy');
      $('#lbl-annual')
        .removeClass('font-bold text-g-purple')
        .addClass('font-normal text-[#44474F]');
    } else {
      $('#billing-toggle').attr('aria-pressed', 'false');
      $('#toggle-thumb')
        .css({ 'inset-inline-end': '4px', 'inset-inline-start': 'auto' });
      $('#lbl-annual')
        .removeClass('font-normal text-[#44474F]')
        .addClass('font-bold text-g-purple');
      $('#lbl-monthly')
        .removeClass('font-bold text-g-navy')
        .addClass('font-normal text-[#44474F]');
    }
  }

  $('#billing-toggle').on('click', function () {
    isMonthly = !isMonthly;
    updatePrices();
  });

});


// ============================================================
// SECTION: FAQ Accordion
// Handles: expand / collapse items; toggles plus → minus icon
// ============================================================

$(document).ready(function () {

  $('.faq-item').on('click', function () {
    var $item   = $(this);
    var $answer = $item.find('.faq-answer');
    var $vbar   = $item.find('.faq-plus-v');
    var isOpen  = !$answer.hasClass('hidden');

    if (isOpen) {
      $answer.addClass('hidden');
      $vbar.css('opacity', '1');
    } else {
      $answer.removeClass('hidden');
      $vbar.css('opacity', '0');
    }
  });

});


// ============================================================
// SECTION: Hero Floating Cards Animation
// Handles: CSS float animation injected once on load
// ============================================================

$(document).ready(function () {

  if (document.getElementById('g-float-style')) return;

  var style = document.createElement('style');
  style.id = 'g-float-style';
  style.textContent =
    '@keyframes gFloat {' +
    '  0%, 100% { transform: translateY(0px); }' +
    '  50%       { transform: translateY(-8px); }' +
    '}' +
    '[data-float="1"] { animation: gFloat 4s ease-in-out infinite; }' +
    '[data-float="2"] { animation: gFloat 4s ease-in-out infinite 2s; }';
  document.head.appendChild(style);

});


// ============================================================
// SECTION: Card Scroll Reveal (home-specific)
// Handles: staggered entrance for pain-point / feature cards
// ============================================================

$(document).ready(function () {

  if (!('IntersectionObserver' in window)) {
    $('.reveal-on-scroll').addClass('revealed');
    return;
  }

  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        $(e.target).addClass('revealed');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  // Stagger each grid of cards
  var gridSelectors = [
    '.bg-g-light2 .grid > div',
    '#features .grid > div',
    '.bg-g-light .grid.grid-cols-1.md\\:grid-cols-3 > div'
  ];

  gridSelectors.forEach(function (sel) {
    $(sel).each(function (i) {
      $(this)
        .addClass('reveal-on-scroll')
        .css('transition-delay', (i % 4) * 90 + 'ms');
      obs.observe(this);
    });
  });

});
