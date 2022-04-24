create table testdata (
    id int generated always as identity primary key,
    content text not null
);

insert into testdata (content) values (
    ('OK')
);
