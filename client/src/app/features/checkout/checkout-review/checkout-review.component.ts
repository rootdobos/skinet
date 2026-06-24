import { Component, inject, input, Input } from '@angular/core';
import { CartService } from '../../../core/services/cart.service';
import { CurrencyPipe, JsonPipe } from '@angular/common';
import { ConfirmationToken } from '@stripe/stripe-js';
import { AddressPipe } from '../../../shared/pipes/address-pipe';
import { PaymentMethodPipe } from '../../../shared/pipes/payment-method-pipe';

@Component({
  selector: 'app-checkout-review',
  imports: [CurrencyPipe, AddressPipe, PaymentMethodPipe],
  templateUrl: './checkout-review.component.html',
  styleUrl: './checkout-review.component.css',
})
export class CheckoutReviewComponent {
  cartService = inject(CartService);
  confirmationToken = input<ConfirmationToken | null>();
}
