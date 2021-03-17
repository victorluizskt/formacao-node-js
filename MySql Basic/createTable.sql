create table usuarios(
    nome varchar(50),
    email varchar(50),
    idade int
);

insert into usuarios(nome, email, idade) values(
    "Victor Luiz Gonçalves", 
    "victorluizcefet@gmail.com",
    22
);

select * from usuarios where idade = 22;

delete from usuarios where email = "gerciana@gmail.com";

update usuarios set nome = "Victor Luiz Gonçalves" where nome = "Nome de teste";
