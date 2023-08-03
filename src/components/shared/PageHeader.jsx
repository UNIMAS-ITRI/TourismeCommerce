import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

function PageHeader(props) {
  let { header, breadcrumb } = props;

  if (header) {
    header = (
      <Typography variant="h4" component="div" className="page-header__title">
        {header}
      </Typography>
    );
  }

  if (breadcrumb.length > 0) {
    const lastIndex = breadcrumb.length - 1;

    breadcrumb = breadcrumb.map((item, index) => {
      let link;

      if (lastIndex === index) {
        link = (
            <Typography key={index} variant="body2" component="div" aria-current="page" style={{ color: 'grey' }}>
              {item.title}
            </Typography>
          );
      } else {
        link = (
          <Typography key={index} variant="body2" component="div">
            <Link to={item.url} style={{ textDecoration: 'none', color: 'inherit' }}>
              {item.title}
            </Link>
            <NavigateNextIcon fontSize="small" style={{ marginLeft: 5, marginRight: 5 }} />
          </Typography>
        );
      }

      return link;
    });

    breadcrumb = (
      <div className="page-header__breadcrumb">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">{breadcrumb}</ol>
        </nav>
      </div>
    );
  }

  return (
    <div className="page-header">
      <div className="page-header__container container">
        {breadcrumb}
      </div>
    </div>
  );
}

PageHeader.propTypes = {
  header: PropTypes.node,
  breadcrumb: PropTypes.array,
};

PageHeader.defaultProps = {
  breadcrumb: [],
};

export default PageHeader;
