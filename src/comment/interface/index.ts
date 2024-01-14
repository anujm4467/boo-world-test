export interface IComment {
  _id?: string;
  profileId: string;
  title: string;
  description: string;
  systemTag: string;
  likeCount: number;
  createdAt: Date;
}

export interface CommentLikeCount {
  _id?: string;
  commentId: string;
  profileId: string;
}
