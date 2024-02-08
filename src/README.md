Listo Fácil
===========

<!-- ![alt text](https://dev-product.listofacil.com.br/_nuxt/img/97e895f.png "Logotipo Listo Fácil") -->

&#x1F4D8; Sistema Listo Fácio

**Indice**
1. [Setup e Build](#1-setup-e-build)
2. [Organização do projeto](#2-organizacao-do-projeto)
3. [Testes](#3-testes)
4. [Utilitários](#4-utilitarios)
5. [Mantenedores](#5-mantenedores)

**Dependências**
- [Nuxt](https://nuxtjs.org)
- [Node.js](https://nodejs.org)
- [Vue Good Table](https://xaksis.github.io/vue-good-table/)
- [Mais informações](https://github.com/petlove/jackal/blob/master/package.json)

**Obs.** Podem existir mais dependências, consulte sempre o link **Mais informações** para saber as versões corretas.

## 1. Build Setup
``` bash
# instalar dependências
$ npm install

# servidor com hot reload (localhost:3000)
$ npm run dev

# build para produção ou subir servidor
$ yarn build

# executar o deploy executar:
$ sed -i -e 's/\r$//' deploy.sh

$ chmod +x deploy.sh

# (versão do deploy -> ex: 0003) (ambiente onde o comando está rodando -> ex: homol)
$ ./deploy.sh
```

### 2. Organização do projeto
Padronização de **commits** baseados nos padrões estabelecidos pelo GitFlow.

``` bash
#exemplo de commit 
$ git commit -u origin tipoFeature/idTask
```
**tipoFeature**: story type do Pivotal <br />
**idTask**: id do Pivotal

**Obs.:** 
- O merge sempre deve apontar para "develop"
- A aprovação do merge sempre deve ser feita por uma pessoa diferente da que criou o merge request (MR)

### 3. Testes
**Execução dos testes :**
``` bash
# testes unitários
$ npm run test

# teste lint
$ npm run lint
```

### 4. Utilitários
- [Documentação](http://git.listotecnologia.com.br/products/listo-listofacil/docs)
- [Submeter bugs](http://git.listotecnologia.com.br/products/listo-listofacil/issues)
- [Novas funcionalidades](http://git.listotecnologia.com.br/products/listo-listofacil/issues)

### 5. Mantenedores

**Core**
- Manoel Freitas - [@manoel.neto](manoel.neto@soulisto.com.br)
- Evandro Santos - [@evandro.santos](evandro.santos@soulisto.com.br)

**Doc**
- Ligia de Lucca - [@ligia](ligia.lucca@soulisto.com.br)