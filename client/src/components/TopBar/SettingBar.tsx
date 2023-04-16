import { Icon } from "@mui/material";
import settingbar from "./Topbar.module.scss";

function SettingBar() {
  return (
    <div className={settingbar["setting-bar"]}>
      <div className="left">
        <span></span>
      </div>
      <div className="right">
        <span>
          <Icon>public</Icon>
        </span>
        <span>
          <Icon>hub</Icon>
        </span>
      </div>
    </div>
  );
}

export default SettingBar;
