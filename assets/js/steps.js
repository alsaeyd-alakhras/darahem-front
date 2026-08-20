// steps.js
// ============================================================
// SECTION: Steps Preview Page — Sequential Reveal
// Handles: independent scroll-triggered reveal per concept track
// ============================================================

$(document).ready(function () {
  var trackIds = ['#steps-track-1', '#steps-track-2', '#steps-track-3'];
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var itemSelector = '.card-step, .rail-stop, .ring-step';
  var connectorSelector = '.row-arrow-fill, .col-connector-fill, .rail-fill, .rail-fill-v, .ring-row-connector';

  function getSequence($track) {
    return $track
      .find(itemSelector + ', ' + connectorSelector)
      .get()
      .sort(function (a, b) {
        return parseFloat($(a).data('sequence')) - parseFloat($(b).data('sequence'));
      });
  }

  function revealNode(node) {
    var $node = $(node);
    $node.addClass($node.is(itemSelector) ? 'is-active' : 'is-filled');
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

    var STEP_MS = 180;
    var t = 0;

    getSequence($track).forEach(function (node) {
      window.setTimeout(function () {
        revealNode(node);
      }, t);
      t += STEP_MS;
    });
  }

  trackIds.forEach(function (id) {
    var $track = $(id);
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
    }, { threshold: 0.2, rootMargin: '0px 0px -60px 0px' });

    observer.observe($track[0]);
  });
});
