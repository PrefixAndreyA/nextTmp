import Image from "next/image";
import { Navigation, Pagination, A11y, EffectFade } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from "./ContourImageCarousel.module.scss";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';

const ContourImageCarousel = (props) => {
    return (
        <div className="container">
            <div className={`grid-12 ${styles.grid}`}>
                <Swiper
                    className={styles.carousel}
                    modules={[Navigation, Pagination, A11y, EffectFade]}
                    spaceBetween={0}
                    slidesPerView={1}
                    navigation={{ nextEl: '.swiper-next', prevEl: '.swiper-prev' }}
                    pagination={{ type: 'fraction', el: '.swiper-pagination' }}
                    effect="fade"
                >
                    {props.module.images.map((slide, i) => (
                        <SwiperSlide className={styles.slide} key={i} data-index={i + 1}>
                            {slide.image && (
                                <Image
                                    src={slide.image.url}
                                    alt={slide.image.alt}
                                    layout="fill"
                                    objectFit="cover"
                                /*         We can use the sizes prop to set a max image size based on the largest size the image will be in its container, as opposed to trusting the viewport */
                                /* Set the min width to the viewport size when the image reaches its max size */
                                /* Set the image size to whatever the image size is at that point */
                                /* It's not fool proof because when you stack an image into a single column it can get larger, but it's a good general system */
                                /* sizes="(min-width: 1920px) 1920px" */
                                />
                            )}
                        </SwiperSlide>
                    ))}

                    <div className={styles.swiperControls}>
                        <div className={`${styles.swiperPrev} swiper-prev`}></div>

                        <div className={`${styles.swiperPagination} swiper-pagination`}></div>

                        <div className={`${styles.swiperNext} swiper-next`}></div>
                    </div>
                </Swiper>
            </div>
        </div>
    );
};

export default ContourImageCarousel;
