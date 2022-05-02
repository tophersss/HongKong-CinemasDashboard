import { Card, CardProps } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";

const DashboardCard = ({ content }) => {
  return (
    <Card variant="elevation" sx={{ padding: "10px 8px" }}>
      {" "}
      {content}{" "}
    </Card>
  );
};

export default DashboardCard;

// const DashboardCard = styled(Card, {
//     shouldForwardProp: (prop) => prop !== 'success',
//   })(({ success, theme }) => ({
//     width: 300,
//   }));

// const StyledCard = styled(Card, {
//   shouldForwardProp: (variant) => true,
// })(({ variant, theme }) => ({
//   //   width: 300,
//   backgroundColor: "rgba(230, 230, 230, 0.6)",
// }));

// export default function DashboardCard({ content }) {
//   return <StyledCard> {content} </StyledCard>;
// }
