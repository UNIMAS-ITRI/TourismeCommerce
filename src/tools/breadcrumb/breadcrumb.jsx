// react
import React from 'react';

// third-party
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// application

import ChevronRightIcon from '@mui/icons-material/ChevronRight';

function PageHeader(props) {
    let { header, breadcrumb } = props;

    if (header) {
        header = (
            <div className="page-header__title">
                <h1>{header}</h1>
            </div>
        );
    }

    if (breadcrumb.length > 0) {
        const lastIndex = breadcrumb.length - 1;

        breadcrumb = breadcrumb.map((item, index) => {
            let link;
            if (lastIndex === index) {
                link = (<li key={index} aria-current="page"><label style={{ color: "#6c757d", fontWeight: "500" }}>{item.title} </label> </li>);
            }
            else {
                link = (
                    <li key={index} style={{ paddingRight: "10px" }}>
                        <a style={{ textDecoration: "none" }} href={item.url}>
                            <label style={{ color: "#5a6a2f", fontWeight: "500" }}>{item.title} {"    "}<ChevronRightIcon /> </label>
                        </a>
                    </li>
                );
            }

            return link;
        });

        breadcrumb = (
            <div className="page-header__breadcrumb">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        {breadcrumb}
                    </ol>
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
