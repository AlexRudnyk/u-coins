export type Coin = {
  _id?: string;
  title: string;
  year: string;
  photoURL: string[];
  spec: string;
  price: number;
  description: string;
  comments?: [
    {
      _id: string;
      userName: string;
      text: string;
      reply: string;
      date: Date;
    }
  ];
};
