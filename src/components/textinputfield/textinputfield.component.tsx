import { useField, Field } from "formik";

interface TextInput {
  name: string;
  label: String;
  placeholder: String;
  small?: String;
  type?: String;
  rows?: String;
  component?: String;
}

export default function TextInputField(props: TextInput) {
  const [field, meta] = useField(props.name);

  return (
    <div className="mb-3">
      <label className="inline-block" htmlFor={props.name}>
        {props.label}
      </label>
      <Field
        className="inline-input"
        type={props.type}
        name={props.name}
        rows={props.rows}
        component={props.component}
        placeholder={props.placeholder}
        // "Enter full name here..."
      />
      {meta.value && meta.touched ? (
        <div className="text-red-500">{meta.error}</div>
      ) : null}
      <small className="font-thin text-sm block text-muted">
        {props.small}
      </small>
    </div>
  );
}

// const MyTextField = ({ label, ...props }) => {

//   const [field, meta, helpers] = useField(props);

//   return (

//     <>

//       <label>

//         {label}

//         <input {...field} {...props} />

//       </label>

//       {meta.touched && meta.error ? (

//         <div className="error">{meta.error}</div>

//       ) : null}

//     </>

//   );

// };
