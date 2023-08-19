const newFormHandler = async (event) => {
    event.preventDefault();
  console.log(event.target);
    const title = document.querySelector('#post-name').value.trim();
    const content = document.querySelector('#post-desc').value.trim();
  
    if ( title  && content) {
      const response = await fetch(`/api/post/${event.target.dataset.id}`, {
        method: 'PUT',      
        body: JSON.stringify({ title: title, content: content }),
        headers: { 
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to edit post');
      }
    }
  };
    
    
  document
      .querySelector('.edit-post-form')
      .addEventListener('submit', newFormHandler);
   