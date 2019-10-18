insert into Client(Client_FirstName, Client_LastName, Client_Passport, Client_Birthday)
values
('Вадим', 'Шереметов', '6313-959865', '1999-10-09'),
('Егор', 'Волк', '6313-953555', '1999-10-20'),
('Алексей', 'Кириллов', '6313-917865', '1999-11-09'),
('Алекс', 'Власов', '6313-938145', '1999-08-09'),
('Данила', 'Харченко', '6313-959715', '1992-10-05');

insert into Tariff(Tariff_Name, Tariff_MaxSpeed, Tariff_Price)
values
('НаДонышке', 10, 300),
('Среднячок', 25, 450),
('Черненький', 45, 650),
('ТурбоБустик', 65, 800),
('ОтВадоса', 250, 2500);

insert into Contract(Contract_ClientId, Contract_ConclusionDate, Contract_TerminationDate, Contract_TariffId)
values
( 1, '2002-10-09', null, 5),
( 2, '2008-10-09', null, 2),
( 3, '2010-10-09', '2004-05-16', 3),
( 4, '2012-10-09', null, 1),
( 5, '2016-10-09', null, 5);

insert into Mounter(Mounter_FirstName, Mounter_LastName, Mounter_Passport, Mounter_Birthday, Mounter_EmploymentDate)
values
('Иван', 'Сидоров', '6313-876123', '1999-10-09', '2006-10-05'),
('Петр', 'Иванов', '6313-953555', '1994-10-20', '2002-07-05'),
('Василий', 'Сергеев', '6313-475132', '1995-11-09', '2006-02-05'),
('Алекс', 'Власов', '6313-974612', '1999-08-09', '2005-03-05'),
('Денис', 'Алхазов', '6313-756142', '1999-10-05', '2007-11-05');

insert into Service(Service_Name, Service_Price)
values
('Настройка Роутера', 2500),
('Подключение к проводной сети', 500),
('Починка роутера', 1200),
('Проведение проводов под плинтусами', 4000),
('Замена роутера', 2000);

insert into ServiceOrder(Order_Date, Order_Price, Order_ClientId, Order_MounterId, Order_Address)
values
('2015-11-09', 3000, 2, 1, "Lomonosova 43 37"),
('2012-04-05', 2000, 3, 4, "Poltavskaya 68 16"),
('2016-12-09', 1200, 4, 5, "Kolotilova 45 51"),
('2017-07-09', 4000, 2, 5, "Rahova 45 51"),
('2014-10-25', 500, 3, 1, "Okhotniy ryad 1 1");

insert into ServicesInOrders(Order_Id, Service_Id)
values
(1, 1),
(1, 2),
(2, 5),
(3, 3),
(4, 4),
(5, 2);


insert into Equipment(Equipment_Name, Equipment_Price, Equipment_Count)
values
('Роутер', 2500, 80),
('Кабель', 200, 500),
('Зажимы', 50, 1200);

insert into EquipmentInOrders(Order_Id, Equipment_Id, Equipment_Count)
values
(1, 1, 1),
(1, 2, 2),
(1, 3, 2),
(2, 1, 1),
(3, 2, 6),
(4, 1, 1),
(4, 2, 7),
(4, 3, 2),
(5, 2, 2),
(5, 2, 2);

insert into Users(User_Login, User_Password, User_ClientId)
values
('admin', '123', null),
('vadya', '123', 1),
('kirill', '123', 2),
('cerk', '123', 3),
('perk', '123', 4),
('ek', '123', 5);




