const commentForm = document.getElementById('comment-form');
const commentList = document.getElementById('comment-list');

// Load comments from local storage when the page is loaded
window.addEventListener('load', () => {
  const comments = JSON.parse(localStorage.getItem('comments')) || [];
  comments.forEach(comment => {
    addCommentToList(comment.name, comment.comment, comment.timestamp);
  });
});

// Add a new comment when the form is submitted
commentForm.addEventListener('submit', event => {
  event.preventDefault();

  const nameInput = document.getElementById('name');
  const commentInput = document.getElementById('comment');
  const name = nameInput.value.trim();
  const comment = commentInput.value.trim();

  if (!name || !comment) {
    alert('Please fill in all fields.');
    return;
  }

  const timestamp = new Date().toISOString();
  addCommentToList(name, comment, timestamp);
  saveCommentToStorage(name, comment, timestamp);
  nameInput.value = '';
  commentInput.value = '';
});

// Display the comment as the user is typing
commentForm.addEventListener('input', event => {
  const commentInput = document.getElementById('comment');
  const commentPreview = document.getElementById('comment-preview');
  const comment = commentInput.value.trim();
  commentPreview.textContent = comment;
});

// Add a new comment to the list
function addCommentToList(name, comment, timestamp) {
  const listItem = document.createElement('li');
  const metaInfo = document.createElement('p');
  const nameElement = document.createElement('span');
  const timeElement = document.createElement('span');
  const commentElement = document.createElement('p');

  nameElement.textContent = name;
  timeElement.textContent = formatDate(timestamp);
  commentElement.textContent = comment;

  nameElement.classList.add('name');
  timeElement.classList.add('time');
  commentElement.classList.add('comment');

  metaInfo.appendChild(nameElement);
  metaInfo.appendChild(document.createTextNode(' | '));
  metaInfo.appendChild(timeElement);

  listItem.appendChild(metaInfo);
  listItem.appendChild(commentElement);

  commentList.appendChild(listItem);
}

// Save the comment to local storage
function saveCommentToStorage(name, comment, timestamp) {
  const comments = JSON.parse(localStorage.getItem('comments')) || [];
  comments.push({ name, comment, timestamp });
  localStorage.setItem('comments', JSON.stringify(comments));
}

// Format the timestamp
function formatDate(timestamp) {
  const date = new Date(timestamp);
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} at ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
}
