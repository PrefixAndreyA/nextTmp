import { useState, useEffect } from "react";
import styles from "./ContourPortfolioArchiveAll.module.scss";
import ContourTextAndImageComponent from "../../components/ContourTextAndImageComponent/ContourTextAndImageComponent";
import LabelLarge from "../../typography/LabelLarge";
import { useScrollBoost } from "react-scrollbooster";
import ContourGridComponent from "../../components/ContourGridComponent/ContourGridComponent";
import ContourGridItem from "../../components/ContourGridItem/ContourGridItem";
import { convertLink } from "../../utils";

const ContourPortfolioArchiveAll = (props) => {
    const [viewport] = useScrollBoost({
        direction: "horizontal",
        scrollMode: "native",
        emulateScroll: true,
        bounce: false,
    });

    const allDevelopmentsData = props.allDevelopmentsData;

    const [filterValue, setFilterValue] = useState(0);
    const [currentDevelopmentsData, setCurrentDevelopmentsData] =
        useState(allDevelopmentsData);
    const [activeFilter, setActiveFilter] = useState(0);

    const filterClick = (event) => {
        const tag = parseInt(event.target.dataset.tagid, 10);
        setFilterValue(tag);
        setActiveFilter(tag);
    };

    useEffect(() => {
        if (filterValue == 0) {
            setCurrentDevelopmentsData(allDevelopmentsData);
        } else {
            setCurrentDevelopmentsData(
                allDevelopmentsData.filter((development) =>
                    development.tags.includes(filterValue)
                )
            );
        }
    }, [filterValue, allDevelopmentsData]);

    const contrast = !props.module.styling_options.includes("dark_background");

    const filteredTags = props.tags.filter((tag) => tag.count !== 0);

    const tagList = filteredTags.map((tag, i) => {
        return (
            <LabelLarge key={i}>
                <span
                    data-tagid={tag.id}
                    onClick={filterClick}
                    className={`${styles.filterButton} ${
                        activeFilter == tag.id ? styles.activeFilter : ""
                    }`}
                >
                    {tag.name}
                </span>
            </LabelLarge>
        );
    });

    function formatContourGridItems(items) {
        if (items.length) {
            return items.map((item, i) => {
                const content = item.acf.post_archive_content;

                return <ContourGridItem item={content} key={i} i={i} />;
            });
        }
    }

    const portfolioListSecondToForth = currentDevelopmentsData.filter(
        (_item, i) => i > 0 && i < 4
    );
    const portfolioListMoreThanFive = currentDevelopmentsData.filter(
        (_item, i) => i > 4
    );

    const portfolioListShort = formatContourGridItems(
        portfolioListSecondToForth
    );
    const portfolioListLong = formatContourGridItems(portfolioListMoreThanFive);

    let firstSectionData = [];
    let firstPropObject = {};
    if (currentDevelopmentsData[0]) {
        firstSectionData = currentDevelopmentsData[0].acf.post_archive_content;

        firstPropObject = {
            contrast: contrast,
            titleValue: props.titleValue,
            stylingOptions: props.module.styling_options,
            buttonText: firstSectionData.button_text,
            buttonLink: firstSectionData.link
                ? convertLink(firstSectionData.link)
                : "",
            image: firstSectionData.image,
            eyebrow: firstSectionData.eyebrow,
            title: firstSectionData.title,
            subtitle: firstSectionData.subtitle,
            copy: firstSectionData.excerpt,
        };
    }

    let secondSectionData = [];
    let secondPropObject = {};
    if (currentDevelopmentsData[4]) {
        secondSectionData = currentDevelopmentsData[4].acf.post_archive_content;

        secondPropObject = {
            contrast: contrast,
            titleValue: props.titleValue,
            stylingOptions: props.module.styling_options,
            buttonText: secondSectionData.button_text,
            buttonLink: secondSectionData.link
                ? convertLink(secondSectionData.link)
                : "",
            image: secondSectionData.image,
            eyebrow: secondSectionData.eyebrow,
            title: secondSectionData.title,
            subtitle: secondSectionData.subtitle,
            copy: secondSectionData.excerpt,
        };
    }

    return (
        <div className={styles.container}>
            {tagList && (
                <div className={`grid-12 ${styles.tagFilter}`} ref={viewport}>
                    <div className={styles.scrollableContent}>
                        <LabelLarge>
                            <span
                                data-tagid={0}
                                onClick={filterClick}
                                className={`${styles.filterButton} ${
                                    activeFilter == 0 ? styles.activeFilter : ""
                                }`}
                            >
                                All
                            </span>
                        </LabelLarge>
                        {tagList}
                    </div>
                </div>
            )}
            {currentDevelopmentsData[0] && (
                <ContourTextAndImageComponent
                    propObject={firstPropObject}
                    imageOnLeft={true}
                />
            )}
            {portfolioListShort ? (
                <ContourGridComponent list={portfolioListShort} />
            ) : null}
            {currentDevelopmentsData[4] && (
                <ContourTextAndImageComponent
                    propObject={secondPropObject}
                    imageOnLeft={false}
                    overwriteStyle={styles.secondSection}
                />
            )}
            {portfolioListLong ? (
                <ContourGridComponent list={portfolioListLong} />
            ) : null}
        </div>
    );
};

export default ContourPortfolioArchiveAll;
