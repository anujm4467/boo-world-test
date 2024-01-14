export interface IComment {
  _id?: string;
  profileId: string;
  title: string;
  description: string;
  systemTag: string;
  createdAt: Date;
}
