const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#post-name').value.trim();
  const content = document.querySelector('#post-desc').value.trim();

  if ( title  && content) {
    const response = await fetch(`/api/post`, {
      method: 'POST',      
      body: JSON.stringify({ title: title, content: content }),
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
  
  
document
    .querySelector('.new-post-form')
    .addEventListener('submit', newFormHandler);
 