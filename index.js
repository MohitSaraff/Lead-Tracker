const inputBtn = document.getElementById('input-btn')
const inputEl = document.getElementById('input-el')
const ulEl = document.getElementById('ul-el')
const deleteBtn = document.getElementById('delete-btn')
const tabBtn = document.getElementById('tab-btn')
let myLeads = []

inputBtn.addEventListener('click', () => {
    myLeads.push(inputEl.value)
    render(myLeads)
    localStorage.setItem('myLeads', JSON.stringify(myLeads))
    inputEl.value = ''
})

inputEl.addEventListener("keydown", event => {
    if (event.key === "Enter") {
      event.preventDefault()
      inputBtn.click()
    }
})

tabBtn.addEventListener('click', () => {
    chrome.tabs.query({active: true, currentWindow: true}, tabs => {
        myLeads.push(tabs[0].url)
        localStorage.setItem('myLeads', JSON.stringify(myLeads))
        render(myLeads)
    })
})

deleteBtn.addEventListener('click', () => {
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

const leadsFromLocalStorage = JSON.parse(localStorage.getItem('myLeads'))

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

const render = leads => {
    let listItems = ''
    for(let i = 0; i < leads.length; i++) {
        // 1st Method - ulEl.innerHTML += '<li>' + myLeads[i] + '</li>';
        // 2nd Method
        // const li = document.createElement('li');
        // li.textContent = myLeads[i];
        // ulEl.append(li);
        // 3rd Method - listItems += '<li><a target="_blank" href="' + myLeads[i] + '">'+ myLeads[i] + '</a></li>';
        // 4th Method
        listItems += `
            <li>
                <a target="_blank" href="${leads[i]}">
                    ${leads[i]}
                </a>
            </li>
        `
    }
    // DOM changes are expensive, so we should do it once
    ulEl.innerHTML = listItems
}