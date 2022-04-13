async function main(){
    let list = await getBookList()
    let root = document.getElementById('root')

    list.forEach(element => {
        let line = document.createElement('p') 
        line.textContent = element.title
        root.appendChild(line)

        let form = document.createElement('form')
        let input = document.createElement('input')
        let button = document.createElement('input')

        input.defaultValue = element.quantity
        form.appendChild(input)

        button.type = "submit"
        button.value = "Save"
        button.setAttribute('id', element.id)
        button.addEventListener('click', () => {
            
    fetch('http://localhost:3001/updateBook', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                }, body: JSON.stringify({ id: element.id, quantity: input.value,
                }),
            });
        })
        form.appendChild(button)
        root.appendChild(form)
    });
}

async function getBookList(){
    let response = await fetch('http://localhost:3001/listBooks')
    let bookList = await response.json()
    return bookList
}

main()
