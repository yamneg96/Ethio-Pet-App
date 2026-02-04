import { PaymentProvider } from './payment-provider.interface';

export class DummyPaymentProvider implements PaymentProvider {
  async initiatePayment(amount: number, currency: string) {
    return { providerPaymentId: `dummy_${Date.now()}` };
  }

  async verifyPayment() {
    return { status: 'PENDING' as const };
  }
}
