// import { ComponentPropsWithRef } from "react";

// type Props = ComponentPropsWithRef<"button">;

// export const DotButton = (props: Props) => {
//   const { children, ...restProps } = props;

//   return (
//     <button type="button" {...restProps}>
//       {children}
//     </button>
//   );
// };

type DotButtonProps = {
  onClick: () => void;
  className?: string;
  children?: React.ReactNode;
};

export const DotButton = ({ onClick, className, children }: DotButtonProps) => {
  return (
    <button type="button" className={className} onClick={onClick}>
      {children}
    </button>
  );
};
