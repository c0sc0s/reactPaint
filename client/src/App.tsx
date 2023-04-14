import { Box, Icon } from "@mui/material";
import "./scss/app.scss";
const App = () => {
  return (
    <div className="App">
      <Icon>edit</Icon>
      <Icon color="primary">star</Icon>
      <Icon sx={{ color: "green" }}>add_circle</Icon>
      <Icon fontSize="small">add_circle</Icon>
      <Icon sx={{ fontSize: 30 }}>add_circle</Icon>
    </div>
  );
};

export default App;
