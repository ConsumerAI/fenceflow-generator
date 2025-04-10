
import { useCallback } from 'react';
import { adaptAnchorToButtonHandler } from '@/lib/eventHandlers';

export function useButtonHandlers() {
  const handleResidentialClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.location.href = '/residential-fencing';
  }, []);

  const handleCommercialClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.location.href = '/commercial-fencing';
  }, []);

  const handleSportsClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.location.href = '/sports-courts';
  }, []);

  const handleAccessClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.location.href = '/access-control';
  }, []);

  return {
    handleResidentialButton: adaptAnchorToButtonHandler(handleResidentialClick),
    handleCommercialButton: adaptAnchorToButtonHandler(handleCommercialClick),
    handleSportsButton: adaptAnchorToButtonHandler(handleSportsClick),
    handleAccessButton: adaptAnchorToButtonHandler(handleAccessClick)
  };
}
