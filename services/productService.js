const productDao = require('../models/productDao');
const { raiseCustomError } = require('../utils/error');

const getProductsByParameter = async (param) => {
  const makeNameFilter = (name) => {
    if (typeof name == 'object') {
      let nameClauses = name.map((x) => `C.name = '${x}'`);
      return `(${nameClauses.join(' OR ')})`;
    } else {
      return `(C.name ='${name}')`;
    }
  };

  const makeTypeFilter = (type) => {
    if (typeof type == 'object') {
      let typeClauses = type.map((x) => `PT.name = '${x}'`);
      return `(${typeClauses.join(' OR ')})`;
    } else {
      return `(PT.name ='${type}')`;
    }
  };

  const makeWhereClauseBuilder = (param) => {
    if (Object.keys(param).length === 0) {
      return ``;
    }
    const builderSet = {
      name: makeNameFilter,
      type: makeTypeFilter,
    };

    const whereClauses = Object.entries(param).map(([key, value]) => {
      return builderSet[key](value);
    });

    return `WHERE ${whereClauses.join(' AND ')}`;
  };

  const products = await productDao.getProductsByParameter(
    makeWhereClauseBuilder(param)
  );

  if (!products) {
    raiseCustomError('products does not exist', 404);
  }
  return products;
};

module.exports = {
  getProductsByParameter,
};
