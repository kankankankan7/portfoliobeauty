/* =========================================================
   animation.js
   既存サイトに GSAP + ScrollTrigger でマイクロインタラクションを追加
   方向性：余白を活かした上品さ / さりげなく上質
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {
  // GSAP本体が読めていなければ何もしない（安全策）
  if (typeof gsap === "undefined") return;

  // モーション軽減を希望するユーザーには一切アニメーションしない
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  if (reduceMotion) return;

  // ScrollTrigger 登録
  if (typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
  }

  // JSが動くことをCSSに伝える（初期opacity:0を有効化）
  document.documentElement.classList.add("gsap-ready");

  // 共通設定（上品にまとめるための統一値）
  const EASE = "power3.out";
  const DUR = 0.8;
  const isMobile = window.matchMedia("(max-width: 784px)").matches;
  // モバイルでは横スライド量を抑える
  const SLIDE = isMobile ? 0 : 60;

  const q = (sel) => document.querySelector(sel);
  const qa = (sel) => gsap.utils.toArray(sel);

  /* ---------------------------------------------------------
     1. メインビジュアル（Ken Burns風）＋ スローガン
     --------------------------------------------------------- */
  const mainImg = q(".main-visual img");
  if (mainImg) {
    gsap.fromTo(
      mainImg,
      { scale: 1.08 },
      { scale: 1.0, duration: isMobile ? 4 : 5.5, ease: "power2.out" }
    );
  }

  const sloganEls = qa(".slogan h1, .slogan h2");
  if (sloganEls.length) {
    gsap.fromTo(
      sloganEls,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: DUR,
        ease: EASE,
        stagger: 0.2,
        delay: 0.5,
      }
    );
  }

  /* ---------------------------------------------------------
     2. VISION（見出し・本文フェードアップ）
     --------------------------------------------------------- */
  const visionEls = qa(".vision-wrapper h1, .vision-wrapper p");
  if (visionEls.length) {
    gsap.fromTo(
      visionEls,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: DUR,
        ease: EASE,
        stagger: 0.15,
        scrollTrigger: { trigger: ".vision-wrapper", start: "top 80%" },
      }
    );
  }

  /* ---------------------------------------------------------
     3. MESSAGE（左右からスライドイン・交互）
     --------------------------------------------------------- */
  // container1：画像が左から / テキストが右から
  const c1img = q(".container1 img");
  const c1txt = q(".container1 .message-text1");
  if (c1img && c1txt) {
    gsap.fromTo(
      c1img,
      { opacity: 0, x: -SLIDE },
      {
        opacity: 1,
        x: 0,
        duration: DUR,
        ease: EASE,
        scrollTrigger: { trigger: ".container1", start: "top 80%" },
      }
    );
    gsap.fromTo(
      c1txt,
      { opacity: 0, x: SLIDE },
      {
        opacity: 1,
        x: 0,
        duration: DUR,
        ease: EASE,
        scrollTrigger: { trigger: ".container1", start: "top 80%" },
      }
    );
  }

  // container2：テキストが左から / 画像が右から（向きを反転）
  const c2txt = q(".container2 .message-text2");
  const c2img = q(".container2 img");
  if (c2txt && c2img) {
    gsap.fromTo(
      c2txt,
      { opacity: 0, x: -SLIDE },
      {
        opacity: 1,
        x: 0,
        duration: DUR,
        ease: EASE,
        scrollTrigger: { trigger: ".container2", start: "top 80%" },
      }
    );
    gsap.fromTo(
      c2img,
      { opacity: 0, x: SLIDE },
      {
        opacity: 1,
        x: 0,
        duration: DUR,
        ease: EASE,
        scrollTrigger: { trigger: ".container2", start: "top 80%" },
      }
    );
  }

  /* ---------------------------------------------------------
     4. SERVICE（3カードを stagger でフェードアップ）
     --------------------------------------------------------- */
  const cards = qa(".circle-wrapper .container");
  if (cards.length) {
    gsap.fromTo(
      cards,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: DUR,
        ease: EASE,
        stagger: 0.15,
        scrollTrigger: { trigger: ".circle-wrapper", start: "top 80%" },
      }
    );
  }

  /* ---------------------------------------------------------
     5. STORY / SUCCESS（時間差でフェードアップ）
     --------------------------------------------------------- */
  const story = q(".story-contents");
  const success = q(".success-contents");
  if (story) {
    gsap.fromTo(
      story,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: DUR,
        ease: EASE,
        scrollTrigger: { trigger: ".story-wrapper", start: "top 75%" },
      }
    );
  }
  if (success) {
    gsap.fromTo(
      success,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: DUR,
        ease: EASE,
        delay: 0.2,
        scrollTrigger: { trigger: ".story-wrapper", start: "top 75%" },
      }
    );
  }

  /* ---------------------------------------------------------
     6. 会社概要（dlを上から順に stagger フェードイン）
     --------------------------------------------------------- */
  const dls = qa(".company-text dl");
  if (dls.length) {
    gsap.fromTo(
      dls,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: EASE,
        stagger: 0.1,
        scrollTrigger: { trigger: ".company-wrapper", start: "top 80%" },
      }
    );
  }

  /* ---------------------------------------------------------
     7. ハンバーガーメニュー：開いたとき li を stagger フェードイン
     --------------------------------------------------------- */
  const menuCheck = document.getElementById("menu-btn-check");
  const menuItems = qa(".menu-content ul li");
  if (menuCheck && menuItems.length) {
    menuCheck.addEventListener("change", function () {
      if (menuCheck.checked) {
        gsap.fromTo(
          menuItems,
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: "power2.out",
            stagger: 0.07,
            delay: 0.15,
          }
        );
      }
    });
  }

  /* ---------------------------------------------------------
     画像読み込み後に位置を再計算（ScrollTriggerのズレ防止）
     --------------------------------------------------------- */
  if (typeof ScrollTrigger !== "undefined") {
    window.addEventListener("load", function () {
      ScrollTrigger.refresh();
    });
  }
});
