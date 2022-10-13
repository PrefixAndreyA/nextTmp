import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextInput from "./TextInput/TextInput";
import Consent from "./Consent/Consent";
import Select from "./Select/Select";
import TextArea from "./TextArea/TextArea";
import axios from "axios";
import { isEmptyObject } from "../../utils";

const GravityForm = (props) => {
    let formID = props.formID;

    const currentForm = props.forms.find((form) => form.id == formID);

    const fieldData = currentForm.fields.map((field) => {
        const type = field.type;
        const name = `input_${field.id}`;
        const label = field.label;
        const required = field.isRequired;
        const choices = field.choices;
        const placeholder = field.placeholder;
        const checkboxLabel = field.checkboxLabel;
        return {
            type: type,
            name: name,
            label: label,
            required: required,
            choices: choices,
            placeholder: placeholder,
            checkboxLabel: checkboxLabel,
        };
    });

    const phoneRegex = /([0-9]{10,}|[\-+#(). ])+$/;
    const initialValues = {};
    const yupObject = {};

    fieldData.forEach((field) => {
        if (field.type == "consent") {
            initialValues[field.name] = false;
            yupObject[field.name] = Yup.boolean()
                .required("Required")
                .oneOf([true], "Required");
        } else if (field.type == "email") {
            initialValues[field.name] = "";
            if (field.required == true) {
                yupObject[field.name] = Yup.string()
                    .email("Invalid email address")
                    // Gravity forms requires 6 characters for emails so let's match that
                    .test(
                        "length",
                        "Invalid email address",
                        (value) => value && value.length > 5
                    )
                    .required("Required");
            }
        } else if (field.type == "phone") {
            initialValues[field.name] = "";
            if (field.required == true) {
                yupObject[field.name] = Yup.string()
                    .matches(phoneRegex, "Invalid phone number")
                    .required("Required");
            }
        } else {
            initialValues[field.name] = "";
            if (field.required == true) {
                yupObject[field.name] = Yup.string().required("Required");
            }
        }
    });

    const fields = fieldData.map((field, i) => {
        if (field.type == "text") {
            return (
                <TextInput
                    key={field.id}
                    name={field.name}
                    label={field.label}
                    placeholder={field.placeholder}
                />
            );
        } else if (field.type == "email") {
            return (
                <TextInput
                    key={field.id}
                    name={field.name}
                    label={field.label}
                    placeholder={field.placeholder}
                />
            );
        } else if (field.type == "phone") {
            return (
                <TextInput
                    key={field.id}
                    name={field.name}
                    label={field.label}
                    placeholder={field.placeholder}
                />
            );
        } else if (field.type == "select") {
            const options = field.choices.map((option, i) => {
                return (
                    <option key={i} value={option.value}>
                        {option.text}
                    </option>
                );
            });
            return (
                <Select key={field.id} name={field.name} label={field.label}>
                    <option value="" disabled>
                        Select
                    </option>
                    {options}
                </Select>
            );
        } else if (field.type == "textarea") {
            return (
                <TextArea
                    key={field.id}
                    name={field.name}
                    label={field.label}
                    placeholder={field.placeholder}
                />
            );
        } else if (field.type == "consent") {
            return (
                <Consent
                    key={field.id}
                    name={field.name}
                    label={field.label}
                    checkboxlabel={field.checkboxLabel}
                />
            );
        }
    });

    const formIndex = props.forms.findIndex((form) => form.id == formID);

    const [message, setMessage] = useState(null);
    const [buttonDisabled, setButtonDisabled] = useState(false);

    const disableSubmit = () => {
        // setTimeout hack works fine here, fix it if you want!
        setTimeout(() => {
            setButtonDisabled(true);
        }, 0);
    };

    return (
        <>
            <Formik
                initialValues={initialValues}
                validationSchema={Yup.object(yupObject)}
                onSubmit={(values) => {
                    axios
                        .post(
                            `${process.env.NEXT_PUBLIC_API_URL}/wp-json/gf/v2/forms/${formID}/submissions`,
                            JSON.stringify(values),
                            {
                                headers: {
                                    "Content-Type":
                                        "application/json, text/plain, */*",
                                },
                            }
                        )
                        .then((result) => {
                            if (result.status == 200) {
                                setMessage("Form submitted successfully.");
                                setButtonDisabled(true);
                            }
                        })
                        .catch((error) => {
                            console.log(error.response);
                            setMessage("Error. Please try again.");
                            setButtonDisabled(false);
                        });
                }}
            >
                {({ errors, touched }) => (
                    <Form>
                        {fields}
                        <button
                            type="submit"
                            disabled={buttonDisabled}
                            // We only want to disable the submit button if validation was successful
                            onClick={
                                isEmptyObject(errors) && !isEmptyObject(touched)
                                    ? disableSubmit
                                    : null
                            }
                            style={
                                buttonDisabled
                                    ? {
                                        opacity: "0.4",
                                        transition: "all 0.24s",
                                        cursor: "default",
                                    }
                                    : { opacity: "1", transition: "all 0.24s" }
                            }
                        >
                            {props.forms[formIndex].buttonText}
                        </button>
                        {message && (
                            <div
                                style={
                                    // At this point in the lifecycle buttonDisabled essentially means that the form was submitted successfully, which is what we need to know here. i'd make another piece of state for better semantics/readability, but then realized a comment would do fine, so here we are.
                                    buttonDisabled
                                        ? { marginTop: "2rem" }
                                        : {
                                            marginTop: "2rem",
                                            color: "#c92a07",
                                        }
                                }
                            >
                                {message}
                            </div>
                        )}
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default GravityForm;
