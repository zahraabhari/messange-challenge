import { Grid } from "@mui/material";
import { ContactInfo } from "./components/ContactInfo";
import { ContactList } from "./components/ContactList";

export const Contact = (): JSX.Element => {
  return (
    <Grid container sx={{ height: "100vh" }}>
      <Grid item md={4}>
        <ContactList />
      </Grid>
      <Grid item md={8}>
        <ContactInfo />
      </Grid>
    </Grid>
  );
};
