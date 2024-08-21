const apiKey = '0bcea48136fbfeb6ae2a0441736f5ff7'

const form = document.querySelector('form')
const titleInput = document.querySelector('#titleInput')
const queryResultsDiv = document.querySelector('#queryResults')
const movieDetailsSection = document.querySelector('#movieDetails')

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

function displayQueryResults(data){
    const results = data.results

    queryResultsDiv.innerHTML = ''
    queryResultsDiv.style.display = 'flex'
    movieDetailsSection.style.display = 'none'


    results.forEach( result => {
        // console.log(result);

        const newDiv = document.createElement('div')
        newDiv.id = 'searchResult'
        queryResultsDiv.appendChild(newDiv)

        const posterTag = document.createElement('img')
        posterTag.src = `https://image.tmdb.org/t/p/w154${result.poster_path}`
        newDiv.appendChild(posterTag)


        const movieTitle = document.createElement('p')
        movieTitle.innerHTML = result.title
        newDiv.appendChild(movieTitle)

        const releaseDate = document.createElement('p')
        releaseDate.innerHTML = result.release_date
        newDiv.appendChild(releaseDate)

        const moreInfo = document.createElement('button')
        moreInfo.innerHTML = 'More Info'
        newDiv.appendChild(moreInfo)

        moreInfo.addEventListener('click',async e => {
            e.preventDefault()

            const data = await getMovieDetails(result.id)
            displayMovieDetail(data)
        })

        
        
    } )
}

function displayMovieDetail(data){
    queryResultsDiv.style.display = 'none'
    movieDetailsSection.style.display = 'block'
    movieDetailsSection.innerHTML = ''

    // const leftSection = document.querySelector('#leftSection')
    // const rightSection = document.querySelector('#rightSection')

    // leftSection.innerHTML = ''
    // rightSection.innerHTML = ''

    const posterTag = document.createElement('img')
    posterTag.src = `https://image.tmdb.org/t/p/w342${data.poster_path}`
    movieDetailsSection.appendChild(posterTag)

    const tagline = document.createElement('p')
    tagline.innerHTML = `<i>${data.tagline}</i>`
    tagline.style.textAlign = 'center'
    movieDetailsSection.appendChild(tagline)

    const title = document.createElement('p')
    title.innerHTML = `<strong>Title</strong>: ${data.original_title}`
    movieDetailsSection.appendChild(title)

    const overview = document.createElement('p')
    overview.innerHTML = `<strong>Overview</strong>: ${data.overview}`
    movieDetailsSection.appendChild(overview)

    const runtime = document.createElement('p')
    runtime.innerHTML = `<strong>Runtime</strong>: ${data.runtime} mins`
    movieDetailsSection.appendChild(runtime)

    const release_date = document.createElement('p')
    release_date.innerHTML = `<strong>Release Date: ${data.release_date}`
    movieDetailsSection.appendChild(release_date)

}

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

async function getMovieDetails(id){
    try {
        const apiCall = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`
        console.log(apiCall);
        

        const response = await fetch(apiCall)
        if (!response.ok) {
            throw new Error('Error fetching movie details')
        }

        const data = await response.json()
        return data
    } catch (error) {
        alert(error)
    }
}
