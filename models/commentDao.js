const { database } = require('./dataSource');

const createComment = async (userId, content, rate, productId) => {
  const comment = await database.query(
    `
      INSERT INTO comments(
        user_id, 
        content, 
        rate, 
        product_id
        )
      VALUES(?, ?, ?, ?);
      `,
    [userId, content, rate, productId]
  );
  return comment;
};

const getCommentsByProductId = async (productId) => {
  const comments = await database.query(
    `
      SELECT 
        product_id,
        JSON_ARRAYAGG( 
        JSON_OBJECT(
          "userName", users.name,
          "content", comments.content,
          "rate", comments.rate)
        ) AS comments
      FROM
        comments
      LEFT JOIN
        users ON users.id = comments.user_id
      WHERE
        comments.product_id = ?
      GROUP BY
        comments.product_id            
    `,
    [productId]
  );
  return comments;
};

module.exports = {
  createComment,
  getCommentsByProductId,
};
