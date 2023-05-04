
import { CommentDao } from './dao/CommentDao';
import { LikeDao,DislikeDao } from './dao/LikeDao';
import { PostDao } from './dao/PostDao';
import { UserDao } from './dao/UserDao';
import { SqlDataStore } from './sql';

export interface Datastore extends UserDao, PostDao, LikeDao,DislikeDao, CommentDao {}

export let db: Datastore;

export async function initDb() {
  db =await new SqlDataStore().openDb()
 }
