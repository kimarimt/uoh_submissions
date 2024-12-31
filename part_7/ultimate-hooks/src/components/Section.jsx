export default function Section({ heading, children }) {
  return (
    <div>
      <h2>{heading}</h2>
      {children}
    </div>
  )
}