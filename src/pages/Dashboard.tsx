import { Container } from "@mui/material";
import { useContext } from "react";
import { Typography } from "@mui/material";
import { useAppSelector } from '../redux/hooks';

const Dashboard: React.FC = () => {
  const authValues = useAppSelector((state: any) => state.auth);

  return (
    <>
      <Container>
        <Typography variant="body1" gutterBottom>
          LoggedIn User: {authValues.userAuthInfo.customerName}
        </Typography>
      </Container>
    </>
  );
};

export default Dashboard;
