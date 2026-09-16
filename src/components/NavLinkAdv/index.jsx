import React from "react";
import { useLocation } from "react-router";
import { useNavigate } from "zmp-ui";
import { useLayout } from "../../layout/LayoutProvider";
import { transferNavigation } from "../../utils/transferNavigation";
import { PickerContact } from "../PickerContact/PickerContact"

const NavLinkAdv = ({ children, to, data, ...props }) => {
  const { Auth } = useLayout()
  const navigate = useNavigate();
  let { pathname, search } = useLocation();

  return (
    <PickerContact initialValues={data}>
      {
        ({ open }) => (
          <div
            {...props}
            data-href={to}
            onClick={() =>
              transferNavigation({
                useLocation: { pathname, search },
                to,
                navigate,
                data,
                open,
                Auth
              })
            }
          >
            {children}
          </div>
        )
      }

    </PickerContact>
  );
};

export { NavLinkAdv };
