import { inject, Service } from '@angular/core';
import { CartService } from './cart.service';
import { forkJoin, of, tap } from 'rxjs';
import { AccountService } from './account.service';
import { SignalrService } from './signalr.service';

@Service()
export class InitService {
    private cartService = inject(CartService);
    private accountService = inject(AccountService);
    private signalRService = inject(SignalrService);

    init(){
        const cartId = localStorage.getItem('cart_id');
        const cart$ = cartId ? this.cartService.getCart(cartId) : of(null);
        return forkJoin({
            cart: cart$,
            user: this.accountService.getUserInfo().pipe(
                tap(user =>{
                    if(user) this.signalRService.createHubConnection();
                })
            )
        })
    }
}
