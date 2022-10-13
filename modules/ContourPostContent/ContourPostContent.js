import styles from "./ContourPostContent.module.scss";
import LabelSmall from "../../typography/LabelSmall";
import BodySmall from "../../typography/BodySmall";
import BodyExtraLarge from "../../typography/BodyExtraLarge";
import Link from "next/link";

const ContourPostContent = (props) => {
    const content = props.module.main_content.map((paragraph, i) => {
        return <p key={i}>{paragraph.paragraph}</p>;
    });

    const sidebarContent = props.module.sidebar_content.map((section, i) => {
        const list = section.content.map((item, ii) => {
            return (
                <BodyExtraLarge key={ii} overwriteStyle={styles.list}>
                    {item.is_link === "No"
                        ? <p className={styles.lineItem}>{item.line}</p>
                        : (
                            <Link href={item.full_link}>
                                <a target="_blank">{item.line}</a>
                            </Link>
                        )}
                </BodyExtraLarge>
            );
        });

        return (
            <div className={styles.listSection} key={i}>
                <LabelSmall overwriteStyle={styles.label}>
                    {section.title}
                </LabelSmall>
                {list}
            </div>
        );
    });

    return (
        <div className={`${styles.container} grid-12`}>
            <div className={`${styles.content} col-start-2 col-end-7`}>
                <BodySmall overwriteStyle={styles.copy}>{content}</BodySmall>
            </div>
            <div className="col-start-9 col-end-11">{sidebarContent}</div>
        </div>
    );
};

export default ContourPostContent;
