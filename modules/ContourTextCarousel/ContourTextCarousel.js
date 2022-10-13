import { useEffect, useState, useRef } from "react";
import { Navigation, Pagination, A11y, EffectFade } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from "./ContourTextCarousel.module.scss";
import Title2 from "../../typography/Title2";
import LabelLarge from "../../typography/LabelLarge";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';

const ContourTextCarousel = (props) => {
    // const carouselOptions = {
    //     fade: true,
    //     pageDots: false,
    //     prevNextButtons: false,
    //     imagesLoaded: true,
    //     autoPlay: false,
    //     adaptiveHeight: true,
    //     setGallerySize: true,
    //     resize: true,
    //     static: true,
    // };

    // const container = useRef(null);

    // const [selectedIndex, setSelectedIndex] = useState(1);
    // const [flickityInstance, setFlickityInstance] = useState(null);

    // const onSlideChange = () => {
    //     setSelectedIndex(
    //         parseInt(
    //             container.current.querySelector(".is-selected").dataset.index,
    //             10
    //         )
    //     );
    // };

    // let instance;

    // const onPrev = () => {
    //     flickityInstance.previous();
    // };

    // const onNext = () => {
    //     flickityInstance.next();
    // };

    // useEffect(() => {
    //     instance.on("change", onSlideChange);
    //     setFlickityInstance(instance);
    // }, []);

    // useEffect(() => {
    //     setSelectedIndex(
    //         parseInt(
    //             container.current.querySelector(".is-selected").dataset.index,
    //             10
    //         )
    //     );
    // });

    // const slides = props.module.slides.map((slide, i) => {
    //     return (
    //         <div className={styles.slide} key={i} data-index={i + 1}>
    //             {slide.text && (
    //                 <Title2 overwriteStyle={styles.text}>{slide.text}</Title2>
    //             )}
    //             {slide.label && (
    //                 <LabelLarge overwriteStyle={styles.label}>
    //                     {slide.label}
    //                 </LabelLarge>
    //             )}
    //         </div>
    //     );
    // });

    // if (slides.length) {
    //     return (
    //         <div className={styles.container} ref={container}>
    //             <div className={`grid-12 ${styles.grid}`}>
    //                 <span className={styles.prev} onClick={onPrev}></span>
    //                 <Flickity
    //                     flickityRef={(carousel) => {
    //                         instance = carousel;
    //                     }}
    //                     className={styles.carousel}
    //                     options={carouselOptions}
    //                     static
    //                 >
    //                     {slides}
    //                 </Flickity>
    //                 <div className={styles.carouselCount}>
    //                     <span className={styles.currentSlide}>
    //                         {selectedIndex < 10
    //                             ? `0${selectedIndex}`
    //                             : selectedIndex}
    //                     </span>
    //                     <span className={styles.slash}></span>
    //                     <span>
    //                         {slides.length < 10
    //                             ? `0${slides.length}`
    //                             : slides.length}
    //                     </span>
    //                 </div>
    //                 <span className={styles.next} onClick={onNext}></span>
    //             </div>
    //         </div>
    //     );
    // } else {
    //     return null;
    // }

    return (
        <div className={styles.container}>
            <div className={`grid-12 ${styles.grid}`}>
                <Swiper
                    className={styles.carousel}
                    modules={[Navigation, Pagination, A11y, EffectFade]}
                    spaceBetween={0}
                    slidesPerView={1}
                    navigation={{ nextEl: '.swiper-text-next', prevEl: '.swiper-text-prev' }}
                    pagination={{ type: 'fraction', el: '.swiper-text-pagination' }}
                    effect="fade"
                >

                    {props.module.slides.map((slide, i) => (
                        <SwiperSlide className={styles.slide} key={i} data-index={i + 1}>
                            {slide.text && (
                                <Title2 overwriteStyle={styles.text}>{slide.text}</Title2>
                            )}
                            {slide.label && (
                                <LabelLarge overwriteStyle={styles.label}>
                                    {slide.label}
                                </LabelLarge>
                            )}
                        </SwiperSlide>
                    ))}

                    <div className={styles.swiperControls}>
                        <div className={`${styles.swiperPagination} swiper-text-pagination`}></div>
                    </div>
                </Swiper>

                <div className={`${styles.swiperPrev} swiper-text-prev`}></div>

                <div className={`${styles.swiperNext} swiper-text-next`}></div>
            </div>
        </div>
    );
};

export default ContourTextCarousel;
