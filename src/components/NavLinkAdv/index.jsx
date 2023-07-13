import React from "react";
import { useLocation } from "react-router";
import { useNavigate } from "zmp-ui";
import { transferNavigation } from "../../utils/transferNavigation";

const NavLinkAdv = ({ children, to, data, ...props }) => {
  const navigate = useNavigate();
  let { pathname, search } = useLocation();

  return (
    <div
      {...props}
      data-href={to}
      onClick={() =>
        transferNavigation({
          useLocation: { pathname, search },
          to,
          navigate,
          data,
        })
      }
    >
      {children}
    </div>
  );
};

export { NavLinkAdv };
