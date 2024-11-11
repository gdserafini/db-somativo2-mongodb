const averageRatingsPerProduct = async () => {
  try {
    const aggregation = await Review.aggregate([
      { $group: { _id: '$product', averageRating: { $avg: '$rating' } } },
      { $lookup: { from: 'products', localField: '_id', foreignField: '_id', as: 'product' } },
      { $unwind: '$product' },
      { $project: { productName: '$product.name', averageRating: 1 } },
    ]);
    console.log(aggregation);
  } catch (error) {
    console.error(error);
  }
};

const totalSalesPerCategory = async () => {
  try {
    const aggregation = await Transaction.aggregate([
      { $lookup: { from: 'products', localField: 'product', foreignField: '_id', as: 'product' } },
      { $unwind: '$product' },
      { $group: { _id: '$product.category', totalSales: { $sum: '$totalPrice' } } },
      { $lookup: { from: 'categories', localField: '_id', foreignField: '_id', as: 'category' } },
      { $unwind: '$category' },
      { $project: { categoryName: '$category.name', totalSales: 1 } },
    ]);
    console.log(aggregation);
  } catch (error) {
    console.error(error);
  }
};
