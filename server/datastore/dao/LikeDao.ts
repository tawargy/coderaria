import { Like,Dislike } from '../../types';

export interface LikeDao {
  createLike(like: Like): Promise<Like>;
  deleteLike(userId: string): Promise<void>;
  getLikes(postId: string): Promise<number>;
  getUserLike(userId: string,postId:string): Promise<Like | undefined>;
}

export interface DislikeDao {
  createDislike(dislike: Dislike): Promise<Dislike>;
  deleteDislike(userId: string): Promise<void>;
  getDislikes(postId: string): Promise<number>;
  getUserDislike(userId: string,postId:string): Promise<Dislike | undefined>;
}
