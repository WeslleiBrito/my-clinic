
const listTypeExam = [
    {
        name: "Demissional",
        id: "bf0eb9d9-5b61-489a-8ef8-d4b3f29a8b25",
        createdAt: "2023-12-13T14:02:55.764Z",
        updatedAt: "2023-12-13T14:02:55.764Z"
    },
    {
        name: "Admissional",
        id: "b5fdefef-5f6a-465e-a447-75ebee47a096",
        createdAt: "2023-12-13T14:15:37.281Z",
        updatedAt: "2023-12-13T14:15:37.281Z"
    },
    {
        name: "Periódico",
        id: "6443d646-c9bd-4448-aafb-370c66d03589",
        createdAt: "2023-12-20T12:28:16.921Z",
        updatedAt: "2023-12-20T12:28:16.921Z"
    },
    {
        name: "Retorno ao Trabalho",
        id: "d22eb83f-05ac-45dc-aa94-276b54a44f51",
        createdAt: "2023-12-20T12:28:16.921Z",
        updatedAt: "2023-12-20T12:28:16.921Z"
    },
    {
        name: "Mudança de Função",
        id: "a7590025-03cb-4b90-ba91-f6d13521eb09",
        createdAt: "2023-12-20T12:28:16.921Z",
        updatedAt: "2023-12-20T12:28:16.921Z"
    }
]

const renderListTypeExam = () => {
    
    const listTypeExamAso = document.getElementById("listTypeExam")

    listTypeExam.forEach((type) => {
        const li = document.createElement('li')
        const option = document.createElement('input')
        option.setAttribute("type", "radio")

        li.append(option)

        li.append(type.name)

        li.setAttribute("id", type.id)

        if(listTypeExamAso){
            listTypeExamAso.appendChild(li)
        }

    })
}

renderListTypeExam()