delimiter &&
create procedure traiter_offre_stage ()
begin 
	declare done int default 0;
    declare v_id char(36);
    declare v_demarage timestamp ;
    declare v_archived tinyint;
    
	declare cur_os cursor FOR
    SELECT id , demarage , archived
    FROM OFFRE_STAGE 
    where demarage > utc_timestamp();
    
    declare continue handler for not found set done = 1;
    open cur_os;
	stg_loop : loop 
		fetch cur_os into v_id , v_demarage , v_archived ;
        if done = 1 THEN 
			LEAVE stg_loop;
		end if ;
        
        update offre_stage 
        set archived = 1 
        where id = v_id;
        
	end loop;
    close cur_os;
end &&
delimiter ;

select archived from offre_stage;
call traiter_offre_stage();