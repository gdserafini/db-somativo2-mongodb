async function averageDistanceBetweenBuyersAndSellers() {
    const transactions = await Transaction.aggregate([
      {
        $lookup: {
          from: 'products',
          localField: 'product',
          foreignField: '_id',
          as: 'productDetails',
        },
      },
      {
        $unwind: '$productDetails',
      },
      {
        $lookup: {
          from: 'users',
          localField: 'user',
          foreignField: '_id',
          as: 'userDetails',
        },
      },
      {
        $unwind: '$userDetails',
      },
      {
        $project: {
          buyerLocation: '$userDetails.location.coordinates',
          sellerLocation: '$productDetails.location.coordinates',
        },
      },
      {
        $project: {
          distance: {
            $geoNear: {
              near: { type: 'Point', coordinates: '$buyerLocation' },
              distanceField: 'distance',
              spherical: true,
            },
          },
        },
      },
    ]);
    console.log('Média de distância entre compradores e vendedores: ', transactions);
  }
  
  averageDistanceBetweenBuyersAndSellers();
  