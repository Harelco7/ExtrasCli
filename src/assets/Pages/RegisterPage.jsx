import React, { useState } from "react";
import { useTransition, animated } from "react-spring";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import FCBusinessForm from "../../FCComponents/FCBusinessForm";
import FCClientForm from "../../FCComponents/FCClientForm";
import "../../Styles/RegisterPage.css";

export default function RegisterPage() {
  const [isBusiness, setIsBusiness] = useState(true);

  const handleToggle = () => {
    setIsBusiness(!isBusiness);
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: "#000",
      },
    },
  });

  const transitions = useTransition(isBusiness, {
    from: { opacity: 0, transform: "translateX(100%)" },
    enter: { opacity: 1, transform: "translateX(0%)" },
    leave: { opacity: 0, transform: "translateX(-100%)" },
    config: {
      duration: 300,
    },
  });

  return (
    <div>
      <div className="page-container">
        <div className="logo-container">
          <div className="btn-container">
            <label className="switch btn-color-mode-switch">
              <input
                value="1"
                id="color_mode"
                name="color_mode"
                type="checkbox"
                onChange={handleToggle}
                checked={isBusiness}
              />
              <label
                className="btn-color-mode-switch-inner"
                data-off="לקוח"
                data-on="בית עסק"
                htmlFor="color_mode"
              ></label>
            </label>
          </div>
        </div>
        
        <div className="form-wrapper">
          {transitions((style, item) =>
            item ? (
              <animated.div style={{ ...style, position: 'absolute', width: '100%' }}>
                <FCBusinessForm />
              </animated.div>
            ) : (
              <animated.div style={{ ...style, position: 'absolute', width: '100%' }}>
                <FCClientForm />
              </animated.div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
