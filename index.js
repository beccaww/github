'use strict';

const searchURL = 'https://api.github.com/users/';

function formatTypeParams(params) {
  const typeItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return typeItems.join('&');
}

function displayResults(repos) {
  console.log(repos);
  $('#results-list').empty();
  for (let i = 0; i < repos.length; i++){
    $('#results-list').append(
      `<li><h3><a href="${repos[i].html_url}">${repos[i].name}</a></h3>
      </li>`
    )};
  $('#results').removeClass('hidden');
};

function getRepos(username) {
  const url = 'https://api.github.com/users/' + username + '/repos';

  console.log(url);

  
  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const username = $('#username').val();
    getRepos(username);
  });
}

$(watchForm);