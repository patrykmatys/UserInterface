export type Category = {
    id: string;
    name: string;
  };
  
export type Item = {
    id: string;
    name: string;
    category: string;
    price: number;
    created: number | null;
    updated: number | null;
  };
