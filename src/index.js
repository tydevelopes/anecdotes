import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const Title = ({ text, level }) => {
  switch (level) {
    case 1:
      return <h1>{text}</h1>;
    case 2:
      return <h2>{text}</h2>;
    case 3:
      return <h3>{text}</h3>;
    case 4:
      return <h4>{text}</h4>;
    case 5:
      return <h5>{text}</h5>;
    case 6:
      return <h6>{text}</h6>;
    default:
      return <h1>{text}</h1>;
  }
};

const DisplayAnecdote = ({ anecdote, votes }) => {
  return (
    <>
      <p>{anecdote}</p>
      <p>has {votes} votes</p>
    </>
  );
};

const App = ({ anecdotes, initialPoints }) => {
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(initialPoints);
  const [maxIndex, setMaxIndex] = useState(0);

  const handleNewAnecdote = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomIndex);
  };

  const handleVote = () => {
    setPoints({ ...points, [selected]: points[selected] + 1 });
  };

  useEffect(() => {
    let maxIndex = 0;
    let max = points[0];
    for (const key in points) {
      if (points[key] > max) {
        max = points[key];
        maxIndex = key;
      }
    }
    setMaxIndex(maxIndex);
  }, [selected, points]);

  return (
    <div>
      <Title text="Anecdote of the day" />
      <DisplayAnecdote
        anecdote={anecdotes[selected]}
        votes={points[selected]}
      />
      <Button onClick={handleVote} text="vote" />
      <Button onClick={handleNewAnecdote} text="next anecdote" />
      <Title text="Anecdote with the most votes" level={2} />
      <DisplayAnecdote
        anecdote={anecdotes[maxIndex]}
        votes={points[maxIndex]}
      />
    </div>
  );
};

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
];

const initialPoints = {};
for (const key of anecdotes.keys()) {
  initialPoints[key] = 0;
}

ReactDOM.render(
  <App anecdotes={anecdotes} initialPoints={initialPoints} />,
  document.getElementById('root')
);

// TODO: render all anecdotes with the most votes
