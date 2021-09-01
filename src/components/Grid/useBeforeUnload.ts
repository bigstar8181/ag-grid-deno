import { useEffect, useRef } from 'react';

const useBeforeUnload = (shouldConfirm: boolean) => {
  const shouldConfirmRef = useRef(shouldConfirm);
  useEffect(() => {
    shouldConfirmRef.current = shouldConfirm;
  }, [shouldConfirm]);

  const handleBeforeunload = (evt: BeforeUnloadEvent) => {
    const { current } = shouldConfirmRef;
    if (current) {
      evt.preventDefault();
      evt.returnValue = current;
    }
    return current;
  };
  // function suppressShortcut(event: KeyboardEvent) {
  //   event.stopPropagation();
  //   const key = event.which;
  //   const KEY_A = 65;
  //   const KEY_D = 68;
  //   const keysToSuppress = [];
  //   if (event.ctrlKey || event.metaKey) {
  //     keysToSuppress.push(KEY_A, KEY_D);
  //   }

  //   keysToSuppress.indexOf(key) >= 0 && event.preventDefault();
  // }
  useEffect(() => {
    window.addEventListener('beforeunload', handleBeforeunload);
    //window.addEventListener('keydown', suppressShortcut);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeunload, false);
      //window.removeEventListener('keydown', suppressShortcut, false);
    };
  }, []);
};

export default useBeforeUnload;
