import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Img = ({ src, className }) => {
    const fallbackSrc = "/path/to/fallback/image.jpg";
    return (
        <LazyLoadImage
            className={className || ""}
            alt=""
            effect="blur"
            src={src || fallbackSrc}
        />
    );
};

export default Img;