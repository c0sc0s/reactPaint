import { Icon, Input } from "@mui/material";
import settingbar from "../Topbar.module.scss";
import { ChangeEvent, FC, useState } from "react";
import toolState from "@/store/toolState";
import styles from "./SettingBar.module.scss";
import ShareButton from "../ui/ShareButton";
import UsersButton from "../ui/UsersButton";

const SettingBar: FC = () => {
  const [value, setValue] = useState(1);
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = Number(e.target.value);

    if (inputValue > 50) {
      setValue(50);
    } else if (inputValue < 1) {
      setValue(1);
    } else {
      setValue(inputValue);
    }

    toolState.setLineWidth(value);
  };

  const changeColor = (e: ChangeEvent<HTMLInputElement>) => {
    toolState.setStrokeColor(e.target.value);
  };

  return (
    <div className={settingbar["setting-bar"]}>
      <div className="left">
        <label htmlFor="lineWidth">笔刷粗度:</label>
        <Input
          id="lineWidth"
          className={styles.settingBar__input}
          onChange={onChange}
          value={value}
          type="number"
        />

        <label htmlFor="lineColor">笔刷颜色:</label>
        <input className={styles.color} type="color" onChange={changeColor} />
      </div>
      <div className="right">
        <div className={styles.settingBar__group}>
          <ShareButton />
          <UsersButton />
        </div>
      </div>
    </div>
  );
};

export default SettingBar;
