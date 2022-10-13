import Link from "next/link";
import styles from "./ContourContact.module.scss";
import GravityForm from "../../components/GravityForm/GravityForm";
import Title3 from "../../typography/Title3";
import LabelSmall from "../../typography/LabelSmall";
import BodyExtraLarge from "../../typography/BodyExtraLarge";

const ContourContact = (props) => {
    const address = props.options.address && props.options.address.map((line, i) => {
        return <li key={i}>{line.address_line}</li>;
    });

    return (
        <div className={`grid-12 ${styles.container}`}>
            <div className={`col-start-2 col-end-7 ${styles.formContainer}`}>
                <Title3 overwriteStyle={styles.title}>
                    {props.module.title}
                </Title3>
                <GravityForm
                    forms={props.forms}
                    formID={props.module.form_id}
                />
            </div>
            <div
                className={`col-start-9 col-end-11 ${styles.contentContainer}`}
            >
                <LabelSmall overwriteStyle={styles.sideTitle}>
                    Address
                </LabelSmall>
                <BodyExtraLarge>
                    <ul>{address}</ul>
                </BodyExtraLarge>
                <LabelSmall overwriteStyle={styles.sideTitle}>Email</LabelSmall>
                <BodyExtraLarge>
                    <Link href={`mailto:${props.options.email}`}>
                        {props.options.email}
                    </Link>
                </BodyExtraLarge>
                <LabelSmall overwriteStyle={styles.sideTitle}>Phone</LabelSmall>
                <BodyExtraLarge>
                    <Link href={`tel:${props.options.phone_number}`}>
                        {props.options.phone_number}
                    </Link>
                </BodyExtraLarge>
            </div>
        </div>
    );
};

export default ContourContact;
