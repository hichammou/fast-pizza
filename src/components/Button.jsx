import { Link } from "react-router-dom";

const Button = ({
  children,
  disabled,
  to = undefined,
  variant = "primary",
  onClick,
}) => {
  const baseStyles =
    "bg-yellow-400 text-sm capitlize font-semibold text-stone-800 inline-block tracking-wide rounded-full hover:bg-yellow-300 transition-colors outline-none focus:ring focus:ring-yellow-300 focus:bg-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed";

  const styles = {
    primary: `${baseStyles} md:px-6 md:py-4 px-4 py-3`,
    small: `${baseStyles} py-2 px-4 md:px-5 md:py-2.5 text-xs text-slate-800`,
    round: `${baseStyles} px-2.5 py-1 md:px-3.5 md:py-2 text-sm`,
    secondary:
      "uppercase font-semibold text-stone-500 inline-block tracking-wide rounded-full border-2 border-stone-200 py-2 px-4 md:px-5 md:py-3.5 hover:bg-stone-300 transition-colors outline-none focus:outline-none focus:ring focus:ring-stone-300 focus:ring-offset-2 disabled:cursor-not-allowed",
  };

  if (to)
    return (
      <Link onClick={onClick} className={styles[variant]} to={to}>
        {children}
      </Link>
    );

  return (
    <button onClick={onClick} disabled={disabled} className={styles[variant]}>
      {children}
    </button>
  );
};

export default Button;
