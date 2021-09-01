import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ProductDto } from "src/app/dtos/product.dto";

const endpoint = 'products/'

@Injectable()
export class AdminProductService {
    constructor(private httpClient: HttpClient) { }

    getList(): Observable<ProductDto[]> {
        return this.httpClient.get<ProductDto[]>(endpoint)
    }

    getById(id: number): Observable<ProductDto> {
        return this.httpClient.get<ProductDto>(endpoint + id)
    }

    add(dto: ProductDto): Observable<ProductDto> {
        return this.httpClient.post<ProductDto>(endpoint, dto)
    }

    update(id: number, dto: ProductDto): Observable<ProductDto> {
        return this.httpClient.put<ProductDto>(endpoint + id, dto)
    }

    delete(id: number): Observable<void> {
        return this.httpClient.delete<void>(endpoint + id)
    }
}