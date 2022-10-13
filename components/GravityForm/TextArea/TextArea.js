import React from "react";
import { useField } from "formik";
import styles from "./TextArea.module.scss";

const TextArea = (props) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input>. We can use field meta to show an error
    // message if the field is invalid and it has been touched (i.e. visited)
    const [field, meta] = useField(props);
    return (
        <div
            className={`${styles.formElementContainer} ${
                meta.touched && meta.error ? styles.errorContainer : ""
            }`}
        >
            <label htmlFor={props.name}>{props.label}</label>
            <textarea
                className={styles.textArea}
                {...field}
                {...props}
                placeholder={props.placeholder}
                rows="10"
            />
            {meta.touched && meta.error ? (
                <div className={styles.error}>{meta.error}</div>
            ) : null}
        </div>
    );
};

export default TextArea;
