const Section = ({ heading, children }) => (
  <section>
    <h2>{heading}</h2>
    {children}
  </section>
);

export default Section;