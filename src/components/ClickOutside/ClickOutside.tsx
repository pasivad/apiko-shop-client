import { useRef, useEffect, Dispatch, SetStateAction } from 'react';

export default function ClickOutside({
  setIsOpen,
  isOpen,
  children,
  className,
  exceptionRef,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
  children: React.ReactNode;
  className?: Object;
  exceptionRef: React.RefObject<HTMLDivElement>;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickListener);

    return () => {
      document.removeEventListener('mousedown', handleClickListener);
    };
  }, []);

  const handleClickListener = (event: MouseEvent) => {
    let clickedInside;
    if (wrapperRef.current !== null) {
      if (exceptionRef && exceptionRef.current !== null) {
        clickedInside =
          (wrapperRef && wrapperRef.current.contains(event.target as Node)) ||
          exceptionRef.current === event.target ||
          exceptionRef.current.contains(event.target as Node);
      } else {
        clickedInside = wrapperRef && wrapperRef.current.contains(event.target as Node);
      }
    }

    if (clickedInside) return;
    else setIsOpen(!isOpen);
  };

  return (
    <div
      ref={wrapperRef}
      className={`${className || ''}`}
    >
      {children}
    </div>
  );
}
