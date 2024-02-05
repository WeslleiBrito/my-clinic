import { ModelForm } from "../types/types";
import * as puppeteer from 'puppeteer';
import * as handlebars from 'handlebars';
import * as fs from 'fs';

export class Print {


    public printPDF = async (dataForm: ModelForm) => {

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

        async function generatePDF() {
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
                        <h1>${"PDF gerado a partir de HTML"}</h1>
                        <p>Este é um exemplo de PDF gerado a partir de HTML.</p>
                    </body>
                </html>
            `;
        
            // Definir o conteúdo da página com o HTML renderizado
            await page.setContent(htmlContent);
        
            // Gerar o PDF
            await page.pdf({ path: 'output.pdf', format: 'A4' });
        
            await browser.close();
        }

        generatePDF().then(() => {
            console.log('PDF gerado com sucesso.');
        }).catch((err) => {
            console.error('Erro ao gerar PDF:', err);
        });
    }
}