import { Product } from './model.mongodb';

async function findNearbyProducts(userLocation, maxDistance) {
  const products = await Product.find({
    location: {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: userLocation,
        },
        $maxDistance: maxDistance, 
      },
    },
  });
  console.log('Produtos próximos: ', products);
}

findNearbyProducts([37.7749, -122.4194], 10000);
