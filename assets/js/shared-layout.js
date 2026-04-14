;(function () {
  function getBasePath() {
    var currentScript = document.currentScript;
    if (!currentScript) {
      return "";
    }

    var src = currentScript.getAttribute("src") || "";
    var marker = "assets/js/shared-layout.js";
    var markerIndex = src.lastIndexOf(marker);

    return markerIndex === -1 ? "" : src.slice(0, markerIndex);
  }

  function isRelativeUrl(value) {
    return value &&
      !/^(?:[a-z]+:|\/\/|#|\/)/i.test(value) &&
      !value.startsWith("data:");
  }

  function prefixRelativeUrls(fragment, basePath) {
    fragment.querySelectorAll("[href], [src], [action]").forEach(function (node) {
      ["href", "src", "action"].forEach(function (attribute) {
        var value = node.getAttribute(attribute);
        if (isRelativeUrl(value)) {
          node.setAttribute(attribute, basePath + value);
        }
      });
    });
  }

  function injectFragment(target, html, basePath) {
    var template = document.createElement("template");
    template.innerHTML = html.trim();
    prefixRelativeUrls(template.content, basePath);
    target.replaceWith(template.content);
  }

  function initSharedOffcanvasMenu() {
    if (!window.jQuery) {
      return;
    }

    var $ = window.jQuery;
    var $offcanvasNav = $(".vl-offcanvas-menu nav");
    var $sourceMenu = $(".vl-mobile-menu-active > ul").first();

    if (!$offcanvasNav.length || !$sourceMenu.length) {
      return;
    }

    $offcanvasNav.empty().append($sourceMenu.clone());
    $offcanvasNav.find("button.vl-menu-close").remove();

    if ($offcanvasNav.find(".sub-menu, .vl-mega-menu").length !== 0) {
      $offcanvasNav
        .find(".sub-menu, .vl-mega-menu")
        .parent()
        .append('<button class="vl-menu-close"><i class="fas fa-chevron-right"></i></button>');
    }

    $(".vl-offcanvas-toggle, .vl-offcanvas-close-toggle, .vl-offcanvas-overlay").off(".sharedLayout");
    $(".vl-offcanvas-menu nav").off(".sharedLayout");

    $(".vl-offcanvas-menu nav").on(
      "click.sharedLayout",
      "> ul > li button.vl-menu-close, ul li.has-dropdown > a",
      function (event) {
        event.preventDefault();
        var $item = $(this).parent();
        var $submenu = $(this).siblings(".sub-menu, .vl-mega-menu");

        if (!$item.hasClass("active")) {
          $item.addClass("active");
          $submenu.stop(true, true).slideDown();
        } else {
          $submenu.stop(true, true).slideUp();
          $item.removeClass("active");
        }
      }
    );

    $(".vl-offcanvas-toggle").on("click.sharedLayout", function () {
      $(".vl-offcanvas").addClass("vl-offcanvas-open");
      $(".vl-offcanvas-overlay").addClass("vl-offcanvas-overlay-open");
    });

    $(".vl-offcanvas-close-toggle, .vl-offcanvas-overlay").on("click.sharedLayout", function () {
      $(".vl-offcanvas").removeClass("vl-offcanvas-open");
      $(".vl-offcanvas-overlay").removeClass("vl-offcanvas-overlay-open");
    });
  }

  async function loadSharedLayout() {
    var headerTarget = document.querySelector('[data-shared-layout="header"]');
    var footerTarget = document.querySelector('[data-shared-layout="footer"]');

    if (!headerTarget && !footerTarget) {
      return;
    }

    var basePath = getBasePath();
    var response = await fetch(basePath + "index.html");

    if (!response.ok) {
      throw new Error("Failed to load shared layout from index.html");
    }

    var html = await response.text();
    var parser = new DOMParser();
    var sharedDocument = parser.parseFromString(html, "text/html");
    var sharedHeader = sharedDocument.querySelector("#site-shared-header");
    var sharedFooter = sharedDocument.querySelector("#site-shared-footer");

    if (headerTarget && sharedHeader) {
      injectFragment(headerTarget, sharedHeader.innerHTML, basePath);
    }

    if (footerTarget && sharedFooter) {
      injectFragment(footerTarget, sharedFooter.outerHTML, basePath);
    }

    initSharedOffcanvasMenu();
    document.dispatchEvent(new CustomEvent("shared-layout:ready", { detail: { basePath: basePath } }));
  }

  window.sharedLayoutReady = loadSharedLayout().catch(function (error) {
    console.error(error);
  });
})();
