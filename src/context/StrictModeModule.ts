import { NativeModule, requireNativeModule } from 'expo-modules-core';

interface StrictModeModule extends NativeModule {
  enableStrictMode(): void;
  disableStrictMode(): void;
}

export default requireNativeModule<StrictModeModule>('StrictMode');
