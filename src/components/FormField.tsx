import React from "react";
import { makeStyles } from "@material-ui/styles";
import { useField } from "formik";

interface Values {
  firstName: string;
  lastName: string;
  email: string;
}

interface FormFieldProps {
  name: string;
  id?: string;
  label?: string;
  placeholder: string;
  className?: string;
}

const useStyles = makeStyles({
  input: {
    display: "inline-block",
    border: "1px solid #d2d2d2",
    borderRadius: 3,
    width: 230,
    padding: "9px 10px",
    "&::placeholder": {
      color: "#b9b9b9",
    },
  },
  label: {
    display: "block",
    color: "#b9b9b9",
    marginBottom: 4,
  },
});

const FormField = (props: FormFieldProps) => {
  const { name, id, label, placeholder, className } = props;
  const classes = useStyles();

  const [field, meta] = useField(name);

  const { value, error, touched } = meta;

  return (
    <div className={className}>
      {label && <label className={classes.label}>{label}</label>}
      <input
        className={classes.input}
        id={id}
        placeholder={placeholder}
        {...field}
        value={value}
      />
      {touched && error ? <div className="error">{error}</div> : null}
    </div>
  );
};

export default FormField;
