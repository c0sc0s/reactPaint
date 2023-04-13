import React from "react";
import toolState from "../store/toolState";

export default function SettingBar() {
  return (
    <div className="setting-bar">
      <label htmlFor="line-width">设置线条宽度</label>
      <input
        onChange={(e) => toolState.setLineWidth(e.target.value)}
        type="number"
        min={1}
        max={50}
        defaultValue={1}
        id="line-width"
      />
      <label className="color">描边颜色</label>
      <input
        onChange={(e) => toolState.setStrokeColor(e.target.value)}
        className="color"
        type="color"
      />
    </div>
  );
}
