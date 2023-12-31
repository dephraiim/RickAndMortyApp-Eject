import { useEffect } from "react";
import { AppState, AppStateStatus } from "react-native";

export function useAppState(onChange: (status: AppStateStatus) => void) {
  useEffect(() => {
    const state = AppState.addEventListener("change", onChange);
    return () => {
      state.remove();
    };
  }, [onChange]);
}
