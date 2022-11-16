import React, { useEffect, useState } from 'react'
import axios from 'axios'
import firebase from 'firebase'
import { sendMsg } from '../../services/DBFunctions'
import { SearchGifs } from './SearchGifs'
import './GifPicker.css'

export const GifPicker =(props)=> {
    // STATEs
    const {setGif, convoid}=props
    const [data, setData] = useState([]);
    const [title, setTitle] = useState('Gif');
    const [loader, setLoader] = useState(true);
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(10)
    const [totalCount, setTotalCount] = useState(0)
    const [search, setSearch] = useState('');
    const [trending, setTrending] = useState(false)
    const [trendSearch, setTrendSearch] = useState(false)
    const [tSearch, setTsearch] = useState([])
    const date = firebase.firestore.FieldValue.serverTimestamp()
    const user = firebase.auth().currentUser
//
// ─── FETCH ──────────────────────────────────────────────────────────────────────
const fetchData = async (title)=>{
let URL = `https://api.giphy.com/v1/gifs/search?q=${title}&api_key=nn7ZohI4KJCwSXdYVpViEi7RkUmJacV3&limit=${limit}&offset=${offset}`;
// Try and catch
try{
    let fetchGif = await axios(URL);
    let fetchRes = await fetchGif;
    if(fetchRes.status === 200){
    // Set Data
    setData(fetchRes.data.data)
    // Set Total Count
    setTotalCount(fetchRes.data.pagination.total_count)
    // Set loader false
    setLoader(false)
     // Call new content
     content()
     // Set fetch random false
     if(trending){
     setTrending(false)
    // Reset offset
    setOffset(0)
     }
     // Set trend searching
     setTrendSearch(false)
    
    }
}
catch(error){
    if(error) throw error
}

}
// Remove image
// const removeImage = id => {
//     setData(
//      data.filter(gif => gif.id !== id)
//     )
//   }
// USE EFFECT on offset change fetch new data
useEffect(()=>{
    if(!trending){
    fetchData(title)
    }
},[offset])

 //
 // ─── HANDLE DOWNLOAD ────────────────────────────────────────────────────────────
     
const handleDownload = (url)=>{
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = "blob";
    xhr.onload = function(){
        let urlCreator = window.URL || window.webkitURL;
        let imageUrl = urlCreator.createObjectURL(this.response);
        let tag = document.createElement('a');
        tag.href = imageUrl;
        tag.download = title.charAt(0).toUpperCase() + title.slice(1);
        document.body.appendChild(tag);
        tag.click();
        document.body.removeChild(tag);
    }
    xhr.send();
}

// Scroll on top function
const onTop = () => {
    let options = { top: 0, left: 0, behavior: 'smooth' };
    window.scrollTo(options);
}

// Handle Next Pagination
const handleNext = ()=>{
    // Set loader true
    setLoader(true);
    // Add one page
    setOffset(offset + limit)
    // Go on top
    onTop()
}
// Handle prev Pagination
const handlePrev = ()=>{
    // Loader true
    setLoader(true);
    // One page
    setOffset(offset - limit) 
    // Go on top
    onTop()
}
const sendGif = (img)=> {
  sendMsg(user.uid, convoid, img, 'img')
}
 //
 // ─── RENDER CONTENT ─────────────────────────────────────────────────────────────
     
const content = () => {
    switch(true) {
    // If loader is true show loader spinner
      case loader:
        return <div>Loading...</div>
    // If data array more than zero loop through
      case data.length > 0:
        return  data.map(g=> {
            return (
                <div className='gif-card' key={g.id}>
                  <img className='image' onClick={()=>sendGif(g.images.fixed_height.url)} src={g.images.fixed_width.url} alt="gif"/>
                </div>
            )
        })
      default:
        return data
    }
  }
return (
    <div className='gifpicker'>
        <header>
        <i className="fal fa-times" onClick={()=>setGif(false)}></i>
        <h2>Search GIFs</h2> 
        <SearchGifs search={search} setSearch={setSearch} fetchData={fetchData} setTitle={setTitle}/>

        </header>
    
        <div className='gif-wrap'>
      
        {trendSearch ? 
        (
            <div className='gif-trend-search'>
            <ul> 
            {tSearch.map((t,i)=> <li key={i}><strong>{i + 1}</strong> {t.toUpperCase()}</li>)}
            </ul>
            </div>
        )
        :
        ''
        }
          {content()}
        </div>
        <div className="flexrow np-btn">
        <button className='themeBtn flex' s onClick={handlePrev}><i class="fad fa-backward"></i></button>
        <button className='themeBtn flex' onClick={handleNext}><i class="fad fa-forward"></i></button>
        </div>
    </div>
)
}
