import type { PropsWithChildren } from "react";

type ContainerProps = PropsWithChildren<{
  className?: string;
}>;

function Container({ children, className = "" }: ContainerProps) {
  return <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

export default Container;
