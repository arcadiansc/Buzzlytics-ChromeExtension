export interface UserDetailResponse {
  extra: Extra;
  log_pb: LogPb;
  statusCode: number;
  status_code: number;
  userInfo: UserInfo;
}

export interface Extra {
  fatal_item_ids: any[];
  logid: string;
  now: number;
}

export interface LogPb {
  impr_id: string;
}

export interface UserInfo {
  stats: Stats;
  user: User;
}

export interface Stats {
  diggCount: number;
  followerCount: number;
  followingCount: number;
  heart: number;
  heartCount: number;
  videoCount: number;
}

export interface User {
  avatarLarger: string;
  avatarMedium: string;
  avatarThumb: string;
  commentSetting: number;
  commerceUserInfo: CommerceUserInfo;
  duetSetting: number;
  followingVisibility: number;
  ftc: boolean;
  id: string;
  isADVirtual: boolean;
  isEmbedBanned: boolean;
  nickname: string;
  openFavorite: boolean;
  privateAccount: boolean;
  profileEmbedPermission: number;
  profileTab: ProfileTab;
  relation: number;
  secUid: string;
  secret: boolean;
  signature: string;
  stitchSetting: number;
  ttSeller: boolean;
  uniqueId: string;
  verified: boolean;
}

export interface CommerceUserInfo {
  commerceUser: boolean;
}

export interface ProfileTab {
  showMusicTab: boolean;
  showPlayListTab: boolean;
}
