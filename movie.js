const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1OGQ0NTJkZDQ2ZTkwYTA0MWEwNGJlMzBiNzdmMmQ3ZSIsInN1YiI6IjY1ZTgxYmQxNDJmMTlmMDE4NzhkNzdkMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zW858EaTQE30E8LoiNFa8Z1eqEebWfAllpm9T8pwmus'
    }
}

fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options)
    .then(response => response.json())
    .then(response => 
    fetchData(response.results))
    .catch(err => console.error(err));

const fetchData = async(response) => {
const res = await response
// console.log(response)


//요소 생성
const Moviedata = document.createElement('div')
const Img = document.createElement('img')
const P = document.createElement('p')
const H2 = document.createElement('h2')
const sec =document.querySelector('.section')

let cloneEl;
//데이터가공
    res.map(r =>{
        //각 요소속성에 데이터넣기
        Img.src = `https://image.tmdb.org/t/p/w500/${r.backdrop_path}`
        H2.textContent = `${r.title}`
        P.textContent = `${r.overview}`
        Moviedata.id =`${r.id}`

        //부모요소인 div에 각 요소들 밀어넣기
        Moviedata.append(Img, H2, P)
        

        //부모요소인 div를 20개 복사
        cloneEl = clone(Moviedata, 20)

        //html section태그안에 밀어넣기
        sec.append(cloneEl);
    })  
    // const a = response.find(i => 
    //     Button.addEventListener('click', ()=>{
    //         i.title === Input.value
    //     }))
    // console.log(a)
    const Button = document.querySelector('#search_btn')
    const searchpage = document.querySelector(".section")
    
    
   
   
    Button.addEventListener('click', async (e)=>{
        e.preventDefault();
       let Titlemain;
    response.forEach(a=>{
        Titlemain += a.title
    })
    console.log(Titlemain)
    console.log(Titlemain.toLowerCase())
    const Input = document.getElementById('search_input')
    const text = Input.value.toLowerCase()
        if(text.includes(Titlemain.toLowerCase()))
       {  console.log("사실입니다.")
            searchpage.style.display = "none"
            searchMovie(response);
    }else{
            searchpage.style.display = "none"
            const searchdisplay = document.createElement('div')
            searchdisplay.textContent = '영화제목이 없습니다.'
            searchpage.after(searchdisplay)
            
        } // 해당 데이터div 출력 , 나머지 off
    
    })
    
    }

    // searchMovie 데이터 출력 함수 만들기
    async function searchMovie(res){

        const searchMian = document.querySelector('.section')
        res.forEach(data => {
            const mainDiv = document.createElement('div')
            const mainImg = document.createElement('img')
            const mainTile = document.createElement('h2')
            const maintext = document.createElement('p')

            mainImg.src = `https://image.tmdb.org/t/p/w500/${data.backdrop_path}`
            mainTile.textContent = `${data.title}`
            maintext.textContent = `${data.overview}`

            mainDiv.append(mainImg, mainTile, maintext);

        });
        searchMian.after(mainDiv);
    }

    

// 복사함수 만들기
function clone (e, n) {
for(let i = 0; i < n; i++){
return  e.cloneNode(true)
}
}

//검색시 string 값 비교하여 data가져오기



// 검색 후 찾은 데이터 요소 출력하기

    // 1. 영화제목 검색시 화면에 해당 영화출력
    // 2. 이미지 클릭시 해당 영화 id 값 alert로 출력

    
    
    
    
    // https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg