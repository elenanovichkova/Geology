export default function NewEntryLayout(props: {
  modal: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div>
      {props.modal}
      {props.children}
    </div>
  );
}
