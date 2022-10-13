import styles from "./ContourTeam.module.scss";
import Title3 from "../../typography/Title3";
import Title4 from "../../typography/Title4";
import LabelSmall from "../../typography/LabelSmall";
import BodySmall from "../../typography/BodySmall";
import Link from "next/link";
import Image from "next/image";

const ContourTeam = (props) => {
    const teamMembers = props.module.team_members.map((member, i) => {
        return (
            <>
                <div className="col-start-2 col-end-5">
                    {member.image && (
                        <Image
                            src={member.image.url}
                            alt={member.image.alt}
                            width={member.image.width}
                            height={member.image.height}
                            layout="responsive"
                            // We can use the sizes prop to set a max image size based on the largest size the image will be in its container, as opposed to trusting the viewport
                            // Set the min width to the viewport size when the image reaches its max size
                            // Set the image size to whatever the image size is at that point
                            // It's not fool proof because when you stack an image into a single column it can get larger, but it's a good general system
                            sizes="(min-width: 1184px) 352px"
                        />
                    )}
                </div>
                <div className="col-start-6 col-end-11">
                    {member.title && (
                        <Title4 overwriteStyle={styles.memberTitle}>
                            {member.title}
                        </Title4>
                    )}
                    {member.subtitle && (
                        <LabelSmall overwriteStyle={styles.subtitle}>
                            {member.subtitle}
                        </LabelSmall>
                    )}
                    {member.content && (
                        <BodySmall overwriteStyle={styles.content}>
                            {member.content}
                        </BodySmall>
                    )}
                    {props.module.styling_options.includes(
                        "is_external_link"
                    ) &&
                        member.external_link && (
                            <Link href={member.external_link}>
                                <a target="_blank">{props.module.link_text}</a>
                            </Link>
                        )}
                    {!props.module.styling_options.includes(
                        "is_external_link"
                    ) &&
                        member.link && (
                            <Link href={member.link}>
                                <a>{props.module.link_text}</a>
                            </Link>
                        )}
                </div>
            </>
        );
    });
    return (
        <div className={`${styles.container} grid-12`}>
            {props.module.styling_options.includes("show_title") &&
                props.module.title && (
                    <Title3
                        overwriteStyle={styles.title}
                        titleValue={props.titleValue}
                    >
                        {props.module.title}
                    </Title3>
                )}
            {teamMembers}
        </div>
    );
};

export default ContourTeam;
