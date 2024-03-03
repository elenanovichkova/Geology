export default function SearchMapLayout(props: {
  modal: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between sm:p-16">
      {props.modal}
      {props.children}
    </div>
  );
}
