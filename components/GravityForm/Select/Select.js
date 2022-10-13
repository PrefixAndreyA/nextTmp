import React from "react";
import { useField } from "formik";
import styles from "./Select.module.scss";

const Select = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <div
            className={`${styles.formElementContainer} ${
                meta.touched && meta.error ? styles.errorContainer : ""
            }`}
        >
            <label htmlFor={props.id || props.name}>{label}</label>
            <select {...field} {...props} className={styles.select} />
            {meta.touched && meta.error ? (
                <div className={styles.error}>{meta.error}</div>
            ) : null}
        </div>
    );
};

export default Select;
