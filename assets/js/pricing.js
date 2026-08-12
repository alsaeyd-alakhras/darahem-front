// ============================================================
// SECTION: Billing Toggle
// Handles: monthly/yearly switch and price updates
// ============================================================

$(document).ready(function () {
  const prices = {
    monthly: { pro: "18", team: "29" },
    yearly:  { pro: "14", team: "23" },
  };

  $(".pricing-billing-toggle").on("click", function () {
    const mode = $(this).data("billing");

    $(".pricing-billing-toggle")
      .removeClass("bg-g-navy text-white shadow")
      .addClass("text-g-body");

    $(this)
      .removeClass("text-g-body")
      .addClass("bg-g-navy text-white shadow");

    $(".pricing-save-badge").toggleClass("bg-g-lime/15 text-g-green", mode !== "yearly");
    $(".pricing-save-badge").toggleClass("bg-white/15 text-white", mode === "yearly");

    $(".pricing-price").each(function () {
      const plan = $(this).data("plan");
      if (plan && prices[mode][plan] !== undefined) {
        $(this).text(prices[mode][plan]);
      }
    });

    $(".pricing-old-price").each(function () {
      const plan = $(this).data("plan");
      if (plan && prices.monthly[plan] !== undefined) {
        $(this).text(prices.monthly[plan] + "$");
      }
    });

    $(".pricing-save-line").toggleClass("hidden", mode !== "yearly").toggleClass("flex", mode === "yearly");
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
    const $item  = $(this).closest(".pricing-faq-item");
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
