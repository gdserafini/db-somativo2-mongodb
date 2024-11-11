import { Transaction } from './model.mongodb';
import { LoyaltyPoints } from './model.mongodb';

async function updateLoyaltyPoints(transactionId) {
  const transaction = await Transaction.findById(transactionId).populate('user');
  const pointsEarned = transaction.totalPrice * 0.1;

  let userLoyalty = await LoyaltyPoints.findOne({ user: transaction.user._id });
  
  if (!userLoyalty) {
    userLoyalty = new LoyaltyPoints({ user: transaction.user._id });
  }
  
  userLoyalty.points += pointsEarned;
  await userLoyalty.save();
  console.log('Pontos de fidelidade atualizados para o usuário: ', userLoyalty);
}

updateLoyaltyPoints('ID_DA_TRANSACAO');
