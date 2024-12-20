const Anecdote = ({ anecdote, handleVotes }) => {
  const { text, votes } = anecdote

  return (
    <li>
      <p>{text}</p>
      <p>
        has {votes} votes
        <button onClick={handleVotes}>Vote</button>
      </p>
    </li>
  )
}

export default Anecdote