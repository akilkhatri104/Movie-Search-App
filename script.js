const apiKey = '0bcea48136fbfeb6ae2a0441736f5ff7'

const form = document.querySelector('form')
const titleInput = document.querySelector('#titleInput')
const queryResultsDiv = document.querySelector('#queryResults')

form.addEventListener('submit',async e => {
    try {
        e.preventDefault()
        const title = titleInput.value

        const results = await searchMovie(title)
        displayQueryResults(results)
    } catch (error) {
        alert(error)
    }

})




async function searchMovie(title = ""){
    try {
        title = title.replace(/ /g,'+')

        let apiCall = `https://api.themoviedb.org/3/search/movie?query=${title}&api_key=${apiKey}`
        console.log(apiCall);
        


        const response = await fetch(apiCall)
        if(!response.ok)
            throw new Error('Error fetching data')
        const data = await response.json()
        return data
console.log(apiCall);
    } catch (e) {
        alert(e)
    }
}

function displayQueryResults(data){
    const results = data.results

    queryResultsDiv.innerHTML = ''

    results.forEach( result => {
        console.log(result);

        const newDiv = document.createElement('div')
        newDiv.id = 'searchResult'
        queryResultsDiv.appendChild(newDiv)

        const posterTag = document.createElement('img')
        posterTag.src = `https://image.tmdb.org/t/p/w154${result.poster_path}`

        const movieTitle = document.createElement('p')
        movieTitle.innerHTML = result.title

        const releaseDate = document.createElement('p')
        releaseDate.innerHTML = result.release_date

        newDiv.appendChild(posterTag)
        newDiv.appendChild(movieTitle)
        newDiv.appendChild(releaseDate)

        
    } )
}
