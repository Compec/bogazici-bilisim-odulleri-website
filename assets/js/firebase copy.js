

const addImage=(resim,isim)=>{

    let item=document.createElement("div")
    item.className="col-xs-12 col-sm-6 col-md-4 col-lg-3"
    
    let img=document.createElement("img")
    img.src=resim
    img.alt=isim
    img.className="img-responsive wow fadeIn"
    img.setAttribute("data-wow-delay","0.4s");
    
    // img.style="height:150px"
    
    let att=document.createElement("a")
    att.href=resim
    
    item.appendChild(att)
    att.appendChild(img)
    document.getElementById("gallery-fire").appendChild(item)
    
    console.log("tt")
    // <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3">
    //                                         <a href="assets/images/gallery/6.JPG" title="">
    //                                             <img src="assets/images/gallery/6 (Small).JPG" alt="gallery image"
    //                                                 class="img-responsive wow fadeIn" data-wow-delay="0.4s"></a>
    //                                     </div>
    
    }
    
    addImage("https://bogazicibilisimodulleri.com/assets/images/gallery/5.JPG","dff")
    
    
    const addNewWinner=(yilID,resim,isim,kat)=>{
    
    let item=document.createElement("div")
    item.className="col-sm-12 col-md-4 speaker-info wow fadeIn"
    item.setAttribute("data-wow-delay","0.2s");
    
    let img=document.createElement("img")
    img.src=resim
    img.alt=isim
    img.className="img-responsive center-block"
    img.style="height:150px"
    
    let title=document.createElement("p")
    title.innerText=kat
    let name=document.createElement("span")
    name.innerText=isim
    
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
      };
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);
      var db = firebase.firestore();
    
    db.collection("gecmis-kazananlar-2018")
        .get().then((winners)=>
        {
            // console.log(winners)
        winners.forEach((i)=>{
            let kisi=i.data()
            // console.log(kisi)
            addNewWinner("winners-2018",kisi.resim,kisi.isim,kisi.title)
        })
        }
        )
    
    
    
    
    
        db.collection("gecmis-kazananlar-2019")
        .get().then((winners)=>
        {
            // console.log(winners)
        winners.forEach((i)=>{
            let kisi=i.data()
            // console.log(kisi)
            addNewWinner("winners-2019",kisi.resim,kisi.isim,kisi.title)
        })
        }
        )
    
    
        db.collection("resim-gallery")
        .get().then((images)=>
        {
            console.log(images)
            images.forEach((image)=>{
            let i=image.data()
            console.log(i)
            addImage(i.img,i.alternatiftext);
        })
        }
        )
    