import { Grid } from "@mui/material";
import { Conversation } from "../containers/Conversation";
import { ConversationList } from "../containers/ConversationList";

export default function HomePage() {
  return (
    <Grid container sx={{ height: "100vh" }}>
      <Grid item md={4}>
        <ConversationList />
      </Grid>
      <Grid item md={8}>
        <Conversation />
      </Grid>
    </Grid>
  );
}
