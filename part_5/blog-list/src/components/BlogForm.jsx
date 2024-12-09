const BlogForm = ({
  title,
  author,
  url,
  handleNewBlog,
  handleTitle,
  handleAuthor,
  handleUrl,
}) => {
  return (
    <div>
      <form onSubmit={handleNewBlog}>
        <div>
          <label htmlFor='title'>Title: </label>
          <input
            type='text'
            name='title'
            id='title'
            value={title}
            onChange={handleTitle}
          />
        </div>
        <div>
          <label htmlFor='author'>Author: </label>
          <input
            type='text'
            name='author'
            id='author'
            value={author}
            onChange={handleAuthor}
          />
        </div>
        <div>
          <label htmlFor='url'>Url: </label>
          <input
            type='url'
            name='url'
            id='url'
            value={url}
            onChange={handleUrl}
          />
        </div>
        <button type='submit'>Create</button>
      </form>
    </div>
  );
};

export default BlogForm;
