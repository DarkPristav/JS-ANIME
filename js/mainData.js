const mainData = () => {
    fetch('https://anime-67b23-default-rtdb.firebaseio.com/anime.json')
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
}

mainData();