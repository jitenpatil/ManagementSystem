import { Container } from "@mui/material";
import { useContext } from "react";
import { Typography } from "@mui/material";
import { UserContext } from "../context/userContext";

const Dashboard: React.FC = () => {
  const { userData } = useContext(UserContext) as any;

  return (
    <>
      <Container>
        <Typography variant="body1" gutterBottom>
          LoggedIn User: {userData.userDetails.email}
        </Typography>
      </Container>
    </>
  );
};

export default Dashboard;
