create table utilisateurs (
	id char(36) primary key ,
    email varchar(200) unique not null ,
    role enum('etudiant' , 'encadrant' , 'admin' , 'entreprise') DEFAULT 'etudiant' ,
    created_at timestamp default current_timestamp , 
    email_verified tinyint default 0 ,
    email_verified_at timestamp default null ,
    otpCode varchar(100) default NULL ,
	otpSentAt timestamp ,
    password varchar(500) not null 
);

create table etudiants (
	id char(36) primary key ,
    nom varchar(100) ,
    prenom varchar(100) , 
    niveau_scolaire varchar(50),
	date_naissance date ,
    ville	varchar(100) ,
    bio	varchar(500),
    website	varchar(200),
	linkedin varchar(200),
    cv varchar(255),
    FOREIGN KEY (id) references utilisateurs (id)
);


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
	linkedin varchar(200),
    FOREIGN KEY (id) references utilisateurs (id)
);


CREATE TABLE OFFRE_stage (
	id char(36) primary key ,
    titre varchar(20) ,
    entreprise char(36) ,
    specialite varchar(50),
    ville varchar(50) ,
    type_stage varchar(50),
    description varchar(500),
    duree_months int ,
    nombre_profiles int default 0,
    demarage timestamp default null ,
    created_at timestamp default current_timestamp ,
    disponibilite ENUM('emps plein' , 'Temps partiel') ,
    FOREIGN KEY (entreprise) references entreprises(id) 
);


CREATE TABLE candidatures (
  id char(36) primary key,
  stage_id char(36) ,
  etudiant_id char(36) , 
  status varchar(50) default 'pending' ,
  application_sent_at TIMESTAMP ,
  FOREIGN KEY (stage_id) references offre_stage(id),
  FOREIGN KEY (etudiant_id) references etudiants (id)
  );
  
  
  