export interface ClipsResponseI {
  items: Item[];
  paging_info: PagingInfo;
  status: string;
}

export interface Item {
  media: Media;
}

export interface Media {
  taken_at: number;
  pk: string;
  id: string;
  device_timestamp: number;
  media_type: number;
  code: string;
  client_cache_key: string;
  filter_type: number;
  is_unified_video: boolean;
  should_request_ads: boolean;
  original_media_has_visual_reply_media: boolean;
  like_and_view_counts_disabled: boolean;
  commerciality_status: string;
  is_paid_partnership: boolean;
  is_visual_reply_commenter_notice_enabled: boolean;
  clips_tab_pinned_user_ids: any[];
  has_delayed_metadata: boolean;
  comment_likes_enabled: boolean;
  comment_threading_enabled: boolean;
  max_num_visible_preview_comments: number;
  has_more_comments: boolean;
  next_max_id: string;
  preview_comments: Comment[];
  comments: Comment[];
  comment_count: number;
  can_view_more_preview_comments: boolean;
  hide_view_all_comment_entrypoint: boolean;
  photo_of_you: boolean;
  usertags: Usertags;
  is_organic_product_tagging_eligible: boolean;
  can_see_insights_as_brand: boolean;
  user: User;
  can_viewer_reshare: boolean;
  like_count: number;
  has_liked: boolean;
  top_likers: any[];
  facepile_top_likers: any[];
  is_comments_gif_composer_enabled: boolean;
  image_versions2: ImageVersions2;
  original_width: number;
  original_height: number;
  caption: Caption;
  caption_is_edited: boolean;
  coauthor_producers?: CoauthorProducer[];
  coauthor_producer_can_see_organic_insights?: null;
  comment_inform_treatment: CommentInformTreatment;
  sharing_friction_info: SharingFrictionInfo;
  is_dash_eligible: number;
  video_dash_manifest: string;
  video_codec: string;
  number_of_qualities: number;
  video_versions: VideoVersion[];
  has_audio: boolean;
  video_duration: number;
  can_viewer_save: boolean;
  is_in_profile_grid: boolean;
  profile_grid_control_enabled: boolean;
  play_count: number;
  view_count: number;
  organic_tracking_token: string;
  third_party_downloads_enabled: boolean;
  has_shared_to_fb: number;
  product_type: string;
  show_shop_entrypoint: boolean;
  deleted_reason: number;
  integrity_review_decision: string;
  commerce_integrity_review_decision: null;
  music_metadata: null;
  is_artist_pick: boolean;
  ig_media_sharing_disabled: boolean;
  clips_metadata: ClipsMetadata;
  media_cropping_info: MediaCroppingInfo;
  logging_info_token: string;
  enable_waist: boolean;
  view_state_item_type: number;
  video_subtitles_confidence?: number;
  video_subtitles_uri?: string;
}

export interface Caption {
  pk: string;
  user_id: string;
  text: string;
  type: number;
  created_at: number;
  created_at_utc: number;
  content_type: ContentType;
  status: Status;
  bit_flags: number;
  did_report_as_spam: boolean;
  share_enabled: boolean;
  user: User;
  is_covered: boolean;
  is_ranked_comment: boolean;
  media_id: string;
  private_reply_status: number;
}

export enum ContentType {
  Comment = "comment",
}

export enum Status {
  Active = "Active",
}

export interface User {
  has_anonymous_profile_picture: boolean;
  fan_club_info: FanClubInfo;
  transparency_product_enabled: boolean;
  is_favorite: boolean;
  is_unpublished: boolean;
  pk: string;
  pk_id: string;
  strong_id__: string;
  username: string;
  full_name: string;
  is_private: boolean;
  is_verified: boolean;
  friendship_status: PurpleFriendshipStatus;
  profile_pic_id: string;
  profile_pic_url: string;
  account_badges: any[];
  show_account_transparency_details: boolean;
}

export interface FanClubInfo {
  fan_club_id: null;
  fan_club_name: null;
  is_fan_club_referral_eligible: null;
  fan_consideration_page_revamp_eligiblity: null;
  is_fan_club_gifting_eligible: null;
}

export interface PurpleFriendshipStatus {
  following: boolean;
  outgoing_request: boolean;
  is_bestie: boolean;
  is_restricted: boolean;
  is_feed_favorite: boolean;
}

export interface ClipsMetadata {
  music_info: MusicInfo | null;
  original_sound_info: OriginalSoundInfo | null;
  audio_type: string;
  music_canonical_id: string;
  featured_label: null;
  mashup_info: MashupInfo;
  reusable_text_info: null;
  nux_info: null;
  viewer_interaction_settings: null;
  branded_content_tag_info: BrandedContentTagInfo;
  shopping_info: null;
  additional_audio_info: AdditionalAudioInfo;
  is_shared_to_fb: boolean;
  breaking_content_info: null;
  challenge_info: null;
  reels_on_the_rise_info: null;
  breaking_creator_info: null;
  asset_recommendation_info: null;
  contextual_highlight_info: null;
  clips_creation_entry_point: string;
  audio_ranking_info: AudioRankingInfo;
  template_info: null;
  is_fan_club_promo_video: boolean;
  disable_use_in_clips_client_cache: boolean;
  content_appreciation_info: ContentAppreciationInfo;
  achievements_info: AchievementsInfo;
  show_achievements: boolean;
  show_tips: boolean;
  merchandising_pill_info: null;
  is_public_chat_welcome_video: boolean;
  professional_clips_upsell_type: number;
}

export interface AchievementsInfo {
  show_achievements: boolean;
  num_earned_achievements: null;
}

export interface AdditionalAudioInfo {
  additional_audio_username: null;
  audio_reattribution_info: AudioReattributionInfo;
}

export interface AudioReattributionInfo {
  should_allow_restore: boolean;
}

export interface AudioRankingInfo {
  best_audio_cluster_id: string;
}

export interface BrandedContentTagInfo {
  can_add_tag: boolean;
}

export interface ContentAppreciationInfo {
  enabled: boolean;
  entry_point_container: null;
}

export interface MashupInfo {
  mashups_allowed: boolean;
  can_toggle_mashups_allowed: boolean;
  has_been_mashed_up: boolean;
  formatted_mashups_count: null;
  original_media: null;
  privacy_filtered_mashups_media_count: null;
  non_privacy_filtered_mashups_media_count: null;
  mashup_type: null;
  is_creator_requesting_mashup: boolean;
  has_nonmimicable_additional_audio: boolean;
}

export interface MusicInfo {
  music_asset_info: MusicAssetInfo;
  music_consumption_info: MusicConsumptionInfo;
  music_canonical_id: null;
}

export interface MusicAssetInfo {
  audio_cluster_id: string;
  id: string;
  title: string;
  sanitized_title: null;
  subtitle: string;
  display_artist: string;
  artist_id: string;
  cover_artwork_uri: string;
  cover_artwork_thumbnail_uri: string;
  progressive_download_url: string;
  reactive_audio_download_url: null;
  fast_start_progressive_download_url: string;
  web_30s_preview_download_url: string;
  highlight_start_times_in_ms: number[];
  is_explicit: boolean;
  dash_manifest: null;
  has_lyrics: boolean;
  audio_asset_id: string;
  duration_in_ms: number;
  dark_message: null;
  allows_saving: boolean;
  territory_validity_periods: TerritoryValidityPeriods;
  ig_username: string;
}

export interface TerritoryValidityPeriods {}

export interface MusicConsumptionInfo {
  ig_artist: CoauthorProducer;
  placeholder_profile_pic_url: string;
  should_mute_audio: boolean;
  should_mute_audio_reason: string;
  should_mute_audio_reason_type: null;
  is_bookmarked: boolean;
  overlap_duration_in_ms: number;
  audio_asset_start_time_in_ms: number;
  allow_media_creation_with_music: boolean;
  is_trending_in_clips: boolean;
  trend_rank: null;
  formatted_clips_media_count: null;
  display_labels: null;
  should_allow_music_editing: boolean;
}

export interface CoauthorProducer {
  pk: string;
  pk_id: string;
  username: string;
  full_name: string;
  is_private: boolean;
  is_verified: boolean;
  profile_pic_id: string;
  profile_pic_url: string;
  friendship_status?: CoauthorProducerFriendshipStatus;
}

export interface CoauthorProducerFriendshipStatus {
  following: boolean;
  followed_by: boolean;
  blocking: boolean;
  muting: boolean;
  is_private: boolean;
  incoming_request: boolean;
  outgoing_request: boolean;
  is_bestie: boolean;
  is_restricted: boolean;
  is_feed_favorite: boolean;
}

export interface OriginalSoundInfo {
  audio_asset_id: string;
  music_canonical_id: null;
  progressive_download_url: string;
  duration_in_ms: number;
  dash_manifest: string;
  ig_artist: CoauthorProducer;
  should_mute_audio: boolean;
  hide_remixing: boolean;
  original_media_id: string;
  time_created: number;
  original_audio_title: string;
  consumption_info: ConsumptionInfo;
  can_remix_be_shared_to_fb: boolean;
  formatted_clips_media_count: null;
  allow_creator_to_rename: boolean;
  audio_parts: any[];
  is_explicit: boolean;
  original_audio_subtype: string;
  is_audio_automatically_attributed: boolean;
  is_reuse_disabled: boolean;
  is_xpost_from_fb: boolean;
  xpost_fb_creator_info: null;
  nft_info: null;
}

export interface ConsumptionInfo {
  is_bookmarked: boolean;
  should_mute_audio_reason: string;
  is_trending_in_clips: boolean;
  should_mute_audio_reason_type: null;
  display_media_id: null;
}

export interface CommentInformTreatment {
  should_have_inform_treatment: boolean;
  text: string;
  url: null;
  action_type: null;
}

export interface Comment {
  pk: string;
  user_id: string;
  text: string;
  type: number;
  created_at: number;
  created_at_utc: number;
  content_type: ContentType;
  status: Status;
  bit_flags: number;
  did_report_as_spam: boolean;
  share_enabled: boolean;
  user: CoauthorProducer;
  is_covered: boolean;
  is_ranked_comment: boolean;
  media_id: string;
  private_reply_status: number;
  parent_comment_id?: string;
}

export interface ImageVersions2 {
  candidates: FirstFrame[];
  additional_candidates: AdditionalCandidates;
  smart_thumbnail_enabled: boolean;
}

export interface AdditionalCandidates {
  igtv_first_frame: FirstFrame;
  first_frame: FirstFrame;
  smart_frame: null;
}

export interface FirstFrame {
  width: number;
  height: number;
  url: string;
}

export interface MediaCroppingInfo {
  square_crop: SquareCrop;
}

export interface SquareCrop {
  crop_left: number;
  crop_right: number;
  crop_top: number;
  crop_bottom: number;
}

export interface SharingFrictionInfo {
  should_have_sharing_friction: boolean;
  bloks_app_url: null;
  sharing_friction_payload: null;
}

export interface Usertags {
  in: In[];
}

export interface In {
  user: CoauthorProducer;
  position: number[];
  start_time_in_video_in_sec: null;
  duration_in_video_in_sec: null;
}

export interface VideoVersion {
  type: number;
  width: number;
  height: number;
  url: string;
  id: string;
}

export interface PagingInfo {
  more_available: boolean;
  max_id?: string;
}
