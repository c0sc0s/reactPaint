import Button from "@mui/material/Button";
import { Icon } from "@mui/material";
import topbar from "../scss/TopBar.module.scss";

export default function ToolBar() {
  return (
    <>
      <div className={topbar["top-bar"]}>
        <div className="left">
          <Button className={topbar.selected} variant="text">
            <Icon>brush</Icon>
          </Button>
          <Button variant="text">
            <Icon>square</Icon>
          </Button>
          <Button variant="text">
            <Icon>circle</Icon>
          </Button>
          <Button variant="text">
            <Icon>polyline</Icon>
          </Button>
          <Button variant="text">
            <Icon>auto_fix_normal</Icon>
          </Button>
          <Button variant="text">
            <input className={topbar["color-set"]} type="color" />
          </Button>
        </div>
        <div className="right">
          <Button variant="text">
            <Icon>undo</Icon>
          </Button>
          <Button variant="text">
            <Icon>redo</Icon>
          </Button>
          <Button variant="text">
            <Icon>delete</Icon>
          </Button>
          <Button variant="text">
            <Icon>save</Icon>
          </Button>
        </div>
      </div>
    </>
  );
}
