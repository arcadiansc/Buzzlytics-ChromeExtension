import "./test";

declare global {
  interface Window {
    SIGI_STATE: any;
  }
}

function getSpinner() {
  const span = document.createElement("span");
  span.className = "loader";

  const style = document.createElement("style");
  document.head.append(style);
  style.textContent = `.loader {
    width: 20px;
    height: 20px;
    border: 2px solid #000000;
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
    }

    @keyframes rotation {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
    } `;

  return span;
}

function showLoadingUI() {
  const userBio = document.querySelector("[data-e2e=user-bio]");
  if (!userBio) return console.log("NO user bio found unable to render UI");

  const spinner = getSpinner();

  const parent = userBio.parentNode;
  const container = document.createElement("div");
  container.id = "loading-container-buzzlytics";
  container.style.marginTop = "10px";
  container.style.alignItems = "center";
  container.style.display = "flex";

  const text = document.createElement("h3");
  text.id = "loading-text-buzzlytics";
  text.style.padding = "0px";
  text.style.marginRight = "10px";
  text.innerText = "Loading Buzzlytics Metrics";
  container.appendChild(text);
  container.appendChild(spinner);

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
    script.setAttribute("src", chrome.runtime.getURL("src/test.ts.js"));
    (document.head || document.documentElement).appendChild(script);
    script?.parentNode?.removeChild(script);
  }, 100);
}

// Tiktok is an SPA so changing routes doesn't trigger hard page loads.
// That means our content script can only run once.
// By listening in on DOM mutations we can check if the URL has changed
// and only then trigger our script.
function addLocationObserver(callback: any) {
  const config = { attributes: true, childList: true, subtree: true };
  const observer = new MutationObserver(callback);
  observer.observe(document.body, config);
}

let prevUrl = "";
function observerCallback() {
  if (
    prevUrl !== window.location.href &&
    window.location.href.includes("tiktok.com/@") &&
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
