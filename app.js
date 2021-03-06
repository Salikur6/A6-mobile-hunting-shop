// click search to load api --------------------------------

const searchLoad = () => {
    document.getElementById('phone-container').innerHTML = '';
    document.getElementById('search-result').innerHTML = '';
    document.getElementById('phone-details').innerHTML = '';

    const searchInput = document.getElementById('input').value;

    const url = `https://openapi.programming-hero.com/api/phones?search=${searchInput}`

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.data.length === 0) {
                document.getElementById('error').style.display = 'block'
                document.getElementById('loding').style.display = 'block';

            } else {
                document.getElementById('loding').style.display = 'none';
                document.getElementById('error').style.display = 'none'

                showPhone(data.data.slice(0, 20))

                const searchResultCount = document.getElementById('search-result');
                const p = document.createElement('p');
                p.innerHTML = `
                  <p>Total Search Result "${data.data.length}"</p>  
                `
                searchResultCount.appendChild(p);
                console.log(p)
            }
        })
    document.getElementById('input').value = '';
}


// show api content on ui---------------------------------------

const showPhone = (phones) => {

    console.log(phones)
    const phoneContainer = document.getElementById('phone-container')

    for (const phone of phones) {

        const div = document.createElement('div');
        div.className = "card col-lg-4 col-md-4 p-3"
        div.innerHTML = `
           
                <img src="${phone.image}" class="card-img-top w-50 mx-auto" alt="...">
                <div class="card-body">
                    <h5 class="card-title fw-bold">${phone.phone_name}</h5>
                    <p class="card-text fw-normal">${phone.brand}</p>
                </div>
                <button onclick="phoneDetail('${phone.slug}')" class="btn btn-primary">Details</button>
        `
        phoneContainer.appendChild(div);
    }
}

// click detail button to load detail about product---------------------------
const phoneDetail = (slug) => {
    const url = `https://openapi.programming-hero.com/api/phone/${slug}`

    fetch(url)
        .then(response => response.json())
        .then(data => showDetails(data.data))
}


// details on ui------------------------------------------------------
const showDetails = (details) => {
    console.log(details)
    const detailsContainer = document.getElementById('phone-details');

    detailsContainer.innerHTML = `
        <div class="w-50 mb-4 mx-auto text-center"><img class="w-50 " src="${details.image}"></div>
        <h2 class="text-center mb-3">${details.name} Full Specificatiions</h2>
        
        <table class="table table-hover table-bordered">
                <tbody>
                    <tr>
                        <th scope="row">First Release</th>
                        <td class="pb-4">${details.releaseDate}</td>
                    </tr>

                    <tr>
                        <th scope="row">Chipset</th>
                        <td class="pb-4">${details.mainFeatures.chipSet}</td>
                    </tr>

                    <tr>
                        <th scope="row">Display Size</th>
                        <td class="pb-4">${details.mainFeatures.displaySize}</td>
                    </tr>

                    <tr>
                        <th scope="row">Memory</th>
                        <td class="pb-4">${details.mainFeatures.memory}</td>
                    </tr>

                    <tr>
                        <th scope="row">Storage</th>
                        <td class="pb-4">${details.mainFeatures.storage}</td>
                    </tr>

                    <tr>
                        <th scope="row">Sensors</th>
                        <td class="pb-4">${details.mainFeatures.sensors.join( ', ' )}</td>
                    </tr>


                   
                    <tr style="background-color:#ddd;">
                        <th class="pb-4" scope="row">Others</th>
                    </tr>

                    <tr>
                        <th scope="row">Bluetooth</th>
                        <td class="pb-4">${details?.others?.Bluetooth ? details.others.Bluetooth : "not found"}</td>
                    </tr>

                    <tr>
                        <th scope="row">GPS</th>
                        <td class="pb-4">${details?.others?.GPS ? details.others.GPS : "not found"}</td>
                    </tr>

                    <tr>
                        <th scope="row">NFC</th>
                        <td class="pb-4">${details.others?.NFC ? details.others.NFC : "not found"}</td>
                    </tr>

                    <tr>
                        <th scope="row">Radio</th>
                        <td class="pb-4">${details.others?.Radio ? details.others.Radio : "not found"}</td>
                    </tr>

                    <tr>
                        <th scope="row">USB</th>
                        <td class="pb-4">${details.others?.USB ? details.others.USB : "not found"}</td>
                    </tr>

                    <tr>
                        <th scope="row">WLAN</th>
                        <td class="pb-4">${details?.others?.WLAN ? details.others.WLAN : "not found"}</td>
                    </tr>                    
                   
                </tbody>
            </table>
    `
}

// -------------------------------------------------