export interface PaymentProvider {
  initiatePayment(amount: number, currency: string, metadata?: Record<string, string>): Promise<{ providerPaymentId: string; redirectUrl?: string }>;
  verifyPayment(providerPaymentId: string): Promise<{ status: 'SUCCESS' | 'FAILED' | 'PENDING' }>;
}
