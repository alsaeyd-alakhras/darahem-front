// ============================================================
// SECTION: Reading Progress Bar
// Handles: scroll progress through the article body
// ============================================================

$(document).ready(function () {
  const $article = $("article").first();

  if (!$article.length) return;

  const $progress = $("<div></div>")
    .addClass("fixed top-0 inset-x-0 h-1 bg-g-green z-[60]")
    .width("0%");

  $("body").append($progress);

  function updateProgress() {
    const articleTop = $article.offset().top;
    const articleHeight = $article.outerHeight();
    const scrollTop = $(window).scrollTop();
    const windowHeight = $(window).height();
    const progressStart = articleTop;
    const progressEnd = Math.max(articleTop + articleHeight - windowHeight, progressStart + 1);
    const rawProgress = ((scrollTop - progressStart) / (progressEnd - progressStart)) * 100;
    const progress = Math.max(0, Math.min(100, rawProgress));

    $progress.css("width", progress + "%");
  }

  $(window).on("scroll resize", updateProgress);
  updateProgress();
});
