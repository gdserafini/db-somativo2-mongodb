import { User } from "./model.mongodb";
import { Product } from "./model.mongodb";
import { Category } from "./model.mongodb";

const users = [
  {
    name: 'Lucas Oliveira',
    email: 'lucas.oliveira@email.com',
    password: 'senha456',
    address: {
      street: 'Rua F, 303',
      city: 'Recife',
      state: 'PE',
      zipCode: '50000-000',
    },
  },
  {
    name: 'Ana Souza',
    email: 'ana.souza@email.com',
    password: 'senha123',
    address: {
      street: 'Rua A, 123',
      city: 'Rio de Janeiro',
      state: 'RJ',
      zipCode: '20000-000',
    },
  },
  {
    name: 'Carlos Pereira',
    email: 'carlos.pereira@email.com',
    password: 'senha789',
    address: {
      street: 'Av. B, 456',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01010-010',
    },
  },
  {
    name: 'Mariana Costa',
    email: 'mariana.costa@email.com',
    password: 'senha234',
    address: {
      street: 'Rua C, 789',
      city: 'Belo Horizonte',
      state: 'MG',
      zipCode: '30000-000',
    },
  },
  {
    name: 'Ricardo Lima',
    email: 'ricardo.lima@email.com',
    password: 'senha321',
    address: {
      street: 'Praça D, 101',
      city: 'Curitiba',
      state: 'PR',
      zipCode: '80000-000',
    },
  },
];

async function createUsers() {
  try {
    const savedUsers = await User.insertMany(users);
    savedUsers.forEach((user) => {
      console.log('User saved: ', user);
    });
  } catch (error) {
    console.log(error);
  }
}

const categoryId1 = mongoose.Types.ObjectId('64c36fcb3c2d9c1a5b8b3f5f');
const categoryId2 = mongoose.Types.ObjectId('64c36fcb3c2d9c1a5b8b3f6b');
const categoryId3 = mongoose.Types.ObjectId('64c36fcb3c2d9c1a5b8b3f6c');

const categories = [
  {
    name: 'Eletrônicos',
    description: 'Produtos eletrônicos, como smartphones, computadores e acessórios.',
    parentCategory: null,
  },
  {
    name: 'Vestuário',
    description: 'Roupas e acessórios de moda, como camisetas, calças e casacos.',
    parentCategory: categoryId3,
  },
  {
    name: 'Acessórios',
    description: 'Produtos complementares, como fones de ouvido, mochilas e capinhas.',
    parentCategory: categoryId1,
  },
  {
    name: 'Calçados',
    description: 'Produtos para os pés, como tênis, sandálias e botas.',
    parentCategory: categoryId2,
  },
  {
    name: 'Casa e Decoração',
    description: 'Produtos para decoração e utensílios de casa, como móveis e itens decorativos.',
    parentCategory: null,
  },
];

async function createCategories() {
    try {
      const savedCategories = await Category.insertMany(categories);
      savedCategories.forEach((category) => {
        console.log('Category saved: ', category);
      });
    } catch (error) {
      console.log(error);
    }
}

const products = [
    {
      name: 'Smartphone XYZ',
      description: 'Smartphone com tela de 6.5" e câmera de 48MP, ideal para quem busca um bom custo-benefício.',
      price: 1500.00,
      quantity: 30,
      category: categoryId1,
    },
    {
      name: 'Camiseta Estampada',
      description: 'Camiseta de algodão com estampa divertida, confortável e resistente, disponível em várias cores.',
      price: 49.90,
      quantity: 100,
      category: categoryId2,
    },
    {
      name: 'Fone de Ouvido Bluetooth',
      description: 'Fone de ouvido sem fio, com qualidade de som de alta definição, e tecnologia de cancelamento de ruído.',
      price: 299.90,
      quantity: 50,
      category: categoryId3,
    },
    {
      name: 'Tênis Running 3000',
      description: 'Tênis esportivo confortável, ideal para corridas e caminhadas, com excelente tração e durabilidade.',
      price: 399.90,
      quantity: 20,
      category: categoryId2,
    },
    {
      name: 'Notebook Gamer',
      description: 'Notebook com 16GB de RAM e placa gráfica NVIDIA GTX 1650, ideal para jogos e uso profissional.',
      price: 3500.00,
      quantity: 10,
      category: categoryId1,
    },
  ];
  
async function createProducts() {
    try {
      const savedProducts = await Product.insertMany(products);
      savedProducts.forEach((product) => {
        console.log('Product saved: ', product);
      });
    } catch (error) {
      console.log(error);
    }
}

createUsers();
createCategories();
createProducts();