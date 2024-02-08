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

        let risksHtml = ""

        dataForm.OccupationalHazards.forEach((risk) => {
            risksHtml += `<li>${risk.name}</li>`
        })

        let typeExamHtml = ""

        typeExamAso.forEach((type) => {
            typeExamHtml += `
                <li>
                    <input type="radio" id=${type.id} name=${type.name} value=${type.id} ${type.selected ? "checked" : ""}/>
                    <lable for=${type.id}>${type.name}</lable>
                </li>                
            `
        })

        let examsHtml = ""

        listExamsAll.forEach((exam, index) => {
            examsHtml += `
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
                typeExam: typeExamHtml,
                nameCompany: dataForm.nameCompany,
                cnpj: dataForm.cnpj,
                namePatient: dataForm.namePatient,
                rg: dataForm.rg,
                riscks: risksHtml,
                exams: examsHtml,
                status: dataForm.status ? "APTO" : "INAPTO",
                functionPatient: dataForm.functionPatient.toUpperCase(),
                comments: dataForm.comments ? dataForm.comments : "",
                date: dataForm.createdAt
            }

            const pathHTML = path.join(__dirname, '../templates/form/form.html')
            const htmlPage = await renderHtml(pathHTML, data)

            // Definir o conteúdo da página com o HTML renderizado

            await page.setContent(htmlPage);

            // Gerar o PDF
            await page.pdf({ path: 'output.pdf', format: 'A4' });

            await browser.close();
        } catch (error) {
            console.log(error)
        }
    }
}