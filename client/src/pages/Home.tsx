import { FC } from "react";
import Canvas from "components/Canvas";
import SettingBar from "@/components/TopBar/SettingBar";
import ToolBar from "@/components/TopBar/ToolBar";
import LoginModal from "@/components/LoginModal";
import { Toaster } from "react-hot-toast";

const Home: FC = () => {
  return (
    <>
      <ToolBar></ToolBar>
      <SettingBar></SettingBar>
      <div className="container">
        <Canvas></Canvas>
      </div>
      <LoginModal></LoginModal>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            fontSize: 18,
          },
        }}
      />
    </>
  );
};

export default Home;
