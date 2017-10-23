# TVPT 2
  
## Description
Pequeno projecto básico com funcionalidades de CRUD usado como prova de conceito para a implementação conjunta de várias tecnologias.
  
---
  
### Tecnologias usadas em Backend
| Nome | Detalhe | link |
|---|---|---|
| Node.js | Servidor | [nodejs](https://nodejs.org) |
| Express | Framework para desenvolvimento web | [expressjs](https://expressjs.com/) |
| MongoDB Atlas | Base de dados mongo DB na cloud | [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) |
| JWT | Json Web Token | [node-jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) |
  
### Ferramentas usadas em Backend
| Nome | Detalhe | Link |
|---|---|---|
| Mongoose | Utilitário para interagir com base de dados Mongo DB | [Mongoose](http://mongoosejs.com/) |
| dotenv | Utilitário para gerir variáveis de ambiente | [dotenv](https://www.npmjs.com/package/dotenv) |
| path | Utilitário para trabalhar com URLs | [path](https://nodejs.org/api/path.html) |
| cors | Cross-Origin Resource Sharing - Para permitir o FrontEnd comunicar com o BackEnd | [cors](https://www.npmjs.com/package/cors) |
  
#### Todas as versões usadas estão definidas no ficheiro [package.json](./package.json)
  
---
  
### Tecnologias usadas em Frontend
| Nome | Detalhe | Link |
|---|---|---|
| Angular | Framework javascript para construção de aplicações web | https://angular.io/ |
  
Modulos Angular utilizados:
* @angular/platform-browser/animations
* @angular/platform-browser
* @angular/core
* @angular/router
* @angular/forms
* @angular/common/http
  
### Ferramentas usadas em Frontend
| Nome | Detalhe | Link |
|---|---|---|
| ngx-translate | Ferramenta para i18n | [ngx-translate](https://github.com/ngx-translate/core) |
| ngx-toastr | Ferramenta para toasts | [ngx-toastr](https://www.npmjs.com/package/ngx-toastr) |
| ng4-loading-spinner | Ferramenta para "loading page spinner" | [ng4-loading-spinner](https://www.npmjs.com/package/ng4-loading-spinner) |
  
#### Todas as versões usadas estão definidas no ficheiro [package.json](./client/package.json)
  
## Caracteristicas que merecem destaque:
### Backend
* Os dados são estruturados por shemas 
* Os serviços retornam sempre a mesma estrutura de resposta
### Frontend
* As chamadas HTTP são suportadas pelo mais recente @angular/common/http
* Os services mapeiam directamente os dados recolhidos do Backend para classes e interfaces
* O i18n é suportado por .properties e não pelo mecanismo default do Angular
* As subscription aos serviços são sempre fechadas no ngOnDestroy dos componentes
* Foi criado um método genérico de controlo de erros e de onComplete na chamada a serviços do backend