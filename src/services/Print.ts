import { ModelForm, PrintListExams, PrintRisk, PrintTypeExamAso } from "../types/types";
import * as puppeteer from 'puppeteer';
import * as handlebars from 'handlebars';
import * as fs from 'fs';
import path from 'path';

const forms: { patient: string, company: string, status: boolean }[] = [
    {
        patient: "Alberto Santos",
        company: "Dumont",
        status: true
    },
    {
        patient: "Wilbur Wright",
        company: "Irmãos Wright",
        status: false
    },
    {
        patient: "Orville Wright",
        company: "Irmãos Wright",
        status: false
    }
]

const list = forms.map((form) => {
    const componet = `
        <li>
            ${form.patient} | ${form.company} | ${form.status ? "Aprovado" : "Reprovado"}
        </li>
    `
    return componet
}).toString().replace(new RegExp(',', 'g'), '')

export class Print {


    public printPDF = async (dataForm: ModelForm, typeExamAso: PrintTypeExamAso[], listExamsAll: PrintListExams[]) => {

        function renderHtml(templatePath: string, data: any): Promise<string> {
            return new Promise<string>((resolve, reject) => {
                fs.readFile(templatePath, 'utf8', (err, html) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    const template = handlebars.compile(html);
                    const result = template(data);
                    resolve(result);
                });
            });
        }

        const risksOccupational = dataForm.OccupationalHazards.map((risk) => {
            return `${risk.name}`
        })

        const typeExam = typeExamAso.map((type) => {
            return `
                    <input type="radio" id=${type.id} name=${type.name} value=${type.id} ${type.selected ? "checked" : ""}/>
                    <lable for=${type.id}>${type.name}</lable>                
            `
        })

        const exams = listExamsAll.map((exam, index) => {
            return `
                    <tr id=${exam.id}>
                        <td>${index + 1}. ${exam.name}</td>
                        <td>${exam.date}</td>
                    </tr>
                `
        })

        try {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            const data = {
                typeExam,
                nameCompany: dataForm.nameCompany,
                cnpj: dataForm.cnpj,
                namePatient: dataForm.namePatient,
                rg: dataForm.rg,
                riscks: risksOccupational,
                exams,
                status: dataForm.status ? "APTO" : "INAPTO",
                functionPatient: dataForm.functionPatient.toUpperCase(),
                comments: dataForm.comments ? dataForm.comments : "",
                date: dataForm.createdAt
            }

            const pathHTML = path.join(__dirname, '../templates/form/form.html')
            const newHtml = await renderHtml(pathHTML, data)

            // Definir o conteúdo da página com o HTML renderizado

            await page.setContent(newHtml);

            // Gerar o PDF
            await page.pdf({ path: 'output.pdf', format: 'A4' });

            await browser.close();
        } catch (error) {
            console.log(error)
        }

        /* async function generatePDF() {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();

            // Seu HTML com estilos inline ou referências a arquivos CSS
            const htmlContent = `
                <html>
                    <head>
                        <title>Exemplo de PDF</title>
                        <style>
                            body {
                                font-family: Arial, sans-serif;
                                background-color: #f0f0f0;
                            }
                            h1 {
                                color: blue;
                            }
                        </style>
                    </head>
                    <body>
                        <ul>
                            ${typeExam}
                        </ul>
                        <p>ATESTO QUE O(A) ${dataForm.namePatient}, RG ${dataForm.rg} submeteu-se a avliação de saúde, conforme regulamenta a Portaria
                            Ministerial Nº 27 e 29 dezembro de 1994, NR-7, PCMSO.
                        </p>
                        <p>Empresa</p>
                        <ul>
                            <li>Nome: ${dataForm.nameCompany}</li>
                            <li>CNPJ: ${dataForm.cnpj}</li>
                        </ul>
                        <p>Riscos ocupacionais</p>
                        <ul>
                            ${risksOccupational}
                        </ul>
                        <table border="1">
                            <caption>Exames Realizado</caption>
                            <thead>
                                <tr>
                                    <th>Tipo</th>
                                    <th>Data</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${exams}
                            </tbody>
                        </table>
                        <P>Foi considerado ${dataForm.status ? "APTO" : "INAPTO"} à desempenhar a função de ${dataForm.functionPatient.toUpperCase()}.</P>
                    </body>
                </html>
            `;
            const data = {
                typeExam: typeExamAso
            }

            const pathHTML = path.join(__dirname, '../templates/form/form.html')
            const newHtml = await renderHtml(pathHTML, data)

            // Definir o conteúdo da página com o HTML renderizado

            await page.setContent(newHtml);

            // Gerar o PDF
            await page.pdf({ path: 'output.pdf', format: 'A4' });

            await browser.close();
        }

        generatePDF().then(() => {
            console.log('PDF gerado com sucesso.');
        }).catch((err) => {
            console.error('Erro ao gerar PDF:', err);
        }); */
    }
}