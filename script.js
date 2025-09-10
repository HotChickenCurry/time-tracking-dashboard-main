let dashboard = document.getElementById('dashboard');
let activities = [];

fetch("data.json")
    .then(Response => Response.json())
    .then(data => {
        activities = data;
        rederCards('weekly');
        document.querySelectorAll('#controls button').forEach(btn =>{
            btn.addEventListener('click',()=>{                
                const period = btn.dataset.period;
                rederCards(period);
            });
        });
    });

const buttons = document.querySelectorAll('#controls button');
buttons.forEach(btn=>{
    btn.addEventListener('click',()=>{
        // reset all buttons to light
        buttons.forEach(b => b.classList.remove("font-normal", "text-navy-200"));
        buttons.forEach(b => b.classList.add("font-light"));
        // set clicked one to normal
        btn.classList.remove("font-light");
        btn.classList.add("font-normal", "text-navy-200");
    })
})

function rederCards(period){
    dashboard.querySelectorAll(".card:not(#profile)").forEach(el => el.remove());
    activities.forEach(activity=>{
        const title = activity.title;
        const icon = title.toLowerCase().replace(/\s+/g, "-");
        const value = activity.timeframes[period];

        const cardEl = document.createElement('section');
        cardEl.classList.add('card');

        cardEl.innerHTML = `
            <div class="bg-${icon}">
                <img src="./images/icon-${icon}.svg" alt="icon-${icon}">
            </div>
            <div class="card-content cursor-pointer">
                <div class="flex justify-between items-center col-span-2 sm:col-span-1">
                    <p class="title">${title}</p>
                    <img src="./images/icon-ellipsis.svg" alt="settings">
                </div>
                <p class="current">${value.current}hrs</p>
                <p class="text-right sm:text-left">Last Week - <span class="previous">${value.previous}hrs</span></p>
            </div>
        `;

        dashboard.appendChild(cardEl);
    });

}