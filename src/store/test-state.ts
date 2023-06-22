export const initialTestState: {} = {
  auth: {
    user: {
      id: null,
      name: null,
      email: null,
      isDemo: null,
      isTranslationByDefault: null,
      activeMemoFileId: null,
    },
    isInitialized: false,
    isLoading: false,
    error: null,
    isAuthorized: false,
  },
  theme: { isDarkTheme: true },
  memoFile: {
    memoFiles: [],
    isLoading: false,
    error: null,
  },
  memoRow: {
    lastShownId: null,
    isLoading: false,
    memoRows: null,
  },
};
