async function averageDistanceBetweenBuyersAndSellers() {
  try {
      const transactions = await Transaction.aggregate([
          {
              $lookup: {
                  from: 'products',
                  localField: 'product',
                  foreignField: '_id',
                  as: 'productDetails',
              },
          },
          { $unwind: '$productDetails' },
          {
              $lookup: {
                  from: 'users',
                  localField: 'user',
                  foreignField: '_id',
                  as: 'userDetails',
              },
          },
          { $unwind: '$userDetails' },
          {
              $project: {
                  buyerLocation: '$userDetails.location.coordinates',
                  sellerLocation: '$productDetails.location.coordinates',
              },
          },
          {
              $addFields: {
                  distance: {
                      $function: {
                          body: function (buyerLocation, sellerLocation) {
                              const R = 6371; // Raio da Terra em km
                              const dLat = (sellerLocation[1] - buyerLocation[1]) * (Math.PI / 180);
                              const dLon = (sellerLocation[0] - buyerLocation[0]) * (Math.PI / 180);
                              const a =
                                  Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                                  Math.cos(buyerLocation[1] * (Math.PI / 180)) *
                                  Math.cos(sellerLocation[1] * (Math.PI / 180)) *
                                  Math.sin(dLon / 2) * Math.sin(dLon / 2);
                              const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                              return R * c; // Distância em km
                          },
                          args: ['$buyerLocation', '$sellerLocation'],
                          lang: 'js'
                      }
                  }
              }
          },
          {
              $group: {
                  _id: null,
                  averageDistance: { $avg: '$distance' }
              }
          },
          {
              $project: {
                  _id: 0,
                  averageDistance: 1
              }
          }
      ]);

      console.log('Média de distância entre compradores e vendedores: ', transactions[0].averageDistance);
  } catch (error) {
      console.error(error);
  }
}

averageDistanceBetweenBuyersAndSellers();
