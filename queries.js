// Função para encontrar produtos por categoria e preencher informações da categoria
const findProductsByCategory = async (categoryId) => {
  try {
    const products = await Product.find({ category: categoryId }).populate('category');
    console.log('Produtos encontrados:', products);
  } catch (error) {
    console.error('Erro ao buscar produtos por categoria:', error);
  }
};

// Função para encontrar avaliações de um produto específico e preencher informações do usuário
const findReviewsByProduct = async (productId) => {
  try {
    const reviews = await Review.find({ product: productId }).populate('user');
    console.log('Avaliações encontradas:', reviews);
  } catch (error) {
    console.error('Erro ao buscar avaliações do produto:', error);
  }
};

// Função para criar uma transação e calcular o preço total com base na quantidade
const createTransaction = async (userId, productId, quantity) => {
  try {
    const product = await Product.findById(productId);
    if (!product) throw new Error('Produto não encontrado');

    const totalPrice = product.price * quantity;
    const transaction = new Transaction({
      user: userId,
      product: productId,
      quantity,
      totalPrice,
    });
    
    await transaction.save();
    console.log('Transação criada:', transaction);
  } catch (error) {
    console.error('Erro ao criar transação:', error);
  }
};

// Função para atualizar a quantidade de um produto após uma compra
const updateProductQuantityAfterPurchase = async (productId, quantityPurchased) => {
  try {
    const product = await Product.findById(productId);
    if (!product) throw new Error('Produto não encontrado');

    if (product.quantity >= quantityPurchased) {
      product.quantity -= quantityPurchased;
      await product.save();
      console.log('Quantidade do produto atualizada:', product);
    } else {
      console.log('Estoque insuficiente');
    }
  } catch (error) {
    console.error('Erro ao atualizar quantidade do produto:', error);
  }
};
