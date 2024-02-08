
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
].sort((a, b) => a.name.localeCompare(b.name))

const listExams = [
    {
        "id": "c7ee7473-1b30-400f-9545-af0593bc51d7",
        "name": "Parasitológico de fezes",
        "price": 0,
        "createdAt": "2023-11-20T11:47:55.389Z",
        "updatedAt": "2023-11-20T11:47:55.389Z"
    },
    {
        "id": "c3596213-dc47-4174-b39c-b09709a8f854",
        "name": "Micológico de unha",
        "price": 0,
        "createdAt": "2023-11-20T11:47:55.389Z",
        "updatedAt": "2023-11-20T14:30:11.740Z"
    },
    {
        "id": "b6d5b062-eac7-4045-a72d-ceaa2346e016",
        "name": "Glicose",
        "price": 0,
        "createdAt": "2023-11-20T11:47:55.389Z",
        "updatedAt": "2023-11-20T11:47:55.389Z"
    },
    {
        "id": "9104401f-c286-410c-8033-32b1ee1c412d",
        "name": "Coprocutura",
        "price": 0,
        "createdAt": "2024-02-06T13:49:06.422Z",
        "updatedAt": "2024-02-06T13:49:06.422Z"
    },
    {
        "id": "69e66b1f-16d8-41d5-abc6-2fe603fd8719",
        "name": "Cultura de orofaringe",
        "price": 0,
        "createdAt": "2024-02-06T13:49:06.422Z",
        "updatedAt": "2024-02-06T13:49:06.422Z"
    },
    {
        "id": "a8f9a8c0-68f5-46cc-b25a-31a296710700",
        "name": "Hemograma completo",
        "price": 0,
        "createdAt": "2024-02-06T13:49:06.422Z",
        "updatedAt": "2024-02-06T13:49:06.422Z"
    },
    {
        "id": "12d7f304-8668-4cad-b882-cbb21eb96d3f",
        "name": "Sumário de urina",
        "price": 0,
        "createdAt": "2024-02-06T13:49:06.422Z",
        "updatedAt": "2024-02-06T13:49:06.422Z"
    },
    {
        "id": "efa672e7-3a88-40d1-9e22-119bc631f40e",
        "name": "Audiometria",
        "price": 0,
        "createdAt": "2024-02-06T13:49:06.422Z",
        "updatedAt": "2024-02-06T13:49:06.422Z"
    },
    {
        "id": "bf71f978-d360-42ca-b2f2-a29f6329cc2a",
        "name": "Espirometria",
        "price": 0,
        "createdAt": "2024-02-06T13:49:06.422Z",
        "updatedAt": "2024-02-06T13:49:06.422Z"
    },
    {
        "id": "43b20416-031a-4897-8f0b-16324f2a3942",
        "name": "Acuidade visual",
        "price": 0,
        "createdAt": "2024-02-06T13:49:06.422Z",
        "updatedAt": "2024-02-06T13:49:06.422Z"
    },
    {
        "id": "8b7c6659-e452-4dfb-9a2d-54174d00bf00",
        "name": "ECG",
        "price": 0,
        "createdAt": "2024-02-06T13:49:06.422Z",
        "updatedAt": "2024-02-06T13:49:06.422Z"
    },
    {
        "id": "b4fccc83-fcc4-44b6-814a-fb6b3fbbb2c0",
        "name": "Rx de tórax OIT",
        "price": 0,
        "createdAt": "2024-02-06T13:49:06.422Z",
        "updatedAt": "2024-02-06T13:49:06.422Z"
    },
    {
        "id": "f7612f06-5dd5-443f-9dc6-16ebbc9109be",
        "name": "Avaliação psicológica",
        "price": 0,
        "createdAt": "2024-02-06T13:49:06.422Z",
        "updatedAt": "2024-02-06T13:49:06.422Z"
    },
    {
        "id": "005ebb8f-fc6e-4f19-b607-11126fad029b",
        "name": "EEG",
        "price": 0,
        "createdAt": "2024-02-06T13:49:06.422Z",
        "updatedAt": "2024-02-06T13:49:06.422Z"
    },
    {
        "id": "ea2904b7-ddbe-4fd9-a8f1-8d9fee5bad4c",
        "name": "Rx de coluna cervical",
        "price": 0,
        "createdAt": "2024-02-06T13:49:06.422Z",
        "updatedAt": "2024-02-06T13:49:06.422Z"
    }
]
const form = {
    "id": "2ca8cd5d-6ef6-4d87-a2a7-aa6113f5240d",
    "namePatient": "Isis Letícia Simone Araújo",
    "nameCompany": "Renato e Isabelly Lavanderia Ltda",
    "idPatient": "632bcc19-019d-4e69-bd71-060f905891f7",
    "idCompany": "c14ef11e-1164-4c0a-b616-b3c8369b936f",
    "rg": "402572439",
    "cpf": "12541486049",
    "cnpj": "43878113000105",
    "functionPatient": "Especialista em alguma coisa",
    "status": true,
    "amount": 0,
    "createdAt": "2024-01-04T18:39:06.323Z",
    "updatedAt": "2024-02-06T19:48:54.823Z",
    "numberProcedures": 7,
    "typeExamAso": {
        "id": "bf0eb9d9-5b61-489a-8ef8-d4b3f29a8b25",
        "name": "Demissional"
    },
    "exams": [
        {
            "id": "c3596213-dc47-4174-b39c-b09709a8f854",
            "name": "Micológico de unha",
            "price": 0,
            "date": "2024-01-04T00:00:00.000Z",
            "updatedAt": "2024-01-04T00:00:00.000Z"
        },
        {
            "id": "8b7c6659-e452-4dfb-9a2d-54174d00bf00",
            "name": "ECG",
            "price": 0,
            "date": "2024-02-06T18:46:55.000Z",
            "updatedAt": "2024-02-06T18:47:13.963Z"
        },
        {
            "id": "005ebb8f-fc6e-4f19-b607-11126fad029b",
            "name": "EEG",
            "price": 0,
            "date": "2024-02-06T18:46:56.000Z",
            "updatedAt": "2024-02-06T18:47:13.964Z"
        },
        {
            "id": "43b20416-031a-4897-8f0b-16324f2a3942",
            "name": "Acuidade visual",
            "price": 0,
            "date": "2023-11-28T18:46:57.000Z",
            "updatedAt": "2024-02-06T18:47:13.964Z"
        },
        {
            "id": "8b7c6659-e452-4dfb-9a2d-54174d00bf00",
            "name": "ECG",
            "price": 0,
            "date": "2024-02-06T18:46:55.000Z",
            "updatedAt": "2024-02-06T19:48:54.815Z"
        },
        {
            "id": "005ebb8f-fc6e-4f19-b607-11126fad029b",
            "name": "EEG",
            "price": 0,
            "date": "2024-02-06T18:46:56.000Z",
            "updatedAt": "2024-02-06T19:48:54.816Z"
        },
        {
            "id": "43b20416-031a-4897-8f0b-16324f2a3942",
            "name": "Acuidade visual",
            "price": 0,
            "date": "2023-11-28T18:46:57.000Z",
            "updatedAt": "2024-02-06T19:48:54.816Z"
        }
    ],
    "OccupationalHazards": [
        {
            "id": "81ae8490-9ac9-4e9d-8e04-6a316ef8934c",
            "name": "Hergonômico Postural"
        },
        {
            "id": "b8c09de3-282a-4f41-93a5-214d455b9e59",
            "name": "Físico"
        },
        {
            "id": "20671ca6-4a6c-4afb-a9fd-7ee90e2a57cc",
            "name": "Ruído"
        }
    ],
    "comments": "Sem observações."
}

const renderListTypeExam = () => {
    
    const listTypeExamAso = document.getElementById("listTypeExam")

    listTypeExam.forEach((type) => {
        const li = document.createElement('li')
        const option = document.createElement('input')
        option.setAttribute("type", "radio")

        if(type.name === "Demissional"){
            option.setAttribute("checked", "true")
        }

        li.append(option)

        li.append(type.name)

        li.setAttribute("id", type.id)

        if(listTypeExamAso){
            listTypeExamAso.appendChild(li)
        }

    })
}

const renderCertificate = () => {
    const elementCertificate = document.getElementById("certificate")
 
    if(elementCertificate){

        const message = `ATESTO QUE O(A) ${form.namePatient}, RG ${form.rg} submeteu-se a avliação de saúde, conforme regulamenta a Portaria
        Ministerial Nº 27 e 29 dezembro de 1994, NR-7, PCMSO.`

        elementCertificate.append(message)
    }
}

const renderCompany = () => {

    const nameCompany = document.getElementById("nameCompany")
    const cnpj = document.getElementById("cnpj")

    if(nameCompany && cnpj){
        nameCompany.append(form.nameCompany)
        cnpj.append(form.cnpj)
    }

}

const renderRisc = () => {

    const risckElement = document.getElementById("scratchs")

    form.OccupationalHazards.forEach((risk) => {
        const li = document.createElement('li')

        li.append(risk.name)
        li.setAttribute("id", risk.id)

        if(risckElement){
            risckElement.appendChild(li)
        }
    })
}

const renderExams = () => {

    const table = document.getElementById("tableExams")
    const bodyTable = document.getElementById("bodyExams")

    listExams.forEach((examsAll, index) => {
        const accomplished = form.exams.find((exam) => exam.id === examsAll.id)
        const values = {
            id: examsAll.id,
            name: examsAll.name,
            date: accomplished ? accomplished.date : "*******"
        }
    })

}
renderListTypeExam()
renderCertificate()
renderCompany()
renderRisc()