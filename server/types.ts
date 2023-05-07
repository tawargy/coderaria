
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
}

export interface Post {
  id: string;
  title: string;
  url: string;
  userId: string;
  postedAt: number;
  likes?:number;
  dislike?:number;
  userLike?:boolean;
  userDislike?:boolean;
  comments?:number;
  user?:string
}
export interface Like {
  userId: string;
  postId: string;
}
export interface Dislike extends Like{}


export interface Comment {
  id: string;
  userId: string;
  postId: string;
  comment: string;
  postedAt: number;
}

export interface JwtObject{
  userId:string
}
