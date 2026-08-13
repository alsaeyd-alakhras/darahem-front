// ============================================================
// SECTION: Card Scroll Reveal
// Handles: staggered entrance for blog article cards
// ============================================================

$(document).ready(function () {

  var $cards = $(".blog-card");

  if (!("IntersectionObserver" in window)) {
    $cards.addClass("reveal-on-scroll revealed");
    return;
  }

  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        $(entry.target).addClass("revealed");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });

  $cards.each(function (i) {
    $(this)
      .addClass("reveal-on-scroll")
      .css("transition-delay", (i % 4) * 90 + "ms");
    obs.observe(this);
  });

});


// ============================================================
// SECTION: Blog Search
// Handles: filtering article cards from hero search input
// ============================================================

$(document).ready(function () {
  $("#blog-search").on("input", function () {
    const query = $(this).val().trim().toLowerCase();

    $(".blog-card").each(function () {
      const text = $(this).text().toLowerCase();
      $(this).toggleClass("hidden", query.length > 0 && !text.includes(query));
    });
  });
});
