import { FC } from "react";
import Canvas from "components/Canvas";
import SettingBar from "components/TopBar/SettingBar";
import ToolBar from "components/TopBar/ToolBar";

const Home: FC = () => {
  return (
    <>
      <ToolBar></ToolBar>
      <SettingBar></SettingBar>
      <Canvas></Canvas>
    </>
  );
};

export default Home;
