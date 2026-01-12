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





DELIMITER &&

CREATE TRIGGER before_insert_candidature
BEFORE INSERT ON candidatures
FOR EACH ROW
BEGIN
  DECLARE max_places INT;
  DECLARE current_count INT;

  -- get allowed places
  SELECT nombre_profiles
  INTO max_places
  FROM offre_stage
  WHERE id = NEW.stage_id;

  -- count existing candidatures
  SELECT COUNT(*)
  INTO current_count
  FROM candidatures
  WHERE stage_id = NEW.stage_id;

  -- block if full
  IF current_count >= max_places THEN
    SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'Cet offre de stage est complete';
  END IF;
END &&

DELIMITER ;


DELIMITER &&
CREATE trigger after_accept_stage
AFTER UPDATE ON candidatures 
FOR EACH ROW
BEGIN 
	IF OLD.status != NEW.STATUS AND NEW.status = 'accepted' THEN
	
END&&
DELIMITER ;
