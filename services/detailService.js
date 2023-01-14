const lectureDao = require('../models/detailDao');
const { raiseCustomError } = require('../utils/error');

const getDetailByProductId = async (productId) => {
  const lecture = await lectureDao.getDetailByProductId(productId);

  if (!lecture) {
    raiseCustomError('lecture does not exist', 404);
  }

  return lecture;
};

module.exports = {
  getDetailByProductId,
};
