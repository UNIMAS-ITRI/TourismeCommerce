import React from "react";
import Rating from "@material-ui/lab/Rating";
import Divider from "@mui/material/Divider";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import GradeIcon from '@mui/icons-material/Grade';
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

import {
    Checkbox,
    Button,
    TextField,
} from "@mui/material";

import FormControlLabel from "@mui/material/FormControlLabel";

export const FilterBar = ( categoriesType, Division, rating) => {
    return <div className="col-lg-3 col-md-3 ">
        <div>
            <h4>
                {" "}
                <FormatListBulletedIcon /> All Categories
            </h4>
            <div className="row">
                {categoriesType.map((x) => {
                    return (
                        <div className="col-6">
                            <FormControlLabel control={<Checkbox />} label={x} />
                        </div>
                    );
                })}
            </div>
        </div>

        <Divider style={{ marginTop: "1.0vw", marginBottom: "1.0vw" }} />
        <div>
            <h4>
                {" "}
                <LocationOnIcon />
                Division
            </h4>
            <div className="row">
                {Division.map((x) => {
                    return (
                        <div className="col-6">
                            <FormControlLabel control={<Checkbox />} label={x} />
                        </div>
                    );
                })}
            </div>
        </div>

        <Divider style={{ marginTop: "1.0vw", marginBottom: "1.0vw" }} />
        <div>
            <h4>
                {" "}
                <AttachMoneyIcon />
                Price Range
            </h4>

            <div className="d-flex">
                <TextField
                    id="min-price"
                    className="mr-auto"
                    label="MIN"
                    variant="outlined"
                    size="small"
                    style={{ width: 180, height: 40, fontSize: "8pt" }}
                    onChange={(e) => this.handleFilterOption(e)}
                ></TextField>
                <span className="mx-2 my-auto"> - </span>
                <TextField
                    id="max-price"
                    className="ml-auto"
                    label="MAX"
                    variant="outlined"
                    size="small"
                    style={{ width: 180, height: 40, fontSize: "8pt" }}
                    onChange={(e) => this.handleFilterOption(e)}
                ></TextField>
            </div>
            <div className="d-flex" style={{ paddingTop: "15px" }}>
                <Button
                    variant="contained"
                    disableElevation
                    style={{
                        backgroundColor: "#596a2a",
                        color: "white",
                        width: "90%",
                    }}
                    fullWidth
                    onClick={() => this.handleFilterPriceButton()}
                >
                    {" "}
                    Filter Price
                </Button>
            </div>
        </div>

        <Divider style={{ marginTop: "1.0vw", marginBottom: "1.0vw" }} />

        <div>
            <h4>
                {" "}
                <GradeIcon />
                Ratings
            </h4>
            <div className="row">
                {rating.map((x) => {
                    return (
                        <div
                            id={"filter-" + x.rate + "-star"}
                            className="d-flex mb-2 rating-background"
                            style={{ cursor: "pointer" }}
                            onClick={(e) => this.handleFilterOption(e)}
                        >
                            <Rating
                                name="read-only"
                                value={x.rate}
                                readOnly
                                size="medium"
                            />
                            <h5
                                id={"fllter-" + x.rate + "-stars"}
                                style={{ paddingLeft: "1.0vw" }}
                            >
                                {" "}
                                {x.value}
                            </h5>
                        </div>
                    );
                })}
            </div>
        </div>
    </div>
}