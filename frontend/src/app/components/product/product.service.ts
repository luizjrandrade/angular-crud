import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, EMPTY, map, Observable } from 'rxjs';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  baseUrl = "http://localhost:3001/products"

  constructor(private snackBar: MatSnackBar, private http: HttpClient) {}

  //messagem na tela da criação do produto
  showMessage(msg: string, isError: boolean = false): void{
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ['msg-error'] : ['msg-sucess']
    });
  }

  //criação de produtos
  create(product: Product): Observable<Product>{
    return this.http.post<Product>(this.baseUrl, product).pipe(
      map(obj => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  //trata erros
  errorHandler(e: any): Observable<any>{
    //return this.http.get<Product[]>(this.baseUrl);
    this.showMessage('Ocorreu um erro', true);
    return EMPTY;
  }

  //array de produtos
  read(): Observable<Product[]>{
    return this.http.get<Product[]>(this.baseUrl)
  }

  //retornar o Id
  readById(id: string | null): Observable<Product>{
    const url = `${this.baseUrl}/${id}`
    return this.http.get<Product>(url)
  }

  //atualizar
  update(product: Product): Observable<Product>{
    const url = `${this.baseUrl}/${product.id}`
    return this.http.put<Product>(url, product)
  }

  //deletar
  delete(id: string): Observable<Product>{
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<Product>(url);
  }



}
