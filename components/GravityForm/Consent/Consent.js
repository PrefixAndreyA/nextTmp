import React from "react";
import { useField } from "formik";
import styles from "./Checkbox.module.scss";

const Checkbox = ({ children, ...props }) => {
    // React treats radios and checkbox inputs differently other input types, select, and textarea.
    // Formik does this too! When you specify `type` to useField(), it will
    // return the correct bag of props for you -- a `checked` prop will be included
    // in `field` alongside `name`, `value`, `onChange`, and `onBlur`
    const [field, meta] = useField({ ...props, type: "checkbox" });
    return (
        <div
            className={`${styles.formElementContainer} ${
                meta.touched && meta.error ? styles.errorContainer : ""
            }`}
        >
            <label className={styles.checkbox}>
                <input type="checkbox" {...field} {...props} />
                {/* {children} */}
                {props.checkboxlabel}
            </label>
            {meta.touched && meta.error ? (
                <div className={styles.error}>{meta.error}</div>
            ) : null}
        </div>
    );
};

export default Checkbox;
