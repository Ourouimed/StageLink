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

desc entreprises;

