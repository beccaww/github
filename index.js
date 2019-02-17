'use strict';

const searchURL = 'https://api.github.com/users/:';

function formatTypeParams(params) {
  const typeItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return typeItems.join('&');
}

function displayResults(responseJson) {
  console.log(responseJson);
  $('#results-list').empty();
  for (let i = 0; i < responseJson.repos.length; i++){
    $('#results-list').append(
      `<li><h3><a href="${responseJson.repos[i].url}">${responseJson.repos[i].owner}</a></h3>
      <p>${responseJson.repos[i].source.full_name}</p>
      <p>${responseJson.repos[i].url}</p>
      </li>`
    )};
  $('#results').removeClass('hidden');
};

function getRepos(query, maxResults= 10 ) {
  const params = {
    //type: query,
    query, 
    
    //sort:
    //direction:

  };
  const typeString = formatTypeParams(params)
  const url = searchURL + query + '/repos';

  console.log(url);

  
  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson, maxResults))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    const maxResults = $('#js-max-results').val();
    getRepos(searchTerm, maxResults);
  });
}

$(watchForm);