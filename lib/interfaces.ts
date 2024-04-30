export interface PostData {
  id: string;
  username: string;
  content: string;
}

export interface ReplyData {
  id: string;
  username: string;
  content: string;
  postId: string;
}
