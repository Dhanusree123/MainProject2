// import { ComponentPropsWithRef } from "react";

// type Props = ComponentPropsWithRef<"button">;

// export const PrevBtn = (props: Props) => {
//   const { children, ...restProps } = props;
//   return (
//     <button className="embla-btn embla-btn-prev" type="button" {...restProps}>
//       <i className="fa-solid fa-arrow-left"></i>
//       {children}
//     </button>
//   );
// };

type Props = {
  children?: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
};

export const PrevBtn = ({ children, disabled, onClick }: Props) => {
  return (
    <button
      className="embla-btn embla-btn-prev"
      type="button"
      disabled={disabled}
      onClick={onClick}
    >
      <i className="fa-solid fa-arrow-left"></i>
      {children}
    </button>
  );
};
