import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  try {
    const transations = transactionsRepository.all()
    return response.json(transations)
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    const { title, value, type } = request.body;

    const createTransaction = new CreateTransactionService(transactionsRepository);

    const transaction = createTransaction.execute({ title, value, type });

    return response.json(transaction)

  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;


/**
 * [x] should be able to list the transactions
 * [x] should be able to create a new transaction
 * [x] should not be able to create outcome transaction without a valid balance
 */
