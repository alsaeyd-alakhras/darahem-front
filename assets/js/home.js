// ============================================================
// SECTION: Billing Toggle
// Handles: monthly/yearly switch and price updates
// ============================================================

$(document).ready(function () {
  const prices = {
    monthly: { pro: "12", team: "24" },
    yearly:  { pro: "8.3", team: "16.7" },
  };

  $(".pricing-billing-toggle").on("click", function () {
    const mode = $(this).data("billing");

    $(".pricing-billing-toggle")
      .removeClass("bg-white text-g-purple shadow")
      .addClass("text-white/80");

    $(this)
      .removeClass("text-white/80")
      .addClass("bg-white text-g-purple shadow");

    $(".pricing-save-badge").toggleClass("bg-white/25 text-white", mode !== "yearly");
    $(".pricing-save-badge").toggleClass("bg-g-green-lt/15 text-g-green-lt", mode === "yearly");

    $(".pricing-price").each(function () {
      const plan = $(this).data("plan");
      if (plan && prices[mode][plan] !== undefined) {
        $(this).text(prices[mode][plan]);
      }
    });
  });
});



// ============================================================
// SECTION: FAQ Accordion
// Handles: expand/collapse with exclusive open (one at a time)
// ============================================================

$(document).ready(function () {
  function closeItem($item) {
    $item.find(".pricing-faq-answer").slideUp(180, function () { $(this).addClass("hidden"); });
    $item
      .removeClass("border-2 border-g-navy hover:shadow-md")
      .addClass("border border-g-border");
    $item.attr("data-faq-open", "false");
    $item.find(".pricing-faq-icon")
      .removeClass("bg-g-navy/10")
      .addClass("bg-g-light2");
    $item.find(".pricing-faq-icon-minus").addClass("hidden");
    $item.find(".pricing-faq-icon-plus").removeClass("hidden");
  }

  function openItem($item) {
    $item.find(".pricing-faq-answer").hide().removeClass("hidden").slideDown(180);
    $item
      .removeClass("border border-g-border")
      .addClass("border-2 border-g-navy");
    $item.attr("data-faq-open", "true");
    $item.find(".pricing-faq-icon")
      .removeClass("bg-g-light2")
      .addClass("bg-g-navy/10");
    $item.find(".pricing-faq-icon-minus").removeClass("hidden");
    $item.find(".pricing-faq-icon-plus").addClass("hidden");
  }

  $(".pricing-faq-trigger").on("click", function () {
    const $item = $(this).closest(".pricing-faq-item");
    const isOpen = $item.attr("data-faq-open") === "true";

    // close all others first
    $(".pricing-faq-item[data-faq-open='true']").not($item).each(function () {
      closeItem($(this));
    });

    if (isOpen) {
      closeItem($item);
    } else {
      openItem($item);
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
// SECTION: How It Works - Process Rail Sequential Reveal
// Handles: scroll-triggered sequential stop reveal with rail fill draw
// ============================================================

$(document).ready(function () {
  var $stepsTrack = $('#steps-track');

  if (!$stepsTrack.length) return;

  var hasPlayed = false;
  var $stops = $stepsTrack.find('.rail-stop');
  var $railFill = $stepsTrack.find('.rail-fill');
  var $railFillV = $stepsTrack.find('.rail-fill-v');
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function revealAllSteps() {
    $stops.addClass('is-active');
    $railFill.addClass('is-filled');
    $railFillV.addClass('is-filled');
  }

  function playStepsSequence() {
    if (hasPlayed) return;
    hasPlayed = true;

    if (reduceMotion) {
      revealAllSteps();
      return;
    }

    var STOP_RISE_MS = 160; // stagger between each stop lighting up

    $railFill.addClass('is-filled');
    $railFillV.addClass('is-filled');

    $stops.each(function (index) {
      var stop = this;
      window.setTimeout(function () {
        $(stop).addClass('is-active');
      }, index * STOP_RISE_MS);
    });
  }

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealAllSteps();
    return;
  }

  var stepsObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        playStepsSequence();
        stepsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  stepsObserver.observe($stepsTrack[0]);
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
    '.problem-solution-row',
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
