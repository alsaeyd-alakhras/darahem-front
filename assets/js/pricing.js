// ============================================================
// SECTION: Pricing
// Handles: billing toggle price updates
// ============================================================

$(document).ready(function () {
  const prices = {
    monthly: {
      starter: "0",
      growth: "18",
      team: "29",
    },
    yearly: {
      starter: "0",
      growth: "14",
      team: "23",
    },
  };

  $(".pricing-billing-toggle").on("click", function () {
    const mode = $(this).data("billing");

    $(".pricing-billing-toggle")
      .removeClass("bg-white text-g-purple shadow-sm")
      .addClass("text-white/90");

    $(this)
      .addClass("bg-white text-g-purple shadow-sm")
      .removeClass("text-white/90");

    $(".pricing-save-badge").toggleClass("hidden", mode !== "yearly");

    $(".pricing-price").each(function () {
      const plan = $(this).data("plan");
      $(this).text(prices[mode][plan]);
    });
  });
});


// ============================================================
// SECTION: FAQ
// Handles: pricing page accordion
// ============================================================

$(document).ready(function () {
  $(".pricing-faq-trigger").on("click", function () {
    const $item = $(this).closest(".pricing-faq-item");
    const $answer = $item.find(".pricing-faq-answer");
    const isOpen = !$answer.hasClass("hidden");

    if (isOpen) {
      $answer.slideUp(180, function () {
        $(this).addClass("hidden");
      });
      $item.removeClass("border-g-navy").addClass("border-g-border2/30");
      $(this).find(".pricing-faq-icon").text("+");
      return;
    }

    $answer.hide().removeClass("hidden").slideDown(180);
    $item.addClass("border-g-navy").removeClass("border-g-border2/30");
    $(this).find(".pricing-faq-icon").text("-");
  });
});
