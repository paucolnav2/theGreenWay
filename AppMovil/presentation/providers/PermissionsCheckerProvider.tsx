import { useEffect, useRef } from 'react';
import { AppState } from 'react-native';
import { usePermissionStore } from '../store/usePermissionsStore';


interface Props {
  children: React.ReactNode;
}

const PermissionsCheckerProvider = ({ children }: Props) => {
  const { checkLocationPermission } = usePermissionStore();
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    checkLocationPermission();
  }, []);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (nextAppState === 'active') {
        checkLocationPermission();
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return <>{children}</>;
};

export default PermissionsCheckerProvider;