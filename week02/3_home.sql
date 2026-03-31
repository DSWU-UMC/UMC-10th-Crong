select u.point,   (
    select count(*)
    from member_mission mm2
    join mission m2 on m2.id = mm2.mission_id
    join store s2 on s2.id = m2.store_id
    where mm2.member_id = u.id
      and s2.region_id = 1
      and mm2.status = '완료'
  ) as completed_mission,
s.name, s.store_type, m.deadline, m.mission_spec, r.name
from member u
join member_mission mm on mm.member_id = u.id
join mission m on m.id = mm.mission_id
join store s on s.id = m.store_id
join region r on r.id = s.region_id
where u.id = 2 and r.id = 1 and mm.status = "도전 가능" and mm.updated_at < 
(select updated_at from member_mission 
where mission_id = 5 and status = "도전 가능"
order by updated_at desc 
limit 1)
order by mm.updated_at desc 
limit 10;

#store_type은 erd에 없음