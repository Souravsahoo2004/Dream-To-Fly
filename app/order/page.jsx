// app/order/page.jsx
import { Suspense } from 'react';
import OrderContent from './OrderContent';

export default function OrderPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrderContent />
    </Suspense>
  );
}