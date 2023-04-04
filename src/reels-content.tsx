import { Metadata } from "./interfaces/buzzlyticsI";
import { ClipsResponseI, Media } from "./interfaces/reels-interface";
import {
  cleanValue,
  createLoadingUI,
  createMetricsContainer,
  downloadFileFromText,
  getSpinner,
  removeLoadingUI,
  waitForElement,
} from "./utils";

async function getReels(
  userId: string,
  cursor?: string | null,
  res: Media[] = []
): Promise<Media[]> {
  let params =
    "target_user_id=" + userId + "&page_size=50&include_feed_video=true";

  if (cursor) {
    params += "&max_id=" + cursor;
  }
  try {
    const response = await fetch("/api/v1/clips/user/", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "x-ig-app-id": "936619743392459",
        "x-requested-with": "XMLHttpRequest",
        "x-csrftoken": "MhA3Cy4YeaXnw1i8j6jCU6lSxdvaLgBP",
      },
      body: params,
    });

    if (!response.ok) throw new Error("Error getting response");
    const json: ClipsResponseI = await response.json();

    if (json.paging_info.more_available) {
      res = [...res, ...json.items.map((item) => item.media)];
      return getReels(userId, json.paging_info.max_id, res);
    }

    res = [...res, ...json.items.map((item) => item.media)];
    return res;
  } catch (e) {
    throw e;
  }
}

async function getProfileId() {
  const username = window.location.pathname.split("/")[1];
  console.log("username: ", username);

  if (!username) return null;

  try {
    const response = await fetch(
      "https://www.instagram.com/api/v1/users/web_profile_info/?username=" +
        username,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "x-ig-app-id": "936619743392459",
          "x-requested-with": "XMLHttpRequest",
          "x-csrftoken": "MhA3Cy4YeaXnw1i8j6jCU6lSxdvaLgBP",
        },
      }
    );

    console.log("response: ", response);

    if (!response.ok) return null;

    const json: { data: { user: { id: string } } } = await response.json();

    return json.data.user.id;
  } catch (e) {
    console.log("ERROR getting user id: ", e);
    return null;
  }
}

function aggregateVideos(videos: Media[]): Metadata {
  let views = 0;
  let comments = 0;
  let likes = 0;

  for (const value of videos) {
    views += value.hasOwnProperty("view_count")
      ? value.view_count || 0
      : value.play_count || 0;
    comments += value.comment_count;
    likes += value.like_count;
  }

  let engagement = Number(
    Number(((comments + likes) / views) * 100).toFixed(2)
  );

  return {
    views,
    comments,
    likes,
    engagement,
    totalVideos: Object.entries(videos).length,
  };
}

async function showLoadingUI() {
  const header = await waitForElement("header", 10);
  if (!header) return console.log("No header found");

  const parent = header.parentElement;
  if (!parent) return console.log("No parent element found");

  const elementToInsertAfter = header?.parentElement.children[1];

  const spinner = getSpinner("#ffffff");
  const container = createLoadingUI(spinner);
  elementToInsertAfter.appendChild(container);
}

async function generateUI(
  metadata: Metadata,
  allVideos: Media[]
): Promise<void> {
  const header = await waitForElement("header", 10);
  if (!header) return console.log("No header found");

  const parent = header.parentElement;
  if (!parent) return console.log("No parent element found");

  const elementToInsertAfter = header?.parentElement.children[1];

  const container = createMetricsContainer(metadata, () =>
    downloadVideos(allVideos)
  );

  container.style.alignItems = "center";
  container.style.marginTop = "20px";
  container.style.marginBottom = "20px";

  removeLoadingUI();

  parent?.insertBefore(container, elementToInsertAfter);
}

function downloadVideos(videos: Media[]) {
  let videosCsv = "Views,Comments,Likes,Duration,Created,Description,Link\n";

  for (const video of videos) {
    let date = new Date(video.taken_at * 1000);
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let d = date.getDate();
    let time = date.toLocaleTimeString();

    let dateString = `${year}-${month > 9 ? month : `0${month}`}-${
      d > 9 ? d : `0${d}`
    } ${time}`;

    videosCsv += `${
      video.hasOwnProperty("view_count")
        ? video.view_count || 0
        : video.play_count || 0
    },${video.comment_count},${video.like_count},${
      video.video_duration
    },${dateString},${cleanValue(
      video.caption?.text || ""
    )},https://www.instagram.com/reel/${video.code}\n`;
  }

  downloadFileFromText(
    "buzzlytics-stats-" + videos[0].user.username + ".csv",
    videosCsv
  );
}

const blackListPaths = ["stories", "direct", "reels", "explore"];

function isOnProfilePage() {
  const textContent = document.body.textContent?.toLowerCase();
  return (
    textContent?.includes("followers") &&
    textContent?.includes("following") &&
    textContent?.includes("posts")
  );
}
async function main() {
  const path = window.location.pathname.split("/")[1];

  if (blackListPaths.includes(path) || path === "p") {
    console.log("blacklist path");
    return;
  }

  await showLoadingUI();
  const profileId = await getProfileId();

  try {
    if (!profileId) throw new Error("No profile id found");
    const reels = await getReels(profileId);
    console.log("reels: ", reels);
    const aggregated = aggregateVideos(reels);
    console.log("aggregated: ", aggregated);
    await generateUI(aggregated, reels);
  } catch (e) {
    console.log("ERROR getting reels:", e);
  }
}

// Instagram is an SPA so changing routes doesn't trigger hard page loads.
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
    window.location.href.includes("instagram.com/") &&
    window.location.pathname.split("/").length > 2
    // We don't want to render when there are other path parameters
  ) {
    prevUrl = window.location.href;
    setTimeout(() => {
      try {
        main();
      } catch (e) {}
    }, 1000);
  }
}

addLocationObserver(observerCallback);
observerCallback();

export {};
