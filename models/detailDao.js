const { database } = require('./dataSource');

const getDetailByProductId = async (productId) => {
  const [lecture] = await database.query(
    `
      SELECT
            P.id AS id,
            title,
            description,
            price,
            C.name AS category,
            thumbnail_image_url AS profileImg,
            PI.images
      FROM
            products AS P
      LEFT JOIN
            categories as C
      ON
            C.id = P.category_id
      LEFT JOIN(
            SELECT
                  product_id,
            JSON_ARRAYAGG(
                  JSON_OBJECT(
                        "id", id,
                        "image", image_url
                  )
            ) AS images
            FROM
                  product_images
            GROUP BY 
                  product_id
      ) PI 
      ON 
            P.id = PI.product_id
      WHERE 
            P.id = ?
    `,
    [productId]
  );
  return lecture;
};

module.exports = {
  getDetailByProductId,
};
