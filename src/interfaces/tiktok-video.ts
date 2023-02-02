export interface TikTokVideo {
  BAInfo: string;
  adAuthorization: boolean;
  adLabelVersion: number;
  author: Author;
  authorStats: AuthorStats;
  challenges?: Challenge[];
  createTime: number;
  desc: string;
  digged: boolean;
  duetDisplay: number;
  duetEnabled: boolean;
  duetInfo: DuetInfo;
  forFriend: boolean;
  id: string;
  isAd: boolean;
  itemCommentStatus: number;
  itemMute: boolean;
  music: Music;
  officalItem: boolean;
  originalItem: boolean;
  privateItem: boolean;
  secret: boolean;
  shareEnabled: boolean;
  showNotPass: boolean;
  stats: TikTokVideoStats;
  stitchDisplay: number;
  stitchEnabled: boolean;
  textExtra?: TextExtra[];
  video: Video;
  vl1: boolean;
  stickersOnItem?: StickersOnItem[];
  effectStickers?: EffectSticker[];
}

export interface Author {
  avatarLarger: string;
  avatarMedium: string;
  avatarThumb: string;
  commentSetting: number;
  downloadSetting: number;
  duetSetting: number;
  ftc: boolean;
  id: string;
  isADVirtual: boolean;
  isEmbedBanned: boolean;
  nickname: string;
  openFavorite: boolean;
  privateAccount: boolean;
  relation: number;
  secUid: string;
  secret: boolean;
  signature: string;
  stitchSetting: number;
  ttSeller: boolean;
  uniqueId: string;
  verified: boolean;
}

export interface AuthorStats {
  diggCount: number;
  followerCount: number;
  followingCount: number;
  heart: number;
  heartCount: number;
  videoCount: number;
}

export interface Challenge {
  coverLarger: string;
  coverMedium: string;
  coverThumb: string;
  desc: string;
  id: string;
  isCommerce: boolean;
  profileLarger: string;
  profileMedium: string;
  profileThumb: string;
  stats: ChallengeStats;
  title: string;
}

export interface ChallengeStats {
  videoCount: number;
  viewCount: number;
}

export interface DuetInfo {
  duetFromId: string;
}

export interface EffectSticker {
  ID: string;
  name: string;
  stickerStats: StickerStats;
}

export interface StickerStats {
  useCount: number;
}

export interface Music {
  album: string;
  authorName: string;
  coverLarge: string;
  coverMedium: string;
  coverThumb: string;
  duration: number;
  id: string;
  original: boolean;
  playUrl: string;
  title: string;
}

export interface TikTokVideoStats {
  commentCount: number;
  diggCount: number;
  playCount: number;
  shareCount: number;
}

export interface StickersOnItem {
  stickerText: string[];
  stickerType: number;
}

export interface TextExtra {
  awemeId: string;
  end: number;
  hashtagId: string;
  hashtagName: string;
  isCommerce: boolean;
  secUid: string;
  start: number;
  subType: number;
  type: number;
  userId: string;
  userUniqueId: string;
  questionContent?: string;
  questionId?: string;
}

export interface Video {
  bitrate: number;
  bitrateInfo: BitrateInfo[];
  codecType: CodecType;
  cover: string;
  definition: Definition;
  downloadAddr: string;
  duration: number;
  dynamicCover: string;
  encodeUserTag: string;
  encodedType: EncodedType;
  format: Format;
  height: number;
  id: string;
  originCover: string;
  playAddr: string;
  ratio: Definition;
  reflowCover: string;
  shareCover: string[];
  videoQuality: EncodedType;
  volumeInfo: VolumeInfo;
  width: number;
  zoomCover: { [key: string]: string };
  subtitleInfos?: SubtitleInfo[];
}

export interface BitrateInfo {
  Bitrate: number;
  CodecType: CodecType;
  GearName: GearName;
  PlayAddr: PlayAddr;
  QualityType: number;
}

export enum CodecType {
  H264 = "h264",
}

export enum GearName {
  Normal720_0 = "normal_720_0",
}

export interface PlayAddr {
  DataSize: number;
  FileCs: string;
  FileHash: string;
  Uri: string;
  UrlKey: string;
  UrlList: string[];
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
  Format: string;
  LanguageCodeName: string;
  LanguageID: string;
  Size: number;
  Source: string;
  Url: string;
  UrlExpire: number;
  Version: string;
  VideoSubtitleID: number;
}

export interface VolumeInfo {
  Loudness: number;
  Peak: number;
}
