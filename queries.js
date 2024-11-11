

const findProductsByCategory = async (categoryId) => {
    try {
      const products = await Product.find({ category: categoryId }).populate('category');
      console.log(products);
    } catch (error) {
      console.error(error);
    }
};

const findReviewsByProduct = async (productId) => {
    try {
      const reviews = await Review.find({ product: productId }).populate('user');
      console.log(reviews);
    } catch (error) {
      console.error(error);
    }
  };
  


const createTransaction = async (userId, productId, quantity) => {
    try {
      const product = await Product.findById(productId);
      const totalPrice = product.price * quantity;
      const transaction = new Transaction({
        user: userId,
        product: productId,
        quantity,
        totalPrice,
      });
  
      await transaction.save();
      console.log('Transaction created:', transaction);
    } catch (error) {
      console.error(error);
    }
  };


  const updateProductQuantityAfterPurchase = async (productId, quantityPurchased) => {
    try {
      const product = await Product.findById(productId);
      if (product.quantity >= quantityPurchased) {
        product.quantity -= quantityPurchased;
        await product.save();
        console.log('Product quantity updated:', product);
      } else {
        console.log('Not enough stock');
      }
    } catch (error) {
      console.error(error);
    }
  };
  


  
  



  


  