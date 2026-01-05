create table utilisateurs (
	id char(36) primary key ,
    email varchar(200) unique not null ,
    role enum('etudiant' , 'encadrant' , 'admin' , 'entreprise') DEFAULT 'etudiant' ,
    created_at timestamp default current_timestamp , 
    email_verified tinyint default 0 ,
    email_verified_at timestamp default null ,
    otpCode varchar(100) default NULL ,
	otpSentAt timestamp default current_timestamp ,
    password varchar(500) not null 
);

create table etudiants (
	id char(36) primary key ,
    nom varchar(100) ,
    prenom varchar(100) , 
    niveau_scolaire varchar(50),
	date_naissance date ,
    FOREIGN KEY (id) references utilisateurs (id)
);
select * from utilisateurs;


create table encadrants (
	id char(36) primary key ,
    nom varchar(100) ,
    prenom varchar(100) , 
	date_naissance date ,
    FOREIGN KEY (id) references utilisateurs (id)
);


create table admins (
	id char(36) primary key ,
    nom varchar(100) ,
    prenom varchar(100) , 
	date_naissance date ,
    FOREIGN KEY (id) references utilisateurs (id)
);

create table entreprises (
	id char(36) primary key ,
    nom_entreprise varchar(100) ,
    ville	varchar(100) ,
    type_entreprise	varchar(100),
	description	varchar(500),
	secteur	varchar(100),
	website	varchar(200),
	linkedin	varchar(200),
    FOREIGN KEY (id) references utilisateurs (id)
);


