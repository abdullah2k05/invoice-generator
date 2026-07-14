"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";

export class ErrorBoundary extends Component<
  { children: ReactNode; fallback?: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode; fallback?: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  async componentDidCatch(error: Error, info: ErrorInfo) {
    // Firebase Crashlytics not available in this build
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="flex items-center justify-center min-h-dvh bg-[#F8F9FA] p-8">
            <div className="text-center max-w-sm">
              <p className="text-lg font-semibold text-[#0F172A] mb-2">
                Something went wrong
              </p>
              <p className="text-sm text-[#64748B] mb-6">
                Please tap below to restart the app.
              </p>
              <button
                onClick={() => {
                  this.setState({ hasError: false });
                  window.location.reload();
                }}
                className="bg-[#0F172A] text-white text-sm font-medium px-5 py-2.5 rounded-lg"
              >
                Restart
              </button>
            </div>
          </div>
        )
      );
    }
    return this.props.children;
  }
}
