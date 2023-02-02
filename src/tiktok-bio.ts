import { TikTokVideo } from "./interfaces/tiktok-video";
import { UserDetailResponse } from "./interfaces/user-detail";
import { XTTParamsPayload } from "./interfaces/XTTParamsPayload";

function sleep(timeout: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, timeout);
  });
}

function aggregateVideos(videos: TikTokVideo[]): Metadata {
  let views = 0;
  let comments = 0;
  let shares = 0;
  let likes = 0;

  for (const value of videos) {
    views += value.stats.playCount;
    comments += value.stats.commentCount;
    shares += value.stats.shareCount;
    likes += value.stats.diggCount;
  }

  let engagement = Number(
    Number(((comments + likes + shares) / views) * 100).toFixed(2)
  );

  return {
    views,
    comments,
    shares,
    likes,
    engagement,
    totalVideos: Object.entries(videos).length,
  };
}

function _arrayBufferToBase64(buffer: ArrayBuffer): string {
  let binary = "";
  let bytes = new Uint8Array(buffer);
  let len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

// Tiktok's own encryption function
// for x-tt-params ported over to use
// the Browsers SubtleCrypto API instead
// of crypto-js
async function encrypt(e: XTTParamsPayload): Promise<string> {
  let t = [];
  (Object.keys(e) as Array<keyof typeof e>).forEach((i) => {
    const o = i + "=" + e[i];
    t.push(o);
  });

  t.push("is_encryption=1");

  let i = (e: string) => {
    let i = e.toString();
    const o = i.length;
    return (
      o < 16
        ? (i = new Array(16 - o + 1).join("0") + i)
        : o > 16 && (i = i.slice(0, 16)),
      i
    );
  };

  let b = i("webapp1.0+20210628");
  let n = new TextEncoder().encode(b);
  let x = t.join("&");

  const a = await window.crypto.subtle.encrypt(
    {
      name: "AES-CBC",
      iv: n,
    },
    await window.crypto.subtle.importKey("raw", n, "AES-CBC", false, [
      "encrypt",
    ]),
    new TextEncoder().encode(x)
  );

  return _arrayBufferToBase64(a);
}
function formVideoQuery(secId: string): XTTParamsPayload {
  return {
    aid: 1988,
    app_name: "tiktok_web",
    channel: "tiktok_web",
    device_platform: "web_pc",
    device_id: 7166644440672142894,
    region: "US",
    priority_region: "",
    os: "mac",
    referer: window.location.href,
    root_referer: window.location.href,
    cookie_enabled: true,
    screen_width: 2560,
    screen_height: 1440,
    browser_language: "en-US",
    browser_platform: "MacIntel",
    browser_name: "Mozilla",
    browser_version: window.navigator.userAgent,
    browser_online: true,
    app_language: "en",
    webcast_language: "en",
    tz_name: "America/New_York",
    is_page_visible: true,
    focus_state: true,
    is_fullscreen: 0,
    history_len: 1,
    battery_info: Number(Math.random().toFixed(2)),
    from_page: "user",
    secUid: secId,
    count: 30,
    cursor: "0",
    language: "en",
  };
}

function createStatElement(title: string, value: number, suffix?: string) {
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

interface Metadata {
  views: number;
  comments: number;
  shares: number;
  likes: number;
  engagement: number;
  totalVideos: number;
}

function generateUI(metadata: Metadata, allVideos: TikTokVideo[]): void {
  const userBio = document.querySelector("[data-e2e=user-bio]");
  if (!userBio) return console.log("NO user bio found unable to render UI");
  const parent = userBio.parentNode;

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
  const videosEl = createStatElement("Videos", metadata.totalVideos);
  const likesEl = createStatElement("Likes", metadata.likes);
  const sharesEl = createStatElement("Shares", metadata.shares);
  const commentsEl = createStatElement("Comments", metadata.comments);
  const engagementEl = createStatElement(
    "Engagement",
    metadata.engagement,
    "%"
  );

  statsContainer.appendChild(viewsEl);
  statsContainer.appendChild(likesEl);
  statsContainer.appendChild(sharesEl);
  statsContainer.appendChild(commentsEl);
  statsContainer.appendChild(engagementEl);
  statsContainer.appendChild(videosEl);

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

  downloadVideosButton.onclick = () => { downloadVideos(allVideos) }

  container.appendChild(downloadVideosButton);

  const loading = document.getElementById("loading-container-buzzlytics");
  if (loading) {
    loading.remove();
  }

  parent?.insertBefore(container, userBio);
}

function downloadFileFromText(filename: string, content: string) {
  let a = document.createElement("a");
  let blob = new Blob([content], { type: "text/plain;charset=UTF-8" });
  a.href = window.URL.createObjectURL(blob);
  a.download = filename;
  a.style.display = "none";
  document.body.appendChild(a);
  a.click(); //this is probably the key - simulating a click on a download link
  a.remove();
}


function cleanValue(value: string) {
  return value ? value.replace(/,/g, "") : "";
}

function downloadVideos(videos: TikTokVideo[]) {
  let videosCsv =
      "Views,Comments,Likes,Shares,Duration,Created,Description,Link\n";

  for (const video of videos) {
    videosCsv += `${video.stats.playCount},${video.stats.commentCount},${video.stats.diggCount},${
        video.stats.shareCount
    },${video.video.duration},${new Date(
        video.createTime * 1000
    )},${cleanValue(
        video.desc
    )},https://www.tiktok.com/@${video.author.uniqueId}/video/${video.id}\n`;
  }

  downloadFileFromText("buzzlytics-stats-" + videos[0].author.uniqueId + ".csv", videosCsv);

}

async function fetchUser(): Promise<string> {
  const username = new URL(window.location.href).pathname.split("@")[1];
  if (!username)
    throw new Error("Error fetching username no username found in url");

  console.log("username: ", username);

  try {
    const response = await fetch(
      `/api/user/detail/?aid=1988&app_language=en&app_name=tiktok_web&battery_info=0.77&browser_language=en-US&browser_name=Mozilla&browser_online=true&browser_platform=MacIntel&browser_version=5.0%20%28Macintosh%3B%20Intel%20Mac%20OS%20X%2010_15_7%29%20AppleWebKit%2F537.36%20%28KHTML%2C%20like%20Gecko%29%20Chrome%2F109.0.0.0%20Safari%2F537.36&channel=tiktok_web&cookie_enabled=true&device_id=7171339717962286634&device_platform=web_pc&focus_state=true&from_page=user&history_len=50&is_fullscreen=false&is_page_visible=true&language=en&os=mac&priority_region=&referer=https%3A%2F%2Fwww.tiktok.com%2F%40therobbins_fam%3Flang%3Den&region=US&root_referer=https%3A%2F%2Fwww.tiktok.com%2F%40james_sibley&screen_height=956&screen_width=1470&tz_name=America%2FNew_York&uniqueId=${username}&webcast_language=en&msToken=HffeSLbptWAxVNC3T6aUwBXNikYD8m73mSMf4GdWAy76fPp8fJ1ZTFekbpJH40b4Iswx2B1y2NymQnJVuKt2YMJ34J_wCxlUArn2b2LWXB9Ukcf6Jucb0fpd0GoeqhhQ8QgiII0=`
    );

    const json: UserDetailResponse = await response.json();

    const secUid = json?.userInfo?.user?.secUid;
    if (!secUid) {
      throw new Error("Unable to find secUid in user detail response");
    }
    return secUid;
  } catch (e) {
    throw e;
  }
}

async function fetchAllVideos(
  query: XTTParamsPayload,
  videos: TikTokVideo[] = []
): Promise<TikTokVideo[]> {
  // We have to reencrypt the query every request since we modify the
  // cursor
  const params = await encrypt(query);

  const response = await fetch(
    "/api/post/item_list/?aid=1988&app_language=en&app_name=tiktok_web&battery_info=1&browser_language=en-US&browser_name=Mozilla&browser_online=true&browser_platform=MacIntel&browser_version=5.0%20%28Macintosh%3B%20Intel%20Mac%20OS%20X%2010_15_7%29%20AppleWebKit%2F537.36%20%28KHTML%2C%20like%20Gecko%29%20Chrome%2F109.0.0.0%20Safari%2F537.36&channel=tiktok_web&cookie_enabled=true&device_id=7171339717962286634&device_platform=web_pc&focus_state=true&from_page=user&history_len=6&is_fullscreen=false&is_page_visible=true&os=mac&priority_region=&referer=https%3A%2F%2Fwww.tiktok.com%2F%40james_sibley&region=US&root_referer=https%3A%2F%2Fwww.tiktok.com%2F%40james_sibley&screen_height=1440&screen_width=2560&tz_name=America%2FNew_York&webcast_language=en&msToken=zF5H5qBJR4t-a2saBwymqy13N4Cuq_n3qop-Lr836aKaeeTxabA0XpWoAV6nfhBcWCNuBvm4lBG4nByRIy8NVQnI1gVLaMypBp5izc23rHu8IsRR97GJpJviP2JQdzx0Nzbr_r8=",
    {
      headers: {
        "x-tt-params": params,
      },
    }
  );

  const text = await response.json();

  if (text.hasMore) {
    const loading = document.getElementById("loading-text-buzzlytics");
    query.cursor = text.cursor;

    if (text?.itemList?.length) {
      videos = [...videos, ...text.itemList];
    }
    if (loading) {
      loading.innerText =
        "Loading Buzzlytics Metrics - " +
        videos.length +
        " videos loaded so far...";
    }
    return fetchAllVideos(query, videos);
  }

  if (text?.itemList?.length) {
    videos = [...videos, ...text.itemList];
  }

  return videos;
}

(async function run() {
  try {
    const secUid = await fetchUser();
    const query = formVideoQuery(secUid);
    const allVideos = await fetchAllVideos(query);
    const aggregated = aggregateVideos(allVideos);
    generateUI(aggregated, allVideos);
  } catch (e) {
    // TODO show error UI
  }
})();

export {};
