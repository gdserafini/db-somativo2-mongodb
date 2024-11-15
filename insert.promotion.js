import mongoose from 'mongoose';
import { Promotion } from './model.mongodb';

async function createPromotion() {
  const productId = mongoose.Types.ObjectId('ID_DO_PRODUTO'); // Substitua 'ID_DO_PRODUTO' pelo ID real do produto

  const newPromotion = {
    product: productId,
    discountPercentage: 20,
    startDate: new Date('2024-11-01'),
    endDate: new Date('2024-11-30'),
  };

  try {
    const savedPromotion = await Promotion.create(newPromotion);
    console.log('Promoção criada: ', savedPromotion);
  } catch (error) {
    console.error('Erro ao criar promoção:', error);
  }
}

createPromotion();
