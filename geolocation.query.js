import { Product } from './model.mongodb';

async function findNearbyProducts(userLocation, maxDistance) {
  try {
    const products = await Product.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: userLocation,
          },
          $maxDistance: maxDistance, // distância máxima em metros
        },
      },
    });
    console.log('Produtos próximos: ', products);
  } catch (error) {
    console.error('Erro ao buscar produtos próximos:', error);
  }
}

findNearbyProducts([37.7749, -122.4194], 10000);
