const cartService = require("../services/cartService");
const { catchAsync, raiseCustomError } = require("../utils/error");

const addCart = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const productId = req.params.productId;
  let { quantity } = req.body;

  if (!productId) {
    raiseCustomError(KEY_ERROR, 400);
  }

  await cartService.addCart(userId, productId, quantity);

  return res.status(201).json({ message: "productAdded" });
});

const getCartsByUserId = catchAsync(async (req, res) => {
  const userId = req.user.id;

  const carts = await cartService.getCartsByUserId(userId);

  return res.status(200).json(carts);
});

const modifyQuantity = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const productId = req.params.productId;
  const { quantity } = req.body;

  if (!productId) {
    raiseCustomError(KEY_ERROR, 400);
  }

  await cartService.modifyQuantity(userId, productId, quantity);

  return res.status(201).json({ message: "quantityModified" });
});

const deleteProduct = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const productId = req.params.productId;

  if (!productId) {
    raiseCustomError(KEY_ERROR, 400);
  }

  await cartService.deleteProduct(userId, productId);

  return res.status(201).json({ message: "productDeleted" });
});

module.exports = { addCart, getCartsByUserId, modifyQuantity, deleteProduct };
