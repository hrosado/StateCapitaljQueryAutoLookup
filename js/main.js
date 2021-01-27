const search = document.getElementById('search');
const matchList = document.getElementById('match-list');

// Search states.jsnon and filter it
const searchStates = async searchText => {
    const res = await fetch('../data/state_capitals.json');
    const states = await res.json();
    //console.log(states); // test states

    // Get matches to current text input
    let matches = states.filter(state => {
        const regex = new RegExp(`^${searchText}`, 'gi'); // g- global, i- cases insensitive flag
        return state.name.match(regex) || state.abbr.match(regex);
    });
    if(searchText.length ===0){
        matches = [];
        // clear the html results
        matchList.innerHTML = '';

    }
    // console.log(matches); // test matches

    outputHtml(matches);

};

// Show results in HTML
const outputHtml = matches => {
    if(matches.length > 0){
        const html = matches.map(match => `
        <div class="card card-body mb-1">
            <h4>${match.name} (${match.abbr}) 
                <span class="text-primary">${match.capital}</span>
            </h4>
            <small>Lat: ${match.lat} / Long: ${match.long} </small>
        </div>
        `).join();
        // console.log(html);
        matchList.innerHTML = html;
    }
};

search.addEventListener('input', () => searchStates(search.value));