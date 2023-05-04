import {open as sqliteOpen, Database} from 'sqlite'
import sqlite3 from 'sqlite3'
import path from 'path'
import {Datastore} from '..'
import {Post, User, Comment, Like, Dislike} from '../../types'

export class SqlDataStore implements Datastore {
  private db!: Database<sqlite3.Database, sqlite3.Statement>

  public async openDb() {
    //open the database
    this.db = await sqliteOpen({
      filename: path.join(__dirname, 'coderaria.sqlite'),
      driver: sqlite3.Database,
    })
    this.db.run('PRAGMA foreign_keys=ON;')
    await this.db.migrate({
      migrationsPath: path.join(__dirname, 'migrations'),
    })

    return this
  }

  async createPost(post: Post): Promise<void> {
    await this.db.run(
      'INSERT INTO posts (id,title,url,postedAt,userId) VALUES (?,?,?,?,?)',
      post.id,
      post.title,
      post.url,
      post.postedAt,
      post.userId,
    )
  }
  listPosts(): Promise<Post[]> {
    return this.db.all<Post[]>('SELECT * FROM posts')
  }

  async getPost(id: string): Promise<Post | undefined> {
    return await this.db.get('SELECT * FROM posts WHERE id =?', id)
  }

  async deletePost(id: string): Promise<void> {
    await this.db.run('DELETE FROM posts WHERE id=? ', id)
  }
  async createUser(user: User): Promise<void> {
    await this.db.run(
      'INSERT INTO users (id,firstName,lastName,userName,email,password) VALUES (?,?,?,?,?,?)',
      user.id,
      user.firstName,
      user.lastName,
      user.userName,
      user.email,
      user.password,
    )
  }
  async getUserById(id: string): Promise<User | undefined> {
    return await this.db.get('SELECT * From users WHERE id=?', id)
  }
  async getUserByEmail(email: string): Promise<User | undefined> {
    return await this.db.get('SELECT * FROM users WHERE email=?', email)
  }
  async getUserByUsername(userName: string): Promise<User | undefined> {
    return await this.db.get('SELECT * FROM users WHERE userName =?', userName)
  }
  async createComment(comment: Comment): Promise<void> {
    await this.db.run(
      'INSERT INTO comments (id,userId,postId,comment,postedAt) VALUES(?,?,?,?,?)',
      comment.id,
      comment.userId,
      comment.postId,
      comment.comment,
      comment.postedAt,
    )
  }
  async listComments(postId: string): Promise<Comment[]> {
    return await this.db.all('SELECT * FROM comments WHERE postId=?', postId)
  }
  async deleteComment(id: string): Promise<void> {
    await this.db.run('DELETE FROM comments WHERE id=?', id)
  }
  async commentsCount(postId: string): Promise<number> {
    const comments = await this.db.get(
      'SELECT COUNT(*) FROM comments WHERE postId=?',
      postId,
    )
    return comments['COUNT(*)']
  }

  async createLike(like: Like): Promise<Like> {
    this.db.run(
      'INSERT INTO likes(userId,postId) VALUES(?,?)',
      like.userId,
      like.postId,
    )
    return like
  }
  async deleteLike(userId: string): Promise<void> {
    await this.db.run('DELETE FROM likes WHERE userId=?', userId)
  }

  async getLikes(postId: string): Promise<number> {
    const likes = await this.db.get(
      'SELECT COUNT(*) FROM likes WHERE postId=?',
      postId,
    )
    return likes['COUNT(*)']
  }
  async getUserLike(userId: string, postId: string): Promise<Like> {
    const like = await this.db.get(
      'SELECT * FROM likes WHERE userId=? AND postId=?',
      userId,
      postId,
    )
    return like
  }
  async createDislike(dislike: Dislike): Promise<Dislike> {
    this.db.run(
      'INSERT INTO dislikes(userId,postId) VALUES(?,?)',
      dislike.userId,
      dislike.postId,
    )
    return dislike
  }
  async deleteDislike(userId: string): Promise<void> {
    await this.db.run('DELETE FROM dislikes WHERE userId=?', userId)
  }
  async getDislikes(postId: string): Promise<number> {
    const dislikes = await this.db.get(
      'SELECT COUNT(*) FROM dislikes WHERE postId=?',
      postId,
    )
    return dislikes['COUNT(*)']
  }
  async getUserDislike(
    userId: string,
    postId: string,
  ): Promise<Dislike | undefined> {
    const dislike = await this.db.get(
      'SELECT * FROM dislikes WHERE userId=? AND postId=?',
      userId,
      postId,
    )
    return dislike
  }
}
