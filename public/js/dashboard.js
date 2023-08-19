
  
  const delButton = async (event) => {
  

    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/post/${event.target.dataset.id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to delete post');
      }
    }
  };
  
  

    document.querySelectorAll(".deleteBtn").forEach((el) => {
      el.addEventListener("click", delButton);
      
    });