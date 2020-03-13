# Primeiro-projeto---HTML-CSS-e-JS-FRONT-END

Front-end do projeto criado para consolidar o aprendizado básico sobre HTML, CSS e JS

REGRAS DA TELA:

### 1 - Criar uma tela de login HTML + CSS igual modelo

![](imgs/TelaLogin.JPG)

* O botão login deve levar ao item 2 somente se usuário e senha forem exatamente "admin" e "senha@2020".

* Caso contrário deve exibir um alerta com a mensagem: "Usuário ou senha inválidos".

* O layout deve respeitar EXATAMENTE o modelo. O background é o único que pode ser diferente.

* Fonte do texto, tamanho da fonte, negrito ou não, alinhamento dos componentes e botões devem ser replicados.

### 2 - Criar tela de dashboard igual modelo

![](imgs/TelaDashboard.JPG)

* Todos os botões devem ser replicados.

* Cores, alinhamentos, fontes, e demais detalhes devem ser respeitadas.

* A foto "redonda" deve ser feito o efeito em CSS.

* A paginação "Previous" e "Next" é meramente visual.

* Os itens da tabela devem ser carregados de a partir de um Array em Javascript.

* A Action "X" deve excluir a linha em questão, utilizando HTML + Javascript.

* A Action Engrenagem é meramente ilustrativa.

* No meu projeto eu adicionei um botão para editar as informações, esse botão é opcional.

* O botão "Add new user" irá chamar a tela abaixo descrita no item 3.

### 3 - Criar formulário de edição conforme modelo

![](imgs/TelaFormulario.JPG)

* Replicar toda a tela obedecendo as regras já definidas nos itens anteriores.

* Utilizar bibliotecas de validação de formulário com alerta em campos preenchidos de modo incorreto, conforme ilustração.

* Telefone: usar máscara no campo. Usuário deve digitar somente números e o formulário deve "mascarar"o campo no formato (XX) XXXXX XXXX.

* Obrigatoriedade de 8 ou 9 dígitos numéricos. Não permitir digitara letras.

* E-mail: obrigatório o campo de e-mail ser no formato xxxx@xxx.xxx. Ou seja, tem que ter @ e depois do arroba, um . (ponto) alguma coisa.

* Campo obrigatórios: nome, sobrenome, email, mobile phone, birthday e language.

* Em meu projeto eu adicionei o campo de senha, para que o login da tela inicial possa ser feito utilizando o login e senha criados na tela 3.

* Adicionei também eventos e keyup e keydown para mascarar o campo passport dessa tela, apenas para praticar o uso desses eventos.

* A tela de formulário deve ser chamada a partir do clicar no botão "Add new user" do item anterior



## Passos que realizei para criar o projeto (back-end e front-end)

* Iniciar fazendo apenas a parte visual das telas utilizando HTML e CSS. 

* Criar um arquivo JS e criar um array que contenha os dados que irão preencher a table da tela dashboard.

* Carregar dinamicamente a table e todos os seus componentes e preenche-la com os dados do array.

* Utilizar o local storage para gravar o campo ID e para gravar o array, para que dessa forma seja possivel gravar os dados para atualizar a página, inserir novos dados e excluir.

* Depois que estiver tudo funcionando no front end, criar um projeto back-end e realizar a consulta, inclusão e exclusão de dados enviando requisições ao back-end. O array com os dados dos usuários deve ser passado para o back-end.

* Após concluir o passo anterior, deve ser criado o banco de dados (utilizei PostgreSql) e passar a fazer as consultas, inclusões e exclusões utilizando o banco de dados ao invés de utilizar o array.

* Inicialmente o código front end foi todo feito em javascript puro, apenas após ter terminado o projeto que eu modifiquei os códigos para jQuery.


