import Content from './Content';
import Header from './Header';
import Total from './Total';

const App = () => {
  const courseName = 'Half Stack application development';

  return (
    <div>
      <Header title={courseName} />
      <Content />
      <Total />
    </div>
  );
};

export default App;