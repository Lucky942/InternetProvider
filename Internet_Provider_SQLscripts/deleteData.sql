delete from EquipmentInOrders;
delete from Equipment;
delete from ServicesInOrders;
delete from ServiceOrder;
delete from Service;
delete from Mounter;
delete from Contract;
delete from Tariff;
delete from Client;
delete from Users;

alter table Client auto_increment=1;
alter table Mounter auto_increment=1;
alter table Tariff auto_increment=1;
alter table Contract auto_increment=1;
alter table Service auto_increment=1;
alter table Equipment auto_increment=1;
alter table ServiceOrder auto_increment=1;