const detailService = require('../services/detailService');
const { catchAsync } = require('../utils/error');

const getDetailByProductId = catchAsync(async (req, res) => {
  const productId = +req.params.productId;

  const product = await detailService.getDetailByProductId(productId);

  return res.status(200).json(product);
});

module.exports = {
  getDetailByProductId,
};
