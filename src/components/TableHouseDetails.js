import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import SeatplanDialog from "./DialogBox";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const TableHouseDetails = ({ houseDetailsObj }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{  }} aria-label="simple table">
        <TableBody>
          <TableRow
            key={"price"}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              Average Ticket Price
            </TableCell>
            <TableCell align="right">
              {houseDetailsObj.avg_price === "undefined" ||
              houseDetailsObj.avg_price === 0
                ? "Unknown"
                : `$${Math.round(houseDetailsObj.avg_price)}`}
            </TableCell>
          </TableRow>
          <TableRow
            key={"capacity"}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              Capacity
            </TableCell>
            <TableCell align="right">{houseDetailsObj.capacity}</TableCell>
          </TableRow>
          <TableRow
            key={"capacity"}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              Capacity
            </TableCell>
            <TableCell align="right">
              <SeatplanDialog
                houseName={houseDetailsObj.house_name}
              ></SeatplanDialog>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableHouseDetails;
