class Movie {
    constructor() {
        this.id = ""
        this.img = ""
        this.rating = 0
        this.title = ""
        this.ratingCount = 0
        this.topRank = 0
        this.year = 0
        this.genres = []
        this.casts = []
        this.reviews = []
        this.synopses = {}
    }

    setData(obj) {
        this.id = obj.id
        this.img = obj.img
        this.rating = obj.rating
        this.title = obj.title
        this.ratingCount = obj.ratingCount
        this.topRank = obj.topRank
        this.year = obj.year
        this.genres = obj.genres
        this.casts = obj.casts
        this.reviews = obj.reviews
        this.synopses = obj.synopses
    }

    getInterfaceOnHome() {
        return `
        <div class="carousel-item">
            <img src="${this.img}" class="d-block w-100 detailMovie" data-id="${this.id}" alt="${this.id}"/>
            <div class="carousel-caption d-none d-md-block">
            </div>
        </div>
        `
    }

    getFirst() {
        return `
        <div class="carousel-item active">
            <img src="${this.img}" class="d-block w-100 detailMovie" data-id="${this.id}" alt="${this.id}"/>
            <div class="carousel-caption d-none d-md-block">
            </div>
        </div>
        `
    }

    getGenresString() {
        data = '';
        this.genres.forEach(element => {
            data += element + ", ";
        });
        return data;
    }

    getCard() {
        return `
        <div class="col-3 detailMovie" data-id="${this.id}">
            <div class="card mb-3" style="width: 95%; height: 96%;">
                <img src="${this.img}" class="card-img-top" alt="${this.id}">
                <div class="card-body">
                    <h3>${this.title} - ${this.year}</h3>
                    <h5>${this.getGenresString()}</h5>
                </div>
            </div>
        </div>
        `
    }
}


class Cast {
    constructor() {
        this.id = "";
        this.image = "";
        this.legacyNameText = "";
        this.name = "";
    }

    setData(obj) {
        this.id = obj.id;
        this.image = obj.image;
        this.legacyNameText = obj.legacyNameText;
        this.name = obj.name;
    }

    getCard() {
        return `
        <div class="col-3" data-id="${this.id}">
            <div class="card mb-3" style="width: 95%; height: 96%;">
                <img src="${this.image}" class="card-img-top" alt="${this.id}">
                <div class="card-body">
                    <h3>${this.name}</h3>
                    <h5>${this.legacyNameText}</h5>
                </div>
            </div>
        </div>
        `
    }
}
const firstBtn = `<button
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide-to="0"
        class="active"
        aria-current="true"
        aria-label="Slide 1"
        ></button>`;

function getBtn(index) {
    return `
    <button
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide-to="${index}"
        aria-label="Slide ${index + 1}"
    ></button>
    `
}

function largest5(arr, largArr) {

    for (let i = 0; i < 5; i++) {
        temp = 0;
        count = 0;
        arr.forEach(element => {
            if (element.rating > largArr[i].rating) {
                largArr[i].setData(element);
                count = temp;
            }
            temp++;
        });

        arr.splice(count, 1);
    }
}

function getTopMovieRating(data, btn) {
    return `
    
        <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="false">
            <div class="carousel-indicators">
                ${btn}
            </div>
            <div class="carousel-inner" style="display: relative;">  
                ${data}
            </div>
            <button
                class="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide="prev"
            >
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button
                class="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide="next"
            >
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
    
    `
}

function fullCard(fullObj) {
    data = '';
    let countPage = parseInt(fullObj.length / 8);
    for (let i = 0; i < countPage; i++) {
        data += `<div class="row noneDisplay" id="page${i}">`;
        for (let j = 0; j < 8; j++) {
            data += fullObj[i * 8 + j].getCard()
        }
        data += '</div>';
    }
    return data;
}

function fullBtnPagination(index) {
    data = '';
    let countPage = parseInt(index / 8);
    data += `<li class="page-item" value="0" id="prev"><button class="page-link" ><<</button></li>`;
    for (let i = 0; i < countPage; i++) {
        data += `<li class="page-item PBtn" value="${i}"><button class="page-link" >${i + 1}</button></li>`;
    }
    data += `<li class="page-item" value="${countPage - 1}" id="next"><button class="page-link">>></button></li>`;
    return data;
}

function getDetailMovie(obj) {
    let temp = '';
    if (obj.synopses != undefined) {
        temp = obj.synopses.text;
    }

    return `
    <div class="card mb-3 mt-5" id="loginInterface" style="min-width: 540px">
        <div class="row g-0">
        <div class="col-md-4">
            <img src="${obj.img}" class="img-fluid rounded-start" alt="${obj.id}" />
        </div>
        <div class="col-md-8">
            <div class="card-body">
                <h1>${obj.title}</h1>

                <h3>Rating: ${obj.rating}, Rating count: ${obj.ratingCount}</h3>
                <h3>Top rank: ${obj.topRank}</h3>
                <h3>Year: ${obj.year}</h3>
                <h3>Synopses: </h3>
                <textarea style="width: 100%; height: 38rem;">${temp}</textarea>
            </div>
        </div>
        </div>
    </div>
  
    `
}

let data = '';
let fullObj = [];

$(document).ready(function () {
    $.getJSON('/db/movies.json', function (jd) {
        jd.forEach(element => {
            temp = new Movie();
            temp.setData(element);
            fullObj.push(temp);
        });
        var topRating = new Array();
        topRating[0] = new Movie();
        topRating[1] = new Movie();
        topRating[2] = new Movie();
        topRating[3] = new Movie();
        topRating[4] = new Movie();
        largest5(jd, topRating);

        let btn = firstBtn;

        for (let i = 0; i < topRating.length; i++) {
            if (i == 0) {
                data += topRating[i].getFirst();
            }
            else {
                btn += getBtn(i);
                data += topRating[i].getInterfaceOnHome();
            }
        }

        document.getElementById("dataHere").innerHTML = getTopMovieRating(data, btn);
        document.getElementById("cards").innerHTML = fullCard(fullObj);
        document.getElementById("pagination").innerHTML = fullBtnPagination(fullObj.length);
        $('#page0').removeClass('noneDisplay');

        Ivo_pre = document.getElementById("prev");
        Ivo_next = document.getElementById("next");

        function updateTable(preTableID, curTableID, value) {
            $(preTableID).addClass("noneDisplay");
            $(curTableID).removeClass("noneDisplay");
            Ivo_pre.value = value;
        }

        $('.PBtn').click(function (e) {
            e.preventDefault();
            let preTableID = `#page${Ivo_pre.value}`;
            let curTableID = `#page${this.value}`;
            updateTable(preTableID, curTableID, this.value);
        });

        $('#prev').click(function (e) {
            e.preventDefault();
            let preTableID = `#page${Ivo_pre.value}`;
            if (Ivo_pre.value == 0) {
                let curTableID = `#page${Ivo_next.value}`;
                updateTable(preTableID, curTableID, Ivo_next.value);
            }
            else {
                let curTableID = `#page${Ivo_pre.value - 1}`;
                updateTable(preTableID, curTableID, Ivo_pre.value - 1);
            }
        });

        $('#next').click(function (e) {
            e.preventDefault();
            let preTableID = `#page${Ivo_pre.value}`;
            if (Ivo_pre.value == Ivo_next.value) {
                let curTableID = `#page0`;
                updateTable(preTableID, curTableID, 0);
            }
            else {
                let curTableID = `#page${Ivo_pre.value + 1}`;
                updateTable(preTableID, curTableID, Ivo_pre.value + 1);
            }
        });

        delete jd;
        delete btn;
    });

    let casts = [];
    $.getJSON('/db/casts.json', function (jd) {
        jd.forEach(element => {
            temp = new Cast();
            temp.setData(element);
            casts.push(temp);
        });
    });


    setTimeout(() => {
        console.log(casts);
        // functions in Movie Interface
        let homeInterface = document.getElementById("homeInterface");
        let movieInterface = document.getElementById("movieInterface");
        let favoriteInterface = document.getElementById("favoriteInterface");

        $('#HomepageBtn').click(function (e) {
            e.preventDefault();
            $('#homeInterface').removeClass('noneDisplay');
            $('#movieInterface').addClass('noneDisplay');
            $('#favoriteInterface').addClass('noneDisplay');
            $('#searchResultInterface').addClass('noneDisplay');
        });

        $('#favoritePageBtn').click(function (e) {
            e.preventDefault();
            $('#favoriteInterface').removeClass('noneDisplay');
            $('#movieInterface').addClass('noneDisplay');
            $('#homeInterface').addClass('noneDisplay');
            $('#searchResultInterface').addClass('noneDisplay');
        });

        $('.detailMovie').click(function (e) {
            e.preventDefault();
            $('#movieInterface').removeClass('noneDisplay');
            $('#favoriteInterface').addClass('noneDisplay');
            $('#homeInterface').addClass('noneDisplay');
            $('#searchResultInterface').addClass('noneDisplay');

            const movieID = this.getAttribute('data-id');
            console.log(movieID);
            let movie = new Movie();
            fullObj.forEach(element => {
                if (element.id == movieID) {
                    movie = element;
                };
            });

            movieInterface.innerHTML = getDetailMovie(movie);
        });

        $('#Search').click(function (e) {
            e.preventDefault();
            $('#searchResultInterface').removeClass('noneDisplay');

            $('#movieInterface').addClass('noneDisplay');
            $('#favoriteInterface').addClass('noneDisplay');
            $('#homeInterface').addClass('noneDisplay');

            let type = document.getElementById("typeSearch").value;
            let text = document.getElementById("textSearch").value;

            let htmlT = '<div class="row">';
            if (type == "1") {
                fullObj.forEach(element => {
                    if (element.title.indexOf(text) != -1) {
                        htmlT += element.getCard();
                    };
                });
            }
            else if (type == "2") {
                casts.forEach(element => {
                    if (element.name != undefined)
                        if (element.name.indexOf(text) != -1) {
                            htmlT += element.getCard();
                        };
                });
            }
            htmlT += "</div>";

            document.getElementById("searchResultInterface").innerHTML = htmlT;

        });
    }, 1000);
});
