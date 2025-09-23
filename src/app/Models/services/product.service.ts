import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProduct } from '../interfaces/Iproduct';
import { map, Observable } from 'rxjs';
import { environment } from '../../Env/Enviroment';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private base = `${environment.apiUrl}/Product/`;
  deleteProduct(id: number) {
    return this.http.delete(`${this.base}DeleteProduct/${id}`);
  }
 updateProduct(productData: FormData, id: number): Observable<any> {
  return this.http.put(`${this.base}UpdateProduct`, productData, {
    reportProgress: true,
    observe: 'events' 
  });
}


  

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
