import { Metadata } from "./interfaces/buzzlyticsI";

export function getSpinner(color: string = "#000000") {
  const span = document.createElement("span");
  span.className = "loader";

  const style = document.createElement("style");
  document.head.append(style);
  style.textContent = `.loader {
    width: 20px;
    height: 20px;
    border: 2px solid ${color};
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

export function sleep(timeout: number) {
  return new Promise((resolve) => setTimeout(resolve, timeout));
}

export async function waitForElement(
  selector: string,
  maxRetries: number,
  retry: number = 0
): Promise<Element | null> {
  const el = document.querySelector(selector);

  if (!el) {
    if (retry > maxRetries) return null;
    await sleep(1000);
    return waitForElement(selector, maxRetries, retry + 1);
  }

  return el;
}

export function createLoadingUI(spinner: Element) {
  // const parent = userBio.parentNode;
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
  return container;
}

export function createStatElement(
  title: string,
  value: number,
  suffix?: string
) {
  const container = document.createElement("div");
  container.style.display = "flex";
  container.style.flexDirection = "column";
  container.style.marginRight = "16px";

  const valueText = document.createElement("h4");
  valueText.style.fontFamily = "SofiaPro,Arial,Tahoma,PingFangSC,sans-serif";
  valueText.style.fontSize = "18px";
  valueText.style.padding = "0px";
  valueText.innerText = Number(value).toLocaleString() + (suffix ? suffix : "");

  const label = document.createElement("h5");
  label.style.margin = "0px";
  label.innerText = title;
  label.style.fontWeight = "300";

  container.appendChild(valueText);
  container.appendChild(label);
  return container;
}

export function createMetricsContainer(
  metadata: Metadata,
  downloadButtonOnClickListener: () => void
) {
  const container = document.createElement("div");
  container.id = "buzzlytics-stats-component";
  container.style.display = "flex";
  container.style.flexDirection = "column";
  container.style.borderRadius = "8px";
  container.style.marginTop = "10px";

  const titleContainer = document.createElement("div");
  titleContainer.style.display = "flex";
  titleContainer.style.alignItems = "center";

  const title = document.createElement("h3");
  title.innerText = "Pro Statistics";

  const poweredByEl = document.createElement("a");
  poweredByEl.innerText = "Powered by Buzzlytics";
  poweredByEl.href = "https://buzzlytics.io";
  poweredByEl.target = "_blank";
  poweredByEl.style.fontSize = "14px";
  poweredByEl.style.textDecoration = "underline";
  // poweredByEl.style.textAlign = "end";
  poweredByEl.style.marginBottom = "0px";
  poweredByEl.style.marginLeft = "10px";
  poweredByEl.style.fontStyle = "italic";

  titleContainer.appendChild(title);
  titleContainer.appendChild(poweredByEl);

  container.appendChild(titleContainer);

  const statsContainer = document.createElement("div");
  statsContainer.style.display = "flex";
  statsContainer.style.flexDirection = "row";
  statsContainer.style.alignItems = "center";
  statsContainer.style.marginTop = "10px";

  const viewsEl = createStatElement("Views", metadata.views);
  statsContainer.appendChild(viewsEl);

  const videosEl = createStatElement("Videos", metadata.totalVideos);
  statsContainer.appendChild(videosEl);

  const likesEl = createStatElement("Likes", metadata.likes);
  statsContainer.appendChild(likesEl);

  if (metadata.hasOwnProperty("shares")) {
    const sharesEl = createStatElement("Shares", metadata?.shares || 0);
    statsContainer.appendChild(sharesEl);
  }

  const commentsEl = createStatElement("Comments", metadata.comments);
  statsContainer.appendChild(commentsEl);

  const engagementEl = createStatElement(
    "Engagement",
    metadata.engagement,
    "%"
  );

  statsContainer.appendChild(engagementEl);

  container.appendChild(statsContainer);

  const downloadVideosButton = document.createElement("button");
  downloadVideosButton.innerText = "Download Videos - CSV";
  downloadVideosButton.style.marginTop = "10px";
  downloadVideosButton.style.background = "rgba(254, 44, 85, 1)";
  downloadVideosButton.style.border = "1px solid rgba(254, 44, 85, 1)";
  downloadVideosButton.style.width = "200px";
  downloadVideosButton.style.padding = "5px";
  downloadVideosButton.style.borderRadius = "4px";
  downloadVideosButton.style.cursor = "pointer";
  downloadVideosButton.style.color = "white";
  downloadVideosButton.style.fontWeight = "bold";

  downloadVideosButton.onclick = downloadButtonOnClickListener;
  container.appendChild(downloadVideosButton);

  return container;
}

export function removeLoadingUI() {
  const loading = document.getElementById("loading-container-buzzlytics");
  if (loading) {
    loading.remove();
  }
}

export function downloadFileFromText(filename: string, content: string) {
  let a = document.createElement("a");
  let blob = new Blob([content], { type: "text/plain;charset=UTF-8" });
  a.href = window.URL.createObjectURL(blob);
  a.download = filename;
  a.style.display = "none";
  document.body.appendChild(a);
  a.click(); //this is probably the key - simulating a click on a download link
  a.remove();
}

export function cleanValue(value: string) {
  return value ? value.replace(/,/g, "").replace(/\n/g, "") : "";
}
export {};
