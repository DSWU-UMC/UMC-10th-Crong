select m.reward, m.mission_spec, s.id, s.name
from mission m
join store s on s.id = m.store_id
join member_mission mm on mm.mission_id = m.id
where mm.status = "진행 중" ("완료")
and mm.updated_at < 
(select updated_at from member_mission where mission_id = 5)
order by mm.updated_at desc 
limit 10;