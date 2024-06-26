import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./style.scss";

import useFetch from "../../../hooks/useFetch";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import Img from "../../../components/lazyLoadImage/Img";

const HeroBanner = () => {
    const [background, setBackground] = useState("");
    const [query, setQuery] = useState("");
    const navigate = useNavigate();
    const { url } = useSelector((state) => state.home);
    const { data, loading } = useFetch("/movie/upcoming");

    // useEffect(() => {
    //     const bg =
    //         url.backdrop +
    //         data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
    //     setBackground(bg);
    // }, [data]);

    useEffect(() => {
        if (data && data.results) {
            const randomIndex = Math.floor(Math.random() * data.results.length);
            const bgPath = data.results[randomIndex]?.backdrop_path;
            if (bgPath) {
                const bg = `${url.backdrop}${bgPath}`;
                setBackground(bg);
                console.log("Background image set to:", bg);
            } else {
                console.warn("No backdrop path available, setting fallback image");
                setBackground("/path/to/fallback/image.jpg"); // Replace with your fallback image path
            }
        } else {
            console.warn("No data available from API, setting fallback image");
            setBackground("/path/to/fallback/image.jpg"); // Replace with your fallback image path
        }
    }, [data, url]);

    const searchQueryHandler = (event) => {
        if (event.key === "Enter" && query.length > 0) {
            navigate(`/search/${query}`);
        }
    };

    return (
        <div className="heroBanner">
            {!loading && (
                <div className="backdrop-img">
                    <Img src={background} />
                </div>
            )}

            <div className="opacity-layer"></div>
            <ContentWrapper>
                <div className="heroBannerContent">
                    <span className="title">Welcome.</span>
                    <span className="subTitle">
                        Millions of movies, TV shows and people to discover.
                        Explore now.
                    </span>
                    <div className="searchInput">
                        <input
                            type="text"
                            placeholder="Search for a movie or tv show...."
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyUp={searchQueryHandler}
                        />
                        <button>Search</button>
                    </div>
                </div>
            </ContentWrapper>
        </div>
    );
};

export default HeroBanner;
