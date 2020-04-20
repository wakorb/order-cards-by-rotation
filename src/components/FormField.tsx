import React from "react";
import { useField } from "formik";

interface Values {
  firstName: string;
  lastName: string;
  email: string;
}

interface FormFieldProps {
  name: string;
  id?: string;
  label: string;
  placeholder: string;
}

const FormField = (props: FormFieldProps) => {
  const { name, id, label, placeholder } = props;

  const [field, meta] = useField(name);

  const { value, error, touched } = meta;

  return (
    <>
      <label>
        {label}
        <input id={id} placeholder={placeholder} {...field} value={value} />
      </label>
      {touched && error ? <div className="error">{error}</div> : null}
    </>
  );
};

export default FormField;
