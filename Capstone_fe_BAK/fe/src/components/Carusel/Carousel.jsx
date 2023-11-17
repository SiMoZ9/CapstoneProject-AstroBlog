import {Carousel, Typography} from "@material-tailwind/react";
import {Link} from "react-router-dom";

function NasaCarousel({pic1, pic2, pic3, author1, author2, author3}) {
    return (
        <Carousel
            className="rounded-lg flex"
            navigation={({ setActiveIndex, activeIndex, length }) => (
                <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
                    {new Array(length).fill("").map((_, i) => (
                        <span
                            key={i}
                            className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                                activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                            }`}
                            onClick={() => setActiveIndex(i)}
                        />
                    ))}
                </div>
            )}
        >
            <Link to={pic1}>
            <img
                src={pic1}
                alt="image 1"
                className="h-full w-full object-cover"
            />
            </Link>

            <Link to={pic2}>
            <img
                src={pic2}
                alt="image 2"
                className="h-full w-full object-cover"
            />
            </Link>

            <Link to={pic3}>
            <img
                src={pic3}
                alt="image 3"
                className="h-full w-full object-cover"
            />
            </Link>

        </Carousel>
    );
}

export default NasaCarousel