import { inject, Service, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { DeliveryMethod } from '../../shared/models/deliveryMethod';
import { map, of } from 'rxjs';

@Service()
export class CheckoutService {
    baseUrl = environment.apiUrl;
    private http = inject(HttpClient);
    deliveryMethods= signal<DeliveryMethod[]>([]);

    getDeliveryMethods(){
        if(this.deliveryMethods.length>0) return of(this.deliveryMethods())
        return this.http.get<DeliveryMethod[]>(this.baseUrl + 'payments/delivery-methods').pipe(
    map(methods =>{
        this.deliveryMethods.set(methods.sort((a,b) => b.price - a.price));
        return methods;
    })
    )
    }
}
