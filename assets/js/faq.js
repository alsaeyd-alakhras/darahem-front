// ============================================================
// SECTION: FAQ Accordion
// Handles: expanding FAQ items
// ============================================================

$(document).ready(function () {
  $(".faq-page-trigger").on("click", function () {
    const $item = $(this).closest(".faq-page-item");
    const $answer = $item.find(".faq-page-answer");
    const $icon = $item.find(".faq-page-icon");
    const isOpen = !$answer.hasClass("hidden");

    if (isOpen) {
      $answer.slideUp(180, function () {
        $(this).addClass("hidden");
      });
      $item.removeClass("bg-g-mint-soft border-s-4 border-g-green-lt").addClass("bg-white");
      $icon.removeClass("rotate-180");
      return;
    }

    $answer.hide().removeClass("hidden").slideDown(180);
    $item.addClass("bg-g-mint-soft border-s-4 border-g-green-lt").removeClass("bg-white");
    $icon.addClass("rotate-180");
  });
});


// ============================================================
// SECTION: FAQ Search
// Handles: filtering questions from hero search input
// ============================================================

$(document).ready(function () {
  $("#faq-search").on("input", function () {
    const query = $(this).val().trim().toLowerCase();

    $(".faq-page-item").each(function () {
      const text = $(this).text().toLowerCase();
      $(this).toggleClass("hidden", query.length > 0 && !text.includes(query));
    });

    $(".faq-page-section").each(function () {
      const hasVisibleItems = $(this).find(".faq-page-item:not(.hidden)").length > 0;
      $(this).toggleClass("hidden", !hasVisibleItems);
    });
  });
});
