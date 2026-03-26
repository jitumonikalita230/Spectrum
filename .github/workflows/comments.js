const fs = require('fs');
const path = './data/comments.json';

const event = process.env.GITHUB_EVENT_PATH;
const payload = JSON.parse(fs.readFileSync(event));
const comments = JSON.parse(fs.readFileSync(path));

if (payload.action === 'new_comment') {
  comments.push(payload.client_payload);
} else if (payload.action === 'delete_comment') {
  const id = payload.client_payload.id;
  const index = comments.findIndex(c => c.id === id);
  if (index !== -1) comments.splice(index, 1);
}

fs.writeFileSync(path, JSON.stringify(comments, null, 2));
