import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all() {

    const balance = this.transactions.length === 0 ? {
      income: 0,
      outcome: 0,
      total: 0
    } : this.getBalance()

    const transactions = {
      transactions: this.transactions,
      balance
    }

    return transactions;
  }

  public getBalance(): Balance {

    const income = this.transactions
      .filter(el => el.type === 'income')
      .reduce((accumulator, currentValue) => accumulator + currentValue.value, 0);

    const outcome = this.transactions
      .filter(el => el.type === 'outcome')
      .reduce((accumulator, currentValue) => accumulator + currentValue.value, 0);

    const balance = {
      income,
      outcome,
      total: income - outcome
    }

    return balance
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {

    const balance = this.getBalance()

    if (type === 'outcome' && balance.total < value) {
      throw Error('Not enough balance for the outcome.')
    }

    const transaction = new Transaction({
      title,
      value,
      type,
    })

    this.transactions.push(transaction)

    return transaction
  }
}

export default TransactionsRepository;
