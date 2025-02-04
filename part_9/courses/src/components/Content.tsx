import { courseParts } from '../types/course-part';
import Part from './Part';

const Content = () => courseParts.map(coursePart =>
  <Part
    key={coursePart.name}
    part={coursePart}
  />
);

export default Content;