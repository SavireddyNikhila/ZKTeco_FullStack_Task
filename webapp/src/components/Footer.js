import React from "react";
import useStyles from "./Styles";
function Footer() {
    const classes = useStyles();
  return (
    <div className={classes.footerDiv}>
      <footer>
        <span>copyright &copy; 1998:2022 Powered by React.js</span>
      </footer>
    </div>
  );
}

export default Footer;
