import { Transaction } from './model.mongodb';
import { LoyaltyPoints } from './model.mongodb';

async function updateLoyaltyPoints(transactionId) {
  try {
    const transaction = await Transaction.findById(transactionId).populate('user');
    if (!transaction) throw new Error('Transação não encontrada');

    const pointsEarned = transaction.totalPrice * 0.1;

    let userLoyalty = await LoyaltyPoints.findOne({ user: transaction.user._id });

    if (!userLoyalty) {
      userLoyalty = new LoyaltyPoints({ user: transaction.user._id, points: 0 });
    }

    userLoyalty.points += pointsEarned;
    await userLoyalty.save();

    console.log('Pontos de fidelidade atualizados para o usuário:', userLoyalty);
  } catch (error) {
    console.error('Erro ao atualizar pontos de fidelidade:', error);
  }
}

updateLoyaltyPoints('ID_DA_TRANSACAO');
