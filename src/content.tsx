import "./tiktok-bio";
import { SigiStateI } from "./interfaces/sigi_state";
import { createLoadingUI, getSpinner } from "./utils";

declare global {
  interface Window {
    SIGI_STATE: SigiStateI;
  }
}

function showLoadingUI() {
  const userBio = document.querySelector("[data-e2e=user-bio]");
  if (!userBio) return console.log("NO user bio found unable to render UI");

  const spinner = getSpinner();

  const parent = userBio.parentNode;
  const container = createLoadingUI(spinner);
  parent?.insertBefore(container, userBio);
}

// Tiktok caches previously seen users
// so we need to remove the previously rendered stats component
// this only happens on route change like clicking usernames from
// discover pane or individual user vides.
// hard page loads like when searching users don't trigger this
function removeCachedComponent() {
  const cachedEl = document.getElementById("buzzlytics-stats-component");
  if (cachedEl) {
    cachedEl.remove();
  }
}
function main() {
  console.log("BUZZLYTICS EXTENSION RUNNING");
  removeCachedComponent();
  showLoadingUI();
  window.setTimeout(() => {
    const script = document.createElement("script");
    script.setAttribute("src", chrome.runtime.getURL("src/tiktok-bio.ts.js"));
    (document.head || document.documentElement).appendChild(script);
    script?.parentNode?.removeChild(script);
  }, 100);
}

// Tiktok is an SPA so changing routes doesn't trigger hard page loads.
// That means our content script can only run once.
// By listening in on DOM mutations we can check if the URL has changed
// and only then trigger our script.
function addLocationObserver(callback: () => void) {
  const config = { attributes: true, childList: true, subtree: true };
  const observer = new MutationObserver(callback);
  observer.observe(document.body, config);
}

let prevUrl = "";
function observerCallback() {
  if (
    prevUrl !== window.location.href &&
    window.location.href.includes("tiktok.com/@") &&
    // We don't want to render when there are other path parameters
    !window.location.pathname.split("/")[2]
  ) {
    prevUrl = window.location.href;
    setTimeout(() => {
      main();
    }, 1000);
  }
}

addLocationObserver(observerCallback);
observerCallback();

export {};
