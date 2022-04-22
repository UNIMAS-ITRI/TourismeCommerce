import React, { Component, useEffect } from "react";
import { Container, Row, Col } from "shards-react";
import { connect } from "react-redux";
import { GitAction } from "../../store/action/gitAction";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "@material-ui/core";
import clsx from "clsx";
import Button from "@material-ui/core/Button";
import { lighten, makeStyles } from "@material-ui/core/styles";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import DeleteIcon from "@material-ui/icons/Delete";
import { PropTypes } from "prop-types";
import GetAppIcon from "@material-ui/icons/GetApp";
import { defaultImageUrl, panoramaPhotoUrl } from "../directoryRepo";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import AppBar from "@material-ui/core/AppBar";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import EditIcon from "@material-ui/icons/Edit";
import { toast } from "react-toastify";
import { DropzoneArea } from "material-ui-dropzone";
import PanoramaPhoto from "./PanoramaPhoto";
import commonTool from "../../utils/commonTools";

function mapStateToProps(state) {
  return {
    panoHotspot: state.counterReducer["panoHotspot"],
    placeMediaReturnVal: state.counterReducer["placeMediaReturnVal"],
    placeMedia: state.counterReducer["placeMedia"],
    foodMedia: state.counterReducer["foodMedia"],
    foodMediaReturnVal: state.counterReducer["foodMediaReturnVal"],
  };
}
function mapDispatchToProps(dispatch) {
  return {
    ResetHotspotsArray: () => dispatch(GitAction.ResetHotspotsArray()),
    ViewPlaceMediaInfoByType: (props) => dispatch(GitAction.ViewPlaceMediaInfoByType(props)),
    CallResetPlaceMediaReturnValue: () => dispatch(GitAction.CallResetPlaceMediaReturnValue()),

    //Place
    AddPlaceMediaInfos: propsData => dispatch(GitAction.AddPlaceMediaInfos(propsData)),
    UpdatePlaceMediaInfos: propsData => dispatch(GitAction.UpdatePlaceMediaInfos(propsData)),
    DeletePlaceMediaInfos: propData => dispatch(GitAction.DeletePlaceMediaInfos(propData)),

    //Food
    AddFoodMediaInfos: propsData => dispatch(GitAction.AddFoodMediaInfos(propsData)),
    UpdateFoodMediaInfos: propsData => dispatch(GitAction.UpdateFoodMediaInfos(propsData)),
    DeleteFoodMediaInfos: propData => dispatch(GitAction.DeleteFoodMediaInfos(propData)),
    CallResetFoodMediaReturnValue: () => dispatch(GitAction.CallResetFoodMediaReturnValue()),
  };
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}
const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  paper: {
    width: "100%",
    margin: "auto",
    padding: "1%",
    marginTop: "15px"
  },
  table: {
    minWidth: 750
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1
  },
  highlight:
    theme.palette.type === "light"
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85)
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark
      },
  title: {
    flex: "1 1 100%"
  }
}));

const headCells = [
  {
    id: "id",
    numeric: false,
    disablePadding: false,
    label: "#",
    align: "left"
  },
  {
    id: "panoImg",
    numeric: false,
    disablePadding: false,
    label: "Image",
    align: "left"
  },
  {
    id: "Download",
    numeric: false,
    disablePadding: false,
    label: "Download",
    align: "left"
  },
  {
    id: "Edit",
    numeric: false,
    disablePadding: false,
    label: "Edit",
    align: "left"
  }
];

function DeletableTableHead(props) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort
  } = props;
  const createSortHandler = property => panorama => {
    onRequestSort(panorama, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell width="30%" padding="normal">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all panorama images" }}
          />
        </TableCell>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            // align={headCell.align}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function DisplayTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = property => elem => {
    onRequestSort(elem, property);
  };
  const classes = useStyles();
  return (
    <TableHead>
      <TableRow>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

DeletableTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

DisplayTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

const DeletableTableToolbar = props => {
  const classes = useStyles();
  const { numSelected, selectedData, ProductProps } = props;
  let ids = []
  let mediaUrls = []
  selectedData.map((i => {
    ids.push(i.mId)
    mediaUrls.push(i.mediaUrl)
  }))

  const OnDelete = () => {
    if (ProductProps.selectedRow.placeId) {
      ProductProps.DeletePlaceMediaInfos({
        userId: "1",
        mId: ids,
        directory: "place",
        mediaType: "VR",
        mediaUrl: mediaUrls,
        placeId: ProductProps.selectedRow.placeId,
      })
      // toast("The Destination media panorama is deleting! Reloading..");
    }

    if (ProductProps.selectedRow.foodId) {
      ProductProps.DeletePlaceMediaInfos({
        userId: "1",
        mId: ids,
        directory: "food",
        mediaType: "VR",
        mediaUrl: mediaUrls,
        placeId: ProductProps.selectedRow.foodId,
      })
      // toast("The food media panorama is deleting! Reloading..");
    }
  };

  return (
    <Toolbar className={clsx(classes.root, { [classes.highlight]: numSelected > 0 })} >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"

        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          className={classes.title}
          id="tableTitle"
          component="div"
          color="error"
        >
          Select the panorama(s) to remove.
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton
            aria-label="delete"
            onClick={() => {
              OnDelete();
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        ""
      )}
    </Toolbar>
  );
};

const DisplayTableToolbar = props => {
  const classes = useStyles();

  return <Toolbar className={clsx(classes.root)}></Toolbar>;
};

DeletableTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired
};

DisplayTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired
};

function DeletableTable(props) {
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("mId");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleRequestSort = (panorama, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const handleSelectAllClick = panorama => {
    if (panorama.target.checked) {
      const newSelecteds = props.Data.map(n => n.mId);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };
  const handleClick = (item) => {
    const selectedIndex = selected.indexOf(item);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, item);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (panorama, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = panorama => {
    setRowsPerPage(parseInt(panorama.target.value, 10));
    setPage(0);
  };

  const isSelected = name => selected.indexOf(name) !== -1;
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, props.Data.length - page * rowsPerPage);

  return (
    <div>
      <Paper className={classes.paper}>
        <DeletableTableToolbar
          numSelected={selected.length}
          selectedData={selected}
          ProductProps={props.ProductProps}
        />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
            aria-label="enhanced table"
          >
            <DeletableTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={props.Data.length}
            />
            <TableBody>
              {stableSort(props.Data, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row); //here
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={() => handleClick(row)} //here
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.mId} //here
                      selected={isItemSelected}
                    >
                      <TableCell align="left" style={{ width: "10%" }}>
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </TableCell>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell align="left" style={{ width: "50%" }}>
                        <img
                          alt={row.mediaTitle}
                          src={
                            props.foodOrPlace === "place"
                              ? panoramaPhotoUrl(
                                props.ProductProps.selectedRow.placeId,
                                "place",
                                row.mediaUrl
                              )
                              : panoramaPhotoUrl(
                                props.ProductProps.selectedRow.foodId,
                                "food",
                                row.mediaUrl
                              )
                          }
                          onError={e => (e.target.src = defaultImageUrl())}
                          height="100px"
                          width="250px"
                        />
                      </TableCell>
                      <TableCell align="left" style={{ width: "10%" }}>
                        <IconButton aria-label="download" size="small">
                          <GetAppIcon fontSize="inherit" />
                        </IconButton>
                      </TableCell>
                      <TableCell align="left" style={{ width: "10%" }}>
                        <IconButton aria-label="edit" size="small">
                          <EditIcon fontSize="inherit" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={props.Data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

class DisplayTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      foodOrPlace: this.props.foodOrPlace,
      order: "asc",
      orderBy: "mId",
      selected: [],
      page: 0,
      dense: false,
      rowsPerPage: 10,
      detailsShown: false,
      deleteActive: false,
      searchFilter: null,

      utilityRepo: new commonTool()
    };

    this.ToggleDeletable = this.ToggleDeletable.bind(this);
    this.handleRequestSort = this.handleRequestSort.bind(this);
    this.onRowClick = this.onRowClick.bind(this);
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleChangeDense = this.handleChangeDense.bind(this);
    this.isSelected = this.isSelected.bind(this);
    this.downloadImage = this.downloadImage.bind(this);
  }

  handleRequestSort = (panorama, property) => {
    const isAsc = this.state.orderBy === property && this.state.order === "asc";
    this.setState({ order: isAsc ? "desc" : "asc" });
    this.setState({ orderBy: property });
  };

  //here
  onRowClick = (panorama, row, index) => {
    this.props.toggleModalPopup(true, "edit", row);
  };

  handleChangePage = (panorama, newPage) => {
    this.setState({ page: newPage });
  };

  handleChangeRowsPerPage = panorama => {
    this.setState({ rowsPerPage: parseInt(panorama.target.value, 10) });
    this.setState({ page: 0 });
  };

  handleChangeDense = panorama => {
    this.setState({ dense: panorama.target.checked });
  };

  isSelected = name => {
    // this.state.selected.indexOf(name) !== -1;
  };

  ToggleDeletable() {
    this.setState((prevState, props) => {
      return { deleteActive: !prevState.deleteActive };
    });
  }

  downloadImage(url, filename) {
    this.state.utilityRepo.downloadImageWithFileName(url, filename);
  }

  render() {
    // eslint-disable-next-line no-unused-vars
    const { classes } = this.props;
    const emptyRows =
      this.state.rowsPerPage -
      Math.min(
        this.state.rowsPerPage,
        this.props.Data.length - this.state.page * this.state.rowsPerPage
      );

    const divStyle = {
      width: "100%",
      margin: "auto",
      padding: "1%",
      // paddingRight: "1%",
      marginTop: "15px"
    };

    const table = {
      // margin: "20px",
      minWidth: 750
    };

    const classes2 = {
      border: 0,
      clip: "rect(0 0 0 0)",
      height: 1,
      margin: -1,
      overflow: "hidden",
      padding: 0,
      position: "absolute",
      top: 20,
      width: 1
    };

    return (
      <div>
        <div className="row" style={{ paddingTop: "15px", float: "right" }}>
          <div style={{ paddingTop: "3px" }}>
            <Button
              size="small"
              variant="outlined"
              style={{ borderRadius: "5em" }}
              fontSize="8px"
              onClick={() => {
                this.props.toggleModalPopup(true, "add", null);
              }}
            >
              <span className="material-icons">add</span>Add
            </Button>
          </div>
          <div style={{ paddingLeft: "20px", paddingRight: "20px" }}>
            <FormControlLabel
              control={
                <Switch checked={this.state.deleteActive} onChange={this.ToggleDeletable} />
              }
              label="Delete"
            />
          </div>
        </div>
        {
          this.state.detailsShown ? (
            <div></div>
          )
            : this.state.deleteActive ? (
              <div>
                <DeletableTable
                  foodOrPlace={this.props.foodOrPlace}
                  Data={this.props.Data}
                  ProductProps={this.props.ProductProps}
                ></DeletableTable>
              </div>
            )
              : (
                <div>
                  <Paper style={divStyle}>
                    <TableContainer>
                      <Table
                        style={table}
                        aria-labelledby="tableTitle"
                        size={this.state.dense ? "small" : "medium"}
                        aria-label="enhanced table"
                      >
                        <DisplayTableHead
                          classes={classes2}
                          numSelected={this.state.selected.length}
                          order={this.state.order}
                          orderBy={this.state.orderBy}
                          onRequestSort={this.handleRequestSort}
                          rowCount={this.props.Data.length}
                        />
                        <TableBody>
                          {stableSort(
                            this.props.Data,
                            getComparator(this.state.order, this.state.orderBy)
                          )
                            .slice(
                              this.state.page * this.state.rowsPerPage,
                              this.state.page * this.state.rowsPerPage +
                              this.state.rowsPerPage
                            )
                            .map((row, index) => {
                              const isItemSelected = this.isSelected(row.panoramaName);
                              const labelId = `enhanced-table-checkbox-${index}`;

                              return (
                                <TableRow
                                  hover
                                  role="checkbox"
                                  aria-checked={isItemSelected}
                                  tabIndex={-1}
                                  key={row.mId}
                                  selected={isItemSelected}
                                >
                                  <TableCell align="left" style={{ width: "10%" }}>
                                    {index + 1}
                                  </TableCell>
                                  <TableCell align="left" style={{ width: "50%" }}>
                                    <img
                                      alt={row.mediaTitle}
                                      src={
                                        this.props.foodOrPlace === "place"
                                          ? panoramaPhotoUrl(
                                            this.props.ProductProps.selectedRow
                                              .placeId,
                                            "place",
                                            row.mediaUrl
                                          )
                                          : panoramaPhotoUrl(
                                            this.props.ProductProps.selectedRow
                                              .foodId,
                                            "food",
                                            row.mediaUrl
                                          )
                                      }
                                      onError={e => (e.target.src = defaultImageUrl())}
                                      height="100px"
                                      width="250px"
                                    />
                                  </TableCell>
                                  <TableCell align="left" style={{ width: "10%" }}>
                                    <IconButton
                                      aria-label="download"
                                      size="small"
                                      onClick={() => {
                                        this.downloadImage(
                                          (
                                            this.props.foodOrPlace === "place"
                                              ? panoramaPhotoUrl(this.props.ProductProps.selectedRow.placeId, "place", row.mediaUrl)
                                              : panoramaPhotoUrl(this.props.ProductProps.selectedRow.foodId, "food", row.mediaUrl)
                                          ),
                                          row.mediaUrl
                                        );
                                      }}
                                    >
                                      <GetAppIcon fontSize="inherit" />
                                    </IconButton>
                                  </TableCell>
                                  <TableCell align="left" style={{ width: "10%" }}>
                                    <IconButton
                                      aria-label="download"
                                      size="small"
                                      onClick={(panorama) => { this.onRowClick(panorama, row, index) }}
                                    >
                                      <EditIcon fontSize="inherit" />
                                    </IconButton>
                                  </TableCell>
                                </TableRow>
                              );
                            })}
                          {emptyRows > 0 && (
                            <TableRow style={{ height: (this.state.dense ? 33 : 53) * emptyRows }}>
                              <TableCell colSpan={6} />
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <TablePagination
                      rowsPerPageOptions={[10, 25, 50]}
                      component="div"
                      count={this.props.Data.length}
                      rowsPerPage={this.state.rowsPerPage}
                      page={this.state.page}
                      onChangePage={this.handleChangePage}
                      onRowsPerPageChange={this.handleChangeRowsPerPage}
                    />
                  </Paper>
                </div>
              )}
      </div>
    );
  }
}

class PanoramaList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Add_isModalPopUp: false,
      Edit_isModalPopUp: false,
      foodOrPlace: "",
      selectedPanoramaPhoto: null,
      file: [],
      selectedPanoramaMId: null,
      selectedPanoramaUrl: null,

      isFoodTrails: "-",
      thumbnail: "-",
      typeIcon: "-",
      slideOrder: "-",
      mediaType: "VR",
      galleryPhotos: [],
    };
    this.toggleModalPopup = this.toggleModalPopup.bind(this);
    this.uploadHandler = this.uploadHandler.bind(this);
    this.OnSubmitAddPanoramaImg = this.OnSubmitAddPanoramaImg.bind(this);
    this.OnSubmitUpdatePanoramaImg = this.OnSubmitUpdatePanoramaImg.bind(this);
    this.OnSubmitAddFirstPanorama = this.OnSubmitAddFirstPanorama.bind(this);

    this.props.ViewPlaceMediaInfoByType({
      placeId: (this.props.module === "place") ? this.props.selectedRow.placeId : this.props.selectedRow.foodId,
      mediaType: 'VR'
    })
  }

  componentDidMount() {
    if (this.props.selectedRow) {
      if (typeof this.props.selectedRow.PlaceMediaCategory !== "undefined" && this.props.selectedRow.PlaceMediaCategory !== null) {
        this.setState({ foodOrPlace: "place" })

        if (typeof this.props.selectedRow.PlaceMediaCategory !== 'undefined' && this.props.selectedRow.PlaceMediaCategory !== null) {
          let placeMedias = JSON.parse(this.props.selectedRow.PlaceMediaCategory)
          // eslint-disable-next-line array-callback-return
          placeMedias.filter(elem => elem.mediaType === "VR").map((elem, index) => {
            if (typeof elem.PlaceMediaContent !== "undefined" && elem.PlaceMediaContent != null) {
              this.setState({
                galleryPhotos: JSON.parse(elem.PlaceMediaContent)
              })
            }
          })
        }
      }
      else if (typeof this.props.selectedRow.FoodMediaCategory !== "undefined" && this.props.selectedRow.FoodMediaCategory !== null) {
        this.setState({ foodOrPlace: "food" })

        if (typeof this.props.selectedRow.FoodMediaCategory !== 'undefined' && this.props.selectedRow.FoodMediaCategory !== null) {
          let foodMedias = JSON.parse(this.props.selectedRow.FoodMediaCategory)
          // eslint-disable-next-line array-callback-return
          foodMedias.filter(elem => elem.mediaType === "VR").map((elem, index) => {
            if (typeof elem.FoodMediaContent !== "undefined" && elem.FoodMediaContent != null) {
              this.setState({
                galleryPhotos: JSON.parse(elem.FoodMediaContent)
              })
            }
          })
        }
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (typeof this.props.foodMediaReturnVal === "string") {
      try {
        let returnVal = JSON.parse(this.props.foodMediaReturnVal)
        if (returnVal.length > 0) {
          this.props.CallResetFoodMediaReturnValue()
          toast.success("The panorama photo is updated, refreshing", { autoClose: 2000, onClose: () => this.props.toggleBackButton(false) })
        }
      }
      catch (e) {
        this.props.CallResetFoodMediaReturnValue()
        toast.error("The panorama photo is failed to update!");
        console.log(e)
      }
    }

    if (typeof this.props.foodMedia !== "undefined" && this.props.foodMedia.length > 0) {
      toast.success("The panorama photo is updated, refreshing", { autoClose: 2000, onClose: () => window.location.href = this.props.module === "place" ? "./Place" : "./Food" })
    }

    if (prevProps.placeMediaReturnVal !== this.props.placeMediaReturnVal) {
      if (typeof this.props.placeMediaReturnVal !== "undefined" && this.props.placeMediaReturnVal.length > 0 && this.props.placeMediaReturnVal[0].ReturnVal == 1) {
        toast.success("The panorama photo is updated, refreshing", { autoClose: 2000, onClose: () => window.location.href = this.props.module === "place" ? "./Place" : "./Food" })
        // this.props.ViewPlaceMediaByType({ placeId: this.props.selectedRow, mediaType: 'VR'})
      }
    }

  }

  toggleModalPopup(setOpen, module, props) {
    if (module === "add") this.setState({ Add_isModalPopUp: setOpen });

    if (module === "edit") {
      this.setState({
        Edit_isModalPopUp: setOpen,
        selectedPanoramaPhoto: props != null ? props : null
      });
    }

    if (setOpen === false) {
      this.props.ResetHotspotsArray();
    }
    if (module === "editPanoramaPhoto")
      this.setState({ EditPano_isModalPopUp: setOpen });

    if (props != null) {
      this.setState({
        // EditPano_isModalPopUp: setOpen,
        selectedPanoramaUrl: props.mediaUrl,
        selectedPanoramaMId: props.mId
      });
    }
  }

  uploadHandler(e) {
    this.setState({ file: e });
  }

  OnSubmitAddPanoramaImg() {
    if (this.state.file.length > 0) {
      let panoramaPhotos = this.state.galleryPhotos
      panoramaPhotos = panoramaPhotos
      let size = panoramaPhotos.length;
      let lastPanorama = panoramaPhotos[size - 1].mediaUrl;

      let newPanoramaOrder = Number(lastPanorama.split(".")[0].replace(/[^0-9]/g, "")) + 1;
      let panoramaName = "panorama" + newPanoramaOrder;

      if (typeof this.props.selectedRow.PlaceMediaCategory !== "undefined" && this.props.selectedRow.PlaceMediaCategory !== null) {
        this.props.AddPlaceMediaInfos({
          userId: 1,
          mediaType: this.state.mediaType,
          mediaTitle: this.props.selectedRow.placeName,
          mediaUrl: panoramaName + "." + this.state.file[0].name.split(".")[1],
          mediaDesc: "360 Image",
          placeId: this.props.selectedRow.placeId,
          isFoodTrails: this.state.isFoodTrails,
          thumbnail: this.state.thumbnail,
          typeIcon: this.state.typeIcon,
          slideOrder: this.state.slideOrder,
          file: this.state.file[0],
          imageWithoutExtention: panoramaName
        });
      }
      else if (typeof this.props.selectedRow.FoodMediaCategory !== "undefined" && this.props.selectedRow.FoodMediaCategory !== null) {
        this.props.AddFoodMediaInfos({
          userId: 1,
          mediaType: this.state.mediaType,
          mediaTitle: this.props.selectedRow.foodName,
          mediaUrl: panoramaName + "." + this.state.file[0].name.split(".")[1],
          mediaDesc: "360 Image",
          foodId: this.props.selectedRow.foodId,
          isFoodTrails: 1,
          thumbnail: this.state.thumbnail,
          typeIcon: this.state.typeIcon,
          slideOrder: this.state.slideOrder,
          file: this.state.file[0],
          imageWithoutExtention: panoramaName
        });
      }
      // toast("Successfully added! Please wait..");
      this.toggleModalPopup(false, "add", null);
      this.setState({ isAddSend: true, OnSubmitAddPanoramaImg: false });
    }
    else {
      alert("There is no panorama image uploaded")
    }
  }

  OnSubmitUpdatePanoramaImg() {
    if (this.state.file.length > 0) {
      let panoramaName = this.state.selectedPanoramaUrl.split(".")[0];
      if (typeof this.props.selectedRow.PlaceMediaCategory !== "undefined" && this.props.selectedRow.PlaceMediaCategory !== null) {
        this.props.UpdatePlaceMediaInfos({
          userId: 1,
          mId: this.state.selectedPanoramaMId,
          mediaType: this.state.mediaType,
          mediaTitle: this.props.selectedRow.placeName,
          mediaUrl: panoramaName + "." + this.state.file[0].name.split(".")[1],
          placeId: this.props.selectedRow.placeId,
          file: this.state.file[0],
          imageWithoutExtention: panoramaName
        });
      }
      else if (typeof this.props.selectedRow.FoodMediaCategory !== "undefined" && this.props.selectedRow.FoodMediaCategory !== null) {

        this.props.UpdateFoodMediaInfos({
          userId: 1,
          foodMediaId: this.state.selectedPanoramaMId,
          mediaType: this.state.mediaType,
          mediaTitle: this.props.selectedRow.foodName,
          mediaUrl: panoramaName + "." + this.state.file[0].name.split(".")[1],
          foodId: this.props.selectedRow.foodId,
          file: this.state.file[0],
          imageWithoutExtention: panoramaName
        });
      }

      this.toggleModalPopup(false, "edit", null);
      this.setState({
        EditPano_isModalPopUp: false,
        isEditPhotoSend: true,
        OnSubmitUpdatePanoramaImg: false
      });
      // toast("Successfully updated! Please wait..");
    }
    else {
      alert("There is no panorama image uploaded")
    }
  }

  OnSubmitAddFirstPanorama() {
    if (this.state.file.length > 0) {
      let panoramaName = "panorama";
      if (typeof this.props.selectedRow.PlaceMediaCategory !== "undefined" && this.props.selectedRow.PlaceMediaCategory === null) {
        this.props.AddPlaceMediaInfos({
          userId: 1,
          mediaType: this.state.mediaType,
          mediaTitle: this.props.selectedRow.placeName,
          // eslint-disable-next-line no-useless-concat
          mediaUrl: panoramaName + "." + "jpg",
          mediaDesc: "360 Image",
          placeId: this.props.selectedRow.placeId,
          isFoodTrails: this.state.isFoodTrails,
          thumbnail: this.state.thumbnail,
          typeIcon: this.state.typeIcon,
          slideOrder: this.state.slideOrder,
          file: this.state.file[0],
          imageWithoutExtention: panoramaName
        })
      }

      if (typeof this.props.selectedRow.FoodMediaCategory !== "undefined" && this.props.selectedRow.FoodMediaCategory === null) {
        this.props.AddFoodMediaInfos({
          userId: 1,
          mediaType: this.state.mediaType,
          mediaTitle: this.props.selectedRow.foodName,
          mediaUrl: panoramaName + "." + this.state.file[0].name.split(".")[1],
          mediaDesc: "360 Image",
          foodId: this.props.selectedRow.foodId,
          isFoodTrails: 1,
          thumbnail: this.state.thumbnail,
          typeIcon: this.state.typeIcon,
          slideOrder: this.state.slideOrder,
          file: this.state.file[0],
          imageWithoutExtention: panoramaName
        })
      }
      this.toggleModalPopup(false, "add", null);
      this.setState({ Add_isModalPopUp: false, isAddSend: true, OnSubmitAddFirstPanorama: false });
      toast("Successfully added!");
    }
    else {
      alert("There is no panorama images uploaded")
    }
  }

  render() {
    // eslint-disable-next-line no-unused-vars
    const Transition = React.forwardRef(function Transition(props, ref) {
      return <Slide direction="up" ref={ref} {...props} />;
    });

    let arr = []

    if (this.props.selectedRow) {
      if (typeof this.props.selectedRow.PlaceMediaCategory !== "undefined" && this.props.selectedRow.PlaceMediaCategory !== null) {
        let placeMedias = JSON.parse(this.props.selectedRow.PlaceMediaCategory);
        placeMedias.filter(elem => elem.mediaType === "VR").map((elem, index) => {
          if (typeof elem.PlaceMediaContent !== "undefined" && elem.PlaceMediaContent != null) {
            arr.push(JSON.parse(elem.PlaceMediaContent))
          }
        });
      } else if (typeof this.props.selectedRow.FoodMediaCategory !== "undefined" && this.props.selectedRow.FoodMediaCategory !== null) {
        let foodMedias = JSON.parse(this.props.selectedRow.FoodMediaCategory);
        foodMedias.filter(elem => elem.mediaType === "VR").map((elem, index) => {
          if (typeof elem.FoodMediaContent !== "undefined" && elem.FoodMediaContent != null) {
            arr.push(JSON.parse(elem.FoodMediaContent))
          }
        });
      }
    }

    return (
      <div>
        {arr.length > 0 ? (
          <div>
            <DisplayTable
              foodOrPlace={this.state.foodOrPlace}
              Data={this.state.galleryPhotos.length > 0 ? this.state.galleryPhotos : []}
              ProductProps={this.props}
              toggleModalPopup={this.toggleModalPopup}
            ></DisplayTable>
          </div>
        ) : (
          <div>
            <Container className="p-3">
              <Row>
                <Col>
                  <div className="mb-2">
                    {this.props.selectedRow.placeName || this.props.selectedRow.foodName} has no panorama photos
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className="dropzone-container">
                    <DropzoneArea
                      acceptedFiles={["image/jpg,image/jpeg"]}
                      dropzoneText={"Drag & Drop a Panorama Photo or Click to Add New Panorama"}
                      filesLimit={1}
                      multiple={false}
                      onChange={this.uploadHandler}
                      maxFileSize={100000000}
                    />
                  </div>
                  <div
                    className="row"
                    style={{
                      float: "right",
                      paddingRight: "10px",
                      paddingTop: "20px",
                      paddingBottom: "10px"
                    }}
                  >
                    <Button onClick={() => this.OnSubmitAddFirstPanorama()} color="primary" >Submit</Button>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        )}

        <Dialog
          open={this.state.Add_isModalPopUp || false}
          onClose={() => this.toggleModalPopup(false, "add", null)}
          aria-labelledby="add-new-panorama-dialog"
          aria-describedby="add-new-panorama"
          fullWidth={true}
          maxWidth="md"
        >
          <DialogTitle id="add-new-panorama-dialog">
            New Panorama Photo
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              <div className="dropzone-container">
                <DropzoneArea
                  acceptedFiles={["image/jpg,image/jpeg"]}
                  dropzoneText={"Drag & Drop a Panorama Photo or Click"}
                  filesLimit={1}
                  multiple={false}
                  onChange={this.uploadHandler}
                  maxFileSize={100000000}
                />
              </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.toggleModalPopup(false, "add", null)} color="secondary">Cancel</Button>
            <Button onClick={() => this.OnSubmitAddPanoramaImg()} color="primary">Submit</Button>
          </DialogActions>
        </Dialog>

        <Dialog
          fullScreen
          open={this.state.Edit_isModalPopUp}
          onClose={() => { this.toggleModalPopup(false, "edit", null); }}
        >
          <AppBar style={{ position: "relative" }} color="transparent">
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={() => this.toggleModalPopup(false, "edit", null)}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <div className="w-100">
                <Typography variant="h6">Panorama Photo</Typography>
              </div>
              <div className="w-100">
                <div className="float-right">
                  <button
                    type="button"
                    className="btn btn-primary mr-1"
                    aria-label="Close"
                    onClick={() => { this.toggleModalPopup(true, "editPanoramaPhoto", null); }}
                  >
                    Replace Panorama Photo
                  </button>
                </div>
              </div>
            </Toolbar>
          </AppBar>
          <div className="container-fluid">
            {this.state.selectedPanoramaPhoto !== null && (
              <PanoramaPhoto
                imageUrl={
                  this.state.foodOrPlace === "place"
                    ? panoramaPhotoUrl(this.state.selectedPanoramaPhoto.placeId, "place", this.state.selectedPanoramaPhoto.mediaUrl)
                    : panoramaPhotoUrl(this.state.selectedPanoramaPhoto.foodId, "food", this.state.selectedPanoramaPhoto.mediaUrl)
                }
                selectedImage={this.state.selectedPanoramaPhoto}
                module={this.state.foodOrPlace === "place" ? "place" : "food"}
              />
            )}
          </div>
        </Dialog>

        <Dialog
          open={this.state.EditPano_isModalPopUp || false}
          onClose={() => { this.toggleModalPopup(false, "editPanoramaPhoto", null); }}
          fullWidth={true}
          maxWidth="md"
        >
          <DialogTitle id="edit-photo-gallery-dialog"> Edit Panorama Photo </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              <DropzoneArea
                acceptedFiles={["image/*"]}
                dropzoneText={"Drag & Drop a New Panorama Photo or Click to Replace the Panorama Photo"}
                filesLimit={1}
                multiple={false}
                onChange={this.uploadHandler}
                maxFileSize={100000000}
              />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.setState({ EditPano_isModalPopUp: false, file: "" })} color="secondary">Cancel</Button>
            <Button onClick={() => this.OnSubmitUpdatePanoramaImg()} color="primary">Submit</Button>
          </DialogActions>
        </Dialog>
      </div >
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PanoramaList);

