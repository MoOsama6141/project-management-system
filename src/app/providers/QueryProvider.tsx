import React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../../services/queryClient';

const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default QueryProvider;
