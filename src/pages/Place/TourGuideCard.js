import React from "react";
import PropTypes from "prop-types";
// @mui/material components
import {
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  Grid,
  Rating,
} from "@mui/material";

TourGuideCard.propTypes = {
  x: PropTypes.object,
};

export default function TourGuideCard({ x }) {
  return (
    <Card>
      <img src={x.image} width='100%' height='auto' />
      <CardContent sx={{ textAlign: 'center' }}>
        <Stack direction='column' spacing={1}>
          <Typography fontWeight='bold' variant="caption" fontSize={18}>
            {x.name}
          </Typography>
          <Grid container justifyContent='center' alignItems='center' display='flex'>
            <Rating size="small" value={x.rating} readOnly />&nbsp;<Typography variant="caption">({x.rating})</Typography>
            &nbsp;
            <Typography variant="caption" fontSize={18}>
              ({x.review} Reviews)
            </Typography>
          </Grid>
          <Typography variant="caption" fontSize={18}>
            <b>RM{x.price}</b>/day
          </Typography>
        </Stack>
        <Button
          size="small"
          variant="contained"
          style={{
            backgroundColor: "#596a2a",
            marginTop: "1vw",
            padding: '0.5vw 1vw',
            color: 'white',
            fontWeight: 'bold',
            borderRadius: '0.5vw',
            boxShadow: '2px 3px 5px #888888',
          }}
          onClick={() => window.open("https://wa.me/60168888422", "_blank")}
        >
          <Typography variant="body">
            Contact
          </Typography>
        </Button>
      </CardContent>
    </Card>
  );
}