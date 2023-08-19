const logout = async () => {
    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  };
  
  document.querySelector('#logout').addEventListener('click', logout);

//Idle Logout
let timer = 0;
let currSec = 0;

function resetTimer() {
  clearInterval(timer)
  currSec = 0;
  timer = setInterval(startIdleTimer, 60000)
}
window.onload = resetTimer
window.onmousemove = resetTimer
window.onmousedown = resetTimer
window.ontouchstart= resetTimer
window.onclick = resetTimer
window.onkeydown = resetTimer
window.onkeyup = resetTimer

function startIdleTimer() {
  currSec += 60000
  if(currSec > 1200000) {
    logout();
  }
}