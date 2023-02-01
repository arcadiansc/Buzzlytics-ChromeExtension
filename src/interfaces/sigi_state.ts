export interface SigiStateI {
  AppContext: AppContext;
  BizContext: BizContext;
  SEO: SEO;
  SharingMeta: SharingMeta;
  ItemList: ItemList;
  ItemModule: { [key: string]: ItemModule };
  UserModule: UserModule;
  UserPage: UserPage;
  RecommendUserList: RecommendUserList;
}

export interface AppContext {
  appContext: AppContextClass;
  initialized: boolean;
  lang: string;
  sideNavActive: boolean;
  isDowngradedToCSR: boolean;
}

export interface AppContextClass {
  isDowngradedToCSR: boolean;
  language: string;
  region: string;
  appId: number;
  appType: string;
  user: User;
  wid: string;
  nonce: string;
  botType: string;
  requestId: string;
  clusterRegion: string;
  abTestVersion: AbTestVersion;
  csrfToken: string;
  userAgent: string;
  encryptedWebid: string;
  host: string;
  pnsRuntimeFrameworkConfig: PnsRuntimeFrameworkConfig;
}

export interface AbTestVersion {
  versionName: string;
  parameters: { [key: string]: UserPageSerpCompliance };
}

export interface UserPageSerpCompliance {
  vid: string;
}

export interface PnsRuntimeFrameworkConfig {
  url: string;
  url_ttm: string;
  url_resso: string;
  enabled: boolean;
  useAsync: boolean;
}

export interface User {
  ftcUser: boolean;
  secUid: string;
  uid: string;
  nickName: string;
  signature: string;
  uniqueId: string;
  createTime: string;
  hasLivePermission: boolean;
  roomId: string;
  region: string;
  avatarUri: string[];
  isPrivateAccount: boolean;
  hasIMPermission: boolean;
  showPrivateBanner: boolean;
  showScheduleTips: boolean;
  longVideoMinutes: number;
  ageGateRegion: string;
  ageGateTime: string;
  userMode: number;
  proAccountInfo: ProAccountInfo;
  analyticsOn: boolean;
  redDot: any[];
  photoSensitiveVideosSetting: number;
  hasCollectionsAccess: boolean;
  hasCollectionsRedDot: boolean;
}

export interface ProAccountInfo {
  status: number;
  analyticsOn: boolean;
  businessSuiteEntrance: boolean;
  downloadLink: ProAccountInfoDownloadLink;
}

export interface ProAccountInfoDownloadLink {}

export interface BizContext {
  bizContext: BizContextClass;
  initialized: boolean;
}

export interface BizContextClass {
  os: string;
  isMobile: boolean;
  isAndroid: boolean;
  isIOS: boolean;
  jumpType: string;
  navList: NavList[];
  config: Config;
  domains: Domains;
  downloadLink: BizContextDownloadLink;
  deviceLimitRegisterExpired: boolean;
  subdivisions: string[];
  geo: string[];
  geoCity: GeoCity;
  isGoogleBot: boolean;
  isBingBot: boolean;
  isBot: boolean;
  isSearchEngineBot: boolean;
  isTTP: boolean;
  dateFmtLocale: DateFmtLocale;
  videoPlayerConfig: VideoPlayerConfig;
  playbackNormalizePath: PlaybackNormalizePath;
  bitrateConfig: BitrateConfig;
  searchVideoForLoggedin: boolean;
  studioDownloadEntrance: StudioDownloadEntrance;
  liveSuggestConfig: LiveSuggestConfig;
  liveCenterConfig: LiveCenterConfig;
  liveStudioEnable: boolean;
  xgplayerInitHost: XgplayerInitHost;
  videoOrder: BizContextVideoOrder;
}

export interface BitrateConfig {
  bitrateLower: number;
  bitrateRange: number[];
  bitrateUpper: number;
  mode: string;
  paramBf: number;
  paramBp: number;
  paramLower: number;
  paramUpper: number;
  paramUpperBl: number;
  paramVl1: number;
  paramVl2: number;
  paramVlLower: number;
  paramVlUpper: number;
  slidingWindowCountThreshold: number;
  slidingWindowExtraction: string;
  slidingWindowType: string;
  slidingWindowWeight: string;
  slidingWindowWeightThreshold: number;
}

export interface Config {
  featureFlags: FeatureFlags;
  signUpOpen: boolean;
  cookieBanner: CookieBanner;
  isGrayFilter: boolean;
  nickNameControlDay: string;
}

export interface CookieBanner {
  load_dynamically: boolean;
  decline_btn_staged_rollout_area: string[];
  resource: Resource;
  i18n: I18N;
}

export interface I18N {
  cookieBannerTitle: string;
  cookieBannerTitleNew: string;
  cookieBannerSubTitle: string;
  cookieBannerSubTitleNew: string;
  cookieBannerSubTitleV2: string;
  cookieBannerBtnManage: string;
  cookieBannerBtnAccept: string;
  cookieBannerBtnDecline: string;
  cookiesBannerDetails: string;
  cookiesBannerCookiesPolicy: string;
  cookiesBannerAccept: string;
  webDoNotSellSettingsSavedToast: string;
  cookieSettingManageYourCookieTitle: string;
  cookieSettingSave: string;
  cookieSettingAnalyticsAndMarketing: string;
  cookieSettingNecessary: string;
  cookieSettingNecessarySubtitle: string;
  cookieSettingNecessaryV2: string;
  cookieSettingNecessarySubtitleV2: string;
  cookieSettingAnalyticsAndMarketingSubtitle: string;
  cookieSettingAnalyticsAndMarketingSubtitleV2: string;
  cookieManageTip: string;
}

export interface Resource {
  prefix: string;
  themes: string[];
  esm: string;
  nomodule: string;
  version: string;
}

export interface FeatureFlags {
  ftc: string[];
  feature_bar: boolean;
}

export interface DateFmtLocale {
  name: string;
  months: string[];
  monthsShort: string[];
  weekdays: string[];
  weekdaysShort: string[];
  weekdaysMin: string[];
  longDateFormat: LongDateFormat;
  meridiem: Meridiem;
}

export interface LongDateFormat {
  LT: string;
  LTS: string;
  L: string;
  LL: string;
  LLL: string;
  LLLL: string;
  l: string;
  ll: string;
  lll: string;
  llll: string;
  "LL-Y": string;
}

export interface Meridiem {
  am: string;
  pm: string;
  AM: string;
  PM: string;
}

export interface Domains {
  kind: string;
  captcha: string;
  imApi: string;
  imFrontier: string;
  mTApi: string;
  rootApi: string;
  secSDK: string;
  slardar: string;
  starling: string;
  tea: string;
  libraWebSDK: string;
  webcastApi: string;
  webcastRootApi: string;
  tcc: string;
  search: string;
  aweme: string;
}

export interface BizContextDownloadLink {
  microsoft: Amazon;
  apple: Amazon;
  amazon: Amazon;
  google: Amazon;
}

export interface Amazon {
  visible: boolean;
  normal: string;
}

export interface GeoCity {
  City: string;
  Subdivisions: string;
  SubdivisionsArr: string[];
}

export interface LiveCenterConfig {
  entrance: boolean;
  showCreatorHubRegion: string[];
}

export interface LiveSuggestConfig {
  isBlockedArea: boolean;
  isRiskArea: boolean;
}

export interface NavList {
  title: string;
  children: Child[];
}

export interface Child {
  title: string;
  href: string;
  key?: string;
}

export interface PlaybackNormalizePath {
  path: string[];
}

export interface StudioDownloadEntrance {
  regions: string[];
  userRegions: string[];
  allRegions: boolean;
}

export interface BizContextVideoOrder {
  videoOrder: VideoOrderElement[];
}

export interface VideoOrderElement {
  property: string;
  detail?: number[];
  order?: string;
}

export interface VideoPlayerConfig {
  fallback: boolean;
}

export interface XgplayerInitHost {
  group1: string[];
  group2: string[];
}

export interface ItemList {
  "user-post": UserLikedClass;
  "user-liked": UserLikedClass;
}

export interface UserLikedClass {
  list: string[];
  browserList: string[];
  loading: boolean;
  statusCode: number;
  hasMore: boolean;
  cursor: string;
  preloadList: PreloadList[];
}

export interface PreloadList {
  url: string;
  id: string;
}

export interface ItemModule {
  id: string;
  desc: string;
  createTime: string;
  scheduleTime: number;
  video: Video;
  author: UniqueID;
  music: Music;
  challenges: Challenge[];
  stats: ItemModuleStats;
  duetInfo: DuetInfo;
  warnInfo: any[];
  originalItem: boolean;
  officalItem: boolean;
  textExtra: TextExtra[];
  secret: boolean;
  forFriend: boolean;
  digged: boolean;
  itemCommentStatus: number;
  showNotPass: boolean;
  vl1: boolean;
  takeDown: number;
  itemMute: boolean;
  effectStickers: any[];
  authorStats: AuthorStats;
  privateItem: boolean;
  duetEnabled: boolean;
  stitchEnabled: boolean;
  stickersOnItem: StickersOnItem[];
  isAd: boolean;
  shareEnabled: boolean;
  comments: any[];
  duetDisplay: number;
  stitchDisplay: number;
  indexEnabled: boolean;
  adAuthorization: boolean;
  adLabelVersion: number;
  locationCreated: LocationCreated;
  BAInfo: string;
  nickname: Name;
  authorId: AuthorID;
  authorSecId: string;
  avatarThumb: string;
  downloadSetting: number;
  authorPrivate: boolean;
  diversificationLabels?: string[];
}

export type UniqueID = string;

export type AuthorID = string;

export interface AuthorStats {
  followerCount: number;
  followingCount: number;
  heart: number;
  heartCount: number;
  videoCount: number;
  diggCount: number;
  needFix?: boolean;
}

export interface Challenge {
  id: string;
  title: string;
  desc: string;
  profileLarger: string;
  profileMedium: string;
  profileThumb: string;
  coverLarger: string;
  coverMedium: string;
  coverThumb: string;
  isCommerce: boolean;
  stats: ChallengeStats;
}

export interface ChallengeStats {
  videoCount: number;
  viewCount: number;
}

export interface DuetInfo {
  duetFromId: string;
}

export enum LocationCreated {
  GB = "GB",
}

export interface Music {
  id: string;
  title: Title;
  playUrl: string;
  coverLarge: string;
  coverMedium: string;
  coverThumb: string;
  authorName: Name;
  original: boolean;
  duration: number;
  album: string;
  scheduleSearchTime: number;
}

export type Name = string;

export type Title = string;

export interface ItemModuleStats {
  diggCount: number;
  shareCount: number;
  commentCount: number;
  playCount: number;
}

export interface StickersOnItem {
  stickerText: string[];
  stickerType: number;
}

export interface TextExtra {
  awemeId: string;
  start: number;
  end: number;
  hashtagId: string;
  hashtagName: string;
  type: number;
  subType: number;
  userId: AuthorID;
  isCommerce: boolean;
  userUniqueId: UniqueID;
  secUid: string;
}

export interface Video {
  id: string;
  height: number;
  width: number;
  duration: number;
  ratio: Definition;
  cover: string;
  originCover: string;
  dynamicCover: string;
  playAddr: string;
  downloadAddr: string;
  shareCover: string[];
  reflowCover: string;
  bitrate: number;
  encodedType: EncodedType;
  format: Format;
  videoQuality: EncodedType;
  encodeUserTag: string;
  codecType: CodecType;
  definition: Definition;
  subtitleInfos: SubtitleInfo[];
  zoomCover: { [key: string]: string };
  volumeInfo: VolumeInfo;
  bitrateInfo: BitrateInfo[];
}

export interface BitrateInfo {
  GearName: GearName;
  Bitrate: number;
  QualityType: number;
  PlayAddr: PlayAddr;
  CodecType: CodecType;
}

export enum CodecType {
  H264 = "h264",
}

export enum GearName {
  Normal720_0 = "normal_720_0",
}

export interface PlayAddr {
  Uri: string;
  UrlList: string[];
  DataSize: string;
  UrlKey: string;
  FileHash: string;
  FileCs: string;
}

export enum Definition {
  The720P = "720p",
}

export enum EncodedType {
  Normal = "normal",
}

export enum Format {
  Mp4 = "mp4",
}

export interface SubtitleInfo {
  LanguageID: string;
  LanguageCodeName: string;
  Url: string;
  UrlExpire: string;
  Format: FormatEnum;
  Version: string;
  Source: Source;
  VideoSubtitleID: number;
  Size: string;
}

export enum FormatEnum {
  Webvtt = "webvtt",
}

export enum Source {
  ASR = "ASR",
  MT = "MT",
}

export interface VolumeInfo {
  Loudness: number;
  Peak: number;
}

export interface RecommendUserList {
  uniqueId: UniqueID;
}

export interface SEO {
  metaParams: MetaParams;
  jsonldList: Array<Array<JsonldListClass | string>>;
  abtest: Abtest;
  loading: boolean;
  canonical: string;
  pageType: number;
  launchMode: string;
  directoryConfig: DirectoryConfig;
}

export interface Abtest {
  pageId: string;
  vidList: any[];
  parameters: Parameters;
}

export interface Parameters {
  user_page_serp_compliance: UserPageSerpCompliance;
}

export interface DirectoryConfig {
  type: string;
  default: Default;
}

export interface Default {
  kepDirectoryVersion1: KepDirectoryVersion1;
  kepDirectoryVersion2: KepDirectoryVersion2;
  userProfileDirectory: KepDirectoryVersion1;
  recommendVideoDirectory: KepDirectoryVersion1;
  userVideoDirectory: VideoDirectory;
  musicVideoDirectory: VideoDirectory;
  hashtagVideoDirectory: VideoDirectory;
}

export interface VideoDirectory {
  isOpen: boolean;
  itemNumber: number;
}

export interface KepDirectoryVersion1 {
  isOpen: boolean;
  itemNumber: number;
  hashSize: number;
  upperLimitHash: number;
  lowerLimitHash: number;
}

export interface KepDirectoryVersion2 {
  isOpen: boolean;
  itemNumber: number;
  hashSize: number;
  bucketSize: number;
  upperLimitHash: number;
  lowerLimitHash: number;
  updatedFrequencyTimer: number;
}

export interface JsonldListClass {
  itemListElement?: ItemListElement[];
  name?: Name;
  description?: string;
  alternateName?: UniqueID;
  mainEntityOfPage?: MainEntityOfPage;
}

export interface ItemListElement {
  "@type": string;
  position: number;
  item: Item;
}

export interface Item {
  "@type": string;
  "@id": string;
  name: string;
}

export interface MainEntityOfPage {
  "@type": string;
  "@id": string;
}

export interface MetaParams {
  title: string;
  description: string;
  canonicalHref: string;
  robotsContent: string;
  applicableDevice: string;
}

export interface SharingMeta {
  value: Value;
}

export interface Value {
  "al:ios:url": string;
  "al:android:url": string;
  "al:ios:app_store_id": string;
  "al:ios:app_name": string;
  "al:android:app_name": string;
  "al:android:package": string;
  "og:site_name": string;
  "og:type": string;
  "og:title": string;
  "og:description": string;
  "fb:app_id": string;
  "twitter:app:id:iphone": string;
  "twitter:app:id:googleplay": string;
  "twitter:card": string;
  "twitter:site": string;
  "twitter:title": string;
  "twitter:description": string;
  "og:image": string;
  "twitter:image": string;
  "og:image:width": string;
  "og:image:height": string;
  "og:image:alt": string;
}

export interface UserModule {
  users: Users;
  stats: UserModuleStats;
}

export interface UserModuleStats {
  bella_does_editing: AuthorStats;
}

export interface Users {
  bella_does_editing: BellaDoesEditing;
}

export interface BellaDoesEditing {
  id: AuthorID;
  shortId: string;
  uniqueId: UniqueID;
  nickname: Name;
  avatarLarger: string;
  avatarMedium: string;
  avatarThumb: string;
  signature: string;
  createTime: number;
  verified: boolean;
  secUid: string;
  ftc: boolean;
  relation: number;
  openFavorite: boolean;
  commentSetting: number;
  commerceUserInfo: CommerceUserInfo;
  duetSetting: number;
  stitchSetting: number;
  privateAccount: boolean;
  secret: boolean;
  isADVirtual: boolean;
  roomId: string;
  uniqueIdModifyTime: number;
  ttSeller: boolean;
  region: LocationCreated;
  downloadSetting: number;
  profileTab: ProfileTab;
  followingVisibility: number;
  recommendReason: string;
  nowInvitationCardUrl: string;
  nickNameModifyTime: number;
  isEmbedBanned: boolean;
  profileEmbedPermission: number;
  extraInfo: ExtraInfo;
}

export interface CommerceUserInfo {
  commerceUser: boolean;
}

export interface ExtraInfo {
  statusCode: number;
}

export interface ProfileTab {
  showMusicTab: boolean;
  showQuestionTab: boolean;
  showPlayListTab: boolean;
}

export interface UserPage {
  uniqueId: UniqueID;
  statusCode: number;
  secUid: string;
}
