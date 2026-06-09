"use client";

import React, { Component } from 'react';
import dynamic from 'next/dynamic';

// Load AwardsSection dynamically to keep this wrapper lean
const AwardsSection = dynamic(() => import('./home-awards'), { ssr: false });

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // eslint-disable-next-line no-console
    console.error('AwardsSection error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <section style={{ padding: '80px 0', textAlign: 'center' }}>
          <h2 style={{ color: '#222' }}>Awards and Recognitions</h2>
          <p style={{ color: '#666' }}>Unable to load awards at this time.</p>
        </section>
      );
    }

    return this.props.children;
  }
}

export default function SafeAwardsWrapper({ data }) {
  return (
    <ErrorBoundary>
      <AwardsSection data={data} />
    </ErrorBoundary>
  );
}
