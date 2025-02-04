import { CoursePart } from '../types/course-part';

interface PartProps {
  part: CoursePart;
}

const Part = ({ part }: PartProps) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  const renderPart = (part: CoursePart) => {
    switch (part.kind) {
    case 'basic':
      return <em>{part.description}</em>;
    case 'group':
      return <p>group projects {part.groupProjectCount}</p>;
    case 'background':
      return (
        <>
          <em>{part.description}</em>
          <p>
            Link to background material{' '}
            <a href={part.backgroundMaterial}
              target='_blank'>{part.backgroundMaterial}</a>
          </p>
        </>
      );
    case 'special':
      return (
        <>
          <em>{part.description}</em>
          <p>required skills: {part.requirements.join(', ')}</p>
        </>
      );
    default:
      return assertNever(part);
    }
  };

  return (
    <>
      <div>
        <strong>
          <p>{part.name} {part.exerciseCount}</p>
        </strong>
        { renderPart(part) }
      </div>
      <hr />
    </>
  );
};

export default Part;