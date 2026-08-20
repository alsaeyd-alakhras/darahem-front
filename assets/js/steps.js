// ============================================================
// SECTION: Steps Preview Reveal
// Handles: independent sequential reveals for internal concepts
// ============================================================

$(document).ready(function () {
  var trackSelectors = ['#steps-track-1', '#steps-track-2', '#steps-track-3'];
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function getSequence($track) {
    return $track
      .find('.steps-preview-item, .steps-preview-line-fill, .steps-preview-path-fill')
      .get()
      .sort(function (a, b) {
        return Number($(a).data('sequence')) - Number($(b).data('sequence'));
      });
  }

  function revealNode(node) {
    var $node = $(node);

    if ($node.hasClass('steps-preview-item')) {
      $node.addClass('is-active');
      return;
    }

    $node.addClass('is-filled');
  }

  function revealAll($track) {
    getSequence($track).forEach(revealNode);
  }

  function playTrack($track) {
    if ($track.data('has-played')) return;
    $track.data('has-played', true);

    if (reduceMotion) {
      revealAll($track);
      return;
    }

    var STEP_RISE_MS = 500;
    var LINE_DRAW_MS = 700;
    var t = 0;

    getSequence($track).forEach(function (node) {
      window.setTimeout(function () {
        revealNode(node);
      }, t);

      t += $(node).hasClass('steps-preview-item') ? STEP_RISE_MS : LINE_DRAW_MS;
    });
  }

  trackSelectors.forEach(function (selector) {
    var $track = $(selector);

    if (!$track.length) return;

    if (reduceMotion || !('IntersectionObserver' in window)) {
      revealAll($track);
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          playTrack($track);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.24, rootMargin: '0px 0px -40px 0px' });

    observer.observe($track[0]);
  });
});
