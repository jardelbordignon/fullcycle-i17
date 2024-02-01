import { Controller, Get } from '@nestjs/common'

@Controller()
export class AppController {
  constructor() {}

  @Get()
  getRoot(): string {
    return `
      <html>
        <head>
          <style>
            body {
              font-family: Roboto, sans-serif;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              margin: 0;
              background-color: #000;
            }
            h1 {
              font-size: 3rem;
              color: #fff;
            }
            h3 {
              color: #fff;
              margin-bottom: 3rem;
            }
            .container {
              text-align: center;
            }
            .container img {
              width: 250px;
            }
            .container h1 {
              margin-top: 1rem;
            }
            .container p {
              margin-top: 1rem;
            }
            .container a {
              background-color: #fff;
              margin-top: 1rem;
              text-decoration: none;
              color: #000;
              padding: 0.5rem 1rem;
              border: 1px solid #000;
              border-radius: 5px;
            }
            .container a:hover {
              background-color: #111;
              color: #fff;
            }
            .container a:active {
              transform: scale(0.9);
            }
            .container a:active {
              transform: scale(0.9);
            }
            .container a:active {
              transform: scale(0.9);
            }
          </style>
        </head>
        <body>
          <div class="container">
            <img src="https://nestjs.com/img/logo_text.svg" alt="NestJS logo" />
            <h1>Orders Api</h1>
            <h3>Api rest NestJS dedicada ao gerenciamento dos pedidos do ecommerce</h3>
            <p><a href="/">Clique aqui para ver a documentação</a></p>
          </div>
        </body>
    `
  }
}
