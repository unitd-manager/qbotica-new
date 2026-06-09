'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Import AntD styles only in this lazy component
import 'antd/dist/reset.css';

const PasswordProtectionComponent = dynamic(
  () => import('./PasswordProtection'),
  {
    loading: () => <div style={{ padding: '20px', textAlign: 'center' }}>Loading...</div>,
    ssr: false,
  }
);

export default function LazyPasswordProtection({ onSubmit, error }) {
  return (
    <Suspense fallback={<div style={{ padding: '20px', textAlign: 'center' }}>Loading...</div>}>
      <PasswordProtectionComponent onSubmit={onSubmit} error={error} />
    </Suspense>
  );
}
