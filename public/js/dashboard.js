const newFormHandler = async (event) => {
    event.preventDefault();
  console.log('hello')
    const title = document.querySelector('#post-name').value.trim();
    const content = document.querySelector('#post-desc').value.trim();
  
    if ( title  && content) {
      const response = await fetch(`/api/post`, {
        method: 'POST',
        body: JSON.stringify({ title, content }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to create post');
      }
    }
  };
  
  const delButton = async (event) => {
    const deleteBtn = document.getElementById("#deleteBtn").hasAttribute("onclick");

    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to delete post');
      }
    }
  };
  
  document
    .querySelector('.new-post-form')
    .addEventListener('submit', newFormHandler);