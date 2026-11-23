const books=[
{
title:"Абай жолы",
author:"Мұхтар Әуезов",
genre:"Роман • Қазақ әдебиеті",
info:"Роман-эпопея • 1942 жыл • 4 том • Қазақ тілі",
desc:"«Абай жолы» — қазақ әдебиетінің әйгілі тарихи-өмірбаяндық роман-эпопеясы. Шығарманың бас кейіпкері — қазақтың ұлы ақыны, ойшылы әрі ағартушысы Абай Құнанбайұлы.",
img:"https://jezbiblioteka.kz/wp-content/uploads/2024/03/screenshot-2024-03-22-000134.jpg",
url:"https://predmet.kz/adebiet/%D0%BA%D1%96%D1%82%D0%B0%D0%BF%D1%82%D0%B0%D1%80/%D0%90%D0%B1%D0%B0%D0%B9%20%D0%B6%D0%BE%D0%BB%D1%8B.1%20%D0%BA%D1%96%D1%82%D0%B0%D0%BF.pdf"
},
{
title:"Кішкентай ханзада",
author:"Антуан де Сент-Экзюпери",
genre:"Философиялық ертегі • Әлем әдебиеті",
info:"1943 жыл • Достық • Махаббат • Жауапкершілік",
desc:"«Кішкентай ханзада» — француз жазушысы Антуан де Сент-Экзюперидің әлемге әйгілі аллегориялық повесть-ертегісі.",
img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlg_W5QoMEQFNik6qrzo1gufkMGr7DKA1i6qJWUiaA_g&s=10",
url:"https://www.booksite.ru/archiv_new/02_2016/02.pdf"
},
{
title:"Harry Potter",
author:"J. K. Rowling",
genre:"Фэнтези • Шетел әдебиеті",
info:"1997 жыл • Philosopher's Stone • Ағылшын тілі",
desc:"Гарри Поттердің сиқыр әлеміне келуі және Хогвартстағы алғашқы оқиғалары. Гарри өзінің сиқыршы екенін біліп, Хогвартс мектебіне оқуға түседі.",
img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFPB0IIHUtZ6X_prEdQ3TKJP2VY2tct23KHAUsB86BuA&s=10",
url:"http://lib.tiet.uz/file/20220823050215.pdf",
audio:"harry-potter.mp3"
},
{
title:"1984",
author:"George Orwell",
genre:"Антиутопия • Әлем әдебиеті",
info:"1949 жыл • Қоғам • Еркіндік • Ағылшын тілі",
desc:"Бақылау, еркіндік және қоғам мәселелерін көтеретін классикалық роман. Шығармада тоталитарлық жүйе мен адамның еркіндігін бақылауда ұстайтын мемлекет бейнеленген.",
img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5ukGhQfNNae9gzuA52byuzNgZxsnehtLOOGXznlaq_Q&s=10",
url:"https://boomdown.org/sites/default/files/1984_1948.pdf"
},
{
title:"Атомдық әдеттер",
author:"James Clear",
genre:"Өзін-өзі дамыту • Пайдалы әдебиет",
info:"2018 жыл • Әдеттер • Даму • Ағылшын тілі",
desc:"Пайдалы әдеттерді қалыптастыру және күнделікті өмірдегі шағын өзгерістер туралы кітап. Кітаптың негізгі идеясы — күнделікті шағын жақсартулар уақыт өте келе үлкен нәтижеге әкеледі.",
img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS96Y1lyafVGDpARORdxmvnlnAUyTJDoM2jcujyL7nYlA&s=10",
url:"https://dn790007.ca.archive.org/0/items/atomic-habits-pdfdrive/Atomic%20habits%20%28%20PDFDrive%20%29.pdf"
}
];

let user=JSON.parse(localStorage.getItem("kitapUser")||"null");

function register(){
    let name=document.getElementById("regName").value.trim();
    let email=document.getElementById("regEmail").value.trim();
    let pass=document.getElementById("regPass").value;

    if(!name||!email||!pass){
        message.innerText="Барлық жолды толтырыңыз!";
        return;
    }

    user={name:name,email:email,pass:pass,books:{}};
    localStorage.setItem("kitapUser",JSON.stringify(user));
    openSite();
}

function login(){
    let u=JSON.parse(localStorage.getItem("kitapUser")||"null");

    if(!u){
        message.innerText="Алдымен тіркеліңіз!";
        return;
    }

    if(
        document.getElementById("loginEmail").value.trim()===u.email &&
        document.getElementById("loginPass").value===u.pass
    ){
        user=u;
        openSite();
    }else{
        message.innerText="Электрондық пошта немесе құпиясөз қате!";
    }
}

function openSite(){
    auth.style.display="none";
    site.style.display="block";
    userName.innerText="👤 "+user.name;

    document.getElementById("books").innerHTML="";
    renderBooks();
    showSaved();
}

function logout(){
    site.style.display="none";
    auth.style.display="flex";
    showLogin();
}

function showLogin(){
    registerForm.style.display="none";
    loginForm.style.display="block";
    authTitle.innerText="📚 Кіру";
    message.innerText="";
}

function showRegister(){
    registerForm.style.display="block";
    loginForm.style.display="none";
    authTitle.innerText="📚 Тіркелу";
    message.innerText="";
}

function renderBooks(){
    books.forEach((b,i)=>{
        let saved=user.books[i];

        document.getElementById("books").innerHTML+=`
        <article class="book" data-id="${i}">
            <div class="book-top">
                ${b.genre}
                <span class="rating">★★★★★</span>
            </div>

            <div class="book-content">
                <img src="${b.img}" alt="${b.title}">

                <div class="book-info">
                    <h2>${b.title}</h2>
                    <div class="author">${b.author}</div>
                    <div class="info">${b.info}</div>
                    <p class="desc">${b.desc}</p>

                    ${b.audio?`
                    <button class="audio-toggle" onclick="toggleAudio(${i})">
                        🎧 Аудиокітап
                    </button>

                    <div class="audio" id="audio${i}" style="display:none">
                        <b>🎧 Аудиокітапты тыңдау</b>
                        <audio controls>
                            <source src="${b.audio}" type="audio/mpeg">
                            Браузер аудионы қолдамайды.
                        </audio>
                    </div>
                    `:''}

                    <div class="book-btns">
                        <a class="read"
                           href="${b.url}"
                           target="_blank"
                           onclick="startReading(${i})">
                           📖 Оқу
                        </a>

                        <button
                            class="mark ${saved?'active':''}"
                            onclick="bookmark(${i},this)">
                            ${saved?'✓ Бетбелгіде':'🔖 Бетбелгі'}
                        </button>
                    </div>
                </div>
            </div>

            <div class="book-bottom">
                <span>Кітап туралы ақпарат</span>
                <span>★★★★★</span>
            </div>
        </article>`;
    });
}

/* Аудиоплеерді көрсету және жасыру */
function toggleAudio(i){
    let player=document.getElementById("audio"+i);
    let audio=player.querySelector("audio");

    if(player.style.display==="none"){
        player.style.display="block";
    }else{
        audio.pause();
        audio.currentTime=0;
        player.style.display="none";
    }
}

function startReading(i){
    if(!user.books[i]){
        user.books[i]={
            status:"Оқу барысындамын",
            page:1
        };

        localStorage.setItem("kitapUser",JSON.stringify(user));
        showSaved();
    }else if(typeof user.books[i]==="string"){
        user.books[i]={
            status:user.books[i],
            page:1
        };

        localStorage.setItem("kitapUser",JSON.stringify(user));
    }
}

function bookmark(i,button){
    if(user.books[i]){
        delete user.books[i];
        button.classList.remove("active");
        button.innerText="🔖 Бетбелгі";
    }else{
        user.books[i]={
            status:"Оқимын",
            page:1
        };

        button.classList.add("active");
        button.innerText="✓ Бетбелгіде";
    }

    localStorage.setItem("kitapUser",JSON.stringify(user));
    showSaved();
}

function showSaved(){
    if(!Object.keys(user.books).length){
        savedList.innerHTML="Әзірге бетбелгіге кітап қосылған жоқ.";
        return;
    }

    savedList.innerHTML="";

    Object.keys(user.books).forEach(i=>{
        let data=user.books[i];

        if(typeof data==="string"){
            data={
                status:data,
                page:1
            };
        }

        savedList.innerHTML+=`
        <div class="bookmark-item">
            <div>
                <b>📖 ${books[i].title}</b>
                <div class="page-info">
                    Соңғы тоқтаған бет:
                    <b>${data.page}</b>
                </div>
            </div>

            <div class="progress">
                <input
                    type="number"
                    min="1"
                    value="${data.page}"
                    id="page${i}">

                <button onclick="savePage(${i})">Сақтау</button>

                <select onchange="changeStatus(${i},this.value)">
                    <option ${data.status=="Болашақта оқимын"?"selected":""}>
                        Болашақта оқимын
                    </option>
                    <option ${data.status=="Оқу барысындамын"?"selected":""}>
                        Оқу барысындамын
                    </option>
                    <option ${data.status=="Оқып бітірдім"?"selected":""}>
                        Оқып бітірдім
                    </option>
                </select>
            </div>

            ${data.status==="Оқып бітірдім"?`
            <div class="review">
                <b>⭐ Кітапқа баға және пікір</b>
                <label for="rating${i}">Баға (1–5)</label>

                <select id="rating${i}">
                    <option value="">Бағаны таңдаңыз</option>
                    <option value="1" ${data.rating==1?"selected":""}>⭐ 1</option>
                    <option value="2" ${data.rating==2?"selected":""}>⭐⭐ 2</option>
                    <option value="3" ${data.rating==3?"selected":""}>⭐⭐⭐ 3</option>
                    <option value="4" ${data.rating==4?"selected":""}>⭐⭐⭐⭐ 4</option>
                    <option value="5" ${data.rating==5?"selected":""}>⭐⭐⭐⭐⭐ 5</option>
                </select>

                <label for="comment${i}">Пікіріңіз</label>
                <textarea id="comment${i}" placeholder="Кітап туралы пікір жазыңыз...">${data.comment||""}</textarea>

                <button onclick="saveReview(${i})">Пікірді сақтау</button>
                ${data.comment||data.rating?`<div class="review-note">Баға мен пікір сақталған.</div>`:""}
            </div>
            `:''}
        </div>`;
    });
}

function savePage(i){
    let input=document.getElementById("page"+i);
    let page=parseInt(input.value);

    if(!page||page<1){
        alert("Бет нөмірін дұрыс енгізіңіз!");
        return;
    }

    if(typeof user.books[i]==="string"){
        user.books[i]={
            status:user.books[i],
            page:page
        };
    }else{
        user.books[i].page=page;
    }

    localStorage.setItem("kitapUser",JSON.stringify(user));
    showSaved();
}

function changeStatus(i,status){
    if(typeof user.books[i]==="string"){
        user.books[i]={
            status:status,
            page:1
        };
    }else{
        user.books[i].status=status;
    }

    localStorage.setItem("kitapUser",JSON.stringify(user));
    showSaved();
}

function saveReview(i){
    let rating=document.getElementById("rating"+i).value;
    let comment=document.getElementById("comment"+i).value.trim();

    if(!rating){
        alert("Кітапқа 1-ден 5-ке дейін баға таңдаңыз!");
        return;
    }

    if(typeof user.books[i]==="string"){
        user.books[i]={status:user.books[i],page:1};
    }

    user.books[i].rating=Number(rating);
    user.books[i].comment=comment;

    localStorage.setItem("kitapUser",JSON.stringify(user));
    showSaved();
}

function searchBooks(){
    let text=document.getElementById("search").value.toLowerCase().trim();

    document.querySelectorAll(".book").forEach(book=>{
        book.style.display=book.innerText.toLowerCase().includes(text)
            ?"block"
            :"none";
    });
}

if(user)showLogin();
else showRegister();
