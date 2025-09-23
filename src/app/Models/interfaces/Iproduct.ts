export interface IProduct {
     id: number; 
     name: string;
     productCode: string;
     category: string;
     imagePath: string;
     price: number;
     minimumQuantity: number;
     discountRate?: number | null;
}
