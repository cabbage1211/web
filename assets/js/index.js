const searchBar = document.getElementById('searchBar');

const HOUSES = [{pais: "Spain", ciutat: "Barcelona", adr: "Mallorca's Street", price: "320000€", bedrooms: "2", surface:"63m²", toilets:"1", IMG1:"url(images/CASA1.jpg)" , IMG2:"images/CASA1BW.png", link:"barcelona-1.html", p_id:"BCN" },
{pais: "Spain", ciutat: "Sant Adrià", adr: "Girona's Street", price: "560000€", bedrooms: "3", surface:"145m²", toilets:"2", IMG1:"url(images/CASA2.jpg)" , IMG2:"images/CASA2BW.jpg",link: "Sant_adria.html",p_id:"STA"},
{pais: "China", ciutat: "Hong Kong", adr: "Argyle Street", price: "110000€", bedrooms: "1", surface:"41m²", toilets:"1", IMG1:"url(images/CASA3.jpg)" , IMG2:"images/CASA3BW.jpg",link:"Hong_kong.html", p_id:"HK"},
{pais: "China", ciutat: "Beijing", adr: "Ping'anli W Street", price: "110000€", bedrooms: "1", surface:"41m²", toilets:"1", IMG1:"utl(images/CASA3.jpg)" , IMG2:"images/CASA3BW.jpg",link:"Beijing.html",p_id:"BEI"}
];

searchBar.onclick = function(){
    for(var i=0; i<4; ++i){
        document.getElementById(HOUSES[i].p_id).classList.add("fade");
    }
    setTimeout(function(){
        for(var i=0; i<4; ++i){
            document.getElementById(HOUSES[i].p_id).classList.add("hidden");
        }
    },200);
};

searchBar.addEventListener('keyup', (e) => {
		const searchString = e.target.value;
		const filteredHouses = HOUSES.filter(house => {
			return house.pais.includes(searchString) || house.ciutat.includes(searchString) || house.adr.includes(searchString);
		});
        console.log(filteredHouses);
        console.log(filteredHouses.length);
        console.log(HOUSES);
        setTimeout(function(){
		    for(var i=0;i<12;++i){
                if(i<filteredHouses.length){
                        var style = document.getElementById(filteredHouses[i].p_id);
                        style.classList.remove("hidden");
                        style.classList.remove("fade");
                        console.log(style);
                        console.log(filteredHouses);
                }
                else if(i>=4){
                    if(!document.getElementById((i+1).toString()).classList.contains("hidden")){
                        document.getElementById((i+1).toString()).classList.add("hidden");
                    }
                }
                else 
                    if(!document.getElementById(HOUSES[i].p_id).classList.contains("hidden")){
                        document.getElementById(HOUSES[i].p_id).classList.add("hidden");
                    }
            }
        },200);
});
