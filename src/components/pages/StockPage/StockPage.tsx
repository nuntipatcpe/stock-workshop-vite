import * as React from "react";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useEffect } from "react";
import { imageUrl } from "../../../Constants";
import * as stockActions from "../../../Redux/actions/stock.action";
import { useSelector } from "react-redux";
import { RootReducers } from "../../../Redux/reducers";
import { useAppDispatch } from "../../../Redux/reducers";
import {
  Typography,
  Stack,
  IconButton,
  Box,
  TextField,
  Fab,
  DialogTitle,
  DialogContent,
  Button,
  DialogActions,
  Dialog,
  DialogContentText,
} from "@mui/material";
import NumberFormat from "react-number-format";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import Moment from "react-moment";
import { Add, Clear, Search } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";

import { useDebounce, useDebounceCallback } from "@react-hook/debounce";
import { Product } from "../../../types/product.type";

interface QuickSearchToolbarProps {
  clearSearch: () => void;
  onChange: () => void;
  value: string;
}

function QuickSearchToolbar(props: QuickSearchToolbarProps) {
  return (
    <Box
      sx={{
        p: 0.5,
        pb: 0,
      }}
    >
      <TextField
        variant="standard"
        value={props.value}
        onChange={props.onChange}
        placeholder="Search…"
        InputProps={{
          startAdornment: <Search fontSize="small" />,
          endAdornment: (
            <IconButton
              title="Clear"
              aria-label="Clear"
              size="small"
              style={{ visibility: props.value ? "visible" : "hidden" }}
              onClick={props.clearSearch}
            >
              <Clear fontSize="small" />
            </IconButton>
          ),
        }}
        sx={{
          width: {
            xs: 1,
            sm: "auto",
          },
          m: (theme) => theme.spacing(1, 0.5, 1.5),
          "& .MuiSvgIcon-root": {
            mr: 0.5,
          },
          "& .MuiInput-underline:before": {
            borderBottom: 1,
            borderColor: "divider",
          },
        }}
      />

      <Fab
        color="primary"
        aria-label="add"
        component={Link}
        to="/stock/create"
        sx={{
          position: "absolute",
          top: 10,
          right: 10,
        }}
      >
        <Add />
      </Fab>
    </Box>
  );
}
export default function Stock() {
  const stockReducer = useSelector((state: RootReducers) => state.stockReducer);
  const dispatch = useAppDispatch();
  const [keywordSerachNoDelay, setkeywordSerachNoDelay] =
    React.useState<string>("");
  const [keywordSerach, setkeywordSerach] = useDebounce<string>("", 1000);
  const [openDialog, setOpenDialog] = React.useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(
    null
  );

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(stockActions.loadStockByKeyword(keywordSerach));
  }, [keywordSerach]);

  useEffect(() => {
    dispatch(stockActions.loadStock());
  }, []);

  const handleDeleteConfirm = () => {
    dispatch(stockActions.deleteProduct(String(selectedProduct!.id!)));
    setOpenDialog(false);
  };
  const stockColumns: GridColDef[] = [
    {
      headerName: "ID",
      field: "id",
      width: 50,
    },
    {
      headerName: "IMG",
      field: "image",
      width: 80,
      renderCell: ({ value }: GridRenderCellParams<string>) => (
        <img
          src={`${imageUrl}/images/${value}?dummy=${Math.random()}`}
          style={{ width: 70, height: 70, borderRadius: "5%" }}
        />
      ),
    },
    {
      headerName: "NAME",
      field: "name",
      width: 400,
    },
    {
      headerName: "STOCK",
      width: 120,
      field: "stock",
      renderCell: ({ value }: GridRenderCellParams<string>) => (
        <Typography variant="body1">
          <NumberFormat
            value={value}
            displayType={"text"}
            thousandSeparator={true}
            decimalScale={0}
            fixedDecimalScale={true}
          />
        </Typography>
      ),
    },
    {
      headerName: "PRICE",
      field: "price",
      width: 120,
      renderCell: ({ value }: GridRenderCellParams<string>) => (
        <Typography variant="body1">
          <NumberFormat
            value={value}
            displayType={"text"}
            thousandSeparator={true}
            decimalScale={2}
            fixedDecimalScale={true}
            prefix={"฿"}
          />
        </Typography>
      ),
    },
    {
      headerName: "TIME",
      field: "createdAt",
      width: 220,
      renderCell: ({ value }: GridRenderCellParams<string>) => (
        <Typography variant="body1">
          {/* {value} */}
          <Moment format="DD/MM/YYYY HH:mm">{value}</Moment>
        </Typography>
      ),
    },
    {
      headerName: "ACTION",
      field: ".",
      width: 120,
      renderCell: ({ row }: GridRenderCellParams<string>) => (
        <Stack direction="row">
          <IconButton
            aria-label="edit"
            size="large"
            onClick={() => {
              navigate("/stock/edit/" + row.id);
            }}
          >
            <EditIcon fontSize="inherit" />
          </IconButton>
          <IconButton
            aria-label="delete"
            size="large"
            onClick={() => {
              setSelectedProduct(row);
              setOpenDialog(true);
            }}
          >
            <DeleteIcon fontSize="inherit" />
          </IconButton>
        </Stack>
      ),
    },
  ];

  const showDialog = () => {
    if (selectedProduct === null) {
      return "";
    }
    return (
      <Dialog
        open={openDialog}
        keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          <img
            src={`${imageUrl}/images/${
              selectedProduct.image
            }?dummy=${Math.random()}`}
            style={{ width: 100, borderRadius: "5%" }}
          />
          <br />
          Confirm to delete the product? : {selectedProduct.name}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            You cannot restore deleted product.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="info">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  return (
    <Box style={{ height: 400, width: "100%" }}>
      <DataGrid
        components={{ Toolbar: QuickSearchToolbar }}
        componentsProps={{
          toolbar: {
            value: keywordSerachNoDelay,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
              // console.log(e.target.value);
              // dispatch(stockActions.loadStockByKeyword(e.target.value));
              setkeywordSerachNoDelay(e.target.value);
              setkeywordSerach(e.target.value);
            },
            clearSearch: () => {
              setkeywordSerach("");
              setkeywordSerachNoDelay("");
            },
          },
        }}
        sx={{ backgroundColor: "white", height: "70vh" }}
        rows={stockReducer.result}
        columns={stockColumns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        // checkboxSelection
      />
      {/* <p>{stockReducer.result} dasdas</p> */}
      {/* <Moment from="2015-04-19">1976-04-19T12:59-0500</Moment> */}
      {showDialog()}
    </Box>
  );
}
