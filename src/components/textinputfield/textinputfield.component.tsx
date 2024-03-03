import { useFormikContext, Field, FormikProps } from "formik";
import { Sample } from "../../services/api";

type textInput = {
  label: String;
};
export default function TextInputField(
  label: String,
  props: FormikProps<Sample>
) {
  return (
    <div className="mb-3">
      <label className="inline-block" htmlFor="collectorName">
        {label}
      </label>
      <Field
        className="inline-input"
        type="text"
        name="collectorName"
        placeholder="Enter full name here..."
      />
      {props.errors.collectorName && props.touched.collectorName ? (
        <div className="text-red-500">{props.errors.collectorName}</div>
      ) : null}
      <small className="font-thin text-sm block text-muted">
        Enter full name as first and last name. ex. John Doe
      </small>
    </div>
  );
}
