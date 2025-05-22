/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

export function patchRandomUUID() {
  if (typeof window !== 'undefined') {
    if (!window.crypto) {
      (window as any).crypto = {} as Crypto;
    }

    if (typeof window.crypto.randomUUID !== 'function') {
      (window.crypto as any).randomUUID = uuidv4;
    }
  }
}

export default function Polyfill() {
  useEffect(() => {
    patchRandomUUID();
  }, []);

  return null;
}
