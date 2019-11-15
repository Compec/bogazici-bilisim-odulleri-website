// @author Emin Deniz @emindeniz99

const addImage = (resim, isim) => {
	let item = document.createElement("div")
	item.className = "col-xs-12 col-sm-6 col-md-4 col-lg-3"

	let img = document.createElement("img")

	var temp = resim.substring(3);
	temp = "//img2"+temp;
	temp =temp.substring(0,temp.indexOf("f"))+"300x200/"+temp.substring(temp.indexOf("f")); 
	console.log(temp);


	img.src = temp
	img.alt = isim
	img.className = "img-responsive wow fadeIn"
	img.setAttribute("data-wow-delay", "0.4s")

	// img.style="height:150px"

	let att = document.createElement("a")
	att.href = resim

	item.appendChild(att)
	att.appendChild(img)
	document.getElementById("gallery-fire").appendChild(item)

	// console.log("tt")
	// <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3">
	//                                         <a href="assets/images/gallery/6.JPG" title="">
	//                                             <img src="assets/images/gallery/6 (Small).JPG" alt="gallery image"
	//                                                 class="img-responsive wow fadeIn" data-wow-delay="0.4s"></a>
	//                                     </div>
}

const addNewWinner = (yilID, resim, isim, kat) => {
	let item = document.createElement("div")
	item.className = "col-sm-12 col-md-4 speaker-info wow fadeIn"
	item.setAttribute("data-wow-delay", "0.2s")

	let img = document.createElement("img")
	img.src = resim
	img.alt = isim
	img.className = "img-responsive center-block"
	img.style = "height:150px"

	let title = document.createElement("p")
	title.innerText = kat
	let name = document.createElement("span")
	name.innerText = isim

	item.appendChild(img)
	item.appendChild(title)
	item.appendChild(name)
	document.getElementById(yilID).appendChild(item)

	// console.log("tt")
}

var firebaseConfig = {
	apiKey: "AIzaSyCV8AsWzly2CsfFI8NMRd3yHfKYQ6syKTs",
	authDomain: "bbo-site-5557d.firebaseapp.com",
	databaseURL: "https://bbo-site-5557d.firebaseio.com",
	projectId: "bbo-site-5557d",
	storageBucket: "bbo-site-5557d.appspot.com",
	messagingSenderId: "192064348418",
	appId: "1:192064348418:web:415c095310f35509"
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
var db = firebase.firestore()

// db.collection("gecmis-kazananlar-2018")
// 	.get()
// 	.then(winners => {
// 		// console.log(winners)
// 		winners.forEach(i => {
// 			let kisi = i.data()
// 			// console.log(kisi)
// 			addNewWinner("winners-2018", kisi.resim, kisi.isim, kisi.title)
// 		})
// 	})

// db.collection("gecmis-kazananlar-2019")
// 	.get()
// 	.then(winners => {
// 		// console.log(winners)
// 		winners.forEach(i => {
// 			let kisi = i.data()
// 			// console.log(kisi)
// 			addNewWinner("winners-2019", kisi.resim, kisi.isim, kisi.title)
// 		})
// 	})

// db.collection("resim-gallery")
// 	.get()
// 	.then(images => {
// 		// console.log(images)
// 		images.forEach(image => {
// 			let i = image.data()
// 			// console.log(i)
// 			addImage(i.img, i.alternatiftext)
// 		})
// 	})

let getAllStories = (what,page,per_page, fun) => {
	return axios
		.get(
			"https://api.storyblok.com/v1/cdn/stories/?starts_with=" +
				what +
				"&page="+page+"&per_page="+per_page+"&version=published&token=IuBaod0CiCcOoizujEO53wtt"
		)
		.then(prom => {
			console.log(prom)
			return prom.data
		})
		.then(res => {
			return res.stories.map(i => i.content)
		})
}

let getStory = what => {
	return axios
		.get(
			"https://api.storyblok.com/v1/cdn/stories/" +
				what +
				"?version=published&token=IuBaod0CiCcOoizujEO53wtt"
			// https://api.storyblok.com/v1/cdn/stories/metinler/bbo-nedir?version=published&token=r9KQDQUXUj3hJfKqHgrFTgtt
		)
		.then(prom => {
			// console.log(prom)
			return prom.data.story.content
		})
}

getStory("metinler/bbo-nedir").then(i => {
	document.getElementById("bbo-nedir-metin").innerText = i.nedir

	document.getElementById("bbo-nedir-nenedir").innerText = i.nenedir
})

// axios
// 	.get(
// 		"https://api.storyblok.com/v1/cdn/stories/?starts_with=kazananlar&version=published&token=IuBaod0CiCcOoizujEO53wtt"
// 	)
//     .then(prom => {
//         // console.log(prom)
//        return prom.data}).then(
//       res=>{

//           res.stories.forEach((item)=>{
//               console.log(item.content)
//               let person=item.content
//               addNewWinner("winners-"+person.yil, person.resim, person.isim, person.kategori)
//           })
//       }
//     )

getAllStories("kazananlar",1,100).then(kisiler => {
	// console.log(kisiler)
	kisiler.forEach(person => {
		// console.log(person)
		addNewWinner(
			"winners-" + person.yil,
			person.resim,
			person.isim,
			person.kategori
		)
	})
})

getAllStories("kazananlar",2,100).then(kisiler => {
	// console.log(kisiler)
	kisiler.forEach(person => {
		// console.log(person)
		addNewWinner(
			"winners-" + person.yil,
			person.resim,
			person.isim,
			person.kategori
		)
	})
})


getAllStories("gallery",1,100).then(resimler =>
	resimler.forEach(resim => {
		addImage(resim.resim, resim.alternatiftext)
	})
)


// addImage(
// 	"https://bogazicibilisimodulleri.com/assets/images/gallery/5.JPG",
// 	"dff"
// )

let addTweet = link => {
	let item = document.createElement("div")
	item.className = "col-sm-12 col-md-6 embed-tweet-item"

	let bq = document.createElement("blockquote")
	bq.className = "twitter-tweet"
	bq.lang = "tr"
	bq.setAttribute("data-width", "550")
	bq.setAttribute("data-link-color", "#4eae49")
	bq.setAttribute("data-align", "center")

	let att = document.createElement("a")
	att.href = link

	bq.appendChild(att)
	item.appendChild(bq)
	document.getElementById("tweets").appendChild(item)
}

getAllStories("tweets",1,100).then(linkler =>
	linkler.forEach(link => {
		addTweet(link.link)
		// console.log(link)
	})
)
