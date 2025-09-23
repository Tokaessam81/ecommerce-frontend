import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProduct } from '../interfaces/Iproduct';
import { map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductService {
  deleteProduct(id: number) {
    return this.http.delete(`${this.base}DeleteProduct/${id}`);
  }
 updateProduct(productData: FormData, id: number): Observable<any> {
  return this.http.put(`${this.base}UpdateProduct`, productData, {
    reportProgress: true,
    observe: 'events' 
  });
}


  private base = (window as any).__env?.API_URL || 'https://mecommerce.runasp.net/api/Product/';

  constructor(private http: HttpClient) {}
 createProduct(productData: FormData): Observable<any> {
    return this.http.post(`${this.base}CreateProduct`, productData);
  }
  getProducts(): Observable<IProduct[]> {
    return this.http.get<{ statusCode: number; message: string; result: IProduct[] }>(`${this.base}GetAllProducs`)
      .pipe(
        map(res => res.result) 
      );
  }
  getProductById(id: string): Observable<IProduct> {
  return this.http.get<{ statusCode: number; message: string; result: IProduct }>(`${this.base}GetProductById/${id}`)
    .pipe(
      map(res => res.result)
    );
    
}

}
