import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Nome é obrigatório'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'E-mail é obrigatório'],
    unique: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, 'Por favor, insira um e-mail válido'],
  },
  password: {
    type: String,
    required: [true, 'Senha é obrigatória'],
    minlength: [6, 'Senha deve ter no mínimo 6 caracteres'],
  },
  address: {
    street: {
      type: String,
      required: [true, 'Rua é obrigatória'],
    },
    city: {
      type: String,
      required: [true, 'Cidade é obrigatória'],
    },
    state: String,
    zipCode: String,
  },
});
userSchema.index({email: 1})
userSchema.index({name: 1})

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Nome do produto é obrigatório'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Descrição é obrigatória'],
    minlength: [10, 'Descrição deve ter no mínimo 10 caracteres'],
  },
  price: {
    type: Number,
    required: [true, 'Preço é obrigatório'],
    min: [0, 'Preço não pode ser negativo'],
  },
  quantity: {
    type: Number,
    required: [true, 'Quantidade disponível é obrigatória'],
    min: [0, 'Quantidade não pode ser negativa'],
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Categoria é obrigatória'],
  },

  location: {
    type: { type: String, enum: ['Point'], required: true },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true,
    },
  },
});
userSchema.index({ location: '2dsphere' });
productSchema.index({category: 1})
productSchema.index({name: 1})

const transactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Usuário é obrigatório'],
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: [true, 'Produto é obrigatório'],
  },
  quantity: {
    type: Number,
    required: [true, 'Quantidade comprada é obrigatória'],
    min: [1, 'Quantidade deve ser no mínimo 1'],
  },
  totalPrice: {
    type: Number,
    required: [true, 'Preço total é obrigatório'],
  },
  transactionDate: {
    type: Date,
    default: Date.now,
  },
});
transactionSchema.index({transactionDate: 1})
transactionSchema.index({user: 1})
transactionSchema.index({product: 1})

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Usuário é obrigatório'],
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: [true, 'Produto é obrigatório'],
  },
  rating: {
    type: Number,
    required: [true, 'Avaliação é obrigatória'],
    min: [1, 'Avaliação deve ser no mínimo 1'],
    max: [5, 'Avaliação deve ser no máximo 5'],
  },
  reviewText: {
    type: String,
    required: [true, 'Texto da avaliação é obrigatório'],
    minlength: [10, 'Texto da avaliação deve ter no mínimo 10 caracteres'],
  },
  reviewDate: {
    type: Date,
    default: Date.now,
  },
});
reviewSchema.index({user: 1})
reviewSchema.index({product: 1})

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Nome da categoria é obrigatório'],
    unique: true,
    trim: true,
  },
  parentCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
  description: {
    type: String,
    required: [true, 'Descrição da categoria é obrigatória'],
  },
});
categorySchema.index({name: 1})


const promotionSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: [true, 'Produto é obrigatório'],
  },
  discountPercentage: {
    type: Number,
    required: [true, 'Porcentagem de desconto é obrigatória'],
    min: [0, 'Desconto não pode ser negativo'],
    max: [100, 'Desconto não pode ser superior a 100%'],
  },
  startDate: {
    type: Date,
    required: [true, 'Data de início é obrigatória'],
  },
  endDate: {
    type: Date,
    required: [true, 'Data de término é obrigatória'],
  },
});

const loyaltyPointsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Usuário é obrigatório'],
  },
  points: {
    type: Number,
    default: 0,
  },
});


export const User = mongoose.model('User', userSchema);
export const Product = mongoose.model('Product', productSchema);
export const Transaction = mongoose.model('Transaction', transactionSchema);
export const Review = mongoose.model('Review', reviewSchema);
export const Category = mongoose.model('Category', categorySchema);
export const Promotion = mongoose.model('Promotion', promotionSchema);
export const LoyaltyPoints = mongoose.model('LoyaltyPoints', loyaltyPointsSchema);


