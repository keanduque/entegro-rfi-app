import { Link } from "react-router-dom";

export function RFIBtn({ id, children, to, title, onClick }) {
  if (to)
    return (
      <Link to={to} target="_blank" title={title}>
        {children}
      </Link>
    );

  if (onClick)
    return (
      <button onClick={onClick} title={title}>
        {children}
      </button>
    );

  return (
    <a href={id} target="_blank" title={title} rel="noreferrer">
      {children}
    </a>
  );
}
