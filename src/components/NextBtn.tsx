// import { ComponentPropsWithRef } from "react";

// type Props = ComponentPropsWithRef<"button">;

// export const NextBtn = (props: Props) => {
//   const { children, ...restProps } = props;
//   return (
//     <button className="embla-btn embla-btn-next" type="button" {...restProps}>
//       <i className="fa-solid fa-arrow-right"></i>
//       {children}
//     </button>
//   );
// };

// import { ComponentPropsWithRef } from "react";

type Props = {
  children?: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
};

export const NextBtn = ({ children, disabled, onClick }: Props) => {
  return (
    <button
      className="embla-btn embla-btn-next"
      type="button"
      disabled={disabled}
      onClick={onClick}
    >
      <i className="fa-solid fa-arrow-right"></i>
      {children}
    </button>
  );
};
