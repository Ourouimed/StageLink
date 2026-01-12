DELIMITER $$

CREATE PROCEDURE createUser (
  IN p_email VARCHAR(200),
  IN p_id CHAR(36),
  IN p_password VARCHAR(500),
  IN p_role VARCHAR(20)
)
BEGIN
  -- check role
  IF p_role NOT IN ('etudiant','encadrant','admin','entreprise') THEN
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'Invalid role';
  END IF;

  -- check email uniqueness
  IF EXISTS (SELECT 1 FROM utilisateurs WHERE email = p_email) THEN
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'Email already exists';
  END IF;

  INSERT INTO utilisateurs (id, email, password, role)
  VALUES (p_id, p_email, p_password, p_role);
END $$

DELIMITER ;




DELIMITER $$
CREATE PROCEDURE createEtudiant (
  IN p_id char(36),
  IN p_nom VARCHAR(100),
  IN p_prenom CHAR(100),
  IN p_niveau_scolaire varchar(50) ,
  IN p_date_naissance date
)
BEGIN
  INSERT INTO etudiants (id, nom, prenom, niveau_scolaire , date_naissance)
  VALUES (p_id, p_nom , p_prenom, p_niveau_scolaire , p_date_naissance);
END $$

DELIMITER ;



DELIMITER $$
CREATE PROCEDURE createEncadrant (
  IN p_id char(36),
  IN p_nom VARCHAR(100),
  IN p_prenom CHAR(100),
  IN p_date_naissance date
)
BEGIN
  INSERT INTO encadrants (id, nom, prenom , date_naissance)
  VALUES (p_id, p_nom , p_prenom , p_date_naissance);
END $$

DELIMITER ;






DELIMITER $$
CREATE PROCEDURE createEntreprise (
  IN p_id char(36),
  IN p_nom_entreprise VARCHAR(100)
)
BEGIN
  INSERT INTO entreprises (id, nom_entreprise)
  VALUES (p_id, p_nom_entreprise);
END $$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE create_stage (
    IN p_id CHAR(36),
    IN p_titre VARCHAR(20),
    IN p_entreprise CHAR(36),
    IN p_specialite VARCHAR(50),
    IN p_ville VARCHAR(50),
    IN p_type_stage VARCHAR(100),
    IN p_description VARCHAR(500),
    IN p_duree_months INT,
    IN p_nombre_profiles INT,
    IN p_demarage TIMESTAMP,
    IN p_disponibilite varchar(30)
)
BEGIN
    INSERT INTO OFFRE_stage (
        id,
        titre,
        entreprise,
        specialite,
        ville,
        type_stage,
        description,
        duree_months,
        nombre_profiles,
        demarage,
        disponibilite ,
        created_at
    ) VALUES (
        p_id,
        p_titre,
        p_entreprise,
        p_specialite,
        p_ville,
        p_type_stage,
        p_description,
        p_duree_months,
        p_nombre_profiles,
        p_demarage,
        p_disponibilite ,
        UTC_TIMESTAMP()
    );
END $$

DELIMITER ;



DELIMITER &&

CREATE PROCEDURE AjouterCandidature (
    IN p_id CHAR(36),
    IN p_stage_id CHAR(36),
    IN p_etudiant_id CHAR(36)
)
BEGIN
    -- Vérifier si la candidature existe déjà
    IF EXISTS (
        SELECT 1 FROM candidatures 
        WHERE stage_id = p_stage_id 
          AND etudiant_id = p_etudiant_id
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Candidature déjà existante pour cette offre';
    ELSE
        INSERT INTO candidatures (
            id, stage_id, etudiant_id, application_sent_at
        ) VALUES (
            p_id, p_stage_id, p_etudiant_id, NOW()
        );
    END IF;
END &&

DELIMITER ;


DELIMITER $$

CREATE PROCEDURE update_stage (
    IN p_id CHAR(36),
    IN p_titre VARCHAR(20),
    IN p_entreprise CHAR(36),
    IN p_specialite VARCHAR(50),
    IN p_ville VARCHAR(50),
    IN p_type_stage VARCHAR(100),
    IN p_description VARCHAR(500),
    IN p_duree_months INT,
    IN p_nombre_profiles INT,
    IN p_demarage TIMESTAMP,
    IN p_disponibilite VARCHAR(30)
)
BEGIN
    UPDATE OFFRE_stage
    SET
        titre = p_titre,
        entreprise = p_entreprise,
        specialite = p_specialite,
        ville = p_ville,
        type_stage = p_type_stage,
        description = p_description,
        duree_months = p_duree_months,
        nombre_profiles = p_nombre_profiles,
        demarage = p_demarage,
        disponibilite = p_disponibilite
    WHERE id = p_id;
END $$

DELIMITER ;



DELIMITER &&

DELIMITER &&

CREATE PROCEDURE addEncadrant ( 
    IN p_id_encadrant CHAR(36), 
    IN p_id_entreprise CHAR(36)
)
BEGIN
    -- Check if the combination already exists
    IF EXISTS (
        SELECT 1 
        FROM demande_encadrant 
        WHERE id_encadrant = p_id_encadrant 
          AND id_entreprise = p_id_entreprise
    ) THEN
        -- Throw a custom SQL State
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'Error: This supervisor is already assigned to this company.';
    ELSE
        -- Perform the insert if no duplicate is found
        INSERT INTO demande_encadrant (id_encadrant, id_entreprise, joined_at) 
        VALUES (p_id_encadrant, p_id_entreprise, UTC_TIMESTAMP());
    END IF;
END&&

DELIMITER ;

drop procedure addEncadrant;

