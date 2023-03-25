import { setCookie } from 'cookies-next';
import type { FC, ReactNode } from 'react';
import { createContext, useEffect, useState } from 'react';

export const WindowSizeContext = createContext<{
  windowWidth: number;
  windowHeight: number;
} | null>(null);

export const WindowSizeProvider: FC<{ windowWidth: number; windowHeight: number; children: ReactNode }> = ({
  windowWidth: propsWindowWidth,
  windowHeight: propsWindowHeight,
  children,
}) => {
  // 由于移动端的 height:100vh 不靠谱，故需要精确的数值用于设置高度
  const [size, setSize] = useState<{ windowWidth: number; windowHeight: number }>({
    windowWidth: propsWindowWidth,
    windowHeight: propsWindowHeight,
  });

  useEffect(() => {
    // 通过计算获取高度
    // https://stackoverflow.com/a/52936500/2777142
    setCookie('windowWidth', window.innerWidth);
    setCookie('windowHeight', window.innerHeight);
    setSize({
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
    });
    // 设置精确的高度以控制滚动条
    document.body.style.minHeight = `${window.innerHeight}px`;

    window.addEventListener('resize', () => {
      setCookie('windowWidth', window.innerWidth);
      setCookie('windowHeight', window.innerHeight);
      setSize({
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight,
      });
      // 设置精确的高度以控制滚动条
      document.body.style.minHeight = `${window.innerHeight}px`;
    });
  }, []);

  return <WindowSizeContext.Provider value={size}>{children}</WindowSizeContext.Provider>;
};