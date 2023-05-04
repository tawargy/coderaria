
CREATE TABLE likes(
  userId      VARCHAR NOT NULL  ,
  postId      VARCHAR NOT NULL,
  FOREIGN KEY (userId) REFERENCES users (id),
  FOREIGN KEY (postId) REFERENCES posts (id)
);

CREATE TABLE dislikes(
  userId      VARCHAR NOT NULL,
  postId      VARCHAR NOT NULL,
  FOREIGN KEY (userId) REFERENCES users (id),
  FOREIGN KEY (postId) REFERENCES posts (id)
)

