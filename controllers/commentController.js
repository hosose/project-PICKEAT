const commentService = require('../services/commentService');
const { catchAsync, raiseCustomError } = require('../utils/error');

const createComment = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const productId = req.params.productId;
  const { content, rate } = req.body;

  if (!userId || !content || !rate || productId !== Number) {
    raiseCustomError('KEY_ERROR', 400);
  }

  await commentService.createComment(userId, content, rate, productId);
  return res.status(201).json({
    message: 'SUCCESS',
  });
});

const getCommentsByProductId = catchAsync(async (req, res) => {
  const { productId } = req.params;

  if (productId !== Number) {
    raiseCustomError('KEY_ERROR', 400);
  }
  const comments = await commentService.getCommentsByProductId(productId);

  return res.status(200).json({ data: comments });
});

module.exports = { createComment, getCommentsByProductId };
