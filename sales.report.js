async function generateSalesReportBySeller() {
  try {
      const report = await Transaction.aggregate([
          {
              $group: {
                  _id: '$user',
                  totalSales: { $sum: '$totalPrice' },
                  totalTransactions: { $sum: 1 },
              },
          },
          {
              $lookup: {
                  from: 'users',
                  localField: '_id',
                  foreignField: '_id',
                  as: 'userDetails',
              },
          },
          { $unwind: '$userDetails' },
          {
              $project: {
                  seller: '$userDetails.name',
                  totalSales: 1,
                  totalTransactions: 1,
              },
          },
      ]);

      console.log('Relatório de vendas por vendedor: ', report);
  } catch (error) {
      console.error('Erro ao gerar relatório de vendas:', error);
  }
}

generateSalesReportBySeller();
