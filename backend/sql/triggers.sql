DELIMITER &&

CREATE TRIGGER before_delete_offre 
BEFORE DELETE ON offre_stage
FOR EACH ROW 
BEGIN
  IF EXISTS (
    SELECT 1 
    FROM candidatures 
    WHERE stage_id = OLD.id
  ) THEN
    SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'Impossible de supprimer cette offre : des candidatures existent.';
  END IF;
END &&

DELIMITER ;



DELIMITER &&

CREATE TRIGGER before_update_offre 
BEFORE UPDATE ON offre_stage
FOR EACH ROW 
BEGIN
  IF EXISTS (
    SELECT 1 
    FROM candidatures 
    WHERE stage_id = OLD.id
  ) THEN
    SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'Impossible de modifier cette offre : des candidatures existent.';
  END IF;
END &&

DELIMITER ;






DELIMITER //

CREATE TRIGGER before_insert_candidature
BEFORE INSERT ON candidatures
FOR EACH ROW
BEGIN
  DECLARE max_places INT;
  DECLARE current_count INT;
  DECLARE cv_count INT;

  -- check available places
  SELECT nombre_profiles
  INTO max_places
  FROM offre_stage
  WHERE id = NEW.stage_id;

  SELECT COUNT(*)
  INTO current_count
  FROM candidatures
  WHERE stage_id = NEW.stage_id;

  IF current_count >= max_places THEN
    SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'Cette offre de stage est complète';
  END IF;

  -- check if etudiant has a CV
  SELECT COUNT(*)
  INTO cv_count
  FROM etudiants
  WHERE id = NEW.etudiant_id
    AND cv IS NOT NULL
    AND cv <> '';

  IF cv_count = 0 THEN
    SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'Vous devez ajouter un CV avant de postuler';
  END IF;

END;
//

DELIMITER ;
