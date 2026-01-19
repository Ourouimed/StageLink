use stage;
delimiter &&
CREATE FUNCTION CALC_NOTE_FINAL (note_pedagogique double (4,2) , note_evaluation double (4,2))
RETURNS double (4,2)
DETERMINISTIC
BEGIN
	RETURN (note_pedagogique + note_evaluation)/2;
END&&
DELIMITER ;

select calc_note_final(5.5 , 10.2);