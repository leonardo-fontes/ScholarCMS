interface User {
  id: number;
  name: string;
  surname: string;
  email: string;
  user_picture: string;
}

interface Transaction {
  amount: number;
}

export interface Notification {
  id: number;
  isRead: boolean;
  createdAt: string;
  fromUser: User;
  transaction: Transaction;
}
