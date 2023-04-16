import settingbar from "./Topbar.module.scss";

function SettingBar() {
  return (
    <div className={settingbar["setting-bar"]}>
      <div className="left">1</div>
      <div className="right">2</div>
    </div>
  );
}

export default SettingBar;
